package com.sx.service;

import java.util.List;

import com.sx.entity.SysRoleModule;

public interface SysRoleModuleService {

	List<SysRoleModule> find(Integer roleID, boolean lazy);
	
	void save(String roleID,String modules,String modulesNo);
}