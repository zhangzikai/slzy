var map;
MAP = {
	resultLen: [],
	//注记图层markers
    measureVectorLayer: null
};
var measureCompleteFlag=0;
var style_measurePolyLine={
                strokeColor: "#0000FF",
                strokeWidth: 4,
                strokeOpacity: 0.5,
                strokeDashstyle: "solid"
            };
var wms_url = "http://106.3.37.57:8080/geoserver/china_new/wms";
var wfs_url ="http://106.3.37.57:8080/geoserver/wfs";
var wms_layer = "china2";
var marker_layer = null;
var Markers;
// var MAP;
// var MAP_layer=null;

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
var bounds;
var format;

// 加载地图

function init() {
	
	format = 'image/png';
	bounds = new OpenLayers.Bounds(
            73.45169014816452, 34.34890455490401,
                    96.3955537468038, 49.17405094034398
        );
	 var options = {
             controls: [],
             maxExtent: bounds,
             maxResolution: 0.2403272824874467,
             projection: "EPSG:4326",
             units: 'degrees'
         };
	 map = new OpenLayers.Map('center1',options);// 新建地图
	 // 底图
     // setup single tiled layer
     untiled = new OpenLayers.Layer.WMS(
         "中国", wms_url,
         {
             LAYERS: 'china_new:xinjiang_xian_wgs84',
             STYLES: '',
             format: format
         },
         {
            singleTile: true, 
            ratio: 1,
            transitionEffect:'resize',			
            isBaseLayer: true,
            yx : {'EPSG:4326' : true}
         } 
     );

	// 交互图层
	// vectors = new OpenLayers.Layer.Vector("WFS", {
		// strategies : [ new OpenLayers.Strategy.BBOX() ],
		// projection : new OpenLayers.Projection("EPSG:4326"),
		// protocol : new OpenLayers.Protocol.WFS({
			// version : "1.1.0",
			// url : wms_url,
			// featureType : "xinjiang_xian_wgs84",
			// featureNS : "www.chinanew.com"
		// }),
		// styleMap : styleMap// 设置地图样式
	// });
	
	   // drawControls = {
            // polygon: selectControl1,
            // select: selectControl
        // };
        // // map.addControl(drawControls['select']);
        // // drawControls['select'].activate();
		// map.addControl(drawControls['polygon']);
        // drawControls['polygon'].activate();
	//添加框选绘制控件 yangzhenxing
     boxcontrol = new OpenLayers.Control();
     OpenLayers.Util.extend( boxcontrol, 
		 {
			draw: function () 
			{
				mouseRectangle = new OpenLayers.Handler.Box( boxcontrol, {"done": this.notice} );
			},
			notice: selectByRectangleNotice
		}
	);
    map.addControl(boxcontrol);
	//绘制点控件
	var pointcontrol = new OpenLayers.Control();
	OpenLayers.Util.extend( pointcontrol, 
		 {
			draw: function () 
			{
				mousePoint = new OpenLayers.Handler.Point( pointcontrol, {"done": this.notice} );
			},
			notice: selectByPointNotice
		}
	);
    map.addControl(pointcontrol);

	
	//添加新的临时图层,yangzhenxing11-03
	queryResultLayer = new OpenLayers.Layer.Vector("查询结果", {
			styleMap: new OpenLayers.StyleMap({
            'default': {
                strokeColor: "#00FF00",
                strokeOpacity: 1,
                strokeWidth: 3,
                fillColor: "#FF5500",
                fillOpacity: 0.5,
                pointRadius: 6,
                pointerEvents: "visiblePainted"
				//,
                // label with \n linebreaks
                // label: "${dis}",
                // fontColor: "${favColor}",
                // fontSize: "12px",
                // fontFamily: "Courier New, monospace",
                // fontWeight: "bold",
                // labelAlign: "${align}",
                // labelXOffset: "${xOffset}",
                // labelYOffset: "${yOffset}",
                // labelOutlineColor: "white",
                // labelOutlineWidth: 3
            }
        })
		//,renderers: measureLabelrenderer
    });	
	map.addLayers([queryResultLayer]);
	
	//添加专题图临时图层
	thematicmapLayer = new OpenLayers.Layer.Vector("专题图", {});	
	map.addLayers([thematicmapLayer]);
	
	// vectors = new OpenLayers.Layer.Vector("WFS", {
	// strategies : [ new OpenLayers.Strategy.Fixed() ],
	// strategies : [ new OpenLayers.Strategy.BBOX() ],
	// projection : new OpenLayers.Projection("EPSG:4326"),
	// protocol : new OpenLayers.Protocol.WFS({
	// version : "1.1.0",
	// url : "http://192.168.0.125:8080/geoserver/wfs",
	// featureType : "china2",
	// featurePrefix : "china",
	// featureNS : "http://www.mywebsite.com/china" , geometryName : "the_geom"
	// }),
	// styleMap : styleMap
	//	});
	// 标记图层
	marker_layer = new OpenLayers.Layer.Markers("标注点");
	// MAP_layer=new OpenLayers.Layer.Markers("MAP")
	//var gphy = new OpenLayers.Layer.Google(
          //  "Google Physical",
           // {type: G_PHYSICAL_MAP}
      //  );
      //  var gmap = new OpenLayers.Layer.Google(
          //  "Google Streets", // the default
        //    {numZoomLevels: 20}
     //   );
      //  var ghyb = new OpenLayers.Layer.Google(
      //      "Google Hybrid",
      //      {type: G_HYBRID_MAP, numZoomLevels: 20}
      //  );
      //  var gsat = new OpenLayers.Layer.Google(
      //      "Google Satellite",
      //      {type: G_SATELLITE_MAP, numZoomLevels: 22}
       // );

//        this.displayProjection=new OpenLayers.Projection("EPSG:4326"); 
//        map.addLayers([gphy, gmap, ghyb, gsat, untiled,vectors, marker_layer]);
//	      map.addLayer(markers);
    // new OpenLayers.Control.ZoomBox({ title: "放大" });
	// zoomOut=new OpenLayers.Control.ZoomBox({ out: true, title: "缩小" });
	map.addLayers([untiled,  marker_layer ]);// 添加图层
	map.addControls([ new OpenLayers.Control.Navigation(),// 用来控制地图与鼠标事件的互动，如拖曳，缩放，滚动，双击
	              	new OpenLayers.Control.Attribution(),// 允许通过layer向map添加属性
	              	new OpenLayers.Control.OverviewMap(), 
					new OpenLayers.Control.PanZoomBar(),
					// zoomIn=new OpenLayers.Control.ZoomBox({ title: "放大" }),
					// zoomOut=new OpenLayers.Control.ZoomBox({ out: true, title: "缩小" }),
	              			new OpenLayers.Control.LayerSwitcher({div:document.getElementById('west')}),
	              		    new OpenLayers.Control.Scale(),
	              			new OpenLayers.Control.MousePosition() ]);
	map.zoomToExtent(bounds,2);
	//map.events.register("click", map, onMapClick);
	// document.write("<script src='./lib/OpenLayers.js' type='text/javascript' ></script>");
	// map.addControls([new OpenLayers.Control.LayerSwitcher(),
	              			 // new OpenLayers.Control.Scale()]);
	
//	---------------------------------------------------------------------
	var sketchSymbolizers = {
	        "Point": {
	            pointRadius: 4,	
	            graphicName: "square",
	            fillColor: "white",
	            fillOpacity: 1,
	            strokeWidth: 1,
	            strokeOpacity: 1,
	            strokeColor: "#333333"
	        },
	        "Line": {
	            strokeWidth: 3,
	            strokeOpacity: 1,
	            strokeColor: "#666666",
	            strokeDashstyle: "dash"
	        },
	        "Polygon": {
	            strokeWidth: 2,
	            strokeOpacity: 1,
	            strokeColor: "#666666",
	            fillColor: "white",
	            fillOpacity: 0.3
	        }
	    };
	    var style = new OpenLayers.Style();
	    style.addRules([
	        new OpenLayers.Rule({symbolizer: sketchSymbolizers})
	    ]);
		 var styleMapmeasure = new OpenLayers.StyleMap({"default": style});
		 var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
         renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
		 
		 // selectControlPolygon = new OpenLayers.Control.SelectFeature(vectors,
            // {clickout: false, toggle: false, 
			 // multiple: false, hover: false,onSelect: onFeatureSelect, onUnselect: onFeatureUnselect,box: true});

		// selectControl = new OpenLayers.Control.SelectFeature(vectors,
            // {clickout: false, toggle: false,
			 // multiple: false, hover: false,onSelect: onFeatureSelect, onUnselect: onFeatureUnselect});
		measureControls = 
		{
             line: new OpenLayers.Control.Measure(
                 OpenLayers.Handler.Path, {
                     persist: true,
                     handlerOptions: {
                         layerOptions: {
							 styleMap: styleMapmeasure,
							 renderers: renderer
						 }
                     },
					 measureComplete: measureCompleteCallback,
					 measure:measureCallback
                 }
			 ),
                polygon: new OpenLayers.Control.Measure(
                    OpenLayers.Handler.Polygon, {
                        persist: true,
                        handlerOptions: {
                            layerOptions: {
							styleMap: styleMapmeasure,
							renderers: renderer
							}
                        },
						measureComplete: measureCompleteCallback,
						measure:measureCallback
                    }
                )
				// ,
				// selectByPnt:selectControl
         };
			var control;
            for(var key in measureControls) {
                control = measureControls[key];
                // control.events.on({
                    // "measure": handleMeasurements,
                    // "measurepartial": handleMeasurements
                // });
                map.addControl(control);
            }
			/***************************END************点，线、面积测量*****************************************/

			  //添加点标注的图层
			  // markers = new OpenLayers.Layer.Markers("markers");
              // map.addLayer(markers);  
			  // markers.setZIndex(200);
			     //添加量测图层measureVectorLayer     by yanlin   2013.07.24 
			var measureLabelrenderer;
			measureLabelrenderer = OpenLayers.Util.getParameters(window.location.href).measureLabelrenderer;
			measureLabelrenderer = (measureLabelrenderer) ? [measureLabelrenderer] : OpenLayers.Layer.Vector.prototype.renderers;
			MAP.measureVectorLayer = new OpenLayers.Layer.Vector("测量", {
			styleMap: new OpenLayers.StyleMap({
            'default': {
                strokeColor: "#00FF00",
                strokeOpacity: 1,
                strokeWidth: 3,
                fillColor: "#FF5500",
                fillOpacity: 0.5,
                pointRadius: 6,
                pointerEvents: "visiblePainted",
                // label with \n linebreaks
                label: "${dis}",
                fontColor: "${favColor}",
                fontSize: "12px",
                fontFamily: "Courier New, monospace",
                fontWeight: "bold",
                labelAlign: "${align}",
                labelXOffset: "${xOffset}",
                labelYOffset: "${yOffset}",
                labelOutlineColor: "white",
                labelOutlineWidth: 3
            }
        }),
        renderers: measureLabelrenderer
    });		
	map.addLayers([MAP.measureVectorLayer]);
}
//框选查询变量 yangzhenxing
//控制鼠标时间对象
var mouseRectangle;
var mousePoint;

//高亮显示 临时图层 yangzhenxing
var queryResultLayer;

//专题图显示 临时图层 yangzhenxing
var thematicmapLayer;

// Feature 选中事件响应
// function onFeatureSelect(feature) 
// {	
	
	// selectedFeature = feature;
    // popup = new OpenLayers.Popup.FramedCloud("chicken", 
                            // feature.geometry.getBounds().getCenterLonLat(),
                             // null,
                             // "<div style='font-size:.8em'>地区: " + feature.attributes.name +"<br />面积: " + feature.geometry.getArea()+"</div>",
                             // null, true, onPopupClose);
    // feature.popup = popup;
    // map.addPopup(popup);
// //    marker = new OpenLayers.Marker(feature.geometry.getBounds().getCenterLonLat());
// //	marker.setOpacity(255);
// //	marker.events.register('mousedown', marker, onMakerMouseDown);
// //	marker_layer.addMarker(marker);// 添加当前位置标记
	// //addMarkers(feature.geometry.getBounds().getCenterLonLat());
// }

function onPopupClose(evt) {
    selectControl.unselect(selectedFeature);
}
// Feature取消选中事件响应
function onFeatureUnselect(feature) 
{
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

//图例渲染	这个暂时无效
function initMarker(){  
    var pm2d5 = new OpenLayers.Layer.Text('WFS',{location:'resource/pm2.5.txt'});  
    var mvi = new OpenLayers.Layer.Text('标注点',{location:'resource/mvi.txt'});  
    var aim = new OpenLayers.Layer.Text('量测',{location:'resource/aim.txt'});  
    map.addLayers([pm2d5,mvi,aim]);  
}
//导出 由于涉及html5暂时无法去做
function Export(){
	
}

//打印
function printMap() {
    var code = "<body onload=window.print()>";
    code += document.getElementById("center1").innerHTML;//获取center1 div
    width = map.viewPortDiv.clientWidth;//获取地图宽度
    height = map.viewPortDiv.clientHeight;
    var newwin = window.open('', '我的地图', 'width=' + width + ',height=' + height + ',resizable=no');
    newwin.opener = null;
    newwin.document.write(code);
    newwin.document.close();
}	
//清除拉框效果
function closezoom(){
	if (this.zoomBox != null) {
            this.zoomBox.deactivate();
        }
}
//判断是拉框放大还是拉框缩小
function deactivateContrl() {
        this.map.clickFun = null;
        if (this.zoomBox != null) {
            this.zoomBox.deactivate();
        }
    }
//拉框放大
function mouseMoveZoomIn() {
    this.deactivateContrl();
    this.zoomTo("in");

}
//拉框缩小
function mouseMoveZoomOut() {
    this.deactivateContrl();
    this.zoomTo("out");
}
//拉框效果
function zoomTo(zoom) {

    if (!this.zoomBox) {

        var movecontrol = new OpenLayers.Control();
        movecontrol.parent = this;
        OpenLayers.Util.extend(movecontrol, {
            draw: function () {

                this.zoomBox = new OpenLayers.Handler.Box(movecontrol,
		    { "done": this.notice },
		    { keyMask: OpenLayers.Handler.MOD_NONE });
                this.zoomBox.activate();
                this.zoomBox.zoom = zoom;
                this.parent.zoomBox = this.zoomBox;

            },
            notice: function (bounds) {
                var ll = this.map.getLonLatFromPixel(new OpenLayers.Pixel(bounds.left, bounds.bottom));
                var ur = this.map.getLonLatFromPixel(new OpenLayers.Pixel(bounds.right, bounds.top));

                var lon = ll.lon + (ur.lon - ll.lon) / 2;
                var lat = ll.lat + (ur.lat - ll.lat) / 2;
                var zoomInNum = this.map.getZoom() - 2;
                if (zoomInNum < 0) { zoomInNum = 0; }

                if (this.zoomBox.zoom == "in" && bounds.left != undefined) {

                    this.parent.map.setCenter(new OpenLayers.LonLat(lon, lat));
                    var bounds = new OpenLayers.Bounds(ll.lon, ll.lat, ur.lon, ur.lat);
                    this.parent.map.zoomToExtent(bounds);

                }
                if (this.zoomBox.zoom == "out") {
                    this.parent.zoomOut();//调用缩小函数
                    this.parent.map.setCenter(new OpenLayers.LonLat(lon, lat));
                }
            }
        });

        this.map.addControl(movecontrol);

    }
    else {
        this.zoomBox.zoom = zoom;
        this.zoomBox.activate();
    }
}
//缩小	
function zoomOut() {
        // var curTimestamp = new Date();
        // var tick = Math.abs(curTimestamp.getTime() - this.timeStamp.getTime());
        // this.timeStamp = curTimestamp;
        // if (tick >= 800) 
            this.map.zoomOut();
        // 
    }

// function setLabel(type) {
	// var label = {
		// "1" : {
			// label : "${name}",
			// fontColor : "red",
			// fontFamily : "Arial",
			// fontSize : 8
		// },
		// "2" : {
			// label : "${name}",
			// fontColor : "black",
			// fontFamily : "Arial",
			// fontSize : 8
		// },
		// "3" : {
			// label : "${name}",
			// fontColor : "red",
			// fontFamily : "Arial",
			// fontSize : 8
		// },
		// "4" : {
			// label : "${name}",
			// fontColor : "black",
			// fontFamily : "Arial",
			// fontSize : 8
		// }
	// };
	// var labelClear = {
		// "1" : {
			// label : ""
		// },
		// "2" : {
			// label : ""
		// },
		// "3" : {
			// label : ""
		// },
		// "4" : {
			// label : ""
		// }
	// };
	// if (document.getElementById(type).checked)
		// styleMap.addUniqueValueRules("default", "id", label);
	// else
		// styleMap.addUniqueValueRules("default", "id", labelClear);
	// // vectors.redraw();

// }
// function setColor(type) {
	// // create a color table for state id code
	// var len = vectors.features.length;
	// var colors = [ "yellow", "green", "blue", "purple" ];
	// var code, id = {};
	// for ( var i = 1; i <= 4; i++) {
		// code = i;
		// id[code] = {
			// fillColor : colors[i - 1]
		// };
	// }
	// // add unique value rules with your color lookup
	// styleMap.addUniqueValueRules("default", "id", id);
	// if (document.getElementById(type).checked) {
		// styleMapTemp = "color";

		// for ( var i = 0; i < len; i++) {
			// vectors.drawFeature(vectors.getFeaturesByAttribute("LD", i
					// .toString())[0], styleMapTemp);
		// }
	// } else {
		// styleMapTemp = "default";

		// for ( var i = 0; i < len; i++) {
			// vectors.drawFeature(vectors.getFeaturesByAttribute("LD", i
					// .toString())[0], styleMapTemp);
		// }
	// }
// }
// 模糊查询
function query(text) {
	// 过滤条件
	var filter = new OpenLayers.Filter.Comparison({
		type : OpenLayers.Filter.Comparison.LIKE,
		property : "china_new:name",
		value : "*" + text + "*"
	});
	var filter = new OpenLayers.Filter.Logical({
                type: OpenLayers.Filter.Logical.AND,        
                filters: [
                 new OpenLayers.Filter.Comparison({//比较操作符
                 type: OpenLayers.Filter.Comparison.LIKE,
                 property: "china_new:name",
                 value: "*"+text+"*"
                 })
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
			+ "<wfs:Query typeName='china_new:xinjiang_xian_wgs84' srsName='EPSG:4326' >"
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

             // XMLHttpReq.send(xmlPara);  // 发送请求


}
// var XMLHttpReq = true;
// //创建xmlHttpRequest对象
// function createXMLHttpRequest() {

            // if(window.XMLHttpRequest) { //Mozilla 浏览器

                  // XMLHttpReq = new XMLHttpRequest();

            // }

            // else if (window.ActiveXObject) { // IE浏览器

                  // try {

                         // XMLHttpReq = new ActiveXObject("Msxml2.XMLHTTP");

                  // } catch (e) {

                         // try {

                                // XMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP");

                         // } catch (e) {}

                  // }

            // }

// }
// // 处理返回信息函数

      // function processResponse() {

      // if (XMLHttpReq.readyState == 4) { // 判断对象状态

            // if (XMLHttpReq.status == 200) { // 信息已经成功返回，开始处理信息

                  // var res=XMLHttpReq.responseText;

                    // window.alert(res);

                 // } else { //页面不正常

                       // window.alert("您所请求的页面有异常。");

                 // }

          // }

      // }
var point = null;
var marker = null;
var features = null;
var nameTemp = null;

//搜索使用到的对象定义
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
		showQueryResultByPage(p,pn);
	};
	pageNav.navGo(1, (queryResultFeatures.length%10==0?queryResultFeatures.length/10:(queryResultFeatures.length-queryResultFeatures.length%10)/10+1));
	// var result = "<table width='100%' border='1' align='center' bgcolor='#D9E7F8'><tr><th align='center'>Name</th><th align='center'>Area</th></tr>";
	// for ( var i = 0; i < queryResultFeatures.length; i++) {
		// var point = queryResultFeatures[i].geometry.getCentroid();// 获取要素坐标信息
		// var name = queryResultFeatures[i].attributes.name;// 获取要素属性信息
		// var area = queryResultFeatures[i].attributes.AREA;
		// // 定义点击定位事件
		// result += "<tr><td align='center'><a href='#0' onclick=\"setCenterAndStyle("
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
//地图展示需要根据分页完成,每页10条数据（固定）
function showQueryResultByPage(pageNum,pageCount){
	clearLastResult();// 清除上次查询的标记及要素样式
	if(queryMarkerPopup){
		map.removePopup(queryMarkerPopup);
	}
	var pageContentHtml = "";
	var count;
	if(queryResultFeatures.length>=pageNum*10){
		count = pageNum*10;
	}else{
		count = queryResultFeatures.length;
	}
	for(var i = (pageNum-1)*10 ; i<count ; i++ ){
			var feature = queryResultFeatures[i];
			var point = feature.geometry.getCentroid();// 获取要素坐标信息
			//添加选中要素详细查询标注
			var marker = null;
			var onclickHtml = "onclick = \"centerRecordAndPopupInfo("+point.x+","+point.y+","+"'"+feature.attributes.name+"'"+","+"'"+feature.attributes.AREA+"'"+")\"";
			switch(i%10)
			{
				case 0:
					marker = new OpenLayers.Marker(new OpenLayers.LonLat(point.x, point.y),new OpenLayers.Icon('images/location/a.png',new OpenLayers.Size(21,33)));
					pageContentHtml +="<div class='queryResultRecord' "+onclickHtml+"><img src='images/location/a.png' alt='' /><p class='recordTitle'>"+feature.attributes.name+"</p></div>";
					break;
				case 1:
					marker = new OpenLayers.Marker(new OpenLayers.LonLat(point.x, point.y),new OpenLayers.Icon('images/location/b.png',new OpenLayers.Size(21,33)));
					pageContentHtml +="<div class='queryResultRecord' "+onclickHtml+"><img src='images/location/b.png' alt='' /><p class='recordTitle'>"+feature.attributes.name+"</p></div>";
					break;
				case 2:
					marker = new OpenLayers.Marker(new OpenLayers.LonLat(point.x, point.y),new OpenLayers.Icon('images/location/c.png',new OpenLayers.Size(21,33)));
					pageContentHtml +="<div class='queryResultRecord' "+onclickHtml+"><img src='images/location/c.png' alt='' /><p class='recordTitle'>"+feature.attributes.name+"</p></div>";
					break;
				case 3:
					marker = new OpenLayers.Marker(new OpenLayers.LonLat(point.x, point.y),new OpenLayers.Icon('images/location/d.png',new OpenLayers.Size(21,33)));
					pageContentHtml +="<div class='queryResultRecord' "+onclickHtml+"><img src='images/location/d.png' alt='' /><p class='recordTitle'>"+feature.attributes.name+"</p></div>";
					break;
				case 4:
					marker = new OpenLayers.Marker(new OpenLayers.LonLat(point.x, point.y),new OpenLayers.Icon('images/location/e.png',new OpenLayers.Size(21,33)));
					pageContentHtml +="<div class='queryResultRecord' "+onclickHtml+"><img src='images/location/e.png' alt='' /><p class='recordTitle'>"+feature.attributes.name+"</p></div>";
					break;
				case 5:
					marker = new OpenLayers.Marker(new OpenLayers.LonLat(point.x, point.y),new OpenLayers.Icon('images/location/f.png',new OpenLayers.Size(21,33)));
					pageContentHtml +="<div class='queryResultRecord' "+onclickHtml+"><img src='images/location/f.png' alt='' /><p class='recordTitle'>"+feature.attributes.name+"</p></div>";
					break;
				case 6:
					marker = new OpenLayers.Marker(new OpenLayers.LonLat(point.x, point.y),new OpenLayers.Icon('images/location/g.png',new OpenLayers.Size(21,33)));
					pageContentHtml +="<div class='queryResultRecord' "+onclickHtml+"><img src='images/location/g.png' alt='' /><p class='recordTitle'>"+feature.attributes.name+"</p></div>";
					break;
				case 7:
					marker = new OpenLayers.Marker(new OpenLayers.LonLat(point.x, point.y),new OpenLayers.Icon('images/location/h.png',new OpenLayers.Size(21,33)));
					pageContentHtml +="<div class='queryResultRecord' "+onclickHtml+"><img src='images/location/h.png' alt='' /><p class='recordTitle'>"+feature.attributes.name+"</p></div>";
					break;
				case 8:
					marker = new OpenLayers.Marker(new OpenLayers.LonLat(point.x, point.y),new OpenLayers.Icon('images/location/i.png',new OpenLayers.Size(21,33)));
					pageContentHtml +="<div class='queryResultRecord' "+onclickHtml+"><img src='images/location/i.png' alt='' /><p class='recordTitle'>"+feature.attributes.name+"</p></div>";
					break;
				case 9:
					marker = new OpenLayers.Marker(new OpenLayers.LonLat(point.x, point.y),new OpenLayers.Icon('images/location/j.png',new OpenLayers.Size(21,33)));
					pageContentHtml +="<div class='queryResultRecord' "+onclickHtml+"><img src='images/location/j.png' alt='' /><p class='recordTitle'>"+feature.attributes.name+"</p></div>";
					break;
			}
			marker.setOpacity(255);
			var obj = {lonlat:new OpenLayers.LonLat(point.x, point.y),attributes:feature.attributes };
			marker.events.register('click', obj,
				function(){
					if(queryMarkerPopup){
						map.removePopup(queryMarkerPopup);
					}
					//注册单击事件
					queryMarkerPopup = new OpenLayers.Popup.FramedCloud("chicken", 
										new OpenLayers.LonLat(this.lonlat.lon,this.lonlat.lat),
										null,
										"<div style='font-size:.8em'>地区: " + this.attributes.name +"<br />面积: "+ this.attributes.AREA +"</div>",
										null, true, onPopupClose);
					map.addPopup(queryMarkerPopup);
					queryMarkerPopup.autoSize=false;
				 } 
			);
			
			marker_layer.addMarker(marker);// 添加当前位置标记
			
	}
	$("#pagecontent").html(pageContentHtml);
}
//查询结果记录单击处理函数，定位和详细信息气泡
function centerRecordAndPopupInfo(x,y,name,AREA){

	//定位
	map.setCenter(new OpenLayers.LonLat(x, y));// 定位
	//详细信息气泡
	if(queryMarkerPopup){
		map.removePopup(queryMarkerPopup);
	}
	//注册单击事件
	queryMarkerPopup = new OpenLayers.Popup.FramedCloud("chicken", 
					new OpenLayers.LonLat(x,y),
					null,
					"<div style='font-size:.8em'>地区: " + name +"<br />面积: "+ AREA +"</div>",
					null, true, onPopupClose);
	map.addPopup(queryMarkerPopup);
	queryMarkerPopup.autoSize=false;
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
	// vectors.drawFeature(vectors.getFeaturesByAttribute("name", name)[0],highlightTemp);// 通过属性获取当前地图要素并高亮显示
	// nameTemp = name;
}

//清除地物标注
function clearMarkerAndStyle() {
	//清除所有标记图标 yangzhenxing 修改
	marker_layer.clearMarkers();
	
	// if (nameTemp != null) {
		// // 清除上次查询的高亮设置
		// vectors.drawFeature(
				// vectors.getFeaturesByAttribute("name", nameTemp)[0],
				// styleMapTemp);
	// }
}
//清除查询高亮图层
function clearQueryResultLayer(){
	queryResultLayer.removeAllFeatures();
}
//清除上次的查询结果
function clearLastResult(){
	clearMarkerAndStyle();
	clearQueryResultLayer();
}
//专题图图层
function clearThematicMapLayer(){
	thematicmapLayer.removeAllFeatures();
}
var buttonClicked;
function onMapClick(e) {
	var lonlat = map.getLonLatFromViewPortPx(e.xy);
	//var str = "[Map]:" + lonlat.lat + "," + lonlat.lon;
	// document.getElementById("output").innerHTML = str;
	//document.getElementById('nodelist').innerHTML = "Loading... please wait...";
	var params = {
		REQUEST : "GetFeatureInfo",
		EXCEPTIONS : "application/vnd.ogc.se_xml",
		BBOX : map.getExtent().toBBOX(),
		SERVICE : "WMS",
		VERSION : "1.1.1",
		X : e.xy.x,
		Y : e.xy.y,
		INFO_FORMAT : 'application/vnd.ogc.gml',
		QUERY_LAYERS : map.layers[0].params.LAYERS,
		FEATURE_COUNT : 50,
		Layers : wms_layer,
		WIDTH : map.size.w,
		HEIGHT : map.size.h,
		format : "image/png",
		styles : map.layers[0].params.STYLES,
		srs : map.layers[0].params.SRS
	};
//	OpenLayers.loadURL(wms_url, params, this, onComplete, onFailure);
	if (buttonClicked == 'selectByPnt') {
		OpenLayers.loadURL(wms_url, params, this, onComplete, onFailure);
	}
	tpoint = map.getLonLatFromPixel(e.xy), OpenLayers.Event.stop(e);
}
var popup1;
function onComplete(response) {
	
	var g = new OpenLayers.Format.GML();
	var features = g.read(response.responseText);
	var tempstr = '';
	var nm = '';
	for ( var i = 0; i < features.length; i++) {
		tempstr += 'name:&nbsp';
		nm = features[i].attributes.name; // 获取属性的时候
		tempstr += nm;
		tempstr += '&nbsp&nbsp&nbspAREA:&nbsp';
		nm = features[i].attributes.AREA;
		tempstr += nm + '<br>';
	}
	if (popup1 != null) {
		map.removePopup(popup1);
	}
	popup1 = new OpenLayers.Popup.FramedCloud("chicken", tpoint,
			new OpenLayers.Size(200, 200), tempstr, null, true);
	popup1.autoSize = true;
	map.addPopup(popup1);
}
function onFailure(response) {
	alert("onFailure");
}
// 缩小
function zoomout() {
	mouseMoveZoomOut();
}
// 放大
function zoomin() {
	 mouseMoveZoomIn();
}
//复位
function zoomToExtent() {
	map.zoomToExtent(bounds,2);
}
//切换鼠标事件功能
function toggleControl(_value) {
	for (key in measureControls) {
		var control = measureControls[key];
		if (_value == key) {
			//激活测量状态，注意清除上次记录
			control.activate();
			MAP.resultLen.length=0;
			MAP.resultLen=[];
		} else {
			control.deactivate();
		}
	}
	buttonClicked = _value;
}
//双击完成测量时触发
function measureCompleteCallback(geometry){
		var stat, unit;
		if(geometry.CLASS_NAME.indexOf('LineString') > -1) {
			stat = this.getBestLength(geometry);
			if(stat[1]=="m")
				unit="米";
			else
				unit="千米";
			MAP.resultLen.push(stat[0].toFixed(3)+" "+unit);
		} else {
			stat = this.getBestArea(geometry);
			if(stat[1]=="m")
				unit="平方米";
			else
				unit="平方千米";
			MAP.resultLen.push(stat[0].toFixed(3)+" "+unit);
		}
		if(geometry.CLASS_NAME.indexOf('LineString') > -1) {
			for(var i=0;i<geometry.components.length;i++)
			{
				var labelOffsetPoint = new OpenLayers.Geometry.Point(geometry.components[i].x, geometry.components[i].y);
				var labelOffsetFeature = new OpenLayers.Feature.Vector(labelOffsetPoint);
				labelOffsetFeature.attributes = {
					dis: MAP.resultLen[i-1]?MAP.resultLen[i-1]:0,
					favColor: 'blue',
					align: "cm",
					// positive value moves the label to the right
					xOffset: 50,
					// negative value moves the label down
					yOffset: -15
				};
				MAP.measureVectorLayer.addFeatures([labelOffsetFeature]);
			}
			MAP.measureVectorLayer.addFeatures(new OpenLayers.Feature.Vector(geometry,null,style_measurePolyLine));
		}else{
			var linearRing = new OpenLayers.Geometry.LinearRing(geometry.components[0].components);
			var polygonFeature = new OpenLayers.Feature.Vector(
			new OpenLayers.Geometry.Polygon(linearRing));
			polygonFeature.attributes = {
		    dis: MAP.resultLen[MAP.resultLen.length-1],
				favColor: 'purple',
				align: 'lb'
			};
			MAP.measureVectorLayer.addFeatures([polygonFeature]);
		}
		MAP.resultLen.length=0;
		MAP.resultLen=[];
	}
//每点击一个测量点时触发，保存每段的测量长度
function measureCallback(geometry,eventType){
	var stat, unit;
	if(geometry.CLASS_NAME.indexOf('LineString') > -1) {
		stat = this.getBestLength(geometry);
		if(stat[1]=="m")
			unit="米";
		else
			unit="千米";
		MAP.resultLen.push(stat[0].toFixed(3)+" "+unit);
	}
}
function cancelMeasure()
{
	toggleControl('none');
}
function clearMeasure(){
	toggleControl('none');
	MAP.measureVectorLayer.removeAllFeatures();
} 
  
//获取长度，面积的结果赋值   这是之前版本，用一个div output显示测量结果 现版本是分段测距渲染显示效果。此方法被弃用。
function handleMeasurements(event) {
    var geometry = event.geometry;
    var units = event.units;
    var order = event.order;
    var measure = event.measure;
    var element = document.getElementById('output');
    var out = "";
    if(order == 1) {
        out += "长度为: " + measure.toFixed(3) + " " + units;
    } else {
        out += "面积为: " + measure.toFixed(3) + " " + units + "<sup>2</" + "sup>";
    }
    element.innerHTML = out;
}
function setHTML(response){
	//document.getElementById('nodelist').innerHTML = response.responseText;
};
function clearActivate(){
	mouseRectangle.deactivate();
	mousePoint.deactivate();
	cancelMeasure();
}
//根据矩形查询
function selectByRectangle(){
	mouseRectangle.activate();
}
//点选查询
function selectByPnt(){
	mousePoint.activate();
}

//矩形框绘制完成，处理查询函数
var selectByRectangleNotice = function(bounds){
	//alert("selectByRectangleNotice");
	 var ll = map.getLonLatFromPixel(new OpenLayers.Pixel(bounds.left, bounds.bottom));  
          var ur = map.getLonLatFromPixel(new OpenLayers.Pixel(bounds.right, bounds.top));   
     boxgemetry=new OpenLayers.Bounds(ll.lon.toFixed(4), ll.lat.toFixed(4),ur.lon.toFixed(4),ur.lat.toFixed(4));
	 //gemetry = new OpenLayers.Bounds(-180,-90,180,90);
	 mouseRectangle.deactivate();
	//框选查询代码
	
	//筛选条件对象
	var filter = new OpenLayers.Filter.Logical(
		{
			type: OpenLayers.Filter.Logical.AND,
			filters: [
				new OpenLayers.Filter.Spatial({
					 type: OpenLayers.Filter.Spatial.INTERSECTS, //INTERSECTS, //相交OK
					 value: boxgemetry,
					 projection: "EPSG:4326"
				})
				// ,
				 // new OpenLayers.Filter.Comparison({//比较操作符
					 // type: OpenLayers.Filter.Comparison.LIKE, //模糊查询（通配符：*/#/!），速度很慢
					 // property : "china_new:name",
					 // value : "*县*"
				 // })
			 ]
		}
	);
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
			+ "<wfs:Query typeName='china_new:xinjiang_xian_wgs84' srsName='EPSG:4326' >"
			+ xml.write(filter_1_0.write(filter)) + "</wfs:Query>"
			+ "</wfs:GetFeature>";
	// 发送请求
	var request = OpenLayers.Request.POST({
		url : wfs_url,
		data : xmlPara,// 请求数据
		callback : selectByRectangleQueryHandler// 返回信息处理函数
	});
};
//
var queryMarkerPopup;
// 处理查询所返回的信息
function selectByRectangleQueryHandler(req) {
	
	clearLastResult();// 清除上次查询的标记及要素样式
	//单独添加，需要处理点选时留下的气泡
	clearPopup();
	var gml = new OpenLayers.Format.GML();
	features = gml.read(req.responseText);
	for ( var i = 0; i < features.length; i++) {
		var feature, lonlat, marker;
		var point = features[i].geometry.getCentroid();// 获取要素坐标信息
		//查询结果展示 实现查询结果高亮显示
		feature = features[i];
       //高亮显示
        switch (feature.geometry.CLASS_NAME) {
            case "OpenLayers.Geometry.MultiPolygon":
                {
                    var polygon = feature.geometry.components[0].clone();
                    var vec = new OpenLayers.Feature.Vector(polygon);
                    queryResultLayer.addFeatures([vec]);
                }
                break;
        }
		//添加选中要素详细查询标注
		marker = new OpenLayers.Marker(new OpenLayers.LonLat(point.x, point.y));
		marker.setOpacity(255);
		var obj = {lonlat:new OpenLayers.LonLat(point.x, point.y),attributes:feature.attributes };
		marker.events.register('click', obj,
			function(){
				alert('markerClick');
				clearPopup();
				//注册单击事件
				 queryMarkerPopup = new OpenLayers.Popup.FramedCloud("chicken", 
									new OpenLayers.LonLat(this.lonlat.lon,this.lonlat.lat),
									 null,
									 "<div style='font-size:.8em'>地区: " + this.attributes.name +"<br />面积: "+ this.attributes.AREA +"</div>",
									 null, true, onPopupClose);
				//feature.popup = popup;
				
				map.addPopup(queryMarkerPopup);
				queryMarkerPopup.autoSize=false;
				//popup.hide();
			} 
		);
		marker_layer.addMarker(marker);// 添加当前位置标记
	}
	
}
function selectByPointNotice(pnt){
	
	
	//mousePoint.deactivate();
	//框选查询代码
	
	//筛选条件对象
	var filter = new OpenLayers.Filter.Logical(
		{
			type: OpenLayers.Filter.Logical.AND,
			filters: [
				new OpenLayers.Filter.Spatial({
					 type: OpenLayers.Filter.Spatial.INTERSECTS, //INTERSECTS, //相交OK
					 value: pnt,
					 projection: "EPSG:4326"
				})
				// ,
				 // new OpenLayers.Filter.Comparison({//比较操作符
					 // type: OpenLayers.Filter.Comparison.LIKE, //模糊查询（通配符：*/#/!），速度很慢
					 // property : "china_new:name",
					 // value : "*县*"
				 // })
			 ]
		}
	);
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
			+ "<wfs:Query typeName='china_new:xinjiang_xian_wgs84' srsName='EPSG:4326' >"
			+ xml.write(filter_1_0.write(filter)) + "</wfs:Query>"
			+ "</wfs:GetFeature>";
	// 发送请求
	var request = OpenLayers.Request.POST({
		url : wfs_url,
		data : xmlPara,// 请求数据
		callback : selectByPointQueryHandler// 返回信息处理函数
	});
}
function selectByPointQueryHandler(req){
	clearLastResult();// 清除上次查询的标记及要素样式
	var gml = new OpenLayers.Format.GML();
	features = gml.read(req.responseText);
	for ( var i = 0; i < features.length; i++) {
		var feature, lonlat, marker;
		var point = features[i].geometry.getCentroid();// 获取要素坐标信息
		//查询结果展示 实现查询结果高亮显示
		feature = features[i];
       //高亮显示
        switch (feature.geometry.CLASS_NAME) {
            case "OpenLayers.Geometry.MultiPolygon":
                {
                    var polygon = feature.geometry.components[0].clone();
                    var vec = new OpenLayers.Feature.Vector(polygon);
                    queryResultLayer.addFeatures([vec]);
                }
                break;
        }
		clearPopup();
		//添加弹出气泡
		queryMarkerPopup = new OpenLayers.Popup.FramedCloud("chicken", 
				new OpenLayers.LonLat(point.x,point.y),
				 null,
				 "<div style='font-size:.8em'>地区: " + feature.attributes.name +"<br />面积: "+ feature.attributes.AREA +"</div>",
				null, true, onClickQueryPopupClose);
		map.addPopup(queryMarkerPopup);
		queryMarkerPopup.autoSize=false;
	}
}
//关闭popup事件
function onPopupClose(){
	this.hide();
}
function onClickQueryPopupClose(){
	clearQueryResultLayer();
	this.hide();
}
function clearPopup(){
	if(queryMarkerPopup){
		map.removePopup(queryMarkerPopup);
	}
}

//专题图示例1
function thematicmap_test1(){
	//查询指定县
	//筛选条件对象
	var filter = new OpenLayers.Filter.Logical(
		{
			type: OpenLayers.Filter.Logical.AND,
			filters: [
				 new OpenLayers.Filter.Comparison({//比较操作符
					 type: OpenLayers.Filter.Comparison.LIKE, //模糊查询（通配符：*/#/!），速度很慢
					 property : "china_new:name",
					 value : "**"
				 })
			 ]
		}
	);
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
			+ "<wfs:Query typeName='china_new:xinjiang_xian_wgs84' srsName='EPSG:4326' >"
			+ xml.write(filter_1_0.write(filter)) + "</wfs:Query>"
			+ "</wfs:GetFeature>";
	// 发送请求
	var request = OpenLayers.Request.POST({
		url : wfs_url,
		data : xmlPara,// 请求数据
		callback : thematicmap_query// 返回信息处理函数
	});
}
function thematicmap_query(req){
	clearThematicMapLayer();// 清除上次查询的标记及要素样式
	var gml = new OpenLayers.Format.GML();
	var features = gml.read(req.responseText);
	for ( var i = 0; i < features.length; i++) {
		var feature, lonlat, marker;
		var point = features[i].geometry.getCentroid();// 获取要素坐标信息
		//查询结果展示 实现查询结果高亮显示
		feature = features[i];
       //高亮显示
        switch (feature.geometry.CLASS_NAME) {
            case "OpenLayers.Geometry.MultiPolygon":
                {
                    var polygon = feature.geometry.components[0].clone();
                    var vec = new OpenLayers.Feature.Vector(polygon);
					vec.style = array[i%4];
                    thematicmapLayer.addFeatures([vec]);
                }
                break;
        }
	}
}
var array = [
	{
		 strokeColor: "#0000FF",
         strokeWidth: 4,
         strokeOpacity: 0,
         fillColor: "#006600",
         fillOpacity: 0.5,
         pointRadius: 6,
         pointerEvents: "visiblePainted"
		 // ,
		 // label with \n linebreaks
         // label : "<div>adsl1</div>",
         // fontSize: "12px",
         // fontFamily: "Courier New, monospace",
         // fontWeight: "bold",
         // labelOutlineWidth: 3
     },
	 {
         strokeColor: "#0000FF",
         strokeWidth: 4,
         strokeOpacity: 0,
         fillColor: "#005B00",
         fillOpacity: 0.5,
         pointRadius: 6,
         pointerEvents: "visiblePainted"
     },
	 {
         strokeColor: "#0000FF",
         strokeWidth: 4,
         strokeOpacity: 0,
         fillColor: "#00C600",
         fillOpacity: 0.5,
         pointRadius: 6,
         pointerEvents: "visiblePainted"
     },
	 {
         strokeColor: "#0000FF",
         strokeWidth: 8,
         strokeOpacity: 0.0,
         fillColor: "#38FE38",
         fillOpacity: 0.5,
         pointRadius: 6,
         pointerEvents: "visiblePainted"
     }
];