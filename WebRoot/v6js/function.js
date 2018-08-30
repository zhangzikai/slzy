/**
 * 
 */
function onPageLoad(){
        //获取applet
        getWWJApplet(); 
        //使用前先创建，为的是初始化的时候不用加载全部new出来，用到在new，下面的都同理
        createBaseTool();
       	createQueryTool();
        createMeasureTool(); 
        createMarkerTool();
        createDrawTool();
      	createKmlFiles();
      	createShpFiles();
      	createModelTool();
      	createWindowOption();
        createAirspaceTool();
        createWorldModel();
        createAnalyseTool();
        ViewControlTool.elementToggle(8,false);
        ViewControlTool.elementToggle(9,false);
        ViewControlTool.elementToggle(6,false);
        //flyToTime(41.5736,122.8858,24000,100,70,10000,10000);
       
     }

	/**
	*三维点击事件回调方法(返回坐标点)
	*/
	function xbFieldShow(lat,lng){
		if(isClickXBShow){
			getFeatureByXY(lng,lat,xbFieldShowCallBack);
		}
	}	
	/**
	*openlayers查询结果回调方法(返回features)
	*显示小班属性信息
	*三维上绘画小班区域
	*/
	function xbFieldShowCallBack(response){
		var g = new OpenLayers.Format.GML();
		var features = g.read(response.responseText);
		removedAllShape();
		if(features.length>0){
			var feature=features[0];
			showXBInfo(feature);
			var components=feature.geometry.components[0].components;
			for(var i=0;i<components.length;i++){
				var points=components[i].getVertices();
				var pointStr="";//33.5,125;
				for(var j=0;j<points.length;j++){
					if(pointStr==""){
						pointStr=points[j].y+","+points[j].x;
					}else{
						pointStr=pointStr+"|"+points[j].y+","+points[j].x;
					}
				}
				addSurfacePolygon(pointStr,"blue","lightGray",0.5,feature.attributes.c_xb+i);
			}
		}
	}	
	
	/**
	*openlayers查询结果回调方法(返回features)
	*三维上绘画行政区域
	*/
	function areaInfoShowCallBack(response){
		var g = new OpenLayers.Format.GML();
		var features = g.read(response.responseText);
		removedAllShape();
		if(features.length>0){
			var feature=features[0];
			var components=feature.geometry.components[0].components;
			for(var i=0;i<components.length;i++){
				var points=components[i].getVertices();
				var pointStr="";//33.5,125;
				for(var j=0;j<points.length;j++){
					if(pointStr==""){
						pointStr=points[j].y+","+points[j].x;
					}else{
						pointStr=pointStr+"|"+points[j].y+","+points[j].x;
					}
				}
				addSurfacePolygon(pointStr,"blue","lightGray",0.5,feature.attributes.c_xb+i);
			}
			flyTo(feature.geometry.getCentroid().y,feature.geometry.getCentroid().x);
			addMarker(feature.geometry.getCentroid().y,feature.geometry.getCentroid().x,"null");///../../../../../com/sx
		}
	}
	
     function logout(){
     	var bln=confirm("您确认要退出森林资源管理系统?");
            if (bln==true){
            	window.location="${ctx}/logout.jhtml";
            }  
     }
     
     /**
	 * 判断当前用户是否具有当前应用模块的操作权限
	 * modelId 当前应用模块代码
	 */
	 function hasPermission(modelId){
		var user=Ext.decode('${sessionScope.sessionUser}');
		var flag = false;
		if(user.role){
			if(user.role.modules){
				var modules = user.role.modules;
				for(var i = 0; i < modules.length; i++) {
					if(modelId == modules[i].scn){
						flag = true;
						break;
					}else{
						flag = false;
					}
				}
			}
		}
		return flag;
	}
	
	function isShowLayer(obj){
		if(obj.name!=null&&obj.name!=""){
			var layerArray=obj.name.split(","); //字符分割 
			for(var i=0;i<layerArray.length;i++) { 
				setWMSLayerIsEnabled(layerArray[i],obj.checked); 
			} 	
		}	
	}
	
	function isShowModel(obj){
		if(obj.name!=null&&obj.name!=""){
			var layerArray=obj.name.split(","); //字符分割 
			for(var i=0;i<layerArray.length;i++) { 
				setKmlIsEnabled(layerArray[i],obj.checked);
			} 	
		}	
	}
	
	//三维切换专题图图层
	function switchShowLayer(name){
		for(var i=0;i<layers.length;i++){
			var layer=layers[i];
			 if(layer.layers!=null&&layer.wms!=null){
				 if(layer.layers==name){
					 setWMSLayerIsEnabled(layer.layers,true);
				 }else{
					 setWMSLayerIsEnabled(layer.layers,false);
				 }
			 }
         }
	}
	
	// 删除场景功能的调用
	function delSceneRecord(val){	
		if(val){
			return '<span style="color:green;"><a href="javascript:deleteScene('+val+')">删  除</a></span>';
		}else{
			return val;
		}
	}
	function deleteScene(id){
		Ext.Ajax.request({
				url:SystemTool.basePath+'/scene.jhtml?method=delete',				
				params:{'ids':id},
				callback: function(options,success,response) {
					var responseJson = Ext.util.JSON.decode(response.responseText);
			 			Ext.Msg.alert('系统提示',responseJson.msg);
			 			Ext.getCmp('sceneGrid').getStore().reload();
			 			loadSceneMenu();
				}
		});
	}
	function loadSceneMenu(){
		var sceneMenu=Ext.getCmp('sceneMenu');
		sceneMenu.removeAll();
		Ext.Ajax.request({
	        url: SystemTool.basePath+'/scene.jhtml?method=queryAll',
	        success: function(res){
	        		var jsonResult = Ext.util.JSON.decode(res.responseText);  
	            	for(var i=0;i<jsonResult.length;i++) {
						var cj = jsonResult[i];
						sceneMenu.add({
		        			text: cj.name,
		        			lon:cj.lon,
		        			lat:cj.lat,
		        			height:cj.height,
		        			pitch:cj.pitch,
		        			heading:cj.heading,
		        			zoom:cj.zoom,
		        			handler:function(){
		        				IndexTool.stopAllTool();
								flyToLocation(this.lat,this.lon,this.height,this.heading,this.pitch,this.zoom);
				            }
						});
				}
	         }
	   });
	}
	// 删除飞行路线功能的调用
	function delFlyRouteRecord(val){	
		if(val){
			return '<span style="color:green;"><a href="javascript:deleteFlyRoute('+val+')">删  除</a></span>';
		}else{
			return val;
		}
	}
	function deleteFlyRoute(id){
		Ext.Ajax.request({
				url:SystemTool.basePath+'/flyRoute.jhtml?method=delete',				
				params:{'ids':id},
				callback: function(options,success,response) {
					var responseJson = Ext.util.JSON.decode(response.responseText);
			 			Ext.Msg.alert('系统提示',responseJson.msg);
			 			Ext.getCmp('flyRouteGrid').getStore().reload();
			 			loadFlyRouteMenu();
				}
		});
	}
	function loadFlyRouteMenu(){
		var flyRouteMenu=Ext.getCmp('flyRouteMenu');
		flyRouteMenu.removeAll();
		Ext.Ajax.request({
	        url: SystemTool.basePath+'/flyRoute.jhtml?method=queryAll',
	        success: function(res){
	        		var jsonResult = Ext.util.JSON.decode(res.responseText);  
	            	for(var i=0;i<jsonResult.length;i++) {
						var flyRoute = jsonResult[i];
						flyRouteMenu.add({
		        			text: flyRoute.name,
		        			points:flyRoute.points,
		        			handler:function(){
		        				showFlyOptionWindow(this);
		        				//IndexTool.stopAllTool();
								//flyToLocation(this.lat,this.lon,this.height,this.heading,this.pitch,this.zoom);
				            }
						});
					}
	         }
	   	});
	}
	
	
   function showMenu(menuName,name){
		Ext.getCmp('layerManage').setVisible(false);
		Ext.getCmp('onlineInfo').setVisible(false);
		Ext.getCmp('spatialAnalysis').setVisible(false);
		Ext.getCmp('infoQuery').setVisible(false);
		Ext.getCmp('themequery').setVisible(false);
		Ext.getCmp('staticsquery').setVisible(false);
		Ext.getCmp('systemManage').setVisible(false);
		Ext.getCmp('queryID').setVisible(false);
		
		Ext.getCmp('controlTab').setActiveTab(1);
		
     	Ext.getCmp(menuName).setVisible(true);
     	Ext.getCmp('controlHeader').setTitle(name);
		hideThemeLayer();
		switchShowLayer(null);
   }
   
 