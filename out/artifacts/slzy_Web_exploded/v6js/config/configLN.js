// 配置参数类
var config={
		baseMap:[
			{
				type:'wms',
				name:'行政区划',
				layerName:'12,11,10,9,8,7,6,5,4,3,2,1,0',
				url:'http://10.100.11.23:6080/arcgis/services/xzqhAnno/MapServer/WMSServer'
			},
			{
				type:'wmts',
				name:'影像',
				layerName:'LN_Server',
				url:'http://10.100.11.23:6080/arcgis/rest/services/LN_Server/MapServer/WMTS/tile'
			}
		],
		mapCenter:{// 地图中心点及级别
			x:122.75024,
			y:41.33606,
			level:4
		},
		
		xzj:{
			type:'wms',
			name:'行政界',
			layerName:'4,3,2,1,0',
			url:'http://10.100.11.23:6080/arcgis/services/xzqh/MapServer/WMSServer'
		},
		
		xbmAnno:{
			type:'wms',
			name:'undefined12',
			layerName:'1',
			url:'http://www.baidu.com'
		},
		xbmAnno1:{
			type:'wms',
			name:'undefined12',
			layerName:'1',
			url:'http://www.baidu.com'
		},
		xbmLayer:
			 // {
				// type:'wmts',
				// name:'小班面',
				// layerName:'0', 
				// layerServerName:'xbmsde',
				// url:'http://10.100.11.23:6080/arcgis/rest/services/xbm2012_4610/MapServer/WMTS/tile',
				// wfs_url:'http://10.100.11.23:6080/arcgis/services/xbm2012_4610/MapServer/WFSServer'
			// },
			{
				type:'wms',
				name:'小班面',
				layerName:'0', 
				layerServerName:'j2210000jb2012xbm',
				url:'http://10.100.11.23:6080/arcgis/services/xbm/MapServer/WMSServer',
				wfs_url:'http://10.100.11.23:6080/arcgis/services/xbm/MapServer/WFSServer'
			},
		xbmLayer1:
			{
				type:'wms',
				name:'小班面',
				layerName:'1',
				layerServerName:'j2210000jb2013xbm',
				url:'http://10.100.11.23:6080/arcgis/services/xbm/MapServer/WMSServer',
				wfs_url:'http://10.100.11.23:6080/arcgis/services/xbm/MapServer/WFSServer'
			},
		sheng:{
			layerName:'4',
			layerServerName:'sheng_1',
			wfs_url:'http://10.100.11.23:6080/arcgis/services/xzqh_simplify/MapServer/WFSServer'
		},
		shi:{
			layerName:'3',
			layerServerName:'shi_1',
			wfs_url:'http://10.100.11.23:6080/arcgis/services/xzqh_simplify/MapServer/WFSServer'
		},
		xian:{
			layerName:'2',
			layerServerName:'xian_1',
			wfs_url:'http://10.100.11.23:6080/arcgis/services/xzqh_simplify/MapServer/WFSServer'
		},
		xiang:{
			layerName:'1',
			layerServerName:'xiang_1',
			wfs_url:'http://10.100.11.23:6080/arcgis/services/xzqh_simplify/MapServer/WFSServer'
		},
		cun:{
			layerName:'0',
			layerServerName:'cun',
			wfs_url:'http://10.100.11.23:6080/arcgis/services/xzqh/MapServer/WFSServer'
		}
}