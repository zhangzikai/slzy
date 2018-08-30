<%@ page language="java" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="<%=basePath %>"/>
<link rel="stylesheet" href="${ctx}/css/main.css" type="text/css"/>
<link rel="stylesheet" href="${ctx}/css/icon.css" type="text/css"/>
<link rel="stylesheet" href="${ctx}/css/chooser.css" type="text/css"/>

<link rel="stylesheet" type="text/css" href="${ctx}/extjs3/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/extjs3/ux/css/Spinner.css" />
<script type="text/javascript" src="${ctx}/extjs3/adapter/ext/ext-base.js"></script>
<script>
checkIeVersion();
function checkIeVersion(){
      var ver = navigator.appVersion;//浏览器版本
      var bType=navigator.appName;//浏览器类型
      var vNumber;//版本号
      if(bType=="Microsoft Internet Explorer"){
        	vNumber=parseFloat(ver.substring(ver.indexOf("MSIE")+5,ver.lastIndexOf("Windows")));
        	if(vNumber==10.0){
        		document.write("<script type='text\/javascript' src='${ctx}\/extjs3\/ext-all-ie10.js'><\/script>");
        	}else{
        		document.write("<script type='text\/javascript' src='${ctx}\/extjs3\/ext-all.js'><\/script>");
        	}
      } else{
         document.write("<script type='text\/javascript' src='${ctx}\/extjs3\/ext-all.js'><\/script>"); 
      }
 }
 

</script>
<script type="text/javascript" src="${ctx}/extjs3/ux/Spinner.js"></script>
<script type="text/javascript" src="${ctx}/extjs3/ux/SpinnerField.js"></script>
<script type="text/javascript" src="${ctx}/extjs3/ux/SliderTip.js"></script>
<script type="text/javascript" src="${ctx}/extjs3/ux/FileUploadField.js"></script>
<script type="text/javascript" src="${ctx}/extjs3/ux/ComboPageSize.js"></script>
<script type="text/javascript" src="${ctx}/extjs3/ux/DateTimeField.js"></script>
<script type="text/javascript" src="${ctx}/extjs3/ux/ComboTree.js"></script>

<script type="text/javascript" src="${ctx}/extjs3/src/locale/ext-lang-zh_CN.js"></script>

<script type="text/javascript" src="${ctx}/js/openLayers/OpenLayers.js" type="text/javascript"></script>

<script type="text/javascript" src="${ctx}/js/3d/InitLayers.js"></script>
<script type="text/javascript" src="${ctx}/js/3d/BaseTool.js"></script>
<script type="text/javascript" src="${ctx}/js/3d/MeasureTool.js"></script>
<script type="text/javascript" src="${ctx}/js/3d/QueryTool.js"></script>
<script type="text/javascript" src="${ctx}/js/3d/WorldModel.js"></script>
<script type="text/javascript" src="${ctx}/js/3d/ModelTool.js"></script>
<script type="text/javascript" src="${ctx}/js/3d/MarkerTool.js"></script>
<script type="text/javascript" src="${ctx}/js/3d/KmlFiles.js"></script>
<script type="text/javascript" src="${ctx}/js/3d/ShpFiles.js"></script>
<script type="text/javascript" src="${ctx}/js/3d/DrawTool.js"></script>
<script type="text/javascript" src="${ctx}/js/3d/Window.js"></script>
<script type="text/javascript" src="${ctx}/js/3d/AirspaceTool.js"></script>
<script type="text/javascript" src="${ctx}/js/3d/AnalyseTool.js"></script>