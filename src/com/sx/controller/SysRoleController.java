package com.sx.controller;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;






import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sx.base.DataPage;
import com.sx.entity.SysLog;
import com.sx.entity.SysModule;
import com.sx.entity.SysRole;
import com.sx.service.SysLogService;
import com.sx.service.SysModuleService;
import com.sx.service.SysRoleService;
import com.sx.util.StringUtil;

@Controller
@RequestMapping("/sysRole")
public class SysRoleController{
	@Autowired
	private SysRoleService sysRoleService;
	@Autowired
	private SysModuleService sysModuleService;
	@Autowired
	private SysLogService sysLogService;
	private ObjectMapper objectMapper = null;

	@RequestMapping(params = "method=add")
	public void addUser(HttpServletRequest request, HttpServletResponse response,SysRole sysRole)throws Exception{   
		sysRoleService.add(sysRole);
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogService.saveSysLog(new SysLog(request,"角色添加成功"));
		result.put("msg","角色添加成功!");
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
	public void editUser(HttpServletRequest request, HttpServletResponse response,SysRole sysRole)throws Exception{
		sysRoleService.update(sysRole);
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogService.saveSysLog(new SysLog(request,"角色修改成功"));
		result.put("msg","角色修改成功!");
		result.put("success","true");
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 }
	
	@RequestMapping(params = "method=get")
	public void getUser(HttpServletRequest request, HttpServletResponse response)throws Exception{
		String id=StringUtil.isEmptyReturnStr(request.getParameter("id"),"0");
		SysRole sysRole=sysRoleService.find(Integer.parseInt(id),false);
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(sysRole));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 } 
	
	@RequestMapping(params = "method=findAll")
	public void findAll(HttpServletRequest request, HttpServletResponse response)throws Exception{
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(sysRoleService.findAll()));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 }

	@RequestMapping(params = "method=delete")
	public void delete(HttpServletRequest request, HttpServletResponse response){
		String ids=request.getParameter("ids");
		Map<String, Object> result = new HashMap<String, Object>();
		sysRoleService.delete(ids);
		sysLogService.saveSysLog(new SysLog(request,"角色删除成功"));
		result.put("msg","角色删除成功!");
		result.put("success","true");
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	@RequestMapping(params = "method=list")
	public void queryList(HttpServletRequest request, HttpServletResponse response){
		String roleName=StringUtil.isEmptyReturnStr(request.getParameter("roleName"),"");
		String start=request.getParameter("start");
		String limit=request.getParameter("limit");
		Map<String, Object> result = new HashMap<String, Object>();
		DataPage<SysRole> dataPage=sysRoleService.findPage(roleName,Math.round(Integer.parseInt(start)/Integer.parseInt(limit))+1,Integer.parseInt(limit));
		result.put("total", dataPage.getTotalCount());
		result.put("rows", dataPage.getData());
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping(params = "method=accredit")
	public void accredit(HttpServletRequest request, HttpServletResponse response){
		String roleId=StringUtil.isEmptyReturnStr(request.getParameter("roleId"),"0");
		String mids=StringUtil.isEmptyReturnStr(request.getParameter("mids"),"");
		Map<String, Object> result = new HashMap<String, Object>();
		SysRole sysRole=sysRoleService.find(Integer.parseInt(roleId), false);
		List<SysModule> modules=sysModuleService.findByIds(mids);
		sysRole.setModules(new HashSet(modules));
		sysRoleService.update(sysRole);
		result.put("msg","角色授权成功!");
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
