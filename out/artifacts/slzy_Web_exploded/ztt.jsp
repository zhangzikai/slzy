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
<title>辽宁省森林资源管理系统-专题图</title>
<link id="theme"
	href="<%=basePath%>/v6/Extjs4.2.1/resources/css/ext-all-neptune.css"
	rel="stylesheet" />
<script src="<%=basePath%>/v6/Extjs4.2.1/bootstrap.js"></script>
<script src="<%=basePath%>/v6/Extjs4.2.1/local/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/openLayers/OpenLayers.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/systemTool.js"></script>
<script type="text/javascript" src="<%=basePath%>/v6js/config/config.js"></script>
<script src="<%=basePath%>/ztt/2d.js"></script>
<script type="text/javascript">
	var hostPath = window.location.protocol + '//' + window.location.host + '/'
			+ window.location.pathname.split('/')[1];
	
	var isFullScreen = false;
	
	var curUser=Ext.JSON.decode('${sessionScope.sessionUser}');
	var cur_areaName = "辽宁省";
	var cur_areaID = "0021";
	var cur_areaName = curUser.address;
	var cur_areaCode = "210000";
	if(curUser.email.indexOf(";")>0){
		cur_areaCode = curUser.email.split(';')[0];
		cur_areaID = curUser.email.split(';')[1];
	}
	var mapMaxExtent = new OpenLayers.Bounds(118.53,38.43,125.46,43.26);
	
	if(curUser.department.indexOf(",")>0){
		//cur_areaCode = curUser.email.split(';')[0];
		//cur_areaID = curUser.email.split(';')[1];
		var bounds = curUser.department.split(',');
		mapMaxExtent = new OpenLayers.Bounds(bounds[0], bounds[1], bounds[2], bounds[3]);
	}
	
</script>
<script src="<%=basePath%>/ztt/app.js"></script>
<style type="text/css">
  .x-toolbar{
	padding:0px
  }
</style>
</head>
<body>

</body>
</html>