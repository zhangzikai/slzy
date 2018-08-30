//对于Shp文件的操作
function createShpFiles(){
   theApplet.createShpFiles();
}
//因为权限限制不好使
function addShp(path,layerName){
   theApplet.getShpFilesOption().addShp(path);
}
//因为权限限制不好使
function addShp1(filePath,layerName){
   theApplet.getShpFilesOption().addShp1(filePath,layerName);
}

//显示与隐藏
function setShpIsEnabled(layerName,status){
   theApplet.getShpFilesOption().setShpIsEnabled(layerName,status);
}

//删除
function removeShp(layerName){
   theApplet.getShpFilesOption().removeShp(layerName);
}

//清除
function removeAllShp(){
   theApplet.getShpFilesOption().removeShp("");
}