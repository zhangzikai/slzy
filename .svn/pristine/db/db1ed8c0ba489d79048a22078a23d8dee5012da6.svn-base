package com.sx.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sx.entity.Table1;
import com.sx.service.TableService;
import com.sx.util.StringUtil;

@Controller
@RequestMapping("/tjTable")
public class TableController {
	@Autowired
	private TableService tableManager;
	
	@RequestMapping(params = "method=queryData")
	public void queryData(HttpServletRequest request, HttpServletResponse response){
		String areaName=request.getParameter("areaName");
		Table1 table = tableManager.find(areaName);
		JSONArray jsonArray=new JSONArray();
		
		JSONObject objTemp = new JSONObject();
		objTemp.put("name", "有林地");
		objTemp.put("value", table.getF());
		jsonArray.add(objTemp);
		
		objTemp = new JSONObject();
		objTemp.put("name", "疏林地组");
		objTemp.put("value", table.getM());
		jsonArray.add(objTemp);
		
		objTemp = new JSONObject();
		objTemp.put("name", "灌木林地");
		objTemp.put("value", table.getN());
		jsonArray.add(objTemp);
		
		objTemp = new JSONObject();
		objTemp.put("name", "未成林地");
		objTemp.put("value", table.getR());
		jsonArray.add(objTemp);
		
		objTemp = new JSONObject();
		objTemp.put("name", "苗圃地组");
		objTemp.put("value", table.getU());
		jsonArray.add(objTemp);
		
		objTemp = new JSONObject();
		objTemp.put("name", "无立木林地");
		objTemp.put("value", table.getV());
		jsonArray.add(objTemp);
		
		objTemp = new JSONObject();
		objTemp.put("name", "宜林地");
		objTemp.put("value", table.getZ());
		jsonArray.add(objTemp);
		
		objTemp = new JSONObject();
		objTemp.put("name", "辅助生产林地组");
		objTemp.put("value", table.getAD());
		jsonArray.add(objTemp);
		
		objTemp = new JSONObject();
		objTemp.put("name", "未利用地");
		objTemp.put("value", table.getT());
		jsonArray.add(objTemp);
		
		ObjectMapper objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(jsonArray));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping(params = "method=findData")
	public void findData(HttpServletRequest request, HttpServletResponse response){
		String tabelName=request.getParameter("tabelName");
		String fields=request.getParameter("fields");
		String tjdw=request.getParameter("tjdw");
		//tabelName="j2210423tjnew01_2011";
		//fields="c_tjdw,(select name from j2_unitcode where CODE=c_tjdw),c_tdsyq,(select PSB_VALUE from code_table where CODE_ID='C_TDSY' and PSB_CODE=c_tdsyq)";
		//fields = "c_tjdw,c_tdsyq,c_sllb,D_ZMJ";
		//tjdw="210423";
		List list=tableManager.findList(tabelName,fields,tjdw);
		JSONArray jsonArray=new JSONArray();
		
		for(Object obj : list) {
			JSONArray jsonArray1=new JSONArray();
			Object[] objArray=(Object[])obj;
			for(int i=0;i<objArray.length;i++){
				if(objArray[i]==null){
					jsonArray1.add("");
				}else{
					jsonArray1.add(objArray[i].toString());
				}
			}
			jsonArray.add(jsonArray1);
		}

		ObjectMapper objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(jsonArray));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
