package com.sx.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * CodeTable entity. @author miaoshuangfei
 */

@Entity
@Table(name = "code_table")
public class CodeTable implements java.io.Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	// Fields
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "OBJECTID", unique = true, nullable = false)
	private Integer objectId;
	@Column(name = "CODE_NAME")
	private String codeName;
	@Column(name = "PSB_CODE")
	private String psbCode;
	@Column(name = "PSB_VALUE")
	private String psbValue;
	@Column(name = "CODE_ID")
	private String codeId;
	public Integer getObjectId() {
		return objectId;
	}
	public void setObjectId(Integer objectId) {
		this.objectId = objectId;
	}
	public String getCodeName() {
		return codeName;
	}
	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}
	public String getPsbCode() {
		return psbCode;
	}
	public void setPsbCode(String psbCode) {
		this.psbCode = psbCode;
	}
	public String getPsbValue() {
		return psbValue;
	}
	public void setPsbValue(String psbValue) {
		this.psbValue = psbValue;
	}
	public String getCodeId() {
		return codeId;
	}
	public void setCodeId(String codeId) {
		this.codeId = codeId;
	}

}