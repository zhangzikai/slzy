package com.sx.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sx.entity.J2UnitCode;
import com.sx.service.J2UnitCodeService;

@Controller
@RequestMapping("/j2UnitCode")
public class J2UnitCodeController{
	@Autowired
	private J2UnitCodeService j2UnitCodeManager;

	private ObjectMapper objectMapper = null;
	
	private static List<J2UnitCode> dataListAll = null;
	
	@RequestMapping(params = "method=queryList")
	public void queryListThematicPic(HttpServletRequest request, HttpServletResponse response){
		
		if(dataListAll==null){
			dataListAll = j2UnitCodeManager.findAll();
		}
		
		String codeIndex=request.getParameter("node");
		List<J2UnitCode> dataList=j2UnitCodeManager.queryList(codeIndex);
		JSONArray jsonArray = new JSONArray();
		for(J2UnitCode j2:dataList){
			JSONObject jsonObject = new JSONObject();
		    jsonObject.put("id",j2.getCodeIndex());
		    jsonObject.put("text",j2.getName());
		    jsonObject.put("code",j2.getCode());
		    jsonObject.put("codelevel",j2.getCodeLevel());
		    //List<J2UnitCode> dataListTemp=j2UnitCodeManager.queryList(j2.getCodeIndex());
		    List<J2UnitCode> dataListTemp=getChildrenList(dataListAll, j2.getCodeIndex());
		    if(codeIndex.equals("0")){
		    	JSONArray jsonArray1 = new JSONArray();
		    	for(J2UnitCode j2Temp:dataListTemp){
		    		// 市
		    		JSONObject jsonObject1 = new JSONObject();
		    		jsonObject1.put("id",j2Temp.getCodeIndex());
		    		jsonObject1.put("text",j2Temp.getName());
		    		jsonObject1.put("code",j2Temp.getCode());
		    		jsonObject1.put("codelevel",j2Temp.getCodeLevel());
		    		//List<J2UnitCode> dataListTemp1=j2UnitCodeManager.queryList(j2Temp.getCodeIndex());
		    		List<J2UnitCode> dataListTemp1=getChildrenList(dataListAll, j2Temp.getCodeIndex());
		    		if(dataListTemp1.size()>0){
		    			jsonObject1.put("leaf",false);
				    }else{
				    	jsonObject1.put("leaf",true);
				    }
		    		jsonArray1.add(jsonObject1);
		    	}
		    	jsonObject.put("children",jsonArray1);
		    	jsonObject.put("expanded",true);
		    }
		    
		    if(dataListTemp.size()>0){
		    	jsonObject.put("leaf",false);
		    }else{
		    	jsonObject.put("leaf",true);
		    }
		    
			jsonArray.add(jsonObject);
		}
		objectMapper = new ObjectMapper();
        try {
        	JSONObject obj = new JSONObject();
        	obj.put("success", "true");
        	obj.put("children", jsonArray);
			response.getWriter().write(objectMapper.writeValueAsString(obj));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private List<J2UnitCode> getChildrenList(List<J2UnitCode> list, String codeIndex){
		List<J2UnitCode> arrayList = new ArrayList<J2UnitCode>();
		for(J2UnitCode j2:list){
			String sub = j2.getCodeIndex().substring(0, j2.getCodeIndex().length()-4);
			if(sub.equalsIgnoreCase(codeIndex)){
				arrayList.add(j2);
			}
		}
		return arrayList;
	}
	
	@RequestMapping(params = "method=queryList2")
	public void queryList(HttpServletRequest request, HttpServletResponse response){
		String codeIndex=request.getParameter("node");
		JSONArray jsonArray = getChildrenList(codeIndex);
		objectMapper = new ObjectMapper();
        try {
        	JSONObject obj = new JSONObject();
        	obj.put("success", "true");
        	obj.put("children", jsonArray);
			response.getWriter().write(objectMapper.writeValueAsString(obj));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private JSONArray getChildrenList(String codeIndex){
		 JSONArray jsonArray = new JSONArray();
		 List<J2UnitCode> dataList=j2UnitCodeManager.queryList(codeIndex);
		 if (dataList.size() < 1) return null;
		 for(J2UnitCode unitcode : dataList) {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("id",unitcode.getCodeIndex());
	    	jsonObject.put("text",unitcode.getName());
	    	jsonObject.put("code",unitcode.getCode());
	    	jsonObject.put("codelevel",unitcode.getCodeLevel());
	    	List<J2UnitCode> children = null;
	    	String coldeLevel = unitcode.getCodeLevel();
	    	if(!coldeLevel.equalsIgnoreCase("3")&&!coldeLevel.equalsIgnoreCase("4") && !coldeLevel.equalsIgnoreCase("5")){
	    		children = getChildrenList(unitcode.getCodeIndex());
	    	}
	    	if(children!=null && children.size()>0){
	    		jsonObject.put("leaf",false);
	    	}
	    	else{
	    		if(coldeLevel.equalsIgnoreCase("3")){
		    		jsonObject.put("leaf",false);
	    		}else{
		    		jsonObject.put("leaf",true);
	    		}
	    	}
	    	jsonObject.put("children",children);
	    	jsonArray.add(jsonObject);
		 }
		 return jsonArray;
	}
	
	@RequestMapping(params = "method=getName")
	public void getName(HttpServletRequest httpServletRequest, HttpServletResponse response){
		String code = httpServletRequest.getParameter("code");
		try {
//			System.out.println("name is"+j2UnitCodeManager.findName(code));
			response.getWriter().write(j2UnitCodeManager.findName(code));
//			response.getWriter().flush();
//			response.getWriter().write("23");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
}

