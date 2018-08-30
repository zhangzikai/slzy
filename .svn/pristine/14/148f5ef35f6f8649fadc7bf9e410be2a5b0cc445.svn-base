package com.sx.controller;

import java.util.Calendar;
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
import com.sx.entity.SysLog;
import com.sx.service.SysLogService;
import com.sx.util.ExcelEntity;
import com.sx.util.ExportUtils;
import com.sx.util.PdfEntity;
import com.sx.util.StringUtil;

@Controller
@RequestMapping("/sysLog")
public class SysLogController{
	@Autowired
	private SysLogService sysLogManager;

	private ObjectMapper objectMapper = null;
	

	@RequestMapping(params = "method=list")
	public void queryList(HttpServletRequest request, HttpServletResponse response){
		String operate=StringUtil.isEmptyReturnStr(request.getParameter("operate"),"");
		String beginTime=StringUtil.isEmptyReturnStr(request.getParameter("beginTime"),"");
		String endTime=StringUtil.isEmptyReturnStr(request.getParameter("endTime"),"");
		String username=StringUtil.isEmptyReturnStr(request.getParameter("username"),"");
		String start=StringUtil.isEmptyReturnStr(request.getParameter("start"),"1");
		String limit=StringUtil.isEmptyReturnStr(request.getParameter("limit"),"10");
		Map<String, Object> result = new HashMap<String, Object>();
		DataPage<SysLog> dataPage=sysLogManager.queryDataPage(operate,beginTime,endTime,username,Math.round(Integer.parseInt(start)/Integer.parseInt(limit))+1,Integer.parseInt(limit));
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

	@RequestMapping(params = "method=delete")
	public void delete(HttpServletRequest request, HttpServletResponse response){
		String ids=StringUtil.isEmptyReturnStr(request.getParameter("ids"),"0");
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogManager.delete(ids);
		sysLogManager.saveSysLog(new SysLog(request,"日志删除成功"));
		result.put("msg","删除日志成功!");
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	@RequestMapping(params = "method=batchDelete")
	public void batchDelete(HttpServletRequest request, HttpServletResponse response){
		String operate=StringUtil.isEmptyReturnStr(request.getParameter("operate"),"");
		String beginTime=StringUtil.isEmptyReturnStr(request.getParameter("beginTime"),"");
		String endTime=StringUtil.isEmptyReturnStr(request.getParameter("endTime"),"");
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogManager.batchDelete(operate, beginTime, endTime);
		sysLogManager.saveSysLog(new SysLog(request,"日志删除成功"));
		result.put("msg","删除日志成功!");
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping(params = "method=exportPage")
	public void exportPage(HttpServletRequest request, HttpServletResponse response) throws Exception{
		//查询集合		
		List<SysLog> logs = sysLogManager.findAll();
		ExcelEntity<SysLog> el=new ExcelEntity<SysLog>();
		ExportUtils<SysLog> eu=new ExportUtils<SysLog>();
		String headers[]={"userid","username","userrealname","password","sex","age","address"};
		el.setHeaders(headers);
		el.setTitle("用户列表");
		el.setDataset(logs);
//		// 新建excel文件
//		String filepath = request.getServletContext().getRealPath("/excel");
//		File saveDir = new File(filepath);
//		if (!saveDir.exists()) {
//			saveDir.mkdirs();
//		}
		// 根据日期时间及session中的用户名在服务器端创建文件
		Calendar calendar = Calendar.getInstance();
		String fileName = calendar.get(Calendar.YEAR) + "-"
				+ calendar.get(Calendar.MONTH) + "-"
				+ (calendar.get(Calendar.DAY_OF_MONTH) + 1) + "-"
				+ calendar.get(Calendar.HOUR_OF_DAY) + "-"
				+ calendar.get(Calendar.MINUTE) + "-"
				+ calendar.get(Calendar.SECOND) + "-" + "lr" + ".xls";
//		File xlsFile = new File(saveDir, fileName);
//		if (!xlsFile.exists()) {
//			xlsFile.createNewFile();
//		}
//		response.reset();
		response.setContentType("application/x-msdownload;charset=utf-8");
		response.setHeader("Content-Disposition", "attachment; filename="+new String(fileName.getBytes("utf-8"), "iso8859-1") + "");
        el.setOs(response.getOutputStream());
		eu.exportExcel(el);
        el.getOs().flush();
	}
	
	@RequestMapping(params = "method=exportPdfPage")
	public void exportPdfPage(HttpServletRequest request, HttpServletResponse response) throws Exception{
		//查询集合		
		List<SysLog> logs = sysLogManager.findAll();
		PdfEntity<SysLog> el=new PdfEntity<SysLog>();
		ExportUtils<SysLog> eu=new ExportUtils<SysLog>();
		String headers[]={"userid","username","userrealname","password","sex","age","address"};
		el.setHeaders(headers);
		el.setTitle("用户列表");
		el.setDataset(logs);
		// 根据日期时间及session中的用户名在服务器端创建文件
		Calendar calendar = Calendar.getInstance();
		String fileName = calendar.get(Calendar.YEAR) + "-"
				+ calendar.get(Calendar.MONTH) + "-"
				+ (calendar.get(Calendar.DAY_OF_MONTH) + 1) + "-"
				+ calendar.get(Calendar.HOUR_OF_DAY) + "-"
				+ calendar.get(Calendar.MINUTE) + "-"
				+ calendar.get(Calendar.SECOND) + "-" + "lr" + ".pdf";
		response.setContentType("application/x-msdownload;charset=utf-8");
		response.setHeader("Content-Disposition", "attachment; filename="+new String(fileName.getBytes("utf-8"), "iso8859-1") + "");
        el.setOs(response.getOutputStream());
		eu.exportPdf(el);
        el.getOs().flush();
	}
	
}
