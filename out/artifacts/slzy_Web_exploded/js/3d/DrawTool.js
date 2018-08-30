//绘制图形相关方法
function createDrawTool(){
    theApplet.createDrawTool();
}
//添加立方体，颜色自定义的这几种，直接用
//black,blue,red,cyan,darkGray,gray,green,lightGray,magenta,orange,pink,white,yellow
function addBox(){
    theApplet.getDrawToolOption().addBoxShape(39, 116, 0, "543","magenta", 2, 10000, 5000, 5000,0,0,0);
}

//添加圆锥
function addPath(pointStr,material,width,id){
   theApplet.getDrawToolOption().addPath(pointStr,material,width,id);
}

//添加圆锥
function addCone(){
   theApplet.getDrawToolOption().addConeShape(38, 116, 0, "543","magenta", 2, 10000, 5000, 5000,0,0,0);
}
//添加椭圆体
function addEllipsoid(){
   theApplet.getDrawToolOption().addEllipsoidShape(39, 117, 0, "543","red", 2, 10000, 5000, 5000,0,0,0);
}
//添加圆饼
function addCylinder(){
  theApplet.getDrawToolOption().addCylinderShape(38, 117, 0, "543","blue", 2, 10000, 5000, 5000,0,0,0);
}
//添加线
//33.5,125;33.5,125;35.1,129.1;35.8,127.1  颜色材质，线宽，id
function addSurfacePolyline(pointStr,material,Width,id){
  theApplet.getDrawToolOption().addSurfacePolyline(pointStr,material,Width,id);
}
//添加面  33.5,125;33.5,125;35.1,129.1;35.8,127.1 
function addSurfacePolygon(pointStr,outMaterial,inMaterial,aplha,id){
   theApplet.getDrawToolOption().addSurfacePolygon(pointStr,outMaterial,inMaterial,aplha,id);
}
//添加方向线 "49.01653274909177,-122.7349081128505,1;49.01715024535254,-122.7596194200486,10;49.02781845803761,-122.7651733463364,100;49.05312411976134,-122.7926787136435,1000;49.0747697644625,-122.8224152286015,1000;49.09727187849899,-122.8187118695457,1000;49.1002974270654,-122.7348314826556,100","blue",2,"7654"
function addDirectedPath(pointStr,material,width,id){
   theApplet.getDrawToolOption().addDirectedPath(pointStr,material,width,id);
}
//表面文字 39,116,"我爱你 I LOVE YOU","white",5000,"ily"
function addSurfaceText(lat,lon,text,color,meters,id){
   theApplet.getDrawToolOption().addSurfaceText(lat,lon,text,color,meters,id);
}
//删除
function deleteShape(id){
   theApplet.getDrawToolOption().deleteShape(id);
}
//移除全部
function removedAllShape(){
   theApplet.getDrawToolOption().removedAll();
}