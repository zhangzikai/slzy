package com.sx.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class AuthenticationFilter implements Filter {

	@Override
	public void destroy() {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		//控制用户访问权限
		HttpServletRequest req=(HttpServletRequest)request;
		HttpServletResponse res=(HttpServletResponse)response;
		HttpSession session=req.getSession();

		if(session.getAttribute("sessionUser")!=null||req.getRequestURL().indexOf("login")>0||req.getRequestURL().indexOf("common")>0){
			chain.doFilter(request, response);
		}else{
			res.getWriter().write("<script>window.location.href='"+req.getContextPath()+"/login.jsp';</script>");
		}
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

}
