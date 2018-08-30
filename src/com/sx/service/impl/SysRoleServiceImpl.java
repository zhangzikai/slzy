package com.sx.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sx.base.DataPage;
import com.sx.base.GenericManagerImpl;
import com.sx.base.dao.SysRoleDao;
import com.sx.entity.SysRole;
import com.sx.service.SysRoleService;

/**
 * copyright (c) by 锐宇博图
 * @author：苗双飞
 * E-mail: miaoshuangfei
 * @date：2014-03-27
 */
@Service
public class SysRoleServiceImpl extends GenericManagerImpl<SysRole, Integer> implements SysRoleService{
	@Autowired
	private SysRoleDao sysRoleDao;

	@Override
	public void add(SysRole sysRole) {
		// TODO Auto-generated method stub
		sysRoleDao.save(sysRole);
	}

	@Override
	@Transactional
	public DataPage<SysRole> findPage(String roleName,Integer pageNo,Integer pageSize) {
		// TODO Auto-generated method stub
		return sysRoleDao.findPage(roleName, pageNo, pageSize);
	}

	@Override
	@Transactional
	public SysRole find(Integer id, boolean lazy) {
		// TODO Auto-generated method stub
		return sysRoleDao.find(id, lazy);
	}

	@Override
	public void delete(String ids) {
		// TODO Auto-generated method stub
		sysRoleDao.delete(ids);
	}

	@Override
	public void update(SysRole sysRole) {
		// TODO Auto-generated method stub
		sysRoleDao.save(sysRole);
	}

	@Override
	@Transactional
	public List<SysRole> findAll() {
		// TODO Auto-generated method stub
		return sysRoleDao.findAll();
	}
	
}
