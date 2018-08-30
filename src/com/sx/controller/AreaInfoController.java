package com.sx.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sx.entity.AreaInfo;
import com.sx.service.AreaInfoService;
import com.sx.util.StringUtil;

@Controller
@RequestMapping("/areaInfo")
public class AreaInfoController{
	@Autowired
	private AreaInfoService areaInfoManager;
	private ObjectMapper objectMapper = null;
	/**
	 * 功能描述：查找地区信息
	 * @param areaCode
	 * @return
	 */
	@RequestMapping(params = "method=getAreaInfo")
	public void findAreaInfo(HttpServletRequest request, HttpServletResponse response) {
		AreaInfo areaInfo=null;
		objectMapper = new ObjectMapper();
		String code=request.getParameter("areaCode");
		areaInfo = areaInfoManager.find(code);
		try {
			response.getWriter().write(objectMapper.writeValueAsString(areaInfo));

//					add
		} catch (JsonGenerationException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				} catch (JsonMappingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				}
				}
				}