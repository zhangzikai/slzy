//测量工具的管理
//创建测量工具
function createQueryTool(){
   theApplet.createQueryTool(); 
}
//释放测量对象
function destroyQueryTool(){
   theApplet.destroyQueryTool();
}

//测量,[Line,Path,Polygon,Circle,Ellipse,Square,Rectangle]
function startDrawShape(type){
   theApplet.getQueryToolOption().startQuery(type);
}
//停止测量
function stopQueryTool(){
   return theApplet.getQueryToolOption().stopQueryTool();
}

function getLength(){
	return theApplet.getQueryToolOption().getLength();
}

function pauseQuery(){
	theApplet.getQueryToolOption().pauseQuery();
}
//清除测量痕迹
function clearQuery(){
   theApplet.getQueryToolOption().clearQuery();
}