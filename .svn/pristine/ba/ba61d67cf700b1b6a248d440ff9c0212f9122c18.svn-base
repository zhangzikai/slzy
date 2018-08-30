package com.sx.util;

import java.io.File;
import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.Properties;

import com.sx.util.data.DataRow;
import com.sx.util.data.DataTable;
import com.sx.util.data.DataTypes;

public class PostgresJDBCUtil {
	public Connection conn = getConn();
	public DecimalFormat df = new DecimalFormat("#.00");
	public File file = new File(this.getClass().getClassLoader().getResource("").getPath()+ "jdbc.properties");

	/**
	 * @method getConn() 获取数据库的连接
	 * @return Connection
	 */
	public Connection getConn() {
		df = new DecimalFormat("#.00");
		file = new File(this.getClass().getClassLoader().getResource("").getPath()+ "jdbc.properties");
		Properties prop = new Properties();// 属性集合对象
		try {
			FileInputStream fis = new FileInputStream(file);// 属性文件流
			prop.load(fis);
			Class.forName(prop.getProperty("jdbc.postgres.driver_class")); // classLoader,加载对应驱动
			conn = (Connection) DriverManager.getConnection(
					prop.getProperty("jdbc.postgres.url"),
					prop.getProperty("jdbc.postgres.username"),
					prop.getProperty("jdbc.postgres.password"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return conn;
	}
	
	public ResultSet excute(PreparedStatement sql){
		try {
			if(conn==null){
				return null;
			}
			return sql.executeQuery();
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}

	/**
	 * @method Integer getAll() 查询并打印表中数据
	 * @return Integer 查询并打印表中数据
	 */
	public String getDataSum(String sql) {
		PreparedStatement pstmt;
		String returnStr = "";
		try {
			if(conn==null){
				conn = getConn();
			}
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			ResultSet rs = pstmt.executeQuery();			
			while (rs.next()) {
				if (rs.getMetaData().getColumnCount() > 0) {
					if (rs.getString(1) != null) {
						returnStr = df.format(Double.parseDouble(rs
								.getString(1)));
					}
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return returnStr;
	}

	/**
	 * @method Integer getAll() 查询并打印表中数据
	 * @return Integer 查询并打印表中数据
	 */
	public void closeCon() {
		if (conn != null) {
			try {
				conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	
	
	/**
	 * @method Integer getAll() 查询并打印表中数据
	 * @return Integer 查询并打印表中数据
	 */
	public DataTable getDataTable(String tableName,String fields,String where) {
		String sql = "select "+fields+" from "+tableName+" where 1=1 "+where;
		DataTable table = new DataTable(); // 新建一个数据表对象，不带构造函数参数
		PreparedStatement pstmt;
		try {
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			ResultSet rs = pstmt.executeQuery();
			int col = rs.getMetaData().getColumnCount();
			for (int i = 1; i <= col; i++) {
				table.addColumn(rs.getMetaData().getColumnName(i), DataTypes.DATATABLE_STRING);
			}
			while (rs.next()) {
				DataRow row = table.newRow();
				for (int i = 1; i <= col; i++) {
					row.setValue(rs.getMetaData().getColumnName(i),rs.getString(i));
				}
				table.addRow(row);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return table;
	}
	

	/**
	 * @method Integer getAll() 查询并打印表中数据
	 * @return Integer 查询并打印表中数据
	 */
	public Integer getAll() {
		Connection conn = getConn();
		String fields="c_xian,c_xiang,c_cun,c_lb,c_xb,d_mj,t_diming,c_dilei,c_tdsy,c_lmsy,c_gclb,c_sllb,c_bhdj,c_ldlx,c_jycs,c_px,c_powei,i_podu,i_haiba,c_qy,c_lz,c_yssz,i_pjnl,c_szzc,c_lingzu,d_pjsg,d_pjxj,d_ybd,d_gqxj,i_gqzs,i_xbxj,c_trlx,i_tchd,c_trzd,c_dbzl,c_dbfb,c_xmzl,c_xmfb,c_yszl,i_ysgqzs,c_gxdj,c_jjlcq,c_lingji,d_gqdmj,t_beizhu,i_sszs,c_zlfs,c_joinid,c_tfh,c_shuixi,c_tdshy,c_lmshy,c_stqw,c_stfq,c_stgnj,c_stzyj,c_stcrj,c_hmhqy,c_shqy,c_sqdj,c_qljg,c_zrd,c_lx,c_lc,d_smd,c_kjd,i_xbzs,c_ccdj,c_pycz,c_jylx,c_dimao,c_poduj,c_tchdj,i_fzzh,c_fzzhdj,i_slhl,c_sssz,d_ssxj,c_xmszqk,i_ysnl,d_ysdj,c_ysfb,c_ysszqk,c_zhlx,c_zhdj,c_jkdj,c_bhsj,c_bhyy,c_gxbj,c_szzchz,i_fgd,i_ccl,i_ssxuji,i_xmgd,i_xmgaid,i_dbgaid,i_dbgd,i_ysgd,c_oldid,c_newid,c_guid,c_a1,c_a2,c_a3,c_a4,c_a5";
		String sql = "select "+fields+" from j2210000jb2013xbm where c_cun='210123209002'";
		PreparedStatement pstmt;
		try {
			pstmt = (PreparedStatement) conn.prepareStatement(sql);
			ResultSet rs = pstmt.executeQuery();
			int col = rs.getMetaData().getColumnCount();
			System.out.println("============================");
			for (int i = 1; i <= col; i++) {
				System.out.print(rs.getMetaData().getColumnName(i) + "\t");
			}
			
			while (rs.next()) {
				for (int i = 1; i <= col; i++) {
					System.out.print(rs.getString(i) + "\t");
					if ((i == 2) && (rs.getString(i).length() < 8)) {
						System.out.print("\t");
					}
				}
				System.out.println("");
			}
			System.out.println("============================");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		PostgresJDBCUtil postgresJDBCUtil=new PostgresJDBCUtil();
		DataTable table =postgresJDBCUtil.getDataTable("j2210000jb2013xbm","","c_cun='210123209002'");
		
		for (int i = 0; i < table.getTotalCount(); i++) {
            for (int j = 0; j < table.getColumns().size(); j++) {
                System.out.print(table.getValue(i, j));
                if (j < 19) System.out.print(" , ");
            }
            System.out.print("\n");
        }
	}
}
