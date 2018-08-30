package com.sx.service;

import java.util.List;

import com.sx.base.DataPage;
import com.sx.entity.SysRole;

public interface SysRoleService {

	void add(SysRole sysRole);

	DataPage<SysRole> findPage(String roleName,Integer pageNo,Integer pageSize);
	
	SysRole find(Integer id, boolean lazy);
	
	void delete(String ids);
	
	void update(SysRole sysRole);

	List<SysRole> findAll();
}