package com.sx.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.codec.binary.Base64;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.sx.entity.SysLog;
import com.sx.entity.SysRole;
import com.sx.entity.SysRoleModule;
import com.sx.entity.SysUser;
import com.sx.service.SysLogService;
import com.sx.service.SysRoleModuleService;
import com.sx.service.SysUserService;
import com.sx.service.SysRoleService;
@Controller
@RequestMapping("")
public class LoginController{
	@Autowired
	private SysUserService sysUserManager;
	@Autowired
	private SysRoleService sysRoleManager;
	@Autowired
	private SysRoleModuleService sysRoleModuleManager;
	@Autowired
	private SysLogService sysLogManager;
	private ObjectMapper objectMapper = null;
	@RequestMapping("/login.jhtml")
	public void doLogin(HttpServletRequest request, HttpServletResponse response){ 
		JSONObject jsonObject = new JSONObject();     
		jsonObject.put("isSuccess",false); 
		objectMapper = new ObjectMapper();
		
		if(!valid()){
			jsonObject.put("message", "初始化证书错误，请联系管理员!"); 
			try {
				response.getWriter().write(jsonObject.toString());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return;
		}
		
		String userName=request.getParameter("userName");
		String passWord=request.getParameter("passWord");
		String code=request.getParameter("code");
		String sessionCode=(String) request.getSession().getAttribute("rand");
		
		if(sessionCode.equals(code)){
			SysUser user=sysUserManager.get(userName,passWord);
			if(user!=null){
				try {
					request.getSession().setAttribute("userName",user.getUsername());
					SysRole role = sysRoleManager.find(user.getRoleid(), false); //user.getRole();
					List<SysRoleModule> list = sysRoleModuleManager.find(role.getId(), false);
					JSONArray jsonArray = new JSONArray();     
//					for(int i=0;i<list.size();i++){
//						module.add(list.)
//						module.put("moduleID",list.get(i).getSys_module_id());
//					}
					request.getSession().setAttribute("sessionUser",objectMapper.writeValueAsString(user));
					request.getSession().setAttribute("sessionModule",objectMapper.writeValueAsString(list));
					request.getSession().setAttribute("curUser",user);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} 
				jsonObject.put("isSuccess",true);
				jsonObject.put("message", "提示:登录成功!"); 
				sysLogManager.saveSysLog(new SysLog(request,"用户登录成功"));
			}else{
				jsonObject.put("message", "错误提示:用户名或者密码错误!"); 
			}
		}else{
			jsonObject.put("message", "错误提示:验证码输入有误!"); 
		}
		try {
			response.getWriter().write(jsonObject.toString());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 }   
	
	@RequestMapping("/logout.jhtml")
	public ModelAndView doLogout(HttpServletRequest request, HttpServletResponse response){   
		sysLogManager.saveSysLog(new SysLog(request,"用户退出成功"));
		request.getSession().invalidate();
		return new ModelAndView("login");
	 }
	
	private boolean valid(){
		try {
			File licence = new File(this.getClass().getClassLoader().getResource("").getPath()+ "licence");
			Properties prop = new Properties();// 属性集合对象
			FileInputStream fis = new FileInputStream(licence);// 属性文件流
			prop.load(fis);
		    String str =prop.getProperty("Licence");
		    str =new String(Base64.decodeBase64(str));
		    String[] strs = str.split("_");
		    Date date1 = new Date();//当前时间
		    Date dateLicence = null;
		    SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
		    dateLicence = df.parse(strs[0]);
	        return date1.before(dateLicence);
			
		}catch(Exception ex){
			return false;
		}
	}
}
