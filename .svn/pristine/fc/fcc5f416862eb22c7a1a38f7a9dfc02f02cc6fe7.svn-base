<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>辽宁省森林资源管理系统</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<link href="media/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
	<link href="media/css/style-metro.css" rel="stylesheet" type="text/css"/>
	<link href="media/css/style.css" rel="stylesheet" type="text/css"/>
	<link href="media/css/style-responsive.css" rel="stylesheet" type="text/css"/>
	<link href="media/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
	<link href="media/css/default.css" rel="stylesheet" type="text/css" id="style_color"/>
	
	<script src="media/js/jquery-1.10.1.min.js" type="text/javascript"></script>
	<script src="media/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="media/js/app.js" type="text/javascript"></script>
	<script src="media/js/index.js" type="text/javascript"></script> 
	
 	<script type="text/javascript" src="<%=basePath%>js/openLayers/OpenLayers.js" type="text/javascript"></script>
 	<script src="<%=basePath%>js/2d/2d.js"></script>
 	
	<script>
		jQuery(document).ready(function() {    
		   App.init();
		   init2DMap();
		});
	</script>
  </head>
  
<body class="page-header-fixed">
	<div class="header navbar navbar-inverse navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container-fluid">
	
						<!-- BEGIN LOGO -->
	
						<a class="brand" href="index.html">
	
						<img src="media/image/logo1.png" style="width:400px;height:35px" alt="logo"/>
	
						</a>
	
						<!-- END LOGO -->
	
						<!-- BEGIN RESPONSIVE MENU TOGGLER -->
	
						<a href="javascript:;" class="btn-navbar collapsed" data-toggle="collapse" data-target=".nav-collapse">
	
						<img src="media/image/menu-toggler.png" alt="" />
	
						</a>          
	
	
						<!-- END TOP NAVIGATION MENU --> 
	
					</div>
		</div>
	</div>
	<div class="page-container">
		<div class="page-sidebar nav-collapse collapse">
			<ul class="page-sidebar-menu">
				<li>
	
					<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
	
					<div class="sidebar-toggler hidden-phone"></div>
	
					<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
	
				</li>
				
				
				
				
				<!-- <li class="start active ">
	
					<a href="index.html">
	
					<i class="icon-home"></i> 
	
					<span class="title">Dashboard</span>
	
					<span class="selected"></span>
	
					</a>
	
				</li> -->
				
<!-- 				<li class="">
	
						<a href="javascript:;">
	
						<i class="icon-cogs"></i> 
	
						<span class="title">Layouts</span>
	
						<span class="arrow "></span>
	
						</a>
	
						<ul class="sub-menu">
	
							<li >
	
								<a href="layout_horizontal_sidebar_menu.html">
	
								Horzontal & Sidebar Menu</a>
	
							</li>
	
							<li >
	
								<a href="layout_horizontal_menu1.html">
	
								Horzontal Menu 1</a>
	
							</li>
	
						</ul>
	
				</li> -->
			</ul>
			<ul class="nav nav-tabs">
							<li class="active"><a href="#tab_1_1" data-toggle="tab">行政区划</a></li>
							<li><a href="tab_menu" data-toggle="tab">菜单</a></li>
			</ul>
			<div class="tab-content" style="width:100%;height:700px">
			<div class="tab-pane active" id="tab_menu" style="width:100%;height:700px">
				<ul class="tree" id="tree_2">
				<li>
					<a href="#" data-role="branch" class="tree-toggle" data-toggle="branch" data-value="Bootstrap_Tree">行政区划</a>
			</div>
			<div class="tab-pane" id="tab_xzqh">
			</div>
			</div>
		</div>
		<div class="page-content">
			<div class="container-fluid">
				<div class="row-fluid">
					<div class="span9">
						<ul class="nav nav-tabs">
							<li class="active"><a href="#tab_1_1" data-toggle="tab">二维地图</a></li>
							<li><a href="#tab_1_2" data-toggle="tab">三维地图</a></li>
						</ul>
						<div class="tab-content" style="width:100%;height:700px">
							<div class="tab-pane active" id="tab_1_1" style="height:700px;">
								<div style="background-color:green;height:34px;width:100%">
									<p>            
										<button type="button" class="btn">行政</button>
										<button type="button" class="btn red">地形</button>
										<button type="button" class="btn blue">影像</button>       
									</p>
								</div>
								<div id="map1" class="span6" style="height:100%">
								</div>
								<div id="map2" class="span6" style="background-color:green;height:100%;border-left-width: 2px;border-left-style: solid;border-left-color: #FF0000;">
								</div>
								</div>
							</div>
							<div class="tab-pane" id="tab_1_2">
							</div>
						</div>
						<!-- <div style="background-color:#fff;height:600px;width:1050px">
						</div> -->
					</div>
					<div class="span3">
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="footer">
	</div>
  </body>
</html>
