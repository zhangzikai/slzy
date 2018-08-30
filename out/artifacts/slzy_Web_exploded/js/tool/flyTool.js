//图形绘制
function drawFlyLine(){
  			var shape="line";//要绘制的图形名，包括：line, rectangle, circle, polygon 
  			var innerColorObj= "blue"; //图形填充颜色RGB编码，格式为"RRGGBB"(16进制编码)，也可以输入基本颜色，如"yellow" 
			var borderColorObj="red";	//图形边界颜色(线颜色)RGB编码，格式为"RRGGBB"(16进制编码)，也可以输入基本颜色，如"yellow" 
			var isDrawBorder=true;		// 是否绘制边界 
			var lineWidth=1;	//线宽，该参数仅在绘制线时有作用 
			var opacity=0.5;	// 透明度，范围0-1,仅对图形内部有效 
			var isTemp=false;	// 是否为临时图形(临时图形在结束绘制后将不在地表上存在) 
			var isSendInfo=true;	// 绘制完成后是否向指定的URL发送图形信息。发送格式如下： 
			var functionName="drawFlyLineback";	//绘制完后回调函数，接收返回参数 
			var isContinuous=true;	//是否是连续绘制模式 
 			var isClear=false;	// 绘制完后是否清除
  			drawSurfaceShapeContinuous(shape, innerColorObj, borderColorObj, isDrawBorder, lineWidth, opacity, isTemp, isSendInfo, functionName, isContinuous, isClear);
  	}

//-------------------------绘制图形回调函数
function drawFlyLineback(res){
	if(res!=""){
		var resArr=res.split("&");
		var drawType=resArr[0].split("=")[1];
		var drawPoints=resArr[1].split("=")[1];
		navigateByPoints(drawPoints, 0, 0, 0, 500);
		//adddrawByPoints(drawType,drawPoints);
	}	
}
