﻿﻿﻿var map;
var map1;
var isFirst;
var isFirst1;
var xbmAnno;
var xbmAnno1;
var isDoubleScreen=false;
var point1;
var resourceHolder={};
var mapType=3;
MAP = {
	resultLen : [],
	// 注记图层markers
	measureVectorLayer : null
};
var measureCompleteFlag = 0;
var style_measurePolyLine = {
	strokeColor : "#0000FF",
	strokeWidth : 4,
	strokeOpacity : 0.5,
	strokeDashstyle : "solid"
};
// var wms_url = "http://106.3.37.57:8080/geoserver/xiabandi/wms";
var wms_url;
var wfs_url;
var wms_layer = "J2210000JB2012XBM";
var marker_layer = null;
var Markers;
var xb_layer;
var xb_layer1;
// var MAP;
// var MAP_layer=null;
var xbm;
var xbm1;
var cnm = new Ext.util.HashMap();

var lon = 105.9960, lat = 36.8701, zoom = 4;
// var vectors = null;
var styleMap = new OpenLayers.StyleMap({
	"default" : new OpenLayers.Style({
		strokeOpacity : 1,
		strokeWidth : 1,
		strokeColor : "white",
		fillOpacity : 0
	}),
	"color" : {
		fillOpacity : 0.5
	},
	"highlight" : new OpenLayers.Style({
		strokeColor : "yellow",
		strokeOpacity : 1,
		strokeWidth : 2
	}),
	"highlight2" : {
		fillOpacity : 1,
		strokeColor : "yellow",
		strokeOpacity : 1,
		strokeWidth : 2
	}
});
var styleMapTemp = "default";
var untiled;
var untiled1;
var untiled2;
var bounds;
var format;

// 加载地图

function init2DMap() {
	isFirst = true;
	OpenLayers.Util.onImageLoadErrorColor = 'transparent';
	OpenLayers.Util.onImageLoadError=function(){
		this.src=SystemTool.basePath+"/js/openLayers/img/blank.gif";
	}
	
	wms_url = config.xbmLayer.url;
	wfs_url = config.xbmLayer.wfs_url;
	xb_layer = config.xbmLayer.layerServerName;
	xb_layer1 = config.xbmLayer1.layerServerName;
	xb_layer2 = config.xbmLayer2.layerServerName;
	
	format = 'image/png';
	// OpenLayers.DOTS_PER_INCH = 90.71428571428572;
	OpenLayers.DOTS_PER_INCH = 96;
	//console.log(mapMaxExtent);
	bounds = mapMaxExtent;//new OpenLayers.Bounds(73.62, 18.11, 134.77, 53.56);
// console.log(Ext.query('#scale11')[0]);
	var options = {
		controls : [ new OpenLayers.Control.Navigation(),// 用来控制地图与鼠标事件的互动，如拖曳，缩放，滚动，双击
		new OpenLayers.Control.Attribution(),// 允许通过layer向map添加属性
		new OpenLayers.Control.OverviewMap({
// div:Ext.query('#oview')[0]
		}),
				new OpenLayers.Control.PanZoomBar({
					div:Ext.query('#zbar')[0]
				}),
// new OpenLayers.Control.ZoomBox({
// title : "放大"
// }), new OpenLayers.Control.ZoomBox({
// out : true,
// title : "缩小"
// }),
				new OpenLayers.Control.LayerSwitcher({
// div:Ext.query('#switcher')[0],
// maximized:false
				}),
				new OpenLayers.Control.Scale(

					Ext.query('#scale11')[0],{
						template:"比例尺"
					}
				),
				new OpenLayers.Control.MousePosition({
					div:Ext.query('#mpst')[0]
				})
				],

		// resolutions:[0.1384765625,0.06923828125,0.034619140625,0.0173095703125,0.00865478515625,0.004327392578125,0.0021636962890625,0.0010818481445313,0.0005409240722656,0.0002704620361328,0.0001352310180664,0.0000676155090332,0.0000338077545166,0.0000169038772583,0.0000084519386291,0.0000042259693146,0.0000021129846573,//0.0000010564923286,0.0000005282461643
		             // ],
		resolutions:[0.13099901978223877,0.065499509891119384,0.032749754945559692,0.016374877472779846,0.008187438736389923,0.0040937193681949615,0.0020468596840974808,0.0010234298420487876,0.00051171492102434644,0.00025585746051217322,0.00012792873025608661,6.3964365128043305e-005,3.1982182564021653e-005,1.5991091282010826e-005,7.9955456410527132e-006,3.9977728205263566e-006//,// 1.9988864102631783e-006//,//0.0000010564923286,0.0000005282461643
		             ],
		maxExtent:bounds,// new OpenLayers.Bounds(73.62, 18.11, 134.77,
							// 53.56),
		projection : "EPSG:4610",
		units : 'degrees'
	};
	map = new OpenLayers.Map('2dMap', options);// 新建地图
	
	// untiled = new OpenLayers.Layer.WMS(config.baseMap1.name,
	// config.baseMap1.url, {
		// LAYERS : config.baseMap1.layers,
		// format : 'image/png'
	// }, {
		// tileSize: new OpenLayers.Size(256,256),
        // displayOutsideMaxExtent: true,
        // isBaseLayer: true
	// });
	
	var matrixIds = new Array(16);
	for(var i=0;i<17;i++){
		matrixIds[i]=i.toString();
	}
	
	// var untiled = new OpenLayers.Layer.WMTS({
		 // layer:'SLZY',
		 // requestEncoding:'REST',
		 // name:'行政',
		 // style:'default',
		 // url:'http://10.100.11.23:6080/arcgis/rest/services/SLZY/MapServer/WMTS/tile',
		 // matrixSet:'default028mm',
		 // matrixIds:matrixIds,
		 // tileOrigin: new OpenLayers.LonLat(-400 , 400),
		 // format:'image/png',
		 // opacity:0.7,
		 // isBaseLayer:true,
		 // numZoomLevels:17
	 // });
	 
	// var untiled1 = new OpenLayers.Layer.WMTS({
		// layer:'LNService_local',
		// requestEncoding:'REST',
		// name:'影像',
		// style:'default',
		// url:'http://10.100.11.23:6080/arcgis/rest/services/LNService_local/MapServer/WMTS/tile',
		// matrixSet:'default028mm',
		// matrixIds:matrixIds,
		// tileOrigin: new OpenLayers.LonLat(-400 , 400),
		// format:'image/png',
		// opacity:0.7,
		// isBaseLayer:false,
		// numZoomLevels:17
	 // });
	 
	// console.log(config.baseMap);
	// untiled2 = new OpenLayers.Layer.WMTS({
		 // layer:config.xbmLayer.layerName,
		 // requestEncoding:'REST',
		 // name:config.baseMap2.name,
		 // style:'default',
		 // url:config.baseMap1.url,//'http://localhost:6080/arcgis/rest/services/MyMapService/MapServer/WMTS/tile',
		 // matrixSet:'default028mm',
		 // matrixIds:matrixIds,
		 // tileOrigin: new OpenLayers.LonLat(-400 , 400),
		 // format:'image/png',
		 // opacity:0.7,
		 // isBaseLayer:true,
		 // numZoomLevels:17
	 // });
	
	// 加载地图数据
	for(var obj in config.baseMap){
		var tileLayer;
		// wmts服务
		if(config.baseMap[obj].type=="wmts"){
			tileLayer = new OpenLayers.Layer.WMTS({
				layer:config.baseMap[obj].layerName,
				requestEncoding:'REST',
				name:config.baseMap[obj].name,
				style:'default',
				url:config.baseMap[obj].url,// 'http://localhost:6080/arcgis/rest/services/MyMapService/MapServer/WMTS/tile',
				matrixSet:'default028mm',
				matrixIds:matrixIds,
				tileOrigin: new OpenLayers.LonLat(-400 , 400),  
				format:'image/png',
				isBaseLayer:true,
				numZoomLevels:17
			});
		}
		// wms服务
		else if(config.baseMap[obj].type=="wms"){
			tileLayer = new OpenLayers.Layer.WMS(config.baseMap[obj].name, config.baseMap[obj].url, {
				layers : config.baseMap[obj].layerName,
				transparent : "true"
			}, {
				tileSize: new OpenLayers.Size(256,256),
				displayOutsideMaxExtent: true,
				isBaseLayer: true
			});
		}
		
		if(tileLayer == null)continue;
		map.addLayers([tileLayer]);
	}
	 map.getLayersByName("影像")[0].events.register('visibilitychanged', null, function(){
			var xbm = map.getLayersByName("小班面")[0];
			var isVisible = xbm.getVisibility();
			xbm.setVisibility(!isVisible);
			var scaleBar = Ext.get(Ext.query('#scale11')[0]);
			var pstBar = Ext.get(Ext.query('#mpst')[0]);
			scaleBar.setStyle('color', scaleBar.getStyle('color')=='rgb(255, 255, 0)'||scaleBar.getStyle('color')=='yellow'?'black':'yellow');
			pstBar.setStyle('color', pstBar.getStyle('color')=='rgb(255, 255, 0)'||pstBar.getStyle('color')=='yellow'?'black':'yellow');
			map.getLayersByName("小班面影像")[0].setVisibility(isVisible);
		});
	
	// 加载小班数据
	if(config.xbmLayer.type=='wms'){
		xbm = new OpenLayers.Layer.WMS(config.xbmLayer.name, config.xbmLayer.url, {
			layers : config.xbmLayer.layerName,
			transparent : "true"
		}, {
		tileSize: new OpenLayers.Size(256,256),
			displayOutsideMaxExtent: true,
			isBaseLayer: false
		});
	}
	else if(config.xbmLayer.type=='wmts'){
		xbm = new OpenLayers.Layer.WMTS({
			layer:config.xbmLayer.layerName,
			requestEncoding:'REST',
			name:config.xbmLayer.name,
			style:'default',
			url:config.xbmLayer.url,// 'http://localhost:6080/arcgis/rest/services/MyMapService/MapServer/WMTS/tile',
			matrixSet:'default028mm',
			matrixIds:matrixIds,
			tileOrigin: new OpenLayers.LonLat(-400 , 400),  
			format:'image/png',
			isBaseLayer:false,
			numZoomLevels:17,
			visibility:false
		});
	}
	
	if(xbm!=null){
		map.addLayers([xbm]);
	}
	
	if(config.xbmLayer2.type=='wms'){
		xbm2 = new OpenLayers.Layer.WMS(config.xbmLayer2.name, config.xbmLayer2.url, {
			layers : config.xbmLayer2.layerName,
			transparent : "true"
		}, {
		tileSize: new OpenLayers.Size(256,256),
			displayOutsideMaxExtent: true,
			isBaseLayer: false
		});
	}
	else if(config.xbmLayer2.type=='wmts'){
		xbm2 = new OpenLayers.Layer.WMTS({
			layer:config.xbmLayer2.layerName,
			requestEncoding:'REST',
			name:config.xbmLayer2.name,
			style:'default',
			url:config.xbmLayer2.url,// 'http://localhost:6080/arcgis/rest/services/MyMapService/MapServer/WMTS/tile',
			matrixSet:'default028mm',
			matrixIds:matrixIds,
			tileOrigin: new OpenLayers.LonLat(-400 , 400),  
			format:'image/png',
			isBaseLayer:false,
			numZoomLevels:17
		});
	}
	
	if(xbm2!=null){
		map.addLayers([xbm2]);
	}
	
	if(config.xzj.type=='wms'){
		xzj = new OpenLayers.Layer.WMS(config.xzj.name, config.xzj.url, {
			layers : config.xzj.layerName,
			transparent : "true"
		}, {
		tileSize: new OpenLayers.Size(256,256),
			displayOutsideMaxExtent: true,
			isBaseLayer: false
		});
	}
	else if(config.xzj.type=='wmts'){
		xzj = new OpenLayers.Layer.WMTS({
			layer:config.xzj.layerName,
			requestEncoding:'REST',
			name:config.xzj.name,
			style:'default',
			url:config.xzj.url,// 'http://localhost:6080/arcgis/rest/services/MyMapService/MapServer/WMTS/tile',
			matrixSet:'default028mm',
			matrixIds:matrixIds,
			tileOrigin: new OpenLayers.LonLat(-400 , 400),  
			format:'image/png',
			isBaseLayer:false,
			numZoomLevels:17
		});
	}
	
	if(xzj!=null){
		map.addLayers([xzj]);
	}
	
	
	
	
	
	// anno
//	if(config.xbmAnno.type=='wms'){
//	xbm4 = new OpenLayers.Layer.WMS(config.xbmAnno.name, config.xbmAnno.url, {
//		layers : config.xbmAnno.layerName,
//		transparent : "true"
//	}, {
//	tileSize: new OpenLayers.Size(256,256),
//		displayOutsideMaxExtent: true,
//		isBaseLayer: false
//	});
//}
//else if(config.xbmAnno.type=='wmts'){
//	xbm4 = new OpenLayers.Layer.WMTS({
//		layer:config.xbmAnno.layerName,
//		requestEncoding:'REST',
//		name:config.xbmAnno.name,
//		style:'default',
//		url:config.xbmAnno.url,// 'http://localhost:6080/arcgis/rest/services/MyMapService/MapServer/WMTS/tile',
//		matrixSet:'default028mm',
//		matrixIds:matrixIds,
//		tileOrigin: new OpenLayers.LonLat(-400 , 400),  
//		format:'image/png',
//		isBaseLayer:false,
//		numZoomLevels:17
//	});
//}
//
//if(xbm4!=null){
//	map.addLayers([xbm4]);
//}
	
//	xbm1 = new OpenLayers.Layer.WMTS({
//		 layer:config.xbmLayer.layerName,
//		 requestEncoding:'REST',
//		 name:config.xbmLayer.name,
//		 style:'default',
//		 url:config.xbmLayer.url,// 'http://localhost:6080/arcgis/rest/services/MyMapService/MapServer/WMTS/tile',
//		 matrixSet:'default028mm',
//		 matrixIds:matrixIds,
//		 tileOrigin: new OpenLayers.LonLat(-400 , 400),  
//		 format:'image/png',
//		 opacity:0.7,
//		 isBaseLayer:true,
//		 numZoomLevels:16
//	 });
	// map.addLayers([untiled,untiled1,untiled2,xbm]);
	// map.addLayers([untiled1,untiled]);
	
	// 定位
	map.setCenter(new OpenLayers.LonLat(config.mapCenter.x, config.mapCenter.y), config.mapCenter.level);
	
	map.zoomToMaxExtent();
	
	// 绘制点控件
	var pointcontrol = new OpenLayers.Control();
	OpenLayers.Util.extend(pointcontrol, {
		draw : function() {
			mousePoint = new OpenLayers.Handler.Point(pointcontrol, {
				"done" : this.notice
			});
		},
		notice : selectByPointNotice
	});

	marker_layer = new OpenLayers.Layer.Markers("标注点");

	map.addControl(pointcontrol);

	// 添加新的临时图层
	queryResultLayer = new OpenLayers.Layer.Vector("查询结果", {
		styleMap : new OpenLayers.StyleMap({
			'default' : {
				strokeColor : "#00FF00",
				strokeOpacity : 1,
				strokeWidth : 3,
				fillColor : "#FF5500",
				fillOpacity : 0.5,
				pointRadius : 6,
				pointerEvents : "visiblePainted"
			}
		})
	});
	
	pointLayer = new OpenLayers.Layer.Markers( "Markers" );

	map.addLayers([ queryResultLayer ]);
	map.addLayers([ pointLayer ]);
	
	// 添加新的临时图层
// queryResultLayer1 = new OpenLayers.Layer.Vector("查询结果", {
// styleMap : new OpenLayers.StyleMap({
// 'default' : {
// strokeColor : "#00FF00",
// strokeOpacity : 1,
// strokeWidth : 3,
// fillColor : "#FF5500",
// fillOpacity : 0.5,
// pointRadius : 6,
// pointerEvents : "visiblePainted"
// }
// })
// });
// map1.addLayers([ queryResultLayer1 ]);

	// 添加框选绘制控件
	var boxcontrol = new OpenLayers.Control();
	boxcontrol.id="rectange";
	OpenLayers.Util.extend(boxcontrol, {
		draw : function() {
			mouseRectangle = new OpenLayers.Handler.Box(boxcontrol, {
				"done" : this.notice
			});
		},
		notice : selectByRectangleNotice
	});
	map.addControl(boxcontrol);

	var sketchSymbolizers = {
		"Point" : {
			pointRadius : 4,
			graphicName : "square",
			fillColor : "white",
			fillOpacity : 1,
			strokeWidth : 1,
			strokeOpacity : 1,
			strokeColor : "#333333"
		},
		"Line" : {
			strokeWidth : 3,
			strokeOpacity : 1,
			strokeColor : "#666666",
			strokeDashstyle : "dash"
		},
		"Polygon" : {
			strokeWidth : 2,
			strokeOpacity : 1,
			strokeColor : "#666666",
			fillColor : "white",
			fillOpacity : 0.3
		}
	};
	var style = new OpenLayers.Style();
	style.addRules([ new OpenLayers.Rule({
		symbolizer : sketchSymbolizers
	}) ]);
	var styleMapmeasure = new OpenLayers.StyleMap({
		"default" : style
	});
	var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
	renderer = (renderer) ? [ renderer ]
			: OpenLayers.Layer.Vector.prototype.renderers;

	measureControls = {
		line : new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
			persist : true,
			handlerOptions : {
				layerOptions : {
					styleMap : styleMapmeasure,
					renderers : renderer
				}
			},
			measureComplete : measureCompleteCallback,
			measure : measureCallback
		}),
		polygon : new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, {
			persist : true,
			handlerOptions : {
				layerOptions : {
					styleMap : styleMapmeasure,
					renderers : renderer
				}
			},
			measureComplete : measureCompleteCallback,
			measure : measureCallback
		}),
		selectByPolygon:new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, {
			persist : false,
			handlerOptions : {
				layerOptions : {
					styleMap : styleMapmeasure,
					renderers : renderer
				}
			},
			measureComplete : queryXBByPolygonComplete
			/*
			 * measure : function(){
			 *  }
			 */
		})
	// ,
	// selectByPnt:selectControl
	};
	var control;
	for ( var key in measureControls) {
		control = measureControls[key];
		// control.events.on({
		// "measure": handleMeasurements,
		// "measurepartial": handleMeasurements
		// });
		map.addControl(control);
	}

	/** *************************END************点，线、面积测量**************************************** */

	// 添加点标注的图层
	// markers = new OpenLayers.Layer.Markers("markers");
	// map.addLayer(markers);
	// markers.setZIndex(200);
	// 添加量测图层measureVectorLayer 2013.07.24
	var measureLabelrenderer;
	measureLabelrenderer = OpenLayers.Util.getParameters(window.location.href).measureLabelrenderer;
	measureLabelrenderer = (measureLabelrenderer) ? [ measureLabelrenderer ]
			: OpenLayers.Layer.Vector.prototype.renderers;
	MAP.measureVectorLayer = new OpenLayers.Layer.Vector("测量", {
		styleMap : new OpenLayers.StyleMap({
			'default' : {
				strokeColor : "#00FF00",
				strokeOpacity : 1,
				strokeWidth : 3,
				fillColor : "#FF5500",
				fillOpacity : 0.5,
				pointRadius : 6,
				pointerEvents : "visiblePainted",
				// label with \n linebreaks
				label : "${dis}",
				fontColor : "${favColor}",
				fontSize : "12px",
				fontFamily : "Courier New, monospace",
				fontWeight : "bold",
				labelAlign : "${align}",
				labelXOffset : "${xOffset}",
				labelYOffset : "${yOffset}",
				labelOutlineColor : "white",
				labelOutlineWidth : 3
			}
		}),
		renderers : measureLabelrenderer
	});

	map.addLayers([ MAP.measureVectorLayer ]);

	map.events.register("click", map, onMapClick);
	
	map.events.register("move",map,onMoveChange);
}

// 加载双屏地图
function init2DMap1(){
	// OpenLayers.DOTS_PER_INCH = 90.71428571428572;
	// bounds = new OpenLayers.Bounds(73.62, 18.11, 134.77, 53.56);
	bounds = mapMaxExtent;//new OpenLayers.Bounds(73.62, 18.11, 134.77, 53.56);
	var options1 = {
		controls : [ new OpenLayers.Control.Navigation(),// 用来控制地图与鼠标事件的互动，如拖曳，缩放，滚动，双击
		new OpenLayers.Control.Attribution(),// 允许通过layer向map添加属性
// new OpenLayers.Control.ZoomBox({
// title : "放大"
// }), new OpenLayers.Control.ZoomBox({
// out : true,
// title : "缩小"
// }),
				new OpenLayers.Control.LayerSwitcher()
],
				// resolutions:[0.1384765625,0.06923828125,0.034619140625,0.0173095703125,0.00865478515625,0.004327392578125,0.0021636962890625,0.0010818481445313,0.0005409240722656,0.0002704620361328,0.0001352310180664,0.0000676155090332,0.0000338077545166//,0.0000169038772583,0.0000084519386291,0.0000042259693146,0.0000021129846573,0.0000010564923286,0.0000005282461643
				             // ],
				resolutions:[0.13099901978223877,0.065499509891119384,0.032749754945559692,0.016374877472779846,0.008187438736389923,0.0040937193681949615,0.0020468596840974808,0.0010234298420487876,0.00051171492102434644,0.00025585746051217322,0.00012792873025608661,6.3964365128043305e-005,3.1982182564021653e-005,1.5991091282010826e-005,7.9955456410527132e-006,3.9977728205263566e-006// ,1.9988864102631783e-006//,//0.0000010564923286,0.0000005282461643
		             ],
				// maxExtent:new OpenLayers.Bounds(73.62, 18.11, 134.77, 53.56),
		maxExtent:bounds,
		projection : "EPSG:4610",
		units : 'degrees'
	};
    map1 = new OpenLayers.Map('2dMap1', options1);// 新建地图
	// // 底图
	// var untiledtemp = new OpenLayers.Layer.WMS(config.baseMap1.name,
	// config.default_url, {
		// LAYERS : config.baseMap1.layers,
		// format : 'image/png'
	// }, {
		// tileSize: new OpenLayers.Size(256,256),
        // displayOutsideMaxExtent: true,
        // isBaseLayer: true
	// });
	
		var matrixIds = new Array(16);
	for(var i=0;i<17;i++){
		matrixIds[i]=i.toString();
	}
	// 加载地图数据
	for(var obj in config.baseMap){
		var tileLayer;
		// wmts服务
		if(config.baseMap[obj].type=="wmts"){
			tileLayer = new OpenLayers.Layer.WMTS({
				layer:config.baseMap[obj].layerName,
				requestEncoding:'REST',
				name:config.baseMap[obj].name,
				style:'default',
				url:config.baseMap[obj].url,// 'http://localhost:6080/arcgis/rest/services/MyMapService/MapServer/WMTS/tile',
				matrixSet:'default028mm',
				matrixIds:matrixIds,
				tileOrigin: new OpenLayers.LonLat(-400 , 400),  
				format:'image/png',
				isBaseLayer:true,
				numZoomLevels:17
			});
		}
		// wms服务
		else if(config.baseMap[obj].type=="wms"){
			tileLayer = new OpenLayers.Layer.WMS(config.baseMap[obj].name, config.baseMap[obj].url, {
				layers : config.baseMap[obj].layerName,
				transparent : "true"
			}, {
				tileSize: new OpenLayers.Size(256,256),
				displayOutsideMaxExtent: true,
				isBaseLayer: true
			});
		}
		
		if(tileLayer == null)continue;
		map1.addLayers([tileLayer]);
	}
	
	queryResultLayer1 = new OpenLayers.Layer.Vector("查询结果", {
		styleMap : new OpenLayers.StyleMap({
			'default' : {
				strokeColor : "#00FF00",
				strokeOpacity : 1,
				strokeWidth : 3,
				fillColor : "#FF5500",
				fillOpacity : 0.5,
				pointRadius : 6,
				pointerEvents : "visiblePainted"
			}
		})
	});
	map1.addLayers([queryResultLayer1]);
	
	// 加载行政界WMS-为了叠加影像时显示
	if(config.xzj.type=='wms'){
		xzj = new OpenLayers.Layer.WMS(config.xzj.name, config.xzj.url, {
			layers : config.xzj.layerName,
			transparent : "true"
		}, {
		tileSize: new OpenLayers.Size(256,256),
			displayOutsideMaxExtent: true,
			isBaseLayer: false
		});
	}
	else if(config.xzj.type=='wmts'){
		xzj = new OpenLayers.Layer.WMTS({
			layer:config.xzj.layerName,
			requestEncoding:'REST',
			name:config.xzj.name,
			style:'default',
			url:config.xzj.url,// 'http://localhost:6080/arcgis/rest/services/MyMapService/MapServer/WMTS/tile',
			matrixSet:'default028mm',
			matrixIds:matrixIds,
			tileOrigin: new OpenLayers.LonLat(-400 , 400),  
			format:'image/png',
			isBaseLayer:false,
			numZoomLevels:17
		});
	}
	
	if(xzj!=null){
		map1.addLayers([xzj]);
	}
	
	
	// 加载小班数据
	if(config.xbmLayer1.type=='wms'){
		xbm1 = new OpenLayers.Layer.WMS(config.xbmLayer1.name, config.xbmLayer1.url, {
			layers : config.xbmLayer1.layerName,
			transparent : "true"
		}, {
		tileSize: new OpenLayers.Size(256,256),
			displayOutsideMaxExtent: true,
			isBaseLayer: false
		});
	}
	else if(config.xbmLayer.type=='wmts'){
		xbm1 = new OpenLayers.Layer.WMTS({
			layer:config.xbmLayer1.layerName,
			requestEncoding:'REST',
			name:config.xbmLayer1.name,
			style:'default',
			url:config.xbmLayer1.url,// 'http://localhost:6080/arcgis/rest/services/MyMapService/MapServer/WMTS/tile',
			matrixSet:'default028mm',
			matrixIds:matrixIds,
			tileOrigin: new OpenLayers.LonLat(-400 , 400),  
			format:'image/png',
			isBaseLayer:false,
			numZoomLevels:17
		});
	}
	
	if(xbm1!=null){
		map1.addLayers([xbm1]);
	}
	
	// anno1
	if(config.xbmAnno1.type=='wms'){
	xbm3 = new OpenLayers.Layer.WMS(config.xbmAnno1.name, config.xbmAnno1.url, {
		layers : config.xbmAnno1.layerName,
		transparent : "true"
	}, {
	tileSize: new OpenLayers.Size(256,256),
		displayOutsideMaxExtent: true,
		isBaseLayer: false
	});
}
else if(config.xbmAnno1.type=='wmts'){
	xbm3 = new OpenLayers.Layer.WMTS({
		layer:config.xbmAnno1.layerName,
		requestEncoding:'REST',
		name:config.xbmAnno1.name,
		style:'default',
		url:config.xbmAnno1.url,// 'http://localhost:6080/arcgis/rest/services/MyMapService/MapServer/WMTS/tile',
		matrixSet:'default028mm',
		matrixIds:matrixIds,
		tileOrigin: new OpenLayers.LonLat(-400 , 400),  
		format:'image/png',
		isBaseLayer:false,
		numZoomLevels:17
	});
}

if(xbm3!=null){
	map1.addLayers([xbm3]);
}
	// 业务图层-小班面图层
	// xbm1 = new OpenLayers.Layer.WMS(config.xbmLayer1.name,
	// config.default_url, {
		// layers : config.xbmLayer1.layers,
		// transparent : "true"
	// }, {
		// tileSize: new OpenLayers.Size(256,256),
        // displayOutsideMaxExtent: true,
        // isBaseLayer: false
	// });
	// map1.addLayers([untiledtemp,xbm1]);
	
	// 添加新的临时图层
	queryResultLayer1 = new OpenLayers.Layer.Vector("查询结果", {
		styleMap : new OpenLayers.StyleMap({
			'default' : {
				strokeColor : "#00FF00",
				strokeOpacity : 1,
				strokeWidth : 3,
				fillColor : "#FF5500",
				fillOpacity : 0.5,
				pointRadius : 6,
				pointerEvents : "visiblePainted"
			}
		})
	});
	map1.addLayers([queryResultLayer1]);
	// 定位
	// map1.setCenter(new OpenLayers.LonLat(config.mapCenter.x,
	// config.mapCenter.y), config.mapCenter.level);
}

// 框选查询变量
// 控制鼠标时间对象
var mouseRectangle;
var mousePoint;

var pointLayer;

// 高亮显示 临时图层
var queryResultLayer;
// 高亮显示 临时图层
var queryResultLayer1;

// 专题图显示 临时图层
var thematicmapLayer;

var measureControls;

// Feature 选中事件响应
// function onFeatureSelect(feature)
// {

// selectedFeature = feature;
// popup = new OpenLayers.Popup.FramedCloud("chicken",
// feature.geometry.getBounds().getCenterLonLat(),
// null,
// "<div style='font-size:.8em'>地区: " + feature.attributes.name +"<br />面积: " +
// feature.geometry.getArea()+"</div>",
// null, true, onPopupClose);
// feature.popup = popup;
// map.addPopup(popup);
// // marker = new
// OpenLayers.Marker(feature.geometry.getBounds().getCenterLonLat());
// // marker.setOpacity(255);
// // marker.events.register('mousedown', marker, onMakerMouseDown);
// // marker_layer.addMarker(marker);// 添加当前位置标记
// //addMarkers(feature.geometry.getBounds().getCenterLonLat());
// }

function onPopupClose(evt) {
	selectControl.unselect(selectedFeature);
}
// Feature取消选中事件响应
function onFeatureUnselect(feature) {
	map.removePopup(feature.popup);
	feature.popup.destroy();
	feature.popup = null;
	// var markers=marker_layer.markers;

	// for(var i=0;i<markers.length;i++)
	// marker_layer.removeMarker(markers[0]);
	// if (marker != null) {
	// marker_layer.removeMarker(marker);// 清除上次查询时的标记
	// }
}

// 图例渲染 这个暂时无效
function initMarker() {
	var pm2d5 = new OpenLayers.Layer.Text('WFS', {
		location : 'resource/pm2.5.txt'
	});
	var mvi = new OpenLayers.Layer.Text('标注点', {
		location : 'resource/mvi.txt'
	});
	var aim = new OpenLayers.Layer.Text('量测', {
		location : 'resource/aim.txt'
	});
	map.addLayers([ pm2d5, mvi, aim ]);
}
// 导出 由于涉及html5暂时无法去做
function Export() {

}

// 打印
function printMap() {
	var code = "<body onload=window.print()>";
	code += document.getElementById("center1").innerHTML;// 获取center1 div
	width = map.viewPortDiv.clientWidth;// 获取地图宽度
	height = map.viewPortDiv.clientHeight;
	var newwin = window.open('', '我的地图', 'width=' + width + ',height=' + height
			+ ',resizable=no');
	newwin.opener = null;
	newwin.document.write(code);
	newwin.document.close();
}
// 清除拉框效果
function closezoom() {
	if (this.zoomBox != null) {
		this.zoomBox.deactivate();
	}
}
// 判断是拉框放大还是拉框缩小
function deactivateContrl2D() {
	this.map.clickFun = null;
	if (this.zoomBox != null) {
		this.zoomBox.deactivate();
	}
}
// 拉框放大
function mouseMoveZoomIn2D() {
	this.deactivateContrl2D();
	this.zoomTo("in");

}
// 拉框缩小
function mouseMoveZoomOut2D() {
	this.deactivateContrl2D();
	this.zoomTo("out");
}
// 拉框效果
function zoomTo(zoom) {
	if (!this.zoomBox) {

		var movecontrol = new OpenLayers.Control();
		movecontrol.parent = this;
		OpenLayers.Util.extend(movecontrol, {
			draw : function() {
// console.log('draw');
				this.zoomBox = new OpenLayers.Handler.Box(movecontrol, {
					"done" : this.notice
				}, {
					keyMask : OpenLayers.Handler.MOD_NONE
				});
				this.zoomBox.activate();
				this.zoomBox.zoom = zoom;
				this.parent.zoomBox = this.zoomBox;

			},
			notice : function(bounds) {
				var ll = this.map.getLonLatFromPixel(new OpenLayers.Pixel(
						bounds.left, bounds.bottom));
				var ur = this.map.getLonLatFromPixel(new OpenLayers.Pixel(
						bounds.right, bounds.top));

				var lon = ll.lon + (ur.lon - ll.lon) / 2;
				var lat = ll.lat + (ur.lat - ll.lat) / 2;
				var zoomInNum = this.map.getZoom() - 2;
				if (zoomInNum < 0) {
					zoomInNum = 0;
				}

				if (this.zoomBox.zoom == "in" && bounds.left != undefined) {
					this.parent.map.setCenter(new OpenLayers.LonLat(lon, lat));
					var bounds = new OpenLayers.Bounds(ll.lon, ll.lat, ur.lon,
							ur.lat);
					this.parent.map.zoomToExtent(bounds);
				}
				if (this.zoomBox.zoom == "out") {
					// this.parent.zoomOut();//调用缩小函数
					map.zoomOut();
					this.parent.map.setCenter(new OpenLayers.LonLat(lon, lat));
				}
			}
		});

		this.map.addControl(movecontrol);
	} else {
		this.zoomBox.zoom = zoom;
		this.zoomBox.activate();
	}
}
// 框选
function selectByRect(){
	
	
}
// 模糊查询
function query(text) {
	// 过滤条件
	var filter = new OpenLayers.Filter.Comparison({
		type : OpenLayers.Filter.Comparison.LIKE,
		property : "china_new:name",
		value : "*" + text + "*"
	});
	var filter = new OpenLayers.Filter.Logical({
		type : OpenLayers.Filter.Logical.AND,
		filters : [ new OpenLayers.Filter.Comparison({// 比较操作符
			type : OpenLayers.Filter.Comparison.LIKE,
			property : "china_new:name",
			value : "*" + text + "*"
		}) ]
	});
	// 构造请求数据
	var filter_1_0 = new OpenLayers.Format.Filter.v1_0_0();
	var xml = new OpenLayers.Format.XML();
	var xmlPara = "<?xml version='1.0' encoding='UTF-8'?>"
			+ "<wfs:GetFeature service='WFS' version='1.0.0' "
			+ "xmlns:wfs='http://www.opengis.net/wfs' "
			+ "xmlns:gml='http://www.opengis.net/gml' "
			+ "xmlns:ogc='http://www.opengis.net/ogc' "
			+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
			+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd'>"
			+ "<wfs:Query typeName='china_new:xinjiang_xian_wgs84' srsName='EPSG:4610' >"
			+ xml.write(filter_1_0.write(filter)) + "</wfs:Query>"
			+ "</wfs:GetFeature>";
	// 发送请求
	var request = OpenLayers.Request.POST({
		url : wfs_url,
		data : xmlPara,// 请求数据
		callback : handler
	// 返回信息处理函数
	});

	// $.ajax
	// (
	// {
	// url:wfs_url,
	// data:xmlPara,
	// success:handler,
	// error: function(XMLHttpRequest, textStatus, errorThrown){
	// debugger;
	// alert('查询出现问题!');
	// }
	// }
	// );
	// if(XMLHttpReq){
	// createXMLHttpRequest();
	// }
	// XMLHttpReq.open("POST", wfs_url, true);
	// XMLHttpReq.onreadystatechange = processResponse;//指定响应函数

	// XMLHttpReq.setRequestHeader("Content-Type", "application-xml");

	// XMLHttpReq.send(xmlPara); // 发送请求

}

var point = null;
var marker = null;
var features = null;
var nameTemp = null;

// 搜索使用到的对象定义
var queryResultFeatures;

// 处理查询所返回的信息
function handler(req) {
	var gml = new OpenLayers.Format.GML();

	queryResultFeatures = gml.read(req.responseText);
	var resultHtml = "<div id='pagecontent'></div><div id='pageNav' class='sabrosus'></div>";
	$("#info").html(resultHtml);
	pageNav.pre = "上一页";
	pageNav.next = "下一页";
	pageNav.fn = function(p, pn) {
		showQueryResultByPage(p, pn);
	};
	pageNav
			.navGo(
					1,
					(queryResultFeatures.length % 10 == 0 ? queryResultFeatures.length / 10
							: (queryResultFeatures.length - queryResultFeatures.length % 10) / 10 + 1));
	// var result = "<table width='100%' border='1' align='center'
	// bgcolor='#D9E7F8'><tr><th align='center'>Name</th><th
	// align='center'>Area</th></tr>";
	// for ( var i = 0; i < queryResultFeatures.length; i++) {
	// var point = queryResultFeatures[i].geometry.getCentroid();// 获取要素坐标信息
	// var name = queryResultFeatures[i].attributes.name;// 获取要素属性信息
	// var area = queryResultFeatures[i].attributes.AREA;
	// // 定义点击定位事件
	// result += "<tr><td align='center'><a href='#0'
	// onclick=\"setCenterAndStyle("
	// + point.x
	// + ","
	// + point.y
	// + ",'"
	// + name
	// + "')\">"
	// + name
	// + "</a></td><td>" + area + "</td></tr>";
	// }
	// result += "</table>";
	// document.getElementById("info").innerHTML = result
	// alert(document.getElementById("info").innerHTML);
	showPopup('insert');// 弹出窗体显示查询结果
}
// 地图展示需要根据分页完成,每页10条数据（固定）
function showQueryResultByPage(pageNum, pageCount) {
	clearLastResult();// 清除上次查询的标记及要素样式
	if (queryMarkerPopup) {
		map.removePopup(queryMarkerPopup);
	}
	var pageContentHtml = "";
	var count;
	if (queryResultFeatures.length >= pageNum * 10) {
		count = pageNum * 10;
	} else {
		count = queryResultFeatures.length;
	}
	for (var i = (pageNum - 1) * 10; i < count; i++) {
		var feature = queryResultFeatures[i];
		var point = feature.geometry.getCentroid();// 获取要素坐标信息
		// 添加选中要素详细查询标注
		var marker = null;
		var onclickHtml = "onclick = \"centerRecordAndPopupInfo(" + point.x
				+ "," + point.y + "," + "'" + feature.attributes.name + "'"
				+ "," + "'" + feature.attributes.AREA + "'" + ")\"";
		switch (i % 10) {
		case 0:
			marker = new OpenLayers.Marker(new OpenLayers.LonLat(point.x,
					point.y), new OpenLayers.Icon('images/location/a.png',
					new OpenLayers.Size(21, 33)));
			pageContentHtml += "<div class='queryResultRecord' "
					+ onclickHtml
					+ "><img src='images/location/a.png' alt='' /><p class='recordTitle'>"
					+ feature.attributes.name + "</p></div>";
			break;
		case 1:
			marker = new OpenLayers.Marker(new OpenLayers.LonLat(point.x,
					point.y), new OpenLayers.Icon('images/location/b.png',
					new OpenLayers.Size(21, 33)));
			pageContentHtml += "<div class='queryResultRecord' "
					+ onclickHtml
					+ "><img src='images/location/b.png' alt='' /><p class='recordTitle'>"
					+ feature.attributes.name + "</p></div>";
			break;
		case 2:
			marker = new OpenLayers.Marker(new OpenLayers.LonLat(point.x,
					point.y), new OpenLayers.Icon('images/location/c.png',
					new OpenLayers.Size(21, 33)));
			pageContentHtml += "<div class='queryResultRecord' "
					+ onclickHtml
					+ "><img src='images/location/c.png' alt='' /><p class='recordTitle'>"
					+ feature.attributes.name + "</p></div>";
			break;
		case 3:
			marker = new OpenLayers.Marker(new OpenLayers.LonLat(point.x,
					point.y), new OpenLayers.Icon('images/location/d.png',
					new OpenLayers.Size(21, 33)));
			pageContentHtml += "<div class='queryResultRecord' "
					+ onclickHtml
					+ "><img src='images/location/d.png' alt='' /><p class='recordTitle'>"
					+ feature.attributes.name + "</p></div>";
			break;
		case 4:
			marker = new OpenLayers.Marker(new OpenLayers.LonLat(point.x,
					point.y), new OpenLayers.Icon('images/location/e.png',
					new OpenLayers.Size(21, 33)));
			pageContentHtml += "<div class='queryResultRecord' "
					+ onclickHtml
					+ "><img src='images/location/e.png' alt='' /><p class='recordTitle'>"
					+ feature.attributes.name + "</p></div>";
			break;
		case 5:
			marker = new OpenLayers.Marker(new OpenLayers.LonLat(point.x,
					point.y), new OpenLayers.Icon('images/location/f.png',
					new OpenLayers.Size(21, 33)));
			pageContentHtml += "<div class='queryResultRecord' "
					+ onclickHtml
					+ "><img src='images/location/f.png' alt='' /><p class='recordTitle'>"
					+ feature.attributes.name + "</p></div>";
			break;
		case 6:
			marker = new OpenLayers.Marker(new OpenLayers.LonLat(point.x,
					point.y), new OpenLayers.Icon('images/location/g.png',
					new OpenLayers.Size(21, 33)));
			pageContentHtml += "<div class='queryResultRecord' "
					+ onclickHtml
					+ "><img src='images/location/g.png' alt='' /><p class='recordTitle'>"
					+ feature.attributes.name + "</p></div>";
			break;
		case 7:
			marker = new OpenLayers.Marker(new OpenLayers.LonLat(point.x,
					point.y), new OpenLayers.Icon('images/location/h.png',
					new OpenLayers.Size(21, 33)));
			pageContentHtml += "<div class='queryResultRecord' "
					+ onclickHtml
					+ "><img src='images/location/h.png' alt='' /><p class='recordTitle'>"
					+ feature.attributes.name + "</p></div>";
			break;
		case 8:
			marker = new OpenLayers.Marker(new OpenLayers.LonLat(point.x,
					point.y), new OpenLayers.Icon('images/location/i.png',
					new OpenLayers.Size(21, 33)));
			pageContentHtml += "<div class='queryResultRecord' "
					+ onclickHtml
					+ "><img src='images/location/i.png' alt='' /><p class='recordTitle'>"
					+ feature.attributes.name + "</p></div>";
			break;
		case 9:
			marker = new OpenLayers.Marker(new OpenLayers.LonLat(point.x,
					point.y), new OpenLayers.Icon('images/location/j.png',
					new OpenLayers.Size(21, 33)));
			pageContentHtml += "<div class='queryResultRecord' "
					+ onclickHtml
					+ "><img src='images/location/j.png' alt='' /><p class='recordTitle'>"
					+ feature.attributes.name + "</p></div>";
			break;
		}
		marker.setOpacity(255);
		var obj = {
			lonlat : new OpenLayers.LonLat(point.x, point.y),
			attributes : feature.attributes
		};
		marker.events.register('click', obj, function() {
			if (queryMarkerPopup) {
				map.removePopup(queryMarkerPopup);
			}
			// 注册单击事件
			queryMarkerPopup = new OpenLayers.Popup.FramedCloud("chicken",
					new OpenLayers.LonLat(this.lonlat.lon, this.lonlat.lat),
					null, "<div style='font-size:.8em'>地区: "
							+ this.attributes.name + "<br />面积: "
							+ this.attributes.AREA + "</div>", null, true,
					onPopupClose);
			map.addPopup(queryMarkerPopup);
			queryMarkerPopup.autoSize = false;
		});

		marker_layer.addMarker(marker);// 添加当前位置标记

	}
	$("#pagecontent").html(pageContentHtml);
}
// 查询结果记录单击处理函数，定位和详细信息气泡
function centerRecordAndPopupInfo(x, y, name, AREA) {

	// 定位
	map.setCenter(new OpenLayers.LonLat(x, y));// 定位
	// 详细信息气泡
	if (queryMarkerPopup) {
		map.removePopup(queryMarkerPopup);
	}
	// 注册单击事件
	queryMarkerPopup = new OpenLayers.Popup.FramedCloud("chicken",
			new OpenLayers.LonLat(x, y), null,
			"<div style='font-size:.8em'>地区: " + name + "<br />面积: " + AREA
					+ "</div>", null, true, onPopupClose);
	map.addPopup(queryMarkerPopup);
	queryMarkerPopup.autoSize = false;
}
// 弹出层
function showPopup(type) {
	var objDiv = null;
	if (type == 'insert') {
		objDiv = document.getElementById("popDivInsert");
	}
	// else if (type = 'delete') {
	// objDiv = document.getElementById("popDivDelete");
	// }
	objDiv.style.top = "0px";// 设置弹出层距离上边界的距离
	objDiv.style.left = "0px";// 设置弹出层距离左边界的距离
	objDiv.style.width = "100%";// 设置弹出层的宽度
	// objDiv.style.height = "150px";//设置弹出层的高度
	objDiv.style.display = "block";
	objDiv.style.visibility = "visible";
}
// 关闭层
// function hidePopup(type) {
// if (type == 'insert') {
// objDiv = document.getElementById("popDivInsert");
// }
// else if (type = 'delete') {
// objDiv = document.getElementById("popDivDelete");
// }
// objDiv.style.visibility = "hidden";
// if (marker != null) {
// marker_layer.removeMarker(marker);
// }
// if (nameTemp != null) {
// vectors.drawFeature(
// vectors.getFeaturesByAttribute("name", nameTemp)[0],
// styleMapTemp);
// nameTemp = null;
// }
// }
/*-------------------------鼠标左键拖动---------------------*/
/*--------当不需要实现此功能时，可以将这一部分代码删除------------*/
// var objDiv = document.getElementById("popDivInsert");
// var isIE = document.all ? true : false;// 判断浏览器类型
// document.onmousedown = function(evnt) {// 当鼠标左键按下后执行此函数
// var evnt = evnt ? evnt : event;
// if (evnt.button == (document.all ? 1 : 0)) {
// mouseD = true;// mouseD为鼠标左键状态标志，为true时表示左键被按下
// }
// };
// objDiv.onmousedown = function(evnt) {
// objDrag = this;// objDrag为拖动的对象
// var evnt = evnt ? evnt : event;
// if (evnt.button == (document.all ? 1 : 0)) {
// mx = evnt.clientX;
// my = evnt.clientY;
// objDiv.style.left = objDiv.offsetLeft + "px";
// objDiv.style.top = objDiv.offsetTop + "px";
// if (isIE) {
// objDiv.setCapture();
// // objDiv.filters.alpha.opacity = 50;//当鼠标按下后透明度改变
// } else {
// window.captureEvents(Event.MOUSEMOVE);// 捕获鼠标拖动事件
// // objDiv.style.opacity = 0.5;//当鼠标按下后透明度改变
// }
// }
// };
// document.onmouseup = function() {
// mouseD = false;// 左键松开
// objDrag = "";
// if (isIE) {
// objDiv.releaseCapture();
// // objDiv.filters.alpha.opacity = 100;//当鼠标左键松开后透明度改变
// } else {
// window.releaseEvents(objDiv.MOUSEMOVE);// 释放鼠标拖动事件
// // objDiv.style.opacity = 1;//当鼠标左键松开后透明度改变
// }
// };
// document.onmousemove = function(evnt) {
// var evnt = evnt ? evnt : event;
// if (mouseD == true && objDrag) {
// var mrx = evnt.clientX - mx;
// var mry = evnt.clientY - my;
// objDiv.style.left = parseInt(objDiv.style.left) + mrx + "px";
// objDiv.style.top = parseInt(objDiv.style.top) + mry + "px";
// mx = evnt.clientX;
// my = evnt.clientY;
// }
// };
// 定位并高亮显示
function setCenterAndStyle(x, y, name) {
	clearMarkerAndStyle();// 清除上次查询的标记及要素样式
	map.setCenter(new OpenLayers.LonLat(x, y));// 定位
	marker = new OpenLayers.Marker(new OpenLayers.LonLat(x, y));
	marker.setOpacity(255);
	marker_layer.addMarker(marker);// 添加当前位置标记
	var highlightTemp = "highlight";
	if (styleMapTemp != "default")
		highlightTemp = "highlight2";
	// vectors.drawFeature(vectors.getFeaturesByAttribute("name",
	// name)[0],highlightTemp);// 通过属性获取当前地图要素并高亮显示
	// nameTemp = name;
}
function setCenter(x,y,zoom){
	map.setCenter(new OpenLayers.LonLat(x, y));
	map.zoomToScale(zoom*2.1)
	
}
function getBounds(arg0, arg1, arg2, arg3) {
    var num = 11;
    if (arg0 == "J" || arg0=="j") {
      num = 10;
    }
    arg2 = arg2 - 1;
    arg3 = arg3 - 1;
    var ltY = num * 4;
    var ltX = (arg1 - 31) * 6;
    var ltY1 = ltY - (20.0 / 60) * Math.floor(arg2 / 12);
    var ltX1 = ltX + (arg2 % 12) * 0.5;
    var ltY2 = ltY1 - (2.5 / 60) * Math.floor(arg3 / 8);
    var ltX2 = ltX1 + (arg3 % 8) * (15.0 / (4 * 60));
    var rbY2 = ltY2 - 2.5 / 60;
    var rbX2 = ltX2 + 15 / (4 * 60);
    //var bounds = new OpenLayers.Bounds();
    //bounds.extend(new OpenLayers.LonLat(ltX2,rbY2));
    //bounds.extend(new OpenLayers.LonLat(rbX2,ltY2));
    var bounds = new OpenLayers.Bounds(ltX2, rbY2, rbX2, ltY2);
    return bounds;
  }
// 清除地物标注
function clearMarkerAndStyle() {
	// 清除所有标记图标 yangzhenxing 修改
	marker_layer.clearMarkers();

	// if (nameTemp != null) {
	// // 清除上次查询的高亮设置
	// vectors.drawFeature(
	// vectors.getFeaturesByAttribute("name", nameTemp)[0],
	// styleMapTemp);
	// }
}

// 清除查询高亮图层
function clearQueryResultLayer() {
	queryResultLayer.removeAllFeatures();
	queryResultLayer1.removeAllFeatures();
}
// 清除上次的查询结果
function clearLastResult() {
	clearMarkerAndStyle();
	clearQueryResultLayer();
}
// 专题图图层
function clearThematicMapLayer() {
	thematicmapLayer.removeAllFeatures();
}
var buttonClicked;
var selectLayer;
function onMapClick(e) {
	//console.log(mapMaxExtent);
	var lonlat = map.getLonLatFromViewPortPx(e.xy);
	if(lonlat.lon<mapMaxExtent.left || lonlat.lon>mapMaxExtent.right || lonlat.lat<mapMaxExtent.bottom || lonlat.lat>mapMaxExtent.top)return;
	var geometry = new OpenLayers.Geometry.Point(lonlat.lon,lonlat.lat);
	point1 =geometry;
	var filter =  new OpenLayers.Filter.Spatial({
		type : OpenLayers.Filter.Spatial.INTERSECTS, // INTERSECTS,
		property:'shape', // property:'geom', // //相交OK
		value :geometry ,
		projection : "EPSG:4610"
	});
	
	// 构造请求数据
	// var filter_1_0 = new OpenLayers.Format.Filter.v1_0_0();
	var filter_1_0 = new OpenLayers.Format.Filter.v1_0_0();
	var xml = new OpenLayers.Format.XML();
	var xmlPara = "<?xml version='1.0' encoding='UTF-8'?>"
			+ "<wfs:GetFeature service='WFS' version='1.0.0' "
			+ "xmlns:wfs='http://www.opengis.net/wfs' "
			+ "xmlns:gml='http://www.opengis.net/gml' "
			+ "xmlns:ogc='http://www.opengis.net/ogc' "
			+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
			+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd'>"
			// + "<wfs:Query typeName='"+xb_layer+"' srsName='EPSG:4610' >"
			+ "<wfs:Query typeName='"+xb_layer+"' srsName='EPSG:4610' >"
			+ xml.write(filter_1_0.write(filter)) + "</wfs:Query>"
			+ "</wfs:GetFeature>";
			
	if (buttonClicked == 'selectByPnt') {	
		// 发送请求
		var request = OpenLayers.Request.POST({
			url : wfs_url,
			data : xmlPara,// 请求数据
			callback : onComplete
		});
	}else if (buttonClicked == 'staticsByPnt') {
		staticsQueryByXZQH(e);
	}
			
	// // 发送请求
	// var request = OpenLayers.Request.POST({
		// url : wfs_url,
		// data : xmlPara,// 请求数据
		// callback : onComplete
	// });
	
	return;
	
	// var str = "[Map]:" + lonlat.lat + "," + lonlat.lon;
	// document.getElementById("output").innerHTML = str;
	// document.getElementById('nodelist').innerHTML = "Loading... please
	// wait...";
	var params = {
		REQUEST : "GetFeatureInfo",
		EXCEPTIONS : "application/vnd.ogc.se_xml",
		BBOX : map.getExtent().toBBOX(),
		SERVICE : "WMS",
		VERSION : "1.1.1",
		X : e.xy.x,
		Y : e.xy.y,
		// INFO_FORMAT : 'application/vnd.ogc.gml',
		INFO_FORMAT : 'application/geojson',
		QUERY_LAYERS : config.xbmLayer.layerServerName,
		FEATURE_COUNT : 1,
		Layers : xb_layer,
		WIDTH : map.size.w,
		HEIGHT : map.size.h,
		format : "image/png",
		styles : '',// map.layers[5].params.STYLES,
		srs : 'EPSG:4610'// map.layers[5].params.SRS
	};
	// OpenLayers.loadURL(wms_url, params, this, onComplete, onFailure);
	if (buttonClicked == 'selectByPnt') {
		OpenLayers.loadURL(wms_url, params, this, onComplete, onFailure);
	} else if (buttonClicked == 'staticsByPnt') {
		staticsQueryByXZQH(e);
	}
	tpoint = map.getLonLatFromPixel(e.xy), OpenLayers.Event.stop(e);
}
var popup1;
var detailwin;
function onComplete(response) {
	// 清除之前的选中效果
	queryResultLayer.removeAllFeatures();
    if(xbm1){
    	queryResultLayer1.removeAllFeatures();
    }
	var g = new OpenLayers.Format.GML();
	var features = g.read(response.responseText);
	if(features.length<1)return;
	showXBInfo(features[0]);

	/*
	 * popup1 = new OpenLayers.Popup.FramedCloud("chicken", tpoint, new
	 * OpenLayers.Size(200, 200), tempstr, null, true); popup1.autoSize = true;
	 * map.addPopup(popup1);
	 */
}

// 地图1移动事件
function onMoveChange(e){
	// 选中高亮效果
	// queryResultLayer.removeAllFeatures();
	var boundTemp = map.calculateBounds(map.center,map.resolution);
	// console.log(boundTemp);
	if(map1!=null && isDoubleScreen){
		var extent = new OpenLayers.Bounds(boundTemp.left, boundTemp.bottom, boundTemp.right, boundTemp.top);
		// map1.zoomToExtent(extent);
		// map1.setCenter(new OpenLayers.LonLat(map.getCenter().x,
		// map.getCenter().y), map.getZoom());
		// map1.moveTo(map.getCenter(),map.getZoom());
		map1.moveTo(new OpenLayers.LonLat(map.getCenter().lon, map.getCenter().lat),map.getZoom());
		// var x = map.getCenter().lon+'';
		// var y = map.getCenter().lat+'';
		// var z = map.getZoom()+'';
		// map1.moveTo(new OpenLayers.LonLat(parseInt(x),
		// parseInt(y)),parseInt(z));
	}
	// map1.setCenter(map.getCenter(),map.getZoom(),false,false);
	// map1.zoomTo(map.getZoom(),map.getCenter());
}

function showXBInfo(feature) {
	var tempstr = '';
	var nm = '';
	var att;
	tempstr += '小班ID:&nbsp';
	nm = feature.attributes.objectid;
	tempstr += nm;
	tempstr += '&nbsp&nbsp&nbsp小班号:&nbsp';
	nm = feature.attributes.c_xb; // 获取属性的时候
	tempstr += nm;
	tempstr += '&nbsp&nbsp&nbsp面积:&nbsp';
	nm = feature.attributes.d_mj;
	tempstr += nm + '<br>';

	att = Ext.JSON.encode(feature.attributes);
	// 选中高亮效果
	// queryResultLayer.drawFeature(feature, styleMap["hightlight2"]);
	queryResultLayer.addFeatures(feature);
	if(map1&&isDoubleScreen){
	 var cloneGeo = feature.geometry.clone();
	 var feature1 = new OpenLayers.Feature.Vector(cloneGeo);
	 queryResultLayer1.addFeatures(feature1);
	}
	if (popup1 != null) {
		map.removePopup(popup1);
	}

	Ext.Ajax.request({
		url : hostPath + '/xbField.jhtml?method=queryParams',
		params : {
			params : att
		},
		success : function(response) {
			if (!detailwin) {
				detailwin = new Ext.Window({
					title : "小班详情",
					height : 450,
					width : 350,
					constrain : true,
					modal : false,
					resizable : false,
// layout:{
// type: 'hbox',
// padding: '0',
// align: 'left'
// },
					closeAction : 'close',
					bodyStyle : 'background-color:white;',
					listeners : {
						close : function() {
							detailwin.destroy();
							detailwin = null;
						}
					},
					items : [ new Ext.grid.GridPanel({
						id : 'detailGrid',
						hidden : false,
						title : '查询结果',
						header : false,
						border : false,
						columnLines : true,
						autoScroll : true,
						store : new Ext.data.JsonStore({
							fields : [ 'fieldAlias', 'value','value2' ],
							data : []
						}),
						height : 430,
						stripeRows : true,
						loadMask : {
							msg : '正在加载数据……'
						},
						columns:[
						    {xtype:'rownumberer'},
						    {
	                            xtype: 'gridcolumn',
	                            dataIndex: 'fieldAlias',
	                            text: '属性名称',
	                            flex: 1
	                        },{
	                            xtype: 'gridcolumn',
	                            dataIndex: 'value',
	                            text: '属性值1',
	                            flex: 1
	                        },{
	                            xtype: 'gridcolumn',
	                            dataIndex: 'value2',
	                            text: '属性值2',
	                            flex: 1
	                        }
						]
					})
					]
				});
			}

			var grid = Ext.getCmp('detailGrid');
			var obj = Ext.JSON.decode(response.responseText);
			grid.getStore().loadData(obj);
			detailwin.show();

			if(isDoubleScreen){
				// detailwin.setWidth(400);
				grid.columns[3].setVisible(true);
				
				// 构造请求数据
				var filtertemp = new OpenLayers.Filter.Spatial({// 比较操作符
					type : OpenLayers.Filter.Spatial.INTERSECTS,
					property : 'shape',
					value : point1
				})
				filter = filtertemp;
				
				var filter_1_0 = new OpenLayers.Format.Filter.v1_0_0();
				var xml = new OpenLayers.Format.XML();
				var xmlPara = "<?xml version='1.0' encoding='UTF-8'?>"
						+ "<wfs:GetFeature service='WFS' version='1.0.0' "
						+ "xmlns:wfs='http://www.opengis.net/wfs' "
						+ "xmlns:gml='http://www.opengis.net/gml' "
						+ "xmlns:ogc='http://www.opengis.net/ogc' "
						+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
						+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd'>"
						+ "<wfs:Query typeName='"+xb_layer1+"' srsName='EPSG:4610' >"
						+ xml.write(filter_1_0.write(filter)) + "</wfs:Query>"
						+ "</wfs:GetFeature>";
				// 发送请求
				var request = OpenLayers.Request.POST({
					url : wfs_url,
					data : xmlPara,// 请求数据
					callback : function(response){
						var g = new OpenLayers.Format.GML();
						var features2 = g.read(response.responseText);
						if(features2!=null && features2.length>0){
							var att2 = Ext.JSON.encode(features2[0].attributes);
							var store = grid.getStore();
							
							Ext.Ajax.request({
								url : hostPath + '/xbField.jhtml?method=queryParams',
								params : {
									params : att2
								},
								success : function(response) {
									var obj2 = Ext.JSON.decode(response.responseText);
									for(var i=0;i<store.getCount();i++){
										var record = store.getAt(i);
										record.set('value2',obj2[i].value);
									}
								}
							});
						}
					}
				})
				
			}else{
				grid.columns[3].setVisible(false);
			}
		}
	});
}

// 多边形查询小班
function queryXBByPolygonComplete(geometry){
	polygonGeo = geometry;
	queryXBByPolygon(geometry,showXBPolygonInfo);
}
function queryXBByPolygonComplete3D(geometry){
	polygonGeo = geometry;
	queryXBByPolygon(geometry,showXBPolygonInfo3D);
}
function showXBPolygonInfo3D(response){
	var g = new OpenLayers.Format.GML();
	var features = g.read(response.responseText);
	var total = 0;
	var totalxj = 0;
	var totalzs = 0;
	var dilei="";
	var lmsyq="";
	var sllb="";
	var lz="";
	var sz="";
	
	var queryData=[];

	// console.log(polygonGeo);
	
	var k = new OpenLayers.Format.WKT();
	var wktA = k.extractGeometry(polygonGeo);
	
	var wktBs = [];
	
	var totalTemp = 0.0;
	var subTemp = 0.0;
	
	for(var i=0;i<features.length;i++){
		if(features[i].attributes['c_xb']=="X" || features[i].attributes['c_xb']=="K") continue;
		if(dilei.indexOf(features[i].attributes['c_dilei'])<0&&features[i].attributes['c_dilei']!=null){
			dilei+=features[i].attributes['c_dilei']+",";
		}
		if(lmsyq.indexOf(features[i].attributes['c_lmsy'])<0&&features[i].attributes['c_lmsy']!=null){
			features[i].attributes['c_dilei']+=features[i].attributes['c_lmsy']+",";
		}
		if(sllb.indexOf(features[i].attributes['c_sllb']&&features[i].attributes['c_sllb']!=null)<0){
			sllb+=features[i].attributes['c_sllb']+",";
		}
		if(lz.indexOf(features[i].attributes['c_lz'])<0&&features[i].attributes['c_lz']!=null){
			lz+=features[i].attributes['c_lz']+",";
		}
		if(sz.indexOf(features[i].attributes['c_yssz'])<0&&features[i].attributes['c_yssz']!=null){
			sz+=features[i].attributes['c_yssz']+",";
		}
		var tempMj = parseFloat(features[i].attributes['d_mj']);
		total += tempMj;

		var tempXj = parseFloat(features[i].attributes['i_xbxj']);// I_XBXJ
		totalxj += tempXj;
		
		var tempZs = parseFloat(features[i].attributes['i_xbzs']);// I_XBZS
		totalzs += tempZs;
		
		
		var wktB = k.extractGeometry(features[i].geometry);
		wktBs.push(wktB);
		
		var xbTemp = features[i].attributes['c_xb'];
		var dileiTemp = features[i].attributes['c_dilei'];
		var sllbTemp = features[i].attributes['c_sllb'];
		var lzTemp = features[i].attributes['c_lz'];
		var szTemp = features[i].attributes['c_yssz'];
		var mjTemp = features[i].geometry.getArea();
		
		subTemp += mjTemp;
		// var per = mjTemp/jsts_geomB.getArea();
		queryData.push({xbh:xbTemp,dilei:dileiTemp,sllb:sllbTemp,totalMj:mjTemp,lz:lzTemp,sz:szTemp,mj:tempMj,xj:tempXj,zs:tempZs});
	}
	
	if(dilei.length>0)dilei=dilei.substring(0,dilei.length-1);
	if(lmsyq.length>0)lmsyq=lmsyq.substring(0,lmsyq.length-1);
	if(sllb.length>0)sllb=sllb.substring(0,sllb.length-1);
	if(lz.length>0)lz=lz.substring(0,lz.length-1);
	if(sz.length>0)sz=sz.substring(0,sz.length-1);

	if(totalTemp==0.0){
		total = 0;
		totalxj = 0;
		totalzs = 0;
	}
	else{
		total = subTemp*total/totalTemp;
		totalxj = subTemp*totalxj/totalTemp;
		totalzs = subTemp*totalzs/totalTemp;
	}

	if (!infoWin) {
		infoWin = new Ext.Window({
		title : "查询结果",
		height : 400,
		width : 400,
		constrain : true,
		modal : false,
		layout:'fit',
		resizable : false,
		closeAction : 'close',
		bodyStyle : 'background-color:white;',
		listeners : {
			close : function() {
				infoWin.destroy();
				infoWin = null;
			}
		},
		items : [
			{
			    xtype: 'gridpanel',
			    header: false,
			    title: 'My Grid Panel',
			    store:new Ext.data.JsonStore({
				    fields: ['xbh', 'dilei', 'sllb','totalMj', 'lz', 'sz', {name:'mj',type:'number'},{name:'xj',type:'number'},{name:'zs',type:'number'}],
				    data:[]
				}),
                features:[{
                	ftype:'summary',
                	dock:'bottom'
                	}],
			    columns: [
			        {
                        xtype: 'rownumberer'
                    },
			        {
			            xtype: 'gridcolumn',
			            dataIndex: 'xbh',
			            text: '小班号',
			            flex:1
			        },
			        {
			        	xtype:'gridcolumn',
			        	dataIndex:'mj',
			        	text:'小班面积',
// xtype:'numbercolumn',
			            flex:1,
			            summaryType: 'sum'
			        },
			        {
			        	xtype:'gridcolumn',
			        	dataIndex:'xj',
			        	text:'小班蓄积',
// xtype:'numbercolumn',
			            flex:1,
			            summaryType: 'sum'
			        },
			        {
			        	xtype:'gridcolumn',
			        	dataIndex:'zs',
			        	text:'小班株数',
// xtype:'numbercolumn',
			            flex:1,
			            summaryType: 'sum'
			        }
			    ]
			}
		]
	});
}

	infoWin.show();
	var jsts_parser = new jsts.io.OpenLayersParser();

	Ext.Ajax.request({
		url : SystemTool.basePath + '/xbField.jhtml?method=intersection',
		params : {
			geoA:wktA,
			geoBs:wktBs
		},
		success : function(response) {
			var obj = Ext.JSON.decode(response.responseText);
			if(obj==null || obj.length<1)return;
			   theApplet.getMeasureToolOption().stopMeasure();
			for(var i=0;i<obj.length;i++){
				var feature = k.read(obj[i].geometry);
				var components=feature.geometry.components[0].components;
				var pointStr="";
				for(var ii=0;ii<components.length;ii++){
					var points=components[ii].getVertices();
					// 33.5,125;
					for(var j=0;j<points.length;j++){
						if(pointStr==""){
							pointStr=points[j].y+","+points[j].x;
						}else{
							pointStr=pointStr+"|"+points[j].y+","+points[j].x;
						}
					}
					
				}
				addSurfacePolygon(pointStr,"blue","lightGray",0.5,i);
				var jsts_geom = jsts_parser.read(feature.geometry);
				var per = jsts_geom.getArea()/parseFloat(queryData[i].totalMj);
//				queryData[i].mj=Math.round(parseFloat(queryData[i].mj)*per*100)/100;
//				queryData[i].xj=Math.round(parseFloat(queryData[i].xj)*per*100)/100;
				queryData[i].mj=(parseFloat(queryData[i].mj)*per).toFixed(2);
				queryData[i].xj=(parseFloat(queryData[i].xj)*per).toFixed(2);
				queryData[i].zs=parseFloat(queryData[i].zs)*per;
			}

			infoWin.down('gridpanel').getStore().loadData(queryData);
		}
	});
}
var infoWin;
var polygonGeo;
// 查询结果
function showXBPolygonInfo(response){
	queryResultLayer.removeAllFeatures();
	var g = new OpenLayers.Format.GML();
	var features = g.read(response.responseText);
	var total = 0;
	var totalxj = 0;
	var totalzs = 0;
	var dilei="";
	var lmsyq="";
	var sllb="";
	var lz="";
	var sz="";
	
	var queryData=[];

	var jsts_parser = new jsts.io.OpenLayersParser();
	var jsts_geomA  = jsts_parser.read(polygonGeo);
	// console.log(polygonGeo);
	
	var k = new OpenLayers.Format.WKT();
	var wktA = k.extractGeometry(polygonGeo);
	
	var wktBs = [];
	
	var totalTemp = 0.0;
	var subTemp = 0.0;
	
	for(var i=0;i<features.length;i++){
		if(features[i].attributes['c_xb']=="X" || features[i].attributes['c_xb']=="K") continue;
		if(dilei.indexOf(features[i].attributes['c_dilei'])<0&&features[i].attributes['c_dilei']!=null){
			dilei+=features[i].attributes['c_dilei']+",";
		}
		if(lmsyq.indexOf(features[i].attributes['c_lmsy'])<0&&features[i].attributes['c_lmsy']!=null){
			features[i].attributes['c_dilei']+=features[i].attributes['c_lmsy']+",";
		}
		if(sllb.indexOf(features[i].attributes['c_sllb']&&features[i].attributes['c_sllb']!=null)<0){
			sllb+=features[i].attributes['c_sllb']+",";
		}
		if(lz.indexOf(features[i].attributes['c_lz'])<0&&features[i].attributes['c_lz']!=null){
			lz+=features[i].attributes['c_lz']+",";
		}
		if(sz.indexOf(features[i].attributes['c_yssz'])<0&&features[i].attributes['c_yssz']!=null){
			sz+=features[i].attributes['c_yssz']+",";
		}
		var tempMj = parseFloat(features[i].attributes['d_mj']);
		total += tempMj;

		var tempXj = parseFloat(features[i].attributes['i_xbxj']);// I_XBXJ
		totalxj += tempXj;
		
		var tempZs = parseFloat(features[i].attributes['i_xbzs']);// I_XBZS
		totalzs += tempZs;
		
		// 选中高亮效果
		queryResultLayer.addFeatures(features[i]);
		
		// 构造数据集
		var jsts_geomB = jsts_parser.read(features[i].geometry);
		var wktB = k.extractGeometry(features[i].geometry);
		wktBs.push(wktB);
		
		var xbTemp = features[i].attributes['c_xb'];
		var dileiTemp = features[i].attributes['c_dilei'];
		var sllbTemp = features[i].attributes['c_sllb'];
		var lzTemp = features[i].attributes['c_lz'];
		var szTemp = features[i].attributes['c_yssz'];
		var mjTemp = features[i].geometry.getArea();
		
		subTemp += mjTemp;
		// var per = mjTemp/jsts_geomB.getArea();
		queryData.push({xbh:xbTemp,dilei:dileiTemp,sllb:sllbTemp,totalMj:mjTemp,lz:lzTemp,sz:szTemp,mj:tempMj,xj:tempXj,zs:tempZs});
	}
	queryResultLayer.removeAllFeatures();
	
	if(dilei.length>0)dilei=dilei.substring(0,dilei.length-1);
	if(lmsyq.length>0)lmsyq=lmsyq.substring(0,lmsyq.length-1);
	if(sllb.length>0)sllb=sllb.substring(0,sllb.length-1);
	if(lz.length>0)lz=lz.substring(0,lz.length-1);
	if(sz.length>0)sz=sz.substring(0,sz.length-1);

	if(totalTemp==0.0){
		total = 0;
		totalxj = 0;
		totalzs = 0;
	}
	else{
		total = subTemp*total/totalTemp;
		totalxj = subTemp*totalxj/totalTemp;
		totalzs = subTemp*totalzs/totalTemp;
	}

	if (!infoWin) {
		infoWin = new Ext.Window({
		title : "查询结果",
		height : 400,
		width : 400,
		constrain : true,
		modal : false,
		layout:'fit',
		resizable : false,
		closeAction : 'close',
		bodyStyle : 'background-color:white;',
		listeners : {
			close : function() {
				infoWin.destroy();
				infoWin = null;
			}
		},
		items : [
			{
			    xtype: 'gridpanel',
			    header: false,
			    title: 'My Grid Panel',
			    store:new Ext.data.JsonStore({
				    fields: ['xbh', 'dilei', 'sllb','totalMj', 'lz', 'sz', {name:'mj',type:'number'},{name:'xj',type:'number'},{name:'zs',type:'number'}],
				    data:[]
				}),
                features:[{
                	ftype:'summary',
                	dock:'bottom'
                	}],
			    columns: [
			        {
                        xtype: 'rownumberer'
                    },
			        {
			            xtype: 'gridcolumn',
			            dataIndex: 'xbh',
			            text: '小班号',
			            flex:1
			        },
			        {
			        	xtype:'gridcolumn',
			        	dataIndex:'mj',
			        	text:'小班面积',
// xtype:'numbercolumn',
			            flex:1,
			            summaryType: 'sum'
			        },
			        {
			        	xtype:'gridcolumn',
			        	dataIndex:'xj',
			        	text:'小班蓄积',
// xtype:'numbercolumn',
			            flex:1,
			            summaryType: 'sum'
			        },
			        {
			        	xtype:'gridcolumn',
			        	dataIndex:'zs',
			        	text:'小班株数',
// xtype:'numbercolumn',
			            flex:1,
			            summaryType: 'sum'
			        }
			    ]
			}
		]
	});
}

	infoWin.show();

	Ext.Ajax.request({
		url : SystemTool.basePath + '/xbField.jhtml?method=intersection',
		params : {
			geoA:wktA,
			geoBs:wktBs
		},
		success : function(response) {
			var obj = Ext.JSON.decode(response.responseText);
			if(obj==null || obj.length<1)return;
			for(var i=0;i<obj.length;i++){
				var feature = k.read(obj[i].geometry);
				queryResultLayer.addFeatures(feature);
				var jsts_geom = jsts_parser.read(feature.geometry);
				var per = jsts_geom.getArea()/parseFloat(queryData[i].totalMj);
//				queryData[i].mj=Math.round(parseFloat(queryData[i].mj)*per*100)/100;
//				queryData[i].xj=Math.round(parseFloat(queryData[i].xj)*per*100)/100;
				queryData[i].mj=(parseFloat(queryData[i].mj)*per).toFixed(2);
				queryData[i].xj=(parseFloat(queryData[i].xj)*per).toFixed(2);
				queryData[i].zs=parseFloat(queryData[i].zs)*per;
			}

			infoWin.down('gridpanel').getStore().loadData(queryData);
		}
	});
}

// 多边形查询小班-回调
function queryXBByPolygon(geometry,callback){
	
	var filter =  new OpenLayers.Filter.Spatial({
		type : OpenLayers.Filter.Spatial.INTERSECTS, // INTERSECTS,
		property:'shape',											// //相交OK
		value :geometry ,
		projection : "EPSG:4610"
	});
	
	// 构造请求数据
	var filter_1_0 = new OpenLayers.Format.Filter.v1_0_0();
	var xml = new OpenLayers.Format.XML();
	var xmlPara = "<?xml version='1.0' encoding='UTF-8'?>"
		+ "<wfs:GetFeature service='WFS' version='1.0.0' "
		+ "xmlns:wfs='http://www.opengis.net/wfs' "
		+ "xmlns:gml='http://www.opengis.net/gml' "
		+ "xmlns:ogc='http://www.opengis.net/ogc' "
		+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
		+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd'>"
		+ "<wfs:Query typeName='"+xb_layer+"' srsName='EPSG:4610' >"
		+ xml.write(filter_1_0.write(filter)) + "</wfs:Query>"
		+ "</wfs:GetFeature>";
		
	
	// 发送请求
	var request = OpenLayers.Request.POST({
		url : wfs_url,
		data : xmlPara,// 请求数据
		callback : callback
			/*
			 * function(response){ var g = new OpenLayers.Format.GML(); var
			 * features = g.read(response.responseText); console.log(features); }
			 */
	});
}

// 根据经纬度获得小班要素
function getFeatureByXY(x, y,callback) {
	
	var geometry = new OpenLayers.Geometry.Point(x,y);
	
	// 筛选条件对象
	var filter =  new OpenLayers.Filter.Spatial({
		type : OpenLayers.Filter.Spatial.INTERSECTS, // INTERSECTS,
		property:'shape',											// //相交OK
		value :geometry ,
		projection : "EPSG:4610"
	});
	
	// 构造请求数据
	var filter_1_0 = new OpenLayers.Format.Filter.v1_0_0();
	var xml = new OpenLayers.Format.XML();
	var xmlPara = "<?xml version='1.0' encoding='UTF-8'?>"
			+ "<wfs:GetFeature service='WFS' version='1.0.0' "
			+ "xmlns:wfs='http://www.opengis.net/wfs' "
			+ "xmlns:gml='http://www.opengis.net/gml' "
			+ "xmlns:ogc='http://www.opengis.net/ogc' "
			+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
			+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd'>"
			+ "<wfs:Query typeName='"+xb_layer+"' srsName='EPSG:4610' >"
			+ xml.write(filter_1_0.write(filter)) + "</wfs:Query>"
			+ "</wfs:GetFeature>";
	// 发送请求
	var request = OpenLayers.Request.POST({
		url : wfs_url,
		data : xmlPara,// 请求数据
		callback : callback
			/*
			 * function(response){ var g = new OpenLayers.Format.GML(); var
			 * features = g.read(response.responseText); return features; }
			 */
	});
}
var staticsWin;


function getAreaByXY(){
	
}
function staticsQueryByXZQH(e) {
	// 清除之前的选中效果
	queryResultLayer.removeAllFeatures();
	
	var lonlat = map.getLonLatFromViewPortPx(e.xy);
	var geometry = new OpenLayers.Geometry.Point(lonlat.lon,lonlat.lat);
	
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
		// srs : 'EPSG:4610'//'EPSG:4610'//lay.params.SRS
	// };
	
	// 筛选条件对象
	var filter =  new OpenLayers.Filter.Spatial({
		type : OpenLayers.Filter.Spatial.INTERSECTS, // INTERSECTS,
		property:'shape',											// //相交OK
		value :geometry ,
		projection : "EPSG:4610"
	});
	
	// 构造请求数据
	var filter_1_0 = new OpenLayers.Format.Filter.v1_0_0();
	var xml = new OpenLayers.Format.XML();
	var xmlPara = "<?xml version='1.0' encoding='UTF-8'?>"
			+ "<wfs:GetFeature service='WFS' version='1.0.0' "
			+ "xmlns:wfs='http://www.opengis.net/wfs' "
			+ "xmlns:gml='http://www.opengis.net/gml' "
			+ "xmlns:ogc='http://www.opengis.net/ogc' "
			+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
			+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd'>"
			+ "<wfs:Query typeName='"+lay+"' srsName='EPSG:4610' >"
			+ xml.write(filter_1_0.write(filter)) + "</wfs:Query>"
			+ "</wfs:GetFeature>";

	// 根据行政区划查询统计表
	// Ext.chart.Chart.CHART_URL =
	// SystemTool.basePath+'/extjs3/resources/charts.swf';
	var json_store = new Ext.data.JsonStore({
		autoDestroy: true,
		 proxy: {
	         type: 'ajax',
	         url: SystemTool.basePath + '/tjTable.jhtml?method=queryData',
	         reader: {
	             type: 'json'
	         }
	     },
	    storeId: 'myStore',
	    // reader configs
	    root: null,
	    idProperty: 'name',
	    fields: ['name', 'value']
	});
	
	
	// 先查询出行政区划
	// OpenLayers.loadURL(url, params, this, function(response) {
	OpenLayers.Request.POST({
		url : url,
		data : xmlPara,// 请求数据
		callback : function(response){
		var g = new OpenLayers.Format.GML();
		var features = g.read(response.responseText);
		if (features == null || features.length < 1)
			return;
		// 选中高亮效果
		// queryResultLayer.drawFeature(features[0], styleMap["hightlight2"]);
		queryResultLayer.addFeatures(features[0]);
		var areaName = features[0].attributes.name||features[0].attributes.NAME;
		var areaCun = features[0].attributes.c_cun||features[0].attributes.C_CUN;
		var areaXiang = features[0].attributes.c_xiang||features[0].attributes.C_XIANG;
		var areaXian =features[0].attributes.c_xian|| features[0].attributes.C_XIAN;
		var areaCode=null;
		if(areaCun!=undefined){
			areaCode=areaCun;
		}else if(areaXiang!=undefined){
			areaCode = areaXiang;
		}else if(areaXian!=undefined){
			areaCode=areaXian;
		}

		if(staticsWin){
			staticsWin.destroy();
			staticsWin=null;
		}
		if (!staticsWin) {
			staticsWin = new Ext.Window({
				title : "行政区划信息",
				height : 700,
				width : 800,
				constrain : true,
				modal : false,
				layout:'fit',
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
				items:[
				     {
				    	 xtype:'tabpanel',
				    	 activeTab: 0,
				    	    items: [{
				    	    	xtype:'form',
							    title: '资源概况',
							    header:false,
							    bodyStyle: 'padding:15px',
							    width: 350,
							    defaultType: 'textfield',
							    defaults: {
							        // applied to each contained item
							        width: 230,
							        msgTarget: 'side',
							        style: {
							            marginBottom: '20px'
							        }
							    },
							    items: [{
							            fieldLabel: '区划名称',
							            id:'infoAreaName',
							            readOnly :true,
							            name: 'first'
							        },{
							            fieldLabel: '区划编码',
							            id:'infoAreaCode',
							            readOnly :true,
							            name: 'last'
							        },{
							            fieldLabel: '小班总数',
							            id:'infoXBNum',
							            readOnly :true
							        }, {
							            fieldLabel: '小班总面积',
							            id:'infoAreaTotal',
							            readOnly :true
							        }, {
							            xtype: 'textarea',
							            id:'infoContent',
							            // hideLabel: true, // override
										// hideLabels layout config
							            name: 'msg',
							            readOnly :true,
							            fieldLabel: '简介',
							            height:100,
							            anchor: '100%'
							        }
							    ],
							    layoutConfig: {
							        labelSeparator: '~' // superseded by
														// assignment below
							    },
							    // config options applicable to container when
								// layout='form':
							    hideLabels: false,
							    labelAlign: 'right',   // or 'right' or 'top'
							    labelSeparator: ':', // takes precedence over
														// layoutConfig value
							    labelWidth: 80,       // defaults to 100
							    labelPad: 8           // defaults to 5, must
														// specify labelWidth to
														// be honored
				    	    },
				    	    {
				    	    	title: '资源概况－图表',
				    	    	layout:'fit',
				    	    	//width:600,
				    	    	//height:600,
				    	    	items:[{
									store : json_store,
									xtype : 'chart',// 餅圖
									margin:20,
							        legend: {
							            position: 'right',
							            boxStrokeWidth:0
							        },
									series: [{
								        type: 'pie',
								        angleField: 'value',
								        showInLegend: true,
								        tips: {
								            trackMouse: true,
								            width: 170,
								            height: 28,
								            renderer: function(storeItem, item) {
								                // calculate and display
												// percentage on hover
								                var total = 0;
								                json_store.each(function(rec) {
								                    total += rec.get('value');
								                });
								                this.setTitle(storeItem.get('name') + ': ' + (storeItem.get('value') / total * 100).toFixed(2) + '%');
								            }
								        },
								        highlight: {
								            segment: {
								                margin: 20
								            }
								        },
								        label: {
								            field: 'name',
								            //minMargin:20,
								            display: 'rotate',//'outside','rotate'
								            contrast: false,
								            font: '9px Arial',
								            radiusFactor:50
								        }
									}]
				    	    	}]
							},
							{
								title: '资源概况－表格',
				    	    	layout:'fit',
				    	    	items:[
				    	    	    {
				    	    	    	xtype:'grid',
				    	    	    	columns: [
				    	    	    	       {header: '地类', flex: 1, sortable: true, dataIndex: 'name'},
				    	    	    	       {header: '面积', flex: 1, sortable: true, dataIndex: 'value',
				    	                            renderer: function (value, record) {
				    	                                
				    	                                return  (new Number(value)).toFixed(2);
				    	                            }}
				    	    	    	    ],
				    	    	    
				    	    	    	store:json_store
				    	    	    }
				    	    	]
							}
				    	 ]
				     }  
				]
			});
		}
		
		// 测试
		// var grid = Ext.getCmp('staticResultGrid');
		/*
		 * var obj = Ext.decode(response.responseText);
		 * grid.getStore().loadData(obj);
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
				if(obj==null || obj==undefined){
				}else{
					/*
					 * var str = "区划名称："+obj.areaName+"</br>"
					 * +"区划编码："+obj.areaCode+"</br>" +"小班总数："+obj.xbNum+"</br>"
					 * +"小班总面积："+obj.areaTotal;
					 */
					// Ext.Msg.alert("查询结果",str);
					Ext.getCmp('infoXBNum').setValue(obj.xbNum);
					Ext.getCmp('infoAreaTotal').setValue(obj.areaTotal);
					Ext.getCmp('infoContent').setValue(obj.content);
				}
			}
		});
		// 加载图表数据
		json_store.load({params:{areaName:areaName}});
			json_store.filter([ 
			                     {filterFn: function(item) { return new Number(item.get("value")) > 0; }}
			                 ]);
		
	}
	});
}

// 加载专题图
function loadThemeLayer(name, layerName) {
	if (layerName == "")
		return;
	if (!thematicmapLayer) {
		thematicmapLayer = new OpenLayers.Layer.WMS(name, wms_url, {
			layers : layerName,
			transparent : "true"
		}, {
			'isBaseLayer' : false
		});
		map.addLayer(thematicmapLayer);
	} else {
		thematicmapLayer.setVisibility(true);
		thematicmapLayer.params.LAYERS = layerName;
		thematicmapLayer.redraw();
	}
	switchShowLayer(layerName.split(":")[1]);
}
function hideThemeLayer() {
	if (thematicmapLayer != null) {
		thematicmapLayer.setVisibility(false);
	}
}
function onFailure(response) {
	alert("onFailure");
}
// 年度切换
function switchXB(map,year) {
	if (year == "")
		return;
	if(map==1){
		xbm.params.LAYERS = 'shwy:J2210000JB' + year + 'XBM';
		xbm.redraw();
		// xb_layer = 'shwy:J2210000JB' + year + 'XBM';
		xb_layer = 'shwy:J2210000JB' + year + 'XBM';
	}
	else{
		xbm1.params.LAYERS = 'shwy:J2210000JB' + year + 'XBM';
		xbm1.redraw();
		// xb_layer = 'shwy:J2210000JB' + year + 'XBM';
		xb_layer1 = 'shwy:J2210000JB' + year + 'XBM';
	}
	// map.addLayer(xbm);
}
// 年度切换
function switchXB2(year) {
	if (year == "")
		return;
	xbm1.params.LAYERS = 'shwy:J2210000JB' + year + 'XBM';
	xbm1.redraw();
	xb_layer1 = 'shwy:J2210000JB' + year + 'XBM';
}
// 缩小
function zoomout2D() {
	mouseMoveZoomOut2D();
}
// 放大
function zoomin2D() {
	mouseMoveZoomIn2D();
}
// 复位
function zoomToExtent() {
	// var boundsTemp = new OpenLayers.Bounds(118.8, 38.61, 125.77, 43.56);
	// map.zoomToExtent(boundsTemp);
	map.setCenter(new OpenLayers.LonLat(config.mapCenter.x, config.mapCenter.y), config.mapCenter.level);
}
// 开始测量-距离
function startMeasureDistance2D() {
	toggleControl('line');
}
// 开始测量-面积
function startMeasureArea2D() {
	toggleControl('polygon');
}

function locateResultFeature3D(index){
				removedAllShape();

					var feature=queryResultFeatures[index];
					var components=feature.geometry.components[0].components;
					for(var i=0;i<components.length;i++){
						var points=components[i].getVertices();
						var pointStr="";// 33.5,125;
						for(var j=0;j<points.length;j++){
							if(pointStr==""){
								pointStr=points[j].y+","+points[j].x;
							}else{
								pointStr=pointStr+"|"+points[j].y+","+points[j].x;
							}
						}
						addSurfacePolygon(pointStr,"blue","lightGray",0.5,feature.attributes.c_xb+i);
					}
				    flyToLocation(feature.geometry.getCentroid().y,feature.geometry.getCentroid().x,0,0,0,3000);
// flyTo(feature.geometry.getCentroid().y,feature.geometry.getCentroid().x);
					addMarker(feature.geometry.getCentroid().y,feature.geometry.getCentroid().x,"null");// /../../../../../com/sx
				
		
// flyTo(lat,lon);
			
	
}
// 小班查询
function queryXB(type,text) {
	var isXb = true;
	if (text.length<=14){
		return;
	}
	
	var conds = text.split(',');

	var filter = new OpenLayers.Filter.Logical({
		type : OpenLayers.Filter.Logical.AND
	});
	
	if(type=="condQuery"){
		var coms = conds[0].split(':');
		filtertemp = new OpenLayers.Filter.Comparison({// 比较操作符
			type : OpenLayers.Filter.Comparison.EQUAL_TO,
			property : coms[0],
			value : coms[1]
		})
		filter.filters[0] = filtertemp;
		
		conds = conds[1].split('{and}');
	}
	
	for (var i = 0; i < conds.length; i++) {
		var coms = conds[i].split(':');
		if(coms[0]=='c_lb')
			isXb = false;
		
		var filtertemp = null;
		if(type=="condQuery"){
			var ope;
			var cond = conds[i];
			if(cond.indexOf('>')>=0){
				ope = ">";
				coms = conds[i].split('>');
			}
			else if(cond.indexOf('=')>=0){
				ope = "=";
				coms = conds[i].split('=');
			}
			else if(cond.indexOf('<')>=0){
				ope = "<";
				coms = conds[i].split('<');
			}
			else{
				ope = "Like";
				coms = conds[i].split('Like');
			}
			
			if(ope=="="){
				filtertemp = new OpenLayers.Filter.Comparison({// 比较操作符
					type : OpenLayers.Filter.Comparison.EQUAL_TO,
					property : coms[0].toLowerCase().trim(),
					value : coms[1].trim()
				})
			}
			else if(ope==">"){
				filtertemp = new OpenLayers.Filter.Comparison({// 比较操作符
					type : OpenLayers.Filter.Comparison.GREATER_THAN,
					property : coms[0].toLowerCase().trim(),
					value : coms[1].trim()
				})
			}
			else if(ope=="<"){
				filtertemp = new OpenLayers.Filter.Comparison({// 比较操作符
					type : OpenLayers.Filter.Comparison.LESS_THAN,
					property : coms[0].toLowerCase().trim(),
					value : coms[1].trim()
				})
			}
			else if(ope=="Like"){
				filtertemp = new OpenLayers.Filter.Comparison({// 比较操作符
					type : OpenLayers.Filter.Comparison.LIKE,
					property : coms[0].toLowerCase().trim(),
					value : "*"+coms[1].trim()+"*"
				})
			}
			
//			i=i+1;
		}
		else{
			filtertemp = new OpenLayers.Filter.Comparison({// 比较操作符
				type : OpenLayers.Filter.Comparison.EQUAL_TO,
				property : coms[0],
				value : coms[1]
			})
		}
		if(type=="condQuery")
		filter.filters[i+1] = filtertemp;
		else
			filter.filters[i] = filtertemp;

	}
	
	// 构造请求数据
	var filter_1_0 = new OpenLayers.Format.Filter.v1_0_0();
	var xml = new OpenLayers.Format.XML();
	var xmlPara = "<?xml version='1.0' encoding='UTF-8'?>"
			+ "<wfs:GetFeature maxFeatures='50' service='WFS' version='1.0.0' "
			+ "xmlns:wfs='http://www.opengis.net/wfs' "
			+ "xmlns:gml='http://www.opengis.net/gml' "
			+ "xmlns:ogc='http://www.opengis.net/ogc' "
			+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
			+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd'>"
			+ "<wfs:Query typeName='"+xb_layer+"' srsName='EPSG:4610' >"
			+ xml.write(filter_1_0.write(filter)) + "</wfs:Query>"
			+ "</wfs:GetFeature>";
	// 发送请求
	var request = OpenLayers.Request.POST({
		url : wfs_url,
		data : xmlPara,// 请求数据
		callback : function(req) {
			// 返回信息处理函数
			var gml = new OpenLayers.Format.GML();
			queryResultFeatures = gml.read(req.responseText);
			queryData = [];
// if(!isXb)
// for (var i = 0; i < queryResultFeatures.length; i++) {
// // resultList.push(queryResultFeatures[i].attributes.objectid);
// /*
// * var record = new Ext.data.Record({//传入一个对象作为第一个参数
// * objectid:queryResultFeatures[i].attributes.objectid });
// */
// queryData.push({c_xb:queryResultFeatures[i].attributes.c_xb,c_lb:queryResultFeatures[i].attributes.c_lb,c_xiang:queryResultFeatures[i].attributes.c_xiang,c_cun:queryResultFeatures[i].attributes.c_cun,shape_area:queryResultFeatures[i].attributes.shape_area});
// //queryData.push([ queryResultFeatures[i].attributes.objectid ]);
// }
// else
				for (var i = 0; i < queryResultFeatures.length; i++) {
					// resultList.push(queryResultFeatures[i].attributes.objectid);
					/*
					 * var record = new Ext.data.Record({//传入一个对象作为第一个参数
					 * objectid:queryResultFeatures[i].attributes.objectid });
					 */
					queryData.push({c_xb:queryResultFeatures[i].attributes.c_xb,c_lb:queryResultFeatures[i].attributes.c_lb,c_xiang:queryResultFeatures[i].attributes.c_xiang,c_cun:queryResultFeatures[i].attributes.c_cun,d_mj:queryResultFeatures[i].attributes.d_mj});
					// queryData.push([
					// queryResultFeatures[i].attributes.objectid ]);
				}
			
			if(type=="xbQuery"){	
				
				var grid = Ext.ComponentQuery.query('xbQueryWidget gridpanel')[0];
				
				if(isXb){
					grid.down('gridcolumn[text=林班号]').show();
					grid.down('gridcolumn[text=小班号]').hide();					
// grid.getColumns()[0].setHidden(false); ext6
// grid.getColumns()[1].setHidden(true);
				}
				else{			
					grid.down('gridcolumn[text=小班号]').show();
					grid.down('gridcolumn[text=林班号]').hide();
// grid.getColumns()[0].setHidden(true);
// grid.getColumns()[1].setHidden(false);
					
				}

			}
			else{
				
				var grid = Ext.ComponentQuery.query('xbCondQueryWidget gridpanel')[0];
				
			}

			    if(queryData.length == 0){
			    	noXB();
			    	grid.getStore().removeAll();
			    	return;
			    }
				grid.getStore().loadData(queryData);
			
		}
	})
}

// 定位到行政区划
function queryXZQH(codelevel,code,callback){
	var data;
	var field;
	var url;
	if(codelevel=="2"){
		field="c_shi";
		data=config.shi.layerServerName;// "shwy:shi";
		url=config.shi.wfs_url;
	}else if(codelevel=="3"){
		field="c_xian";
		data=config.xian.layerServerName;// "shwy:xian";
		url=config.xian.wfs_url;
	}else if(codelevel=="4"){
		field="c_xiang";
		data=config.xiang.layerServerName;// "shwy:xiang";
		url=config.xiang.wfs_url;
	}else if(codelevel=="5"){
		field="c_cun";
		data=config.cun.layerServerName;// "shwy:cun";
		url=config.cun.wfs_url;
	}else{
		return;
	}
	
	var filtertemp = new OpenLayers.Filter.Comparison({// 比较操作符
		type : OpenLayers.Filter.Comparison.EQUAL_TO,
		property : field,
		value : code
	})
	
	var filter = new OpenLayers.Filter.Logical({
		type : OpenLayers.Filter.Logical.AND
	});
	filter.filters[0] = filtertemp;
	filter.filters[1] = filtertemp;
	
	// 构造请求数据
	var filter_1_0 = new OpenLayers.Format.Filter.v1_0_0();
	var xml = new OpenLayers.Format.XML();
	var xmlPara = "<?xml version='1.0' encoding='UTF-8'?>"
			+ "<wfs:GetFeature maxFeatures='50' service='WFS' version='1.0.0' "
			+ "xmlns:wfs='http://www.opengis.net/wfs' "
			+ "xmlns:gml='http://www.opengis.net/gml' "
			+ "xmlns:ogc='http://www.opengis.net/ogc' "
			+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
			+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd'>"
			+ "<wfs:Query typeName='"+data+"' srsName='EPSG:4610' >"
			+ xml.write(filter_1_0.write(filter)) + "</wfs:Query>"
			+ "</wfs:GetFeature>";
	// 发送请求
	var request = OpenLayers.Request.POST({
		url : url,// wfs_url,
		data : xmlPara,// 请求数据
		callback : callback
		})
}

function locateXZQH(req){
	var gml = new OpenLayers.Format.GML();
	features = gml.read(req.responseText);
	// 选中高亮效果
	queryResultLayer.removeAllFeatures();
	queryResultLayer.addFeatures(features[0]);
	// 定位
	map.zoomToExtent(features[0].geometry.bounds);

	// 选中高亮效果
	queryResultLayer.removeAllFeatures();
	// queryResultLayer.drawFeature(features[0], styleMap["hightlight2"]);
	queryResultLayer.addFeatures(features[0]);
}

// 小班定位
function locateXB(cun,linban,xiaoban,callback){
	var text="";
	if(cun!=undefined&& cun!=""){
		text+='c_cun:'+cun+","
	}
	if(linban!=undefined&& linban!=""){
		text+='c_lb:'+linban+","
	}
	if(xiaoban!=undefined&& xiaoban!=""){
		text+='c_xb:'+xiaoban+","
	}
	text=text.substring(0,text.length-1);
	
	if (text == "")
		return;
	var conds = text.split(',');

	var filter = new OpenLayers.Filter.Logical({
		type : OpenLayers.Filter.Logical.AND
	});

	for (var i = 0; i < conds.length; i++) {
		var coms = conds[i].split(':');
		var filtertemp = new OpenLayers.Filter.Comparison({// 比较操作符
			type : OpenLayers.Filter.Comparison.EQUAL_TO,
			property : coms[0],
			value : coms[1]
		})
		filter.filters[i] = filtertemp;
	}

	// 构造请求数据
	var filter_1_0 = new OpenLayers.Format.Filter.v1_0_0();
	var xml = new OpenLayers.Format.XML();
	var xmlPara = "<?xml version='1.0' encoding='UTF-8'?>"
			+ "<wfs:GetFeature maxFeatures='50' service='WFS' version='1.0.0' "
			+ "xmlns:wfs='http://www.opengis.net/wfs' "
			+ "xmlns:gml='http://www.opengis.net/gml' "
			+ "xmlns:ogc='http://www.opengis.net/ogc' "
			+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
			+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd'>"
			+ "<wfs:Query typeName='"+xb_layer+"' srsName='EPSG:4610' >"
			+ xml.write(filter_1_0.write(filter)) + "</wfs:Query>"
			+ "</wfs:GetFeature>";
	// 发送请求
	var request = OpenLayers.Request.POST({
		url : wfs_url,
		data : xmlPara,// 请求数据
		callback : callback
		})
}

// 定位选择的结果
function locateResultFeature(index) {
	var feature = queryResultFeatures[index];
	// 选中高亮效果
	queryResultLayer.removeAllFeatures();
	// queryResultLayer.drawFeature(feature, styleMap["hightlight2"]);
	queryResultLayer.addFeatures(feature);
	// 定位
// map.zoomToExtent(feature.geometry.bounds);
	var center = feature.geometry.getCentroid();
	map.setCenter(new OpenLayers.LonLat(center.x,center.y),13);

	// 选中高亮效果
	queryResultLayer.removeAllFeatures();
	// queryResultLayer.drawFeature(feature, styleMap["hightlight2"]);
	queryResultLayer.addFeatures(feature);
}

// 切换鼠标事件功能
function toggleControl(_value) {
	for (key in measureControls) {
		var control = measureControls[key];
		if (_value == key) {
			// 激活测量状态，注意清除上次记录
			control.activate();
			MAP.resultLen.length = 0;
			MAP.resultLen = [];
		} else {
			control.deactivate();
		}
	}
	buttonClicked = _value;
}
// 双击完成测量时触发
function measureCompleteCallback(geometry) {
	var stat, unit;
	if (geometry.CLASS_NAME.indexOf('LineString') > -1) {
		stat = this.getBestLength(geometry);

		if (stat[1] == "m")
			unit = "米";
		else
			unit = "千米";
		MAP.resultLen.push(stat[0].toFixed(3) + " " + unit);
	} else {
		stat = this.getBestArea(geometry);
		if (stat[1] == "m")
			stat[0]*=0.0001;		   
		else
			stat[0]*=100;
		//MAP.resultLen.push(stat[0].toFixed(3) + " " + '公顷');
		stat = geometry.getArea()*1000000;
		MAP.resultLen.push(stat.toFixed(3) + " " + '公顷');
	}
	if (geometry.CLASS_NAME.indexOf('LineString') > -1) {
		for (var i = 0; i < geometry.components.length; i++) {
			var labelOffsetPoint = new OpenLayers.Geometry.Point(
					geometry.components[i].x, geometry.components[i].y);
			var labelOffsetFeature = new OpenLayers.Feature.Vector(
					labelOffsetPoint);
			labelOffsetFeature.attributes = {
				// dis : MAP.resultLen[i - 1] ? MAP.resultLen[i - 1] : 0,
				dis :i==0?0:MAP.resultLen[i],
				favColor : 'blue',
				align : "cm",
				// positive value moves the label to the right
				xOffset : 50,
				// negative value moves the label down
				yOffset : -15
			};
			MAP.measureVectorLayer.addFeatures([ labelOffsetFeature ]);
		}
		MAP.measureVectorLayer.addFeatures(new OpenLayers.Feature.Vector(
				geometry, null, style_measurePolyLine));
	} else {
		var linearRing = new OpenLayers.Geometry.LinearRing(
				geometry.components[0].components);
		var polygonFeature = new OpenLayers.Feature.Vector(
				new OpenLayers.Geometry.Polygon(linearRing));
		polygonFeature.attributes = {
			dis : MAP.resultLen[MAP.resultLen.length - 1],
			favColor : 'purple',
			align : 'lb'
		};
		MAP.measureVectorLayer.addFeatures([ polygonFeature ]);
	}
	MAP.resultLen.length = 0;
	MAP.resultLen = [];
}
// 每点击一个测量点时触发，保存每段的测量长度
function measureCallback(geometry, eventType) {
	var stat, unit;
	if (geometry.CLASS_NAME.indexOf('LineString') > -1) {
// if(geometry.components.length<3)return;
		stat = this.getBestLength(geometry);
		if (stat[1] == "m")
			unit = "米";
		else
			unit = "千米";
		MAP.resultLen.push(stat[0].toFixed(3) + " " + unit);
	}
}
function cancelMeasure() {
	toggleControl('none');
}
function clearMeasure() {
	toggleControl('none');
	MAP.measureVectorLayer.removeAllFeatures();
}

// 显示变化小班
function showDiffXB(){
	if(map.getZoom()<8)return;
	Ext.Msg.wait('正在查询当前范围内变化的变化小班...','请稍候');
	queryXBByMapExtent(xb_layer,queryResultXB);
}
function showDiffXBByCun(cunCode,lbh){
	Ext.Msg.wait('正在查询当前范围内变化的变化小班...','请稍候');
	resourceHolder.dc={features1:{},
		features2:{}};
	queryXBByCun(xb_layer,cunCode,lbh,queryResultXBByCun,resourceHolder.dc.features1);
//	queryXBByCun(xb_layer1,cunCode,lbh,queryResultXBByCun,resourceHolder.dc.features2);
}
function queryResultXBByCun(response){
	var gml = new OpenLayers.Format.GML();
	var features = gml.read(response.responseText);
	this.result =features;
	features = resourceHolder.dc.features1.result;
	features1 = resourceHolder.dc.features2.result;

	// 选中高亮效果
	queryResultLayer.removeAllFeatures();
	// 查询第二屏
		for(var i=0;i<features.length;i++){
//			var fid = features[i].attributes.objectid;
			var c_xb = features[i].attributes.c_xb;
			// 忽略非林地
			if(c_xb=='X'){
				continue;
			}
//			var temp = null;
//			for(var j=0;j<features1.length;j++){
//				// var xbh = features1[j].attributes.c_xb;
//			    var fid2 = features1[j].attributes.objectid;
//				if(fid!=fid2)continue;
//				temp = features1[j];
//			}
//			if(temp==null){
//				queryResultLayer.addFeatures(features[i]);
//			}else{
				if(features[i].attributes.c_bhyy!=undefined&&features[i].attributes.c_bhyy.trim()!=''){
					queryResultLayer.addFeatures(features[i]);

//				}
//if(features[i].geometry!=temp.geometry ||
//features[i].geometry!=temp.geometry){
//queryResultLayer.addFeatures(features[i]);
//}
			}
		}
		var queryData=[];
		queryResultFeatures = queryResultLayer.features;
		for (var i = 0; i < queryResultLayer.features.length; i++) {
			// resultList.push(queryResultFeatures[i].attributes.objectid);
			/*
			 * var record = new Ext.data.Record({//传入一个对象作为第一个参数
			 * objectid:queryResultFeatures[i].attributes.objectid });
			 */
			queryData.push({c_xb:queryResultFeatures[i].attributes.c_xb,c_lb:queryResultFeatures[i].attributes.c_lb,c_xiang:queryResultFeatures[i].attributes.c_xiang,c_cun:queryResultFeatures[i].attributes.c_cun,c_bhyy:queryResultFeatures[i].attributes.c_bhyy});
			// queryData.push([
			// queryResultFeatures[i].attributes.objectid ]);
		}
		Ext.ComponentQuery.query('compareView gridpanel')[0].getStore().loadData(queryData);
		Ext.Msg.hide();
		if(queryResultLayer.features.length<1){
			Ext.Msg.alert('提示','当前村或林班内无变化小班');
		}
	
	
}
function queryXBByCun(layer,cunCode,lbh,callback,scope){
	// 筛选条件对象
    	var filterLb =null;
    	 var filter;
	var filterCun = new OpenLayers.Filter.Comparison({// 比较操作符
		type : OpenLayers.Filter.Comparison.EQUAL_TO,
		property : "c_cun",
		value : cunCode
	})
    	if(lbh.trim()!=""){
    	   filter =  new OpenLayers.Filter.Logical({
		type : OpenLayers.Filter.Logical.AND
    	});
    	filterLb = new OpenLayers.Filter.Comparison({// 比较操作符
		type : OpenLayers.Filter.Comparison.EQUAL_TO,
		property : "c_lb",
		value : lbh
	});
    	filter.filters.push(filterLb);
    	filter.filters.push(filterCun);
    	}else
    	    filter = filterCun;
    	    

	// 构造请求数据
	var filter_1_0 = new OpenLayers.Format.Filter.v1_0_0();
	var xml = new OpenLayers.Format.XML();
	var xmlPara = "<?xml version='1.0' encoding='UTF-8'?>"
			+ "<wfs:GetFeature service='WFS' version='1.0.0' "
			+ "xmlns:wfs='http://www.opengis.net/wfs' "
			+ "xmlns:gml='http://www.opengis.net/gml' "
			+ "xmlns:ogc='http://www.opengis.net/ogc' "
			+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
			+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd'>"
			+ "<wfs:Query typeName='"+layer+"' srsName='EPSG:4610' >"
			+ xml.write(filter_1_0.write(filter)) + "</wfs:Query>"
			+ "</wfs:GetFeature>";
	// 发送请求
	var request = OpenLayers.Request.POST({
		url : wfs_url,
		data : xmlPara,// 请求数据
		callback : callback,
		scope:scope
	});
}
function queryResultXB(response){
	var gml = new OpenLayers.Format.GML();
	var features = gml.read(response.responseText);
	// 选中高亮效果
	queryResultLayer.removeAllFeatures();
	// 查询第二屏
		for(var i=0;i<features.length;i++){
//			var fid = features[i].attributes.c_joinid;
			var c_xb = features[i].attributes.c_xb;
			// 忽略非林地
			if(c_xb=='X'){
				continue;
			}

				if(features[i].attributes.c_bhyy!=undefined&&features[i].attributes.c_bhyy.trim()!=''){
					queryResultLayer.addFeatures(features[i]);
				}
// if(features[i].geometry!=temp.geometry ||
// features[i].geometry!=temp.geometry){
// queryResultLayer.addFeatures(features[i]);
// }
			
		}
		var queryData=[];
		queryResultFeatures = queryResultLayer.features;
		for (var i = 0; i < queryResultLayer.features.length; i++) {
			// resultList.push(queryResultFeatures[i].attributes.objectid);
			/*
			 * var record = new Ext.data.Record({//传入一个对象作为第一个参数
			 * objectid:queryResultFeatures[i].attributes.objectid });
			 */
			queryData.push({c_xb:queryResultFeatures[i].attributes.c_xb,c_lb:queryResultFeatures[i].attributes.c_lb,c_xiang:queryResultFeatures[i].attributes.c_xiang,c_cun:queryResultFeatures[i].attributes.c_cun,c_bhyy:queryResultFeatures[i].attributes.c_bhyy});
			// queryData.push([
			// queryResultFeatures[i].attributes.objectid ]);
		}
		Ext.ComponentQuery.query('compareView gridpanel')[0].getStore().loadData(queryData);
		Ext.Msg.hide();
		if(queryResultLayer.features.length<1){
			Ext.Msg.alert('提示','当前显示范围内无变化小班');
		}
}

// 根据地图范围查询小班
function queryXBByMapExtent(layer,callback){
	// 筛选条件对象
	var filter =new OpenLayers.Filter.Spatial({
			type : OpenLayers.Filter.Spatial.INTERSECTS, // INTERSECTS,
			property:'shape',												// //相交OK
			value : map.getExtent(),
			projection : "EPSG:4610"
		});
	// 构造请求数据
	var filter_1_0 = new OpenLayers.Format.Filter.v1_0_0();
	var xml = new OpenLayers.Format.XML();
	var xmlPara = "<?xml version='1.0' encoding='UTF-8'?>"
			+ "<wfs:GetFeature service='WFS' version='1.0.0' "
			+ "xmlns:wfs='http://www.opengis.net/wfs' "
			+ "xmlns:gml='http://www.opengis.net/gml' "
			+ "xmlns:ogc='http://www.opengis.net/ogc' "
			+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
			+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd'>"
			+ "<wfs:Query typeName='"+layer+"' srsName='EPSG:4610' >"
			+ xml.write(filter_1_0.write(filter)) + "</wfs:Query>"
			+ "</wfs:GetFeature>";
	// 发送请求
	var request = OpenLayers.Request.POST({
		url : wfs_url,
		data : xmlPara,// 请求数据
		callback : callback
	});
}

// 获取长度，面积的结果赋值 这是之前版本，用一个div output显示测量结果 现版本是分段测距渲染显示效果。此方法被弃用。
function handleMeasurements(event) {
	var geometry = event.geometry;
	var units = event.units;
	var order = event.order;
	var measure = event.measure;
	var element = document.getElementById('output');
	var out = "";
	if (order == 1) {
		out += "长度为: " + measure.toFixed(3) + " " + units;
	} else {
		out += "面积为: " + measure.toFixed(3) + " " + units + "<sup>2</" + "sup>";
	}
	element.innerHTML = out;
}
function setHTML(response) {
	// document.getElementById('nodelist').innerHTML = response.responseText;
};
function clearActivate() {
	mouseRectangle.deactivate();
	mousePoint.deactivate();
	cancelMeasure();
}
// 根据矩形查询
function selectByRectangle() {
	mouseRectangle.activate();
}
// 点选查询
function selectByPnt() {
	// mousePoint.activate();
	toggleControl("selectByPnt");
}

// 矩形框绘制完成，处理查询函数
var selectByRectangleNotice = function(bounds) {
	// alert("selectByRectangleNotice");
	var ll = map.getLonLatFromPixel(new OpenLayers.Pixel(bounds.left,
			bounds.bottom));
	var ur = map.getLonLatFromPixel(new OpenLayers.Pixel(bounds.right,
			bounds.top));
	boxgemetry = new OpenLayers.Bounds(ll.lon.toFixed(4), ll.lat.toFixed(4),
			ur.lon.toFixed(4), ur.lat.toFixed(4));
	// gemetry = new OpenLayers.Bounds(-180,-90,180,90);
	mouseRectangle.deactivate();
	// 框选查询代码

	// 筛选条件对象
	var filter = new OpenLayers.Filter.Logical({
		type : OpenLayers.Filter.Logical.AND,
		filters : [ new OpenLayers.Filter.Spatial({
			type : OpenLayers.Filter.Spatial.INTERSECTS, // INTERSECTS,
															// //相交OK
			value : boxgemetry,
			projection : "EPSG:4610"
		})
		// ,
		// new OpenLayers.Filter.Comparison({//比较操作符
		// type: OpenLayers.Filter.Comparison.LIKE, //模糊查询（通配符：*/#/!），速度很慢
		// property : "china_new:name",
		// value : "*县*"
		// })
		]
	});
	// 构造请求数据
	var filter_1_0 = new OpenLayers.Format.Filter.v1_0_0();
	var xml = new OpenLayers.Format.XML();
	var xmlPara = "<?xml version='1.0' encoding='UTF-8'?>"
			+ "<wfs:GetFeature service='WFS' version='1.0.0' "
			+ "xmlns:wfs='http://www.opengis.net/wfs' "
			+ "xmlns:gml='http://www.opengis.net/gml' "
			+ "xmlns:ogc='http://www.opengis.net/ogc' "
			+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
			+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd'>"
			+ "<wfs:Query typeName='china_new:xinjiang_xian_wgs84' srsName='EPSG:4610' >"
			+ xml.write(filter_1_0.write(filter)) + "</wfs:Query>"
			+ "</wfs:GetFeature>";
	// 发送请求
	var request = OpenLayers.Request.POST({
		url : wfs_url,
		data : xmlPara,// 请求数据
		callback : selectByRectangleQueryHandler
	// 返回信息处理函数
	});
};
//
var queryMarkerPopup;
// 处理查询所返回的信息
function selectByRectangleQueryHandler(req) {

	clearLastResult();// 清除上次查询的标记及要素样式
	// 单独添加，需要处理点选时留下的气泡
	clearPopup();
	var gml = new OpenLayers.Format.GML();
	features = gml.read(req.responseText);
	for (var i = 0; i < features.length; i++) {
		var feature, lonlat, marker;
		var point = features[i].geometry.getCentroid();// 获取要素坐标信息
		// 查询结果展示 实现查询结果高亮显示
		feature = features[i];
		// 高亮显示
		switch (feature.geometry.CLASS_NAME) {
		case "OpenLayers.Geometry.MultiPolygon": {
			var polygon = feature.geometry.components[0].clone();
			var vec = new OpenLayers.Feature.Vector(polygon);
			queryResultLayer.addFeatures([ vec ]);
		}
			break;
		}
		// 添加选中要素详细查询标注
		marker = new OpenLayers.Marker(new OpenLayers.LonLat(point.x, point.y));
		marker.setOpacity(255);
		var obj = {
			lonlat : new OpenLayers.LonLat(point.x, point.y),
			attributes : feature.attributes
		};
		marker.events.register('click', obj, function() {
			alert('markerClick');
			clearPopup();
			// 注册单击事件
			queryMarkerPopup = new OpenLayers.Popup.FramedCloud("chicken",
					new OpenLayers.LonLat(this.lonlat.lon, this.lonlat.lat),
					null, "<div style='font-size:.8em'>地区: "
							+ this.attributes.name + "<br />面积: "
							+ this.attributes.AREA + "</div>", null, true,
					onPopupClose);
			// feature.popup = popup;

			map.addPopup(queryMarkerPopup);
			queryMarkerPopup.autoSize = false;
			// popup.hide();
		});
		marker_layer.addMarker(marker);// 添加当前位置标记
	}

}
function selectByPointNotice(pnt) {

	// mousePoint.deactivate();
	// 框选查询代码

	// 筛选条件对象
	var filter = new OpenLayers.Filter.Logical({
		type : OpenLayers.Filter.Logical.AND,
		filters : [ new OpenLayers.Filter.Spatial({
			type : OpenLayers.Filter.Spatial.INTERSECTS, // INTERSECTS,
															// //相交OK
			value : pnt,
			projection : "EPSG:4610"
		})
		// ,
		// new OpenLayers.Filter.Comparison({//比较操作符
		// type: OpenLayers.Filter.Comparison.LIKE, //模糊查询（通配符：*/#/!），速度很慢
		// property : "china_new:name",
		// value : "*县*"
		// })
		]
	});
	// 构造请求数据
	var filter_1_0 = new OpenLayers.Format.Filter.v1_0_0();
	var xml = new OpenLayers.Format.XML();
	var xmlPara = "<?xml version='1.0' encoding='UTF-8'?>"
			+ "<wfs:GetFeature service='WFS' version='1.0.0' "
			+ "xmlns:wfs='http://www.opengis.net/wfs' "
			+ "xmlns:gml='http://www.opengis.net/gml' "
			+ "xmlns:ogc='http://www.opengis.net/ogc' "
			+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
			+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd'>"
			+ "<wfs:Query typeName='china_new:xinjiang_xian_wgs84' srsName='EPSG:4610' >"
			+ xml.write(filter_1_0.write(filter)) + "</wfs:Query>"
			+ "</wfs:GetFeature>";
	// 发送请求
	var request = OpenLayers.Request.POST({
		url : wfs_url,
		data : xmlPara,// 请求数据
		callback : selectByPointQueryHandler
	// 返回信息处理函数
	});
}
function selectByPointQueryHandler(req) {
	clearLastResult();// 清除上次查询的标记及要素样式
	var gml = new OpenLayers.Format.GML();
	features = gml.read(req.responseText);
	for (var i = 0; i < features.length; i++) {
		var feature, lonlat, marker;
		var point = features[i].geometry.getCentroid();// 获取要素坐标信息
		// 查询结果展示 实现查询结果高亮显示
		feature = features[i];
		// 高亮显示
		switch (feature.geometry.CLASS_NAME) {
		case "OpenLayers.Geometry.MultiPolygon": {
			var polygon = feature.geometry.components[0].clone();
			var vec = new OpenLayers.Feature.Vector(polygon);
			queryResultLayer.addFeatures([ vec ]);
		}
			break;
		}
		clearPopup();
		// 添加弹出气泡
		queryMarkerPopup = new OpenLayers.Popup.FramedCloud("chicken",
				new OpenLayers.LonLat(point.x, point.y), null,
				"<div style='font-size:.8em'>地区: " + feature.attributes.name
						+ "<br />面积: " + feature.attributes.AREA + "</div>",
				null, true, onClickQueryPopupClose);
		map.addPopup(queryMarkerPopup);
		queryMarkerPopup.autoSize = false;
	}
}
// 关闭popup事件
function onPopupClose() {
	this.hide();
}
function onClickQueryPopupClose() {
	clearQueryResultLayer();
	this.hide();
}
function clearPopup() {
	if (queryMarkerPopup) {
		map.removePopup(queryMarkerPopup);
	}
}

// 专题图示例1
function thematicmap_test1() {
	// 查询指定县
	// 筛选条件对象
	var filter = new OpenLayers.Filter.Logical({
		type : OpenLayers.Filter.Logical.AND,
		filters : [ new OpenLayers.Filter.Comparison({// 比较操作符
			type : OpenLayers.Filter.Comparison.LIKE, // 模糊查询（通配符：*/#/!），速度很慢
			property : "china_new:name",
			value : "**"
		}) ]
	});
	// 构造请求数据
	var filter_1_0 = new OpenLayers.Format.Filter.v1_0_0();
	var xml = new OpenLayers.Format.XML();
	var xmlPara = "<?xml version='1.0' encoding='UTF-8'?>"
			+ "<wfs:GetFeature service='WFS' version='1.0.0' "
			+ "xmlns:wfs='http://www.opengis.net/wfs' "
			+ "xmlns:gml='http://www.opengis.net/gml' "
			+ "xmlns:ogc='http://www.opengis.net/ogc' "
			+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
			+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd'>"
			+ "<wfs:Query typeName='china_new:xinjiang_xian_wgs84' srsName='EPSG:4610' >"
			+ xml.write(filter_1_0.write(filter)) + "</wfs:Query>"
			+ "</wfs:GetFeature>";
	// 发送请求
	var request = OpenLayers.Request.POST({
		url : wfs_url,
		data : xmlPara,// 请求数据
		callback : thematicmap_query
	// 返回信息处理函数
	});
}
function thematicmap_query(req) {
	clearThematicMapLayer();// 清除上次查询的标记及要素样式
	var gml = new OpenLayers.Format.GML();
	var features = gml.read(req.responseText);
	for (var i = 0; i < features.length; i++) {
		var feature, lonlat, marker;
		var point = features[i].geometry.getCentroid();// 获取要素坐标信息
		// 查询结果展示 实现查询结果高亮显示
		feature = features[i];
		// 高亮显示
		switch (feature.geometry.CLASS_NAME) {
		case "OpenLayers.Geometry.MultiPolygon": {
			var polygon = feature.geometry.components[0].clone();
			var vec = new OpenLayers.Feature.Vector(polygon);
			vec.style = array[i % 4];
			thematicmapLayer.addFeatures([ vec ]);
		}
			break;
		}
	}
}
var array = [ {
	strokeColor : "#0000FF",
	strokeWidth : 4,
	strokeOpacity : 0,
	fillColor : "#006600",
	fillOpacity : 0.5,
	pointRadius : 6,
	pointerEvents : "visiblePainted"
// ,
// label with \n linebreaks
// label : "<div>adsl1</div>",
// fontSize: "12px",
// fontFamily: "Courier New, monospace",
// fontWeight: "bold",
// labelOutlineWidth: 3
}, {
	strokeColor : "#0000FF",
	strokeWidth : 4,
	strokeOpacity : 0,
	fillColor : "#005B00",
	fillOpacity : 0.5,
	pointRadius : 6,
	pointerEvents : "visiblePainted"
}, {
	strokeColor : "#0000FF",
	strokeWidth : 4,
	strokeOpacity : 0,
	fillColor : "#00C600",
	fillOpacity : 0.5,
	pointRadius : 6,
	pointerEvents : "visiblePainted"
}, {
	strokeColor : "#0000FF",
	strokeWidth : 8,
	strokeOpacity : 0.0,
	fillColor : "#38FE38",
	fillOpacity : 0.5,
	pointRadius : 6,
	pointerEvents : "visiblePainted"
} ];