//模型的一些设置，圆球，平面等切换
function createAnalyseTool()
{
   var b = theApplet.createAnalyseTool();
}
function destroyAnalyseTool()
{
   theApplet.destroyAnalyseTool();
}

/**
 * 开始坡度坡向分析
 */
function startSloapAnalyse(){
	theApplet.getAnalyseToolOption().startSloapAnalyse();
}
/**
 * 结束坡度坡向分析
 */
function stopSloapAnalyse(){
	theApplet.getAnalyseToolOption().stopSloapAnalyse();
}

/**
 * 根据指定的参数绘制地形剖面地形图  开始剖面分析
 * 
 * @param followType
 *            为"cursor"时为跟随光标，为"view"或其他值时为跟随视点
 * @param graphSize
 *            绘制图大小，分为Small, Medium, Large三种
 * @param profileLength
 *            绘制范围，0-2，超出范围自动设置为1
 */
function startTerrainAnalyse(followType,graphSize){
   theApplet.getAnalyseToolOption().startTerrainAnalyse(followType,graphSize,1);
}

/**
 * 结束剖面分析
 */
function stopTerrainAnalyse(){
	theApplet.getAnalyseToolOption().stopTerrainAnalyse();
}

/**
 * 开始通视分析接口
 */
function startSightAnalyse(startHeight,endHeight){
   theApplet.getAnalyseToolOption().startSightAnalyse(startHeight,endHeight);
}

/**
 * 结束通视分析接口
 */
function stopSightAnalyse(){
	theApplet.getAnalyseToolOption().stopSightAnalyse();
}

/**
 * 开始水淹分析
 */
function startWaterFloodAnalyse(startWaterLevel,endWaterLevel){
	var points="37.87217686266893,75.33499242706414" +
	"|37.86335107450978,75.35045749288982|37.85791306100683,75.38450047512906" +
	"|37.828696034271324,75.41470389223879|37.784176302162784,75.46140507349065" +
	"|37.789108126708506,75.47652421308126|37.81227853182768,75.50572517050044" +
	"|37.828725731603214,75.52556237625396|37.834980735335314,75.52286474947712" +
	"|37.85115612723011,75.44932171357887|37.864342154185,75.43566640983481" +
	"|37.88498098073888,75.41220247923546|37.87933102761842,75.34092982582851"+
	"|37.87618323848919,75.33506662596687";
	return theApplet.getAnalyseToolOption().startWaterFloodAnalyse(points, startWaterLevel, endWaterLevel, 5000, 100, 80000, 180);
}
/**
 * 设置水位高度接口
 */
function stopWaterFloodAnalyse(){
	theApplet.getAnalyseToolOption().stopWaterFloodAnalyse();
}

/**
 * 开始消落区分析
 */
function startFluctuateAnalyse(startWaterLevel,endWaterLevel){
	var points="37.87217686266893,75.33499242706414" +
	"|37.86335107450978,75.35045749288982|37.85791306100683,75.38450047512906" +
	"|37.828696034271324,75.41470389223879|37.784176302162784,75.46140507349065" +
	"|37.789108126708506,75.47652421308126|37.81227853182768,75.50572517050044" +
	"|37.828725731603214,75.52556237625396|37.834980735335314,75.52286474947712" +
	"|37.85115612723011,75.44932171357887|37.864342154185,75.43566640983481" +
	"|37.88498098073888,75.41220247923546|37.87933102761842,75.34092982582851"+
	"|37.87618323848919,75.33506662596687";
	theApplet.getAnalyseToolOption().startFluctuateAnalyse(points,startWaterLevel,endWaterLevel);
	/*var xmlPara = "<?xml version='1.0' encoding='UTF-8'?>"
		+ "<wfs:GetFeature service='WFS' version='1.0.0' "
		+ "xmlns:wfs='http://www.opengis.net/wfs' "
		+ "xmlns:gml='http://www.opengis.net/gml' "
		+ "xmlns:ogc='http://www.opengis.net/ogc' "
		+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
		+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd'>"
		+ "<wfs:Query typeName='xiabandi:kuergan_submerge' srsName='EPSG:4326' >"
	    + "</wfs:Query>"
		+ "</wfs:GetFeature>";
	// 发送请求
	var request = OpenLayers.Request.POST({
		url : SystemTool.wfsUrl,
		data : xmlPara,// 请求数据
		callback : function(req){
			var gml = new OpenLayers.Format.GML();
			var queryResultFeatures = gml.read(req.responseText);
			var geometry;
			for(var i=0;i<queryResultFeatures.length;i++){
				geometry=queryResultFeatures[i].geometry;
				theApplet.getAnalyseToolOption().startFluctuateAnalyse(points,startWaterLevel,endWaterLevel);
			}
		}
	});*/
}

/**
 * 消落区分析 设置水位高度
 */
function setElevation(elevation,type){
	theApplet.getAnalyseToolOption().setElevation(elevation,type);
}

/**
 * 结束消落区分析
 */
function stopFluctuateAnalyse(){
	theApplet.getAnalyseToolOption().stopFluctuateAnalyse();
}

/**
 * 开始挖填方分析
 */
function startDigFillAnalyse(depth){
	theApplet.getAnalyseToolOption().startDigFillAnalyse(depth);
}

/**
 * 结束挖填方分析
 */
function stopDigFillAnalyse(){
	theApplet.getAnalyseToolOption().stopDigFillAnalyse();
}

