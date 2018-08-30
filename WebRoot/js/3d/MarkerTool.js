//地标添加相关管理,气泡框，文字标签

function createMarkerTool(){
     var b = theApplet.createMarkerTool();
}

//添加地标
function addMarker(lat,lon,path,label,id){
	removeAllMarkers();
    theApplet.getMarkerToolOption().addMarker(lat,lon,path,label,id);
}

//添加地标小气泡
function addMarkerAnnotation(lat,lon,path,label,text,width,height,id){
	theApplet.getMarkerToolOption().addMarkerAnnotation(lat,lon,path,label,text,width,height,id);
}

//删除地标
function deleteMarker(id){
    theApplet.getMarkerToolOption().deleteMarker(id);
}
//移除所有地标
function removeAllMarkers(){
    theApplet.getMarkerToolOption().removeAllMarkers();
}

//添加预警图标
function addWarnIcon(lat,lon,id){
    theApplet.getMarkerToolOption().addWarnIcon(lat,lon,id);
}
//删除预警图标
function deleteWarnIcon(id){
    theApplet.getMarkerToolOption().deleteWarnIcon(id);
}
//添加小气泡
/*"<p>\n<b><font color=\"#664400\">LA CLAPI\u00c8RE</font></b><br />\n<i>Alt: "
	                + "1100-1700m</i>\n</p>\n<p>\n<b>Glissement de terrain majeur</b> dans la haute Tin\u00e9e, sur "
	                + "un flanc du <a href=\"http://www.mercantour.eu\">Parc du Mercantour</a>, Alpes Maritimes.\n</p>\n"
	                + "<p>\nRisque aggrav\u00e9 d'<b>inondation</b> du village de <i>Saint \u00c9tienne de Tin\u00e9e</i> "
	                + "juste en amont.\n</p>"
  */
function addAnnotation(strText,lat,lon,width,height,id){
    theApplet.getMarkerToolOption().addAnnotation(strText,lat,lon,width,height,id);
}
//删除小气泡
function deleteAnnotation(id){
    theApplet.getMarkerToolOption().deleteAnnotation(id);
}

//删除所有小气泡
function removeAllAnnotation(){
    theApplet.getMarkerToolOption().removeAllAnnotation();
}
//改变气泡框内容
function changeAnnotationText(id,htmltext){
   theApplet.getMarkerToolOption().changeAnnotationText(id,htmltext);
}
//屏幕上的框
function addScreenAnnotationBalloon(htmlText,x,y,width,height,id){
   theApplet.getMarkerToolOption().addScreenAnnotationBalloon(htmlText,x,y,width,height,id);
}

//开始添加标注
function startAddMarker(path,label){
   theApplet.getMarkerToolOption().startAddMarker(path,label);
}
//结束添加标注
function stopAddMarker(){
   return theApplet.getMarkerToolOption().stopAddMarker();
}

