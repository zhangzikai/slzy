<%@ page import="java.io.*,java.net.*"%>
<%@page language="java" contentType="application/shp" pageEncoding="utf-8"%>
<%
  	response.reset();
  	String fileName =(String)request.getParameter("fileName");
  	if(fileName==null){
  		fileName=(String)request.getSession().getAttribute("fileName");
  	}
  	String fileExt =fileName.substring(fileName.indexOf("."));
  	if(fileExt.equalsIgnoreCase(".shp")){
  		response.setContentType("application/shp");
  	}else if(fileExt.equalsIgnoreCase(".prj")){
  		response.setContentType("application/prj");
  	}else if(fileExt.equalsIgnoreCase(".dbf")){
  		response.setContentType("application/dbase, application/dbf, application/octet-stream");
  	}else if(fileExt.equalsIgnoreCase(".shx")){
  		response.setContentType("application/shx, application/octet-stream");
  	}else if(fileExt.equalsIgnoreCase(".kmz")){
  		response.setContentType("application/vnd.google-earth.kmz");
  	}else{
  		response.setContentType("application/html");
  	}
  	OutputStream os = null;
  	FileInputStream is = null;
  	try{
		out.clearBuffer(); 
    	out = pageContext.pushBody();
	  	os = response.getOutputStream();
	  	is = new FileInputStream(request.getRealPath("/")+"/datas/upload/"+fileName);
	  	byte[] b = new byte[5120];
	  	int i = 0;
	  	while((i = is.read(b)) > 0){
	  		os.write(b, 0, i);
	  	}
		os.flush();
		out.clear();
		out = pageContext.pushBody();
	}catch(Exception e){
  		System.out.println("Error!");
  		e.printStackTrace();
  	}finally{
  		if(is != null){
		  is.close();
		  is = null;
  		}
 	}
%>



