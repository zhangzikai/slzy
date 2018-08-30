package com.sx.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="sysmodule")
public class SysModule {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false, precision = 64, scale = 0)
	private int id;
	
	@Column(name = "scn")
	private String scn;
	
	@Column(name = "moduleName")
	private String moduleName;
	
	@Column(name = "leaf")
	private boolean leaf;
	
	@Column(name = "pid")
	private int pid;
	
	@SuppressWarnings("unused")
	private String text;

	public SysModule() {
		super();
	}

	public SysModule(int id, String scn, String moduleName, boolean leaf, int pid) {
		super();
		this.id = id;
		this.scn = scn;
		this.moduleName = moduleName;
		this.leaf = leaf;
		this.pid = pid;
	}

	public SysModule(String scn, String moduleName, boolean leaf, int pid) {
		super();
		this.scn = scn;
		this.moduleName = moduleName;
		this.leaf = leaf;
		this.pid = pid;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

	public String getScn() {
		return scn;
	}

	public void setScn(String scn) {
		this.scn = scn;
	}

	public boolean isLeaf() {
		return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public String getText() {
		return this.moduleName;
	}

	public void setText(String text) {
		this.moduleName = text;
	}

}
