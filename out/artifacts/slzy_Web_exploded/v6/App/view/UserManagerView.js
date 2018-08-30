Ext.define('MyApp.view.UserManagerView', {
    extend: 'Ext.window.Window',
    alias:'widget.userManagerWidget',

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
    title: '用户管理',
    modal:true,
    constrain: true,

    initComponent: function() {
        var me = this;
        
        var store = Ext.create('Ext.data.Store', {
            fields: ['userid','username','realname','sex','address','password','age','usertype'],
            autoLoad:true,
            proxy: {
                type: 'ajax',
                url: SystemTool.basePath+'/sysUser.jhtml?method=queryList',
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
                        {xtype:'gridcolumn',header:'ID',hidden:true,width:20,sortable:true,dataIndex:'userid',flex:1},
						{xtype:'gridcolumn',header:'用户名', width:60,sortable:true,dataIndex:'username',flex:1},
						{xtype:'gridcolumn',header:'真实姓名',width:60,sortable:true,dataIndex:'realname',flex:1},
						{xtype:'gridcolumn',header:'性别',width:30,sortable:true,dataIndex:'sex',flex:1},
						{xtype:'gridcolumn',header:'行政区划',width:80,sortable:true,dataIndex:'address',flex:1},
						//{xtype:'gridcolumn',header:'密码',width:40,sortable:true,dataIndex:'password',flex:1},
						{xtype:'gridcolumn',header:'年龄',width:20,sortable:true,dataIndex:'age',flex:1},
						{xtype:'gridcolumn',header:'角色',width:20,sortable:true,dataIndex:'usertype',flex:1}
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
                                    		height: 348,
                                    		width: 430,
                                    		layout: 'fit',
                                    		title: '添加用户',
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
                                					            fieldLabel: '用户名',
                                					            labelAlign: 'right',
                                					            labelWidth: 60,
                                					            name:'username'
                                					        },
                                					        {
                                					            xtype: 'textfield',
                                					            anchor: '100%',
                                					            fieldLabel: '密码',
                                					            name:'password',
                                					            labelAlign: 'right',
                                					            labelWidth: 60
                                					        },
                                					        {
                                					            xtype: 'textfield',
                                					            anchor: '100%',
                                					            fieldLabel: '确认密码',
                                					            labelAlign: 'right',
                                					            name:'password-cfrm',
                                					            labelWidth: 60
                                					        },
                                					        {
                                					            xtype: 'textfield',
                                					            anchor: '100%',
                                					            fieldLabel: '姓名',
                                					            labelAlign: 'right',
                                					            name:'realname',
                                					            labelWidth: 60
                                					        },
                                					        {
                                					            xtype: 'radiogroup',
                                					            fieldLabel: '性别',
                                					            labelAlign: 'right',
                                					            items: [
                                					                {
                                					                    xtype: 'radiofield',
                                					                    boxLabel: '男',
                                					                    name: 'sex',
                                					                    inputValue:'男',
                                					                    checked: true
                                					                },
                                					                {
                                					                    xtype: 'radiofield',
                                					                    boxLabel: '女',
                                					                    inputValue:'女',
                                					                    name: 'sex'
                                					                }
                                					            ]
                                					        },
                                					        {
                                					        	xtype : 'treepicker',
																fieldLabel : '行政区划',
																labelAlign : 'right',
																labelWidth : 60,
																anchor : '100%',
																margin : 10,
																name : 'address1',
																displayField : 'text',
																valueField : 'value',
																rootVisible : true,
																maxPickerHeight : 300,
																store : Ext.create('Ext.data.TreeStore', {
																	fields : ['id','text', 'value', 'codelevel', 'code' ],
																	root : {
																		expanded : true,
																		text : "辽宁省",//cur_areaName,
																		id : '0021',//cur_areaID,
																		leaf : false
																	},
																	proxy : {
																		type : 'ajax',
																		// url: SystemTool.basePath +'/datas/data.txt',
																		url : hostPath + '/j2UnitCode.jhtml?method=queryList',
																		reader : {
																			type : 'json'
																		}
																	}
																})
                                					        },
                                					        {
                                					            xtype: 'textfield',
                                					            anchor: '100%',
                                					            fieldLabel: '年龄',
                                					            labelAlign: 'right',
                                					            labelWidth: 60,
                                					            name:'age'
                                					        },
                                					        {
                                					        	xtype:'combobox',
                                					        	anchor: '100%',
                                					            fieldLabel: '角色',
                                					            name:'roleid',
                                					            labelAlign: 'right',
                                					            valueField:'id',
                                					            displayField:'roleName',
                                					            labelWidth: 60,
                                					            store:Ext.create('Ext.data.Store', {
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
                                					            })
                                					        }
                                					    ],
                                					    buttons: [{
                                                            text: '保存',
                                                            handler:function(){
                                                            	var form = win.down('form');
                                                            	if(form.isValid()){
                                                            		Ext.Ajax.request({
                                	            	                       url: hostPath+'/sysUser.jhtml?method=exists',
                                	            	                       params: {username:form.down('textfield[name="username"]').getValue()},
                                	            	                       method: 'POST',
                                	            	                       success: function(response,options){
                                	            	                    	   var responseJson = Ext.JSON.decode(response.responseText);;
                                	            	                    	   if(responseJson.result){
                                	            	                    		   var treepicker = form.down('treepicker[name="address1"]');
                                	            	                        	    var areaCode = treepicker.displayTplData[0].code;
                                	                                        	    var codelevel = treepicker.displayTplData[0].codelevel;
                                	                                        	    var codeIndex = treepicker.displayTplData[0].id;
                                                                           		   var areaName = treepicker.displayTplData[0].text;
                                                                           		   
																				   if(areaName=='辽宁省'){
																					   boundsStr='118.53,38.43,125.46,43.26';
																					   areaCode ='210000';
																					   codeLevel='1';
																					   codeIndex='0021';
																					   
																					    form.submit({
                                	            	                    			    clientValidation: true,
                                	            	                    			    params:{
                                	            	                    			    	roleId:form.down('combobox[name="roleid"]').getValue(),
                                                                            				usertype: form.down('combobox[name="roleid"]').getRawValue(),
                                                                            				areaCode:areaCode+";"+codeIndex,
                                                                            				areaName:areaName,
                                                                            				codelevel:boundsStr//codelevel
                                                                            			},
                                													    url:SystemTool.basePath+'/sysUser.jhtml?method=add',
                                	            	                    			    success: function(form, action) {
                                          	            	                    		   store.loadPage(1);
                                         	            	                    		   win.close();
                                	            	                    			    }
		                                	            	                       });
																					   
																				   }else
                                                                           		queryXZQH(codelevel, areaCode, function(req){
                                                                           			var gml = new OpenLayers.Format.GML();
                                                                           			var features = gml.read(req.responseText);
                                                                           			var bounds = features[0].geometry.getBounds();
                                                                           			var boundsStr = bounds.left+","+bounds.bottom+","+bounds.right+","+bounds.top;
                                                                           			
                                                                           			form.submit({
                                	            	                    			    clientValidation: true,
                                	            	                    			    params:{
                                	            	                    			    	roleId:form.down('combobox[name="roleid"]').getValue(),
                                                                            				usertype: form.down('combobox[name="roleid"]').getRawValue(),
                                                                            				areaCode:areaCode+";"+codeIndex,
                                                                            				areaName:areaName,
                                                                            				codelevel:boundsStr//codelevel
                                                                            			},
                                													    url:SystemTool.basePath+'/sysUser.jhtml?method=add',
                                	            	                    			    success: function(form, action) {
                                          	            	                    		   store.loadPage(1);
                                         	            	                    		   win.close();
                                	            	                    			    }
		                                	            	                       });
                                                                           		});
                                	            	                    		   
	                        	     	            	                    	   //store.load({params:{start:0, limit:20}});
                                	            	                    	   }else{
                                	            	                    		   alert(form.down('textfield[name="username"]').getValue()+" 此用户名已占用!");
                                	            	                    	   }
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
                                            Ext.Msg.alert("提示", "请选择要编辑的用户");
                                            return;
                                        }
                                        
                                        var storeRole = Ext.create('Ext.data.Store', {
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
        					            });
                                        
                                        var winEdit = new Ext.create('Ext.window.Window',{
                                    		height: 348,
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
                            					            	name:'userid'
                            					            },
                                					        {
                                					            xtype: 'textfield',
                                					            anchor: '100%',
                                					            fieldLabel: '用户名',
                                					            labelAlign: 'right',
                                					            labelWidth: 60,
                                					            name:'username'
                                					        },
                                					        {
                                					            xtype: 'textfield',
                                					            anchor: '100%',
                                					            fieldLabel: '密码',
                                					            name:'password',
                                					            labelAlign: 'right',
                                					            labelWidth: 60
                                					        },
                                					        {
                                					            xtype: 'textfield',
                                					            anchor: '100%',
                                					            name:'password1',
                                					            fieldLabel: '确认密码',
                                					            labelAlign: 'right',
                                					            //name:'password-cfrm',
                                					            labelWidth: 60
                                					        },
                                					        {
                                					            xtype: 'textfield',
                                					            anchor: '100%',
                                					            fieldLabel: '姓名',
                                					            labelAlign: 'right',
                                					            name:'realname',
                                					            labelWidth: 60
                                					        },
                                					        {
                                					            xtype: 'radiogroup',
                                					            labelAlign: 'right',
                                					            fieldLabel: '性别',
                                					            items: [
                                					                {
                                					                    xtype: 'radiofield',
                                					                    boxLabel: '男',
                                					                    name: 'sex',
                                					                    inputValue:'男',
                                					                    checked: true
                                					                },
                                					                {
                                					                    xtype: 'radiofield',
                                					                    boxLabel: '女',
                                					                    inputValue:'女',
                                					                    name: 'sex'
                                					                }
                                					            ]
                                					        },
                                					        {
                                					        	xtype : 'treepicker',
																fieldLabel : '行政区划',
																labelAlign : 'right',
																labelWidth : 60,
																anchor : '100%',
																name : 'address1',
																displayField : 'text',
																valueField : 'value',
																rootVisible : true,
																maxPickerHeight : 300,
																store : Ext.create('Ext.data.TreeStore', {
																	fields : ['id', 'text', 'value', 'codelevel', 'code' ],
																	root : {
																		expanded : true,
																		text : "辽宁省",//cur_areaName,
																		id : '0021',//cur_areaID,
																		leaf : false
																	},
																	proxy : {
																		type : 'ajax',
																		// url: SystemTool.basePath +'/datas/data.txt',
																		url : hostPath + '/j2UnitCode.jhtml?method=queryList',
																		reader : {
																			type : 'json'
																		}
																	}
																})
                                					        },
                                					        {
                                					            xtype: 'textfield',
                                					            anchor: '100%',
                                					            fieldLabel: '年龄',
                                					            labelAlign: 'right',
                                					            labelWidth: 60,
                                					            name:'age'
                                					        },
                                					        {
                                					        	xtype:'combobox',
                                					        	anchor: '100%',
                                					            fieldLabel: '角色',
                                					            labelAlign: 'right',
                                					            valueField:'id',
                                					            name:'roleid',
                                					            displayField:'roleName',
                                					            labelWidth: 60,
                                					            store:storeRole
                                					        }
                                					    ],
                                					    buttons: [{
                                                            text: '保存',
                                                            handler:function(){
                                                            	var form = winEdit.down('form');
                                                            	var pwd = form.down('textfield[name="password"]').getValue();
                                                            	var pwd1 = form.down('textfield[name="password1"]').getValue();
                                                            	if(pwd!=pwd1){
                                                            		Ext.Msg.alert("提示","密码不一致");
                                                            		return;
                                                            	}
                                                      		   var treepicker = form.down('treepicker[name="address1"]');
                                                      		   //console.log(treepicker.displayTplData[0]);
                                                      		   var areaCode = treepicker.displayTplData[0].code;
                                                      		   var areaName = treepicker.displayTplData[0].text;
           	                                        	    var codeIndex = treepicker.displayTplData[0].id;
                                                      		   var codelevel = treepicker.displayTplData[0].codelevel;
                                                            	if(form.isValid()){
																			 if(areaName=='辽宁省'){
																					   boundsStr='118.53,38.43,125.46,43.26';																				 
																					   areaCode ='210000';
																					   codeLevel='1';
																					   codeIndex='0021';
					                                                            		form.submit({
	                                                            			url:SystemTool.basePath+'/sysUser.jhtml?method=edit',
	                                                            			params:{
	                                                            				roleId:form.down('combobox[name="roleid"]').getValue(),
	                                                            				usertype: form.down('combobox[name="roleid"]').getRawValue(),
	                                                            				areaCode:areaCode+";"+codeIndex,
	                                                            				areaName:areaName,
	                                                            				codelevel:boundsStr//codelevel
	                                                            			},
	                                                            			method: 'POST',
	                                	                    			    success: function(form, action) {
	                           	            	                    		   store.loadPage(1);
	                           	            	                    		   winEdit.close();
	                                	                    			    }
	                                                            		});
		                                	            	                
																					   
																				   }else
                                                            		
                                                            		queryXZQH(codelevel, areaCode, function(req){
                                                               			var gml = new OpenLayers.Format.GML();
                                                               			var features = gml.read(req.responseText);
                                                               			var bounds = features[0].geometry.getBounds();
                                                               			var boundsStr = bounds.left+","+bounds.bottom+","+bounds.right+","+bounds.top;
                                                               			
	                                                            		form.submit({
	                                                            			url:SystemTool.basePath+'/sysUser.jhtml?method=edit',
	                                                            			params:{
	                                                            				roleId:form.down('combobox[name="roleid"]').getValue(),
	                                                            				usertype: form.down('combobox[name="roleid"]').getRawValue(),
	                                                            				areaCode:areaCode+";"+codeIndex,
	                                                            				areaName:areaName,
	                                                            				codelevel:boundsStr//codelevel
	                                                            			},
	                                                            			method: 'POST',
	                                	                    			    success: function(form, action) {
	                           	            	                    		   store.loadPage(1);
	                           	            	                    		   winEdit.close();
	                                	                    			    }
	                                                            		});
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
                                            Ext.Msg.alert("提示", "请选择要删除的用户");
                                            return;
                                        }
                                        Ext.Msg.confirm("提示", "确认删除吗？", function (btn) {
                                            if (btn == "yes") {
                                                Ext.Ajax.request({
                                                    url: SystemTool.basePath+'/sysUser.jhtml?method=delete',
                                                    params: {
                                                    	ids: record.get('userid')
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