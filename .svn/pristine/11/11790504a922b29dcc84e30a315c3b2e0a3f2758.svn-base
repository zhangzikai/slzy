/*
 * 系统工具 2013-12-20 11:25:16
 * */
//类 SystemTool
var IndexTool={
	win:null,
	//实时信息开始
	onlineInfo:{
		border:false,
		layout:'fit',
		id:'onlineInfo',
		items:[{
				el : 'infoMenu',
				items:[{
						id:'searchPanel',
						title : '属性',
						autoScroll:true,
						autoHeight:true,
						border : false,
						items:[new Ext.Panel({
					        bodyStyle: 'padding:5px 5px 0',
					        autoWidth:true,
					        border : false,
					        items: [{
						            xtype:'fieldset',
						            autoWidth:true,
						            defaultType: 'datefield',
						            items :[{
						        			xtype:'datefield',
								            fieldLabel: '起始时间',
								            name: 'startdt',
								            id: 'startdt',
								            vtype: 'daterange',
								            width: 150,
								            endDateField: 'enddt' // id of the end date field
								         },{
								        	xtype:'datefield',
								            fieldLabel: '结束时间',
								            name: 'enddt',
								            id: 'enddt',
								            vtype: 'daterange',
								            width: 150,
								            startDateField: 'startdt' // id of the start date field
								         }
						            ]
						        }
					        ],
					        buttons: [{
					            text: '搜索',
					            handler:function(){
					            	points=stopQueryTool();
					            	if(Ext.getCmp('layerName').getValue()!=""){
					            		QueryTool.doQuery(Ext.getCmp('layerName').getValue(),Ext.get('keyword').dom.value,points);
					            	}
						            
					            }
					        }]
						})]
					}
				 ]
			}]
	},//实时信息结束
	//空间分析开始
//	spatialAnalysis:{
//			border:false,
//			layout:'fit',
//			id:'spatialAnalysis',
//			items:[{ // raw
//						el : 'spatialAnalysisMenu',
//						items: [
//							new Ext.FormPanel({
//						        bodyStyle: 'padding:5px 5px 0',
//						        title:'通视分析',
//						        autoWidth:true,
//						        autoHeight:true,
//						        id:'sightAnalyseForm',
//						        border : false,
//						        items: [{
//							            xtype:'fieldset',
//							            autoWidth:true,
//							            defaultType: 'spinnerfield',
//							            items :[{
//							                	fieldLabel: '起始高度(米)',
//							                	id: 'startHeight',
//							                	minValue:0,
//							                	value:20,
//							                	maxValue: 1000,
//							                	allowDecimals: true,
//							                	decimalPrecision:1,
//							                	incrementValue:1,
//							                	width:150,
//							                	accelerate: true
//							                },{
//							                	fieldLabel: '目标高度(米)',
//							                	id: 'endHeight',
//							                	minValue:0,
//							                	value:50,
//							                	maxValue:1000,
//							                	allowDecimals: true,
//							                	decimalPrecision:1,
//							                	incrementValue:1,
//							                	width:150,
//							                	accelerate: true
//							                }
//							            ]
//							        }
//						        ],
//						        buttons: [{
//				                    text: '开始分析',
//				                    handler:function(){
//				                    	IndexTool.stopAllTool();
//				            			startSightAnalyse(Ext.getCmp('startHeight').getValue(),Ext.getCmp('endHeight').getValue());
//				                    }
//				                },{
//				                    text: '结束分析',
//				                    handler:function(){
//				                    	stopSightAnalyse();
//				    		        }
//				                }]
//					    }),new Ext.FormPanel({
//					        bodyStyle: 'padding:5px 5px 0',
//					        title:'坡度坡向分析',
//					        hidden:true,
//					        autoWidth:true,
//					        id:'slopeAnalyseForm',
//					        border : false,
//					        buttons: [{
//			                    text: '开始分析',
//			                    handler:function(){
//			                    	IndexTool.stopAllTool();
//			                    	startMeasureSlope();
//			                    }
//			                },{
//			                    text: '结束分析',
//			                    handler:function(){
//			                    	stopMeasure();
//			    		        }
//			                }]
//				    }),new Ext.FormPanel({
//					        bodyStyle: 'padding:5px 5px 0',
//					        title:'水淹分析',
//					        hidden:true,
//					        autoWidth:true,
//					        id:'waterFloodAnalyseForm',
//					        border : false,
//					        items: [{
//						            xtype:'fieldset',
//						            autoHeight:true,
//						            autoWidth:true,
//						            defaultType: 'spinnerfield',
//						            items :[{
//						                	fieldLabel: '水位(米)',
//						                	id: 'endWaterLevel',
//						                	minValue:0,
//						                	value:2960,
//						                	maxValue:2960,
//						                	allowDecimals: true,
//						                	decimalPrecision:1,
//						                	incrementValue:1,
//						                	width:150,
//						                	accelerate: true
//						                },{
//					            			xtype:'checkbox',
//						                    checked: false,
//						                    fieldLabel: '图层',
//						                    boxLabel: '淹没线',
//						                    id: 'kuerganLayer', 
//						                    listeners:{  
//					                            afterrender:function(obj){  
//					                                obj.getEl().dom.onclick = function(){  
//					                                	setWMSLayerIsEnabled("kuergan_submerge",obj.getEl().dom.checked);
//					                                };  
//					                            }  
//					                        }  
//						                },{
//						                	xtype:'textfield',
//					                        fieldLabel: '淹没面积',
//					                        id:'areaLabel',
//					                        value:'0.00平方米'
//					                    },{
//						                	xtype:'textfield',
//					                        fieldLabel: '库容',
//					                        id:'volumeLabel',
//					                        value:'0.00立方米'
//					                    }
//						            ]
//						        }
//					        ],
//					        buttons: [{
//			                    text: '开始分析',
//			                    handler:function(){
//			                    	if(Ext.getCmp('waterFloodAnalyseForm').getForm().isValid()){
//			                    		IndexTool.stopAllTool();
//			                    		Ext.get('areaLabel').dom.value='0.00平方米';
//			                    		Ext.get('volumeLabel').dom.value='0.00立方米';
//			                    		startWaterFloodAnalyse(2900,Ext.getCmp('endWaterLevel').getValue());
//			                        }
//			                    }
//			                },{
//			                    text: '结束分析',
//			                    handler:function(){
//			                    	stopWaterFloodAnalyse();
//			    		        }
//			                }]
//				    }),new Ext.FormPanel({
//				        bodyStyle: 'padding:5px 5px 0',
//				        title:'剖面分析',
//				        autoWidth:true,
//				        hidden:true,
//				        id:'terrainAnalyseForm',
//				        border : false,
//				        items: [{
//					            xtype:'fieldset',
//					            autoHeight:true,
//					            autoWidth:true,
//					            items :[{
//						        	   	xtype:'combo',
//										id:'followType',
//										fieldLabel:'分析方式',
//									    triggerAction: 'all',
//									    lazyRender:true,
//									    mode: 'local',
//									    width:150,
//									    editable:false,
//									    allowBlank:false,
//									    store: new Ext.data.ArrayStore({
//									        fields: ['keytext','keytype'],
//									        data: [['跟随视点绘制','view'],['跟随光标绘制','cursor'],['鼠标自由绘制','free']]
//									    }),
//									    valueField: 'keytype',
//									    displayField: 'keytext',
//									    listeners : {
//									    	afterrender : function(combo){
//									    	    combo.setValue(combo.getStore().getAt(2).data.keytype);
//									    	}
//									    }
//						           },{
//						        	   	xtype:'combo',
//										id:'graphSize',
//										fieldLabel:'绘制图大小',
//									    triggerAction: 'all',
//									    lazyRender:true,
//									    mode: 'local',
//									    width:150,
//									    editable:false,
//									    allowBlank:false,
//									    store: new Ext.data.ArrayStore({
//									        fields: ['keytext','keytype'],
//									        data: [['小','Small'],['中','Medium'],['大','Large']]
//									    }),
//									    valueField: 'keytype',
//									    displayField: 'keytext',
//									    listeners : {
//									    	afterrender : function(combo){
//									    	    combo.setValue(combo.getStore().getAt(1).data.keytype);
//									    	}
//									    }
//						           }
//					            ]
//					        }
//				        ],
//				        buttons: [{
//		                    text: '开始分析',
//		                    handler:function(){
//		                    	if(Ext.getCmp('terrainAnalyseForm').getForm().isValid()){
//		                    		IndexTool.stopAllTool();
//		            				startTerrainAnalyse(Ext.getCmp('followType').getValue(),Ext.getCmp('graphSize').getValue());
//		                        }
//		                    }
//		                },{
//		                    text: '结束分析',
//		                    handler:function(){
//		                    	stopTerrainAnalyse();
//		    		        }
//		                }]
//				    }),new Ext.FormPanel({
//				        bodyStyle: 'padding:5px 5px 0',
//				        title:'消落区分析',
//				        autoWidth:true,
//				        hidden:true,
//				        id:'fluctuateAnalyseForm',
//				        border : false,
//				        items: [{
//					            xtype:'fieldset',
//					            autoHeight:true,
//					            autoWidth:true,
//					            defaultType: 'spinnerfield',
//					            items :[{
//						                	fieldLabel: '落水位(米)',
//						                	id: 'startFluctuateWaterLevel',
//						                	minValue:0,
//						                	value:2950,
//						                	maxValue:2960,
//						                	allowDecimals: true,
//						                	decimalPrecision:1,
//						                	incrementValue:1,
//						                	width:150,
//						                	accelerate: true
//						                },{
//						                	fieldLabel: '涨水位(米)',
//						                	id: 'endfluctuateWaterLevel',
//						                	minValue:0,
//						                	value:2960,
//						                	maxValue:2960,
//						                	allowDecimals: true,
//						                	decimalPrecision:1,
//						                	incrementValue:1,
//						                	width:150,
//						                	accelerate: true
//						                },{
//						        			xtype:'checkbox',
//						                    checked: false,
//						                    fieldLabel: '图层',
//						                    boxLabel: '淹没线',
//						                    listeners:{  
//						                        afterrender:function(obj){  
//						                            obj.getEl().dom.onclick = function(){  
//						                            	setWMSLayerIsEnabled("kuergan_submerge",obj.getEl().dom.checked);
//						                            };  
//						                        }  
//						                    }  
//						                },{
//											xtype:'textfield',
//											fieldLabel:'消落区面积',
//											id:'fluctuateAreaLabel',
//											width:150,
//											value:'0.0 平方米'
//										}
//						           ]
//					        }
//				        ],
//				        buttons: [{
//		                    text: '开始分析',
//		                    handler:function(){
//		                    	IndexTool.stopAllTool();
//		                    	startFluctuateAnalyse(Ext.getCmp('startFluctuateWaterLevel').getValue(),Ext.getCmp('endfluctuateWaterLevel').getValue());
//		                    }
//		                },{
//		                    text: '结束分析',
//		                    handler:function(){
//		                    	stopFluctuateAnalyse();
//		                    	Ext.getCmp("fluctuateAreaLabel").setValue('0.0 平方米');
//		    		        }
//		                }]
//			    }),new Ext.FormPanel({
//			        bodyStyle: 'padding:5px 5px 0',
//			        title:'挖填方分析',
//			        autoWidth:true,
//			        hidden:true,
//			        id:'digFillAnalyseForm',
//			        border : false,
//			        items: [{
//				            xtype:'fieldset',
//				            autoHeight:true,
//				            autoWidth:true,
//				            defaultType: 'spinnerfield',
//				            items :[{
//				                	fieldLabel: '挖填深度(米)',
//				                	id: 'digFillDepth',
//				                	minValue: 0,
//				                	value:10,
//				                	maxValue: 4000,
//				                	allowDecimals: true,
//				                	decimalPrecision:1,
//				                	incrementValue:1,
//				                	width:150,
//				                	accelerate: true
//				                },{
//				                	xtype:'textfield',
//									fieldLabel:'挖方体积',
//									id:'digLabel',
//									width:150,
//									value:'0.0 立方米'
//								},{
//									xtype:'textfield',
//									fieldLabel:'填方体积',
//									id:'fillLabel',
//									width:150,
//									value:'0.0 立方米'
//								},{
//									xtype:'textfield',
//									fieldLabel:'挖填体积差',
//									id:'digFillLabel',
//									width:150,
//									value:'0.0 立方米'
//								}
//				            ]
//				        }
//			        ],
//			        buttons: [{
//		                text: '开始分析',
//		                handler:function(){
//		                	IndexTool.stopAllTool();
//		                	startDigFillAnalyse(Ext.getCmp('digFillDepth').getValue());
//		                }
//		            },{
//		                text: '结束分析',
//		                handler:function(){
//		                	stopDigFillAnalyse();
//		                	Ext.getCmp("digLabel").setValue('0.0 立方米');
//		                	Ext.getCmp("fillLabel").setValue('0.0 立方米');
//		                	Ext.getCmp("digFillLabel").setValue('0.0 立方米');
//				        }
//		            }]
//			    }),new Ext.FormPanel({
//			        bodyStyle: 'padding:5px 5px 0',
//			        title:'量算分析',
//			        autoWidth:true,
//			        hidden:true,
//			        id:'measureAnalyseForm',
//			        border : false,
//			        items: [new Ext.Component({
//								el:'measureAnalyseMenu',
//								height:85
//							})
//			        ]
//			    }),new Ext.FormPanel({
//			        bodyStyle: 'padding:5px 5px 0',
//			        title:'光照分析',
//			        autoWidth:true,
//			        hidden:true,
//			        id:'lightAnalyseForm',
//			        border : false,
//			        items: [new Ext.Component({
//								el:'lightAnalyseMenu',
//								height:85
//							})
//			        ]
//			    })]
//			}]
//		},//空间分析结束
		
		/**
		 * 显示视频信息
		 * @param obj
		 */
		showVideoInfo:function(type,name){
			if(this.win!=null){
				this.win.close();
			}
			this.win = new Ext.Window({
				title:name+'---信息窗口',
				height:240,
				width:250,
				iconCls:'edit-icon',
				constrain:false,
				modal:false,
				resizable:false,
				closeAction:'close',
				listeners:{
					close:function(){IndexTool.win.destroy();IndexTool.win = null;}
				},
				items:[new Ext.Panel({
	                id:"panel",
	                html:'<img src="'+SystemTool.basePath+'/images/video1.png"></img>'
	            })],
				bbar:['->',{text:'确定',iconCls:'accept-icon',handler:function(){IndexTool.win.close();}},
				'-',{text:'取消',iconCls:'cancel-icon',handler:function(){IndexTool.win.close();}
				}]
			});
			this.win.show();
		},
		
		/**
		 * 显示监测站信息
		 * @param obj
		 */
		openInfo:function(type,name){
				var data = [
				            ['达布达尔','08-21 06:00','141.18','139.70','1.48'],
				            ['伊尔列黑','08-21 06:00','148.18','147.00','1.16'],
				            ['坝下','08-21 06:00','145.39','144.60','0.79']
				       ];
				var ds=new Ext.data.Store({
			  	     	 data:data,
				  	     reader: new Ext.data.ArrayReader({}, [
				  	        {name: 'id',mapping: 0},
				  	         {name: 'sex',mapping: 1},
				  	         {name: 'name',mapping: 2},
				  	         {name: 'descn',mapping: 3},
				  	         {name: 'descn1',mapping: 4}
				  	     ])
			  		});
				if(this.win!=null){
					this.win.close();
				}
				this.win = new Ext.Window({
					title:name+'---信息窗口',
					height:250,
					width:360,
					iconCls:'edit-icon',
					constrain:false,
					modal:false,
					resizable:false,
					closeAction:'close',
					listeners:{
						close:function(){IndexTool.win.destroy();IndexTool.win = null;}
					},
					items:[new Ext.grid.GridPanel({
							  	height: 230,
							  	width: 350,
							  	region: 'center',
							  	split: true,
							  	border: false,
							  	store: ds,
							  	cm:new Ext.grid.ColumnModel([
			  	                         {header:'站名',dataIndex:'id',width:100},
			  	                         {header:'日期',dataIndex:'sex',width:80},
			  	                         {header:'水位(m)',dataIndex:'name',width:60},
			  	                         {header:'警戒水位(m)',dataIndex:'descn',width:60},
			  	                         {header:'超警戒水位(m)',dataIndex:'descn1',width:60}
							  	  ])
						  	})],
					bbar:['->',{text:'确定',iconCls:'accept-icon',handler:function(){IndexTool.win.close();obj.setValue(false);}},
					'-',{text:'刷新',iconCls:'refresh-icon',handler:function(){ds.reload();}},
					'-',{text:'取消',iconCls:'cancel-icon',handler:function(){IndexTool.win.close();obj.setValue(false);}
					}]
				});
				this.win.show();
		},
		
		/**
		 * 显示与隐藏水位库容曲线图
		 * @param isShow
		 */
		toggleReservoirVolume:function(isShow){
			var curPanel=Ext.getCmp('centerTab'),tabId='reservoirVolumeTab',reservoirVolumeTab =curPanel.get(tabId);
			if(isShow){
				if(reservoirVolumeTab){
					curPanel.setActiveTab(reservoirVolumeTab);
					return ;
				}
				var store = new Ext.data.JsonStore({
			        fields:['waterLevel', 'reservoirVolume', 'views'],
			        data: [
			            {waterLevel:437, reservoirVolume: 0, views: 400},
			            {waterLevel:442, reservoirVolume: 0.44385, views: 400},
			            {waterLevel:447, reservoirVolume: 1.7467075, views: 400},
			            {waterLevel:452, reservoirVolume: 5.2819525, views: 400},
			            {waterLevel:457, reservoirVolume: 12.9353, views: 400},
			            {waterLevel:462, reservoirVolume: 25.8792575, views: 400},
			            {waterLevel:467, reservoirVolume: 44.720385, views: 400},
			            {waterLevel:472, reservoirVolume: 69.08271, views: 400},
			            {waterLevel:477, reservoirVolume: 98.6913275, views: 400},
			            {waterLevel:482, reservoirVolume: 135.49361, views: 400},
			            {waterLevel:487, reservoirVolume: 181.30065, views: 490}
			        ]
			    });
			    // extra extra simple
				var tab = curPanel.add({
					id : tabId,
			        title: '水位库容专题图',
			        closable : true,
					layout : 'fit',
					items:[new Ext.Panel({
					        title: '水位库容专题图(水位--库容曲线)',
					        frame:true,
					        items: {
					            xtype: 'linechart',
					            store: store,
					            url: SystemTool.basePath+'/extjs3/resources/charts.swf',
					            xField: 'reservoirVolume',
					            yField: 'waterLevel',
					            xAxis: new Ext.chart.NumericAxis({
					            	title:'库容(万立方米)',
									minimum:0,
									maximum:200,
									majorUnit:20
					            }),
								yAxis: new Ext.chart.NumericAxis({
									title:'水位(米)',
									minimum:430,
									maximum:490
					            }),
					            tipRenderer : function(chart, record){
									return String.format('水位:{0} 米\n库容:{1} 万立方米',record.data.waterLevel,record.data.reservoirVolume); 
					            }
					        }
					    })]
				});	
				curPanel.setActiveTab(tab);
			}else{
				curPanel.remove(tabId);
			}
		},
		/**
		*关闭所有分析工具
		*剖面分析、通视分析、坡度坡向分析、水淹分析、消落区分析
		*/
		stopAllTool:function(){
			//清除飞行路线
			clearQuery();
			//测量绘画的图层
			stopMeasure();
			//剖面分析
			stopTerrainAnalyse();
			//通视分析
			stopSightAnalyse();
			//水淹分析
			stopWaterFloodAnalyse();
			//消落区分析
			stopFluctuateAnalyse();
			//挖填方分析
			stopDigFillAnalyse();
		},
		/**
		 * 通过id设置值
		 * @param id
		 * @param value
		 */
		setValue:function(id,value){
			Ext.getCmp(id).setValue(value);
//			$("#"+id).val(value);
		},
		
		toggleAnalyse:function(analyseId){
			IndexTool.stopAllTool();
			Ext.getCmp('sightAnalyseForm').hide();
			Ext.getCmp('slopeAnalyseForm').hide();
			Ext.getCmp('waterFloodAnalyseForm').hide();
			Ext.getCmp('terrainAnalyseForm').hide();
			
			Ext.getCmp('fluctuateAnalyseForm').hide();
			Ext.getCmp('digFillAnalyseForm').hide();
			Ext.getCmp('measureAnalyseForm').hide();
			Ext.getCmp('lightAnalyseForm').hide();
			
			Ext.getCmp(analyseId).show();
		}
		
};
