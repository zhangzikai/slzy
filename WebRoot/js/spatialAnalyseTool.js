/*
 * 空间分析工具 2013-12-20 11:25:16
 * */
//类 SpatialAnalyseTool
var SpatialAnalyseTool={
		isTerrainAnalyse:true,
		isSightAnalyse:true,
		/**
		*打开空间分析菜单
		*用户管理、角色管理、权限管理、日志管理
		*/
		spatialAnalysis:function(){
			var html='<div style="text-align: center;vertical-align: middle;" onclick="SpatialAnalyseTool.slopeAnalyse();"><img src="images/PDPXFX.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">坡度坡向分析</span></div></div>'+
			'<div style="text-align: center;vertical-align: middle;" onclick="SpatialAnalyseTool.terrainAnalyse();"><img src="images/PMFX.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">剖面分析</span></div></div>'+
			'<div style="text-align: center;vertical-align: middle;" onclick="SpatialAnalyseTool.sightAnalyse();"><img src="images/TSFX.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">通视分析</span></div></div>'+
			'<div style="text-align: center;vertical-align: middle;" onclick="SpatialAnalyseTool.waterFloodAnalyse();"><img src="images/SYFX.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">水淹分析</span></div></div>'+
			'<div style="text-align: center;vertical-align: middle;" onclick="SpatialAnalyseTool.fluctuateAnalyse();"><img src="images/XLQFX.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">消落区分析</span></div></div>'+
			'<div style="text-align: center;vertical-align: middle;" onclick="SpatialAnalyseTool.landformLine();"><img src="images/SWDXXZTT.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">水位地形线专题图</span></div></div>'+
			'<div style="text-align: center;vertical-align: middle;" onclick="SpatialAnalyseTool.reservoirVolume();"><img src="images/SWKRZTT.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">水位库容专题图</span></div></div>'+
			'<div style="text-align: center;vertical-align: middle;" onclick="SpatialAnalyseTool.elevationDistribute();"><img src="images/SKGCZTT.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">水库高程分布专题图</span></div></div>';
			var isShow=SystemTool.createTab("spatialAnalysisTab","空间分析",html);
			if(isShow){
				return;
			}
		},
		/**
		*开始坡度坡向分析
		*/
		slopeAnalyse:function(){
			var isShow=SystemTool.createTab("slopeAnalyseTab","坡度坡向分析","<div id='slopeAnalyseDiv'></div>");
			if(isShow){
				return;
			}
			var slopeAnalyseForm = new Ext.FormPanel({
                labelWidth: 75, // label settings here cascade unless overridden
                frame:true,
                applyTo:'slopeAnalyseDiv',
                title: '坡度坡向分析',
                bodyStyle:'padding:5px 5px 0',
                autoWidth:true,
                fileUpload:true,
                defaultType: 'textfield',
                buttons: [{
                    text: '定位',
                    handler:function(){
                    	flyToLocation(37.81210,75.44671,24000,100,70,10000);
                    }
                },{
                    text: '开始分析',
                    handler:function(){
                    	SpatialAnalyseTool.stopAllTool();
                    	startMeasureSlope();
    		        }
                },{
                    text: '结束分析',
                    handler:function(){
                    	stopMeasure();
    		        }
                },{
                    text: '取消',
                    handler:function(){
                    	SystemTool.deleteTab("slopeAnalyseTab");
    		        }
                }]
            });
		},
		/**
		*开始剖面分析/结束剖面分析
		*/
		terrainAnalyse:function(){
			var isShow=SystemTool.createTab("terrainAnalyseTab","剖面分析","<div id='terrainAnalyseDiv'></div>");
			if(isShow){
				return;
			}
			var terrainAnalyseForm = new Ext.FormPanel({
                labelWidth: 75, // label settings here cascade unless overridden
                frame:true,
                applyTo:'terrainAnalyseDiv',
                title: '剖面分析',
                bodyStyle:'padding:5px 5px 0',
                autoWidth:true,
                fileUpload:true,
                defaultType: 'textfield',
                items: [{
		        	   	xtype:'combo',
						id:'followType',
						fieldLabel:'分析方式',
					    triggerAction: 'all',
					    lazyRender:true,
					    mode: 'local',
					    emptyText:'请选择...',
					    width:120,
					    editable:false,
					    allowBlank:false,
					    store: new Ext.data.ArrayStore({
					        fields: ['keytext','keytype'],
					        data: [['跟随视点绘制','view'],['跟随光标绘制','cursor'],['鼠标自由绘制','free']]
					    }),
					    valueField: 'keytype',
					    displayField: 'keytext'
		           },{
		        	   	xtype:'combo',
						id:'graphSize',
						fieldLabel:'绘制图大小',
					    triggerAction: 'all',
					    lazyRender:true,
					    mode: 'local',
					    emptyText:'请选择...',
					    width:120,
					    editable:false,
					    allowBlank:false,
					    store: new Ext.data.ArrayStore({
					        fields: ['keytext','keytype'],
					        data: [['小','Small'],['中','Medium'],['大','Large']]
					    }),
					    valueField: 'keytype',
					    displayField: 'keytext'
		           }],
                buttons: [{
                    text: '开始分析',
                    handler:function(){
                    	if(terrainAnalyseForm.getForm().isValid()){
                    		SpatialAnalyseTool.stopAllTool();
            				startTerrainAnalyse(Ext.getCmp('followType').getValue(),Ext.getCmp('graphSize').getValue());
            				this.isTerrainAnalyse=false;
                        }
                    }
                },{
                    text: '结束分析',
                    handler:function(){
                    	stopTerrainAnalyse();
        				this.isTerrainAnalyse=true;
    		        }
                },{
                    text: '取消',
                    handler:function(){
                    	SystemTool.deleteTab("terrainAnalyseTab");
    		        }
                }]
            });
		},
		/**
		 * 开始通视分析/结束通视分析
		 */
		sightAnalyse:function() {
			var isShow=SystemTool.createTab("sightAnalyseTab","通视分析","<div id='sightAnalyseDiv'></div>");
			if(isShow){
				return;
			}
			
			var sightAnalyseForm = new Ext.FormPanel({
                labelWidth: 75, // label settings here cascade unless overridden
                frame:true,
                applyTo:'sightAnalyseDiv',
                title: '通视分析',
                bodyStyle:'padding:5px 5px 0',
                autoWidth:true,
                fileUpload:true,
                defaultType: 'textfield',
                buttons: [{
                    text: '开始分析',
                    handler:function(){
                    	if(sightAnalyseForm.getForm().isValid()){
                    		SpatialAnalyseTool.stopAllTool();
            				startSightAnalyse();
            				this.isSightAnalyse=false;
                        }
                    }
                },{
                    text: '结束分析',
                    handler:function(){
                    	stopSightAnalyse();
            			this.isSightAnalyse=true;
    		        }
                },{
                    text: '取消',
                    handler:function(){
                    	SystemTool.deleteTab("sightAnalyseTab");
    		        }
                }]
            });
		},
		/**
		*关闭所有分析工具
		*剖面分析、通视分析、坡度坡向分析、水淹分析、消落区分析
		*/
		stopAllTool:function(){
			//测量绘画的图层
			stopMeasure();
			
			//剖面分析
			stopTerrainAnalyse();
			this.isTerrainAnalyse=true;
			//通视分析
			stopSightAnalyse();
			this.isSightAnalyse=true;
			//水淹分析
			stopWaterFloodAnalyse();
			//消落区分析
			stopFluctuateAnalyse();
		},
		/**
		*水淹分析
		*/
		waterFloodAnalyse:function(){
			var isShow=SystemTool.createTab("waterFloodAnalyseTab","水淹分析","<div id='waterFloodAnalyseDiv'></div>");
			if(isShow){
				return;
			}
			
			var waterFloodAnalyseForm = new Ext.FormPanel({
                labelWidth: 75, // label settings here cascade unless overridden
                frame:true,
                applyTo:'waterFloodAnalyseDiv',
                title: '水淹分析',
                bodyStyle:'padding:5px 5px 0',
                autoWidth:true,
                fileUpload:true,
                defaultType: 'textfield',
                items: [{
	                	xtype: 'spinnerfield',
	                	fieldLabel: '起始水位(米)',
	                	id: 'startWaterLevel',
	                	minValue: 2800,
	                	value:2900,
	                	maxValue: 4000,
	                	allowDecimals: true,
	                	decimalPrecision:1,
	                	incrementValue:1,
	                	accelerate: true
	                },{
	                	xtype: 'spinnerfield',
	                	fieldLabel: '结束水位(米)',
	                	id: 'endWaterLevel',
	                	minValue:2800,
	                	value:2960,
	                	maxValue:4000,
	                	allowDecimals: true,
	                	decimalPrecision:1,
	                	incrementValue:1,
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
                        id:'area',
                        value:'0.0平方米'
                    }],
                buttons: [{
                    text: '定位',
                    handler:function(){
                    	flyToLocation(37.81210,75.44671,24000,100,70,10000);
                    }
                },{
                    text: '开始分析',
                    handler:function(){
                    	if(waterFloodAnalyseForm.getForm().isValid()){
                    		SpatialAnalyseTool.stopAllTool();
                    		var area=startWaterFloodAnalyse(Ext.getCmp('startWaterLevel').getValue(),Ext.getCmp('endWaterLevel').getValue());
                    		Ext.get('area').dom.value=area;
                        }
                    }
                },{
                    text: '清除分析',
                    handler:function(){
                    	stopWaterFloodAnalyse();
    		        }
                },{
	                text: '取消',
	                handler:function(){
	                	SystemTool.deleteTab("waterFloodAnalyseTab");
			        }
	            }]
            });
		},
		/**
		 * 消落区分析
		 */
		fluctuateAnalyse:function(){
			var isShow=SystemTool.createTab("fluctuateAnalyseTab","消落区分析","<div id='fluctuateAnalyseDiv'></div>");
			if(isShow){
				return;
			}
			var floodAnalyseForm = new Ext.FormPanel({
                labelWidth: 75, // label settings here cascade unless overridden
                frame:true,
                applyTo:'fluctuateAnalyseDiv',
                title: '消落区分析',
                bodyStyle:'padding:5px 5px 0',
                autoWidth:true,
                defaultType: 'textfield',
                items: [{
	                	xtype: 'spinnerfield',
	                	fieldLabel: '起始水位(米)',
	                	id: 'startWaterLevel1',
	                	minValue: 2800,
	                	value:2900,
	                	maxValue: 4000,
	                	allowDecimals: true,
	                	decimalPrecision:1,
	                	incrementValue:1,
	                	accelerate: true
	                },{
	                	xtype: 'spinnerfield',
	                	fieldLabel: '结束水位(米)',
	                	id: 'endWaterLevel1',
	                	minValue:2800,
	                	value:2960,
	                	maxValue:4000,
	                	allowDecimals: true,
	                	decimalPrecision:1,
	                	incrementValue:1,
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
	                    fieldLabel: '淹没面积',
	                    id:'fluctuateArea',
	                    value:'0.0平方米'
	                }
	            ],
                buttons: [{
	                    text: '定位',
	                    handler:function(){
	                    	flyToLocation(37.81210,75.44671,24000,100,70,10000);
	                    }
	                },{
	                    text: '开始分析',
	                    handler:function(){
	                    	SpatialAnalyseTool.stopAllTool();
	                    	startFluctuateAnalyse(Ext.getCmp('startWaterLevel1').getValue(),Ext.getCmp('endWaterLevel1').getValue());
	    		        }
	                },{
	                    text: '结束分析',
	                    handler:function(){
	                    	stopFluctuateAnalyse();
	    		        }
	                },{
	                    text: '取消',
	                    handler:function(){
	                    	SystemTool.deleteTab("fluctuateAnalyseTab");
	    		        }
	                }]
            });
			
		},

		/**
		 * 水位库容专题图
		 */
		reservoirVolume:function(){
			var isShow=SystemTool.createTab("reservoirVolumeTab","水位库容专题图","<div id='reservoirVolumeDiv'></div>");
			if(isShow){
				return;
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
		    new Ext.Panel({
		        title: '水位库容专题图(水位--库容曲线)',
		        frame:true,
		        renderTo: 'reservoirVolumeDiv',
		        width:600,
		        height:400,
		        layout:'fit',
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
		    });
		},
		/**
		 * 水位地形线专题图
		 */
		landformLine:function(){
			var isShow=SystemTool.createTab("landformLineTab","水位地形线专题图","<div id='landformLineDiv'></div>");
			if(isShow){
				return;
			}
			new Ext.form.FormPanel({
				id:'landformLineForm',
				labelWidth: 75, // label settings here cascade unless overridden
                frame:true,
                applyTo:'landformLineDiv',
                url:SystemTool.basePath+'/themePic.jhtml?method=add',
                title: '水位地形线专题图制作',
                bodyStyle:'padding:5px 5px 0',
                autoWidth:true,
                fileUpload:true,
				buttonAlign:'center',
				defaults:{anchor:'90%',allowBlank: false},
				items:[{
						xtype:'textfield',
						fieldLabel:'专题图名称',
						name:'picName',
						maxLength:60,
						maxLengthText:'最长不超过{0}个长度'
					},{
						xtype:'combo',
						fieldLabel:"分类",
						triggerAction:"all",
						mode:"local",
						maxLength:20,
						emptyText:"请选择...",
						store:new Ext.data.Store({
							autoLoad:true,
							proxy:new Ext.data.HttpProxy({url:SystemTool.basePath+'/sysDic.jhtml?method=queryList&parentId=1'}),
							reader:new Ext.data.JsonReader({fields:[{name:'id'},{name:'dicName'}]})
						}),
						displayField:"dicName",
		 				valueField:"id",
						autoShow:true,
						listeners: {
							select: function(f,r,i){
								Ext.getCmp('classify1').setValue(f.value);
							}	
						}
					},{
						xtype:'hidden',
						id:'classify1',
						name:'classify.id'
					},{
	                    xtype: 'fileuploadfield',
	                    id: 'picFile1',
	                    name: 'tempFile',
	                    emptyText: '请选择图片文件...',
	                    fieldLabel: '专题图',
	                    permitted_extensions:['jpg','jpeg','JPEG','GIF','gif'],  
	                    buttonText: '',
	                    allowBlank:true,
	                    buttonCfg: {
	                        iconCls: 'upload-icon'
	                    }
	                },{
						xtype:'textarea',
						height:80,
						fieldLabel:'描&nbsp;&nbsp;&nbsp;述',
						name:'picDesc',
						maxLength:6000,
						maxLengthText:'最长不超过{0}个长度'
					}],
				buttons: [{
	                    text: '定位',
	                    handler:function(){
	                    	flyToLocation(37.81210,75.44671,24000,100,70,10000);
	                    }
	                },{
	                    text: '截屏',
	                    handler:function(){
	                    	var result=screenShot();
	                    	Ext.getCmp('picFile1').setValue(result);
	    		        }
	                },{
	                    text: '保存',
	                    handler:function(){
	                    	if(Ext.getCmp('landformLineForm').getForm().isValid()){
	                    		if(Ext.getCmp('picFile1').getValue()==""){
	                    			alert("请点击截屏!");
		                    		return ;
	                    		}
                    			Ext.getCmp('landformLineForm').getForm().submit();
                    			alert('操作成功');
                    			Ext.getCmp('themePicForm').getForm().reset();
							}
	    		        }
	                },{
	                    text: '取消',
	                    handler:function(){
	                    	SystemTool.deleteTab("landformLineTab");
	    		        }
	                }]
			});
		},
		/**
		 * 水位高程分布专题图
		 */
		 elevationDistribute:function(){
			var isShow=SystemTool.createTab("elevationDistributeTab","水位高程分布专题图","<div id='elevationDistributeDiv'></div>");
			if(isShow){
				return;
			}
			new Ext.form.FormPanel({
				id:'elevationDistributeForm',
				labelWidth: 75, // label settings here cascade unless overridden
                frame:true,
                applyTo:'elevationDistributeDiv',
                url:SystemTool.basePath+'/themePic.jhtml?method=add',
                title: '水位地形线专题图制作',
                bodyStyle:'padding:5px 5px 0',
                autoWidth:true,
                fileUpload:true,
				buttonAlign:'center',
				defaults:{anchor:'90%',allowBlank: false},
				items:[{
						xtype:'textfield',
						fieldLabel:'专题图名称',
						name:'picName',
						maxLength:60,
						maxLengthText:'最长不超过{0}个长度'
					},{
						xtype:'combo',
						fieldLabel:"分类",
						triggerAction:"all",
						mode:"local",
						maxLength:20,
						emptyText:"请选择...",
						store:new Ext.data.Store({
							autoLoad:true,
							proxy:new Ext.data.HttpProxy({url:SystemTool.basePath+'/sysDic.jhtml?method=queryList&parentId=1'}),
							reader:new Ext.data.JsonReader({fields:[{name:'id'},{name:'dicName'}]})
						}),
						displayField:"dicName",
		 				valueField:"id",
						autoShow:true,
						listeners: {
							select: function(f,r,i){
								Ext.getCmp('classify1').setValue(f.value);
							}	
						}
					},{
						xtype:'hidden',
						id:'classify1',
						name:'classify.id'
					},{
	                    xtype: 'fileuploadfield',
	                    id:'picFile2',
	                    name:'tempFile',
	                    emptyText: '请选择图片文件...',
	                    fieldLabel: '专题图',
	                    permitted_extensions:['jpg','jpeg','JPEG','GIF','gif'],  
	                    buttonText: '',
	                    allowBlank:true,
	                    buttonCfg: {
	                        iconCls: 'upload-icon'
	                    }
	                },{
						xtype:'textarea',
						height:80,
						fieldLabel:'描&nbsp;&nbsp;&nbsp;述',
						name:'picDesc',
						maxLength:6000,
						maxLengthText:'最长不超过{0}个长度'
					}],
				buttons: [{
	                    text: '定位',
	                    handler:function(){
	                    	flyToLocation(37.81210,75.44671,24000,100,70,10000);
	                    }
	                },{
	                    text: '截屏',
	                    handler:function(){
	                    	var result=screenShot();
	                    	Ext.getCmp('picFile2').setValue(result);
	    		        }
	                },{
	                    text: '保存',
	                    handler:function(){
	                    	if(Ext.getCmp('elevationDistributeForm').getForm().isValid()){
	                    		if(Ext.getCmp('picFile2').getValue()==""){
	                    			alert("请点击截屏!");
		                    		return ;
	                    		}
                    			Ext.getCmp('elevationDistributeForm').getForm().submit();
                    			alert('操作成功');
                    			Ext.getCmp('elevationDistributeForm').getForm().reset();
							}
	    		        }
	                },{
	                    text: '取消',
	                    handler:function(){
	                    	SystemTool.deleteTab("landformLineTab");
	    		        }
	                }]
			});
		}
		
};
