// 配置参数类
var config={
		//wms_url:"http://10.100.11.23:8081/geoserver/shwy/gwc/service/wms'",
		//tile_url:'http://10.100.11.23:8081/geoserver/shwy/gwc/service/wms',
		//default_url:'http://10.100.11.23:8081/geoserver/gwc/service/wms',
		//default_url:'http://10.100.11.23:6080/arcgis/services/xbm2013/MapServer/WMSServer',
		//default_wfs_url:'http://10.100.11.23:6080/arcgis/services/xbm2013/MapServer/WFSServer',
//		wms_url:"http://10.100.11.23:8081/geoserver/shwy/wms",
//		tile_url:'http://10.100.11.23:8081/geoserver/shwy/gwc/service/wms',
//		default_url:'http://10.100.11.23:8081/geoserver/shwy/wms',
// //		default_wfs_url:'http://10.100.11.23:8081/geoserver/shwy/wfs',
		// baseMap1:{
			// name:'行政',
			// //layers:'shwy:sheng,shwy:shi,shwy:xian,shwy:xiang,shwy:cun'
			// layers:'shwy:shenyang'
		// },
		baseMap:[
			// {
				// type:'wmts',
				// name:'行政',
				// layerName:'XZ_SERVER1',
				// url:'http://10.100.11.23:6080/arcgis/rest/services/XZ_SERVER1/MapServer/WMTS/tile'
			// },
			// {
				// type:'wms',
				// name:'行政区划',
				// layerName:'4,3,2,1,0',
				// url:'http://10.100.11.23:6080/arcgis/services/xzqh/MapServer/WMSServer'
			// },

			 {
				 type:'wms',
				 name:'行政区划',
				 layerName:'9,8,7,6,5,4,3,2,1,0',
				 url:'http://114.215.140.122:6080/arcgis/services/view1/MapServer/WmsServer'
			 },
			// {
				// type:'wms',
				// name:'行政区划',
				// layerName:'14,13,12,11,10,9,8,7,6,5,4,3,2,1,0',
				// url:'http://10.100.11.23:6080/arcgis/services/xzqhAnno/MapServer/WMSServer'
			// },
			 

			{
				type:'wmts',
				name:'影像',
				layerName:'LN_Server',
				url:'http://10.100.11.23:6080/arcgis/rest/services/LN_Server/MapServer/WMTS/tile'
			}

			
			// {
				// type:'wms',
				// name:'wms影像',
				// layerName:'3',
				// url:'http://10.100.11.23:6080/arcgis/services/LNService_local/MapServer/WMSServer'
			// }
		],
		mapCenter:{// 地图中心点及级别
			x:122.75,
			y:41.33,
			level:4
		},
		
		xzj:{
				type:'wmts',
				name:'行政界',
				layerName:'XZQH_SERVER',
				url:'http://10.100.11.23:6080/arcgis/rest/services/XZQH_SERVER/MapServer/WMTS/tile'
			},
		
		
		xbmLayer:
			  {
				 type:'wmts',
				 name:'小班面',
				 layerName:'X13_SERVER_TS', 
				 layerServerName:'xbm20120',
				 url:'http://10.100.11.23:6080/arcgis/rest/services/X13_SERVER_TS3/MapServer/WMTS/tile',
				 wfs_url:'http://10.100.11.23:6080/arcgis/services/X13_SERVER/MapServer/WFSServer'
			 },
		xbmLayer2:
			  {
				 type:'wmts',
				 name:'小班面影像',
				 layerName:'X13_SERVER2', 
				 url:'http://10.100.11.23:6080/arcgis/rest/services/X13_SERVER_TS2/MapServer/WMTS/tile'
			 },
				ldLayer:{
					type:'wms',
					name:'林带',
					layerName:'0', 
					layerServerName:'j2210000jb2012xbm',
					url:'http://10.100.11.23:6080/arcgis/services/xbm/MapServer/WMSServer',
					wfs_url:'http://10.100.11.23:6080/arcgis/services/xbm/MapServer/WFSServer'	
				},
				ldLayer1:{
					type:'wms',
					name:'林带',
					layerName:'0', 
					layerServerName:'j2210000jb2012xbm',
					url:'http://10.100.11.23:6080/arcgis/services/xbm/MapServer/WMSServer',
					wfs_url:'http://10.100.11.23:6080/arcgis/services/xbm/MapServer/WFSServer'	
				},
			// {
				// type:'wms',
				// name:'小班面',
				// layerName:'0', //anno5
				// layerServerName:'j2210000jb2012xbm',
				// url:'http://10.100.11.23:6080/arcgis/services/xbm/MapServer/WMSServer',
				// wfs_url:'http://10.100.11.23:6080/arcgis/services/xbm/MapServer/WFSServer'
			// },
		// xbmAnno:{
						
				// type:'wms',
				// name:'小班标注',
				// layerName:'5',
				// url:'http://10.100.11.23:6080/arcgis/services/xbm/MapServer/WMSServer'
			
		// },
		
		// {
			// type:'wms',
			// name:'小班面',
			// layerName:'0',
			// layerServerName:'postgis.public.xbm2013',
			// url:'http://10.100.11.23:6080/arcgis/services/xbm2013/MapServer/WMSServer',
			// wfs_url:'http://10.100.11.23:6080/arcgis/services/xbm2013/MapServer/WFSServer',
		// },
		xbmLayer1:
			{
				type:'wms',
				name:'小班面',
				layerName:'0',//xbm标注4
				layerServerName:'X13_SERVER:xbm2013',
				url:'http://10.100.11.23:6080/arcgis/services/X13_SERVER/MapServer/WMSServer',
				wfs_url:'http://10.100.11.23:6080/arcgis/services/X13_SERVER/MapServer/WFSServer'
			},
			xbmAnno1:{
							
				type:'wms',
				name:'小班标注',
				layerName:'2',
				url:'http://10.100.11.23:6080/arcgis/services/X13_SERVER/MapServer/WMSServer'
			
			},
		// xbmLayer1:{
			// type:'wms',
			// name:'小班面',
			// layerName:'0',
			// layerServerName:'postgis.public.xbm2013',
			// url:'http://10.100.11.23:6080/arcgis/services/xbm2013/MapServer/WMSServer',
			// wfs_url:'http://10.100.11.23:6080/arcgis/services/xbm2013/MapServer/WFSServer',
		// },
		sheng:{
			layerName:'4',
			layerServerName:'xzqhQueryServer:sde.sde.sheng_3',
			wfs_url:'http://10.100.11.23:6080/arcgis/services/xzqhQueryServer/MapServer/WFSServer'
		},
		shi:{
			layerName:'3',
			layerServerName:'xzqhQueryServer:sde.sde.shi_3',
			wfs_url:'http://10.100.11.23:6080/arcgis/services/xzqhQueryServer/MapServer/WFSServer'
		},
		xian:{
			layerName:'2',
			layerServerName:'xzqhQueryServer:sde.sde.xian_3',
			wfs_url:'http://10.100.11.23:6080/arcgis/services/xzqhQueryServer/MapServer/WFSServer'
		},
		xiang:{
			layerName:'1',
			layerServerName:'xzqhQueryServer:sde.sde.xiang_3',
			wfs_url:'http://10.100.11.23:6080/arcgis/services/xzqhQueryServer/MapServer/WFSServer'
		},
		cun:{
			layerName:'0',
			layerServerName:'xzqhQueryServer:sde.sde.cun_3',
			wfs_url:'http://10.100.11.23:6080/arcgis/services/xzqhQueryServer/MapServer/WFSServer'
		}
}