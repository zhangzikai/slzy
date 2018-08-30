Ext.define('MyApp.controller.MainController', {
	extend : 'Ext.app.Controller',
	views : [ 'MyApp.view.MyViewport', 'MyApp.view.ThematicView', 'MyApp.view.StatisticsView', 'MyApp.view.XBQueryView', 'MyApp.view.XBCondQueryView', 'Ext.ux.TreePicker', 'MyApp.view.SpatialView',
			'MyApp.view.SysManagerView', 'MyApp.view.UserManagerView', 'MyApp.view.RoleManagerView', 'MyApp.view.RoleEditWindow', 'MyApp.view.xbFieldView', 'MyApp.view.ThematicConfigView',
			'MyApp.view.StatisticsWindow', 'MyApp.view.XBCompareView' ],

	onViewportRender : function(component, eOpts) {
		Ext.getCmp('change2d').on({
			click : function() {
				try {
					resetFunc();
				} catch (e) {
				}
				mapType=2;
				var tabpanel = Ext.ComponentQuery.query('ViewportWidget tabpanel[name="tabMain"]')[0];
				tabpanel.setActiveTab(1);
				// 隐藏空间分析
				var spatialMenu = Ext.ComponentQuery.query('ViewportWidget button[name="spatial3D"]')[0];
				spatialMenu.setVisible(false);
				var split3d = Ext.ComponentQuery.query('ViewportWidget panel[name="split3d"]')[0];
				split3d.setVisible(false);

				var map2dMenu = Ext.ComponentQuery.query('ViewportWidget button[name="mapTools2d"]')[0];
				map2dMenu.setVisible(true);
				var split2d = Ext.ComponentQuery.query('ViewportWidget panel[name="split2d"]')[0];
				split2d.setVisible(true);

				if (isFirst) {
					// zoomToExtent();
					var x = config.mapCenter.x + 0.1;
					var y = config.mapCenter.y;
					map.panTo(new OpenLayers.LonLat(x, y));
					map.panTo(new OpenLayers.LonLat(x - 0.1, y));

					isFirst = false;
				}
				// setTimeout(function(){
				// var panel =
				// Ext.ComponentQuery.query('ViewportWidget
				// panel[name="map2d1"]')[0];
				// panel.flex=0.5;
				// var tabPanel =
				// Ext.ComponentQuery.query('ViewportWidget
				// panel[name="tab2d"]')[0];
				// tabPanel.doLayout();
				// }, 1000 )

				// var width = panel.getWidth();
				// panel.setWidth(width+1);
				// console.log(width);
				// width = panel.getWidth();
				// console.log(width);
				// panel.setWidth(width-1);

				set2DCenter();
			}
		});
		Ext.useShims = true;
		OpenLayers.ProxyHost = "cgi/proxy.cgi?url=";
	},

	onPanelRender : function(component, eOpts) {
		// map2d.init2dMap();
		init2DMap();
		Ext.getCmp('change3d').on({
			click : function() {
				mapType=3;
				set3DCenter(map.getCenter().lon, map.getCenter().lat, map.getScale() / 3);
				var tabpanel = Ext.ComponentQuery.query('ViewportWidget tabpanel[name="tabMain"]')[0];
				tabpanel.setActiveTab(0);
				// 隐藏地图工具
				var map2dMenu = Ext.ComponentQuery.query('ViewportWidget button[name="mapTools2d"]')[0];
				map2dMenu.setVisible(false);
				var split2d = Ext.ComponentQuery.query('ViewportWidget panel[name="split2d"]')[0];
				split2d.setVisible(false);
				var spatialMenu = Ext.ComponentQuery.query('ViewportWidget button[name="spatial3D"]')[0];
				spatialMenu.setVisible(true);
				var split3d = Ext.ComponentQuery.query('ViewportWidget panel[name="split3d"]')[0];
				split3d.setVisible(true);
			}
		});
	},

	onPanelRender1 : function(component, eOpts) {
		// map2d.init2dMap();
		init2DMap1();
	},
	onPanelRender2 : function(component, eOpts) {

	},

	init : function(application) {
		loadFlyRouteMenu = function() {
			var flyRouteMenu = Ext.getCmp('flyRouteMenu');
			flyRouteMenu.removeAll();
			Ext.Ajax.request({
				url : SystemTool.basePath + '/flyRoute.jhtml?method=queryAll',
				success : function(res) {
					var jsonResult = Ext.JSON.decode(res.responseText);
					for (var i = 0; i < jsonResult.length; i++) {
						var flyRoute = jsonResult[i];
						flyRouteMenu.add({
							text : flyRoute.name,
							points : flyRoute.points,
							length : flyRoute.length,
							handler : function() {
								showFlyOptionWindow(this);
								resetFunc();
								// IndexTool.stopAllTool();
								// flyToLocation(this.lat,this.lon,this.height,this.heading,this.pitch,this.zoom);
							}
						});
					}
				}
			});
		};
		loadSceneMenu = function() {
			var sceneMenu = Ext.getCmp('sceneMenu');
			sceneMenu.removeAll();
			Ext.Ajax.request({
				url : SystemTool.basePath + '/scene.jhtml?method=queryAll',
				success : function(res) {
					var jsonResult = Ext.JSON.decode(res.responseText);
					for (var i = 0; i < jsonResult.length; i++) {
						var cj = jsonResult[i];
						sceneMenu.add({
							text : cj.name,
							lon : cj.lon,
							lat : cj.lat,
							height : cj.height,
							pitch : cj.pitch,
							heading : cj.heading,
							zoom : cj.zoom,
							handler : function() {
								IndexTool.stopAllTool();
								flyToLocation(this.lat, this.lon, this.height, this.heading, this.pitch, this.zoom);
								resetFunc();
							}
						});
					}
				}
			});
		};
		sceneMenu = new Ext.menu.Menu({
			id : "sceneMenu"
		});
		loadSceneMenu();

		// 飞行线路列表菜单
		flyRouteMenu = new Ext.menu.Menu({
			id : "flyRouteMenu"
		});
		loadFlyRouteMenu();

		// -------------------------------------------------------------
		onPageLoad = function() {
			// 获取applet
			// console.log('loaded');
			getWWJApplet();
			// 使用前先创建，为的是初始化的时候不用加载全部new出来，用到在new，下面的都同理
			// createBaseTool();
			createQueryTool();
			createMeasureTool();
			createMarkerTool();
			createDrawTool();
			// createKmlFiles();
			createShpFiles();
			createModelTool();
			createWindowOption();
			createAirspaceTool();
			// createWorldModel();
			createAnalyseTool();
			ViewControlTool.elementToggle(8, false);
			ViewControlTool.elementToggle(9, false);
			ViewControlTool.elementToggle(6, false);
			// flyToTime(41.5736,122.8858,24000,100,70,10000,10000);
			return  mapMaxExtent.toString();
			
		}

		/**
		 * 三维点击事件回调方法(返回坐标点)
		 */
		xbFieldShow = function(lat, lng) {
				if(lng<mapMaxExtent.left || lng>mapMaxExtent.right || lat<mapMaxExtent.bottom || lat>mapMaxExtent.top)return;
			if (isClickXBShow) {
				getFeatureByXY(lng, lat, xbFieldShowCallBack);
			}
		}

		areaShow = function(lat, lng) {
			if (isClickXBShow) {
				// 清除之前的选中效果
				var geometry = new OpenLayers.Geometry.Point(lng, lat);
				removedAllShape();
				var lay;
				var url;
				// 获得要查询的图层
				if (selectLayer == "xian") {
					lay = config.xian.layerServerName;// 'shwy:xian';//'shwy:xian';//map.layers[2];
					url = config.xian.wfs_url;
				} else if (selectLayer == "xiang") {
					lay = config.xiang.layerServerName;// 'shwy:xiang';//'shwy:xiang';//map.layers[3];
					url = config.xiang.wfs_url;
				} else if (selectLayer == "cun") {
					lay = config.cun.layerServerName;// 'shwy:cun';//'shwy:cun'//map.layers[4];
					url = config.cun.wfs_url;
				}
				// params = {
				// REQUEST : "GetFeatureInfo",
				// EXCEPTIONS : "application/vnd.ogc.se_xml",
				// BBOX : map.getExtent().toBBOX(),
				// SERVICE : "WMS",
				// VERSION : "1.1.1",
				// X : e.xy.x,
				// Y : e.xy.y,
				// INFO_FORMAT : 'application/vnd.ogc.gml',
				// QUERY_LAYERS : lay,//lay.params.LAYERS,
				// FEATURE_COUNT : 1,
				// Layers : lay,//wms_layer,//lay.params.LAYERS,
				// WIDTH : map.size.w,
				// HEIGHT : map.size.h,
				// format : "image/png",
				// styles : '',//'',//lay.params.STYLES,
				// srs :
				// 'EPSG:4610'//'EPSG:4610'//lay.params.SRS
				// };

				// 筛选条件对象
				var filter = new OpenLayers.Filter.Spatial({
					type : OpenLayers.Filter.Spatial.INTERSECTS, // INTERSECTS,
					property : 'shape', // //相交OK
					value : geometry,
					projection : "EPSG:4610"
				});

				// 构造请求数据
				var filter_1_0 = new OpenLayers.Format.Filter.v1_0_0();
				var xml = new OpenLayers.Format.XML();
				var xmlPara = "<?xml version='1.0' encoding='UTF-8'?>" + "<wfs:GetFeature service='WFS' version='1.0.0' " + "xmlns:wfs='http://www.opengis.net/wfs' "
						+ "xmlns:gml='http://www.opengis.net/gml' " + "xmlns:ogc='http://www.opengis.net/ogc' " + "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
						+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd'>" + "<wfs:Query typeName='" + lay + "' srsName='EPSG:4610' >"
						+ xml.write(filter_1_0.write(filter)) + "</wfs:Query>" + "</wfs:GetFeature>";

				// 根据行政区划查询统计表
				// Ext.chart.Chart.CHART_URL =
				// SystemTool.basePath+'/extjs3/resources/charts.swf';
				var json_store = new Ext.data.JsonStore({
					autoDestroy : true,
					proxy : {
						type : 'ajax',
						url : SystemTool.basePath + '/tjTable.jhtml?method=queryData',
						reader : {
							type : 'json'
						}
					},
					storeId : 'myStore',
					// reader configs
					root : null,
					idProperty : 'name',
					fields : [ 'name', 'value' ]
				});

				// 先查询出行政区划
				// OpenLayers.loadURL(url, params, this,
				// function(response) {
				OpenLayers.Request.POST({
					url : url,
					data : xmlPara,// 请求数据
					callback : function(response) {
						var g = new OpenLayers.Format.GML();
						var features = g.read(response.responseText);
						if (features == null || features.length < 1)
							return;
						// 选中高亮效果
						// queryResultLayer.drawFeature(features[0],
						// styleMap["hightlight2"]);
						var areaName = features[0].attributes.name;
						var areaCun = features[0].attributes.c_cun;
						var areaXiang = features[0].attributes.c_xiang
						var areaXian = features[0].attributes.c_xian;
						var areaCode = null;
						if (areaCun != undefined) {
							areaCode = areaCun;
						} else if (areaXiang != undefined) {
							areaCode = areaXiang;
						} else if (areaXian != undefined) {
							areaCode = areaXian;
						}
						var components = features[0].geometry.components[0].components;
						for (var i = 0; i < components.length; i++) {
							var points = components[i].getVertices();
							var pointStr = "";// 33.5,125;
							for (var j = 0; j < points.length; j++) {
								if (pointStr == "") {
									pointStr = points[j].y + "," + points[j].x;
								} else {
									pointStr = pointStr + "|" + points[j].y + "," + points[j].x;
								}
							}
							addSurfacePolygon(pointStr, "blue", "lightGray", 0.5, areaCode);
						}
						if (staticsWin) {
							staticsWin.destroy();
							staticsWin = null;
						}

						if (!staticsWin) {
							staticsWin = new Ext.Window({
								title : "行政区划信息",
								height : 700,
								width : 800,
								constrain : true,
								modal : false,
								layout : 'fit',
								resizable : false,
								closeAction : 'close',
								bodyStyle : 'background-color:white;',
								listeners : {
									close : function() {
										staticsWin.destroy();
										staticsWin = null;
										// staticsWin.setVisible(false);
									}
								},
								items : [ {
									xtype : 'tabpanel',
									activeTab : 0,
									items : [ {
										xtype : 'form',
										title : '资源概况',
										header : false,
										bodyStyle : 'padding:15px',
										width : 350,
										defaultType : 'textfield',
										defaults : {
											// applied
											// to
											// each
											// contained
											// item
											width : 230,
											msgTarget : 'side',
											style : {
												marginBottom : '20px'
											}
										},
										items : [ {
											fieldLabel : '区划名称',
											id : 'infoAreaName',
											readOnly : true,
											name : 'first'
										}, {
											fieldLabel : '区划编码',
											id : 'infoAreaCode',
											readOnly : true,
											name : 'last'
										}, {
											fieldLabel : '小班总数',
											id : 'infoXBNum',
											readOnly : true
										}, {
											fieldLabel : '小班总面积',
											id : 'infoAreaTotal',
											readOnly : true
										}, {
											xtype : 'textarea',
											id : 'infoContent',
											// hideLabel:
											// true,
											// //
											// override
											// hideLabels
											// layout
											// config
											name : 'msg',
											readOnly : true,
											fieldLabel : '简介',
											height : 100,
											anchor : '100%'
										} ],
										layoutConfig : {
											labelSeparator : '~' // superseded
										// by
										// assignment
										// below
										},
										// config
										// options
										// applicable
										// to
										// container
										// when
										// layout='form':
										hideLabels : false,
										labelAlign : 'right', // or
										// 'right'
										// or
										// 'top'
										labelSeparator : ':', // takes
										// precedence
										// over
										// layoutConfig
										// value
										labelWidth : 80, // defaults
										// to
										// 100
										labelPad : 8
									// defaults
									// to
									// 5,
									// must
									// specify
									// labelWidth
									// to
									// be
									// honored
									}, {
										title : '资源概况－图表',
										layout : 'fit',
										// width:600,
										// height:600,
										items : [ {
											store : json_store,
											xtype : 'chart',// 餅圖
											margin : 20,
											legend : {
												position : 'right',
												boxStrokeWidth : 0
											},
											series : [ {
												type : 'pie',
												angleField : 'value',
												showInLegend : true,
												tips : {
													trackMouse : true,
													width : 170,
													height : 28,
													renderer : function(storeItem, item) {
														// calculate
														// and
														// display
														// percentage
														// on
														// hover
														var total = 0;
														json_store.each(function(rec) {
															total += rec.get('value');
														});
														this.setTitle(storeItem.get('name') + ': ' + (storeItem.get('value') / total * 100).toFixed(2) + '%');
													}
												},
												highlight : {
													segment : {
														margin : 20
													}
												},
												label : {
													field : 'name',
													// minMargin:20,
													display : 'rotate',// 'outside','rotate'
													contrast : false,
													font : '9px Arial',
													radiusFactor : 50
												}
											} ]
										} ]
									}, {
										title : '资源概况－表格',
										layout : 'fit',
										items : [ {
											xtype : 'grid',
											columns : [ {
												header : '地类',
												flex : 1,
												sortable : true,
												dataIndex : 'name'
											}, {
												header : '面积',
												flex : 1,
												sortable : true,
												dataIndex : 'value',
												renderer : function(value, record) {

													return (new Number(value)).toFixed(2);
												}
											} ],

											store : json_store
										} ]
									} ]
								} ]
							});
						}

						// 测试
						// var grid =
						// Ext.getCmp('staticResultGrid');
						/*
						 * var obj = Ext.decode(response.responseText); grid.getStore().loadData(obj);
						 */
						staticsWin.show();
						Ext.getCmp('infoAreaName').setValue(areaName);
						Ext.getCmp('infoAreaCode').setValue(areaCode);
						Ext.getCmp('infoXBNum').setValue("");
						Ext.getCmp('infoAreaTotal').setValue("");
						Ext.getCmp('infoContent').setValue("");

						json_store.removeAll();

						// 测试
						Ext.Ajax.request({
							url : SystemTool.basePath + '/areaInfo.jhtml?method=getAreaInfo',
							params : {
								areaCode : areaCode
							},
							success : function(response) {
								var obj = Ext.decode(response.responseText);
								if (obj == null || obj == undefined) {
								} else {
									/*
									 * var str = "区划名称："+obj.areaName+"</br>" +"区划编码："+obj.areaCode+"</br>" +"小班总数："+obj.xbNum+"</br>" +"小班总面积："+obj.areaTotal;
									 */
									// Ext.Msg.alert("查询结果",str);
									Ext.getCmp('infoXBNum').setValue(obj.xbNum);
									Ext.getCmp('infoAreaTotal').setValue(obj.areaTotal);
									Ext.getCmp('infoContent').setValue(obj.content);
								}
							}
						});
						// 加载图表数据
						json_store.load({
							params : {
								areaName : areaName
							}
						});
						json_store.filter([

						{
							filterFn : function(item) {
								return new Number(item.get("value")) > 0;
							}
						} ]);

					}
				});

			}
		}

		// areaShowCallBack = function(response){
		//
		// var g = new OpenLayers.Format.GML();
		// var features = g.read(response.responseText);
		// removedAllShape();
		// if(features.length>0){
		// var feature=features[0];
		// showXBInfo(feature);
		// var
		// components=feature.geometry.components[0].components;
		// for(var i=0;i<components.length;i++){
		// var points=components[i].getVertices();
		// var pointStr="";//33.5,125;
		// for(var j=0;j<points.length;j++){
		// if(pointStr==""){
		// pointStr=points[j].y+","+points[j].x;
		// }else{
		// pointStr=pointStr+"|"+points[j].y+","+points[j].x;
		// }
		// }
		// addSurfacePolygon(pointStr,"blue","lightGray",0.5,feature.attributes.c_xb+i);
		// }
		// }
		//  		
		//  			
		// }
		/**
		 * openlayers查询结果回调方法(返回features) 显示小班属性信息 三维上绘画小班区域
		 */
		xbFieldShowCallBack = function(response) {
			var g = new OpenLayers.Format.GML();
			var features = g.read(response.responseText);
			removedAllShape();
			if (features.length > 0) {
				var feature = features[0];
				showXBInfo(feature);
				var components = feature.geometry.components[0].components;
				for (var i = 0; i < components.length; i++) {
					var points = components[i].getVertices();
					var pointStr = "";// 33.5,125;
					for (var j = 0; j < points.length; j++) {
						if (pointStr == "") {
							pointStr = points[j].y + "," + points[j].x;
						} else {
							pointStr = pointStr + "|" + points[j].y + "," + points[j].x;
						}
					}
					addSurfacePolygon(pointStr, "blue", "lightGray", 0.5, feature.attributes.c_xb + i);
				}
			}
		}

		/**
		 * openlayers查询结果回调方法(返回features) 三维上绘画行政区域
		 */
		areaInfoShowCallBack = function(response) {
			var g = new OpenLayers.Format.GML();
			var features = g.read(response.responseText);
			removedAllShape();
			if (features.length > 0) {
				var feature = features[0];
				var components = feature.geometry.components[0].components;
				for (var i = 0; i < components.length; i++) {
					var points = components[i].getVertices();
					var pointStr = "";// 33.5,125;
					for (var j = 0; j < points.length; j++) {
						if (pointStr == "") {
							pointStr = points[j].y + "," + points[j].x;
						} else {
							pointStr = pointStr + "|" + points[j].y + "," + points[j].x;
						}
					}
					addSurfacePolygon(pointStr, "blue", "lightGray", 0.5, feature.attributes.c_xb + i);
				}
				var zoom = 0;
				var fid = feature.fid;
				if (fid.indexOf('sheng') >= 0)
					zoom = 1418000;
				else if (fid.indexOf('6532_') >= 0) {
					zoom = 374000;
				} else if (fid.indexOf('6529_') >= 0) {
					zoom = 41000;
				} else if (fid.indexOf('5709_') >= 0) {
					zoom = 170000;
				} else
					zoom = 14000;
				flyToLocation(feature.geometry.getCentroid().y, feature.geometry.getCentroid().x, 0, 0, 0, zoom);
				// flyTo(feature.geometry.getCentroid().y,feature.geometry.getCentroid().x);
				addMarker(feature.geometry.getCentroid().y, feature.geometry.getCentroid().x, "null");// /../../../../../com/sx
			}
		}

		logout = function() {
			var bln = confirm("您确认要退出森林资源管理系统?");
			if (bln == true) {
				window.location = "${ctx}/logout.jhtml";
			}
		}

		/**
		 * 判断当前用户是否具有当前应用模块的操作权限 modelId 当前应用模块代码
		 */
		// hasPermission=function (modelId){
		// var user=Ext.decode('${sessionScope.sessionUser}');
		// var flag = false;
		// if(user.role){
		// if(user.role.modules){
		// var modules = user.role.modules;
		// for(var i = 0; i < modules.length; i++) {
		// if(modelId == modules[i].scn){
		// flag = true;
		// break;
		// }else{
		// flag = false;
		// }
		// }
		// }
		// }
		// return flag;
		// }
		isShowLayer = function(obj) {
			if (obj.name != null && obj.name != "") {
				var layerArray = obj.name.split(","); // 字符分割
				for (var i = 0; i < layerArray.length; i++) {
					setWMSLayerIsEnabled(layerArray[i], obj.checked);
				}
			}
		}

		isShowModel = function(obj) {
			if (obj.name != null && obj.name != "") {
				var layerArray = obj.name.split(","); // 字符分割
				for (var i = 0; i < layerArray.length; i++) {
					setKmlIsEnabled(layerArray[i], obj.checked);
				}
			}
		}

		// 三维切换专题图图层
		switchShowLayer = function(name) {
			for (var i = 0; i < layers.length; i++) {
				var layer = layers[i];
				if (layer.layers != null && layer.wms != null) {
					if (layer.layers == name) {
						setWMSLayerIsEnabled(layer.layers, true);
					} else {
						setWMSLayerIsEnabled(layer.layers, false);
					}
				}
			}
		}

		// 删除场景功能的调用
		delSceneRecord = function(val) {
			if (val) {
				return '<span style="color:green;"><a href="javascript:deleteScene(' + val + ')">删  除</a></span>';
			} else {
				return val;
			}
		}
		deleteScene = function(id) {
			Ext.Ajax.request({
				url : SystemTool.basePath + '/scene.jhtml?method=delete',
				params : {
					'ids' : id
				},
				callback : function(options, success, response) {
					var responseJson = Ext.JSON.decode(response.responseText);
					Ext.Msg.alert('系统提示', responseJson.msg);
					Ext.getCmp('sceneGrid').getStore().reload();
					loadSceneMenu();
				}
			});
		}
		// 删除飞行路线功能的调用
		delFlyRouteRecord = function(val) {
			if (val) {
				return '<span style="color:green;"><a href="javascript:deleteFlyRoute(' + val + ')">删  除</a></span>';
			} else {
				return val;
			}
		}
		deleteFlyRoute = function(id) {
			Ext.Ajax.request({
				url : SystemTool.basePath + '/flyRoute.jhtml?method=delete',
				params : {
					'ids' : id
				},
				callback : function(options, success, response) {
					var responseJson = Ext.JSON.decode(response.responseText);
					Ext.Msg.alert('系统提示', responseJson.msg);
					Ext.getCmp('flyRouteGrid').getStore().reload();
					loadFlyRouteMenu();
				}
			});
		}

		showMenu = function(menuName, name) {
			Ext.getCmp('layerManage').setVisible(false);
			Ext.getCmp('onlineInfo').setVisible(false);
			Ext.getCmp('spatialAnalysis').setVisible(false);
			Ext.getCmp('infoQuery').setVisible(false);
			Ext.getCmp('themequery').setVisible(false);
			Ext.getCmp('staticsquery').setVisible(false);
			Ext.getCmp('systemManage').setVisible(false);
			Ext.getCmp('queryID').setVisible(false);

			Ext.getCmp('controlTab').setActiveTab(1);

			Ext.getCmp(menuName).setVisible(true);
			Ext.getCmp('controlHeader').setTitle(name);
			hideThemeLayer();
			switchShowLayer(null);
		}

		// 显示飞行线路控制窗口
		showFlyOptionWindow = function(obj) {
			var points = Ext.JSON.decode(obj.points);
			bugFixed = obj;
			var routePoints = "";// 116.20,40.22;116.21,40.566;
			var distance = 0;
			for (var i = 0; i < points.length - 1; i++) {
				var pt1 = points[i];
				var pt2 = points[i + 1];
				distance += Math.sqrt((pt2.longitude - pt1.longitude) * (pt2.longitude - pt1.longitude) + (pt2.latitude - pt1.latitude) * (pt2.latitude - pt1.latitude));
				routePoints += pt1.longitude + "," + pt1.latitude + ";";
				if (i == points.length - 1) {
					routePoints += pt2.longitude + "," + pt2.latitude + ";";
				}
			}
			if (distance > 1000) {
				distance = Math.round(distance / 1000);
			} else {
				distance = Math.round(distance) / 1000;
			}
			var speedData = [ [ 1000 ], [ 2000 ], [ 5000 ], [ 10000 ], [ 20000 ], [ 50000 ] ];
			var speedStore = new Ext.data.SimpleStore({
				fields : [ 'display' ],
				data : speedData
			});

			var zoomData = [ [ 100 ], [ 200 ], [ 500 ], [ 1000 ], [ 2000 ], [ 5000 ], [ 10000 ] ];
			var zoomStore = new Ext.data.SimpleStore({
				fields : [ 'display' ],
				data : zoomData
			});

			// var scaleData = [ [ 1000 ], [ 5000 ], [ 10000 ], [ 20000 ], [ 50000 ], [ 100000 ], [ 200000 ] ];
			var scaleData = [ [ '1:2000' ], [ '1:10000(推荐)' ], [ '1:20000' ], [ '1:40000' ], [ '1:100000' ]];
			var scaleStore = new Ext.data.SimpleStore({
				fields : [ 'display' ],
				data : scaleData
			});
			
			scaleStore = new Ext.data.ArrayStore({
		        fields: ['value','display'],
		        data: [['1000','1:2000'],['5000','1:10000(推荐)'],['10000','1:20000'],['20000','1:40000']]
		    });

			scaleStore = new Ext.data.ArrayStore({
				fields : [ 'value', 'display' ],
				data : [ [ '2000', '1:4000' ], [ '5000', '1:10000(推荐)' ], [ '10000', '1:20000' ], [ '20000', '1:40000' ] ]
			});
			
			scaleStore = new Ext.data.ArrayStore({
				fields : [ 'value', 'display' ],
				data : [ [ '2000', '4000' ], [ '5000', '10000' ], [ '10000', '20000' ], [ '20000', '40000' ] ]
			});
			
			var tiltData = [ [ 5 ], [ 10 ], [ 20 ], [ 30 ], [ 45 ], [ 60 ], [ 75 ], [ 90 ] ];
			var tiltStore = new Ext.data.SimpleStore({
				fields : [ 'display' ],
				data : tiltData
			});
			distance = obj.length;
			var seconds = distance / 50 * 3600;
			var minute = Math.floor(seconds / 60);
			var second = Math.round(seconds % 60);

			var htmls = '路线总长<span id="flyOption_routeLength" style="font-weight:bold;">' + (obj.length).toFixed(2) + '</span>千米,  ';
			htmls += '飞行时间<span id="flyOption_routeMinute" style="font-weight:bold;">' + minute + '</span>分';
			htmls += '<span id="flyOption_routeSecond" style="font-weight:bold;">' + second + '</span>秒';
			var flyOptionWindow = Ext.getCmp('flyOptionWindow');
			if (flyOptionWindow == undefined) {
				flyOptionWindow = new Ext.Window({
					id : 'flyOptionWindow',
					title : '飞行浏览',
					width : 500,
					height : 140,
					y : 115,
					collapsible : true,
					autoScroll : false,
					modal : false,
					closeAction : 'hide',
					resizable : false,
					plain : false,
					minButtonWidth : 30,
					items : [ new Ext.FormPanel({
						labelAlign : 'left',
						bodyStyle : 'padding:5px',
						autoWidth : true,
						border : false,
						labelWidth : 45,
						items : [ {
							border : false,
							html : htmls,
							style : 'margin-bottom:3px;'
						}, {
							layout : 'column',
							border : false,
							items : [ {
								columnWidth : .36,
								layout : 'form',
								border : false,
								items : [ new Ext.form.ComboBox({
									id : 'flyOption_speed',
									fieldLabel : '速度(千米/时)',
									queryMode : 'local',
									store : speedStore,
									displayField : 'display',
									valueField : 'display',
									mode : 'local',
									triggerAction : 'all',
									selectOnFocus : true,
									allowBlank : false,
									value : '50',
									labelWidth : 90,
									emptyText : '请选择',
									listeners : {
										'change' : function() {
											var seconds = distance / parseInt(this.getRawValue()) * 3600;
											var minute = Math.floor(seconds / 60);
											var second = Math.round(seconds % 60);
											$('flyOption_routeMinute').innerText = minute;
											$('flyOption_routeSecond').innerText = second;
										}
									}

								}) ]
							}, {
								columnWidth : .33,
								layout : 'form',
								border : false,
								items : [ new Ext.form.ComboBox({
									id : 'flyOption_zoom',
									fieldLabel : '比例尺         1:',
									store : scaleStore,
									displayField : 'display',
									valueField : 'value',
									mode : 'local',
									labelAlign : 'left',
									labelWidth : 55,
									triggerAction : 'all',
									selectOnFocus : true,
									value : '50000',
									emptyText : '请选择',
									listeners : {
										'select' : function() {

										}
									}
								}) ]
							}, {
								columnWidth : .30,
								layout : 'form',
								border : false,
								items : [ new Ext.form.ComboBox({
									id : 'flyOption_tilt',
									fieldLabel : '视角(度)',
									store : tiltStore,
									labelAlign : 'left',
									labelWidth : 60,
									displayField : 'display',
									valueField : 'display',
									mode : 'local',
									triggerAction : 'all',
									selectOnFocus : true,
									value : '60',
									emptyText : '请选择',
									listeners : {
										'select' : function() {

										}
									}
								}) ]
							} ]
						} ],
						buttons : [
								{
									id : 'flyOption_startFly',
									text : '开始',
									listeners : {
										click : function() {
											// var
											// speedPerSecond
											// =
											// parseFloat($('flyOption_speed').value)
											// *
											// 1000
											// /
											// 3600;
											// var
											// strScale
											// =
											// $('flyOption_zoom').value;
											// var
											// scaleStrings
											// =
											// strScale.split(':');
											// var
											// scale
											// = 0;
											// if(scaleStrings.length==2
											// &&
											// !isNaN(scaleStrings[1]))
											// {
											// scale
											// =
											// parseFloat(scaleStrings[1]);
											// }
											// else
											// if(!isNaN(strScale))
											// {
											// scale
											// =
											// parseFloat(strScale)
											// }
											// if(scale==0)
											// {
											// Ext.Msg.alert('系统提示','请选择合适的比例尺。');
											// return;
											// }
											// var
											// tilt
											// =
											// parseFloat($('flyOption_tilt').value);
											// var
											// doRecording
											// =false;
											// flyOptionWindow.items[0].buttons[0].disable();
											// flyOptionWindow.items[0].buttons[1].enable();
											// flyOptionWindow.items[0].buttons[2].enable();
											// console.log(bugFixed.points);
											
											var zoom = parseInt(Ext.getCmp('flyOption_zoom').getRawValue());
											
											startFly(bugFixed.points,zoom/2, Ext.getCmp('flyOption_tilt').getValue(), parseInt(Ext
													.getCmp('flyOption_speed').getValue()), bugFixed.length);
										}
									}
								}, {
									id : 'flyOption_pauseFly',
									text : '暂停',
									listeners : {
										click : function() {
											// flyOptionWindow.items.items[0].buttons[0].disable();
											// flyOptionWindow.items.items[0].buttons[1].enable();
											// flyOptionWindow.items.items[0].buttons[2].enable();
											if (this.getText() == '继续') {
												// flyOptionWindow.items.items[0].buttons[1].setText('暂停');
												this.setText('暂停');
												resumeFly();
											} else if (this.getText() == '暂停') {
												// flyOptionWindow.items.items[0].buttons[1].setText('继续');
												this.setText('继续');
												pauseFly();
											}
										}
									}
								}, {
									id : 'flyOption_endFly',
									text : '结束',
									listeners : {
										click : function() {
											// flyOptionWindow.items.items[0].buttons[0].enable();
											// flyOptionWindow.items.items[0].buttons[1].enable();
											// flyOptionWindow.items.items[0].buttons[2].enable();
											quitFly();
										}
									}
								} ]
					}) ]
				});
			}
			// setFly(obj.points,parseInt(Ext.getCmp('flyOption_zoom').getValue()),Ext.getCmp('flyOption_tilt').getValue());
			flyOptionWindow.show();
																	var seconds = distance / parseInt(Ext.getCmp('flyOption_speed').getValue()) * 3600;
											var minute = Math.floor(seconds / 60);
											var second = Math.round(seconds % 60);
											$('flyOption_routeMinute').innerText = minute;
											$('flyOption_routeSecond').innerText = second;
			// $('flyOption_routeMinute').innerText = minute;
			// $('flyOption_routeSecond').innerText = second;
			$('flyOption_routeLength').innerText = obj.length.toFixed(2);
			// PeKong.menu.flyroute.resetButtons();
		}
		noXB = function() {
			Ext.Msg.alert('信息', '没有满足条件的小班');
		}
		resetFunc = function() {
			IndexTool.stopAllTool();
			removeMouseClickListenerFunc();
			isClickXBShow = false;
		}

		// -------------------------------------------------------------
		this.control({
			"ViewportWidget" : {
				render : this.onViewportRender
			},

			"ViewportWidget panel[name='map2d']" : {
				render : this.onPanelRender
			},

			"ViewportWidget panel[name='map2d']" : {
				render : this.onPanelRender
			},

			"ViewportWidget panel[name='map2d1']" : {
				render : this.onPanelRender1
			},
			"ViewportWidget panel[name='locate3d']" : {
				render : this.onPanelRender2
			}

		//            
		// "ViewportWidget button[name='locate3d']":{
		// click:this.onButtonZoomIn2dClick
		// },
		//
		// // 2d放大
		// "ViewportWidget button[name='zoomIn2d']":{
		// click:this.onButtonZoomIn2dClick
		// },
		// // 2d缩小
		// "ViewportWidget button[name='zoomOut2d']":{
		// click:this.onButtonZoomOut2dClick
		// },
		// // 2d平移
		// "ViewportWidget button[name='zoomPan2d']":{
		// click:this.onButtonZoomPan2dClick
		// },
		// // 2d复位
		// "ViewportWidget button[name='zoomFullExtent2d']":{
		// click:this.onButtonZoomFullExtent2dClick
		// },
		// // 2d点击查询
		// "ViewportWidget button[name='zoomIn2d']":{
		// click:this.onButtonZoomIdentify2dClick
		// }
		})
	}
});
