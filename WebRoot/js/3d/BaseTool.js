//场景的一些控制，漫游，放大缩小,飞行等
//首先创建才能使用
//function createBaseTool(){
//  var b =  theApplet.createBaseTool(); 
//}
//销毁工具释放空间
function destroyBaseTool(){
   theApplet.destroyBaseTool();
}
//放大当前视野
function zoomIn(){
   theApplet.getBaseToolOption().zoomIn();
}
//缩小当前视野
function zoomOut(){
	theApplet.getBaseToolOption().zoomOut();
}

//复位视野
function resetView(){
	theApplet.getBaseToolOption().flyTo(41.83658,85.01374);
}


function createShim(){
	Ext.get(Ext.query('#change2d')[0]).createShim() ;
}


function setZoom1(height,second){
	map.zoomToScale(height);
	//console.log("height is "+height+"\n"+"  zoom is "+map.getScale()/3);
	   theApplet.getBaseToolOption().setZoom(map.getScale()/3,1000);
}
//设置视野高度
function setZoom(height){
	map.zoomToScale(height);
//console.log("height is "+height+"\n"+"  zoom is "+map.getScale()/3);
   theApplet.getBaseToolOption().setZoom(map.getScale()/3);
}

//设置倾斜角和方位
function setHeadingAndPitch(heading,pitch){
   theApplet.getBaseToolOption().setHeadingAndPitch(heading,pitch);
}

//改变地形比例系数
function setVerticalExaggeration(num){
   theApplet.getBaseToolOption().setVerticalExaggeration(num);
}

function appletInit(){
	flyToLocation(41.6276, 124.4635,0,0,0,1418000);
}
//飞行定位
function flyTo(lat,lon){
   theApplet.getBaseToolOption().flyTo(lat,lon);
}
//参数全的飞行   
//height=elevation
function flyToLocation(lat,lon,height,heading,pitch,zoom){
   theApplet.getBaseToolOption().flyTo(lat,lon,height,heading,pitch,zoom);
}

//参数全的飞行
function flyToTime(lat,lon,height,heading,pitch,zoom,flyTime){
   theApplet.getBaseToolOption().flyTo(lat,lon,height,heading,pitch,zoom,flyTime);
}

//飞行定位tif文件加载
function flyToTif(){
	theApplet.getBaseToolOption().flyToTif();
}

//屏幕快照  图片保存地址:C:\WWJSnapShot.png
function screenShot(filePath){
	return theApplet.screenShot(filePath);
}
