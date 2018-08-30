package com.sx.controller;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sx.entity.CodeTable;
import com.sx.entity.SysLog;
import com.sx.entity.SysUser;
import com.sx.entity.XBField;
import com.sx.service.CodeTableService;
import com.sx.service.J2UnitCodeService;
import com.sx.service.SysLogService;
import com.sx.service.XBFieldService;
import com.sx.util.DateUtil;
import com.sx.util.StringUtil;

import com.vividsolutions.jts.geom.*;
import com.vividsolutions.jts.io.ParseException;
import com.vividsolutions.jts.io.WKTReader;

@Controller
@RequestMapping("/xbField")
public class XBFieldController{
	@Autowired
	private XBFieldService xbFieldManager;
	@Autowired
	private J2UnitCodeService j2UnitCodeManager;
	@Autowired
	private CodeTableService codeTableManager;
	@Autowired
	private SysLogService sysLogManager;
	
	private ObjectMapper objectMapper = null;

	@RequestMapping(params = "method=queryList")
	public void queryList(HttpServletRequest request, HttpServletResponse response){
		String isEnable=request.getParameter("isEnable");
		List<XBField> dataList=xbFieldManager.queryList(isEnable);
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(dataList));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@RequestMapping(params = "method=queryListByWhere")
	public void queryListByWhere(HttpServletRequest request, HttpServletResponse response){
		String isCode=request.getParameter("isCode");
		List<XBField> dataList=xbFieldManager.queryListByWhere("isCode='"+isCode+"' and codeName<>'unitcode'");
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(dataList));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping(params = "method=intersection")
	public void intersection(HttpServletRequest request, HttpServletResponse response) throws ParseException{
		String wkt1 = request.getParameter("geoA");
		String[] wkt2s = request.getParameterValues("geoBs");

		WKTReader reader = new WKTReader();
		Geometry geo1 = reader.read(wkt1);
		JSONArray jsonArray=new JSONArray();
		
		for(int i=0;i<wkt2s.length;i++){
			Geometry geo2 = reader.read(wkt2s[i]);
			try{
				Geometry geo = geo1.intersection(geo2);
				JSONObject objTemp = new JSONObject();
				objTemp.put("geometry",geo.toText());
				jsonArray.add(objTemp);
			}catch(Exception e){
				e.printStackTrace();
				continue;
			}
		}
		
		objectMapper = new ObjectMapper();
		try {
			String result = objectMapper.writeValueAsString(jsonArray);
			response.getWriter().write(result);
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping(params = "method=queryAllList")
	public void queryAllList(HttpServletRequest request, HttpServletResponse response){
		List<XBField> dataList=xbFieldManager.queryAllList();
		objectMapper = new ObjectMapper();
        try { 
			response.getWriter().write(objectMapper.writeValueAsString(dataList));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping(params = "method=queryParams")
	public void queryParams(HttpServletRequest request, HttpServletResponse response){
		String params=request.getParameter("params");
		JSONObject jsonObject =JSONObject.fromObject(params);
		JSONArray jsonArray=new JSONArray();
		Iterator<?> it = jsonObject.keys();  
		List<XBField> xbFieldList=xbFieldManager.queryList("1");
		List<CodeTable> codeTableList=codeTableManager.queryList(null,null);
		
        while(it.hasNext()){  
            JSONObject objTemp = new JSONObject();
            String key=it.next().toString();
            objTemp.put("fieldName",key);
            XBField xbField=findXbField(xbFieldList,key.toUpperCase());
			if(xbField!=null){
				if(xbField.getIsCode()!=null && xbField.getIsCode().equals("1")){
					if(xbField.getCodeName().equals("unitcode")){
						String val="";
						try
						{
							val = j2UnitCodeManager.findName(jsonObject.getString(key));
						}
						catch(Exception e){}
						objTemp.put("value", val);
					}else{
						String  psbValue = findCodeValue(codeTableList,xbField.getCodeName(),jsonObject.getString(key));
						objTemp.put("value",psbValue );
					}
				}else{
					String psbValue = jsonObject.getString(key);
					if (key.equals("d_mj")||key.equals("d_ybd")||key.equals("d_gqxj")) {
						psbValue = String.format("%.2f", Float.parseFloat(psbValue));
						
					}
					objTemp.put("value",StringUtil.isEmptyReturnStr(psbValue,""));
				}
				objTemp.put("fieldAlias", xbField.getFieldAlias());
	            jsonArray.add(objTemp);
			}else{
//				objTemp.put("fieldAlias","");
//				objTemp.put("value",StringUtil.isEmptyReturnStr(jsonObject.getString(key),""));
			}
        }  
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(jsonArray));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	/**
	 * 功能描述：查找list存在的小班字段
	 * @param list
	 * @param fieldName
	 * @return
	 */
	public XBField findXbField(List<XBField> list,String fieldName) {
		XBField xbField=null;
		for(XBField field:list){
			if(field.getFieldName().equals(fieldName)){
				xbField=field;
			}
		}
		return xbField;
	}
	
	/**
	 * 功能描述：查询list存在的数据字典名称
	 * @param list
	 * @param code
	 * @return
	 */
	public String findCodeValue(List<CodeTable> list,String codeName,String psbCode) {
		String value="";
		if(codeName!=null&&psbCode!=null){
			for(CodeTable codeTable:list){
				if(codeTable.getCodeName().equals(codeName)&&codeTable.getPsbCode().equals(psbCode)){
					value=codeTable.getPsbValue();
				}
			}
		}
		return value;
	}
	
	@RequestMapping(params = "method=updateIsEnable")
	public void updateIsEnable(HttpServletRequest request, HttpServletResponse response){
		String params = request.getParameter("result");
		if(params.length()<1)return;
		String[] paramArray = params.split(";");
		for(int i=0;i<paramArray.length;i++){
			String[] ids = paramArray[i].split(",");
			String id = ids[0];
			String isEnable = ids[1];

			XBField xbField=xbFieldManager.get(Integer.parseInt(id));
			xbField.setIsEnable(Integer.parseInt(isEnable));
			xbFieldManager.editXBField(xbField);
		}
		
//		String id=request.getParameter("id");
//		String isEnable=request.getParameter("isEnable");
//		XBField xbField=xbFieldManager.get(Integer.parseInt(id));
//		xbField.setIsEnable(Integer.parseInt(isEnable));
//		xbFieldManager.editXBField(xbField);
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogManager.saveSysLog(new SysLog(request,"小班配置修改成功"));
		result.put("msg","小班配置修改成功!");
		result.put("success","小班配置修改成功!");
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 }
	
	@RequestMapping(params = "method=deleteXBField")
	public void deleteXBField(HttpServletRequest request,HttpServletResponse response){
		String id = request.getParameter("id");
		xbFieldManager.deleteXBField(Integer.parseInt(id));
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogManager.saveSysLog(new SysLog(request,"小班配置删除成功"));
		result.put("msg","删除成功!");
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping(params = "method=addXBField")
	public void addXBField(HttpServletRequest request,HttpServletResponse response,XBField xbField ){
		xbFieldManager.saveXBField(xbField);
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogManager.saveSysLog(new SysLog(request,"小班配置添加成功"));
		result.put("msg","添加成功!");
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping(params="method=getExcel")
	public void getExcel(HttpServletRequest request, HttpServletResponse response,String msg){
		 try {
			Map<String,Object> result = objectMapper.readValue(msg, Map.class);
			List<Map> xbList = (List<Map>) result.get("xb");
			List<String> fieldLsit = (List<String>) result.get("field");
			String name ="小班对比excel"+new Date().hashCode()+".xls";
			FileOutputStream io = new FileOutputStream(request.getRealPath("/download")+"/"+name);
			HSSFWorkbook wb  = new HSSFWorkbook();
			HSSFSheet  st = wb.createSheet("小班对比");
			HSSFRow headerRow = st.createRow(0);
			for(int i=0;i<fieldLsit.size();i++){
				headerRow.createCell(i).setCellValue(fieldLsit.get(i));
			}
			int i=1;
			for(Map<String,String> xb:xbList){
				HSSFRow dataRow = st.createRow(i);
				dataRow.createCell(0).setCellValue(xb.get("c_xb"));
				dataRow.createCell(1).setCellValue(xb.get("c_lb"));
				dataRow.createCell(2).setCellValue(xb.get("c_xiang"));
				dataRow.createCell(3).setCellValue(xb.get("c_cun"));
				dataRow.createCell(4).setCellValue(xb.get("c_bhyy"));
				i++;
			}
			wb.write(io);
			io.close();
			Map<String,String> path = new HashMap<String, String>();
			path.put("name", name);
			response.getWriter().write(objectMapper.writeValueAsString(path));
		} catch (JsonParseException e) {
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
