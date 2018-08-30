<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path;
	String jrePath = request.getHeader("user-agent").contains("x64")
			? "jre-8u91-windows-x64.exe"
			: "jre-8u91-windows-i586.exe";
	//String jrePath = request.getHeader("user-agent").contains("x64")?"jre-6u20-windows-x64.exe":"jre-6u20-windows-x86.exe";
%>
<html>
<head>
<title>applet.jsp</title>
<script type="text/javascript">
	function setValue(id, value) {
		parent.IndexTool.setValue(id, value);
	}
	function showLeftMenu(menuName) {
		parent.showLeftMenu(menuName);
	}

	function createShim() {
		parent.createShim();
	}
	function topControls(controlName) {
		//复位
		if (controlName == "reset") {
			parent.flyToLocation(37.81210, 75.44671, 24000, 100, 70, 10000);
		}
		//放大
		if (controlName == "out") {
			parent.zoomOut();
		}
		//缩小
		if (controlName == "in") {
			parent.zoomIn();
		}
		//漫游
		if (controlName == "pan") {
			parent.clearMap();
		}
		//鹰眼
		if (controlName == "overview") {
			parent.ViewControlTool.elementToggle(3, false);
		}
		//全屏
		if (controlName == "screen") {
			parent.screen();
		}
	}
	function appletInit() {
		return  parent.onPageLoad();
	}
	function doSomething(lat, lng) {
		window.parent.window.xbFieldShow(lat, lng);
	}
	
	function doSomething1(lat,lng){
		window.parent.window.areaShow(lat,lng);
	}
	function setCenter(x, y, z) {
		window.parent.window.setCenter(x, y, z);
	}
	function set3DCenter(x, y, z) {
		window.parent.window.set3DCenter(x, y, z);
	}
	function polygonAnalysis(str) {
		window.parent.window.polygonAnalysis(str);
	}
</script>
</head>
<body  
	style="margin-top: 0px; margin-bottom: 4px; margin-left: 0px; margin-right: 0px;">
	<a id="hideit" href="#"></a>
			<object classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93"
			id="wwjApplet" name="wwjApplet" width="100%" height="100%"
			codebase="<%=basePath %>/lib/<%=jrePath %>#Version=1,8,0,91">
		<!-- 	codebase="<%=basePath %>/lib/<%=jrePath %>#Version=1,4,2,12">  -->
			<param name="code" value="org.jdesktop.applet.util.JNLPAppletLauncher" />
			<param name="archive" value="lib/mearth.jar,lib/pekong-iearth.jar,lib/worldwind.jar,lib/worldwindx.jar,lib/plugin.jar,lib/jogl.jar,lib/gluegen-rt.jar" />
			<param name="codebase_lookup" value="false" />
			<param name="subapplet.classname" value="WWJApplet" />
			<param name="layerUrl" value="<%=basePath %>/getLayers.jhtml" />
			<param name="subapplet.displayname" value="WWJ Applet" />
			<param name="noddraw.check" value="true" />
			<param name="progressbar" value="true" />
			<param name="jnlpNumExtensions" value="1" />
			<param name="jnlp_href" value="WWJApplet.jsp">
			<param name="VerticalExaggeration" value="1" />
			<param name="wmode" value="opaque"/>
			</object>

	<%--  			<script src="<%=basePath %>/js/deployJava.js"></script>  
        <script>
            var attributes = {width:'100%',height:'100%',id:'theApplet'};
            var parameters = {
            	layerUrl:'<%=basePath %>/getLayers.jhtml',
                jnlp_href : '<%=basePath%>/WWJApplet.jnlp',
                jnlp_embedded :'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxqbmxwIGNvZGViYXNlPSJodHRwOi8vbG9jYWxob3N0OjgwODAvc2x6eS8iIGhyZWY9IldXSkFwcGxldC5qbmxwIj4NCjxpbmZvcm1hdGlvbj4NCjx0aXRsZT5Xb3JsZCBXaW5kIEphdmEgQXBwbGV0IERlbW88L3RpdGxlPg0KPHZlbmRvcj5OQVNBPC92ZW5kb3I+IA0KPGRlc2NyaXB0aW9uPldvcmxkIFdpbmQgSmF2YSBBcHBsZXQgRGVtbzwvZGVzY3JpcHRpb24+DQo8ZGVzY3JpcHRpb24ga2luZD0ic2hvcnQiPldvcmxkIFdpbmQgSmF2YSBBcHBsZXQgRGVtbzwvZGVzY3JpcHRpb24+DQo8b2ZmbGluZS1hbGxvd2VkLz4NCjwvaW5mb3JtYXRpb24+DQo8c2VjdXJpdHk+DQo8YWxsLXBlcm1pc3Npb25zLz4NCjwvc2VjdXJpdHk+DQo8cmVzb3VyY2VzIG9zPSJXaW5kb3dzIj4NCjxwcm9wZXJ0eSBuYW1lPSJzdW4uamF2YTJkLm5vZGRyYXciIHZhbHVlPSJ0cnVlIi8+DQo8L3Jlc291cmNlcz4NCjxyZXNvdXJjZXM+DQo8ajJzZSBocmVmPSJodHRwOi8vamF2YS5zdW4uY29tL3Byb2R1Y3RzL2F1dG9kbC9qMnNlIiB2ZXJzaW9uPSIxLjYrIiBpbml0aWFsLWhlYXAtc2l6ZT0iNTEybSINCm1heC1oZWFwLXNpemU9IjUxMm0iLz4NCjxwcm9wZXJ0eSBuYW1lPSJzdW4uamF2YTJkLm5vZGRyYXciIHZhbHVlPSJ0cnVlIi8+DQo8amFyIGhyZWY9ImxpYi93b3JsZHdpbmQuamFyIi8+DQo8amFyIGhyZWY9ImxpYi93b3JsZHdpbmR4LmphciIvPg0KPGphciBocmVmPSJsaWIvbWVhcnRoLmphciIgbWFpbj0idHJ1ZSIvPg0KPGphciBocmVmPSJsaWIvcGx1Z2luLmphciIvPg0KPGphciBocmVmPSJsaWIvZ2RhbC5qYXIiLz4NCjxqYXIgaHJlZj0ibGliL2pvZ2wuamFyIi8+DQo8amFyIGhyZWY9ImxpYi9nbHVlZ2VuLXJ0LmphciIvPg0KIDwvcmVzb3VyY2VzPg0KPCEtLSBXaWR0aCBhbmQgaGVpZ3RoIGFyZSBvdmVyd3JpdHRlbiBieSB0aGUgc3Vycm91bmRpbmcgd2ViIHBhZ2UgLS0+DQo8YXBwbGV0LWRlc2MNCm5hbWU9IldXSiBBcHBsZXQiDQptYWluLWNsYXNzPSJXV0pBcHBsZXQiDQp3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCI+DQo8cGFyYW0gbmFtZT0ic2VwYXJhdGVfanZtIiB2YWx1ZT0idHJ1ZSIgLz4NCjwvYXBwbGV0LWRlc2M+DQo8L2pubHA+'
            };
                deployJava.runApplet(attributes, parameters, '1.7'); //1.6.0是java版本号，可以根据需要进行修改
</script>  --%>
<!-- 	<applet id="wwjApplet" width="100%" height="100%" onloadend="console.log('loedend');" oncanplay="console.log('canplay');" >
		<param name="layerUrl"
			value="http://localhost:8080/slzy/getLayers.jhtml">
		<param name="jnlp_href"
			value="http://localhost:8080/slzy/WWJApplet.jnlp">
		<param name="jnlp_embedded"
			value="PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxqbmxwIGNvZGViYXNlPSJodHRwOi8vbG9jYWxob3N0OjgwODAvc2x6eS8iIGhyZWY9IldXSkFwcGxldC5qbmxwIj4NCjxpbmZvcm1hdGlvbj4NCjx0aXRsZT5Xb3JsZCBXaW5kIEphdmEgQXBwbGV0IERlbW88L3RpdGxlPg0KPHZlbmRvcj5OQVNBPC92ZW5kb3I+IA0KPGRlc2NyaXB0aW9uPldvcmxkIFdpbmQgSmF2YSBBcHBsZXQgRGVtbzwvZGVzY3JpcHRpb24+DQo8ZGVzY3JpcHRpb24ga2luZD0ic2hvcnQiPldvcmxkIFdpbmQgSmF2YSBBcHBsZXQgRGVtbzwvZGVzY3JpcHRpb24+DQo8b2ZmbGluZS1hbGxvd2VkLz4NCjwvaW5mb3JtYXRpb24+DQo8c2VjdXJpdHk+DQo8YWxsLXBlcm1pc3Npb25zLz4NCjwvc2VjdXJpdHk+DQo8cmVzb3VyY2VzIG9zPSJXaW5kb3dzIj4NCjxwcm9wZXJ0eSBuYW1lPSJzdW4uamF2YTJkLm5vZGRyYXciIHZhbHVlPSJ0cnVlIi8+DQo8L3Jlc291cmNlcz4NCjxyZXNvdXJjZXM+DQo8ajJzZSBocmVmPSJodHRwOi8vamF2YS5zdW4uY29tL3Byb2R1Y3RzL2F1dG9kbC9qMnNlIiB2ZXJzaW9uPSIxLjYrIiBpbml0aWFsLWhlYXAtc2l6ZT0iNTEybSINCm1heC1oZWFwLXNpemU9IjUxMm0iLz4NCjxwcm9wZXJ0eSBuYW1lPSJzdW4uamF2YTJkLm5vZGRyYXciIHZhbHVlPSJ0cnVlIi8+DQo8amFyIGhyZWY9ImxpYi93b3JsZHdpbmQuamFyIi8+DQo8amFyIGhyZWY9ImxpYi93b3JsZHdpbmR4LmphciIvPg0KPGphciBocmVmPSJsaWIvbWVhcnRoLmphciIgbWFpbj0idHJ1ZSIvPg0KPGphciBocmVmPSJsaWIvcGx1Z2luLmphciIvPg0KPGphciBocmVmPSJsaWIvZ2RhbC5qYXIiLz4NCjxqYXIgaHJlZj0ibGliL2pvZ2wuamFyIi8+DQo8amFyIGhyZWY9ImxpYi9nbHVlZ2VuLXJ0LmphciIvPg0KIDwvcmVzb3VyY2VzPg0KPCEtLSBXaWR0aCBhbmQgaGVpZ3RoIGFyZSBvdmVyd3JpdHRlbiBieSB0aGUgc3Vycm91bmRpbmcgd2ViIHBhZ2UgLS0+DQo8YXBwbGV0LWRlc2MNCm5hbWU9IldXSiBBcHBsZXQiDQptYWluLWNsYXNzPSJXV0pBcHBsZXQiDQp3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCI+DQo8cGFyYW0gbmFtZT0ic2VwYXJhdGVfanZtIiB2YWx1ZT0idHJ1ZSIgLz4NCjwvYXBwbGV0LWRlc2M+DQo8L2pubHA+">
		<param name="codebase_lookup" value="false">
	</applet> -->

</body>
</html>
