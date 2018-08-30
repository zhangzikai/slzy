Ext.define('MyApp.view.SpatialView', {
    extend: 'Ext.panel.Panel',
    alias:'widget.spatialWidget',


    height: 499,
    width: '100%',
	layout:'vbox',
    title: '空间分析',
    header:false,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
            	xtype:'panel',
            	height:100,
            	width:'100%',
//            	contentEl:'spatialAnalysisMenu'
            	layout: 'hbox',
            	defaults:{
            		margin:'8'
            	},
            	items:[{
            		html:'<div ><img style="cursor:pointer" src="images/TSFX1.png "    onclick="IndexTool.toggleAnalyse(\'sightAnalyseForm\')"/><div style="font-size:14px;">通视分析</div></div>',
            		border:false,
            		flex:1
            	},{
            		html:'<div><img style="cursor:pointer" src="images/PDPXFX1.png"    onclick="IndexTool.toggleAnalyse(\'slopeAnalyseForm\')"/><div style="font-size:14px;">坡度分析</div></div>',
            		border:false,
            	    flex:1
            	},{
            		html:'<div><img style="cursor:pointer" src="images/PMFX1.png"     onclick="IndexTool.toggleAnalyse(\'terrainAnalyseForm\')"/><div style="font-size:14px;">剖面分析</div></div>',
            		border:false,
            		flex:1
            	},{
            		html:'<div><img style="cursor:pointer" src="images/projectShow1.png"     onclick="IndexTool.toggleAnalyse(\'measureAnalyseForm\')"/><div style="font-size:14px;">量算分析</div></div>',
            		border:false,
            		flex:1
            	}]
            },{ // raw
            	xtype:'panel',
                height:329,
            	width:'100%',
                layout:'fit',
				items: [
					new Ext.FormPanel({
				        bodyStyle: 'padding:5px 5px 0',
				        title:'通视分析',
				        autoWidth:true,
				        autoHeight:true,
				        id:'sightAnalyseForm',
				        border : false,
				        items: [{
					            xtype:'fieldset',
					            autoWidth:true,
					            defaultType: 'spinnerfield',
					            items :[{
					                	fieldLabel: '起始高度(米)',
					                	id: 'startHeight',
					                	minValue:0,
					                	value:20,
					                	maxValue: 1000,
					                	allowDecimals: true,
					                	decimalPrecision:1,
					                	incrementValue:1,
					                	//width:180,
					                	anchor:'100%',
					                	accelerate: true
					                },{
					                	fieldLabel: '目标高度(米)',
					                	id: 'endHeight',
					                	minValue:0,
					                	value:50,
					                	maxValue:1000,
					                	allowDecimals: true,
					                	decimalPrecision:1,
					                	incrementValue:1,
					                	//width:180,
					                	anchor:'100%',
					                	accelerate: true
					                }
					            ]
					        }
				        ],
				        buttons: [{
		                    text: '开始分析',
		                    handler:function(){
		                    	IndexTool.stopAllTool();
		            			startSightAnalyse(Ext.getCmp('startHeight').getValue(),Ext.getCmp('endHeight').getValue());
		                    }
		                },{
		                    text: '结束分析',
		                    handler:function(){
		                    	stopSightAnalyse();
		    		        }
		                }]
			    }),new Ext.FormPanel({
			        bodyStyle: 'padding:5px 5px 0',
			        title:'坡度坡向分析',
			        hidden:true,
			        autoWidth:true,
	            	width:'98%',
			        id:'slopeAnalyseForm',
			        border : false,
			        buttons: [{
	                    text: '开始分析',
	                    handler:function(){
	                    	IndexTool.stopAllTool();
	                    	startMeasureSlope();
	                    }
	                },{
	                    text: '结束分析',
	                    handler:function(){
	                    	stopMeasure();
	    		        }
	                }]
		    }),new Ext.FormPanel({
			        bodyStyle: 'padding:5px 5px 0',
			        title:'水淹分析',
			        hidden:true,
	            	width:'98%',
			        autoWidth:true,
			        id:'waterFloodAnalyseForm',
			        border : false,
			        items: [{
				            xtype:'fieldset',
				            autoHeight:true,
				            autoWidth:true,
				            defaultType: 'spinnerfield',
				            items :[{
				                	fieldLabel: '水位(米)',
				                	id: 'endWaterLevel',
				                	minValue:0,
				                	value:2960,
				                	maxValue:2960,
				                	allowDecimals: true,
				                	decimalPrecision:1,
				                	incrementValue:1,
				                	//width:150,
				                	anchor:'100%',
				                	accelerate: true
				                },{
			            			xtype:'checkbox',
				                    checked: false,
				                    fieldLabel: '图层',
				                    boxLabel: '淹没线',
				                    id: 'kuerganLayer', 
				                    listeners:{  
			                            afterrender:function(obj){  
			                                obj.getEl().dom.onclick = function(){  
			                                	setWMSLayerIsEnabled("kuergan_submerge",obj.getEl().dom.checked);
			                                };  
			                            }  
			                        }  
				                },{
				                	xtype:'textfield',
			                        fieldLabel: '淹没面积',
			                        id:'areaLabel',
				                	anchor:'100%',
			                        value:'0.00平方米'
			                    },{
				                	xtype:'textfield',
			                        fieldLabel: '库容',
				                	anchor:'100%',
			                        id:'volumeLabel',
			                        value:'0.00立方米'
			                    }
				            ]
				        }
			        ],
			        buttons: [{
	                    text: '开始分析',
	                    handler:function(){
	                    	if(Ext.getCmp('waterFloodAnalyseForm').getForm().isValid()){
	                    		IndexTool.stopAllTool();
	                    		Ext.get('areaLabel').dom.value='0.00平方米';
	                    		Ext.get('volumeLabel').dom.value='0.00立方米';
	                    		startWaterFloodAnalyse(2900,Ext.getCmp('endWaterLevel').getValue());
	                        }
	                    }
	                },{
	                    text: '结束分析',
	                    handler:function(){
	                    	stopWaterFloodAnalyse();
	    		        }
	                }]
		    }),new Ext.FormPanel({
		        bodyStyle: 'padding:5px 5px 0',
		        title:'剖面分析',
		        autoWidth:true,
            	width:'98%',
		        hidden:true,
		        id:'terrainAnalyseForm',
		        border : false,
		        items: [{
			            xtype:'fieldset',
			            autoHeight:true,
			            autoWidth:true,
			            items :[{
				        	   	xtype:'combo',
								id:'followType',
								fieldLabel:'分析方式',
							    triggerAction: 'all',
							    lazyRender:true,
							    mode: 'local',
							    //width:180,
			                	anchor:'100%',
							    editable:false,
							    allowBlank:false,
							    store: new Ext.data.ArrayStore({
							        fields: ['keytext','keytype'],
							        data: [['跟随视点绘制','view'],['跟随光标绘制','cursor'],['鼠标自由绘制','free']]
							    }),
							    valueField: 'keytype',
							    displayField: 'keytext',
							    listeners : {
							    	afterrender : function(combo){
							    	    combo.setValue(combo.getStore().getAt(2).data.keytype);
							    	}
							    }
				           },{
				        	   	xtype:'combo',
								id:'graphSize',
								fieldLabel:'绘制图大小',
							    triggerAction: 'all',
							    lazyRender:true,
							    mode: 'local',
							    //width:180,
			                	anchor:'100%',
							    editable:false,
							    allowBlank:false,
							    store: new Ext.data.ArrayStore({
							        fields: ['keytext','keytype'],
							        data: [['小','Small'],['中','Medium'],['大','Large']]
							    }),
							    valueField: 'keytype',
							    displayField: 'keytext',
							    listeners : {
							    	afterrender : function(combo){
							    	    combo.setValue(combo.getStore().getAt(1).data.keytype);
							    	}
							    }
				           }
			            ]
			        }
		        ],
		        buttons: [{
                    text: '开始分析',
                    handler:function(){
                    	if(Ext.getCmp('terrainAnalyseForm').getForm().isValid()){
                    		IndexTool.stopAllTool();
            				startTerrainAnalyse(Ext.getCmp('followType').getValue(),Ext.getCmp('graphSize').getValue());
                        }
                    }
                },{
                    text: '结束分析',
                    handler:function(){
                    	stopTerrainAnalyse();
    		        }
                }]
		    }),new Ext.FormPanel({
		        bodyStyle: 'padding:5px 5px 0',
		        title:'消落区分析',
		        autoWidth:true,
            	width:'98%',
		        hidden:true,
		        id:'fluctuateAnalyseForm',
		        border : false,
		        items: [{
			            xtype:'fieldset',
			            autoHeight:true,
			            autoWidth:true,
			            defaultType: 'spinnerfield',
			            items :[{
				                	fieldLabel: '落水位(米)',
				                	id: 'startFluctuateWaterLevel',
				                	minValue:0,
				                	value:2950,
				                	maxValue:2960,
				                	allowDecimals: true,
				                	decimalPrecision:1,
				                	incrementValue:1,
				                	width:150,
				                	accelerate: true
				                },{
				                	fieldLabel: '涨水位(米)',
				                	id: 'endfluctuateWaterLevel',
				                	minValue:0,
				                	value:2960,
				                	maxValue:2960,
				                	allowDecimals: true,
				                	decimalPrecision:1,
				                	incrementValue:1,
				                	width:150,
				                	accelerate: true
				                },{
				        			xtype:'checkbox',
				                    checked: false,
				                    fieldLabel: '图层',
				                    boxLabel: '淹没线',
				                    listeners:{  
				                        afterrender:function(obj){  
				                            obj.getEl().dom.onclick = function(){  
				                            	setWMSLayerIsEnabled("kuergan_submerge",obj.getEl().dom.checked);
				                            };  
				                        }  
				                    }  
				                },{
									xtype:'textfield',
									fieldLabel:'消落区面积',
									id:'fluctuateAreaLabel',
									width:150,
									value:'0.0 平方米'
								}
				           ]
			        }
		        ],
		        buttons: [{
                    text: '开始分析',
                    handler:function(){
                    	IndexTool.stopAllTool();
                    	startFluctuateAnalyse(Ext.getCmp('startFluctuateWaterLevel').getValue(),Ext.getCmp('endfluctuateWaterLevel').getValue());
                    }
                },{
                    text: '结束分析',
                    handler:function(){
                    	stopFluctuateAnalyse();
                    	Ext.getCmp("fluctuateAreaLabel").setValue('0.0 平方米');
    		        }
                }]
	    }),new Ext.FormPanel({
	        bodyStyle: 'padding:5px 5px 0',
	        title:'挖填方分析',
	        autoWidth:true,
        	width:'98%',
	        hidden:true,
	        id:'digFillAnalyseForm',
	        border : false,
	        items: [{
		            xtype:'fieldset',
		            autoHeight:true,
		            autoWidth:true,
		            defaultType: 'spinnerfield',
		            items :[{
		                	fieldLabel: '挖填深度(米)',
		                	id: 'digFillDepth',
		                	minValue: 0,
		                	value:10,
		                	maxValue: 4000,
		                	allowDecimals: true,
		                	decimalPrecision:1,
		                	incrementValue:1,
		                	width:150,
		                	accelerate: true
		                },{
		                	xtype:'textfield',
							fieldLabel:'挖方体积',
							id:'digLabel',
							width:150,
							value:'0.0 立方米'
						},{
							xtype:'textfield',
							fieldLabel:'填方体积',
							id:'fillLabel',
							width:150,
							value:'0.0 立方米'
						},{
							xtype:'textfield',
							fieldLabel:'挖填体积差',
							id:'digFillLabel',
							width:150,
							value:'0.0 立方米'
						}
		            ]
		        }
	        ],
	        buttons: [{
                text: '开始分析',
                handler:function(){
                	IndexTool.stopAllTool();
                	startDigFillAnalyse(Ext.getCmp('digFillDepth').getValue());
                }
            },{
                text: '结束分析',
                handler:function(){
                	stopDigFillAnalyse();
                	Ext.getCmp("digLabel").setValue('0.0 立方米');
                	Ext.getCmp("fillLabel").setValue('0.0 立方米');
                	Ext.getCmp("digFillLabel").setValue('0.0 立方米');
		        }
            }]
	    }),new Ext.FormPanel({
	        bodyStyle: 'padding:5px 5px 0',
	        title:'量算分析',
	        autoWidth:true,
        	width:'100%',
	        hidden:true,
	        id:'measureAnalyseForm',
	        border : false,
	        items: [new Ext.Component({
						el:'measureAnalyseMenu',
						height:85
					})
	        ]
	    }),new Ext.FormPanel({
	        bodyStyle: 'padding:5px 5px 0',
	        title:'光照分析',
	        autoWidth:true,
	        hidden:true,
        	width:'98%',
	        id:'lightAnalyseForm',
	        border : false,
	        items: [new Ext.Component({
						el:'lightAnalyseMenu',
						height:85
					})
	        ]
	    })]
	}]
        });

        me.callParent(arguments);
    }

});