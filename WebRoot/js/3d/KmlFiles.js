//对于KML文件的操作
function createKmlFiles(){
   theApplet.createKmlFiles();
}
//因为权限限制不好使
function addKml(path,layerName){
   alert(theApplet.getKmlFilesOption().addKml2(path,layerName));
}
//因为权限限制不好使
function addKml3(filePath,layerName){
   alert(theApplet.getKmlFilesOption().addKml3(filePath,layerName));
}

//显示与隐藏
function setKmlIsEnabled(layerName,status){
   theApplet.getKmlFilesOption().setKmlIsEnabled(layerName,status);
}

//删除
function removeKml(layerName){
   theApplet.getKmlFilesOption().removeKml(layerName);
}
//清除
function removeAllKml(){
   theApplet.getKmlFilesOption().removeKml("");
}