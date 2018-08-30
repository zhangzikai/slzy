package com.sx.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TABLEMETADATA")
public class TableMetadata implements java.io.Serializable {
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;
	
	// Fields
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false, precision = 64, scale = 0)
	private Integer id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "alias")
	private String alias;

	@Column(name = "isUnit")
	private String isUnit;
	
	@Column(name = "isCode")
	private String isCode;
	
	@Column(name = "code_id")
	private String code_id;
	
	@Column(name = "tableType")
	private String tableType;
	
	public TableMetadata() {
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getIsUnit() {
		return isUnit;
	}

	public void setIsUnit(String isUnit) {
		this.isUnit = isUnit;
	}

	public String getIsCode() {
		return isCode;
	}

	public void setIsCode(String isCode) {
		this.isCode = isCode;
	}

	public String getCode_id() {
		return code_id;
	}

	public void setCode_id(String code_id) {
		this.code_id = code_id;
	}

	public String getTableType() {
		return tableType;
	}

	public void setTableType(String tableType) {
		this.tableType = tableType;
	}

}
