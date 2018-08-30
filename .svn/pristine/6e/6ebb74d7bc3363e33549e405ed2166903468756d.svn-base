package com.sx.controller;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;

public class ReadExcelServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public ReadExcelServlet() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doPost(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=gb2312");
		PrintWriter out = response.getWriter();
		//String filePath = new String(request.getParameter("file").getBytes(
		//		"GBK"), "gb2312");//注意如果这里出现乱码导致文件路径错误试着改下GBK，换成ISO-8859-1

		//out.print("文件路径：" + filePath + "<br>");
		StringBuffer bf = new StringBuffer();
		bf.append("<style type=\"text/css\">");
		bf.append("table.gridtable {");
		bf.append("font-family: verdana,arial,sans-serif;");
		bf.append("font-size:11px;");
		bf.append("color:#333333;");
		bf.append("border-width: 1px;");
		bf.append("border-color: #666666;");
		bf.append("border-collapse: collapse;");
		bf.append("}");
		bf.append("table.gridtable th {");
		bf.append("border-width: 1px;");
		bf.append("padding: 8px;");
		bf.append("border-style: solid;");
		bf.append("border-color: #666666;");
		bf.append("background-color: #dedede;");
		bf.append("}");
		bf.append("table.gridtable td {");
		bf.append("border-width: 1px;");
		bf.append("padding: 8px;");
		bf.append("border-style: solid;");
		bf.append("border-color: #666666;");
		bf.append("background-color: #ffffff;");
		bf.append("}");
		bf.append("</style>");
		out.println(bf.toString());
		
		String type = request.getParameter("type");
		if("".equals(type))return;
		
		String filePath = getServletContext().getRealPath("/excel")+"\\"+type+".xls";
		try {
			POIFSFileSystem fs = new POIFSFileSystem(new FileInputStream(filePath));
			// 创建工作簿 
			HSSFWorkbook workBook = new HSSFWorkbook(fs);

			/**
			 * 获得Excel中工作表个数 
			 */
			/*out.println("工作表个数 :" + workBook.getNumberOfSheets() + "<br>");*/
			for (int i = 0; i < workBook.getNumberOfSheets(); i++) {

				/*out.println("<font color='red'> " + i
						+ " ***************表名称：" + workBook.getSheetName(i)
						+ "  ************</font><br>");*/
				// 创建工作表 
				HSSFSheet sheet = workBook.getSheetAt(i);
				int rows = sheet.getPhysicalNumberOfRows(); // 获得行数 

				if (rows > 0) {
					sheet.getMargin(HSSFSheet.TopMargin);
					HSSFRow  thRow = sheet.getRow(0);//得到th行

					out.println("<font color='red'> 表名称：" + thRow.getCell(0).getRichStringCellValue()
							.toString()
							+ "  </font><br>");
					
					out.println("<table class=\"gridtable\" border=\"1\">");
					
					if (thRow != null) {
						//toTableTr(thRow, true, out);
					}
					for (int j = 1; j < rows; j++) { // 行循环 得到所有td行
						HSSFRow row = sheet.getRow(j);
						if (row != null) {
							toTableTr(row, false, out);
						}
					}
				}
				out.println("</table>");
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		//out.print("<script>alert('解析完毕');</script>");
		out.flush();
		out.close();
	}
	public void toTableTr(HSSFRow row ,Boolean isTh,PrintWriter out){//把excel行转变为table行
		int cells = row.getLastCellNum();
		out.println("<tr>");
		for (short k = 0; k < cells; k++) { // 列循环 
			HSSFCell cell = row.getCell(k);		

			if (cell != null) {

				String value = "";
				switch (cell.getCellType()) {
				case HSSFCell.CELL_TYPE_NUMERIC:
					if (HSSFDateUtil.isCellDateFormatted(cell)) {
						// 如果是date类型则 ，获取该cell的date值 
						value = HSSFDateUtil.getJavaDate(
								cell.getNumericCellValue())
								.toString();
						out.println(isTh?("<th>"+value+"</th>"):("<td>"+value+"</td>"));
					} else {// 纯数字 
						value = String.valueOf(cell
								.getNumericCellValue());
						out.println(isTh?("<th>"+value+"</th>"):("<td>"+value+"</td>"));
					}
					break;
				/* 此行表示单元格的内容为string类型 */
				case HSSFCell.CELL_TYPE_STRING: // 字符串型 
					value = cell.getRichStringCellValue()
							.toString();
					out.println(isTh?("<th>"+value+"</th>"):("<td>"+value+"</td>"));
					break;
				case HSSFCell.CELL_TYPE_FORMULA:// 公式型 
					// 读公式计算值 
					value = String.valueOf(cell
							.getNumericCellValue());
					if (value.equals("NaN")) {// 如果获取的数据值为非法值,则转换为获取字符串
						// 
						value = cell
								.getRichStringCellValue()
								.toString();
					}
					// cell.getCellFormula();读公式 
					out.println(isTh?("<th>"+value+"</th>"):("<td>"+value+"</td>"));
					break;
				case HSSFCell.CELL_TYPE_BOOLEAN:// 布尔 
					value = " "
							+ cell.getBooleanCellValue();
					out.println(isTh?("<th>"+value+"</th>"):("<td>"+value+"</td>"));
					break;
				/* 此行表示该单元格值为空 */
				case HSSFCell.CELL_TYPE_BLANK: // 空值 
					value = "";
					out.println(isTh?("<th>"+value+"</th>"):("<td>"+value+"</td>"));
					break;
				case HSSFCell.CELL_TYPE_ERROR: // 故障 
					value = "";
					out.println(isTh?("<th>"+value+"</th>"):("<td>"+value+"</td>"));
					break;
				default:
					value = cell.getRichStringCellValue()
							.toString();
					out.println(isTh?("<th>"+value+"</th>"):("<td>"+value+"</td>"));
				}
			}
			

		}
		out.println("</tr>");
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

}
