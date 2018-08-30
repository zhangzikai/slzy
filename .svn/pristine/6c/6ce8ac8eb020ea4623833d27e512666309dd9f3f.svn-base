package com.sx.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

/**
 * Users entity. @author MyEclipse Persistence Tools
 */

@Entity
@Table(name = "SYSUSER")
public class SysUser implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	// Fields
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "userid", unique = true, nullable = false)
	private Integer userid;
	
	@Column(name = "username")
	private String username;
	
	@Column(name = "usertype")
	private String usertype;
	
	@Column(name = "realname")
	private String realname;
	
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "sex")
	private String sex;
	
	@Column(name = "telephone")
	private String telephone;
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "department")
	private String department;
	
	@Column(name = "email")
	private String email;

	@Column(name = "remark")
	private String remark;
	
	@Column(name = "roleid")
	private Integer roleid;
	
//	@ManyToOne(cascade = CascadeType.REFRESH,fetch = FetchType.EAGER, optional = true)    
//    @JoinColumn(name="roleid")
//	@NotFound(action=NotFoundAction.IGNORE)
//	private SysRole role;
	// Constructors

	/** default constructor */
	public SysUser() {
	}
	// Property accessors

	public Integer getUserid() {
		return this.userid;
	}

	public void setUserid(Integer userid) {
		this.userid = userid;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRealname() {
		return this.realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSex() {
		return this.sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getUsertype() {
		return usertype;
	}

	public void setUsertype(String usertype) {
		this.usertype = usertype;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRemark() {
		return remark;
	}
	
	public Integer getRoleid(){
		return roleid;
	}
	
	public void setRoleid(Integer roleid){
		this.roleid = roleid;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

//	public SysRole getRole() {
//		return role;
//	}
//
//	public void setRole(SysRole role) {
//		this.role = role;
//	}
}