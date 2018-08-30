<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<?xml version="1.0" encoding="UTF-8"?>
<jnlp codebase="<%=basePath %>" href="WWJApplet.jsp">
<information>
<title>World Wind Java Applet Demo</title>
<vendor>NASA</vendor> 
<description>World Wind Java Applet Demo</description>
<description kind="short">World Wind Java Applet Demo</description>
<offline-allowed/>
</information>
<security>
<all-permissions/>
</security>
<resources os="Windows">
<property name="sun.java2d.noddraw" value="true"/>
</resources>
<resources>
<j2se href="http://java.sun.com/products/autodl/j2se" version="1.6+" initial-heap-size="512m"
max-heap-size="512m"/>
<property name="sun.java2d.noddraw" value="true"/>
<jar href="lib/worldwind.jar"/>
<jar href="lib/worldwindx.jar"/>
<jar href="lib/mearth.jar" main="true"/>
<jar href="lib/plugin.jar"/>
<jar href="lib/gdal.jar"/>
<jar href="lib/jogl.jar"/>
<jar href="lib/gluegen-rt.jar"/>
 </resources>
<!-- Width and heigth are overwritten by the surrounding web page -->
<applet-desc
name="WWJ Applet"
main-class="WWJApplet"
width="800" height="600">
<param name="separate_jvm" value="true" />
</applet-desc>
</jnlp>