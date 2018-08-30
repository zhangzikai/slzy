Ext.define('MyApp.view.xbFieldView', {
    extend: 'Ext.window.Window',
    alias:'widget.xbFieldWidget',

    requires: [
               'Ext.grid.Panel',
               'Ext.grid.column.Number',
               'Ext.grid.column.Date',
               'Ext.grid.column.Boolean',
               'Ext.grid.View',
               'Ext.button.Button',
               'Ext.toolbar.Paging'
    ],

    height: 508,
    width: 339,
    layout: 'fit',
    title: '查询字段配置',
    constrain: true,
    modal: true,

    initComponent: function() {
        var me = this;

        var store = Ext.create('Ext.data.Store', {
            fields: ['id','fieldAlias','isEnable'],
            autoLoad:true,
            proxy: {
                type: 'ajax',
                //url:'',
                url: SystemTool.basePath+'/xbField.jhtml?method=queryAllList',
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
                    name:'',
                    title: 'My Grid Panel',
                    store:store,
                    columns: [
                        {
                            xtype: 'rownumberer',
                            width:40
                        },
                        {
                        	xtype:'gridcolumn',
                        	dataIndex:'id',
                        	hidden:true
                        },
                        {
                            xtype: 'checkcolumn',
                            text: '选择',
                            flex:0.3,
                            dataIndex:'isEnable',
                            renderer: function(value){
                                return (new Ext.grid.column.CheckColumn).renderer(value == '1');
                            },
                            listeners: {
                                checkchange: function(column, rowIndex, checked, eOpts){
                                	var gridPanel = Ext.ComponentQuery.query('xbFieldWidget gridpanel')[0];
                                	var store = gridPanel.getStore();
                                	var record = store.getAt(rowIndex);
                                	var value = record.get('isEnable');
//                                	if(value=='1'){
//                                		record.set('isEnable','0');
//                                	}
//                                	else{
//                                		record.set('isEnable','1');
//                                	}
                                }
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'fieldAlias',
                            text: '小班字段',
                            flex: 1
                        }
                    ], 
//                    listeners: {
//                        render: function(gridpanel,eOpts){
//                        	console.log(gridpanel.getStore());
//                            //gridpanel.getStore().load();
//                        }
//                    },
                    dockedItems: [
                      {
                          xtype: 'toolbar',
                          dock: 'top',
                          items: [
                              {
                            	  xtype: 'button',
                                  text: '全选',
                                  handler:function(button){
                                	  var gridPanel = Ext.ComponentQuery.query('xbFieldWidget gridpanel')[0];
                                  	  var store = gridPanel.getStore();
                                  	  for(var i=0;i<store.getCount();i++){
                                  		  var record = store.getAt(i);
                                  		  record.set('isEnable','1');
                                  	  }
                                  }
                              },
                              {
                            	  xtype: 'button',
                                  text: '全不选',
                                  handler:function(button){
                                	  var gridPanel = Ext.ComponentQuery.query('xbFieldWidget gridpanel')[0];
                                  	  var store = gridPanel.getStore();
                                  	  for(var i=0;i<store.getCount();i++){
                                  		  var record = store.getAt(i);
                                  		  record.set('isEnable','0');
                                  	  }
                                  }
                              },
                              {
                            	  xtype:'tbfill'
                              },
                              {
                                  xtype: 'button',
                                  text: '保存',
                                  handler:function(button,e,eOpt){
                                	  var gridpanel = button.up('gridpanel');
                                	  var records = gridpanel.getStore().getUpdatedRecords();
                                	  var result="";
                                	  for(var i=0;i<records.length;i++){
                                		  var record = records[i];
                                		  if(result.length>0){
                                			  result+=";";
                                		  }
                                		  var value;
                                		  if(record.get('isEnable')==true){
                                			  value="1";
                                		  }
                                		  else{
                                			  value="0";
                                		  }
                                		  result+=record.get('id')+","+value;
                                	  }
                                	  Ext.Ajax.request({
                                		  url:SystemTool.basePath+'/xbField.jhtml?method=updateIsEnable',
                                		  params:{
                                			  result:result
                                		  },
                                		  success:function(req){
                                			  Ext.Msg.alert('提示',"保存成功！");
                                		  }
                                	  });
                                  }
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