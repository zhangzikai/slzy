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
import com.sx.service.SceneService;
import com.sx.service.SysLogService;
import com.sx.util.BeanUtil;
import com.sx.util.DateUtil;

@Controller
@RequestMapping("/scene")
public class SceneController{
	@Autowired
	private SceneService sceneManager;
	@Autowired
	private SysLogService sysLogManager;
	private ObjectMapper objectMapper = null;

	@RequestMapping(params = "method=add")
	public void add(HttpServletRequest request, HttpServletResponse response,Scene scene)throws Exception{   
		//json转mysql数据类型为line
		scene.setCreateUser((SysUser)request.getSession().getAttribute("curUser"));
		scene.setCreateTime(DateUtil.getCurrenDateTime());
		sceneManager.addScene(scene);
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogManager.saveSysLog(new SysLog(request,"场景添加成功"));
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
	public void editLabel(HttpServletRequest request, HttpServletResponse response,Scene scene)throws Exception{
		Scene oldScene=sceneManager.getScene(scene.getId());
		BeanUtil.copyPriperties(scene,oldScene);
		sceneManager.editScene(oldScene);
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogManager.saveSysLog(new SysLog(request,"场景修改成功"));
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
	public void deleteLabel(HttpServletRequest request, HttpServletResponse response){
		String ids=request.getParameter("ids");
		Map<String, Object> result = new HashMap<String, Object>();
		sceneManager.deleteScene(ids);
		sysLogManager.saveSysLog(new SysLog(request,"场景删除成功"));
		result.put("msg","删除成功!");
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping(params = "method=queryAll")
	public void queryAll(HttpServletRequest request, HttpServletResponse response){
		List<Scene> dataList=sceneManager.queryAll();
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("dataList",dataList);
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(dataList));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
