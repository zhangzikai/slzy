package com.sx.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * XBField entity. @author miaoshuangfei
 */

@Entity
@Table(name = "xbfield")
public class XBField implements java.io.Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	// Fields
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private Integer id;
	//字段名
	@Column(name = "fieldName")
	private String fieldName;
	//字段别名
	@Column(name = "fieldAlias")
	private String fieldAlias;
	//是否为字典值
	@Column(name = "isCode")
	private String isCode;
	//字典名称
	@Column(name = "codeName")
	private String codeName;
	//是否可用(显示：1，不显示：0)
	@Column(name = "isEnable")
	private Integer isEnable;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getFieldName() {
		return fieldName;
	}
	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}
	public String getFieldAlias() {
		return fieldAlias;
	}
	public void setFieldAlias(String fieldAlias) {
		this.fieldAlias = fieldAlias;
	}
	public String getIsCode() {
		return isCode;
	}
	public void setIsCode(String isCode) {
		this.isCode = isCode;
	}
	public String getCodeName() {
		return codeName;
	}
	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}
	public Integer getIsEnable() {
		return isEnable;
	}
	public void setIsEnable(Integer isEnable) {
		this.isEnable = isEnable;
	}
	
}