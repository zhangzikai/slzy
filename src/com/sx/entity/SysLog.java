package com.sx.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.servlet.http.HttpServletRequest;

import com.sx.util.DateUtil;
import com.sx.util.RequestUtil;

/**
 * Users entity. @author MyEclipse Persistence Tools
 */

@Entity
@Table(name = "SYSLOG")
public class SysLog implements java.io.Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	// Fields
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false, precision = 64, scale = 0)
	private Integer id;
	//用户
	@Column(name = "username")
	private String userName;
	//用户IP地址
	@Column(name = "logip")
	private String logIp;
	//日志内容
	@Column(name = "loginfo")
	private String logInfo;
	//操作时间
	@Column(name = "logtime")
	private String logTime;

	// Constructors

	/** default constructor */
	public SysLog() {
	}

	/**
	 * 添加日志实例化日志
	 * @param userName
	 * @param logIp
	 * @param logInfo
	 * @param logTime
	 */
	public SysLog(String userName, String logIp, String logInfo) {
		super();
		this.userName = userName;
		this.logIp = logIp;
		this.logInfo = logInfo;
		this.logTime =DateUtil.getCurrenDateTime();
	}
	/**
	 * 实例化日志
	 * @param request
	 * @param logInfo
	 */
	public SysLog(HttpServletRequest request, String logInfo) {
		super();
		this.userName = RequestUtil.getCurUserName(request);
		this.logIp = RequestUtil.getClientIP(request);
		this.logInfo = logInfo;
		this.logTime =DateUtil.getCurrenDateTime();
	}


	// Property accessors
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getLogIp() {
		return logIp;
	}

	public void setLogIp(String logIp) {
		this.logIp = logIp;
	}

	public String getLogInfo() {
		return logInfo;
	}

	public void setLogInfo(String logInfo) {
		this.logInfo = logInfo;
	}

	public String getLogTime() {
		return logTime;
	}

	public void setLogTime(String logTime) {
		this.logTime = logTime;
	}
}