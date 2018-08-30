package com.sx.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.coobird.thumbnailator.Thumbnails;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.sx.entity.SysLog;
import com.sx.entity.SysUser;
import com.sx.entity.ThemePic;
import com.sx.service.SysLogService;
import com.sx.service.ThemePicService;
import com.sx.util.DateUtil;
import com.sx.util.FileUtil;

@Controller
@RequestMapping("/themePic")
public class ThemePicController{
	@Autowired
	private ThemePicService themePicManager;
	@Autowired
	private SysLogService sysLogManager;
	private ObjectMapper objectMapper = null;

	@RequestMapping(params = "method=add")
	public void addThemePic(HttpServletRequest request, HttpServletResponse response,ThemePic themePic)throws Exception{ 
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;  
		MultipartFile file = multipartRequest.getFile("tempFile");
		if(file!=null&&file.getSize()>0){ 
			String basePath = request.getRealPath("");
			String savePath ="/datas/upload/";
			String extName =file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
			String fileName=DateUtil.getCurrenDateTime2();
			String newFileName=savePath+fileName+extName;
			String thumbFileName=savePath+fileName+"_thumb"+extName;
            try{   
            	FileUtil.SaveFileFromInputStream(file.getInputStream(),basePath,newFileName);
            	Thumbnails.of(basePath+newFileName).size(200,300).toFile(basePath+thumbFileName);  
            	themePic.setPicThubmUrl(thumbFileName);
                themePic.setPicUrl(newFileName);
            }catch (IOException e) {   
                System.out.println(e.getMessage());   
            }   
		 }
		themePic.setCreateUser((SysUser)request.getSession().getAttribute("curUser"));
		themePic.setCreateTime(DateUtil.getCurrenDateTime());
		themePicManager.savePic(themePic);
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogManager.saveSysLog(new SysLog(request,"专题图添加成功"));
		result.put("msg","添加成功!");
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 }   
	
	@RequestMapping(params = "method=edit")
	public void editThemePic(HttpServletRequest request, HttpServletResponse response,ThemePic themePic)throws Exception{
		ThemePic oldPic=themePicManager.getPic(themePic.getId());
		themePic.setPicUrl(oldPic.getPicUrl());
		themePic.setCreateUser(oldPic.getCreateUser());
		themePic.setCreateTime(oldPic.getCreateTime());
		
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;  
		MultipartFile file = multipartRequest.getFile("tempFile");
		if(file.getSize()>0){
			String basePath = request.getRealPath("");
			String savePath ="/datas/upload/";
			String extName =file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
			String fileName=DateUtil.getCurrenDateTime2();
			String newFileName=savePath+fileName+extName;
			String thumbFileName=savePath+fileName+"_thumb"+extName;
			try {   
				FileUtil.SaveFileFromInputStream(file.getInputStream(),basePath,newFileName); 
				Thumbnails.of(basePath+newFileName).size(200,300).toFile(basePath+thumbFileName);  
            	themePic.setPicThubmUrl(thumbFileName);
				themePic.setPicUrl(newFileName);
			} catch (IOException e) {   
				System.out.println(e.getMessage());   
			}   
		}
	
		themePicManager.editPic(themePic);
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogManager.saveSysLog(new SysLog(request,"专题图修改成功"));
		result.put("msg","修改成功!");
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 }

	@RequestMapping(params = "method=delete")
	public void deleteThemePic(HttpServletRequest request, HttpServletResponse response){
		String ids=request.getParameter("ids");
		Map<String, Object> result = new HashMap<String, Object>();
		themePicManager.deletePic(ids);
		sysLogManager.saveSysLog(new SysLog(request,"专题图删除成功"));
		result.put("msg","删除成功!");
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping(params = "method=queryList")
	public void queryListThematicPic(HttpServletRequest request, HttpServletResponse response){
		String classify=request.getParameter("classify");
		List<ThemePic> dataList=themePicManager.queryByClassify(classify);
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(dataList));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
