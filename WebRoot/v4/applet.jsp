<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>applet.jsp</title>
    <script type="text/javascript">
	function setValue(id,value){
		parent.IndexTool.setValue(id,value);
	}
	function showLeftMenu(menuName){
		parent.showLeftMenu(menuName);
	}
	
	function topControls(controlName){
		//复位
		if(controlName=="reset"){
			parent.flyToLocation(37.81210,75.44671,24000,100,70,10000);
		}
		//放大
		if(controlName=="out"){
			parent.zoomOut();
		}
		//缩小
		if(controlName=="in"){
			parent.zoomIn();
		}
		//漫游
		if(controlName=="pan"){
			parent.clearMap();
		}
		//鹰眼
		if(controlName=="overview"){
			parent.ViewControlTool.elementToggle(3,false);
		}
		//全屏
		if(controlName=="screen"){
			parent.screen();
		}
	}
    </script>
  </head>
  <body onload="parent.onPageLoad();" style="margin-top:0px;margin-bottom:4px;margin-left:0px;margin-right:0px;">
    <a id="hideit" href="#"></a>
		<object classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93"
			id="wwjApplet" name="wwjApplet" width="100%" height="100%" codebase="../lib/jre6.0.exe#Version=1,6,2,0, ../lib/applet-launcher.jar">
			<param name="code" value="org.jdesktop.applet.util.JNLPAppletLauncher" />
			<param name="archive" value="../lib/jssolution.jar,../lib/worldwind.jar,../lib/worldwindx.jar,../lib/WWJApplet.jar,../lib/plugin.jar,../lib/jogl.jar,../lib/gluegen-rt.jar" />
			<param name="codebase_lookup" value="false" />
			<param name="subapplet.classname" value="WWJApplet" />
			<param name="layerUrl" value="<%=basePath %>/getLayers.jhtml" />
			<param name="subapplet.displayname" value="WWJ Applet" />
			<param name="noddraw.check" value="true" />
			<param name="progressbar" value="true" />
			<param name="jnlpNumExtensions" value="1" />
			<param name="jnlp_href" value="../WWJApplet.jsp">
			<param name="VerticalExaggeration" value="1" />
			<param name="wmode" value="opaque"/>
		</object>
  </body>
</html>
