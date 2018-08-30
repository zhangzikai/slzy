package com.sx.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="sys_role_module")
public class SysRoleModule {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false, precision = 64, scale = 0)
	private int id;
	
	@Column(name = "sys_role_id")
	private int sys_role_id;
	
	public int getSys_role_id() {
		return sys_role_id;
	}

	public void setSys_role_id(int sys_role_id) {
		this.sys_role_id = sys_role_id;
	}

	@Column(name = "sys_module_id")
	private int sys_module_id;
	
	public int getSys_module_id() {
		return sys_module_id;
	}

	public void setSys_module_id(int sys_module_id) {
		this.sys_module_id = sys_module_id;
	}

	public SysRoleModule() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}


}
