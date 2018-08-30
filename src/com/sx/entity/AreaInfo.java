package com.sx.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * AreaInfo entity. @author cwj
 */

@Entity
@Table(name = "areaInfo")
public class AreaInfo implements java.io.Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	// Fields
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "areaCode")
	private String areaCode;
	@Column(name = "areaName")
	private String areaName;
	@Column(name = "content")
	private String content;
	@Column(name = "xbNum")
	private Integer xbNum;
	@Column(name = "areaTotal")
	private Double areaTotal;
	public String getAreaCode() {
		return areaCode;
	}
	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	public String getAreaName() {
		return areaName;
	}
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Integer getXbNum() {
		return xbNum;
	}
	public void setXbNum(Integer xbNum) {
		this.xbNum = xbNum;
	}
	public Double getAreaTotal() {
		return areaTotal;
	}
	public void setAreaTotal(Double areaTotal) {
		this.areaTotal = areaTotal;
	}
}