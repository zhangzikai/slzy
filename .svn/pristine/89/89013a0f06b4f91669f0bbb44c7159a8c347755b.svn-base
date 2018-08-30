package com.sx.controller;

import java.util.Calendar;
import java.util.HashMap;
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
import com.sx.entity.SysRole;
import com.sx.entity.SysUser;
import com.sx.service.SysLogService;
import com.sx.service.SysRoleService;
import com.sx.service.SysUserService;
import com.sx.util.BeanUtil;
import com.sx.util.ExcelEntity;
import com.sx.util.ExportUtils;
import com.sx.util.PdfEntity;
import com.sx.util.StringUtil;

@Controller
@RequestMapping("/sysUser")
public class SysUserController{
	@Autowired
	private SysUserService sysUserManager;
	@Autowired
	private SysRoleService sysRoleManager;
	@Autowired
	private SysLogService sysLogManager;
	private ObjectMapper objectMapper = null;

	@RequestMapping(params = "method=add")
	public void addUser(HttpServletRequest request, HttpServletResponse response,SysUser user)throws Exception{   	
		String roleId=StringUtil.isEmptyReturnStr(request.getParameter("roleId"),"0");
		String areaCode=StringUtil.isEmptyReturnStr(request.getParameter("areaCode"),"0");
		String codelevel=StringUtil.isEmptyReturnStr(request.getParameter("codelevel"),"0");
		String areaName=StringUtil.isEmptyReturnStr(request.getParameter("areaName"),"0");
		user.setAddress(areaName);
		user.setDepartment(codelevel);
		user.setEmail(areaCode);
		Integer id = Integer.parseInt(roleId);
		user.setRoleid(id);
		sysUserManager.saveUser(user);
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogManager.saveSysLog(new SysLog(request,"用户添加成功"));
		result.put("msg","用户添加成功!");
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
	public void editUser(HttpServletRequest request, HttpServletResponse response,SysUser user)throws Exception{
		String roleId=StringUtil.isEmptyReturnStr(request.getParameter("roleId"),"0");
		String areaCode=StringUtil.isEmptyReturnStr(request.getParameter("areaCode"),"0");
		String codelevel=StringUtil.isEmptyReturnStr(request.getParameter("codelevel"),"0");
		String areaName=StringUtil.isEmptyReturnStr(request.getParameter("areaName"),"0");
		user.setAddress(areaName);
		user.setDepartment(codelevel);
		user.setEmail(areaCode);
		SysUser oldUser=sysUserManager.get(user.getUserid());
		BeanUtil.copyPriperties(user,oldUser);
		sysUserManager.updateUser(oldUser);
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogManager.saveSysLog(new SysLog(request,"用户修改成功"));
		result.put("msg","用户修改成功!");
		result.put("success","true");
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 }
	
	
	@RequestMapping(params = "method=accredit")
	public void accredit(HttpServletRequest request, HttpServletResponse response)throws Exception{
		String userId=StringUtil.isEmptyReturnStr(request.getParameter("userId"),"0");
		String roleId=StringUtil.isEmptyReturnStr(request.getParameter("roleId"),"0");
		SysUser sysUser=sysUserManager.get(Integer.parseInt(userId));
		SysRole sysRole=sysRoleManager.find(Integer.parseInt(roleId),false);
		//sysUser.setRole(sysRole);
		sysUserManager.updateUser(sysUser);
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogManager.saveSysLog(new SysLog(request,"用户授权成功"));
		result.put("msg","用户授权成功!");
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
		SysUser user=sysUserManager.get(Integer.parseInt(id));
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("user",user);
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 } 

	@RequestMapping(params = "method=exists")
	public void exists(HttpServletRequest request, HttpServletResponse response){
		String userName=request.getParameter("username");
		Map<String, Object> result = new HashMap<String, Object>();
		SysUser user=sysUserManager.get(userName,null);
		if(user==null){
			result.put("result",true);
		}else{
			result.put("result",false);
		}
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@RequestMapping(params = "method=delete")
	public void delete(HttpServletRequest request, HttpServletResponse response){
		String ids=request.getParameter("ids");
		Map<String, Object> result = new HashMap<String, Object>();
		sysUserManager.delete(ids);
		sysLogManager.saveSysLog(new SysLog(request,"用户删除成功"));
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
	public void queryList(HttpServletRequest request, HttpServletResponse response){
		String keyword=StringUtil.isEmptyReturnStr(request.getParameter("keyword"),"");
		String field=StringUtil.isEmptyReturnStr(request.getParameter("field"),"");
		String start=request.getParameter("start");
		String limit=request.getParameter("limit");
		Map<String, Object> result = new HashMap<String, Object>();
		DataPage<SysUser> dataPage=sysUserManager.queryUserDataPage(field,keyword,Math.round(Integer.parseInt(start)/Integer.parseInt(limit))+1,Integer.parseInt(limit));
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

	
	@RequestMapping(params = "method=updatePwd")
	public void updatePwd(HttpServletRequest request, HttpServletResponse response){
		String userid=request.getParameter("userid");
		String password=request.getParameter("password");
		Map<String, Object> result = new HashMap<String, Object>();
		SysUser sysUser=sysUserManager.get(Integer.parseInt(userid));
		sysUser.setPassword(password);
		sysUserManager.updateUser(sysUser);
		result.put("msg","用户["+sysUser.getUsername()+"]密码修改成功!");
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping(params = "method=exportPage")
	public void exportPage(HttpServletRequest request, HttpServletResponse response) throws Exception{
		//查询集合		
		List<SysUser> users = sysUserManager.findAll();
		ExcelEntity<SysUser> el=new ExcelEntity<SysUser>();
		ExportUtils<SysUser> eu=new ExportUtils<SysUser>();
		String headers[]={"userid","username","userrealname","password","sex","age","address"};
		el.setHeaders(headers);
		el.setTitle("用户列表");
		el.setDataset(users);
//		// 新建excel文件
//		String filepath = request.getServletContext().getRealPath("/excel");
//		File saveDir = new File(filepath);
//		if (!saveDir.exists()) {
//			saveDir.mkdirs();
//		}
		// 根据日期时间及session中的用户名在服务器端创建文件
		Calendar calendar = Calendar.getInstance();
		String fileName = calendar.get(Calendar.YEAR) + "-"
				+ calendar.get(Calendar.MONTH) + "-"
				+ (calendar.get(Calendar.DAY_OF_MONTH) + 1) + "-"
				+ calendar.get(Calendar.HOUR_OF_DAY) + "-"
				+ calendar.get(Calendar.MINUTE) + "-"
				+ calendar.get(Calendar.SECOND) + "-" + "lr" + ".xls";
//		File xlsFile = new File(saveDir, fileName);
//		if (!xlsFile.exists()) {
//			xlsFile.createNewFile();
//		}
//		response.reset();
		response.setContentType("application/x-msdownload;charset=utf-8");
		response.setHeader("Content-Disposition", "attachment; filename="+new String(fileName.getBytes("utf-8"), "iso8859-1") + "");
        el.setOs(response.getOutputStream());
		eu.exportExcel(el);
        el.getOs().flush();
	}
	
	@RequestMapping(params = "method=exportPdfPage")
	public void exportPdfPage(HttpServletRequest request, HttpServletResponse response) throws Exception{
		//查询集合		
		List<SysUser> users = sysUserManager.findAll();
		PdfEntity<SysUser> el=new PdfEntity<SysUser>();
		ExportUtils<SysUser> eu=new ExportUtils<SysUser>();
		String headers[]={"userid","username","userrealname","password","sex","age","address"};
		el.setHeaders(headers);
		el.setTitle("用户列表");
		el.setDataset(users);
		// 根据日期时间及session中的用户名在服务器端创建文件
		Calendar calendar = Calendar.getInstance();
		String fileName = calendar.get(Calendar.YEAR) + "-"
				+ calendar.get(Calendar.MONTH) + "-"
				+ (calendar.get(Calendar.DAY_OF_MONTH) + 1) + "-"
				+ calendar.get(Calendar.HOUR_OF_DAY) + "-"
				+ calendar.get(Calendar.MINUTE) + "-"
				+ calendar.get(Calendar.SECOND) + "-" + "lr" + ".pdf";
		response.setContentType("application/x-msdownload;charset=utf-8");
		response.setHeader("Content-Disposition", "attachment; filename="+new String(fileName.getBytes("utf-8"), "iso8859-1") + "");
        el.setOs(response.getOutputStream());
		eu.exportPdf(el);
        el.getOs().flush();
	}
	
}
