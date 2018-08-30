package com.sx.util;

import javax.servlet.http.HttpServletRequest;
public class RequestUtil {
	public static String getClientIP(HttpServletRequest request){
		String ip = request.getHeader("x-forwarded-for"); 
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
			ip = request.getHeader("Proxy-Client-IP"); 
		} 
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
			ip = request.getHeader("WL-Proxy-Client-IP"); 
		} 
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
			ip = request.getRemoteAddr();
		} 
		return ip;
	}
	
	public static String getCurUserName(HttpServletRequest request){
		String userName=(String) request.getSession().getAttribute("userName");
		if(userName!=null){
			return userName;
		}else{
			return "";
		}
	}
}
