Ext.define('MyApp.view.RoleManagerView', {
    extend: 'Ext.window.Window',
    alias: 'widget.RoleManagerWidget',

    requires: [
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel'
    ],

    layout: 'fit',
    title: '角色管理',
    height: 366,
    width: 640,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    name: 'roleGridpanel',
                    title: '角色列表',
                    //selType: 'checkboxmodel',
                    header:false,
                    columnLines: true,
                    autoScroll: true,
                    store: Ext.create('Ext.data.Store', {
		                fields: ['id','remark','roleName'],
		                autoLoad:true,
		                proxy: {
		                    type: 'ajax',
		                    url: SystemTool.basePath+'/sysRole.jhtml?method=findAll',
		                    reader: {
		                        type: 'json',
		                        root:'rows'
		                    }
		                }
		            }),
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    name: 'btn_role_Add',
                                    iconCls: "x-btn-text-icon-add",
                                    text: '添加',
                                    handler:function(button,e,eOpt){
                                    	var win = Ext.widget('RoleEditWidget');
                                    	win.show();
                                    }
                                },
                                {
                                    xtype: 'button',
                                    name: 'btn_role_Modify',
                                    iconCls: 'x-btn-text-icon-modify',
                                    text: '修改',
                                    handler:function(button,e,eOpt){
                                    	var win = Ext.widget('RoleEditWidget');
                                    	win.show();
                                    	var comp = button.up('window');
                                        var gridpanel = comp.down('gridpanel');
                                        var record = gridpanel.getSelectionModel().getSelection()[0];
                                    	var form = win.down('form');
                                    	form.loadRecord(record);
                                    }
                                },
                                {
                                    xtype: 'button',
                                    name: 'btn_role_Delete',
                                    iconCls: 'x-btn-text-icon-delete',
                                    text: '删除',
                                    handler:function(button,e,eOpt){
                                    	var comp = button.up('window');
                                        var gridpanel = comp.down('gridpanel');
                                        var record = gridpanel.getSelectionModel().getSelection()[0];
                                        if (record == null) {
                                            Ext.Msg.alert("提示", "请选择要删除的角色");
                                            return;
                                        }
                                        Ext.Msg.confirm("提示", "确认删除吗？", function (btn) {
                                            if (btn == "yes") {
                                                Ext.Ajax.request({
                                                    url: SystemTool.basePath+'/sysRole.jhtml?method=delete',
                                                    params: {
                                                    	ids: record.get('id')
                                                    },
                                                    success: function (response) {
                                                        var obj = Ext.JSON.decode(response.responseText);
                                                        gridpanel.getStore().load();
                                                    },
                                                    failure: function (response) {
                                                        Ext.Msg.alert("提示", "删除失败<br/>网络连接出错");
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }
                            ]
                        }
                    ],
                    columns: [
                              {xtype:'rownumberer'},
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'id',
                            text: '角色ID',
                            hidden: true
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'roleName',
                            flex: 1,
                            text: '角色名称'
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            dataIndex: 'remark',
                            text: '角色描述'
                        },
                        {
                            xtype: 'actioncolumn',
                            text: '授权',
                            align: 'center',
                            flex: 0.5,
                            items: [
                                {
                                    handler: function (view, rowIndex, colIndex, item, e, record, row) {
                                        var roleID = record.get('id');
                                        var window = new Ext.create('Ext.window.Window',{
                                        	height: 400,
                                    		width: 330,
                                    		layout: 'fit',
                                    		title: '角色授权',
                                    	    modal:true,
                                    	    constrain: true,
                        		            listeners: {
                                                render: function(component,eOpts){
//                                                	var tree = component.down('treepanel');
//                                                	var store = tree.getStore();
//                                        			Ext.Ajax.request({
//                                        				url:SystemTool.basePath+'/sysRole.jhtml?method=get',
//                                        				params:{id:roleID},
//                                        				success:function(response){
//                                        					var obj = Ext.JSON.decode(response.responseText);
//                                        					for(var i=0;i<obj.modules.length;i++){
//                                        						var id = obj.modules[i].id;
//                                        						var node = store.getNodeById(id);
//                                        						if(node){
//                                        							node.checked = true;
//                                        						}
//                                        					}
//                                        				}
//                                        			});
                                                }
                                            },
                                    	    items:[
												{
												    xtype: 'treepanel',
												    name: 'permission',
												    displayField: 'moduleName',
												    valueField: 'id',
												    rootVisible: true,
												    height: 195,
												    listeners:{
		                                                itemexpand:function(node,eOpts){
		                                                	var tree = window.down('treepanel');
		                                                	Ext.Ajax.request({
		                                            			url:SystemTool.basePath+'/sysModule.jhtml?method=getModuleByRole',
		                                            			params:{roleID:roleID},
		                                            			success:function(response){
		                                            				var obj = Ext.JSON.decode(response.responseText);
		                                            				if(obj==null || obj.length<1){
		                                            					if(node.hasChildNodes()){
		                                            						for(var i=0;i<node.childNodes.length;i++){
		                                            							node.getChildAt(i).set('checked',false);
		                                            						}
		                                            					}
		                                            				}
	                                            					if(node.hasChildNodes()){
	                                            						for(var i=0;i<node.childNodes.length;i++){
//	                                            							if(node.get('checked')==true){
//	                                            								node.getChildAt(i).set('checked',true);
//	                                            							}
	                                            							for(var j=0;j<obj.length;j++){
	                                            								if(node.getChildAt(i).data.id==obj[j].sys_module_id){
	                                            									node.getChildAt(i).set('checked',true);
			                                            							break;
	                                            								}else{
	                                            									node.getChildAt(i).set('checked',false);
	                                            								}
	                                            							}
	                                            						}
	                                            					}
		                                            			},
		                                            			failure:function(){Ext.Msg.alert('提示','请示失败!');}
		                                            		});
		                                                },
		                                                checkchange:function(node,checked,eOpts){
	                                                		node.expandChildren(true);
	                                                		node.expand();
//		                                                	for(var i=0;i<node.childNodes.length;i++){
//		                                                		node.getChildAt(i).set('checked',checked);
//		                                                	}
	                                                		node.cascadeBy(function(childNode){
	                                                			childNode.set('checked',checked);
	                                                		});
		                                                }
												    },
												    dockedItems: [
										                  {
										                      xtype: 'toolbar',
										                      dock: 'top',
										                      items: [
										                          {
										                              xtype: 'button',
										                              text: '保存',
										                              handler:function(button,e,eOpts){
										                            	  var tree = window.down('treepanel');
										                            	  var records = tree.getStore().getUpdatedRecords();
										                            	  var ids = "";
										                            	  var idsNo = "";
										                            	  for(var i=0;i<records.length;i++){
										                            		  if(records[i].isRoot())continue;
										                            		  if(records[i].get('checked')==true){
										                            			  if(ids.length>0){
										                            				  ids+=",";
										                            			  }
										                            			  ids+=records[i].get('id');
										                            		  }
										                            		  else{
										                            			  if(idsNo.length>0){
										                            				  idsNo+=",";
										                            			  }
										                            			  idsNo+=records[i].get('id');
										                            		  }
										                            	  }
										                            	  Ext.Ajax.request({
										                            		  url:SystemTool.basePath+'/sysModule.jhtml?method=savePremisson',
										                            		  params:{
										                            			  roleID:roleID,
										                            			  ids:ids,
										                            			  idsNo:idsNo
										                            		  },
										                            		  success:function(response){
										                            			  Ext.Msg.alert('提示','保存成功');
										                            			  window.close();
										                            		  }
										                            	  });
										                              }
										                          }
										                      ]
										                  }
										              ],
												    store: Ext.create('Ext.data.TreeStore', {
										                fields: ['id','moduleName','scn','checked','pid','checked'],
										                root: {
										                	moduleName: '权限列表',
										                    checked:true,
										                    expanded: true
										                },
										                proxy: {
										                    type: 'ajax',
										                    url: SystemTool.basePath+'/sysModule.jhtml?method=listTree',
										                    reader: {
										                        type: 'json',
										                        root:'rows'
										                    }
										                }
										            }),
												    viewConfig: {
												
												    },
												    columns: [
												         {
												             xtype: 'treecolumn',
												             dataIndex: 'moduleName',
												             text: '模块名称',
												             flex: 1
												         },
												         {
												             xtype: 'gridcolumn',
												             dataIndex: 'id',
												             text: '权限ID',
												             hidden: true
												         }
												    ]
												}
                                    	    ]
                                        });
                                        window.show();
                                    },
                                    icon: SystemTool.basePath+'/images/icon/edit.png',
                                    tooltip: '模块授权'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});