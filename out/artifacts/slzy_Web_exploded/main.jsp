<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>辽宁省森林资源管理系统</title>
<link id="theme"
	href="<%=basePath%>/v6/Extjs4.2.1/resources/css/ext-all-neptune.css"
	rel="stylesheet" />
<script src="<%=basePath%>/v6/Extjs4.2.1/bootstrap.js"></script>
<script src="<%=basePath%>/v6/Extjs4.2.1/local/ext-lang-zh_CN.js"></script>
<script src="<%=basePath%>/v6/Extjs4.2.1/src/ux/TreePicker.js"></script>
<script type="text/javascript"
	src="<%=basePath%>/js/openLayers/OpenLayers.js" type="text/javascript"></script>
	<script type="text/javascript"
	src="<%=basePath%>/js/openLayers/zh-CN.js" type="text/javascript"></script>
<script type="text/javascript" src="<%=basePath%>/js/openLayers/AgsTileLayer.js" type="text/javascript"></script>
<script type="text/javascript" src="<%=basePath%>/js/openLayers/ESRICache.js" type="text/javascript"></script>
<script type="text/javascript" src="<%=basePath%>/v6js/config/config.js"
	type="text/javascript"></script>
<script type="text/javascript" src="<%=basePath%>/v6js/javascript.util.js"></script>
<script type="text/javascript" src="<%=basePath%>/v6js/jsts.js"></script>
<!-- <script type="text/javascript" src="http://gis.ibbeck.de/JSTS_Topology_Suite/jsts-0.11.1/lib/javascript.util.js"></script>
<script type="text/javascript" src="http://gis.ibbeck.de/JSTS_Topology_Suite/jsts-0.11.1/lib/jsts.js"></script> -->
<script type="text/javascript" src="<%=basePath%>/v6js/2d/2d.js" type="text/javascript"></script>
<script type="text/javascript" src="<%=basePath%>/js/deployJava.js"></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/base.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/index.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/systemTool.js"></script>
<script type="text/javascript"
	src="<%=basePath%>/js/systemManageTool.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/queryTool.js"></script>
<script type="text/javascript"
	src="<%=basePath%>/js/flyLineManageTool.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/layerTool.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/labelTool.js"></script>
<script type="text/javascript"
	src="<%=basePath%>/js/spatialAnalyseTool.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/viewControlTool.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/dataLoadTool.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/themePicTool.js"></script>

<script type="text/javascript" src="<%=basePath%>/js/3d/InitLayers.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/3d/BaseTool.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/3d/MeasureTool.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/3d/QueryTool.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/3d/WorldModel.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/3d/ModelTool.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/3d/MarkerTool.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/3d/KmlFiles.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/3d/ShpFiles.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/3d/DrawTool.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/3d/Window.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/3d/AirspaceTool.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/3d/AnalyseTool.js"></script>


<script type="text/javascript"
	src="<%=basePath%>/js/sysManage/userManager.js"></script>
<script type="text/javascript"
	src="<%=basePath%>/js/sysManage/roleManager.js"></script>
<script type="text/javascript"
	src="<%=basePath%>/js/sysManage/moduleManager.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/2d/tool.js"></script>
<script type="text/javascript"
	src="<%=basePath%>/js/sysManage/logManager.js"></script>
	<script type="text/javascript">
	var hostPath = window.location.protocol + '//' + window.location.host + '/'
			+ window.location.pathname.split('/')[1];
	 
    var weekDayLabels = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
	var now = new Date();
    var year=now.getFullYear();
	var month=now.getMonth()+1;
	var day=now.getDate();
    var currentime = year+"年"+month+"月"+day+"日 "+weekDayLabels[now.getDay()];
    var points="";
	var bugFixed;
	var userName = '${userName}';

	var curUser=Ext.JSON.decode('${sessionScope.sessionUser}');
	var cur_areaName = "辽宁省";
	var cur_areaID = "0021";
	var cur_areaName = curUser.address;
	var cur_areaCode = "210000";
	
	var mapMaxExtent = new OpenLayers.Bounds(118.53,38.43,125.46,43.26);
	
	if(curUser.email.indexOf(";")>0){
		cur_areaCode = curUser.email.split(';')[0];
		cur_areaID = curUser.email.split(';')[1];
	}
	
	if(curUser.department.indexOf(",")>0){
		//cur_areaCode = curUser.email.split(';')[0];
		//cur_areaID = curUser.email.split(';')[1];
		var bounds = curUser.department.split(',');
		mapMaxExtent = new OpenLayers.Bounds(bounds[0], bounds[1], bounds[2], bounds[3]);
	}

	var roleModule=Ext.JSON.decode('${sessionScope.sessionModule}');
	function hasPermisson(moduleID){
		for(var i=0;i<roleModule.length;i++){
			if(moduleID==roleModule[i].sys_module_id){
				//console.log(roleModule);
				return true;
			}
		}
		return false;
	}
	
	//queryXZQH(cur_codeLevel, cur_areaCode, getMaxExtent);
	
	
	
	function getMaxExtent(req){
		var gml = new OpenLayers.Format.GML();
		features = gml.read(req.responseText);
		mapMaxExtent = features[0].geometry.bounds;
	}
	
</script>
<%-- <script src="<%=basePath%>/applet.jsp"></script> --%>
<script src="<%=basePath%>/v6/app.js"></script>
<%-- <script type="text/javascript" src="<%=basePath%>/js/2d/queryTool2D.js"></script> --%>
<script type="text/javascript" src="<%=basePath%>/js/GaussPrj.js"></script>

<style type="text/css">ß
html, body {
	font: normal 12px verdana;
	font-family: "Microsoft YaHei" ! important;
	margin: 0;
	padding: 0;
	border: 0 none;

	height: 100%;
}

table.gridtable {
	width: 100%;
	font-family: verdana, arial, sans-serif;
	font-size: 11px;
	color: #333333;
	border-width: 1px;
	border-color: #666666;
	border-collapse: collapse;
}

table.gridtable th {
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #666666;
	background-color: #dedede;
}

table.gridtable td {
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #666666;
	background-color: #ffffff;
}
.splitLine{
background-image:url('images/header/bg_headline.png');
height: 100%;
background-size: cover;
}


p {
	margin: 5px;
}

 .x-btn-default-large-mc {
background:#157fcc
}
.x-btn-default-large-ml {
background:#157fcc
}
.x-btn-default-large-mr {
background:#157fcc
}
.x-btn-default-large-tc {
background:#157fcb
}
.x-btn-default-large-tl {
background:#157fcc
}
.x-btn-default-large-tr {
background:#157fcc
}
.x-btn-default-large-bc {
background:#157fcb
}
.x-btn-default-large-br {
background:#157fcc
}
.x-btn-default-large-bl {
background:#157fcc
}

#mask .olControlLayerSwitcher{
top:28% !important;
right:16.7% !important
}

#mask .olControlOverviewMap{
top:65% !important;
right:16.7% !important
}
#mask .olControlOverviewMapMaximizeButton{
bottom:88% !important;
}
#mask .olControlOverviewMapMinimizeButton{
bottom:88% !important;

}

</style>
<link rel="stylesheet" href="css/icon.css" type="text/css"/>
</head>
<body>
	<div style="display:none;">
		<div id="infoMenu">
			<table style="border:0;" width="100%">
				<tr align="center">
					<td width="25%" onclick="IndexTool.openInfo('water','水文信息');" style="cursor:pointer;"><img src="images/SWXX.png" alt="水文信息"/><div style="font-size:14px;">水文信息</div></td>
					<td width="25%" onclick="IndexTool.openInfo('water','水位信息');" style="cursor:pointer;"><img src="images/SWXX1.png" alt="水位信息"/><div style="font-size:14px;">水位信息</div></td>
					<td width="25%" onclick="IndexTool.openInfo('water','两情信息');" style="cursor:pointer;"><img src="images/YQXX.png" alt="两情信息"/><div style="font-size:14px;">雨情信息</div></td>
					<td width="25%" onclick="IndexTool.showVideoInfo('water','视频监控');" style="cursor:pointer;"><img src="images/SPJK.png" alt="视频监控"/><div style="font-size:14px;">视频监控</div></td>
				</tr>
				<tr align="center">
					<td onclick="IndexTool.openInfo('water','气象信息');" style="cursor:pointer;"><img src="images/QXXX.png" alt="气象信息"/><div style="font-size:14px;">气象信息</div></td>
					<td onclick="IndexTool.openInfo('water','地震监测信息');" style="cursor:pointer;"><img src="images/DZJCXX.png" alt="地震监测信息"/><div style="font-size:14px;">地震监测</div></td>
					<td onclick="IndexTool.openInfo('water','积雪监测信息');" style="cursor:pointer;"><img src="images/JXJCXX.png" alt="积雪监测信息"/><div style="font-size:14px;">积雪监测</div></td>
					<td onclick="IndexTool.openInfo('water','大坝监测信息');" style="cursor:pointer;"><img src="images/DBJCXX.png" alt="大坝监测信息"/><div style="font-size:14px;">大坝监测</div></td>
				</tr>
				<tr align="center">
					<td onclick="IndexTool.openInfo('water','发电站信息');" style="cursor:pointer;"><img src="images/FDZXX.png" alt="发电站信息"/><div style="font-size:14px;">电站信息</div></td>
					<td onclick="IndexTool.toggleReservoirVolume(true);" style="cursor:pointer;"><img src="images/SWKRZTT.png" alt="水位库容曲线分析"/><div style="font-size:14px;">曲线分析</div></td>
					<td></td>
					<td></td>
				</tr>
			</table>
		</div>
		<div id="queryMenu">
			<table style="border:0;" width="100%">
				<tr align="center">
					<td width="25%" onclick="queryTool2D.openInfo('query_xb','小班查询');" style="cursor:pointer;"><img src="images/SWXX.png" alt="小班查询"/><div style="font-size:14px;">小班查询</div></td>
					<td width="25%" onclick="queryTool2D.openInfo('query_ld','林班查询');" style="cursor:pointer;"><img src="images/SWXX1.png" alt="林带查询"/><div style="font-size:14px;">林带查询</div></td>
					<td width="25%" onclick="queryTool2D.openInfo('query_cond','条件查询');" style="cursor:pointer;"><img src="images/YQXX.png" alt="条件查询"/><div style="font-size:14px;">条件查询</div></td>
					<td width="25%"/>
				</tr>
			</table>
		</div>
		<div id="spatialAnalysisMenu"  >
			<table style="border:0;" width="100%">
				<tr align="center">
					<td width="25%" onclick="IndexTool.toggleAnalyse('sightAnalyseForm');" style="cursor:pointer;"><img src="images/TSFX.png" alt="通视分析"/><div style="font-size:14px;">通视分析</div></td>
					<td width="25%" onclick="IndexTool.toggleAnalyse('slopeAnalyseForm');" style="cursor:pointer;"><img src="images/PDPXFX.png" alt="坡度坡向分析"/><div style="font-size:14px;">坡度坡向</div></td>
					<%-- <td width="25%" onclick="IndexTool.toggleAnalyse('waterFloodAnalyseForm');" style="cursor:pointer;"><img src="images/SYFX.png" alt="水淹分析"/><div style="font-size:14px;">水淹分析</div></td> --%>
					<td width="25%" onclick="IndexTool.toggleAnalyse('terrainAnalyseForm');" style="cursor:pointer;"><img src="images/PMFX.png" alt="剖面分析"/><div style="font-size:14px;">剖面分析</div></td> 
					<td onclick="IndexTool.toggleAnalyse('measureAnalyseForm');" style="cursor:pointer;"><img src="images/projectShow.png" alt="量算分析"/><div style="font-size:14px;">量算分析</div></td>
				</tr>
				<tr align="center">
<%-- 					<td onclick="IndexTool.toggleAnalyse('fluctuateAnalyseForm');" style="cursor:pointer;"><img src="images/XLQFX.png" alt="消落区分析"/><div style="font-size:14px;">消落区分析</div></td> --%>
<%-- 					<td onclick="IndexTool.toggleAnalyse('digFillAnalyseForm');" style="cursor:pointer;"><img src="images/WTFFX.png" alt="挖填方分析"/><div style="font-size:14px;">挖填方分析</div></td>
					<td onclick="IndexTool.toggleAnalyse('lightAnalyseForm');" style="cursor:pointer;"><img src="images/TYGZ.png" alt="光照分析"/><div style="font-size:14px;">光照分析</div></td> --%>
				</tr>
				<tr align="center" height="70">
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</table>
		</div>
		<div id="systemManageMenu">
			<table style="border:0;" width="100%">
				<tr align="center">
					<td width="25%" onclick="App.tabs.userManager.init();" style="cursor:pointer;"><img src="images/usersManagerment.png" alt="用户管理"/><div style="font-size:14px;">用户管理</div></td>
					<td width="25%" onclick="App.tabs.roleManager.init();" style="cursor:pointer;"><img src="images/roleManagerment.png" alt="角色管理"/><div style="font-size:14px;">角色管理</div></td>
					<td width="25%" onclick="App.tabs.moduleManager.init();" style="cursor:pointer;"><img src="images/limitsManagerment.png" alt="权限管理"/><div style="font-size:14px;">权限管理</div></td>
					<td width="25%" onclick="App.tabs.logManager.init();" style="cursor:pointer;"><img src="images/logsMangerment.png" alt="日志管理"/><div style="font-size:14px;">日志管理</div></td>
				</tr>
			</table>
		</div>
		<div id="queryButtonMenu">
			<table style="border:0;" width="100%">
				<tr align="center">
					<td width="25%" onclick="startDrawShape('Polygon');" style="cursor:pointer;"><img src="images/icon/quest_pol.png" alt="多边形"/></td>
					<td width="25%" onclick="startDrawShape('Rectangle');" style="cursor:pointer;"><img src="images/icon/quest_rec.png" alt="正方形"/></td>
					<td width="25%" onclick="startDrawShape('Circle');" style="cursor:pointer;"><img src="images/icon/quest_cir.png" alt="圆"/></td>
					<td width="25%" onclick="clearQuery();" style="cursor:pointer;"><img src="images/icon/clear.png" alt="清除"/></td>
				</tr>
			</table>
		</div>
		
		<div id="measureAnalyseMenu">
			<table style="border:0;" width="100%">
				<tr align="center">
					<td width="33%" onclick="IndexTool.stopAllTool();startMeasureDistance('0');" style="cursor:pointer;"><img src="images/measureDistance.png" alt="测距离"/><div style="font-size:13px;">测距离</div></td>
					<td width="33%" onclick="IndexTool.stopAllTool();startMeasureArea('1');" style="cursor:pointer;"><img src="images/measureArea.png" alt="测面积"/><div style="font-size:13px;">测面积</div></td>
					<td width="33%" onclick="IndexTool.stopAllTool();startMeasureHeight();" style="cursor:pointer;"><img src="images/measureHeight.png" alt="测高度"/><div style="font-size:13px;">测高度</div></td>
<!-- 					<td width="25%" onclick="IndexTool.stopAllTool();startMeasureVolume();" style="cursor:pointer;"><img src="images/measureVolume.png" alt="测体积"/><div style="font-size:13px;">测体积</div></td> -->
				</tr>
			</table>
		</div>
		
		<div id="lightAnalyseMenu">
			<table style="border:0;" width="100%">
				<tr align="center">
					<td width="25%" onclick="IndexTool.stopAllTool();ViewControlTool.elementToggle(9,true);" style="cursor:pointer;"><img src="images/TYGZ.png" alt="太阳光照"/><div style="font-size:13px;">太阳光照</div></td>
					<td width="25%" onclick="IndexTool.stopAllTool();ViewControlTool.elementToggle(8,true);" style="cursor:pointer;"><img src="images/WHXS.png" alt="雾化显示"/><div style="font-size:13px;">雾化显示</div></td>
					<td width="25%"></td>
					<td width="25%"></td>
				</tr>
			</table>
		</div>
	</div>

</body>
</html>