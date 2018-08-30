package com.sx.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sx.entity.SysLog;
import com.sx.entity.SysModule;
import com.sx.entity.SysRoleModule;
import com.sx.service.SysLogService;
import com.sx.service.SysModuleService;
import com.sx.service.SysRoleModuleService;
import com.sx.util.StringUtil;
import java.util.List;

@Controller
@RequestMapping("/sysModule")
public class SysModuleController{
	@Autowired
	private SysModuleService sysModuleService;
	@Autowired
	private SysRoleModuleService sysRoleModuleService;
	@Autowired
	private SysLogService sysLogService;
	private ObjectMapper objectMapper = null;

	@RequestMapping(params = "method=add")
	public void addUser(HttpServletRequest request, HttpServletResponse response,SysModule sysModule)throws Exception{   
		SysModule tmp = sysModuleService.findByScn(sysModule.getScn());
		Map<String, Object> result = new HashMap<String, Object>();
		if(tmp == null){
			SysModule module = new SysModule(sysModule.getScn(),sysModule.getText(),true,sysModule.getPid());
			module=sysModuleService.add(module);
			if(sysModule.getPid() > 0){
				SysModule parent = sysModuleService.find(sysModule.getPid(),false);
				parent.setLeaf(false);
				sysModuleService.update(parent);
			}
			result.put("id",module.getId());
			result.put("msg","权限添加成功!");
			sysLogService.saveSysLog(new SysLog(request,"权限添加成功"));
		}else{
			result.put("msg","添加失败,当前唯一标识已存在!");
		}
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 }   
	
	@RequestMapping(params = "method=edit")
	public void editUser(HttpServletRequest request, HttpServletResponse response,SysModule sysModule)throws Exception{
		SysModule oldSysModule=sysModuleService.find(sysModule.getId(),false);
		oldSysModule.setModuleName(sysModule.getModuleName());
		oldSysModule.setScn(sysModule.getScn());
		sysModuleService.update(oldSysModule);
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogService.saveSysLog(new SysLog(request,"权限修改成功"));
		result.put("msg","权限修改成功!");
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
		String pid=StringUtil.isEmptyReturnStr(request.getParameter("pid"),"0");
		SysModule sysModule=sysModuleService.find(Integer.parseInt(id),false);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("sysModule",sysModule);
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 } 
	
	@RequestMapping(params = "method=getModuleByRole")
	public void getModuleByRole(HttpServletRequest request, HttpServletResponse response)throws Exception{
		String roleID=StringUtil.isEmptyReturnStr(request.getParameter("roleID"),"0");
		List<SysRoleModule> list=sysRoleModuleService.find(Integer.parseInt(roleID), false);
		Map<String, Object> result = new HashMap<String, Object>();
		//result.put("sysModule",sysModule);
//		for(int i=0;i<list.size();i++){
//			result.put("moduleID",list.get(i).getSys_module_id());
//		}
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(list));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 } 
	
	@RequestMapping(params = "method=delete")
	public void delete(HttpServletRequest request, HttpServletResponse response){
		String id=request.getParameter("id");
		Map<String, Object> result = new HashMap<String, Object>();
		sysModuleService.delete(id);
		sysLogService.saveSysLog(new SysLog(request,"权限删除成功"));
		result.put("msg","角色删除成功!");
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping(params = "method=listTree")
	public void listTree(HttpServletRequest request, HttpServletResponse response){
		String node=StringUtil.isEmptyReturnStr(request.getParameter("node"),"0");
		if(node.equals("root")){
			node="0";
		}
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(sysModuleService.listTree(node)));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	@RequestMapping(params = "method=findAll")
	public void findAll(HttpServletRequest request, HttpServletResponse response){
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(sysModuleService.listAll()));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping(params = "method=savePremisson")
	public void savePremisson(HttpServletRequest request, HttpServletResponse response){
		String roleID=request.getParameter("roleID");
		String ids=request.getParameter("ids");
		String idsNo=request.getParameter("idsNo");
		sysRoleModuleService.save(roleID, ids,idsNo);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("success",true);
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
