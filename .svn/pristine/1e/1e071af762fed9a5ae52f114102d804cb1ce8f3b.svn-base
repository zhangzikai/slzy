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

import com.sx.entity.FlyRoute;
import com.sx.entity.SysLog;
import com.sx.entity.SysUser;
import com.sx.service.FlyRouteService;
import com.sx.service.SysLogService;
import com.sx.util.DateUtil;
import com.sx.util.StringUtil;

@Controller
@RequestMapping("/flyRoute")
public class FlyRouteController{
	@Autowired
	private FlyRouteService flyRouteManager;
	@Autowired
	private SysLogService sysLogManager;
	private ObjectMapper objectMapper = null;

	@RequestMapping(params = "method=add")
	public void addFlyRoute(HttpServletRequest request, HttpServletResponse response,FlyRoute flyRoute)throws Exception{   
		flyRoute.setCreateUser((SysUser)request.getSession().getAttribute("curUser"));
		flyRoute.setCreateTime(DateUtil.getCurrenDateTime());
		flyRouteManager.saveFlyRoute(flyRoute);
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogManager.saveSysLog(new SysLog(request,"飞行路径添加成功"));
		result.put("msg","添加成功!");
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 }   
	
	@RequestMapping(params = "method=get")
	public void getFlyRoute(HttpServletRequest request, HttpServletResponse response)throws Exception{
		String id=StringUtil.isEmptyReturnStr(request.getParameter("id"),"0");
		FlyRoute flyRoute=flyRouteManager.getFlyRoute(Integer.parseInt(id));
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(flyRoute));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 } 

	@RequestMapping(params = "method=delete")
	public void deleteFlyRoute(HttpServletRequest request, HttpServletResponse response){
		String ids=request.getParameter("ids");
		Map<String, Object> result = new HashMap<String, Object>();
		flyRouteManager.deleteFlyRoute(ids);
		sysLogManager.saveSysLog(new SysLog(request,"飞行路径删除成功"));
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
		List<FlyRoute> dataList=flyRouteManager.queryAll();
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(dataList));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
