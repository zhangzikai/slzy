//初始化窗口交互
function createWindowOption() {
	theApplet.createWindowOption();
}

// 添加点击回调函数(一次点击)
function addMouseClickListenerFunc(type) {
	if (type == 'xb')
		theApplet.getWindowOption().addMouseClickListener("doSomething");
	else if (type = 'xz')
		theApplet.getWindowOption().addMouseClickListener("doSomething1");

}
// 删除点击回调函数(一次点击)
function removeMouseClickListenerFunc() {
	theApplet.getWindowOption().removeMouseClickListener();
}

function doSomething(obj) {
	console.info(obj);
}

// 添加标注选择添加点击回调函数(一次点击)
function selectMouseClickListenerFunc() {
	removeAllMarkers();
	theApplet.getWindowOption().addMouseClickListener("doSelect");
}
function doSelect(obj) {

	Ext.get('pointTxt').dom.value = "{\"latitude\":\"" + obj.split(",")[0]
			+ "\",\"longitude\":\"" + obj.split(",")[1] + "\"}";
	addMarker(obj.split(",")[0], obj.split(",")[1], SystemTool.host
			+ SystemTool.basePath + Ext.getCmp('img').getValue().inputValue,
			Ext.get('labelnameTxt').dom.value, Math.random());
}

function StringReplaceAll(source, find, replacement) {
	return source.split(find).join(replacement);
}

function clearRoute() {
	num = 0;
	stops = "";
	deleteMarker("marker001");
	deleteMarker("marker002");
	removedAllShape();
}

function set2DCenter() {
	theApplet.getWindowOption().set2DCenter();
}
function setNorth() {
	theApplet.getWindowOption().setNorth();
}
function setVertical(){
	theApplet.getWindowOption().setVertical();
}
function set3DCenter(x, y, z) {
	try{
	theApplet.getWindowOption().set3DCenter(x, y, z);
	}catch(e){
		
	}
}

function setVerticalExaggeration(exagger) {
	try{
		theApplet.getWindowOption().setVerticalExaggeration(exagger);
	}catch(e){	
	}
}