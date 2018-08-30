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
 * Users entity. @author MyEclipse Persistence Tools
 */

@Entity
@Table(name = "THEMEPIC")
public class ThemePic implements java.io.Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	// Fields
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false, precision = 64, scale = 0)
	private Integer id;
	//名称
	@Column(name = "picName")
	private String picName;
	//描述
	@Column(name = "picDesc")
	private String picDesc;
	//图片地址
	@Column(name = "picUrl")
	private String picUrl;
	//图片缩略图地址
	@Column(name = "picThubmUrl")
	private String picThubmUrl;
	//创建时间
	@Column(name = "createTime")
	private String createTime;
	//创建用户
	@ManyToOne
	@JoinColumn(name="createUser")
	private SysUser createUser;
	//分类
	@ManyToOne
	@JoinColumn(name="classify")
	private SysDic classify;
	// Constructors

	/** default constructor */
	public ThemePic() {
	}

	// Property accessors
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getPicName() {
		return picName;
	}

	public void setPicName(String picName) {
		this.picName = picName;
	}

	public String getPicDesc() {
		return picDesc;
	}

	public void setPicDesc(String picDesc) {
		this.picDesc = picDesc;
	}

	public String getPicUrl() {
		return picUrl;
	}

	public void setPicUrl(String picUrl) {
		this.picUrl = picUrl;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public SysUser getCreateUser() {
		return createUser;
	}

	public void setCreateUser(SysUser createUser) {
		this.createUser = createUser;
	}

	public SysDic getClassify() {
		return classify;
	}

	public void setClassify(SysDic classify) {
		this.classify = classify;
	}

	public String getPicThubmUrl() {
		return picThubmUrl;
	}

	public void setPicThubmUrl(String picThubmUrl) {
		this.picThubmUrl = picThubmUrl;
	}
	
}