//对于模型的控制，加载等

function createModelTool(){
    theApplet.createModelTool();
}
//加载模型
function addModel(path){
	theApplet.getModelToolOption().addModel(path);
}
//加载模型
function addModel(key,path,latitude,longitude,elevation){
	theApplet.getModelToolOption().addModel(key,path,latitude,longitude,elevation);
}
//删除模型
function removeModel(key){
	theApplet.getModelToolOption().removeModel(key);
}
//清除模型
function clearModel(){
	theApplet.getModelToolOption().clearModel();
}

//开始动画
function startAnimater(){
    theApplet.getModelToolOption().startAnimater();
}

//暂停动画
function stopAnimater(){
    theApplet.getModelToolOption().stopAnimater();
}

function setFly(points,elevation,pitch){
	theApplet.getModelToolOption().setFly(points,elevation,pitch);
}
//开始飞行
function startFly(points,elevation,pitch,speed,length){
	clearQuery();
	theApplet.getDrawToolOption().addPath(points,"yellow",1,"flyroute",elevation);
//	alert(elevation);
//	alert(pitch);
//	alert(speed);
//	alert(length);
    theApplet.getModelToolOption().startFly(points,elevation,pitch,speed,length);
}

//暂停飞行
function pauseFly(){
    theApplet.getModelToolOption().pauseFly();
}

//继续飞行
function resumeFly(){
    theApplet.getModelToolOption().resumeFly();
}

//退出飞行
function quitFly(){
    theApplet.getModelToolOption().quitFly();
}