//测量工具的管理
//创建测量工具
function createMeasureTool(){
   var b = theApplet.createMeasureTool(); 
}
//释放测量对象
function destroyMeasureTool(){
   theApplet.destroyMeasureTool();
}

/**
 * 测量距离
 * MeasureTool.ShapeLine,MeasureTool.ShapePath,MeasureTool.ShapePolygon
 * mode  0:地表距离	1:空间距离	2:水平距离
 */
function startMeasureDistance(mode){
	if(mode=="0"){
		theApplet.getMeasureToolOption().startMeasure("MeasureTool.ShapePath",true);
	}else if(mode=="1"){
		theApplet.getMeasureToolOption().startMeasure("MeasureTool.ShapePath",false);
	}else{
		theApplet.getMeasureToolOption().startMeasureDistance(mode);
	}
	
}

/**
 * 测量高度
 */
function startMeasureHeight(){
   theApplet.getMeasureToolOption().startMeasureHeight();
}

/**
 * 测量高面积
 * mode 0:地面面积	1:平面面积
 */
function startMeasureArea(mode){
	if(mode=="0"){
		theApplet.getMeasureToolOption().startMeasure("MeasureTool.ShapePolygon",true);
	}else if(mode=="1"){
		theApplet.getMeasureToolOption().startMeasure("MeasureTool.ShapePolygon",false);
	}
}

/**
 * 测量体积
 */
function startMeasureVolume(){
   theApplet.getMeasureToolOption().startMeasureVolume();
}

/**
 * 测量坡度与坡向
 */
function startMeasureSlope(){
   theApplet.getMeasureToolOption().startMeasureSlope();
}

function  startPolygonAnalysis(){
	theApplet.getMeasureToolOption().polygonAnalysis();
}
function polygonAnalysis(str){
	var arrayP = str.split('|');
    var  arrayPP=[];
	for(var i in arrayP){
		if(arrayP[i]!=''){
			var arrayL =arrayP[i].split(':');
			arrayPP.push(new OpenLayers.Geometry.Point(parseFloat(arrayL[0]),parseFloat(arrayL[1])));
		}
	}
	queryXBByPolygonComplete3D(new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing(arrayPP)]));
	
	
}
/**
 * 结束测量
 */
function stopMeasure(){
   theApplet.getMeasureToolOption().stopMeasure();
}