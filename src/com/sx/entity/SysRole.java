package com.sx.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

@Entity
@Table(name="sysrole")
public class SysRole {
	
	/**
	 * 主键
	 */
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false, precision = 64, scale = 0)
	private Integer id;
	/**
	 * 角色名称
	 */
	@Column(name = "roleName")
	private String roleName;
	/**
	 * 备注
	 */
	@Column(name = "remark")
	private String remark;
	
	@ManyToMany(targetEntity=com.sx.entity.SysModule.class,
            cascade={CascadeType.ALL},
            fetch=FetchType.EAGER
        )
    @JoinTable(name="sys_role_module",joinColumns={@JoinColumn(name="sys_role_id")},inverseJoinColumns={@JoinColumn(name="sys_module_id")})
	@NotFound(action=NotFoundAction.IGNORE)
	private Set<SysModule> modules;


	public SysRole() {
		super();
	}

	public SysRole(String roleName, String remark) {
		super();
		this.roleName = roleName;
		this.remark = remark;
	}

	public SysRole(Integer id, String roleName, String remark) {
		super();
		this.id = id;
		this.roleName = roleName;
		this.remark = remark;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getRemark() {
		return remark;
	}

	public Set<SysModule> getModules() {
		return modules;
	}

	public void setModules(Set<SysModule> modules) {
		this.modules = modules;
	}
}
