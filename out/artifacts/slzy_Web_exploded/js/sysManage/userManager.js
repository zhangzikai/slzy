App.tabs.userManager = (function(){
	var limit = 20,tabId = "userTab",addOrUpdateWin = null,acrWin=null,curPanel=null;
	
	function showSpdatePwdWin(sinfo){
		//修改密码
		var pwdWin = new Ext.Window({
			title:'修改密码',
			height:180,
			width:350,
			iconCls:'edit-icon',
			constrain:true,
			modal:true,
			resizable:false,
			closeAction:'close',
			bodyStyle:'background-color:white;',
			listeners:{
				close:function(){pwdWin.destroy();pwdWin = null;}
			},
			items:[new Ext.form.FormPanel({
				ref:'itemForm',
				layout:'form',
				border:false,
				labelWidth:65,
				labelAlign:'right',
				buttonAlign:'center',
				defaults:{anchor:'90%',xtype:'textfield',ctCls:'formMargin'},
				items:[{
					fieldLabel:'用 户 名',
					ref:'../username',
					disabled:true,
					value:sinfo.username
				},{
					fieldLabel:'用户类型',
					ref:'../usertype',
					disabled:true,
					value:sinfo.usertype
				},{
					fieldLabel:'新 密 码',
					inputType:'password',
					allowBlank:false,
					maxLength:20,
					ref:'../password'
				},{
					fieldLabel:'确认密码',
					inputType:'password',
					allowBlank:false,
					ref:'../rePassword'
				}]
			})],
			bbar:['->',{
				text:'修改',
				iconCls:'accept-icon',
				handler:function(){
					if(!pwdWin.itemForm.getForm().isValid()){return;}
					var password = pwdWin.password.getValue(),
					rePassword = pwdWin.rePassword.getValue();
					if(password!=rePassword){Ext.Msg.alert('提示','确认密码与新密码不一致!');return;}
					var myMask = new Ext.LoadMask(pwdWin.el,{msg:'正在保存数据...',removeMask:true});
					myMask.show();
					Ext.Ajax.request({
						url:App.baseURL+'/sysUser.jhtml?method=updatePwd',
						method:'POST',
						params:{userid:sinfo.userid,password:password},
						success:function(res){
							myMask.hide();
							var ret = Ext.decode(res.responseText);
							Ext.Msg.alert('提示',ret.msg);
							Ext.getCmp('userGrid').getStore().reload();
							pwdWin.close();
						},
						failure:function(res){
							Ext.Msg.alert('提示',res.responseText);
							myMask.hide();}
					});
				}
			},'-',{text:'重置',iconCls:'reset-icon',handler:function(){pwdWin.itemForm.getForm().reset();}},
			'-',{text:'取消',iconCls:'cancel-icon',handler:function(){pwdWin.close();}
			}]
		});
		pwdWin.show();
	}
	
	function showAcrWin(record){
		if(!acrWin){
			acrWin = new Ext.Window({
				title:"用户 [<font color='orange'>"+record.data.username+"</font>] 的角色",
				height:200,
				width:320,
				constrain:true,
				modal:true,
				resizable:false,
				autoScroll:true,
				closeAction:'close',
				bodyStyle:'background-color:white;',
				listeners:{
					close:function(){acrWin.destroy();acrWin = null;}
				},
				items:[new Ext.form.FormPanel({
					ref:'itemForm',
					layout:'form',
					border:false,
					labelWidth:65,
					labelAlign:'right',
					buttonAlign:'center',
					defaults:{anchor:'90%',xtype:'textfield',ctCls:'formMargin'},
					items:[{
						fieldLabel:'用 户 名',
						ref:'../username',
						disabled:true,
						value:record.data.username
					},{
						fieldLabel:'用户类型',
						ref:'../usertype',
						disabled:true,
						value:record.data.usertype
					},{
						xtype:'combo',
						ref:'../role',
						fieldLabel:'用户角色',
					    triggerAction: 'all',
					    lazyRender:true,
					    mode: 'local',
					    emptyText:"请选择角色",
					    width:80,
					    editable:false,
					    store:new Ext.data.Store({
							autoLoad:true,
							proxy:new Ext.data.HttpProxy({url:App.baseURL+"/sysRole.jhtml?method=findAll"}),
							reader:new Ext.data.JsonReader({fields:[{name:"id"},{name:"roleName"}]}),
							baseParams:{type:App.dicType.gzgw},
							listeners:{
								load:function(store,records,opts){
									if(record && record.json.role){
										acrWin.role.setValue(record.json.role.id);
									}	
								}
							}
						}),
					    valueField: 'id',
					    displayField: 'roleName'
					},]
				})],
				bbar:['->',{text:'保存',iconCls:'accept-icon',handler:function(){
					var roleid = acrWin.role.getValue();
					if(roleid=="") return;
					Ext.Ajax.request({
						url:App.baseURL+'/sysUser.jhtml?method=accredit',
						params:{userId:record.data.userid,roleId:roleid},
						success:function(res){
							var ret = Ext.decode(res.responseText);
							Ext.Msg.alert('提示',ret.msg);
							Ext.getCmp('userGrid').getStore().reload();
							acrWin.close();
						},failure:function(){}
					});
				}},
				'-',{text:'取消',iconCls:'cancel-icon',handler:function(){acrWin.close();}}]
			});
		}
		acrWin.show();
	}
	
	function init(){
		var store = new Ext.data.Store({
			autoLoad:false,
			proxy:new Ext.data.HttpProxy({url:App.baseURL+'/sysUser.jhtml?method=queryList'}),
			reader:new Ext.data.JsonReader({
				totalProperty:'total',
				root:'rows',
				idProperty:'userid'
			},['userid','username','usertype','realname','sex','address','password','telephone','email','department','remark','role']),
			baseParams:{start:0,limit:limit}
		}),
		sm = new Ext.grid.CheckboxSelectionModel({singleSelect:false}),
		cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),sm,
			{header : '<center>ID</center>',dataIndex : 'userid',sortable : true,width : 50},
			{header : '<center>用户名</center>',dataIndex : 'username',sortable : true,width : 100},
			{header : '<center>密码</center>',dataIndex : 'password',sortable : true,width : 100},
			{header : '<center>类型</center>',dataIndex : 'usertype',sortable : true,width : 100},
			{header : '<center>姓名</center>',dataIndex : 'realname',sortable : true,width : 100},
			{header : '<center>角色</center>',width:80,sortable:true,renderer:function(value){
				if(value!=null&&value!=""){
					return value.roleName;
				}
			},dataIndex:'role'},
			{header : '<center>性别</center>',dataIndex : 'sex',sortable : true,width :50},
			{header : '<center>电话</center>',dataIndex : 'telephone',sortable : true,width:80},
			{header : '<center>邮箱</center>',dataIndex : 'email',sortable : true,width:80},
			{header : '<center>部门</center>',dataIndex : 'department',sortable : true,width:80},
			{header : '<center>地址</center>',dataIndex : 'address',sortable : true},
			{header : '<center>授权</center>',dataIndex : 'userid',align:'center',width : 140,renderer:function(value){
				var str = '';
				if(hasPermission('sys_user_role')){
					str += '<a name="acr">授予角色</a>&nbsp;&nbsp;&nbsp;';
				}
				if(hasPermission('sys_user_updatePwd')){
					str += '<a name="updatePwd">修改密码</a>&nbsp;&nbsp;&nbsp;';
				}
				if(str==''){
					return '<font color="red">无授权操作</font>';
				}else{
					return str;
				}
			}}
		]);
		var win = new Ext.Window({
			id:"userWin",
			height:350,
			width:500,
			title : '&nbsp;用户管理&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
			iconCls:"userSuit",
			constrain:true,
			modal:true,
			resizable:false,
			renderTo: document.body,
			closeAction:'close',
			bodyStyle:'background-color:white;',
			listeners:{close:function(){win.destroy();win = null;}},
			layout:'fit',
			items:[new Ext.grid.GridPanel({
				id:'userGrid',
				border : false,
				columnLines : true,
				autoScroll : true,
				store : store,
				autoHeight:false,
				stripeRows:true,
				cm : cm,
				sm : sm,
				loadMask : {msg : '正在加载数据……'},
				bbar:new Ext.PagingToolbar({
					pageSize : limit,
					store : store,
					emptyMsg : "<font color='red'>没有记录</font>",
					displayInfo : true,
					plugins:new Ext.ux.ComboPageSize({addToItem:true,index:10})
				}),
				tbar:[{text:'添加',iconCls:'add-icon',hidden:!hasPermission('sys_user_add'),handler:function(){showAddOrUpdate('add');}},
					' ',{text:'修改',iconCls:'edit-icon',hidden:!hasPermission('sys_user_update'),handler:function(){showAddOrUpdate('update');}},
					' ',{text:'删除',iconCls:'delete-icon',hidden:!hasPermission('sys_user_delete'),handler:doDelete},
					'->',{
						xtype:'combo',
						id:'searchCombo',
						typeAhead: true,
					    triggerAction: 'all',
					    lazyRender:true,
					    mode: 'local',
					    value:'username',
					    width:80,
					    editable:false,
					    store: new Ext.data.ArrayStore({
					        fields: ['keytype','keytext'],
					        data: [['username', '用户名'], ['usertype', '用户类型']]
					    }),
					    valueField: 'keytype',
					    displayField: 'keytext'
					},' ',{xtype:'textfield',emptyText:'输入关键字查找',enableKeyEvents:true,id:'searchText',width:100,
						listeners:{
							keydown:{
								fn:function(t,e){
									if(e.keyCode == 13){
										search();
									}
								},
								buffer:350,
								scope:this
							}
						}
				},' ',
				{text:'查&nbsp;&nbsp;询',iconCls:'query-icon',handler:search},'-',
				{text:'刷&nbsp;&nbsp;新',iconCls:'refresh-icon',handler:function(){store.reload();}}],
				listeners:{
					cellclick:function(grid,rowIndex,columnIndex,e){
						var rstore = grid.getStore(),
						record = rstore.getAt(rowIndex); 
						if(columnIndex==13){
							if(!e.getTarget("a"))return;
							var target = e.getTarget("a").name;
							if(target=="acr"){
								showAcrWin(record);
							}else if(target=="acl"){
								showAclWin(record);
							}else if(target=="updatePwd"){
								showSpdatePwdWin(record.data);
							}
						}
					}
				}
			})]
		});
		win.show();
		tabId="userWin";
		store.load();
	}
	
	/** 添加或者修改 **/
	function showAddOrUpdate(type){
		var title='',iconCls='',btnText='',url='',record=null;
		if(type == 'add'){
			title='添加用户',iconCls='add-icon',btnText='保存',url=App.baseURL+'/sysUser.jhtml?method=add';
		}else if(type == 'update'){
			title='修改用户',iconCls='edit-icon',btnText='修改',url=App.baseURL+'/sysUser.jhtml?method=edit';
			var grid = Ext.getCmp('userGrid'),
			selectRocords = grid.getSelectionModel().getSelections();
			if(selectRocords.length <= 0){
				Ext.Msg.alert('提示','请选择一个用户进行修改!');
				return;
			}else if(selectRocords.length > 1){
				Ext.Msg.alert('提示','只能选择一个用户进行修改!');
				return;
			}else{
				record = selectRocords[0];
			}
		}
		if(!addOrUpdateWin){
			addOrUpdateWin = new Ext.Window({
				title:title,
				height:370,
				width:350,
				iconCls:iconCls,
				constrain:true,
				modal:true,
				resizable:false,
				renderTo:tabId,
				closeAction:'close',
				bodyStyle:'background-color:white;',
				listeners:{
					close:function(){addOrUpdateWin.destroy();addOrUpdateWin = null;}
				},
				items:[new Ext.form.FormPanel({
					ref:'itemForm',
					layout:'form',
					border:false,
					labelWidth:75,
					labelAlign:'right',
					buttonAlign:'center',
					defaults:{anchor:'90%',xtype:'textfield',ctCls:'formMargin'},
					items:[{
						fieldLabel:'用 户 名',
						ref:'../username',
						allowBlank:false,
						maxLength:25
					},{
						fieldLabel:'姓    名',
						ref:'../realname',
						allowBlank:false,
						maxLength:25
					},{
						xtype:'combo',
						ref:'../usertype',
						fieldLabel:'用户类型',
					    triggerAction: 'all',
					    lazyRender:true,
					    mode: 'local',
					    value:'管理员',
					    width:80,
					    editable:false,
					    store: new Ext.data.ArrayStore({
					        fields: ['keytype','keytext'],
					        data: [['超级管理员', '超级管理员'],['管理员', '管理员'],['普通用户1', '普通用户1'],['普通用户2', '普通用户2']]
					    }),
					    valueField: 'keytype',
					    displayField: 'keytext'
					},{
						fieldLabel:'初始密码',
						ref:'../password',
						disabled:true,
						value:'123456'
					},{
                        xtype: 'radiogroup',
                        ref:'../sex',
                        fieldLabel: '性   别',
                        items: [
                            {boxLabel: '男', name: 'sex',inputValue:'男',checked: true},
                            {boxLabel: '女', name: 'sex',inputValue:'女'}
                        ]
                    },{
						fieldLabel:'部    门',
						ref:'../department',
						allowBlank:false,
						maxLength:60
					},{
						fieldLabel:'电    话',
						ref:'../telephone',
						allowBlank:false,
						maxLength:25
					},{
						fieldLabel:'邮    箱',
						ref:'../email',
						allowBlank:false,
						maxLength:60
					},{
                        fieldLabel: '地   址',
                        ref:'../address',
                        allowBlank:false
                    },{
                        fieldLabel: '备    注',
                        ref:'../remark',
                        xtype: 'textarea',
                        allowBlank:false
                    }]
				})],
				bbar:['->',{
					text:btnText,
					iconCls:'accept-icon',
					handler:function(){
						if(!addOrUpdateWin.itemForm.getForm().isValid()){return;}
						var username = addOrUpdateWin.username.getValue(),
						usertype = addOrUpdateWin.usertype.getValue(),
						realname = addOrUpdateWin.realname.getValue(),
						password = addOrUpdateWin.password.getValue(),
						sex = addOrUpdateWin.sex.getValue().inputValue,
						department = addOrUpdateWin.department.getValue(),
						telephone = addOrUpdateWin.telephone.getValue(),
						email = addOrUpdateWin.email.getValue(),
						address = addOrUpdateWin.address.getValue(),
						remark = addOrUpdateWin.remark.getValue(),
						myMask = new Ext.LoadMask(addOrUpdateWin.el,{msg:'正在保存数据...',removeMask:true});
						myMask.show();
						Ext.Ajax.request({
							url:url,
							method:'POST',
							params:{username:username,usertype:usertype,userid:record?record.data.userid:null,password:password,realname:realname,
									sex:sex,department:department,telephone:telephone,email:email,address:address,remark:remark},
							success:function(res){
								myMask.hide();
								var ret = Ext.decode(res.responseText);
								Ext.Msg.alert('提示',ret.msg);
								Ext.getCmp('userGrid').getStore().reload();
								addOrUpdateWin.close();
							},
							failure:function(res){
								Ext.Msg.alert('提示',res.responseText);
								myMask.hide();
							}
						});
					}
				},'-',{text:'重置',iconCls:'reset-icon',handler:function(){addOrUpdateWin.itemForm.getForm().reset();}},
				'-',{text:'取消',iconCls:'cancel-icon',handler:function(){addOrUpdateWin.close();}
				}]
			});
		}
		addOrUpdateWin.show();
		if(type == 'update'){
			addOrUpdateWin.username.setValue(record.data.username);
			addOrUpdateWin.usertype.setValue(record.data.usertype);
			addOrUpdateWin.realname.setValue(record.data.realname);
			addOrUpdateWin.sex.setValue(record.data.sex);
			addOrUpdateWin.password.setValue(record.data.password);
			addOrUpdateWin.department.setValue(record.data.department);
			addOrUpdateWin.telephone.setValue(record.data.telephone);
			addOrUpdateWin.email.setValue(record.data.email);
			addOrUpdateWin.address.setValue(record.data.address);
			addOrUpdateWin.remark.setValue(record.data.remark);
		}
	}
	
	/** 输入框查询 **/
	function search(){
		var keytype = Ext.getCmp('searchCombo').getValue(),
		searchtext = Ext.get('searchText').getValue(),
		_store = Ext.getCmp('userGrid').getStore();
		if(!App.regNull.test(searchtext) && searchtext !='输入关键字查找'){
			Ext.apply(_store.baseParams,{keyword:searchtext,field:keytype});
			_store.load();
		}else{
			Ext.apply(_store.baseParams,{field:'',keyword:''});
			_store.load();
		}
	}
	
	function doDelete(){
		var ids = '',grid = Ext.getCmp('userGrid'),selects = grid.getSelectionModel().getSelections();
		if(selects.length <= 0){
			Ext.Msg.alert('提示','请选择记录进行删除!');
			return;
		}
		for (var i = 0; i < selects.length; i++) {
			ids += ',' + selects[i].json.id;
		}
		Ext.Msg.confirm("提示","删除用户信息，您确定要删除吗？",function(val){
			if(val=='yes'){
				 Ext.Ajax.request({
					url:App.baseURL+'/sysUser.jhtml?method=delete',
					method:'POST',
					params:{ids:ids.substring(1)},
					success:function(response){
						var json = Ext.decode(response.responseText);
						Ext.Msg.alert('提示',ret.msg);
						Ext.getCmp('userGrid').getStore().reload();
					},
					failure:function(){
						Ext.Msg.alert('提示','删除出错');
					}
				});
			}
		});
	}
	
	return {
		init:init
	};
})();


