package com.sx.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sx.base.GenericManagerImpl;
import com.sx.base.dao.SysRoleModuleDao;
import com.sx.entity.SysRoleModule;
import com.sx.service.SysRoleModuleService;

/**
 * copyright (c) by
 */
@Service
public class SysRoleModuleServiceImpl extends GenericManagerImpl<SysRoleModule, Integer> implements SysRoleModuleService{
	
	@Autowired
	private SysRoleModuleDao sysRoleModuleDao;
	
	@Override
	public List<SysRoleModule> find(Integer roleID, boolean lazy) {
		// TODO Auto-generated method stub
		return sysRoleModuleDao.find(roleID, lazy);
	}

	@Override
	public void save(String roleID, String modules,String modulesNo) {
		// TODO Auto-generated method stub
		sysRoleModuleDao.save(roleID, modules,modulesNo);
	}
	
}
