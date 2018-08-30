//专题图相关的东西
function createAirspaceTool(){
   theApplet.createAirspaceTool();
}
//创建专题图层
function createAirspaceLayer(layerName){
   theApplet.getAirspaceTool().createAirspaceLayer(layerName);
}

//添加圆柱专题图
function addCappedCylinder(layerName){
    theApplet.getAirspaceTool().addCappedCylinder(layerName, "39,116,2000.0,50000.0,1000.0,blue,white,100;38,116,5000.0,50000.0,1000.0,yellow,white,200;39,117,3000.0,40000.0,1000.0,white,white,300;36,117,3000.0,20000.0,1000.0,red,white,300;35,115,3000.0,60000.0,1000.0,magenta,white,1300;35,116.5,3000.0,60000.0,1000.0,blue,white,1300;36,115.5,3000.0,60000.0,1000.0,blue,white,1300;36,114.5,3000.0,60000.0,1000.0,gray,white,1300;37,114,2000.0,50000.0,1000.0,orange,white,100");
}
//添加饼状对比图
function addPartialCappedCylinder(layerName){
    theApplet.getAirspaceTool().addPartialCappedCylinder(layerName, "39,116,5000.0,10000.0,0.0,30000.0,0.0,90.0,90.0,360.0,blue,red,100,1000;38,117,5000.0,10000.0,0.0,30000.0,0.0,180.0,180.0,360.0,blue,red,100,1000;38,116,5000.0,10000.0,0.0,30000.0,0.0,270.0,270.0,360.0,blue,yellow,100,1000;39,115,5000.0,10000.0,0.0,30000.0,0.0,45.0,45.0,360.0,blue,red,100,1000");
}

//移除专题图
function deleteAirspaceLayer(layerName){
    theApplet.getAirspaceTool().deleteAirspaceLayer(layerName);
}
//隐藏专题图层
function hideAirspaceLayer(layerName){
    theApplet.getAirspaceTool().hideAirspaceLayer(layerName);
}
//显示专题图
function showAirspaceLayer(layerName){
   theApplet.getAirspaceTool().showAirspaceLayer(layerName);
}
