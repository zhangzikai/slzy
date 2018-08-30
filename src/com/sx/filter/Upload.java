package com.sx.filter;


import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.codehaus.jackson.map.ObjectMapper;

import com.sx.util.DateUtil;

@SuppressWarnings("serial")
public class Upload extends HttpServlet {

	@SuppressWarnings("unchecked")
	public void doPost(HttpServletRequest request,HttpServletResponse response)
			throws ServletException, IOException {
			@SuppressWarnings("deprecation")
			String basePath = request.getRealPath("");
			String savePath ="/datas/upload/";
			
			DiskFileItemFactory fac = new DiskFileItemFactory();
			ServletFileUpload upload = new ServletFileUpload(fac);
			upload.setHeaderEncoding("utf-8");
			List<FileItem> fileList =new ArrayList<FileItem>();
			try {
				fileList = upload.parseRequest(request);
			} catch (Exception ex) {
				return;
			}
			Iterator<FileItem> it = fileList.iterator();
			String fileName = "",newFileName="";
			String extName = "";
			while (it.hasNext()) {
				FileItem item = it.next();
				if (!item.isFormField()) {
					fileName = item.getName();
					extName = fileName.substring(fileName.lastIndexOf("."));
					newFileName=DateUtil.getCurrenDateTime2()+extName;
					File saveFile = new File(basePath+savePath+newFileName);
					try {
						item.write(saveFile);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
			Map<String, Object> result = new HashMap<String, Object>();
			result.put("success",true);
			result.put("fileName",newFileName.substring(0, newFileName.indexOf(".")));
			result.put("fileExt",extName);
			result.put("filePath",savePath+newFileName);
			if(extName.equalsIgnoreCase(".kmz")){
				request.getSession().setAttribute("loadFile",savePath+newFileName+"&"+newFileName+"&true&Kml");
			}else if(extName.equalsIgnoreCase(".tif")){
				request.getSession().setAttribute("loadFile",savePath+newFileName+"&"+newFileName+"&true&Tif");
			}
			ObjectMapper objectMapper = new ObjectMapper();
			response.getWriter().write(objectMapper.writeValueAsString(result));
	}
}
