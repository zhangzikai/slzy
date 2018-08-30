package com.sx.service;

import java.util.List;

import com.sx.entity.SysModule;

public interface SysModuleService {

	List<SysModule> listTree(String pid);
	
	List<SysModule> findByIds(String ids);
	
	SysModule find(Integer id, boolean lazy);
	
	SysModule findByScn(String scn);
	
	void delete(String id);
	
	void update(SysModule sysModule);

	SysModule add(SysModule sysModule);

	List listAll();
}