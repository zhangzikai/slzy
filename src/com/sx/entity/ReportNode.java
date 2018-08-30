package com.sx.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * FlyLine entity. @author miaoshuangfei
 */

@Entity
@Table(name = "REPORT_NODE")
public class ReportNode implements java.io.Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	// Fields
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private Integer id;
	//名称
	@Column(name = "name")
	private String name;
	
	//父节点
	@JoinColumn(name="pid")
	private Integer pid;
	
	//名称
	@Column(name = "factor")
	private String factor;
	
	//名称
	@Column(name = "expression")
	private String expression;
	
	//名称
	@Column(name = "showCalculate")
	private Integer showCalculate;
	
	//名称
	@Column(name = "codeid")
	private String codeid;
	
	//名称
	@Column(name = "orderby")
	private Integer orderby;
		
	@Column(name="reportid")
	private String reportid;
	//创建用户
//	@ManyToOne
//	@JoinColumn(name="reportid")
//	private Report report;
	// Constructors

	/** default constructor */
	public ReportNode() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public String getFactor() {
		return factor;
	}

	public void setFactor(String factor) {
		this.factor = factor;
	}

	public String getExpression() {
		return expression;
	}

	public void setExpression(String expression) {
		this.expression = expression;
	}

	public Integer getShowCalculate() {
		return showCalculate;
	}

	public void setShowCalculate(Integer showCalculate) {
		this.showCalculate = showCalculate;
	}

//	public Report getReport() {
//		return report;
//	}
//
//	public void setReport(Report report) {
//		this.report = report;
//	}
	
	public String getReportid(){
		return reportid;
	}
	
	public void setReportid(String reportid){
		this.reportid = reportid;
	}

	public String getCodeid() {
		return codeid;
	}

	public void setCodeid(String codeid) {
		this.codeid = codeid;
	}

	public Integer getOrderby() {
		return orderby;
	}

	public void setOrderby(Integer orderby) {
		this.orderby = orderby;
	}

}