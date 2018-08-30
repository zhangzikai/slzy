App.tabs.roleManager = (function(){
	var limit = 20,tabId= 'roleTab',addOrUpdateWin = null,aclWin = null,curPanel=null;
	
	function initCheckStatus(aclTree,roleId){
		Ext.Ajax.request({
			url:App.baseURL+'/sysRole.jhtml?method=get',
			params:{id:roleId},
			success:function(res){
				var role = Ext.decode(res.responseText);
				var arr=role.modules;
				if(arr && arr.length>0){
					for(var i=0; i<arr.length; i++){
						var node = aclTree.getNodeById(arr[i].id);
						if(node){
							node.ui.checkbox.checked = true;
							node.attributes.checked = true;
						}
					}
				}
			},
			failure:function(){}
		});
	}
	
	function saveAcl(roleId){
		var mids = "",  
		aclTree = Ext.getCmp('role_aclTree'),
		checkedNodes = aclTree.getChecked();
		if(checkedNodes && checkedNodes.length>0){
			for ( var i = 0; i < checkedNodes.length; i++) {
				mids += ","+checkedNodes[i].id;
			}
		}
		if(mids.indexOf(",") != -1){
			mids = mids.substring(1);
		}
		Ext.Ajax.request({
			url:App.baseURL+'/sysRole.jhtml?method=accredit',
			params:{roleId:roleId,mids:mids},
			success:function(res){
				var ret = Ext.decode(res.responseText);
				Ext.Msg.alert('提示',ret.msg);
			},
			failure:function(){}
		});
	}
	
	function showAclWin(record){
		var roleId = record.data.id;
		var tree = new Ext.tree.TreePanel({
			id : 'role_aclTree',
			root : new Ext.tree.AsyncTreeNode({id:'root',text:'根节点', expanded:true}),
			loader : new Ext.tree.TreeLoader({
				url : App.baseURL+'/sysModule.jhtml?method=findAll',
				listeners:{  
					    load : function() {  
					    	initCheckStatus(tree,roleId);
					    } 
					} 
			}),
			border : false,
			rootVisible : false,
			lines : true,
			autoScroll : true,
			enableDD : false,
			animate : true,
			split : true,
			containerScroll: true,
			collapsible : false
		});
		tree.on('checkchange', function(node, flag) {
			// 获取所有子节点
			node.cascade(function(node) {
				node.attributes.checked = flag;
				node.ui.checkbox.checked = flag;
				return true;
			});
			// 获取所有父节点
			var pNode = node.parentNode;
			for (; pNode.id != "root"; pNode = pNode.parentNode) {
				if (flag && tree.getChecked('id', pNode)) {
					pNode.ui.checkbox.checked = flag;
					pNode.attributes.checked = flag;
				}
			}
		});
		if(!aclWin){
			aclWin = new Ext.Window({
				title:"角色 [<font color='orange'>"+record.data.roleName+"</font>] 的模块权限",
				height:400,
				width:320,
				constrain:true,
				modal:true,
				resizable:false,
				autoScroll : true,
				closeAction:'close',
				bodyStyle:'background-color:white;',
				listeners:{
					close:function(){aclWin.destroy();aclWin = null;}
				},
				items:[tree],
				tbar:[' ',' ',{	
	                iconCls: 'icon-expand-all',
	                text: '全部展开',
	                handler: function(){
	                    var treePanel = Ext.getCmp('role_aclTree');
	                    treePanel.root.expand(true);
	                },
	                scope: this
	            }, '-', {
	                iconCls: 'icon-collapse-all',
	                text: '全部收缩',
	                handler: function(){ 
	                    var treePanel = Ext.getCmp('role_aclTree');
	                    treePanel.root.collapseChildNodes(true);    
	                },
	                scope: this
	            },'-',{text:'保存',iconCls:'add-icon',handler:function(){saveAcl(roleId);}}]
			});
		}
		aclWin.show();
	}
	
	
	function initAcldStatus(roleId){
		Ext.Ajax.request({
			url:App.baseURL+'/acld/findColumnByRole',
			params:{roleId:roleId},
			success:function(res){
				var arr = Ext.decode(res.responseText);
				var _roleGrid = Ext.getCmp('schoolGrid-role'),
				_roleStore = _roleGrid.getStore(),
				selectionModel = _roleGrid.getSelectionModel(),
				willSelectArr = [],
				_roles = _roleStore.getRange();
				selectionModel.clearSelections();
				for (var i = 0; i < _roles.length; i++) {
					var _role = _roles[i];
					if(arr.contains(_role.id)){
						willSelectArr.push(_role);
					}
				}
				selectionModel.selectRecords(willSelectArr);
			},
			failure:function(){Ext.Msg.alert('提示','请示失败!');}
		});
	}
	
	
	/** 添加或者修改角色 **/
	function showAddOrUpdate(type){
		var title='',iconCls='',btnText='',url='',updateRole=null;
		if(type == 'add'){
			title='添加角色',iconCls='add-icon',btnText='保存',url=App.baseURL+'/sysRole.jhtml?method=add';
		}else if(type == 'update'){
			title='修改角色',iconCls='edit-icon',btnText='修改',url=App.baseURL+'/sysRole.jhtml?method=edit';
			var roleGrid = Ext.getCmp('roleGrid'),
			selectRoles = roleGrid.getSelectionModel().getSelections();
			if(selectRoles.length <= 0){
				Ext.Msg.alert('提示','请选择一个角色进行修改!');
				return;
			}else if(selectRoles.length > 1){
				Ext.Msg.alert('提示','只能选择一个角色进行修改!');
				return;
			}else{
				updateRole = selectRoles[0];
			}
		}
		if(!addOrUpdateWin){
			addOrUpdateWin = new Ext.Window({
				title:title,
				height:168,
				width:320,
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
					ref:'roleForm',
					layout:'form',
					border:false,
					labelWidth:75,
					labelAlign:'right',
					buttonAlign:'center',
					defaults:{anchor:'88%',xtype:'textfield',ctCls:'formMargin'},
					items:[{
						fieldLabel:'角色名',
						ref:'../roleName',
						allowBlank:false,
						maxLength:10,
						maxLengthText:'最长不超过{0}个长度'
					},{
						xtype:'textarea',
						height:60,
						fieldLabel:'描&nbsp;&nbsp;&nbsp;述',
						ref:'../remark',
						allowBlank:true,
						maxLength:200,
						maxLengthText:'最长不超过{0}个长度'
					}]
				})]
					,
					bbar:['->',{
						text:btnText,
						iconCls:'accept-icon',
						handler:function(){
							var roleName = addOrUpdateWin.roleName.getValue(),
							remark = addOrUpdateWin.remark.getValue(),
							myMask = new Ext.LoadMask(addOrUpdateWin.el,{msg:'正在保存数据...',removeMask:true});
							myMask.show();
							Ext.Ajax.request({
								url:url,
								method:'POST',
								params:{roleName:roleName,remark:remark,id:updateRole?updateRole.data.id:null},
								success:function(res){
									myMask.hide();
									var ret = Ext.decode(res.responseText);
									Ext.Msg.alert('提示',ret.msg);
									Ext.getCmp('roleGrid').getStore().reload();
									addOrUpdateWin.close();
								},
								failure:function(res){
									alert(res.responseText);
									myMask.hide();}
							});
						}
					},'-',{text:'重置',iconCls:'reset-icon',handler:function(){addOrUpdateWin.roleForm.getForm().reset();}},
					'-',{text:'取消',iconCls:'cancel-icon',handler:function(){addOrUpdateWin.close();}}
					]
			});
		}
		addOrUpdateWin.show();
		if(type == 'update'){
			addOrUpdateWin.roleName.setValue(updateRole.data.roleName);
			addOrUpdateWin.remark.setValue(updateRole.data.remark);
		}
	}
	
	/** 输入框查询角色 **/
	function search(t,e){
		var searchtext = Ext.get('searchRoleText').getValue(),
		_roleStore = Ext.getCmp('roleGrid').getStore();
		if(!/^\s*$/.test(searchtext) && searchtext !='输入名称查找'){
			Ext.apply(_roleStore.baseParams,{roleName:searchtext});
			_roleStore.load();
		}else{
			Ext.apply(_roleStore.baseParams,{roleName:''});
			_roleStore.load();
		}
	}
	
	function init(){
		roleStore = new Ext.data.Store({
			autoLoad:false,
			proxy:new Ext.data.HttpProxy({url:App.baseURL+'/sysRole.jhtml?method=list'}),
			reader:new Ext.data.JsonReader({
				totalProperty:'total',
				root:'rows',
				idProperty:'id'
			},['id','roleName','remark']),
			baseParams:{start:0,limit:limit}
		}),
		sm = new Ext.grid.CheckboxSelectionModel({singleSelect:false}),
		cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),sm,
			{header : '<center>角色名</center>',dataIndex : 'roleName',sortable : true,width : 200},
			{header : '<center>备  注</center>',dataIndex : 'remark',sortable : true,id:'roleremarkex'},
			{header : '<center>授  权</center>',align:'center',dataIndex : 'id',width : 220,sortable : false, renderer:function(){
				var str = '';
				if(hasPermission('sys_role_module')){
					str += '<a name="acl">模块授权</a>&nbsp;&nbsp;&nbsp;';
				}
				if(str==''){
					return '<font color="red">无授权操作</font>';
				}else{
					return str;
				}
			}}
		]),
		roleGrid = new Ext.grid.GridPanel({
			id : 'roleGrid',
			border : false,
			columnLines : true,
			autoScroll : true,
			store : roleStore,
			autoHeight:false,
			stripeRows:true,
			autoExpandColumn:'roleremarkex',
			cm : cm,
			sm : sm,
			loadMask : {msg : '正在加载数据……'},
			bbar:new Ext.PagingToolbar({
				pageSize : limit,
				store : roleStore,
				emptyMsg : "<font color='red'>没有记录</font>",
				displayInfo : true,
				plugins:new Ext.ux.ComboPageSize({addToItem:true,index:10})
			}),
			tbar:[{text:'添加',iconCls:'add-icon',hidden:!hasPermission('sys_role_add'),handler:function(){showAddOrUpdate('add');}},
				' ',{text:'修改',iconCls:'edit-icon',hidden:!hasPermission('sys_role_update'),handler:function(){showAddOrUpdate('update');}},
				' ',{text:'删除',iconCls:'delete-icon',hidden:!hasPermission('sys_role_delete'),handler:doDelete},
				'->',{xtype:'textfield',emptyText:'输入名称查找',enableKeyEvents:true,id:'searchRoleText',width:100,
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
			},
			{text:'查&nbsp;&nbsp;询',iconCls:'query-icon',handler:search},
			'-',{text:'刷&nbsp;&nbsp;新',iconCls:'refresh-icon',handler:function(){roleStore.reload();}}],
			listeners:{
				cellclick:function(grid,rowIndex,columnIndex,e){
					var rstore = grid.getStore(),
					record = rstore.getAt(rowIndex); 
					if(columnIndex==4){
						if(!e.getTarget("a"))return;
						var target = e.getTarget("a").name;
						if(target=="acl"){
							showAclWin(record);
						}
					}
				}
			}
		});	
		var win = new Ext.Window({
			id:"roleWin",
			height:350,
			width:500,
			title : '&nbsp;角色管理&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
			iconCls:"role",
			constrain:true,
			modal:true,
			resizable:false,
			renderTo: document.body,
			closeAction:'close',
			bodyStyle:'background-color:white;',
			listeners:{close:function(){win.destroy();win = null;}},
			layout:'fit',
			items:[roleGrid]
		});
		tabId="roleWin";
		win.show();
		roleStore.load();
	}
	
	function doDelete(){
		var ids = '',grid = Ext.getCmp('roleGrid'),selects = grid.getSelectionModel().getSelections();
		if(selects.length <= 0){
			Ext.Msg.alert('提示','请选择记录进行删除!');
			return;
		}
		for (var i = 0; i < selects.length; i++) {
			ids += ',' + selects[i].json.id;
		}
		Ext.Msg.confirm("提示","删除角色信息，将把角色相关信息一起删除，您确定要删除吗？",function(val){
			if(val=='yes'){
				 Ext.Ajax.request({
					url:App.baseURL+'/sysRole.jhtml?method=delete',
					method:'POST',
					params:{ids:ids.substring(1)},
					success:function(response){
						var json = Ext.decode(response.responseText);
						Ext.Msg.alert("提示",json.msg);
						grid.getStore().reload();
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