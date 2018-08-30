
//全局球对象
var theApplet = null;
//console.log('init loaded');
//初始化三维球
function getWWJApplet(){
   theApplet = document.getElementById('wwjAppletIframe').contentWindow.document.getElementById('wwjApplet');//document.getElementById('wwjApplet');
//   try {
//      theApplet = theApplet.getSubApplet();
//
//   }catch (e) {
//   }
   return theApplet;
}
//加载场景
function SceneLoad(){
   //基础底图
   addBaseMapLayer("http://123.56.139.52:8081/geoserver/shwy/wms","2012XBM_LZ1","shwy:2012XBM_LZ1");
   //通过geoserver自己发布的东西
   //影像
   //addWMSLayer("http://localhost:8097/geoserver/richway/wms", "image1511", "image1511","Earth/GeoserverImageLayer2");
   //矢量图层
   //addWMSLayer("http://localhost:8097/geoserver/richway/wms", "xiangzhenmian", "xiangzhenmian","Earth/xiangzhenmian");
   //矢量图层
	addWMSLayer("http://106.3.37.57:8080/geoserver/china_new/wms", "bou2_4p","bou2_4p","earth/xinjiang_xian_wgs84");
	//addWMSLayer("http://123.56.139.52:8081/geoserver/whwy/wms", "sheng","sheng","earth/xinjiang_xian_wgs84");
	//addWMSLayer("http://localhost:8888/geoserver/world/wms", "world", "world","Earth/in101503");
 
}
//加载场景
var isShuiKuShow=0;
function shuiKuLoad(){
   //基础底图
	if(isShuiKuShow==0){
		addWMSLayer("http://localhost:8888/geoserver/wms","world:states1","world:states1");
		isShuiKuShow=2;
	}else if(isShuiKuShow==1){
		setWMSLayerIsEnabled("world:states1",true);
		isShuiKuShow=2;
	}else{
		setWMSLayerIsEnabled("world:states1",false);
		isShuiKuShow=1;
	}
}

//加载场景
var isModelShow1=0;
var isModelShow2=0;
function modelLoad(type){
	if(type==1){
		if(isModelShow1==0){
			addModel("model1","com/jssolution/model/test/data/globestar/Globalstar.3ds",35.775,109.6936,800000);
			isModelShow1=1;
		}else{
			removeModel("model1");
			isModelShow1=0;
		}
	}else{
		if(isModelShow2==0){
			addModel("model2","model/data/daba.3ds",37.86,75.4,-1000);
			isModelShow2=1;
		}else{
			removeModel("model2");
			isModelShow2=0;
		}
	}
}

//显示Control 1:"Stars"|2:"Sky"|3:"World Map"|4:"View Controls"|5:"Compass"| 6:"Logo"| 7:"Scale bar"| 8:"Atmosphere"| 9:"Sun Light"
function setControlIsEnabled(id,visible){
   var b= theApplet.getWorldwindOption().setControlIsEnabled(id,visible);
}
//设置WMS图层是否可见
function setWMSLayerIsEnabled(name,isEnable){
    var b= theApplet.getWorldwindOption().setWMSLayerIsEnabled(name,isEnable);
}
//动态添加图层
//"http://localhost:8097/geoserver/richway/wms", "image1511", "GeoserverWMS影像层","Earth/GeoserverImageLayer2"
function addWMSLayer(url,layerName,title){
   theApplet.getInitLayersOption().addWMSLayer(url,layerName,title);
}
//删除图层
function removeWMSLayer(title){
   theApplet.getInitLayersOption().removeWMSLayer(title);
}

//添加底图
//http://a.tile2.opencyclemap.org/transport/,交通图
//http://a.tile.opencyclemap.org/cycle/,cycle map
//http://b.tile.openstreetmap.org/,标准
//http://mtile04.mqcdn.com/tiles/1.0.0/vy/map/,mapQuest map
//http://mtile04.mqcdn.com/tiles/1.0.0/vy/sat/ ,mapQuest image
//http://mtile02.mqcdn.com/tiles/1.0.0/vy/hyb/,mapQuest 注释
function addBaseMapLayer(baseUrl,cacheName,name){
   theApplet.getInitLayersOption().addOSMLayer(baseUrl,cacheName,name);
}
//显示格网
function showLatLonGraticuleLayer()
{
   if(theApplet!=null){
      theApplet.getInitLayersOption().showLatLonGraticuleLayer();
   }
}
//隐藏网格
function hideLatLonGraticuleLayer()
{
   if(theApplet!=null){
      theApplet.getInitLayersOption().hideLatLonGraticuleLayer();
   }
}

