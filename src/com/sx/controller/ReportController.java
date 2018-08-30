package com.sx.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.logging.Logger;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.Region;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.util.CellRangeAddress;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sx.entity.CodeTable;
import com.sx.entity.J2UnitCode;
import com.sx.entity.Report;
import com.sx.entity.ReportNode;
import com.sx.entity.SysLog;
import com.sx.service.CodeTableService;
import com.sx.service.J2UnitCodeService;
import com.sx.service.ReportNodeService;
import com.sx.service.ReportService;
import com.sx.service.SysLogService;
import com.sx.util.BeanUtil;
import com.sx.util.PostgresJDBCUtil;
import com.sx.util.StringUtil;
import com.sx.util.data.DataRow;
import com.sx.util.data.DataTable;
import com.sx.util.data.DataTypes;

@Controller
@RequestMapping("/report")
public class ReportController {
	@Autowired
	private ReportService reportManager;
	@Autowired
	private ReportNodeService reportNodeManager;
	@Autowired
	private J2UnitCodeService j2UnitCodeManager;
	@Autowired
	private CodeTableService codeTableManager;
	@Autowired
	private SysLogService sysLogManager;
	private ObjectMapper objectMapper = null;

	public PostgresJDBCUtil postgresJDBCUtil = new PostgresJDBCUtil();
	public List<CodeTable> codeTables;
	public List<J2UnitCode> j2UnitCodes;
	private DataTable dataTable = new DataTable();

	private double[] shengResult;
	private double[] shiResult;
	private double[] xianResult;
	private double[] xiangResult;

	private int cursorX = 1;
	private int cursorY;
	private StringBuilder sb;
	private PreparedStatement cunSQL;
	private int totalCol;
	private int rowOff;
	private List<ReportNode> subNodes;
	// = new ArrayList<ReportNode>();
	private List<List<String>> conditions;
	// = new ArrayList<List<String>>();
	private List<List<CodeTable>> subCol;
	// = new ArrayList<List<CodeTable>>(); //待遍历，进行进一步处理为subRow
	private List<List<String>> subRow;
	// = new ArrayList<List<String>>();
	private int totalHeader = 1;
	private HSSFSheet currentSheet;
	private HSSFRow currentRow;
	private int currentReportID;
	private int[] path;
	private String tableName;
	private Logger myLogger = Logger.getLogger("ReportControl");
	private int maxRow;
	private int maxLength;

	private CellStyle centerStyle;

	@RequestMapping(params = "method=addReport")
	public void addReport(HttpServletRequest request, HttpServletResponse response, Report report) throws Exception {
		// json转mysql数据类型为line
		reportManager.addReport(report);
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogManager.saveSysLog(new SysLog(request, "报表添加成功"));
		result.put("msg", "添加成功!");
		result.put("success", true);
		objectMapper = new ObjectMapper();
		try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@RequestMapping(params = "method=editReport")
	public void editReport(HttpServletRequest request, HttpServletResponse response, Report report) throws Exception {
		Report oldReport = reportManager.getReport(report.getId());
		BeanUtil.copyPriperties(report, oldReport);
		reportManager.editReport(oldReport);
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogManager.saveSysLog(new SysLog(request, "报表修改成功"));
		result.put("msg", "修改成功!");
		result.put("success", true);
		objectMapper = new ObjectMapper();
		try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@RequestMapping(params = "method=getReport")
	public void getReport(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = StringUtil.isEmptyReturnStr(request.getParameter("id"), "0");
		Report report = reportManager.getReport(Integer.parseInt(id));
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("report", report);
		objectMapper = new ObjectMapper();
		try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@RequestMapping(params = "method=deleteReport")
	public void deleteReport(HttpServletRequest request, HttpServletResponse response) {
		String ids = request.getParameter("ids");
		Map<String, Object> result = new HashMap<String, Object>();
		reportManager.deleteReport(ids);
		sysLogManager.saveSysLog(new SysLog(request, "报表删除成功"));
		result.put("msg", "删除成功!");
		result.put("success", true);
		objectMapper = new ObjectMapper();
		try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@RequestMapping(params = "method=queryReport")
	public void queryReport(HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("list", reportManager.queryAll());
		objectMapper = new ObjectMapper();
		try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@RequestMapping(params = "method=addReportNode")
	public void addReportNode(HttpServletRequest request, HttpServletResponse response, ReportNode reportNode) throws Exception {

		reportNode.setCodeid(reportNode.getCodeid());// .toLowerCase());
		// json转mysql数据类型为line
		reportNodeManager.addReportNode(reportNode);
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogManager.saveSysLog(new SysLog(request, "报表节点添加成功"));
		result.put("msg", "添加成功!");
		result.put("success", true);
		objectMapper = new ObjectMapper();
		try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@RequestMapping(params = "method=editReportNode")
	public void editReportNode(HttpServletRequest request, HttpServletResponse response, ReportNode reportNode) throws Exception {
		ReportNode oldReportNode = reportNodeManager.getReportNode(reportNode.getId());
		if (oldReportNode.getCodeid() != null) {
			oldReportNode.setCodeid(oldReportNode.getCodeid().toLowerCase());
		}
		BeanUtil.copyPriperties(reportNode, oldReportNode);
		reportNodeManager.editReportNode(oldReportNode);
		Map<String, Object> result = new HashMap<String, Object>();
		sysLogManager.saveSysLog(new SysLog(request, "报表节点修改成功"));
		result.put("msg", "修改成功!");
		result.put("success", true);
		objectMapper = new ObjectMapper();
		try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@RequestMapping(params = "method=getReportNode")
	public void getReportNode(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = StringUtil.isEmptyReturnStr(request.getParameter("id"), "0");
		ReportNode reportNode = reportNodeManager.getReportNode(Integer.parseInt(id));
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("reportNode", reportNode);
		objectMapper = new ObjectMapper();
		try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@RequestMapping(params = "method=deleteReportNode")
	public void deleteReportNode(HttpServletRequest request, HttpServletResponse response) {
		String ids = request.getParameter("ids");
		Map<String, Object> result = new HashMap<String, Object>();
		reportNodeManager.deleteReportNode(ids);
		sysLogManager.saveSysLog(new SysLog(request, "报表节点删除成功"));
		result.put("msg", "删除成功!");
		result.put("success", true);
		objectMapper = new ObjectMapper();
		try {
			response.getWriter().write(objectMapper.writeValueAsString(result));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@RequestMapping(params = "method=queryReportNode")
	public void queryReportNode(HttpServletRequest request, HttpServletResponse response) {
		String reportid = StringUtil.isEmptyReturnStr(request.getParameter("reportid"), "0");
		String pid = StringUtil.isEmptyReturnStr(request.getParameter("node"), "0");
		List<ReportNode> dataList1 = reportNodeManager.queryReportNode(Integer.parseInt(reportid), Integer.parseInt(pid));
		JSONArray jsonArray = new JSONArray();
		for (ReportNode node : dataList1) {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("id", node.getId());
			jsonObject.put("text", node.getName());
			jsonObject.put("pid", node.getPid());
			jsonObject.put("factor", node.getFactor());
			jsonObject.put("expression", node.getExpression());
			jsonObject.put("showCalculate", node.getShowCalculate());
			jsonObject.put("codeid", node.getCodeid());
			jsonObject.put("reportid", reportid);
			jsonObject.put("orderby", node.getOrderby());
			List<ReportNode> dataList2 = reportNodeManager.queryReportNode(Integer.parseInt(reportid), node.getId());
			if (dataList2.size() > 0) {
				JSONArray jsonArray1 = new JSONArray();
				for (ReportNode node1 : dataList2) {
					JSONObject jsonObject1 = new JSONObject();
					jsonObject1.put("id", node1.getId());
					jsonObject1.put("text", node1.getName());
					jsonObject1.put("pid", node1.getPid());
					jsonObject1.put("factor", node1.getFactor());
					jsonObject1.put("expression", node1.getExpression());
					jsonObject1.put("showCalculate", node1.getShowCalculate());
					jsonObject1.put("codeid", node1.getCodeid());
					jsonObject1.put("reportid", reportid);
					jsonObject1.put("orderby", node1.getOrderby());
					List<ReportNode> dataList3 = reportNodeManager.queryReportNode(Integer.parseInt(reportid), node1.getId());
					if (dataList3.size() > 0) {
						jsonObject1.put("leaf", false);
					} else {
						jsonObject1.put("leaf", true);
					}
					jsonArray1.add(jsonObject1);
				}
				jsonObject.put("children", jsonArray1);
				jsonObject.put("expanded", false);
			}

			if (dataList2.size() > 0) {
				jsonObject.put("leaf", false);
			} else {
				jsonObject.put("leaf", true);
			}

			jsonArray.add(jsonObject);
		}
		objectMapper = new ObjectMapper();
		try {
			response.getWriter().write(objectMapper.writeValueAsString(jsonArray));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	private void queryUnit(J2UnitCode unit) {
		// List<J2UnitCode> unit = j2UnitCodeManager.queryByCodeIndex(code);
		// String codeName = unit.get(0).getName();
		if (unit.getCodeIndex().length() == maxLength) {
			try {
				myLogger.info(String.valueOf(unit.getCodeIndex().length()));
				cunSQL.setString(1, unit.getCode());
				myLogger.info(unit.getCode());
				SimpleDateFormat formatter = new SimpleDateFormat("dd-MMM-yyyy HH:mm:ss:SSS");
				myLogger.info("cun begin " + formatter.format(new Date()));
				exportUnit(unit.getName(), cunSQL.executeQuery());
				myLogger.info("cun over " + formatter.format(new Date()));
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else {
			List<J2UnitCode> unitArray = j2UnitCodeManager.queryByCodeIndex(unit.getCodeIndex());
			int tmpcursorY = cursorY;
			cursorY = cursorY + subRow.size();
			for (J2UnitCode tmp : unitArray)
				queryUnit(tmp);
			exportUnit(unit.getName(), unit.getCodeIndex(), tmpcursorY);

		}

	}

	private void exportUnit(String codeName, String codeIndex, int rowID) {
		int n = 0;
		double[] tmpArray;
		double[] sumArray;
		switch (codeIndex.length()) {
		case 4:// 省
			tmpArray = shengResult;
			sumArray = shengResult;
			break;
		case 8:// 市
			tmpArray = shiResult;
			sumArray = shengResult;
			break;
		case 12:// 县
			tmpArray = xianResult;
			sumArray = shiResult;
			break;
		case 16:// 乡
			tmpArray = xiangResult;
			sumArray = xianResult;
			break;
		default:
			tmpArray = xiangResult;
			sumArray = xianResult;
			break;
		}
		for (List<String> tmp : subRow) {
			cursorX = 0;
			currentRow = currentSheet.createRow(rowID);
			currentRow.createCell(cursorX).setCellValue(codeName);
			cursorX++;
			for (int i = 0; i < tmp.size() / 3; i++) {
				currentRow.createCell(cursorX).setCellValue(tmp.get(i * 3));
				cursorX++;
			}
			for (int i = 0; i < totalCol; i++) {
				currentRow.createCell(cursorX).setCellValue(tmpArray[i + n * totalCol]);
				sumArray[i + n * totalCol] += tmpArray[i + n * totalCol];
				cursorX++;
			}
			rowID++;
			n++;
		}
		Arrays.fill(tmpArray, 0);

	}

	private void exportUnit(String code, ResultSet unitSet) {
		int n = 0;
		try {
			while (unitSet.next()) {
				for (List<String> tmp : subRow) {
					cursorX = 0;
					currentRow = currentSheet.createRow(cursorY);
					currentRow.createCell(cursorX).setCellValue(code);
					cursorX++;
					for (int i = 0; i < tmp.size() / 3; i++) {
						currentRow.createCell(cursorX).setCellValue(tmp.get(i * 3));
						cursorX++;
					}

					for (int i = 2; i < totalCol + 2; i++) {
						currentRow.createCell(cursorX).setCellValue(unitSet.getDouble(i + n * totalCol));
						switch (maxLength) {
						case 20:
							xiangResult[i - 2 + n * totalCol] += unitSet.getDouble(i + n * totalCol);
							break;
						case 16:
							xianResult[i - 2 + n * totalCol] += unitSet.getDouble(i + n * totalCol);
							break;
						case 12:
							shiResult[i - 2 + n * totalCol] += unitSet.getDouble(i + n * totalCol);
							break;
						case 8:
							shengResult[i - 2 + n * totalCol] += unitSet.getDouble(i + n * totalCol);
							break;
						default:
							break;
						}
						cursorX++;
					}

					cursorY++;
					n++;
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	private PreparedStatement SQLBuileder(String reportID) {
		Connection con = postgresJDBCUtil.conn;
		try {
			return con.prepareStatement(sqlBuilder());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;

	}

	private void headerTracer(List<ReportNode> nodes) {
		int delta = 0;
		for (ReportNode node : nodes) {
			List<ReportNode> newNodes = reportNodeManager.queryReportNode(null, node.getId());
			if (newNodes.size() > 0) {
				delta = 1;
				headerTracer(newNodes);
			}

		}
		totalHeader += delta;
	}

	private void headerTracer1(List<ReportNode> nodes) {
		cursorY++;
		HSSFRow tmpRow = currentSheet.getRow(cursorY);
		if (tmpRow == null)
			tmpRow = currentSheet.createRow(cursorY);
		for (ReportNode node : nodes) {
			List<ReportNode> newNodes = reportNodeManager.queryReportNode(null, node.getId());
			if (newNodes.size() > 0) {
				int initX = cursorX;
				headerTracer1(newNodes);
				cursorY--;
				Cell tmpp = tmpRow.createCell(initX);
				tmpp.setCellStyle(centerStyle);
				tmpp.setCellValue(node.getName());
				currentSheet.addMergedRegion(new CellRangeAddress(cursorY, cursorY, initX, cursorX - 1));

			} else {
				Cell tmpp = tmpRow.createCell(cursorX);
				tmpp.setCellStyle(centerStyle);
				tmpp.setCellValue(node.getName());
				 currentSheet.addMergedRegion(new CellRangeAddress(cursorY, totalHeader - 1, cursorX, cursorX));
				cursorX++;
				List<String> tmp = new ArrayList<String>();
				tmp.add(node.getExpression());
				tmp.add(node.getFactor());
				conditions.add(tmp);
			}

		}
	}

	private void structBuilder(List<ReportNode> nodes) {
		subNodes = new ArrayList<ReportNode>();
		subCol = new ArrayList<List<CodeTable>>();
		subRow = new ArrayList<List<String>>();
		conditions = new ArrayList<List<String>>();
		totalHeader = 1;
		cursorX = 1;
		cursorY = -1;
		headerTracer(nodes);
		myLogger.info(String.valueOf(totalHeader));

		currentRow = currentSheet.createRow(0);
		List<ReportNode> tmpReport = new ArrayList<ReportNode>();
		for (ReportNode node : nodes) {
			if (node.getName().equals("统计单位")) {
				Cell tmpp = currentRow.createCell(0);
				tmpp.setCellStyle(centerStyle);
				tmpp.setCellValue("统计单位");
				currentSheet.addMergedRegion(new CellRangeAddress(0, 0 + totalHeader - 1, 0, 0));
				// nodes.remove(node);
			} else if (node.getCodeid() != null && !node.getCodeid().equals("")) {
				subNodes.add(node);
				// nodes.remove(node);
				Cell tmpp = currentRow.createCell(cursorX);
				tmpp.setCellStyle(centerStyle);
				tmpp.setCellValue(node.getName());
				currentSheet.addMergedRegion(new CellRangeAddress(0, 0 + totalHeader - 1, cursorX, cursorX));
				cursorX++;
			} else {
				tmpReport.add(node);
			}
		}
		headerTracer1(tmpReport);
		subColBuilder();
	}

	private void subColBuilder() {
		for (ReportNode node : subNodes) {
			List<CodeTable> tmp = codeTableManager.queryList(node.getCodeid(), null);
			CodeTable ct = new CodeTable();
			ct.setPsbValue("");
			ct.setCodeId("1");
			ct.setPsbCode("1");
			tmp.add(0, ct);
			subCol.add(tmp);
		}
		path = new int[subCol.size()];
		subRowTracer(0);
		rowOff = subRow.size();
		subCol = null;
		subNodes = null;
	}

	private void subRowTracer(int m) {
		for (int i = 0; i < subCol.get(m).size(); i++) {
			if (m == subCol.size() - 1) {
				path[m] = i;
				List<String> tmp = new ArrayList<String>();
				for (int n = 0; n < path.length; n++) {
					CodeTable tmp1 = subCol.get(n).get(path[n]);
					tmp.add(tmp1.getPsbValue());
					tmp.add(tmp1.getCodeId());
					tmp.add(tmp1.getPsbCode());
				}
				subRow.add(tmp);
			} else {
				path[m] = i;
				subRowTracer(++m);
				m--;
			}
		}

	}

	private String sqlBuilder() {
		sb = new StringBuilder();
		sb.append("select 1");
		for (List<String> tmp : subRow) {
			for (List<String> tmp1 : conditions) {
				sb.append(" ,sum(case when ");
				sb.append(tmp1.get(0) + " ");
				for (int i = 0; i < tmp.size() / 3; i++) {
					sb.append(" and ");
					sb.append(tmp.get(3 * i + 1));
					sb.append(" = '");
					sb.append(tmp.get(3 * i + 2));
					sb.append("'");
				}
				sb.append(" then ");
				sb.append(tmp1.get(1));
				sb.append(" else 0 end)");
			}
		}
		sb.append(" from ");
		sb.append(tableName);
		switch (maxLength) {
		case 20:
			sb.append(" where c_cun=? group by c_cun");
			break;
		case 16:
			sb.append(" where c_xiang=? group by c_xiang");
			break;
		case 12:
			sb.append(" where c_xian=? group by c_xian");
			break;
		case 8:
			sb.append(" where c_shi=? group by c_shi");
			break;
		case 4:
			sb.append(" where c_sheng=? group by c_sheng");
			break;

		default:
			break;
		}
		totalCol = conditions.size();
		xiangResult = new double[totalCol * rowOff];
		xianResult = new double[totalCol * rowOff];
		shiResult = new double[totalCol * rowOff];
		shengResult = new double[totalCol * rowOff];
		conditions = null;
		myLogger.info(sb.toString());
		return sb.toString();

	}

	@RequestMapping(params = "method=exportPage")
	public void exportPage(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String reportid = StringUtil.isEmptyReturnStr(request.getParameter("reportid"), "1");
		currentReportID = Integer.valueOf(reportid);
		String code = StringUtil.isEmptyReturnStr(request.getParameter("code"), "210000");// 行政区域code=210123204001
		String year = StringUtil.isEmptyReturnStr(request.getParameter("year"), "2012");
		Boolean isProcess = Boolean.valueOf(request.getParameter("isProcess"));
		tableName = "j2210000jb" + year + "xbm";// 表名称
		Report report = reportManager.getReport(Integer.parseInt(reportid));
		String fields = "c_xian,c_xiang,c_cun,c_lb,c_xb,d_mj,t_diming,c_dilei,c_tdsy,c_lmsy,c_gclb,c_sllb,c_bhdj,c_ldlx,c_jycs,c_px,c_powei,i_podu,i_haiba,c_qy,c_lz,c_yssz,i_pjnl,c_szzc,c_lingzu,d_pjsg,d_pjxj,d_ybd,d_gqxj,i_gqzs,i_xbxj,c_trlx,i_tchd,c_trzd,c_dbzl,c_dbfb,c_xmzl,c_xmfb,c_yszl,i_ysgqzs,c_gxdj,c_jjlcq,c_lingji,d_gqdmj,t_beizhu,i_sszs,c_zlfs,c_joinid,c_tfh,c_shuixi,c_tdshy,c_lmshy,c_stqw,c_stfq,c_stgnj,c_stzyj,c_stcrj,c_hmhqy,c_shqy,c_sqdj,c_qljg,c_zrd,c_lx,c_lc,d_smd,c_kjd,i_xbzs,c_ccdj,c_pycz,c_jylx,c_dimao,c_poduj,c_tchdj,i_fzzh,c_fzzhdj,i_slhl,c_sssz,d_ssxj,c_xmszqk,i_ysnl,d_ysdj,c_ysfb,c_ysszqk,c_zhlx,c_zhdj,c_jkdj,c_bhsj,c_bhyy,c_gxbj,c_szzchz,i_fgd,i_ccl,i_ssxuji,i_xmgd,i_xmgaid,i_dbgaid,i_dbgd,i_ysgd,c_oldid,c_newid,c_guid,c_a1,c_a2,c_a3,c_a4,c_a5";
		String returnFields = "c_xian,c_xiang,c_cun";

		InputStream is = null;
		if (request.getParameter("type").equals("1") || request.getParameter("type").equals("2") || request.getParameter("type").equals("3"))
			maxLength = Integer.valueOf(request.getParameter("type")) * 4;
		else
			maxLength = (Integer.valueOf(request.getParameter("type")) - 1) * 4;
		try {
			// 创建工作簿（Execl）
			HSSFWorkbook wb = new HSSFWorkbook();
			currentSheet = wb.createSheet(report.getReportname());
			HSSFCellStyle cellStyle = wb.createCellStyle();
			cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 水平布局：居中
			cellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN); // 下边框
			cellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);// 左边框
			cellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);// 上边框
			cellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);// 右边框
			cellStyle.setWrapText(true);
			postgresJDBCUtil.getConn();
			SimpleDateFormat formatter = new SimpleDateFormat("dd-MMM-yyyy HH:mm:ss:SSS");
			myLogger.warning("stru begin " + formatter.format(new Date()));
			centerStyle = wb.createCellStyle();
			centerStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
			centerStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
			structBuilder(reportNodeManager.queryReportNode(currentReportID, 0));
			myLogger.warning("sql builder begin " + formatter.format(new Date()));
			cunSQL = SQLBuileder(reportid);
			myLogger.warning("j2unit begin " + formatter.format(new Date()));
			cursorY = totalHeader;
			queryUnit(j2UnitCodeManager.queryByCode(code, true).get(0));
			myLogger.warning("over " + formatter.format(new Date()));
			// 标题
			// HSSFRow titleRow = sheet.createRow(0);
			// titleRow.setHeight((short) 700);//设置行高
			// //1.生成字体对象
			// HSSFFont font = wb.createFont();
			// font.setFontHeightInPoints((short) 24);
			// font.setFontName("宋体");
			// font.setBoldweight((short) 1);
			// cellStyle.setFont(font);//设置字体
			// HSSFCell titleCell,cell;
			// titleCell = titleRow.createCell((short) 0);
			// titleCell.setCellValue(report.getReportname());
			// titleCell.setCellStyle(cellStyle);
			//
			//
			// HSSFFont font1 = wb.createFont();
			// font1.setFontHeightInPoints((short) 9);
			// font1.setFontName("宋体");
			// font1.setBoldweight((short) 0.6);
			//
			//
			// HSSFCellStyle cellStyle1 = wb.createCellStyle();
			// cellStyle1.setAlignment(HSSFCellStyle.ALIGN_CENTER); //水平布局：居中
			// cellStyle1.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);//垂直布局：居中
			// cellStyle1.setBorderBottom(HSSFCellStyle.BORDER_THIN); //下边框
			// cellStyle1.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
			// cellStyle1.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框
			// cellStyle1.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框
			// cellStyle1.setWrapText(true);
			// cellStyle1.setFont(font1);//设置字体
			//
			// HSSFRow
			// row,row1=sheet.createRow(1),row2=sheet.createRow(2),row3=sheet.createRow(3),row4=sheet.createRow(4);
			//
			// ReportNode reportNode1,reportNode2,reportNode3,reportNode4;
			// List<ReportNode>
			// reportNodes1,reportNodes2,reportNodes3,reportNodes4;
			// reportNodes1=reportNodeManager.queryReportNode(report.getId(),0);
			//
			// ReportNode
			// reportNodeT1=null,reportNodeT2=null,reportNodeT3=null,reportNodeT4=null;
			//
			// List<JSONObject> list=new ArrayList<JSONObject>();
			// JSONObject obj=new JSONObject();
			// int
			// rowNum=4,colNum=0,startColNum=1,startColNum1=1,startColNum2=1,startColNum3=1;//行,列
			// for(int i=0;i<reportNodes1.size();i++){//一级
			// reportNode1=reportNodes1.get(i);
			// cell = row1.createCell((Integer) colNum);
			// cell.setCellValue(reportNode1.getName());
			// cell.setCellStyle(cellStyle1);
			// sheet.setColumnWidth(colNum,reportNode1.getName().length()*256*6);
			//
			// startColNum1=colNum;
			// if(reportNode1.getCodeid()!=null&&!reportNode1.getCodeid().equals("")){
			// if(reportNodeT1==null){
			// reportNodeT1=reportNode1;
			// startColNum=2;
			// returnFields=getField(fields,returnFields,reportNode1.getExpression()+","+reportNode1.getFactor());
			// }else if(reportNodeT2==null){
			// reportNodeT2=reportNode1;
			// startColNum=3;
			// returnFields=getField(fields,returnFields,reportNode1.getExpression()+","+reportNode1.getFactor());
			// }else if(reportNodeT3==null){
			// reportNodeT3=reportNode1;
			// startColNum=4;
			// returnFields=getField(fields,returnFields,reportNode1.getExpression()+","+reportNode1.getFactor());
			// }else if(reportNodeT4==null){
			// reportNodeT4=reportNode1;
			// startColNum=5;
			// returnFields=getField(fields,returnFields,reportNode1.getExpression()+","+reportNode1.getFactor());
			// }
			//
			// }
			//
			// reportNodes2=reportNodeManager.queryReportNode(null,reportNode1.getId());
			// if(reportNodes2.size()>0){
			// for(int j=0;j<reportNodes2.size();j++){//二级
			// reportNode2=reportNodes2.get(j);
			// cell = row2.createCell((Integer) colNum);
			// cell.setCellValue(reportNode2.getName());
			// cell.setCellStyle(cellStyle1);
			// sheet.setColumnWidth(colNum,reportNode2.getName().length()*256*4);
			//
			// startColNum2=colNum;
			// reportNodes3=reportNodeManager.queryReportNode(null,reportNode2.getId());
			// if(reportNodes3.size()>0){
			// for(int k=0;k<reportNodes3.size();k++){//三级
			// reportNode3=reportNodes3.get(k);
			// cell = row3.createCell((Integer) colNum);
			// cell.setCellValue(reportNode3.getName());
			// cell.setCellStyle(cellStyle1);
			// sheet.setColumnWidth(colNum,reportNode3.getName().length()*256*4);
			//
			// startColNum3=colNum;
			// reportNodes4=reportNodeManager.queryReportNode(null,reportNode3.getId());
			// if(reportNodes4.size()>0){
			// for(int l=0;l<reportNodes4.size();l++){//四级
			// reportNode4=reportNodes4.get(l);
			// cell = row4.createCell((Integer) colNum);
			// cell.setCellValue(reportNode4.getName());
			// cell.setCellStyle(cellStyle1);
			// sheet.setColumnWidth(colNum,reportNode4.getName().length()*256*4);
			// colNum++;
			//
			// obj=new JSONObject();
			// obj.put("name", reportNode4.getName());
			// obj.put("sql", "select sum("+reportNode4.getFactor()+") from
			// "+tableName+" where "+reportNode4.getExpression());
			// obj.put("field",reportNode4.getFactor());
			// obj.put("condition",reportNode4.getExpression());
			// returnFields=getField(fields,returnFields,reportNode4.getExpression()+","+reportNode4.getFactor());
			// list.add(obj);
			// }
			// sheet.addMergedRegion(new
			// Region(3,(short)startColNum3,3,(short)(colNum-1)));//合并单元格,行,列一
			// 行,列
			// }else{
			// sheet.addMergedRegion(new
			// Region(3,(short)colNum,4,(short)colNum));//合并行单元格,行,列一 行,列
			// colNum++;
			// obj=new JSONObject();
			// obj.put("name", reportNode3.getName());
			// obj.put("sql", "select sum("+reportNode3.getFactor()+") from
			// "+tableName+" where "+reportNode3.getExpression());
			// obj.put("field",reportNode3.getFactor());
			// obj.put("condition",reportNode3.getExpression());
			// returnFields=getField(fields,returnFields,reportNode3.getExpression()+","+reportNode3.getFactor());
			// list.add(obj);
			// }
			// }
			// sheet.addMergedRegion(new
			// Region(2,(short)startColNum2,2,(short)(colNum-1)));//合并单元格,行,列一
			// 行,列
			// }else{
			// sheet.addMergedRegion(new
			// Region(2,(short)colNum,4,(short)colNum));//合并行单元格,行,列一 行,列
			// colNum++;
			// obj=new JSONObject();
			// obj.put("name", reportNode2.getName());
			// obj.put("sql", "select sum("+reportNode2.getFactor()+") from
			// "+tableName+" where "+reportNode2.getExpression());
			// obj.put("field",reportNode2.getFactor());
			// obj.put("condition",reportNode2.getExpression());
			// returnFields=getField(fields,returnFields,reportNode2.getExpression()+","+reportNode2.getFactor());
			// list.add(obj);
			// }
			// }
			// sheet.addMergedRegion(new
			// Region(1,(short)startColNum1,1,(short)(colNum-1)));//合并列单元格,行,列一
			// 行,列
			// }else{
			// sheet.addMergedRegion(new
			// Region(1,(short)colNum,4,(short)colNum));//合并行单元格,行,列一 行,列
			// colNum++;
			// if(reportNode1.getShowCalculate()!=null&&reportNode1.getShowCalculate().toString().equals("0")){
			// obj=new JSONObject();
			// obj.put("name", reportNode1.getName());
			// obj.put("sql", "select sum("+reportNode1.getFactor()+") from
			// "+tableName+" where "+reportNode1.getExpression());
			// obj.put("field",reportNode1.getFactor());
			// obj.put("condition",reportNode1.getExpression());
			// returnFields=getField(fields,returnFields,reportNode1.getExpression()+","+reportNode1.getFactor());
			// list.add(obj);
			// }
			// }
			// }
			// sheet.addMergedRegion(new
			// Region(0,(short)0,0,(short)(colNum-1)));//合并单元格,行,列一 行,列
			//
			// codeTables=codeTableManager.queryList(null, null);
			// j2UnitCodes=j2UnitCodeManager.queryByCodeByWhere(" code like
			// '"+code+"%'");
			// rowNum=6;
			// List<J2UnitCode> j2UnitCodeList1,j2UnitCodeList2,j2UnitCodeList3;
			// J2UnitCode j2UnitCode1,j2UnitCode2,j2UnitCode3;
			// postgresJDBCUtil=new PostgresJDBCUtil();//初始化 postgres工具
			// postgresJDBCUtil.getConn();
			// //dataTable
			// =postgresJDBCUtil.getDataTable(tableName,returnFields,"c_xian='"+code+"'
			// or c_xiang='"+code+"' or c_cun='"+code+"'");
			// String where="";
			// j2UnitCodeList1=j2UnitCodeManager.queryByCode(code,true);//获取行列区划
			// for(int i=0;i<j2UnitCodeList1.size();i++){//循环行政区划 县级
			// j2UnitCode1=j2UnitCodeList1.get(i);
			// if(j2UnitCode1.getCodeLevel().equals("5")){
			// where=" and c_cun='"+j2UnitCode1.getCode()+"'";
			// }
			// if(j2UnitCode1.getCodeLevel().equals("4")){
			// where=" and c_xiang='"+j2UnitCode1.getCode()+"'";
			// }
			// if(j2UnitCode1.getCodeLevel().equals("3")){
			// where=" and c_xian='"+j2UnitCode1.getCode()+"'";
			// }
			// row = sheet.createRow(rowNum);
			// cell = row.createCell((Integer) 0);
			// cell.setCellValue(j2UnitCode1.getName());
			// cell.setCellStyle(cellStyle1);
			// j2UnitCodeList2=j2UnitCodeManager.queryByCode(j2UnitCode1.getCode(),false);//获取行列区划
			// rowNum=addRows(1,sheet,row,startColNum,cell.getStringCellValue(),reportNodeT1,reportNodeT2,reportNodeT3,reportNodeT4,list,where,cellStyle1);
			// for(int j=0;j<j2UnitCodeList2.size();j++){//乡镇
			// j2UnitCode2=j2UnitCodeList2.get(j);
			// if(j2UnitCode2.getCodeLevel().equals("5")){
			// where=" and c_cun='"+j2UnitCode2.getCode()+"'";
			// }
			// if(j2UnitCode2.getCodeLevel().equals("4")){
			// where=" and c_xiang='"+j2UnitCode2.getCode()+"'";
			// }
			// row = sheet.createRow(rowNum);
			// cell = row.createCell((Integer) 0);
			// cell.setCellValue(j2UnitCode2.getName());
			// cell.setCellStyle(cellStyle1);
			// j2UnitCodeList3=j2UnitCodeManager.queryByCode(j2UnitCode2.getCode(),false);//获取行列区划
			// rowNum=addRows(2,sheet,row,startColNum,cell.getStringCellValue(),reportNodeT1,reportNodeT2,reportNodeT3,reportNodeT4,list,where,cellStyle1);
			// for(int k=0;k<j2UnitCodeList3.size();k++){//村
			// j2UnitCode3=j2UnitCodeList3.get(k);
			// row = sheet.createRow(rowNum);
			// cell = row.createCell((Integer) 0);
			// cell.setCellValue(j2UnitCode3.getName());
			// cell.setCellStyle(cellStyle1);
			// where=" and c_cun='"+j2UnitCode3.getCode()+"'";
			// dataTable
			// =postgresJDBCUtil.getDataTable(tableName,returnFields,where);
			// rowNum=addRows(3,sheet,row,startColNum,cell.getStringCellValue(),reportNodeT1,reportNodeT2,reportNodeT3,reportNodeT4,list,where,cellStyle1);
			// }
			// }
			// }
			postgresJDBCUtil.closeCon();
			String fileName = null;
			// 新建excel文件
			if (isProcess) {
				fileName = report.getReportname().replace(" ", "_") + year + "Base" + ".xls";
				Report processReport = reportManager.getReport(Integer.valueOf(reportid));
				String sta = processReport.getStatus();
				if (sta != null) {
					processReport.setStatus(sta + ";" + year.substring(2));
				} else
					processReport.setStatus(year.substring(2));
				reportManager.editReport(processReport);
			} else {
				fileName = report.getReportname().replace(" ", "_") + new Date().getTime() + ".xls";
			}
			String filePath = request.getRealPath("/download") + "/" + fileName;
			String path = "/download/" + fileName;
			OutputStream os = new FileOutputStream(filePath);
			wb.write(os);
			os.flush();
			os.close();
			Map<String, Object> result = new HashMap<String, Object>();
			objectMapper = new ObjectMapper();
			result.put("success", true);
			result.put("path", path);
			try {
				response.getWriter().write(objectMapper.writeValueAsString(result));
			} catch (Exception e) {
				result.put("success", false);
				response.getWriter().write(objectMapper.writeValueAsString(result));
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			/*
			 * ByteArrayOutputStream os = new ByteArrayOutputStream(); wb.write(os); byte[] content = os.toByteArray(); is = new ByteArrayInputStream(content);
			 * response.setContentType("application/octet-stream"); String resultFilename=report.getReportname().replace(" ","_")+new Date().getTime()+".xls";
			 * response.setHeader("Content-disposition", "attachment; filename=" + new String(resultFilename.getBytes("utf-8"), "ISO8859-1")); BufferedInputStream bis = null;
			 * BufferedOutputStream bos = null; bis = new BufferedInputStream(is); bos = new BufferedOutputStream(response.getOutputStream()); byte[] buff = new byte[2048]; int
			 * bytesRead; while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) { bos.write(buff, 0, bytesRead); } bis.close(); bos.close();
			 */
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@RequestMapping(params = "method=exportPage1")
	public void exportPage1(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String reportid = StringUtil.isEmptyReturnStr(request.getParameter("reportid"), "1");
		String code = StringUtil.isEmptyReturnStr(request.getParameter("code"), "210123");// 行政区域code=210123204001
		String year = StringUtil.isEmptyReturnStr(request.getParameter("year"), "2012");
		String tableName = "j2210000jb" + year + "xbm";// 表名称
		Report report = reportManager.getReport(Integer.parseInt(reportid));
		List<ReportNode> reportNodes = reportNodeManager.queryReportNode(report.getId(), null);
		List<J2UnitCode> listUnitCode = j2UnitCodeManager.queryByCodeByWhere("code like '" + code + "%'");
		postgresJDBCUtil = new PostgresJDBCUtil();// 初始化 postgres工具
		String fields = "c_xian,c_xiang,c_cun,c_lb,c_xb,d_mj,t_diming,c_dilei,c_tdsy,c_lmsy,c_gclb,c_sllb,c_bhdj,c_ldlx,c_jycs,c_px,c_powei,i_podu,i_haiba,c_qy,c_lz,c_yssz,i_pjnl,c_szzc,c_lingzu,d_pjsg,d_pjxj,d_ybd,d_gqxj,i_gqzs,i_xbxj,c_trlx,i_tchd,c_trzd,c_dbzl,c_dbfb,c_xmzl,c_xmfb,c_yszl,i_ysgqzs,c_gxdj,c_jjlcq,c_lingji,d_gqdmj,t_beizhu,i_sszs,c_zlfs,c_joinid,c_tfh,c_shuixi,c_tdshy,c_lmshy,c_stqw,c_stfq,c_stgnj,c_stzyj,c_stcrj,c_hmhqy,c_shqy,c_sqdj,c_qljg,c_zrd,c_lx,c_lc,d_smd,c_kjd,i_xbzs,c_ccdj,c_pycz,c_jylx,c_dimao,c_poduj,c_tchdj,i_fzzh,c_fzzhdj,i_slhl,c_sssz,d_ssxj,c_xmszqk,i_ysnl,d_ysdj,c_ysfb,c_ysszqk,c_zhlx,c_zhdj,c_jkdj,c_bhsj,c_bhyy,c_gxbj,c_szzchz,i_fgd,i_ccl,i_ssxuji,i_xmgd,i_xmgaid,i_dbgaid,i_dbgd,i_ysgd,c_oldid,c_newid,c_guid,c_a1,c_a2,c_a3,c_a4,c_a5";
		String returnFields = "c_xian,c_xiang,c_cun";
		DataTable dataTable = postgresJDBCUtil.getDataTable(tableName, returnFields, "c_xian='" + code + "' or c_xiang='" + code + "' or c_cun='" + code + "'");
		// codeList1=codeTableManager.queryList(reportNodeT1.getCodeid(), null);

		// 构造表结构
		DataTable dt = new DataTable();
		HashMap<String, List<CodeTable>> codeList = new HashMap<String, List<CodeTable>>();
		ArrayList<ReportNode> columnList = new ArrayList<ReportNode>();
		ReportNode nodeXZQH = new ReportNode();
		nodeXZQH.setName("统计单位");

		dt.addColumn("unit", DataTypes.DATATABLE_STRING);
		columnList.add(nodeXZQH);// 添加列

		for (int i = 0; i < reportNodes.size(); i++) {
			ReportNode node = reportNodes.get(i);
			if (node.getName().equals("统计单位"))
				continue;
			if (hasChildren(reportNodes, node))
				continue;

			columnList.add(node);// 添加所有列

			int showCaculate = node.getShowCalculate();

			if (showCaculate > 0) {// 不需要计算
				String codeid = node.getCodeid();
				if (codeid != null) {
					List<CodeTable> list = codeTableManager.queryList(codeid, "");
					if (list != null) {
						codeList.put(node.getCodeid(), list);
					}
					dt.addColumn(node.getCodeid(), DataTypes.DATATABLE_STRING);
				}
			} else {// 需要计算
				String expression = node.getExpression();
				String factor = node.getFactor();
				dt.addColumn(node.getId() + "", DataTypes.DATATABLE_STRING);
			}
		}

		for (int i = 0; i < listUnitCode.size(); i++) {
			J2UnitCode unitCode = listUnitCode.get(i);

			int indexRow = dt.getRows().size();

			for (Entry<String, List<CodeTable>> entry : codeList.entrySet()) {
				entry.getKey();
				entry.getValue();

				List<CodeTable> list = entry.getValue();
				for (int j = 0; j < list.size(); j++) {
					DataRow dr = dt.newRow();
					dr.setValue("unit", unitCode.getCode());// 行政区划列
					int count = 1;
					for (Entry<String, List<CodeTable>> entry1 : codeList.entrySet()) {
						// dr.setValue(entry1.getKey(),
						// list.get(j).getCodeId());
						dr.setValue(count, list.get(j).getPsbCode());
						count++;
					}
					// dr.setValue("unit", unitCode.getCode());// 行政区划列
					// dr.setValue(entry.getKey(), list.get(j).getCodeId());
					dt.getRows().add(dr);
				}
			}

			String level = unitCode.getCodeLevel();
			if (!level.equalsIgnoreCase("5"))
				continue;
			DataTable dtTemp = dataTable.select("'c_cun'='" + unitCode.getCode() + "'");

			for (int row = indexRow; row < dt.getRows().size(); row++) {
				for (int col = codeList.size() + 1; col < dt.getColumns().size(); col++) {
					String filter = "";
					for (int index = 1; index < codeList.size() + 1; index++) {
						filter += "'" + dt.getColumns().get(index).getColumnName() + "'='" + dt.getValue(row, index) + "'";
					}

					String factor = columnList.get(col).getFactor();
					if (factor == null)
						continue;
					for (int k = 0; k < dataTable.getRows().size(); k++) {
						Double s = dtTemp.selectSum(filter + " && " + columnList.get(col).getExpression(), columnList.get(col).getFactor());
						dt.setValue(row, col, s);
					}
				}
			}

			// for (Entry<String, List<CodeTable>> entry : codeList.entrySet())
			// {
			// entry.getKey();
			// entry.getValue();
			//
			// List<CodeTable> list = entry.getValue();
			// for(int j=0;j<list.size();j++){
			// DataRow dr = dt.newRow();
			// dr.setValue("unit", unitCode.getCode());// 行政区划列
			// dt.getRows().add(dr);
			// }
			// }
			//
			//
			//
			// for (Entry<String, List<CodeTable>> entry : codeList.entrySet())
			// {
			// entry.getKey();
			// entry.getValue();
			//
			// List<CodeTable> list = entry.getValue();
			// for(int j=0;j<list.size();j++){
			//
			// }
			// }
			//
			//
			//
			//
			//
			// for (Entry<String, List<CodeTable>> entry : codeList.entrySet())
			// {
			// entry.getKey();
			// entry.getValue();
			//
			// List<CodeTable> list = entry.getValue();
			//
			//
			// ArrayList<DataRow> listRow = new ArrayList<DataRow>();
			//
			// for(int j=0;j<list.size();j++){
			// DataRow dr = dt.newRow();
			// dr.setValue("unit", unitCode.getName());// 行政区划列
			// dr.setValue(entry.getKey(), list.get(j).getCodeName());
			//
			// for(int k=1;k<columnList.size();k++){
			// ReportNode reportNode = columnList.get(k);
			// if(reportNode.getCodeid()!=null)continue;
			//
			// if(reportNode.getExpression().indexOf("[")>0){// 合计项
			//
			// }
			// else{
			// if(!isCun(unitCode.getCode()))continue;
			// String filter = "'cun'='"+unitCode.getCode()+"' &&
			// "+reportNode.getExpression();
			// double s=dataTable.selectSum("", reportNode.getFactor());
			// dr.setValue(reportNode.getId(), s);
			// }
			// }
			// }
			// }
			//
		}

		String a = "";
		a = "b";
	}

	private Boolean isCun(String unitCode) {
		if (unitCode.length() == 9) {
			return true;
		} else {
			return false;
		}
	}

	private Boolean hasChildren(List<ReportNode> reportNodes, ReportNode nodeTemp) {
		for (int i = 0; i < reportNodes.size(); i++) {
			ReportNode node = reportNodes.get(i);
			if (node.getPid() - (nodeTemp.getId()) == 0) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 给每行设置数据值
	 * 
	 * @param row
	 *            行
	 * @param column
	 *            开始列
	 * @param columnList
	 *            列列表
	 * @param where
	 *            条件
	 * @param cellStyle
	 *            列样式
	 */
	public int addRows(int type, HSSFSheet sheet, HSSFRow row, int column, String colValue0, ReportNode reportNodeT1, ReportNode reportNodeT2, ReportNode reportNodeT3,
			ReportNode reportNodeT4, List<JSONObject> columnList, String where, HSSFCellStyle cellStyle) {
		int currentRowNum = row.getRowNum();
		String where1 = "";
		List<CodeTable> codeList1, codeList2, codeList3, codeList4;
		CodeTable codeTabel1, codeTabel2, codeTabel3, codeTabel4;
		if (reportNodeT1 != null) {
			codeList1 = queryCodeTableByCode(reportNodeT1.getCodeid());
			currentRowNum++;
			for (int i = 0; i < codeList1.size(); i++) {
				codeTabel1 = codeList1.get(i);
				row = sheet.createRow(currentRowNum);

				HSSFCell cell = row.createCell((Integer) 0);
				cell.setCellValue(colValue0);
				cell.setCellStyle(cellStyle);

				cell = row.createCell((Integer) 1);
				cell.setCellValue(codeTabel1.getPsbValue());
				cell.setCellStyle(cellStyle);

				String codeType = "''";
				if (reportNodeT1.getFactor() != null) {
					codeType = reportNodeT1.getFactor();
				}
				where1 = " and " + codeType.toLowerCase() + "='" + codeTabel1.getPsbCode() + "'";
				setRowCellsValue(type, row, column, columnList, where + where1, cellStyle);// 给本行的每一列设置值
				currentRowNum++;
				if (reportNodeT2 != null) {
					codeList2 = queryCodeTableByCode(reportNodeT2.getCodeid());
					for (int j = 0; j < codeList2.size(); j++) {
						codeTabel2 = codeList2.get(j);
						row = sheet.createRow(currentRowNum);

						cell = row.createCell((Integer) 0);
						cell.setCellValue(colValue0);
						cell.setCellStyle(cellStyle);

						cell = row.createCell((Integer) 1);
						cell.setCellValue(codeTabel1.getPsbValue());
						cell.setCellStyle(cellStyle);

						cell = row.createCell((Integer) 2);
						cell.setCellValue(codeTabel2.getPsbValue());
						cell.setCellStyle(cellStyle);

						String codeType1 = "''";
						if (reportNodeT1.getFactor() != null) {
							codeType1 = reportNodeT1.getFactor();
						}
						String codeType2 = "''";
						if (reportNodeT2.getFactor() != null) {
							codeType2 = reportNodeT2.getFactor();
						}

						where1 = " and " + codeType1 + "='" + codeTabel1.getPsbCode() + "' and " + codeType2 + "='" + codeTabel2.getPsbCode() + "'";
						setRowCellsValue(type, row, column, columnList, where + where1, cellStyle);// 给本行的每一列设置值
						currentRowNum++;
						if (reportNodeT3 != null) {
							codeList3 = queryCodeTableByCode(reportNodeT3.getCodeid());
							for (int k = 0; k < codeList3.size(); k++) {
								codeTabel3 = codeList3.get(k);
								row = sheet.createRow(currentRowNum);

								cell = row.createCell((Integer) 0);
								cell.setCellValue(colValue0);
								cell.setCellStyle(cellStyle);

								cell = row.createCell((Integer) 1);
								cell.setCellValue(codeTabel1.getPsbValue());
								cell.setCellStyle(cellStyle);

								cell = row.createCell((Integer) 2);
								cell.setCellValue(codeTabel2.getPsbValue());
								cell.setCellStyle(cellStyle);

								cell = row.createCell((Integer) 3);
								cell.setCellValue(codeTabel3.getPsbValue());
								cell.setCellStyle(cellStyle);

								String factor1 = "''";
								if (reportNodeT1.getFactor() != null) {
									factor1 = reportNodeT1.getFactor();
								}
								String factor2 = "''";
								if (reportNodeT2.getFactor() != null) {
									factor2 = reportNodeT2.getFactor();
								}
								String factor3 = "''";
								if (reportNodeT3.getFactor() != null) {
									factor3 = reportNodeT3.getFactor();
								}

								where1 = " and " + factor1 + "='" + codeTabel1.getPsbCode() + "' and " + factor2 + "='" + codeTabel2.getPsbCode() + "' and " + factor3 + "='"
										+ codeTabel3.getPsbCode() + "'";
								setRowCellsValue(type, row, column, columnList, where + where1, cellStyle);// 给本行的每一列设置值
								currentRowNum++;
								if (reportNodeT4 != null) {
									codeList4 = queryCodeTableByCode(reportNodeT4.getCodeid());
									for (int l = 0; l < codeList4.size(); l++) {
										codeTabel4 = codeList4.get(l);
										row = sheet.createRow(currentRowNum);

										cell = row.createCell((Integer) 0);
										cell.setCellValue(colValue0);
										cell.setCellStyle(cellStyle);

										cell = row.createCell((Integer) 1);
										cell.setCellValue(codeTabel1.getPsbValue());
										cell.setCellStyle(cellStyle);

										cell = row.createCell((Integer) 2);
										cell.setCellValue(codeTabel2.getPsbValue());
										cell.setCellStyle(cellStyle);

										cell = row.createCell((Integer) 3);
										cell.setCellValue(codeTabel3.getPsbValue());
										cell.setCellStyle(cellStyle);

										cell = row.createCell((Integer) 4);
										cell.setCellValue(codeTabel4.getPsbValue());
										cell.setCellStyle(cellStyle);

										String factor11 = "''";
										if (reportNodeT1.getFactor() != null) {
											factor11 = reportNodeT1.getFactor();
										}
										String factor12 = "''";
										if (reportNodeT2.getFactor() != null) {
											factor12 = reportNodeT2.getFactor();
										}
										String factor13 = "''";
										if (reportNodeT3.getFactor() != null) {
											factor13 = reportNodeT3.getFactor();
										}
										String factor14 = "''";
										if (reportNodeT4.getFactor() != null) {
											factor14 = reportNodeT4.getFactor();
										}

										where1 = " and " + factor11 + "='" + codeTabel1.getPsbCode() + "' and " + factor12 + "='" + codeTabel2.getPsbCode() + "' " + "and "
												+ factor13 + "='" + codeTabel3.getPsbCode() + "' and " + factor14 + "='" + codeTabel4.getPsbCode() + "'";
										setRowCellsValue(type, row, column, columnList, where + where1, cellStyle);// 给本行的每一列设置值
										currentRowNum++;
									}
								}
							}
						}
					}
				}

			}
		}
		return currentRowNum;
	}

	/**
	 * 给每行设置数据值
	 * 
	 * @param row
	 *            行
	 * @param column
	 *            开始列
	 * @param columnList
	 *            列列表
	 * @param where
	 *            条件
	 * @param cellStyle
	 *            列样式
	 */
	public void setRowCellsValue(int type, HSSFRow row, int column, List<JSONObject> columnList, String where, HSSFCellStyle cellStyle) {
		for (int i = 0; i < columnList.size(); i++) {
			JSONObject obj = columnList.get(i);
			HSSFCell cell = row.createCell((Integer) (column + i));
			if (type == 3) {
				double s = dataTable.selectSum(obj.getString("condition") + where, obj.getString("field"));
				if (s > 0) {
					cell.setCellValue(s);
				} else {
					cell.setCellValue("");
				}
			} else {
				String s = postgresJDBCUtil.getDataSum(obj.getString("sql") + where.toLowerCase());
				cell.setCellValue(s);
			}

			cell.setCellStyle(cellStyle);
		}
	}

	public String getField(String fields, String returnFields, String where) {
		String[] fieldArray = fields.split(",");
		for (int i = 0; i < fieldArray.length; i++) {
			if (returnFields.indexOf(fieldArray[i]) < 0) {
				if (where.toLowerCase().indexOf(fieldArray[i]) > -1) {
					returnFields += "," + fieldArray[i];
				}
			}
		}
		return returnFields;
	}

	public List<CodeTable> queryCodeTableByCode(String codeId) {
		List<CodeTable> list = new ArrayList<CodeTable>();
		for (CodeTable codeTable : codeTables) {
			if (codeTable.getCodeId().equals(codeId)) {
				list.add(codeTable);
			}
		}
		return list;
	}

	public List<J2UnitCode> queryJ2UnitCodeByCode(String code, boolean isHas) {
		List<J2UnitCode> list = new ArrayList<J2UnitCode>();
		for (J2UnitCode j2UnitCode : j2UnitCodes) {
			if (isHas && j2UnitCode.getCode().equals(code)) {
				list.add(j2UnitCode);
			} else {
				if (j2UnitCode.getCode().length() == (code.length() + 3) && j2UnitCode.getCode().substring(0, code.length()).equals(code)) {
					list.add(j2UnitCode);
				}
			}

		}
		return list;
	}

	@RequestMapping(params = "method=getExcelInfo")
	public void getPageByName(Integer start, Integer limit, String fileName, HttpServletRequest request, HttpServletResponse respose) {
		try {
			FileInputStream is = new FileInputStream(request.getServletContext().getRealPath("/") + "download/" + fileName);
			HSSFWorkbook wb = new HSSFWorkbook(is);
			HSSFSheet sheet = wb.getSheetAt(0);
			Row tmpRow = sheet.getRow(sheet.getFirstRowNum());
			List<Map<String, Object>> tmpList = new ArrayList<Map<String, Object>>();
			maxRow = sheet.getFirstRowNum();
			for (int i = 0; i < tmpRow.getLastCellNum();) {
				Map<String, Object> tmpMap = new HashMap<String, Object>();
				CellRangeAddress tmpMerged = getCellAddress(i, sheet.getFirstRowNum(), sheet);
				if (tmpMerged != null && tmpMerged.getFirstColumn() != tmpMerged.getLastColumn()) {
					tmpMap.put("text", tmpRow.getCell(i).getStringCellValue());
					tmpMap.put("columns", getHeader(tmpMerged, sheet));
					i += tmpMerged.getLastColumn() - tmpMerged.getFirstColumn() + 1;
				} else {
					String tmpp = tmpRow.getCell(i).getStringCellValue();
					if (tmpp.length() > 5)
						tmpp = tmpp.substring(0, 5) + "<br/>" + tmpp.substring(5, tmpp.length());
					tmpMap.put("text", tmpp);
					tmpMap.put("dataIndex", "c" + i);
					tmpMap.put("minWidth", 100);
					tmpMap.put("align", "center");
					// tmpMap.put("shrinkWrap", 3);
					i++;
				}
				tmpList.add(tmpMap);
			}
			List<String> tmpList2 = new ArrayList<String>();
			int maxNum = 0;
			for (int i = 0; i < sheet.getNumMergedRegions(); i++) {
				if (sheet.getMergedRegion(i).getLastRow() > maxNum)
					maxNum = sheet.getMergedRegion(i).getLastRow();
			}
			for (int i = 0; i < sheet.getRow(maxNum + 1).getLastCellNum(); i++)
				tmpList2.add("c" + i);
			Map<String, Object> tmpMap = new HashMap<String, Object>();
			tmpMap.put("fields", tmpList2);
			tmpMap.put("start", maxRow + 1);
			tmpMap.put("columns", tmpList);
			respose.getWriter().write(new ObjectMapper().writeValueAsString(tmpMap));
			is.close();

		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			try {
				respose.getWriter().write("{\"columns\":[{\"text\":\"123\"},{\"text\":456}],\"fields\":[\"a\",\"b\"]}");
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			return;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public List<Map<String, Object>> getHeader(CellRangeAddress merged, HSSFSheet sheet) {
		int y = merged.getLastRow() + 1;
		if (y > maxRow)
			maxRow = y;
		Row tmpRow = sheet.getRow(y);
		List<Map<String, Object>> tmpList = new ArrayList<Map<String, Object>>();
		for (int i = merged.getFirstColumn(); i <= merged.getLastColumn();) {
			Map<String, Object> tmpMap = new HashMap<String, Object>();
			CellRangeAddress tmpMerged = getCellAddress(i, y, sheet);
			if (tmpMerged != null && tmpMerged.getFirstColumn() != tmpMerged.getLastColumn()) {
				tmpMap.put("text", tmpRow.getCell(i).getStringCellValue());
				tmpMap.put("columns", getHeader(tmpMerged, sheet));
				i += tmpMerged.getLastColumn() - tmpMerged.getFirstColumn() + 1;
			} else {
				String tmpp = tmpRow.getCell(i).getStringCellValue();
				if (tmpp.length() > 5)
					tmpp = tmpp.substring(0, 5) + "<br/>" + tmpp.substring(5, tmpp.length());
				tmpMap.put("text", tmpp);
				tmpMap.put("dataIndex", "c" + i);
				tmpMap.put("minWidth", 100);
				tmpMap.put("align", "center");
				// tmpMap.put("shrinkWrap", 3);
				i++;
			}
			tmpList.add(tmpMap);

		}
		return tmpList;
	}

	public CellRangeAddress getCellAddress(int x, int y, HSSFSheet sheet) {
		for (int i = 0; i < sheet.getNumMergedRegions(); i++)
			if (sheet.getMergedRegion(i).isInRange(y, x))
				return sheet.getMergedRegion(i);
		return null;
	}

	@RequestMapping(params = "method=getExcelRows")
	public void getExcelRows(Integer start, Integer limit, String fileName, HttpServletRequest request, HttpServletResponse respose, Integer processLevel) {
		FileInputStream is = null;
		FileOutputStream os = null;
		HSSFWorkbook wb1 = null;
		HSSFSheet sheet1 = null;
		try {
			is = new FileInputStream(request.getServletContext().getRealPath("/") + "download/" + fileName);
			HSSFWorkbook wb = new HSSFWorkbook(is);
			HSSFSheet sheet = wb.getSheetAt(0);
			int maxNum = 0;
			for (int i = 0; i < sheet.getNumMergedRegions(); i++) {
				if (sheet.getMergedRegion(i).getLastRow() > maxNum)
					maxNum = sheet.getMergedRegion(i).getLastRow();
			}
			File o = new File(request.getServletContext().getRealPath("/") + "download/" + fileName.substring(0, fileName.length() - 4) + processLevel + ".xls");
			if (start == 0&&!o.exists()) {
				try {
					os = new FileOutputStream(request.getServletContext().getRealPath("/") + "download/" + fileName.substring(0, fileName.length() - 4) + processLevel + ".xls");
				} catch (FileNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				wb1 = new HSSFWorkbook();
				sheet1 = wb1.createSheet();
				centerStyle = wb1.createCellStyle();
				centerStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
				centerStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
				for (int i = 0; i <= maxNum; i++) {
					Row coptRow = sheet1.createRow(i);
					Row originRow = sheet.getRow(i);
					if(originRow!=null){
					for (int j = 0; j < originRow.getLastCellNum(); j++) {
						if (originRow.getCell(j) != null) {
							if (originRow.getCell(j).getCellType() == HSSFCell.CELL_TYPE_NUMERIC){
								Cell c =coptRow.createCell(j);
								c.setCellValue(originRow.getCell(j).getNumericCellValue());
								c.setCellStyle(centerStyle);
								}
							else if (originRow.getCell(j).getCellType() == HSSFCell.CELL_TYPE_STRING){
								Cell c =coptRow.createCell(j);
								c.setCellValue(originRow.getCell(j).getStringCellValue());
								c.setCellStyle(centerStyle);
								}
						}
					}}

				}
				for (int i = 0; i < sheet.getNumMergedRegions(); i++) {
					sheet1.addMergedRegion(sheet.getMergedRegion(i));
				}
				int ii= maxNum + 1;
				for (int i = maxNum + 1; i < sheet.getLastRowNum(); i++) {
					Row coptRow = sheet1.createRow(ii);
					Row originRow = sheet.getRow(i);
					String t = originRow.getCell(0).getStringCellValue();
					switch (processLevel) {
					case 1:
						if(!t.endsWith("省"))
						continue;
					case 2:
						if(!t.endsWith("省")&&!t.endsWith("市"))
						continue;
					default:
						break;
					}
					for (int j = 0; j < originRow.getLastCellNum(); j++) {
						if (originRow.getCell(j) != null) {
							if (originRow.getCell(j).getCellType() == HSSFCell.CELL_TYPE_NUMERIC)
								coptRow.createCell(j).setCellValue(originRow.getCell(j).getNumericCellValue());
							else if (originRow.getCell(j).getCellType() == HSSFCell.CELL_TYPE_STRING)
								coptRow.createCell(j).setCellValue(originRow.getCell(j).getStringCellValue());

						}
					}	
					ii++;
				}
				wb1.write(os);
				os.close();
			}

			Map<String, Object> tmpMap = new HashMap<String, Object>();
			int newTotal = 0;
			if (processLevel == -1) {
				newTotal = sheet.getLastRowNum() - maxNum;
				tmpMap.put("total", newTotal);
			} else {
				newTotal = 0;
				for (int i = maxNum + 1; i <= sheet.getLastRowNum(); i++) {
					String xz = sheet.getRow(i).getCell(0).getStringCellValue();
					switch (processLevel) {
					case 1:
						if (xz.endsWith("省"))
							newTotal++;
						break;
					case 2:
						if (xz.endsWith("省") || xz.endsWith("市"))
							newTotal++;
						break;
					default:
						newTotal++;
						break;
					}
				}
				tmpMap.put("total", newTotal);
			}
			if (sheet.getLastRowNum() - maxNum != 0) {
				List<Map<String, Object>> tmpList = new ArrayList<Map<String, Object>>();
				int j = 0;

				for (int i = 0; i < (limit > newTotal - start ? newTotal - start : limit); i++) {
					Map<String, Object> tmpMap1 = new HashMap<String, Object>();
					Row tmpRow = sheet.getRow(start + j + maxNum + 1);
					String xz = tmpRow.getCell(0).getStringCellValue();
					switch (processLevel) {
					case 1:
						if (!xz.endsWith("省")) {
							j++;
							i--;
							continue;
						}
					case 2:
						if (!xz.endsWith("省") && !xz.endsWith("市")) {
							j++;
							i--;
							continue;
						}
					default:
						break;
					}
					j++;
					for (int m = 0; m < sheet.getRow(maxNum + 1).getLastCellNum(); m++) {
						if (tmpRow.getCell(m).getCellType() != HSSFCell.CELL_TYPE_NUMERIC)
							tmpMap1.put("c" + m, tmpRow.getCell(m).getStringCellValue());
						else
							tmpMap1.put("c" + m, String.format("%.2f", tmpRow.getCell(m).getNumericCellValue()));

					}
					tmpList.add(tmpMap1);
				}
				tmpMap.put("items", tmpList);
			}
			is.close();
			respose.getWriter().write(new ObjectMapper().writeValueAsString(tmpMap));
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}
