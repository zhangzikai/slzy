package com.sx.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sx.entity.TableMetadata;
import com.sx.service.TableMetadataService;

@Controller
@RequestMapping("/tableMetadata")
public class TableMetadataController{
	@Autowired
	private TableMetadataService tableMetadataManager;

	private ObjectMapper objectMapper = null;
	
	@RequestMapping(params = "method=queryList")
	public void queryListThematicPic(HttpServletRequest request, HttpServletResponse response){
		String tableType=request.getParameter("tableType");
		
		List<TableMetadata> dataList=tableMetadataManager.queryList(tableType);
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(dataList));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
