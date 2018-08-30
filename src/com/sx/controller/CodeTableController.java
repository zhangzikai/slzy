package com.sx.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sx.entity.CodeTable;
import com.sx.service.CodeTableService;

@Controller
@RequestMapping("/codeTable")
public class CodeTableController{
	@Autowired
	private CodeTableService codeTableManager;

	private ObjectMapper objectMapper = null;
	
	@RequestMapping(params = "method=queryList")
	public void queryListThematicPic(HttpServletRequest request, HttpServletResponse response){
		String codeName=request.getParameter("codeName");
		String codeId=request.getParameter("codeId");
		List<CodeTable> dataList=codeTableManager.queryList(codeId,codeName);
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(dataList));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping(params = "method=queryValue")
	public void queryValueList(HttpServletRequest request, HttpServletResponse response){
		String dilei=request.getParameter("dilei");
		String lmsyq=request.getParameter("lmsyq");
		String sllb=request.getParameter("sllb");
		String lz=request.getParameter("lz");
		String sz=request.getParameter("sz");
		
		String result = codeTableManager.findValue(dilei, lmsyq, sllb, lz, sz);
        try {
			response.getWriter().write(result);
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
