var map;
var map2d={
	// 初始化2dMap
	init2dMap:function(){
		var options = {
			controls : [ new OpenLayers.Control.Navigation(),// 用来控制地图与鼠标事件的互动，如拖曳，缩放，滚动，双击
			new OpenLayers.Control.Attribution(),// 允许通过layer向map添加属性
			new OpenLayers.Control.OverviewMap(),
					new OpenLayers.Control.PanZoomBar(),
					new OpenLayers.Control.ZoomBox({
						title : "放大"
					}), new OpenLayers.Control.ZoomBox({
						out : true,
						title : "缩小"
					}), new OpenLayers.Control.LayerSwitcher(),
					new OpenLayers.Control.Scale(),
					new OpenLayers.Control.MousePosition() ],

			projection : "EPSG:4610",
			units : 'degrees'
		};
		map = new OpenLayers.Map('2dMap', options);// 新建地图
		
		// 底图
		var untiled = new OpenLayers.Layer.WMS(config.baseMap1.name, config.default_url, {
			LAYERS : 'shwy:sheng',//config.baseMap1.layers,
			format : 'image/png'
		}, {
			singleTile : true,
			ratio : 1,
			transitionEffect : 'resize',
			isBaseLayer : true,
			yx : {
				'EPSG:4610' : true
			}
		});
		 
		// 业务图层-小班面图层
		var xbm = new OpenLayers.Layer.WMS(config.xbmLayer.name, config.wms_url, {
			layers : config.xbmLayer.layers,
			transparent : "true"
		}, {
			'isBaseLayer' : false
		});
		map.addLayers([untiled,xbm]);
		
		
		// 定位
		map.setCenter(new OpenLayers.LonLat(config.mapCenter.x, config.mapCenter.y), config.mapCenter.level);
		
		// 绑定事件
		//map.events.register("click", map, onMapClick);
	},
	
	// 地图点击事件
	onMapClick:function(e){
		var lonlat = map.getLonLatFromViewPortPx(e.xy);
		var params = { };
		if (buttonClicked == 'selectByPnt') {
			OpenLayers.loadURL(wms_url, params, this, onComplete, onFailure);
		} else if (buttonClicked == 'staticsByPnt') {
			staticsQueryByXZQH(e);
		}
		tpoint = map.getLonLatFromPixel(e.xy), OpenLayers.Event.stop(e);
	},
	
	//小班定位
	locateXB:function(cun,linban,xiaoban,callback){
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
				+ "<wfs:Query typeName='shwy:J2210000JB2012XBM' srsName='EPSG:4610' >"
				+ xml.write(filter_1_0.write(filter)) + "</wfs:Query>"
				+ "</wfs:GetFeature>";
		// 发送请求
		var request = OpenLayers.Request.POST({
			url : wfs_url,
			data : xmlPara,// 请求数据
			callback : callback
			})
	}
}