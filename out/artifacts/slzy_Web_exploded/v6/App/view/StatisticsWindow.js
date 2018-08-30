/**
 * 
 */
Ext.define('MyApp.view.StatisticsWindow', {
	extend : 'Ext.window.Window',
	alias : 'widget.statisticsWinWidget',

	requires : [ 'Ext.panel.Panel', 'Ext.toolbar.Toolbar', 'Ext.button.Button', 'Ext.form.field.ComboBox' ],

	height : 500,
	width : 900,
	layout : 'border',
	title : '统计表',
	// resizable: false,
	constrain : true,
	modal : true,

	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [
					{
						xtype : 'gridpanel',
						name : 'report',
						region : 'west',
						split : true,
						width : 320,
						title : '报表',
						store : Ext.create('Ext.data.Store', {
							fields : [ 'id', 'reportname', 'status' ],
							autoLoad : true,
							proxy : {
								type : 'ajax',
								url : SystemTool.basePath + '/report.jhtml?method=queryReport',
								reader : {
									type : 'json',
									root : 'list'
								}
							}
						}),
						dockedItems : [ {
							xtype : 'toolbar',
							dock : 'top',
							items : [
									{
										xtype : 'button',
										text : '添加',
										handler : function() {
											var win = new Ext.create('Ext.window.Window', {
												height : 160,
												width : 330,
												layout : 'fit',
												title : '添加报表',
												modal : true,
												constrain : true,
												items : [ {
													xtype : 'form',
													bodyPadding : 10,
													header : false,
													title : 'My Form',
													items : [ {
														xtype : 'hidden',
														name : 'id'
													}, {
														xtype : 'textfield',
														name : 'reportname',
														anchor : '100%',
														fieldLabel : '报表名称',
														labelAlign : 'right',
														labelWidth : 60
													} ],
													buttons : [ {
														text : "保存",
														name : "btnOK",
														handler : function() {
															var form = win.down('form');
															form.submit({
																url : SystemTool.basePath + '/report.jhtml?method=addReport',
																success : function(form, action) {
																	var gridpanel = Ext.ComponentQuery.query('statisticsWinWidget gridpanel[name="report"]')[0];
																	gridpanel.getStore().reload();
																	win.close();
																}
															});
														}
													} ]
												} ]
											});

											win.show();
										}
									},
									{
										xtype : 'button',
										text : '修改',
										handler : function() {
											var win = new Ext.create('Ext.window.Window', {
												height : 160,
												width : 330,
												layout : 'fit',
												title : '修改',
												modal : true,
												constrain : true,
												items : [ {
													xtype : 'form',
													bodyPadding : 10,
													header : false,
													title : 'My Form',
													items : [ {
														xtype : 'hidden',
														name : 'id'
													}, {
														xtype : 'textfield',
														name : 'reportname',
														anchor : '100%',
														fieldLabel : '报表名称',
														labelAlign : 'right',
														labelWidth : 60
													} ],
													buttons : [ {
														text : "保存",
														name : "btnOK",
														handler : function() {
															var form = win.down('form');
															form.submit({
																url : SystemTool.basePath + '/report.jhtml?method=editReport',
																success : function(form, action) {
																	var gridpanel = Ext.ComponentQuery.query('statisticsWinWidget gridpanel[name="report"]')[0];
																	gridpanel.getStore().reload();
																	win.close();
																}
															});
														}
													} ]
												} ]
											});
											var gridpanel = Ext.ComponentQuery.query('statisticsWinWidget gridpanel[name="report"]')[0];
											var report = gridpanel.getSelectionModel().getSelection()[0];
											win.show();
											win.down('form').loadRecord(report);
										}
									},
									{
										xtype : 'button',
										text : '删除',
										handler : function() {
											Ext.Msg.confirm('提示', '是否删除？', function(btn) {
												if (btn == "yes") {
													var gridpanel = Ext.ComponentQuery.query('statisticsWinWidget gridpanel[name="report"]')[0];
													var reportid = gridpanel.getSelectionModel().getSelection()[0].get('id');
													Ext.Ajax.request({
														url : SystemTool.basePath + '/report.jhtml?method=deleteReport',
														params : {
															ids : reportid
														},
														success : function(response) {
															gridpanel.getStore().reload();
														}
													});
												}
											});
										}
									},
									{
										xtype : 'button',
										text : '开始统计',
										handler : function() {
											var win = new Ext.create('Ext.window.Window', {
												height : 250,
												width : 330,
												layout : 'fit',
												title : '选择统计范围',
												modal : true,
												constrain : true,
												items : [ {
													xtype : 'form',
													bodyPadding : 10,
													header : false,
													title : 'My Form',
													items : [
															// {
															// xtype:'textfield',
															// name:'year',
															// fieldLabel:'年份',
															// labelAlign: 'right',
															// labelWidth: 80,
															// anchor: '100%',
															// },
															{
																xtype : 'combobox',
																anchor : '100%',
																margin : 10,
																labelAlign : 'right',
																labelWidth : 80,
																fieldLabel : '年份',
																emptyText : '年份',
																name : 'year',
																fieldLabel : '年份',
																store : new Ext.data.ArrayStore({
																	fields : [ 'year', 'year' ],
																	data : [ [ '2012', '2012' ], [ '2013', '2013' ], [ '2014', '2014' ], [ '2015', '2015' ], [ '2016', '2016' ], [ '2017', '2017' ] ]
																}),
																listeners : {
																	select : function(me, e) {
																		var sta = Ext.ComponentQuery.query('statisticsWinWidget gridpanel[name="report"]')[0].getSelectionModel().getSelection()[0]
																				.get('status');
																		win.down('button[text="数据处理"]').setDisabled(sta != null && sta.indexOf(me.getRawValue().substring(2)) != -1);
																	}
																},
																value : '2012',
																valueField : 'year',
																displayField : 'year'
															}, {
																xtype : 'treepicker',
																fieldLabel : '行政区划',
																labelAlign : 'right',
																labelWidth : 80,
																anchor : '100%',
																margin : 10,
																name : 'unitID',
																displayField : 'text',
																valueField : 'value',
																rootVisible : true,
																maxPickerHeight : 300,
																store : Ext.create('Ext.data.TreeStore', {
																	fields : [ 'text', 'value', 'codelevel', 'code' ],
																	root : {
																		expanded : true,
																		text : cur_areaName,//"辽宁省",
																		id : cur_areaID,//'0021',
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
															}, {
																xtype : 'radiogroup',
																fieldLabel : '格式',
																labelAlign : 'right',
																margin : 10,
																labelWidth : 80,
																// Arrange radio buttons into two columns, distributed vertically
																columns : 2,
																vertical : true,
																items : [ {
																	boxLabel : '省',
																	name : 'type',
																	inputValue : '1'
																}, {
																	boxLabel : '省-市',
																	name : 'type',
																	inputValue : '2',
																	checked : true
																}, {
																	boxLabel : '省-市-县',
																	name : 'type',
																	inputValue : '3'
																}, {
																	boxLabel : '县',
																	name : 'type',
																	inputValue : '4'
																}, {
																	boxLabel : '县-乡',
																	name : 'type',
																	inputValue : '5'
																}, {
																	boxLabel : '县-乡-村',
																	name : 'type',
																	inputValue : '6'
																}, ]
															} ],
													buttons : [
															{
																text : "开始统计",
																name : "btnOK",
																handler : function() {
																	var form = win.down('form');
																	var year = form.down('combobox[name="year"]').getValue();
																	if(typeof(form.down('treepicker[name="unitID"]').displayTplData)=='undefined'){
																		Ext.Msg.alert('错误','请先选择行政区划');
																		return;
																	}
																	var unitcode = form.down('treepicker[name="unitID"]').displayTplData[0].code;
																	var processLevel = -1;
																	var columns;
																	var fields;
																	var gridpanel = Ext.ComponentQuery.query('statisticsWinWidget gridpanel[name="report"]')[0];
																	var reportid = gridpanel.getSelectionModel().getSelection()[0].get('id');
																	var type = form.down('radiogroup').getValue().type;
																	if ((type == 4 || type == 5 || type == 6) && (unitcode[5] == '0' || unitcode == '')) {
																		Ext.Msg.alert('错误', '请确定行政区划至少选择到县');
																		return;
																	}
																	if (win.down('button[text="数据处理"]').isDisabled() && ((type == '1' || type == '2' || type == '3') && unitcode == '')) {
																		processLevel = type;

																		// alert("2222");

																		// console.log(response.responseText);

																		Ext.Msg.wait('正在统计...请稍候');

																		Ext.Ajax.request({
																			url : SystemTool.basePath
																					+ '/report.jhtml?method=getExcelInfo'
																					+ "&fileName="
																					+ encodeURI(Ext.ComponentQuery.query('statisticsWinWidget gridpanel[name="report"]')[0].getSelectionModel().getSelection()[0]
																							.get('reportname')) + year + "Base.xls" + "&processLevel=" + type,
																			success : function(response, opts) {
																				Ext.Msg.close();
																				var tmp = Ext.JSON.decode(response.responseText)
																				columns = tmp.columns;
																				fields = tmp.fields;
																				var store1 = Ext.create('Ext.data.Store', {
																					autoLoad : true,
																					fields : fields,
																					pageSize : 50,
																					proxy : {
																						type : 'ajax',
																						url : SystemTool.basePath
																								+ '/report.jhtml?method=getExcelRows'
																								+ "&fileName="
																								+encodeURI( Ext.ComponentQuery.query('statisticsWinWidget gridpanel[name="report"]')[0].getSelectionModel()
																										.getSelection()[0].get('reportname')) + year + "Base.xls" + "&processLevel=" + type,
																						reader : {
																							type : 'json',
																							root : 'items',
																							totalProperty : 'total'
																						}
																					}
																				});
																				Ext.create(
																						'Ext.window.Window',
																						{
																							title : '统计报表窗口',
																							height : 600,
																							width : 800,
																							minimizable : true,
																							maximizable : true,
																							layout : 'fit',
																							buttons : [ {
																								text : '导出EXCEL',
																								handler : function() {
																									window.open(SystemTool.basePath
																											+ "/download/"
																											+ Ext.ComponentQuery.query('statisticsWinWidget gridpanel[name="report"]')[0]
																													.getSelectionModel().getSelection()[0].get('reportname') + year + "Base" + type
																											+ ".xls");
																								}
																							} ],
																							items : { // Let's put an empty grid in just to illustrate fit layout
																								xtype : 'grid',
																								border : false,
																								columns : columns, // One header just for show. There's no data,
																								bbar : {
																									xtype : 'pagingtoolbar',
																									displayInfo : true,
																									store : store1,
																								},
																								forceFit : true,
																								store : store1
																							// A dummy empty data store
																							}
																						}).show();
																			}
																		});

																	} else {
																		var sta = Ext.ComponentQuery.query('statisticsWinWidget gridpanel[name="report"]')[0].getSelectionModel().getSelection()[0]
																				.get('status');
																		if (!(sta != null && sta.indexOf(me.getRawValue().substring(2)) != -1) && unitcode == '')
																			Ext.Msg.confirm('提示', '数据量较大，建议先进行数据处理', function(btn) {
																				if (btn == 'no' || btn == 'cancel') {
																					Ext.Msg.wait('正在统计...请稍候');

																					Ext.Ajax.request({
																						url : SystemTool.basePath + '/report.jhtml?method=exportPage',
																						timeout : 6000000,
																						params : {
																							reportid : reportid,
																							code : unitcode,
																							year : year,
																							type : type
																						},
																						success : function(response) {
																							// alert("2222");
																							Ext.Msg.close();
																							// console.log(response.responseText);
																							var obj = Ext.JSON.decode(response.responseText);
																							var columns;
																							var fields;
																							Ext.Ajax.request({
																								url : SystemTool.basePath + '/report.jhtml?method=getExcelInfo' + "&fileName="
																										+ encodeURI(obj.path.split("/")[2]) + "&processLevel=" + processLevel,
																								success : function(response, opts) {
																									var tmp = Ext.JSON.decode(response.responseText)
																									columns = tmp.columns;
																									fields = tmp.fields;
																									var store1 = Ext.create('Ext.data.Store', {
																										autoLoad : true,
																										fields : fields,
																										pageSize : 50,
																										proxy : {
																											type : 'ajax',
																											url : SystemTool.basePath + '/report.jhtml?method=getExcelRows' + "&fileName="
																													+ encodeURI(obj.path.split("/")[2]) + "&processLevel=" + processLevel,
																											reader : {
																												type : 'json',
																												root : 'items',
																												totalProperty : 'total'
																											}
																										}
																									});
																									Ext.create('Ext.window.Window', {
																										title : '统计报表窗口',
																										height : 600,
																										width : 800,
																										minimizable : true,
																										maximizable : true,
																										layout : 'fit',
																										buttons : [ {
																											text : '导出EXCEL',
																											handler : function() {
																												window.open(SystemTool.basePath + obj.path);
																											}
																										} ],
																										items : { // Let's put an empty grid in just to illustrate fit layout
																											xtype : 'grid',
																											border : false,
																											columns : columns, // One header just for show. There's no data,
																											bbar : {
																												xtype : 'pagingtoolbar',
																												displayInfo : true,
																												store : store1,
																											},
																											forceFit : true,
																											store : store1
																										// A dummy empty data store
																										}
																									}).show();
																								}
																							});
																						}
																					});
																				}
																			});
																		else{

																			Ext.Msg.wait('正在统计...请稍候');

																			Ext.Ajax.request({
																				url : SystemTool.basePath + '/report.jhtml?method=exportPage',
																				timeout : 6000000,
																				params : {
																					reportid : reportid,
																					code : unitcode,
																					year : year,
																					type : type
																				},
																				success : function(response) {
																					// alert("2222");
																					Ext.Msg.close();
																					// console.log(response.responseText);
																					var obj = Ext.JSON.decode(response.responseText);
																					var columns;
																					var fields;
																					Ext.Ajax.request({
																						url : SystemTool.basePath + '/report.jhtml?method=getExcelInfo' + "&fileName="
																								+ encodeURI(obj.path.split("/")[2]) + "&processLevel=" + processLevel,
																						success : function(response, opts) {
																							var tmp = Ext.JSON.decode(response.responseText)
																							columns = tmp.columns;
																							fields = tmp.fields;
																							var store1 = Ext.create('Ext.data.Store', {
																								autoLoad : true,
																								fields : fields,
																								pageSize : 50,
																								proxy : {
																									type : 'ajax',
																									url : SystemTool.basePath + '/report.jhtml?method=getExcelRows' + "&fileName="
																											+ encodeURI(obj.path.split("/")[2]) + "&processLevel=" + processLevel,
																									reader : {
																										type : 'json',
																										root : 'items',
																										totalProperty : 'total'
																									}
																								}
																							});
																							Ext.create('Ext.window.Window', {
																								title : '统计报表窗口',
																								height : 600,
																								width : 800,
																								minimizable : true,
																								maximizable : true,
																								layout : 'fit',
																								buttons : [ {
																									text : '导出EXCEL',
																									handler : function() {
																										window.open(SystemTool.basePath + obj.path);
																									}
																								} ],
																								items : { // Let's put an empty grid in just to illustrate fit layout
																									xtype : 'grid',
																									border : false,
																									columns : columns, // One header just for show. There's no data,
																									bbar : {
																										xtype : 'pagingtoolbar',
																										displayInfo : true,
																										store : store1,
																									},
																									forceFit : true,
																									store : store1
																								// A dummy empty data store
																								}
																							}).show();
																						}
																					});
																				}
																			});
																		
																		}
																	}
																}
															}, {
																text : '数据处理',
																handler : function() {
																	var form = win.down('form');
																	var year = form.down('combobox[name="year"]').getValue();
																	var unitcode = '210000';
																	var gridpanel = Ext.ComponentQuery.query('statisticsWinWidget gridpanel[name="report"]')[0];
																	var reportid = gridpanel.getSelectionModel().getSelection()[0].get('id');
																	var type = 3;
																	Ext.Msg.wait('正在处理...请稍候');

																	Ext.Ajax.request({
																		url : SystemTool.basePath + '/report.jhtml?method=exportPage',
																		timeout : 6000000,
																		params : {
																			reportid : reportid,
																			code : unitcode,
																			year : year,
																			type : type,
																			isProcess : true
																		},
																		success : function(response) {
																			// alert("2222");
																			Ext.Msg.close();
																			// console.log(response.responseText);
																			Ext.ComponentQuery.query('statisticsWinWidget gridpanel[name="report"]')[0].getStore().reload();
																			win.down('button[text="数据处理"]').setDisabled(true);
																		}
																	});

																}
															} ]
												} ]
											});
											win.show();
											var sta = this.up('gridpanel').getSelectionModel().getSelection()[0].get('status');
											win.down('button[text="数据处理"]').setDisabled(sta != null && sta.indexOf(win.down('combobox[name="year"]').getRawValue().substring(2)) != -1);
											var me = win.down('treepicker');
											var record = Ext.getCmp('westTree').getSelectionModel().getSelection()[0];
											if (record == undefined)
												return;
											me.displayTplData = [ record.data ];
											me.setValue(record.get('value'));
											me.setRawValue(record.get('text'));
										}
									} ]
						} ],
						columns : [ {
							xtype : 'rownumberer'
						}, {
							xtype : 'gridcolumn',
							dataIndex : 'reportname',
							text : '报表名称',
							flex : 1
						} ],
						listeners : {
							itemClick : function(grid, record, item, index, e, eOpts) {
								var reportid = record.get('id');
								var treepanel = Ext.ComponentQuery.query('statisticsWinWidget treepanel[name="reportNode"]')[0];
								treepanel.getStore().proxy.url = SystemTool.basePath + '/report.jhtml?method=queryReportNode&reportid=' + reportid;
								if (treepanel.getStore().isLoading()) {
									return;
								}
								treepanel.getStore().load({
									params : {
										reportid : reportid
									}
								});
							}
						}
					}, {
						xtype : 'treepanel',
						name : 'reportNode',
						region : 'center',
						split : true,
						title : '指标树',
						store : Ext.create('Ext.data.TreeStore', {
							proxy : {
								type : 'ajax',
								url : SystemTool.basePath + '/report.jhtml?method=queryReportNode'
							},
							root : {
								expanded : true,
								text : "报表结构",
								id : '0',
								leaf : false
							},
							// autoLoad:true,
							fields : [ 'id', 'pid', 'text', 'factor', 'expression', 'showCalculate', 'codeid', 'orderby' ]
						// 跟旧版本extjs一样，节点的id和显示文本
						}),

						viewConfig : {

						},
						columns : [ {
							xtype : 'treecolumn',
							dataIndex : 'text',
							text : '指标',
							flex : 1
						} ],
						listeners : {
							itemClick : function(treepanel, record, item, index, e, eOpts) {
								var form = Ext.ComponentQuery.query('statisticsWinWidget form[name="baseForm"]')[0];
								form.loadRecord(record);
								// form.down('combobox[name="codeid"]').setRawValue(record.get('codeName'));
							}
						}
					}, {
						xtype : 'form',
						region : 'east',
						name : 'baseForm',
						split : true,
						width : 300,
						bodyPadding : 10,
						title : '节点信息',
						items : [ {
							xtype : 'textfield',
							name : 'text',
							anchor : '100%',
							fieldLabel : '节点名称',
							labelAlign : 'right',
							labelWidth : 60
						}, {
							xtype : 'radiogroup',
							fieldLabel : '需要计算',
							labelAlign : 'right',
							name : 'showCalculategroup',
							labelWidth : 60,
							items : [ {
								xtype : 'radiofield',
								name : 'showCalculate',
								inputValue : '0',
								boxLabel : '是',
								handler : function(radio, checked) {
									if (checked) {
										var form = Ext.ComponentQuery.query('statisticsWinWidget form[name="baseForm"]')[0];
										form.down('textfield[name="codeid"]').setValue('');
										form.down('textfield[name="codeid"]').setDisabled(true);
										form.down('radiogroup[name="factorgroup"]').setDisabled(false);
										form.down('textareafield[name="expression"]').setDisabled(false);
									}
								}
							}, {
								xtype : 'radiofield',
								name : 'showCalculate',
								inputValue : '1',
								boxLabel : '否',
								handler : function(radio, checked) {
									if (checked) {
										var form = Ext.ComponentQuery.query('statisticsWinWidget form[name="baseForm"]')[0];
										form.down('textfield[name="codeid"]').setValue('');
										form.down('textfield[name="codeid"]').setDisabled(false);
										form.down('radiogroup[name="factorgroup"]').setValue('');
										form.down('radiogroup[name="factorgroup"]').setDisabled(true);
										form.down('textareafield[name="expression"]').setValue('');
										form.down('textareafield[name="expression"]').setDisabled(true);
									}
								}
							} ]
						},
						// {
						// xtype: 'textfield',
						// anchor: '100%',
						// name:'codeid',
						// fieldLabel: '字典值',
						// labelAlign: 'right',
						// labelWidth: 60
						// },
						{
							xtype : 'combobox',
							anchor : '100%',
							margin : 10,
							fieldLabel : '字典值',
							labelAlign : 'right',
							labelWidth : 60,
							name : 'codeid',
							valueField : 'fieldName',
							displayField : 'codeName',
							editable : false,
							store : new Ext.data.JsonStore({
								autoDestroy : true,
								autoLoad : true,
								proxy : {
									type : 'ajax',
									url : SystemTool.basePath + '/xbField.jhtml?method=queryListByWhere&isCode=1',
									reader : {
										type : 'json'
									}
								},
								storeId : 'fieldStore',
								root : null,
								idProperty : 'name',
								fields : [ 'fieldName', 'fieldAlias', 'codeName' ]
							})
						}, {
							xtype : 'radiogroup',
							fieldLabel : '因子',
							name : 'factorgroup',
							labelAlign : 'right',
							labelWidth : 60,
							items : [ {
								xtype : 'radiofield',
								name : 'factor',
								inputValue : 'd_zs',
								boxLabel : '株数'
							}, {
								xtype : 'radiofield',
								name : 'factor',
								inputValue : 'd_xj',
								boxLabel : '蓄积'
							}, {
								xtype : 'radiofield',
								name : 'factor',
								inputValue : 'd_mj',
								boxLabel : '面积'
							} ]
						}, {
							xtype : 'textareafield',
							anchor : '100%',
							name : 'expression',
							fieldLabel : '表达式',
							labelAlign : 'right',
							labelWidth : 60,
							height : 100
						}, {
							xtype : 'numberfield',
							anchor : '100%',
							name : 'orderby',
							fieldLabel : '排序',
							labelAlign : 'right',
							labelWidth : 60
						}, {
							xtype : 'button',
							text : '添加',
							margin : '10 10 10 70',
							handler : function() {
								var treepanel = Ext.ComponentQuery.query('statisticsWinWidget treepanel[name="reportNode"]')[0];
								var form = Ext.ComponentQuery.query('statisticsWinWidget form[name="baseForm"]')[0];
								if (treepanel.getSelectionModel().getSelection().length < 1)
									return;
								var record = treepanel.getSelectionModel().getSelection()[0];
								var pid = record.get('id');
								var name = form.down('textfield[name="text"]').getValue();
								var showCalculate = form.down('radiogroup[name="showCalculategroup"]').getValue().showCalculate;
								var codeid = form.down('combobox[name="codeid"]').getValue();
								var factor = form.down('radiogroup[name="factorgroup"]').getValue().factor;
								if (codeid != null && showCalculate == "1") {
									factor = codeid;
								}
								var expression = form.down('textareafield[name="expression"]').getValue();
								var orderby = form.down('numberfield[name="orderby"]').getValue();

								var gridpanel = Ext.ComponentQuery.query('statisticsWinWidget gridpanel[name="report"]')[0];
								var reportid = gridpanel.getSelectionModel().getSelection()[0].get('id');
								var report = gridpanel.getSelectionModel().getSelection()[0];

								Ext.Ajax.request({
									url : SystemTool.basePath + '/report.jhtml?method=addReportNode',
									params : {
										name : name,
										reportid : reportid,// {reportid：reportid},
										pid : pid,
										showCalculate : showCalculate,
										codeid : codeid,
										factor : factor,
										expression : expression,
										orderby : orderby
									},
									success : function(response) {
										treepanel.getStore().reload();
									}
								});

							}
						}, {
							xtype : 'button',
							text : '删除',
							margin : '10 10 10 10',
							handler : function() {
								var treepanel = Ext.ComponentQuery.query('statisticsWinWidget treepanel[name="reportNode"]')[0];
								if (treepanel.getSelectionModel().getSelection().length < 1)
									return;
								var record = treepanel.getSelectionModel().getSelection()[0];
								var id = record.get('id');
								Ext.Ajax.request({
									url : SystemTool.basePath + '/report.jhtml?method=deleteReportNode',
									params : {
										ids : id
									},
									success : function(response) {
										treepanel.getStore().reload();
									}
								});
							}
						}, {
							xtype : 'button',
							text : '保存',
							margin : '10 10 10 10',
							handler : function() {
								var treepanel = Ext.ComponentQuery.query('statisticsWinWidget treepanel[name="reportNode"]')[0];
								var form = Ext.ComponentQuery.query('statisticsWinWidget form[name="baseForm"]')[0];
								if (treepanel.getSelectionModel().getSelection().length < 1)
									return;
								var record = treepanel.getSelectionModel().getSelection()[0];
								var id = record.get('id');
								var pid = record.get('pid');
								var name = form.down('textfield[name="text"]').getValue();
								var showCalculate = form.down('radiogroup[name="showCalculategroup"]').getValue().showCalculate;
								var codeid = form.down('combobox[name="codeid"]').getValue();
								var factor = form.down('radiogroup[name="factorgroup"]').getValue().factor;
								if (codeid != null && showCalculate == "1") {
									factor = codeid;
								}
								if (record.hasChildNodes()) {
									codeid = null;
									factor = null;
								}
								var expression = form.down('textareafield[name="expression"]').getValue();
								var orderby = form.down('numberfield[name="orderby"]').getValue();

								var gridpanel = Ext.ComponentQuery.query('statisticsWinWidget gridpanel[name="report"]')[0];
								var reportid = gridpanel.getSelectionModel().getSelection()[0].get('id');

								Ext.Ajax.request({
									url : SystemTool.basePath + '/report.jhtml?method=editReportNode',
									params : {
										name : name,
										reportid : reportid,
										id : id,
										pid : pid,
										showCalculate : showCalculate,
										codeid : codeid,
										factor : factor,
										expression : expression,
										orderby : orderby
									},
									success : function(response) {
										treepanel.getStore().reload();
									}
								});
							}
						} ]
					} ]
		});

		me.callParent(arguments);
	}

});