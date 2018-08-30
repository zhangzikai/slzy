var map;
var locateResultLayer;
var detailwin;
var map2d={
	// 初始化2dMap
	init2dMap:function(url,layer){
		
		OpenLayers.Util.onImageLoadErrorColor = 'transparent';
		
		OpenLayers.Util.onImageLoadError = function() {
			this.src = SystemTool.basePath+"/js/openLayers/img/blank.gif";
		}
		
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
					resolutions:[0.13099901978223877,0.065499509891119384,0.032749754945559692,0.016374877472779846,0.008187438736389923,0.0040937193681949615,0.0020468596840974808,0.0010234298420487876,0.00051171492102434644,0.00025585746051217322,0.00012792873025608661,6.3964365128043305e-005//,3.1982182564021653e-005,1.5991091282010826e-005,7.9955456410527132e-006,3.9977728205263566e-006//,// 1.9988864102631783e-006//,//0.0000010564923286,0.0000005282461643
			             ],
			        maxExtent:mapMaxExtent,// new OpenLayers.Bounds(73.62, 18.11, 134.77,
			projection : "EPSG:4610",
			units : 'degrees'
		};
		map = new OpenLayers.Map('2dMap', options);// 新建地图
		
//		// 底图
		var matrixIds = new Array(16);
		for(var i=0;i<17;i++){
			matrixIds[i]=i.toString();
		}
	    
		// // 底图
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
					url:config.baseMap[obj].url,//'http://localhost:6080/arcgis/rest/services/MyMapService/MapServer/WMTS/tile',
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
		
		var xbm;
		// 加载小班数据
//		if(config.xbmLayer.type=='wms'){
//			xbm = new OpenLayers.Layer.WMS(config.xbmLayer.name, config.xbmLayer.url, {
//				layers : config.xbmLayer1.layerName,
//				transparent : "true"
//			}, {
//			tileSize: new OpenLayers.Size(256,256),
//				displayOutsideMaxExtent: true,
//				isBaseLayer: false
//			});
//		}
//		else if(config.xbmLayer.type=='wmts'){
//			xbm = new OpenLayers.Layer.WMTS({
//				layer:config.xbmLayer.layerName,
//				requestEncoding:'REST',
//				name:config.xbmLayer.name,
//				style:'default',
//				url:config.xbmLayer.url,//'http://localhost:6080/arcgis/rest/services/MyMapService/MapServer/WMTS/tile',
//				matrixSet:'default028mm',
//				matrixIds:matrixIds,
//				tileOrigin: new OpenLayers.LonLat(-400 , 400),  
//				format:'image/png',
//				isBaseLayer:true,
//				numZoomLevels:17
//			});
//		}
		xbm = new OpenLayers.Layer.WMTS({
			layer:layer,
			requestEncoding:'REST',
			name:"专题图",
			style:'default',
			url:url,//'http://localhost:6080/arcgis/rest/services/sheng/MapServer/WMTS/tile',
			matrixSet:'default028mm',
			matrixIds:matrixIds,
			tileOrigin: new OpenLayers.LonLat(-400 , 400),  
			format:'image/png',
			isBaseLayer:false,
			numZoomLevels:17
		});
//		xbm = new OpenLayers.Layer.WMS(layer, url, {
//			layers : '0',
//			transparent : "true"
//		}, {
//			tileSize: new OpenLayers.Size(256,256),
//			displayOutsideMaxExtent: true,
//			isBaseLayer: false
//		});
//		console.log(xbm);
		if(xbm!=null){
			map.addLayers([xbm]);
		}
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

		map.addLayers([ queryResultLayer ]);
		// 添加新的临时图层
		locateResultLayer = new OpenLayers.Layer.Vector("查询结果", {
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
		map.addLayers([locateResultLayer]);
		
		// 定位
		setTimeout(function(){
		map.setCenter(new OpenLayers.LonLat(config.mapCenter.x, config.mapCenter.y), config.mapCenter.level);
		map.zoomToMaxExtent();
		},1000)
//		map.setCenter(new OpenLayers.LonLat(123.25698, 42.71690), 10);
		
		// 绑定事件
		function onComplete(response) {
			// 清除之前的选中效果
			queryResultLayer.removeAllFeatures();
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
		buttonClicked=null;
		onMapClick=function(e){
			var lonlat = map.getLonLatFromViewPortPx(e.xy);
			if(lonlat.lon<mapMaxExtent.left || lonlat.lon>mapMaxExtent.right || lonlat.lat<mapMaxExtent.bottom || lonlat.lat>mapMaxExtent.top)return;
			var params = { };
			if (buttonClicked == 'selectByPnt') {
				var geometry = new OpenLayers.Geometry.Point(lonlat.lon,lonlat.lat);
				
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
						+ "<wfs:Query typeName='"+config.xbmLayer.layerServerName+"' srsName='EPSG:4610' >"
						+ xml.write(filter_1_0.write(filter)) + "</wfs:Query>"
						+ "</wfs:GetFeature>";
				var request = OpenLayers.Request.POST({
					url : config.xbmLayer.wfs_url,
					data : xmlPara,// 请求数据
					callback : onComplete
				});
						
			} else if (buttonClicked == 'staticsByPnt') {
				staticsQueryByXZQH(e);
			}
		}
		map.events.register("click", map, onMapClick);

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

					if(false){
						// detailwin.setWidth(400);
						grid.columns[3].setVisible(true);
						
						// 构造请求数据
						var filter = new OpenLayers.Filter.Logical({
							type : OpenLayers.Filter.Logical.AND
						});
						var filtertemp = new OpenLayers.Filter.Comparison({// 比较操作符
							type : OpenLayers.Filter.Comparison.EQUAL_TO,
							property : 'objectid',
							value : feature.attributes.objectid
						})
						filter.filters[0] = filtertemp;
						filter.filters[1] = filtertemp;
						
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
	}
	
	// 地图点击事件


}