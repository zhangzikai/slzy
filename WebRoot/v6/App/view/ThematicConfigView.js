Ext.define('MyApp.view.ThematicConfigView', {
    extend: 'Ext.window.Window',
    alias:'widget.ThematicConfigViewWidget',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean',
        'Ext.grid.View',
        'Ext.button.Button',
        'Ext.toolbar.Paging'
    ],

    height: 366,
    width: 640,
    layout: 'fit',
    title: '专题图配置',
    modal:true,
    constrain: true,

    initComponent: function() {
        var me = this;
        
        var store = Ext.create('Ext.data.Store', {
            fields: ['id','themeName','url','layers'],
            autoLoad:true,
            proxy: {
                type: 'ajax',
                url: SystemTool.basePath+'/themeMap.jhtml?method=queryList',
                reader: {
                    type: 'json',
                    root:'rows'
                }
            }
        });
        
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    header: false,
                    name:'griduser',
                    title: 'My Grid Panel',
                    store:store,
                    columns: [
                              {xtype:'rownumberer'},
                        {xtype:'gridcolumn',header:'ID',hidden:true,width:20,sortable:true,dataIndex:'id',flex:1},
						{xtype:'gridcolumn',header:'专题图名称', width:60,sortable:true,dataIndex:'themeName',flex:1},
						{xtype:'gridcolumn',header:'专题图服务地址',width:60,sortable:true,dataIndex:'url',flex:2},
						{xtype:'gridcolumn',header:'图层',width:60,sortable:true,dataIndex:'layers',flex:1}
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            height: 37,
                            items: [
                                {
                                    xtype: 'button',
                                    text: '新增',
                                    handler:function(){
                                    	var win = Ext.ComponentQuery.query('window[name="addUser"]')[0];
                                    	if(win==null){
                                    	    win = new Ext.create('Ext.window.Window',{
                                    		height: 260,
                                    		width: 430,
                                    		layout: 'fit',
                                    		title: '添加专题图',
                                    		name:'addUser',
                                    	    layout: 'fit',
                                    	    modal:true,
                                    	    constrain: true,
                                    	    items: [
                                            	      {
                                					    xtype: 'form',
                                					    bodyPadding: 10,
                                					    header: false,
                                					    title: 'My Form',
                                					    items: [
                                					        {
                                					            xtype: 'textfield',
                                					            anchor: '100%',
                                					            fieldLabel: '专题图名称',
                                					            labelAlign: 'right',
                                					            labelWidth: 60,
                                					            name:'themeName'
                                					        },
                                					        {
                                					            xtype: 'textfield',
                                					            anchor: '100%',
                                					            fieldLabel: '专题图服务地址',
                                					            name:'url',
                                					            labelAlign: 'right',
                                					            labelWidth: 60
                                					        },
                                					        {
                                					            xtype: 'textfield',
                                					            anchor: '100%',
                                					            fieldLabel: '图层',
                                					            name:'layers',
                                					            labelAlign: 'right',
                                					            labelWidth: 60
                                					        }
                                					    ],
                                					    buttons: [{
                                                            text: '保存',
                                                            handler:function(){
                                                            	var form = win.down('form');
                                                            	if(form.isValid()){
                	            	                    		   form.submit({
                	            	                    			    clientValidation: true,
                													    url:SystemTool.basePath+'/themeMap.jhtml?method=add',
                	            	                    			    success: function(form, action) {
                          	            	                    		   store.loadPage(1);
                         	            	                    		   win.close();
                	            	                    			    }
                        	            	                       });
                    	            	                        }
                                	            	        }
                                                        },{
                                                            text: '取消',
                                                            scope:this,
                                                            handler:function(button,e,eOpts){
                                                            	var win = button.up('window');
                                                            	win.close();
                                            		        }
                                                        }]
                                					}
                                    	       ]
                                    	});
                                    	}
                                    	win.show();
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: '编辑',
                                    handler:function(button, e, eOpts){
                                    	var comp = button.up('window');
                                        var gridpanel = comp.down('gridpanel');
                                        var record = gridpanel.getSelectionModel().getSelection()[0];
                                        if (record == null) {
                                            Ext.Msg.alert("提示", "请选择要编辑的专题图配置");
                                            return;
                                        }
                                        
                                        var winEdit = new Ext.create('Ext.window.Window',{
                                    		height: 260,
                                    		width: 430,
                                    		layout: 'fit',
                                    		title: '修改用户',
                                    	    modal:true,
                                    	    constrain: true,
                                    	    items: [
                                            	      {
                                					    xtype: 'form',
                                					    bodyPadding: 10,
                                					    header: false,
                                					    title: 'My Form',
                                					    items: [
                            					            {
                            					            	xtype:'hidden',
                            					            	name:'id'
                            					            },
                            					            {
                                					            xtype: 'textfield',
                                					            anchor: '100%',
                                					            fieldLabel: '专题图名称',
                                					            labelAlign: 'right',
                                					            labelWidth: 60,
                                					            name:'themeName'
                                					        },
                                					        {
                                					            xtype: 'textfield',
                                					            anchor: '100%',
                                					            fieldLabel: '专题图服务地址',
                                					            name:'url',
                                					            labelAlign: 'right',
                                					            labelWidth: 60
                                					        },
                                					        {
                                					            xtype: 'textfield',
                                					            anchor: '100%',
                                					            fieldLabel: '图层',
                                					            name:'layers',
                                					            labelAlign: 'right',
                                					            labelWidth: 60
                                					        }
                                					    ],
                                					    buttons: [{
                                                            text: '保存',
                                                            handler:function(){
                                                            	var form = winEdit.down('form');
                                                            	if(form.isValid()){
                                                            		form.submit({
                                                            			url:SystemTool.basePath+'/themeMap.jhtml?method=edit',
                                	                    			    success: function(form, action) {
                           	            	                    		   store.loadPage(1);
                           	            	                    		   winEdit.close();
                                	                    			    }
                                                            		});
                                                            	}
                                                            }
                                                        },{
                                                            text: '取消',
                                                            scope:this,
                                                            handler:function(button){
                                                            	var win = button.up('window');
                                                            	win.close();
                                            		        }
                                                        }]
                                					}
                                    	       ]
                                    	});
                                        
                                        winEdit.show();
                                        winEdit.down('form').loadRecord(record);
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: '删除',
                                    handler:function(button, e, eOpts){
                                    	var comp = button.up('window');
                                        var gridpanel = comp.down('gridpanel');
                                        var record = gridpanel.getSelectionModel().getSelection()[0];
                                        if (record == null) {
                                            Ext.Msg.alert("提示", "请选择要删除的专题图");
                                            return;
                                        }
                                        Ext.Msg.confirm("提示", "确认删除吗？", function (btn) {
                                            if (btn == "yes") {
                                                Ext.Ajax.request({
                                                    url: SystemTool.basePath+'/themeMap.jhtml?method=delete',
                                                    params: {
                                                    	ids: record.get('id')
                                                    },
                                                    success: function (response) {
                                                        var obj = Ext.JSON.decode(response.responseText);
                                                        gridpanel.getStore().loadPage(1);
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
                        },
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: 360,
                            displayInfo: true,
                            store: store,
                            items: [
                               '-',
                               '每页显示',
                               {
                                   xtype: 'combo',
                                   width: 60,
                                   displayField: 'pageSize',
                                   valueField: 'pageSize',
                                   emptyText: 40,
                                   editable: false,
                                   store: Ext.create('Ext.data.Store', {
                                       fields: ['pageSize'],
                                       data: [
                                           { 'pageSize': 10 }, { 'pageSize': 20 }, { 'pageSize': 40 }, { 'pageSize': 60 }, { 'pageSize': 80 }, { 'pageSize': 100 }
                                       ]
                                   }),
                                   listeners: {
                                       select: {
                                           fn: function (combo, records, eOpts) {
                                               var pagingtoolbar = combo.up('pagingtoolbar');
                                               if (pagingtoolbar == null) return;
                                               var store = pagingtoolbar.getStore();
                                               if (store == null) return;
                                               var itemsPerPage = parseInt(combo.getValue());
                                               store.pageSize = itemsPerPage;
                                               store.loadPage(1);//显示第一页
                                           }
                                       }
                                   }
                               },
                               '条'
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});