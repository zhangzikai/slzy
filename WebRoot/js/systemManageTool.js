/*
 * 系统管理工具 2013-12-20 11:25:16
 * */
//类 SystemManageTool
var SystemManageTool={
		/**
		*打开系统管理菜单
		*用户管理、角色管理、权限管理、日志管理
		*/
		systemManage:function(){
			var isShow=SystemTool.createTab("systemManageTab","系统管理",this.getHtml());
			if(isShow){
				return;
			}
		},
		/**
		*打开用户管理
		*用户查询、添加用户、修改用户、删除用户、修改密码、分配权限
		*/
		userQuery:function(){
			//var isShow=SystemTool.createTab("userTab","用户查询",'<div id="userToolBarDiv"></div><div id="userGridDiv"></div>');
//			if(isShow){
//				return;
//			}
			var ds = new Ext.data.Store({//这是数据源
		        proxy : new Ext.data.HttpProxy({url:SystemTool.basePath+'/sysUser.jhtml?method=queryList'}),
		        reader: new Ext.data.JsonReader({
		            root: 'rows',
		            totalProperty: 'total',
		            id: 'userid'
		            },['userid','username','realname','sex','address','password','age'])
		    });
//		    var colModel = new Ext.grid.ColumnModel([//定义列
//		         {header:'ID',width:20,sortable:true,dataIndex:'userid'},
//		         {header:'用户名', width:60,sortable:true,dataIndex:'username'},
//		         {header:'真实姓名',width:60,sortable:true,dataIndex:'realname'},
//		         {header:'性别',width:30,sortable:true,dataIndex:'sex'},
//		         {header:'地址',width:80,sortable:true,dataIndex:'address'},
//		         {header:'密码',width:40,sortable:true,dataIndex:'password'},
//		         {header:'年龄',width:20,sortable:true,dataIndex:'age'}
//		        ]);
		    var grid = new Ext.grid.GridPanel({//列表
		    	 tbar : [ {  
	                    xtype : 'button',  
	                    text : '新增',  
	                    handler :function() {
	                    	SystemTool.createTab("newUserTab","新增用户",'<div id="newUserDiv"></div>');
	                    	var newUserForm = new Ext.FormPanel({
	                            labelWidth: 75, // label settings here cascade unless overridden
	                            url:SystemTool.basePath+'/sysUser.jhtml?method=add',
	                            frame:true,
	                            renderTo:'newUserDiv',
	                            title: '新增用户',
	                            bodyStyle:'padding:5px 5px 0',
	                            width: 290,
	                            defaultType: 'textfield',
	                            items: [{
	                                    fieldLabel: '用户名',
	                                    id:'usernameTxt',
	                                    name: 'username',
	                                    anchor:'90%',
	                                    allowBlank:false
	                                },
	                                {
	                                    fieldLabel: '密码',
	                                    name: 'password',
	                                    anchor:'90%',
	                                    allowBlank:false
	                                 },{
	                                    fieldLabel: '确认密码',
	                                    name: 'password-cfrm',
	                                    anchor:'90%',
	                                    allowBlank:false
	                                 },{
	                                    fieldLabel: '姓名',
	                                    name: 'realname',
	                                    anchor:'90%',
	                                    allowBlank:false
	                                },{
	                                    xtype: 'radiogroup',
	                                    fieldLabel: '性别',
	                                    items: [
	                                        {boxLabel: '男', name: 'sex',inputValue:'男',checked: true},
	                                        {boxLabel: '女', name: 'sex',inputValue:'女'}
	                                    ]
	                                },{
	                                    fieldLabel: '地址',
	                                    name: 'address',
	                                    anchor:'90%',
	                                    allowBlank:false
	                                }, {
	                                    fieldLabel: '年龄',
	                                    name: 'age',
	                                    anchor:'90%',
	                                    allowBlank:false
	                                }
	                            ],
	                            buttons: [{
	                                text: '保存',
	                                handler:function(){
	                                	if(newUserForm.getForm().isValid()){
	                                		Ext.Ajax.request({
			            	                       url: SystemTool.basePath+'/sysUser.jhtml?method=exists',
			            	                       params: {username:Ext.get('usernameTxt').dom.value},
			            	                       method: 'POST',
			            	                       success: function(response,options){
			            	                    	   var responseJson = Ext.util.JSON.decode(response.responseText);;
			            	                    	   if(responseJson.result){
			            	                    		   newUserForm.getForm().submit();
			            	                    		   SystemTool.deleteTab("newUserTab"); 
			            	                    		   ds.load({params:{start:0, limit:20}});
			            	                    	   }else{
			            	                    		   alert(Ext.get('usernameTxt').dom.value+" 此用户名已占用!");
			            	                    	   }
			            	                        }
			            	                  });
	                                	}
	                                }
	                            },{
	                                text: '重置',
	                                handler:function(){
	                                	newUserForm.getForm().reset();
		            		        }
	                            },{
	                                text: '取消',
	                                handler:function(){
	                                	SystemTool.deleteTab("newUserTab");
		            		        }
	                            }]
	                        });
	            	    }  
	                },{  
	                    xtype : 'button',  
	                    text : '编辑',  
	                    handler :function() {
	                    	SystemTool.createTab("editUserTab","编辑用户",'<div id="editUserDiv"></div>');
	                    	var editUserForm = new Ext.FormPanel({
	                            labelWidth: 75, // label settings here cascade unless overridden
	                            url:SystemTool.basePath+'/sysUser.jhtml?method=edit',
	                            frame:true,
	                            renderTo:'editUserDiv',
	                            title: '编辑用户',
	                            bodyStyle:'padding:5px 5px 0',
	                            width: 290,
	                            defaults: {width: 230},
	                            defaultType: 'textfield',
	                            items: [{
	                                    fieldLabel:'userid',
	                                    name:'userid',
	                                    hideLabel:true,
	                                    hidden:true
	                                },{
	                                    fieldLabel: '用户名',
	                                    id:'usernameTxt',
	                                    name:'username',
	                                    anchor:'90%',
	                                    readOnly:true
	                                },{
	                                    fieldLabel: '姓名',
	                                    name: 'realname',
	                                    anchor:'90%',
	                                    allowBlank:false
	                                },{
	                                    xtype: 'radiogroup',
	                                    fieldLabel: '性别',
	                                    items: [
	                                        {boxLabel: '男', name: 'sex',inputValue:'男',checked: true},
	                                        {boxLabel: '女', name: 'sex',inputValue:'女'}
	                                    ]
	                                },{
	                                    fieldLabel: '地址',
	                                    name: 'address',
	                                    anchor:'90%',
	                                    allowBlank:false
	                                }, {
	                                    fieldLabel: '年龄',
	                                    name: 'age',
	                                    anchor:'90%',
	                                    allowBlank:false
	                                }
	                            ],
	                            buttons: [{
	                                text: '保存',
	                                handler:function(){
	                                	if(editUserForm.getForm().isValid()){
            	                    		   editUserForm.getForm().submit();
            	                    		   SystemTool.deleteTab("editUserTab"); 
            	                    		   ds.load({params:{start:0, limit:20}});
	                                	}
	                                }
	                            },{
	                                text: '重置',
	                                handler:function(){
	                                	editUserForm.getForm().reset();
		            		        }
	                            },{
	                                text: '取消',
	                                handler:function(){
	                                	SystemTool.deleteTab("editUserTab");
		            		        }
	                            }]
	                        });
	                    	var s = grid.getSelectionModel().getSelections();
	            	        if (s.length==0) {
	            	            alert('你还没有选择要操作的记录！');
	            	        }else{
	            	        	var record = grid.getSelectionModel().getSelected(); 
		                    	editUserForm.getForm().loadRecord(record);
	            	        }
	            	    } 
	                }, {  
	                    xtype : 'button',  
	                    text : '删除',  
	                    handler :function(){
	                    	var s =grid.getSelectionModel().getSelections();
	                    	var ids="0";
	                        for (i=0;i<s.length;i++) {
	                            ids=ids+","+s[i].id;
	                        }
	                        if(ids!="0") {
	                        	var bln=confirm("确认要删除吗?");
	                            if (bln==true){
	                            	Ext.Ajax.request({
	            	                       url: SystemTool.basePath+'/sysUser.jhtml?method=delete&ids='+ids,
	            	                       success: function(result){
	            	                    	   ds.load({params:{start:0, limit:20}});
	            	                        }
	            	                  });
	                            }  
	            	        } else {
	            	        	alert('你还没有选择要操作的记录！');
	            	        }
	                    }    
	                }], 
	                border:false,
	                height:330,
	                autoWidth:true,
	                loadMask: true,
	                title:'用户列表',
	                //renderTo:'userGridDiv',
	                store: ds,
	                //cm: colModel,
	                columns:[
						{header:'ID',width:20,sortable:true,dataIndex:'userid'},
						{header:'用户名', width:60,sortable:true,dataIndex:'username'},
						{header:'真实姓名',width:60,sortable:true,dataIndex:'realname'},
						{header:'性别',width:30,sortable:true,dataIndex:'sex'},
						{header:'地址',width:80,sortable:true,dataIndex:'address'},
						{header:'密码',width:40,sortable:true,dataIndex:'password'},
						{header:'年龄',width:20,sortable:true,dataIndex:'age'}
	                     ],
	                autoScroll: true,
	                bbar: new Ext.PagingToolbar({
	                    pageSize: 20,
	                    store: ds,
	                    displayInfo: true
	                })
	            });
		    var top = new Ext.FormPanel({//这里是搜索表单
		        buttonAlign:'right',
		        labelWidth:70,
		        region:'center',
		        renderTo:'userToolBarDiv',
		        frame:true,
		        title: '搜索',
		        items: [{
		                layout:'column',
		                items:[{
		                    columnWidth:.5,
		                    layout: 'form',
		                    items: [{
		                        xtype:'textfield',
		                        fieldLabel: '用户名',
		                        id:'search_username',
		                        anchor:'95%'
		                    }]
		                },{
		                    columnWidth:.5,
		                    layout: 'form',
		                    items: [{
		                        xtype:'textfield',
		                        fieldLabel: '姓名',
		                        id:'search_realname',
		                        anchor:'95%'
		                    }]
		                }]
		            }
		        ],
		        buttons: [{
		            text: '搜索',
		            handler:function(){
		                ds.load({params:{start:0, limit:20,
		                    username:Ext.get('search_username').dom.value,
		                    realname:Ext.get('search_realname').dom.value}});
		            }
		        },{
		            text: '重置',
		            handler:function(){top.form.reset();}
		        }]
		    });
		    
		    ds.load({params:{start:0, limit:20}});
		    // 这里很关键，如果不加，翻页后搜索条件就变没了，这里的意思是每次数据载入前先把搜索表单值加上去，这样就做到了翻页保留搜索条件了
		    ds.on('beforeload',function(){
//		        Ext.apply(
//		        this.baseParams,
//		        {
//		            username:Ext.get('search_username').dom.value,
//		            realname:Ext.get('search_realname').dom.value
//		        });
		    });
		},
		/**
		*打开角色管理
		*角色查询、添加角色、修改角色、删除角色
		*/
		roleQuery:function(){
			SystemTool.createTab("roleTab","角色查询",'<div id="north-div"></div><div id="center"></div>');
		},
		/**
		*打开权限管理
		*权限查询、添加权限、修改权限、删除权限
		*/
		privilegeQuery:function(){
			SystemTool.createTab("privilegeTab","权限查询",'<div id="north-div"></div><div id="center"></div>');
		},
		/**
		*打开系统日志管理
		*日志查询、删除日志
		*/
		sysLogQuery:function(){
			var isShow=SystemTool.createTab("sysLogTab","日志查询",'<div id="sysLogToolBarDiv"></div><div id="sysLogGridDiv"></div>');
			if(isShow){
				return;
			}
			var ds = new Ext.data.Store({//这是数据源
		        proxy : new Ext.data.HttpProxy({url:SystemTool.basePath+'/sysLog.jhtml?method=listPage'}),
		        reader: new Ext.data.JsonReader({
		            root: 'rows',
		            totalProperty: 'total',
		            id: 'id'
		            },['id','userName','logIp','logInfo','logTime'])
		    });
		    var colModel = new Ext.grid.ColumnModel([//定义列
		         {header:'ID',width:40,sortable:true,dataIndex:'id'},
		         {header:'用户', width:60,sortable:true,dataIndex:'userName'},
		         {header:'ip',width:60,sortable:true,dataIndex:'logIp'},
		         {header:'信息',width:80,sortable:true,dataIndex:'logInfo'},
		         {header:'时间',width:80,sortable:true,dataIndex:'logTime'}
		        ]);
		    var grid = new Ext.grid.GridPanel({//列表
		    	 tbar : [{  
	                    xtype : 'button',  
	                    text : '删除',  
	                    handler :function(){
	                    	var s =grid.getSelectionModel().getSelections();
	                    	var ids="0";
	                        for (i=0;i<s.length;i++) {
	                            ids=ids+","+s[i].id;
	                        }
	                        if(ids!="0") {
	                        	var bln=confirm("确认要删除吗?");
	                            if (bln==true){
	                            	Ext.Ajax.request({
	            	                       url: SystemTool.basePath+'/sysLog.jhtml?method=delete&ids='+ids,
	            	                       success: function(result){
	            	                            ds.reload();
	            	                        }
	            	                  });
	                            }  
	            	        } else {
	            	        	alert('你还没有选择要操作的记录！');
	            	        }
	                    }  
	                }], 
	                border:false,
	                height:330,
	                autoWidth:true,
	                loadMask: true,
	                title:'日志列表',
	                store: ds,
	                renderTo:'sysLogGridDiv',
	                cm: colModel,
	                autoScroll: true,
	                bbar: new Ext.PagingToolbar({
	                    pageSize: 20,
	                    store: ds,
	                    displayInfo: true
	                })
	            });
		    var top = new Ext.FormPanel({//这里是搜索表单
		        buttonAlign:'right',
		        labelWidth:70,
		        region:'center',
		        renderTo:'sysLogToolBarDiv',
		        frame:true,
		        title: '搜索',
		        items: [{
		                layout:'column',
		                items:[{
		                    columnWidth:.8,
		                    layout: 'form',
		                    items: [{
		                        xtype:'textfield',
		                        fieldLabel: '关键字',
		                        id:'logKeyword',
		                        anchor:'95%'
		                    }]
		                }]
		            }
		        ],
		        buttons: [{
		            text: '搜索',
		            handler:function(){
		                ds.load({params:{start:0, limit:20,keyword:Ext.get('logKeyword').dom.value}});
		            }
		        },{
		            text: '重置',
		            handler:function(){top.form.reset();}
		        }]
		    });
		    ds.load({params:{start:0, limit:20}});
	        // 这里很关键，如果不加，翻页后搜索条件就变没了，这里的意思是每次数据载入前先把搜索表单值加上去，这样就做到了翻页保留搜索条件了
		    ds.on('beforeload',function(){
		        Ext.apply(this.baseParams,{keyword:Ext.get('logKeyword').dom.value});
		    });
		}
};
