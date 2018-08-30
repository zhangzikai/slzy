Ext.define('MyApp.view.StatisticsView', {
    extend: 'Ext.panel.Panel',
    alias:'widget.statisticsWidget',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    layout: 'fit',
    header: false,
    title: 'My Panel',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
				{
				    xtype: 'gridpanel',
				    header: false,
				    title: '统计表名称',
				    columns: [
	        			         {xtype:'rownumberer'},
				        {
				            xtype: 'gridcolumn',
				            dataIndex: 'alias',
				            text: '统计表名称',
				            flex: 1
				        }
				    ],
				    store:new Ext.data.Store({
				        fields: ['name','alias'],
				        data:[
						        {name:'table1',alias:'附表01.各类土地面积统计表'},
						        {name:'table2',alias:'附表02.各类土地按土地使用权面积统计表'},
						        {name:'table3',alias:'附表03.各工程类别面积统计表'},
						        {name:'table4',alias:'附表04.各类土地按水系面积统计表'},
						        {name:'table5',alias:'附表05.各类土地按生态区位面积统计表'},
						        {name:'table6',alias:'附表06.各类森林林木面积蓄积统计表'},
						        {name:'table7',alias:'附表07.各类森林林木按水系面积蓄积统计表'},
						        {name:'table8',alias:'附表08.各类森林林木按生态分区面积蓄积统计表'},
						        {name:'table9',alias:'附表09.林分按组成树种面积蓄积统计表'},
						        {name:'table10',alias:'附表10.公益林(地)面积统计表'},
						        {name:'table11',alias:'附表11.各工程类别公益林(地)面积统计表'},
						        {name:'table12',alias:'附表12.商品林(地)面积统计表'},
						        {name:'table13',alias:'附表13.各工程类别商品林(地)面积统计表'},
						        {name:'table14',alias:'附表14.林分各林种按龄组面积蓄积统计表'},
						        {name:'table15',alias:'附表15.人工林面积蓄积统计表'},
						        {name:'table16',alias:'附表16.天然林面积蓄积统计表'},
						        {name:'table17',alias:'附表17.用材林按龄级面积蓄积统计表'},
						        {name:'table18',alias:'附表18.用材林近成过熟林按组成树种可及度面积蓄积统计表'},
						        {name:'table19',alias:'附表19.经济林面积统计表'},
						        {name:'table20',alias:'附表20.立地类型面积统计表'},
						        {name:'table21',alias:'附表21.各立地类型小班一览表'},
						        {name:'table22',alias:'附表22.经营措施类型面积蓄积统计表'},
						        {name:'table23',alias:'附表23.非林地造林面积蓄积统计表'}
				        ]
				    }),
				    listeners:{
				    	itemclick:function(grid,record,item,index,e,eOpts){
							var name = record.get('name');
							
							var win = new Ext.Window({
								title:'统计条件',
								height:482,
								width:426,
								iconCls:'edit-icon',
								constrain:true,
								modal:true,
								layout:'border',
								resizable:false,
								closeAction:'close',
								bodyStyle:'background-color:white;',
								listeners:{
									close:function(){win.destroy();win = null;}
								},
								items:[
									{
									    xtype: 'gridpanel',
									    region: 'center',
									    title: '统计列',
									    selType: 'checkboxmodel',
									    name:'queryStaticsGrid',
									    store : new Ext.data.JsonStore({
									        fields: ['name','alias','isCode','isUnit','code_id'],
										    proxy: {
			                                    type: 'ajax',
			                                    url: hostPath +'/tableMetadata.jhtml?method=queryList',
			                                    reader: {
			                                        type: 'json'
			                                    }
			                                }
									    }),
									    columns: [
									        {
									            xtype: 'rownumberer'
									        },
									        {xtype:'gridcolumn',text: '列名称', dataIndex: 'alias',flex:1},
								            {xtype:'gridcolumn',text: '列名称', dataIndex: 'name',hidden:true},
								            {xtype:'gridcolumn',text: '是否为Code', dataIndex: 'isCode',hidden:true}
									    ]
									},
									{
									    xtype: 'panel',
									    region: 'north',
									    height: 54,
									    header: false,
									    title: 'My Panel',
									    layout: {
									        type: 'hbox',
									        align: 'middle'
									    },
									    items: [
									        {
					                            xtype: 'treepicker',
					                            fieldLabel: '行政区划',
					                            labelAlign: 'right',
									            flex: 1.2,
					                            labelWidth: 60,
					                            anchor: '100%',
									            margin: '0 10 0 10',
					                            name: 'unitID',
					                            displayField: 'text',
					                            valueField: 'code',
					                            rootVisible: true,
					                            maxPickerHeight:300,
					                            store: Ext.create('Ext.data.TreeStore', {
					                                fields: ['text', 'code'],
					                                root: {
					                                	expanded: true,
														text : cur_areaName,//"辽宁省",
														id : cur_areaID,//'0021',
											            leaf:false
					                                },
					                                proxy: {
					                                    type: 'ajax',
					                                    url: hostPath +'/j2UnitCode.jhtml?method=queryList',
					                                    reader: {
					                                        type: 'json'
					                                    }
					                                }
					                            })
					                        },
									        {
									            xtype: 'combobox',
									            flex: 0.8,
									            fieldLabel: '年度',
									            labelWidth: 40,
									            store:Ext.create('Ext.data.Store', {
					                                fields: ['year', 'yearView'],
					                                data: [
						                                    {year:'2011',yearView:'2011'},
						                                    {year:'2012',yearView:'2012'},
						                                    {year:'2013',yearView:'2013'},
						                                    {year:'2014',yearView:'2014'},
						                                    {year:'2015',yearView:'2015'}
					                                ]
					                            }),
											    valueField: 'year',
					                            displayField: 'yearView',
												name:'cmbYear'
									        },
									        {
									            xtype: 'button',
									            flex: 0.4,
									            margins: '0 10 0 10',
									            width: 30,
									            text: '统计',
									            handler:function(){
									            	var areaCode = win.down('treepicker[name="unitID"]').getValue();
									            	var year = win.down('combobox[name="cmbYear"]').getValue();
										    		  var tableName = 'j2'+areaCode.substring(0,6)+'tjnew01_'+year;
										    		  var tjdw = areaCode;
										    		  var grid = win.down('gridpanel[name="queryStaticsGrid"]');
										    		  var selections = grid.getSelectionModel().getSelection();
										    		  if(selections.length<1)return;
										    		  var alias=[];
										    		  var fields='';
										    		  for (var i = 0; i < selections.length; i++) {
								                           var record = selections[i];
								                           //fields+=record.data.name+',';
								                           alias.push(record.get('alias'));
								                           if(record.data.isCode!='1'){
								                        	   fields+=record.data.name+',';
								                           }else if(record.data.isUnit=='1'){
								                        	   fields+='(select name from j2_unitcode where CODE='+record.data.name+'),';
								                           }
								                           else{
								                        	   fields+='(select PSB_VALUE from code_table where CODE_ID=\''+record.data.code_id+'\' and PSB_CODE='+record.data.name+'),';
								                           }
								                      }
										    		  
										    		  fields = fields.substring(0, fields.length-1);

										    		  Ext.Ajax.request({
										    			  url:hostPath+'/tjTable.jhtml?method=findData',
										    			  method: 'POST',
										    			  params:{
										    				  tabelName:tableName,
										    				  tjdw:tjdw,
										    				  fields:fields
										    			  },
										    			  success:function(req){
										    				  var data = req.responseText;
										    				  var objs = Ext.JSON.decode(data);
										    				 
										    				  var ht = '<table class="gridtable"><tr>'
								    				  		  // 表头
										    				  for(var i=0;i<alias.length;i++){
										    					  ht+='<th>'+alias[i]+'</th>';
										    				  }
										    				  ht+='</tr>';
										    				  for(var j=0;j<objs.length;j++){
										    					  ht += '<tr>';
										    					  for(var k=0;k<objs[j].length;k++){
										    						  ht+='<td>'+objs[j][k]+'</td>';
										    					  }
										    					  ht += '</tr>';
										    				  }
								    				  				
										    				  ht+='</table>';
										    				  
										    				  
										    				  var win = new Ext.Window({
										  						title:'统计结果',
																height:600,
																width:800,
																iconCls:'edit-icon',
																constrain:true,
																modal:true,
																resizable:true,
																closeAction:'close',
																bodyStyle:'background-color:white;',
																listeners:{
																	close:function(){win.destroy();win = null;}
																},
																html:ht
										    				  });
										    				  win.show();
										    			  }
										    		  })
										    	  }
									        }
									    ]
									}
								]
							});
							win.show();
							var panel = win.down('gridpanel[name="queryStaticsGrid"]');
							var store = win.down('gridpanel[name="queryStaticsGrid"]').getStore();
							store.load({
								params:{
									tableType:name
								}
							});
				    	}
				    }
				}
            ]
        });

        me.callParent(arguments);
    }

});