//图形绘制
function bufferAnalyse(){
  			var shape="line";//要绘制的图形名，包括：line, rectangle, circle, polygon 
  			var innerColorObj= "blue"; //图形填充颜色RGB编码，格式为"RRGGBB"(16进制编码)，也可以输入基本颜色，如"yellow" 
			var borderColorObj="red";	//图形边界颜色(线颜色)RGB编码，格式为"RRGGBB"(16进制编码)，也可以输入基本颜色，如"yellow" 
			var isDrawBorder=true;		// 是否绘制边界 
			var lineWidth=1;	//线宽，该参数仅在绘制线时有作用 
			var opacity=0.5;	// 透明度，范围0-1,仅对图形内部有效 
			var isTemp=false;	// 是否为临时图形(临时图形在结束绘制后将不在地表上存在) 
			var isSendInfo=true;	// 绘制完成后是否向指定的URL发送图形信息。发送格式如下： 
			var functionName="drawpicback";	//绘制完后回调函数，接收返回参数 
			var isContinuous=true;	//是否是连续绘制模式 
 			var isClear=false;	// 绘制完后是否清除
  			drawSurfaceShapeContinuous(shape, innerColorObj, borderColorObj, isDrawBorder, lineWidth, opacity, isTemp, isSendInfo, functionName, isContinuous, isClear);
  	}
  //jslib里的EarthApiCallBack.js里回调函数返回回来的，此处只在多边形的时候用到
  function adddrawByPoints(shape,pnts){
  			if(shape=="Polyline"){
  				alert(shape);
  			removeAllSurfaceShapeOf("polyline") ;
  			var shapeName =Math.random();//矢量图形名 
			var shapeType=shape ;//矢量图形类型，包括：line, rectangle, circle, polygon 
			var points=pnts ;//图形信息 曲线信息格式：latitude,longitude|latitude,longitude|... 
					//矩形信息格式：center Latitude,center longitude|width|height|heading 
					//圆形信息格式：center Position Latitude,center Position longitude|radius 
					//多边形信息格式：latitude,longitude|latitude,longitude|... 
			var interiorColorObj="blue" ;//矢量图形内部颜色(曲线此参数无效) 
			var borderColorObj ="red";//矢量图形边界颜色(曲线颜色) 
			var opacity=0.5 ;//矢量图形内部透明度 
			var isDrawBorder =true;//是否绘制矢量图形边界 
			var lineWidth=1 ;//曲线宽度 
			var minVisibleDist=0 ;//矢量图形最小可见距离 
			var maxVisibleDist=200000000 ;//矢量图形最大可见距离 
			var isTemp=false ;//是否为临时图形(endDrawShape()函数是否对其有影响) 
  			addSurfaceShape(shapeName, shapeType, points, interiorColorObj, borderColorObj, opacity, isDrawBorder, lineWidth, minVisibleDist, maxVisibleDist, isTemp); 
  		}
  	}
  		
//结束绘制
function stopDraw(){
	endDrawShape();
}
//清除绘制
function clearDraw(){
	removeAllSurfaceShape();
}

//剖面分析
function analysisTerrain(type){
	stopTerriProfileAnalyse();
	switch (type) {
	case "view":
		appletFrame.drawTerrainProfile("view", "Small", 1);
		break;
	case "cursor":
		appletFrame.drawTerrainProfile("cursor", "Small", 1);
		break;
	case "free":
		//鼠标绘制
		appletFrame.drawTerrainProfileByMouse();
		break;
	default:
		break;
	}
}
//清除分析
function stopTerriProfileAnalyse(){
	appletFrame.shutdownTerrainProfile();
	appletFrame.endDrawShape();
}

