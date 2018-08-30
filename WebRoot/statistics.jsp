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
<script type="text/javascript">
	var hostPath = window.location.protocol + '//' + window.location.host + '/'
			+ window.location.pathname.split('/')[1];
</script>
<script src="<%=basePath%>/statistics/app.js"></script>
</head>
<body>

</body>
</html>