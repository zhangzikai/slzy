package com.sx.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sx.entity.Scene;
import com.sx.entity.SysLog;
import com.sx.entity.SysUser;
import com.sx.entity.ThemeMap;
import com.sx.service.SceneService;
import com.sx.service.SysLogService;
import com.sx.service.ThemeMapService;
import com.sx.util.BeanUtil;
import com.sx.util.DateUtil;

@Controller
@RequestMapping("/themeMap")
public class ThemeMapController{
	@Autowired
	private ThemeMapService themeMapManager;
	@Autowired
	private SysLogService sysLogManager;
	private ObjectMapper objectMapper = null;
	
	@RequestMapping(params = "method=queryList")
	public void queryListThematicPic(HttpServletRequest request, HttpServletResponse response){
		List<ThemeMap> dataList=themeMapManager.queryList();
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(dataList));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping(params = "method=get")
	public void getThemeMap(HttpServletRequest request, HttpServletResponse response){
		String ids = request.getParameter("ids");
		ThemeMap themeMap = themeMapManager.getThemeMap(Integer.parseInt(ids));
		objectMapper = new ObjectMapper();
		try {
			response.getWriter().write(objectMapper.writeValueAsString(themeMap));
		} catch (Exception e) {
			// TODO: handle exception
		}
		
	}
	


	@RequestMapping(params = "method=add")
	public void add(HttpServletRequest request, HttpServletResponse response,ThemeMap themeMap)throws Exception{   
		//json转mysql数据类型为line
		themeMapManager.saveThemeMap(themeMap);
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogManager.saveSysLog(new SysLog(request,"专题图添加成功"));
		result.put("msg","添加成功!");
		result.put("success","true");
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 }   
	
	@RequestMapping(params = "method=edit")
	public void editLabel(HttpServletRequest request, HttpServletResponse response,ThemeMap themeMap)throws Exception{
		ThemeMap oldThemeMap=themeMapManager.getThemeMap(themeMap.getId());
		BeanUtil.copyPriperties(themeMap,oldThemeMap);
		themeMapManager.editThemeMap(oldThemeMap);
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogManager.saveSysLog(new SysLog(request,"专题图修改成功"));
		result.put("msg","修改成功!");
		result.put("success","true");
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 }
	
	@RequestMapping(params = "method=delete")
	public void deleteLabel(HttpServletRequest request, HttpServletResponse response){
		String ids=request.getParameter("ids");
		Map<String, Object> result = new HashMap<String, Object>();
		themeMapManager.deleteThemeMap(Integer.parseInt(ids));
		sysLogManager.saveSysLog(new SysLog(request,"专题图删除成功"));
		result.put("msg","删除成功!");
		result.put("success","true");
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	

	
}
