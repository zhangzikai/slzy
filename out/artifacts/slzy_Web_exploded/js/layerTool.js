/*
 * 系统工具 2014-04-09 11:25:16
 * */
//类 LayerTool
var LayerTool={
	isShowState:0,//配置显示国家图层
	isShowProvince:0,//配置显示省份图层
	isShowCounty:0,//配置显示县区图层
	
	/**
	 * 对图层分类处理显示与隐藏
	 * id,status
	 */
	layerSwitch:function(parentId,id,status){
		if(parentId=="districtLayer"||parentId=="businessLayer"||parentId=="imageLayer"){
			this.districtLayer(id,status);
		}else if(parentId=="model_layer"){
			this.modelKml(id,status);
		}else{
			//SceneLoad();
		}
	},
	/**
	*加载与显示行政区划图层
	*name
	*status
	*/
	districtLayer:function(name,status){
		setWMSLayerIsEnabled(name,status);
	},
	/**
	*加载与显示或者隐藏模型大坝图层
	*status
	*/
	modelKml:function(name,status){
		setKmlIsEnabled(name,status);
	},
	/**
	*加载与显示或者隐藏模型河图层
	*status
	*/
	loadRiver:function(status){
		if(status){
			addModel("reservoir","model/data/daba.3ds",37.86,75.4,-1000);
		}else{
			removeModel("reservoir");
		}
	},
	
	/**
	 * 根据图层和站名定位
	 * @param layerName
	 * @param stationName
	 */
	locating:function (layerName,stationId,stationName){
		var xmlPara = "<?xml version='1.0' encoding='UTF-8'?>"
			+ "<wfs:GetFeature service='WFS' version='1.0.0' "
			+ "xmlns:wfs='http://www.opengis.net/wfs' "
			+ "xmlns:gml='http://www.opengis.net/gml' "
			+ "xmlns:ogc='http://www.opengis.net/ogc' "
			+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
			+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd'>"
			+ "<wfs:Query typeName='xiabandi:"+layerName+"' srsName='EPSG:4326' >"
			+"<ogc:Filter xmlns:ogc='http://www.opengis.net/ogc'><ogc:And>"
			+"<ogc:PropertyIsLike wildCard='*' singleChar='.' escape='!'><ogc:PropertyName>xiabandi:name</ogc:PropertyName>"
			+"<ogc:Literal>"+stationName+"</ogc:Literal></ogc:PropertyIsLike>"
			+"</ogc:And></ogc:Filter>"
		    + "</wfs:Query>"
			+ "</wfs:GetFeature>";
		// 发送请求
		var request = OpenLayers.Request.POST({
			url : SystemTool.wfsUrl,
			data : xmlPara,// 请求数据
			callback : function(req){
				var gml = new OpenLayers.Format.GML();
				var queryResultFeatures = gml.read(req.responseText);
				var geometry,featureMember,marker=SystemTool.queryLayerStore.query("id",layerName,false).first().get("marker");
				for(var i=0;i<queryResultFeatures.length;i++){
					featureMember=queryResultFeatures[i];
					point=featureMember.geometry.getCentroid();
					addMarkerAnnotation(point.y,point.x,SystemTool.basePath+"/images/marker/"+marker+".png",featureMember.attributes.name,"<p style='width:90px;'>名称:"+featureMember.attributes.name+"</p>",170,60,stationId);
					flyTo(point.y,point.x);
				}
			}
		});
		
	}
	
};
