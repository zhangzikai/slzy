package com.sx.controller;

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
import com.sx.entity.Label;
import com.sx.entity.SysLog;
import com.sx.service.LabelService;
import com.sx.service.SysLogService;
import com.sx.util.BeanUtil;
import com.sx.util.StringUtil;

@Controller
@RequestMapping("/label")
public class LabelController{
	@Autowired
	private LabelService labelManager;
	@Autowired
	private SysLogService sysLogManager;
	private ObjectMapper objectMapper = null;

	@RequestMapping(params = "method=add")
	public void addLabel(HttpServletRequest request, HttpServletResponse response,Label label)throws Exception{   
		//json转mysql数据类型为line
		labelManager.addLabel(label);
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogManager.saveSysLog(new SysLog(request,"标注添加成功"));
		result.put("msg","添加成功!");
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 }   
	
	@RequestMapping(params = "method=edit")
	public void editLabel(HttpServletRequest request, HttpServletResponse response,Label label)throws Exception{
		Label oldLabel=labelManager.getLabel(label.getId());
		BeanUtil.copyPriperties(label,oldLabel);
		labelManager.editLabel(oldLabel);
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogManager.saveSysLog(new SysLog(request,"标注修改成功"));
		result.put("msg","修改成功!");
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 }
	
	@RequestMapping(params = "method=get")
	public void getLabel(HttpServletRequest request, HttpServletResponse response)throws Exception{
		String id=StringUtil.isEmptyReturnStr(request.getParameter("id"),"0");
		Label label=labelManager.getLabel(Integer.parseInt(id));
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("label",label);
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 } 

	@RequestMapping(params = "method=delete")
	public void deleteLabel(HttpServletRequest request, HttpServletResponse response){
		String ids=request.getParameter("ids");
		Map<String, Object> result = new HashMap<String, Object>();
		labelManager.deleteLabel(ids);
		sysLogManager.saveSysLog(new SysLog(request,"标注删除成功"));
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
		String keyword=StringUtil.isEmptyReturnStr(request.getParameter("labelname"),"");
		String start=request.getParameter("start");
		String limit=request.getParameter("limit");
		String category=request.getParameter("category");
		Map<String, Object> result = new HashMap<String, Object>();
		DataPage<Label> dataPage=labelManager.queryDataPage(keyword,category,Math.round(Integer.parseInt(start)/Integer.parseInt(limit))+1,Integer.parseInt(limit));
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
	
	@RequestMapping(params = "method=queryAll")
	public void queryAll(HttpServletRequest request, HttpServletResponse response){
		List<Label> dataList=labelManager.queryAll();
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(dataList));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping(params = "method=queryLabel")
	public void queryLabel(HttpServletRequest request, HttpServletResponse response){
		String category=request.getParameter("category");
		List<Label> dataList=labelManager.queryByType(category);
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(dataList));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
