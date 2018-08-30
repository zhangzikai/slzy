<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>下坂地建管局水资源管理系统</title> 
	<style type="text/css">
	html,body {
		font: normal 12px verdana;
		margin: 0;
		padding: 0;
		border: 0 none;

		height: 100%;
	}
	
	p {
		margin: 5px;
	}
	</style>
	<script type="text/javascript" src="${ctx}/js/systemTool.js"></script>
	<script type="text/javascript" src="${ctx}/js/systemManageTool.js"></script>
	<script type="text/javascript" src="${ctx}/js/queryTool.js"></script>
	<script type="text/javascript" src="${ctx}/js/flyLineManageTool.js"></script>
	<script type="text/javascript" src="${ctx}/js/2d/tool.js"></script>
	<script type="text/javascript">
	Ext.onReady(function() {
			var toolMenu = new Ext.menu.Menu({  
                //设置菜单四条边都有阴影  
                shadow : 'frame',  
                //添加菜单项  
                items:[  
                    {  
                        text:'打印',
                        handler : function(){printMap();}
                    },  
                    {  
                        text:'导出', 
                        handler : function(){Export();}
                    }
					,  
                    {  
                        text:'保存'  
                       /*  <!-- handler:onMenuCheck   --> */
                    }  
                ]  
            });  
			var thematicmapMenu = new Ext.menu.Menu({  
                //设置菜单四条边都有阴影  
                shadow : 'frame',  
                //添加菜单项  
                items:[  
                    {  
                        text:'版块渲染',
                        handler : function(){thematicmap_test1();}
                    },  
                    {  
                        text:'饼状图', 
                        handler : function(){}
                    }
					,  
                    {  
                        text:'柱状图', 
                        handler : function(){}
                    }  
                ]  
            });  
			Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
				//Ext.QuickTips.init();   //     
				var viewport = new Ext.Viewport(
						{
							layout : 'border',
							enableTabScroll : true,
							items : [
									new Ext.BoxComponent({ // raw
										region : 'north',
										el : 'north',
										height : 85
									}),
									{
										id:'East',
										region : 'east',
										title : '查询展示',
										collapsible : true,
										split : true,
										width : 300,
										minSize : 250,
										maxSize : 400,
										layout : 'fit',
										margins : '0 0 0 5',
										items : [
													{
														html : '<div id="tabs"></div>'
													}
												]
									},
									{
										region : 'west',
										id : 'west-panel',
										title : '工具栏',
										split : true,
										width : 200,
										minSize : 175,
										maxSize : 400,
										collapsible : true,
										margins : '0 0 0 5',
										layout : 'accordion',
										layoutConfig : {
											animate : false
										},
										items : [{
													id : 'West',
													collapsed:true,
													//contentEl : 'west',
													html:'<div id="west" style="position:absolute;top:-5px;width:100%;height:100%;bottom:-5px;"></div>',
													title : '图层控制',
													border : false,
													iconCls : 'nav',
													/* <!-- height:100, --> */
													hidden : true
												},
												{
													id : 'layerManager',
													title : '图层管理',
													collapsed:true,
													html : '<div style="text-align: center;vertical-align: middle;"><img src="images/gisDatas.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">基础地理信息数据</span></div></div><div style="text-align: center;vertical-align: middle;"><img src="images/RSDatas.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">遥感影像数据</span></div></div><div style="text-align: center;vertical-align: middle;"><img src="images/3DDatas.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">三维模型数据</span></div></div><div style="text-align: center;vertical-align: middle;"><img src="images/weatherDatas.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">气象数据</span></div></div><div style="text-align: center;vertical-align: middle;"><img src="images/waterDatas.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">水资源数据</span></div></div>',
													border : false,
													autoScroll : true,
													iconCls : 'Manage'
												},
												{
													id : 'xitongGL',
													title : '系统管理',
													html : '<div style="text-align: center;vertical-align: middle;" onclick="SystemManageTool.userQuery();"><img src="images/usersManagerment.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">用户管理</span></div></div><div style="text-align: center;vertical-align: middle;" onclick="SystemManageTool.roleQuery();"><img src="images/roleManagerment.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">角色管理</span></div></div><div style="text-align: center;vertical-align: middle;" onclick="SystemManageTool.privilegeQuery();"><img src="images/limitsManagerment.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">权限管理</span></div></div><div style="text-align: center;vertical-align: middle;" onclick="SystemManageTool.sysLogQuery();"><img src="images/logsMangerment.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">日志管理</span></div></div>',
													border : false,
													autoScroll:true,
													iconCls : 'System'
												},
												{
													id : 'dixing',
													title : '地形加载',
													html : '<div style="text-align: center;vertical-align: middle;" onclick="shuiKuLoad();"><img src="images/loadScene.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">水库地形</span></div></div>',
													border : false,
													autoScroll:true,
													iconCls : 'Scene'
												},
												{
													id : 'moxing',
													title : '模型加载',
													html : '<div style="text-align: center;vertical-align: middle;" onclick="modelLoad(1);"><img src="images/loadScene.png" style="cursor: pointer;"></img><div style="cursor: pointer;">水库大坝1</div></div><div style="text-align: center;vertical-align: middle;" onclick="modelLoad(2);"><img src="images/loadScene.png" style="cursor: pointer;"></img><div style="cursor: pointer;">水库大坝2</div></div>',
													border : false,
													autoScroll:true,
													iconCls : 'Scene'
												},
												{
													id : 'yundong',
													title : '运动控制',
													html : '<div style="text-align: center;vertical-align: middle;" onclick="FlyLineManageTool.flyLineQuery();"><img src="images/loadScene.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">飞行路径</span></div></div>',
													border : false,
													autoScroll:true,
													iconCls : 'Scene'
												},
												{
													id : 'dingwei',
													title : '查询定位',
													html : '<div style="text-align: center;vertical-align: middle;" onclick="QueryTool.goLhbQuery();"><img src="images/loadScene.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">拦河坝查询</span></div></div><div style="text-align: center;vertical-align: middle;" onclick="QueryTool.goXhzQuery();"><img src="images/loadModel.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">泄洪闸查询</span></div></div><div style="text-align: center;vertical-align: middle;" onclick="QueryTool.goShbQuery();"><img src="images/loadModel.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">顺河坝查询</span></div></div>',
													border : false,
													autoScroll:true,
													iconCls : 'Scene'
												},
												{
													id : 'shuiyan',
													title : '水淹分析',
													html : '<div style="text-align: center;vertical-align: middle;"><img src="images/SYFX.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">水淹分析</span></div></div>',
													border : false,
													autoScroll:true,
													iconCls : 'Scene'
												},
												{
													id : 'duomeiti',
													title : '多媒体录制',
													html : '<div style="text-align: center;vertical-align: middle;" onclick="SceneLoad();"><img src="images/loadScene.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">加载场景</span></div></div><div style="text-align: center;vertical-align: middle;"><img src="images/loadModel.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">加载模型</span></div></div><div style="text-align: center;vertical-align: middle;"><img src="images/switchScene.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">场景切换</span></div></div><div style="text-align: center;vertical-align: middle;" onclick="toggleCompass()"><img src="images/compass.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">指北针</span></div></div><div style="text-align: center;vertical-align: middle;" onclick="toggleLatLonGraticuleLayer();"><img src="images/viewsControl.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">视图操作</span></div></div><div style="text-align: center;vertical-align: middle;" onclick="toggleScale();"><img src="images/scale.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">比例尺</span></div></div>',
													border : false,
													autoScroll:true,
													iconCls : 'Scene'
												},
												{
													id : 'liulan',
													title : '场景浏览',
													html : '<div style="text-align: center;vertical-align: middle;" onclick="SceneLoad();"><img src="images/loadScene.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">加载场景</span></div></div><div style="text-align: center;vertical-align: middle;"><img src="images/loadModel.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">加载模型</span></div></div><div style="text-align: center;vertical-align: middle;"><img src="images/switchScene.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">场景切换</span></div></div><div style="text-align: center;vertical-align: middle;" onclick="toggleCompass()"><img src="images/compass.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">指北针</span></div></div><div style="text-align: center;vertical-align: middle;" onclick="toggleLatLonGraticuleLayer();"><img src="images/viewsControl.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">视图操作</span></div></div><div style="text-align: center;vertical-align: middle;" onclick="toggleScale();"><img src="images/scale.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">比例尺</span></div></div>',
													border : false,
													autoScroll:true,
													iconCls : 'Scene'
												},
												{
													id : 'feixingKZ',
													title : '飞行控制',
													html : '<div style="text-align: center;vertical-align: middle;"><img src="images/addLines.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">添加飞行路线</span></div></div><div style="text-align: center;vertical-align: middle;"><img src="images/alterLines.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">修改飞行路线</span></div></div><div style="text-align: center;vertical-align: middle;"><img src="images/saveLines.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">保存飞行路线</span></div></div><div style="text-align: center;vertical-align: middle;"><img src="images/recordAndOut.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">视频录制与输出</span></div></div>',
													border : false,
													autoScroll:true,
													iconCls : 'Flight'
												},
												{
													id : 'kongjianFX',
													title : '空间分析',
													html : '<div id="hc" style="text-align: center;vertical-align: middle;"><img src="images/HCFX.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">缓冲区分析</span></div></div><div style="text-align: center;vertical-align: middle;"><img src="images/SYFX.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">水淹分析</span></div></div><div style="text-align: center;vertical-align: middle;"><img src="images/PMFX.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">剖面分析</span></div></div><div style="text-align: center;vertical-align: middle;"><img src="images/TSFX.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">通视分析</span></div></div>',
													border : false,
													autoScroll:true,
													iconCls : 'Space'
												} ]
									},

									new Ext.TabPanel({
										region : 'center',
										deferredRender : false,
										tabPosition : 'bottom',
										activeTab : 0,
										listeners : {
											tabchange : function(tabPanl,newTab,currentTab) {
												if (this.getActiveTab().id=='2d') {
													Ext.getCmp('xitongGL').expand(true);
													Ext.getCmp('West').setVisible(true);
													Ext.getCmp('layerManager').setVisible(true);
													Ext.getCmp('xitongGL').setVisible(true);
													Ext.getCmp('liulan').setVisible(false);
													Ext.getCmp('feixingKZ').setVisible(false);
													Ext.getCmp('kongjianFX').setVisible(false);
												} else {
													Ext.getCmp('West').setVisible(false);
													Ext.getCmp('layerManager').setVisible(true);
													Ext.getCmp('xitongGL').setVisible(true);
													Ext.getCmp('liulan').setVisible(true);
													Ext.getCmp('feixingKZ').setVisible(true);
													Ext.getCmp('kongjianFX').setVisible(true);
													Ext.getCmp('kongjianFX').expand(true);
												}
											}
										},
										items : [{
											id : '3d',
											contentEl : 'center2',
											tabPosition:'bottom',
											title : '三维影像',
											autoScroll : true,
												tbar : [{
															text : '放大',
															iconCls : 'zin',
															handler : function(){
																zoomIn();
															}
														}, '-', {
															text : '缩小',
															iconCls : 'zout',
															handler : function(){
																zoomOut();
															}
														},'-',{
															text : '复位',
															iconCls : 'resetmap',
															handler : function(){
																resetView();
															}
														},'-',{
															text : '测距离',
															iconCls : 'measure',
															handler:function(){
																closezoom();
																clearActivate();
																toggleControl('line');
															}
														},'-',{
															text : '测面积',
															iconCls : 'area',
															handler:function(){
																closezoom();
																clearActivate();
																toggleControl('polygon');
															}
														},'-',{
															text : '测高度',
															iconCls : 'high',
															handler:function(){
																closezoom();
																clearActivate();
																toggleControl('polygon');
															}
														},'-',{
															text : '清除',
															iconCls : 'clear',
															handler:function(){
																clearModel();
																clearMeasure();
																removeAllMarkers();
															}
														},'-',{
															text : '下载jdk',
															iconCls : 'load',
															handler : function(){
																window.open("./lib/jre.exe", "_blank");
															}
														},'-',{
															text : '全屏/退出',
															id:'fullScreen',
															handler : function(){
																if(Ext.getCmp('East').collapsed){
																	Ext.getCmp('East').toggleCollapse(false);
																	Ext.getCmp('west-panel').toggleCollapse(false);
																}else{
																	Ext.getCmp('East').toggleCollapse(true);
																	Ext.getCmp('west-panel').toggleCollapse(true);
																}
															}
														}]
										},{
											id : '2d',
											contentEl : 'center1',
											title : '二维地图',
											tabPosition:'bottom',
											//closable:true,
											tbar : [ {
												text : '放大',
												iconCls : 'zin',
												handler : function()
												{
													clearActivate();
													zoomin();
												}
											}, '-', {
												text : '缩小',
												handler : function(){
													clearActivate();
													zoomout();
												},
												iconCls : 'zout'
											}, '-', {
												text : '复位',
												handler : function(){
													closezoom();
													zoomToExtent();
												},
												iconCls : 'resetmap'
											}, '-', {
												text : '漫游',
												iconCls : 'pan',
												handler:function(){
													closezoom();
													clearActivate();
													Ext.getCmp('East').collapse(true);
												}
											}, '-', {
												text : '测距',
												iconCls : 'measure',
												handler:function(){
													closezoom();
													clearActivate();
													toggleControl('line');
												}
											}, '-', {
												text : '测面积',
												iconCls : 'area',
												handler:function(){
													closezoom();
													clearActivate();
													toggleControl('polygon');
												}
											}, '-', {
												text : '清除',
												iconCls : 'clear',
												handler:function(){
													closezoom();
													clearActivate();
													clearLastResult();
													clearPopup();
													//清除专题图图层
													clearThematicMapLayer();
													//清除测量图层
													clearMeasure();
												}
											},'-',{
												text : '工具',
												menu:toolMenu,
												iconCls : 'tool',
												handler : function()
												{
													clearActivate();
												}
											},'-',{
												text : '专题图',
												menu:thematicmapMenu,
												iconCls : 'thematicmap',
												handler : function()
												{
													
												}
											}, '-', '查询:', {
												//text:'查询',
												iconCls : 'selectByPnt',
												handler:function(){
													clearActivate();
													selectByPnt();
													closezoom();
												}
											}, {
												//text:'查询',
												iconCls : 'selectByPolygon',
												handler:function(){
													clearActivate();
													selectByRectangle();
													closezoom();
												}
											}, '-', '关键字:', {
												xtype : 'textfield',
												width:'65px',
												id:'keyword'
											}, {
												text : '搜索',
												handler : function(){
													closezoom();
													clearActivate();
													Ext.getCmp('East').expand(true);
													query(Ext.getCmp('keyword').getValue());
												}
											//handler : query()
											} ],
											autoScroll : true
										}]
									}) ]
						});
				//viewport.getTopToolbar().Past(new Ext.Toolbar.Fill());
				Ext.get("hideit").on('click', function() {
					var w = Ext.getCmp('west-panel');
					w.collapsed ? w.expand() : w.collapse();
				});
				Ext.get("center1").on('click', function() {
					//Ext.getCmp('East').setVisible(true);
					//viewport.dolayout();

				});
				
				var tabPanel = new Ext.TabPanel({
					id:'tabsPanel',
			        renderTo:'tabs',
			        resizeTabs:true, // turn on tab resizing
			        minTabWidth: 115,
			        tabWidth:60,
			        enableTabScroll:true,
			        width:300,
			        height:670,
			        defaults: {autoScroll:true}
			    });
			    
        		tabPanel.add({
        			id:'aaaaa',
		            title: '欢迎界面',
		            iconCls: 'tabs',
		            html: '欢迎您[],使用本系统',
		            closable:true
		        }).show();
        		init2DMap();
				onPageLoad();
        		
			});
	function Current(){
		if(current.style.display=="none"){
			document.getElementById("current").style.display="";
		}
		else{
			document.getElementById("current").style.display="none";
		}
	}
	function Past(){
		if(past.style.display=="none"){
			document.getElementById("past").style.display="";
		}
		else{
			document.getElementById("past").style.display="none";
		}
	}
	function Feature(){
		if(feature.style.display=="none"){
			document.getElementById("feature").style.display="";
		}
		else{
			document.getElementById("feature").style.display="none";
		}
	}
	
	function onPageLoad(){
        //获取applet
        getWWJApplet(); 
        //使用前先创建，为的是初始化的时候不用加载全部new出来，用到在new，下面的都同理
        createBaseTool();
        createMeasureTool(); 
        createMarkerTool();
        createDrawTool();
      	//createKmlFiles();
      	createModelTool();
        createWindowOption();
        createAirspaceTool();
     }
     
     function logout(){
     	var bln=confirm("您确认要退出下坂地建管局水资源管理系统?");
            if (bln==true){
            	window.location="${ctx}/logout.jhtml";
            }  
     }
</script>
<body>
	<!-- EXAMPLES -->
	<div id="window"></div>
	<div id="output"></div>
	<!-- <div id="west" style="width: 200px; left: 5px; top: 86px;"> -->
	<div id="shift"></div>
	<div id="search"></div>
	<div id="spatial"></div>
	<div style="position:relative;z-index:999;margin-top:50px;left: 1000px;">
					欢迎用户，今天是
			<script>
				var weekDayLabels = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
				var now = new Date();
			    var year=now.getFullYear();
				var month=now.getMonth()+1;
				var day=now.getDate();
			    var currentime = year+"年"+month+"月"+day+"日 "+weekDayLabels[now.getDay()]
				document.write(currentime);
			</script>
			<a href="#" onclick="editPwd()">修改密码</a><a href="#" onclick='logout();'>退出系统</a>
	</div>
	<div id="north" align="center">
		<img src="${ctx}/images/banner.png" style="border-width:0;" border="0" width="100%">

		<span style="z-index:1000; position:absolute; left:700px; top:14px; width: 68px; height: 61px;">
		  <img src="${ctx}/images/query.png" alt="查询"/><div style="font-weight:bold;">查询</div>
		</span>
		
		<span style="z-index:1000; position:absolute; left:800px; top:14px; width: 68px; height: 61px;">
			<img src="${ctx}/images/dataLoad.png" alt="数据加载"/><div style="font-weight:bold;">数据加载</div>
		</span>
		
		<span style="z-index:1000; position:absolute; left:900px; top:14px; width: 68px; height: 61px;">
			<img src="${ctx}/images/labelManage.png" alt="标注管理"/><div style="font-weight:bold;">标注管理</div>
		</span>
		
		<span style="z-index:1000; position:absolute; left:1000px; top:14px; width: 68px; height: 61px;">
			<img src="${ctx}/images/spatial.png" alt="空间分析"/><div style="font-weight:bold;">空间分析</div>
		</span>
		
		<span style="z-index:1000; position:absolute; left:1100px; top:14px; width: 68px; height: 61px;">
			<img src="${ctx}/images/view.png" alt="视图控制"/><div style="font-weight:bold;">视图控制</div>
		</span>
		
		<span style="z-index:1000; position:absolute; left:1200px; top:14px; width: 68px; height: 61px;">
			<img src="${ctx}/images/flying.png" alt="飞行控制"/><div style="font-weight:bold;">飞行控制</div>
		</span>
		
		<span style="z-index:1000; position:absolute; left:1300px; top:14px; width: 68px; height: 61px;">
			<img src="${ctx}/images/system.png" alt="系统管理"/><div style="font-weight:bold;">系统管理</div>
		</span>
	</div>
	<div id="center2">
		<a id="hideit" href="#"></a>
		
		<object classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93"
			id="wwjApplet" name="Virtual Earth Applet" width="100%" height="98%" codebase="lib/jre6.0.exe#Version=1,6,2,0, lib/applet-launcher.jar">
			<param name="code" value="org.jdesktop.applet.util.JNLPAppletLauncher" />
			<param name="archive" value="lib/jssolution.jar,lib/worldwind.jar,lib/WWJApplet.jar,lib/jogl/jogl.jar,lib/gluegen/gluegen-rt.jar,lib/applet-launcher.jar" />
			<param name="codebase_lookup" value="false" />
			<param name="subapplet.classname" value="WWJApplet" />
			<param name="subapplet.displayname" value="WWJ Applet" />
			<param name="noddraw.check" value="true" />
			<param name="progressbar" value="true" />
			<param name="jnlpNumExtensions" value="1" />
			<param name="cache_option" value="Plugin">
			<param name="cache_archive" value="lib/jssolution.jar,lib/worldwind.jar,lib/WWJApplet.jar,lib/jogl/jogl.jar,lib/gluegen/gluegen-rt.jar,lib/applet-launcher.jar">
			<param name="jnlp_href" value="WWJApplet.jsp">
			<param name="VerticalExaggeration" value="1" />
		</object>
	</div>
	<div id="center1">
		<div id="2dMap" style="width:400px;height:200px;"></div>
	</div>
	<div id="props-panel" style="width:200px;height:200px;"></div>
  </body>
</html>
