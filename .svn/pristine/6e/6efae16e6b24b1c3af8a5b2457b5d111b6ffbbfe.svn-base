/*
 * 视图控制工具 2013-12-20 11:25:16
 * */
//类 viewControlTool
var ViewControlTool={
		isFlat:true,
		isShowLatLonGraticule:true,
		isVisibleArray:new Array(),
		/**
		*打开视图控制菜单
		*球面/平面切换、角色管理、权限管理、日志管理
		*/
		viewControl:function(){
			var html='<div style="text-align: center;vertical-align: middle;" onclick="ViewControlTool.flatOrRound();"><img id="flatOrRound" src="images/2D.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">球面/平面切换</span></div></div>'+
			'<div style="text-align: center;vertical-align: middle;" onclick="ViewControlTool.elementManage();"><img src="images/JMGL.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">界面元素</span></div></div>'+
			'<div style="text-align: center;vertical-align: middle;" onclick="ViewControlTool.latLonGraticule();"><img src="images/JWDWG.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">经纬度网格</span></div></div>'+
			'<div style="text-align: center;vertical-align: middle;" onclick="ViewControlTool.elementToggle(9,true);"><img src="images/TYGZ.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">太阳光照</span></div></div>'+
			'<div style="text-align: center;vertical-align: middle;" onclick="ViewControlTool.elementToggle(8,true);"><img src="images/WHXS.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">雾化显示</span></div></div>';
			var isShow=SystemTool.createTab("viewControlTab","视图控制",html);
			if(isShow){
				return;
			}
		},
		/**
		*球面/平面切换
		*/
		flatOrRound:function(){
			if(this.isFlat){
				setFlatGlobe(true,"gov.nasa.worldwind.globes.projectionLatLon");
				Ext.get('flatOrRound').dom.src ="images/3D.png";
				this.isFlat=false;
			}else{
				setFlatGlobe(false,"gov.nasa.worldwind.globes.projectionLatLon");
				Ext.get('flatOrRound').dom.src ="images/2D.png";
				this.isFlat=true;
			}
		},
		/**
		*显示与隐藏经纬度网格
		*/
		latLonGraticule:function(){
			if(this.isShowLatLonGraticule){
				showLatLonGraticuleLayer();
				this.isShowLatLonGraticule=false;
			}else{
				hideLatLonGraticuleLayer();
				this.isShowLatLonGraticule=true;
			}
		},
		/**
		*界面元素管理
		*/
		elementManage:function(){
			var html='<div style="text-align: center;vertical-align: middle;" onclick="ViewControlTool.elementToggle(4,false);"><img src="images/STCZ.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">视图控制</span></div></div>'+
			'<div style="text-align: center;vertical-align: middle;" onclick="ViewControlTool.elementToggle(7,false);"><img src="images/BLC.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">比例尺</span></div></div>'+
			'<div style="text-align: center;vertical-align: middle;" onclick="ViewControlTool.elementToggle(5,false);"><img src="images/ZBZ.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">方向罗盘</span></div></div>'+
			'<div style="text-align: center;vertical-align: middle;" onclick="ViewControlTool.elementToggle(3,false);"><img src="images/WHXS.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">鹰眼图</span></div></div>'+
			'<div style="text-align: center;vertical-align: middle;" onclick="ViewControlTool.elementToggle(6,false);"><img src="images/logo.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">LOGO</span></div></div>';
			var isShow=SystemTool.createTab("elementManageTab","界面元素管理",html);
			if(isShow){
				return;
			}
		},
		/**
		*界面元素显示与隐藏
		*显示Control 1:"Stars"|2:"Sky"|3:"World Map"|4:"View Controls"|5:"Compass"| 6:"Logo"| 7:"Scale bar"| 8:"Fog Layer"| 9:"Sun Light"
		*/
		elementToggle:function(element,visible){
			if(this.isVisibleArray[element]==null||this.isVisibleArray[element]==false){
				this.isVisibleArray[element]=true;
				setControlIsEnabled(element,false);
			}else{
				this.isVisibleArray[element]=false;
				setControlIsEnabled(element,true);
			}
		}
};
