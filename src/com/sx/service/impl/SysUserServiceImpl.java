package com.sx.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sx.base.DataPage;
import com.sx.base.GenericManagerImpl;
import com.sx.base.dao.SysUserDao;
import com.sx.entity.SysUser;
import com.sx.service.SysUserService;

/**
 * copyright (c) by 锐宇博图
 * @author：苗双飞
 * E-mail: miaoshuangfei
 * @date：2014-03-27
 */
@Service
public class SysUserServiceImpl extends GenericManagerImpl<SysUser, Long> implements SysUserService{
	@Autowired
	private SysUserDao sysUserDao;

	@Override
	@Transactional
	public boolean exists(SysUser user) {
		// TODO Auto-generated method stub
		return sysUserDao.exists(user.getUsername(),user.getPassword()); 
	}

	@Override
	@Transactional
	public void saveUser(SysUser user) {
		// TODO Auto-generated method stub
		sysUserDao.saveUser(user);
	}

	@Override
	@Transactional
	public void updateUser(SysUser user) {
		// TODO Auto-generated method stub
		sysUserDao.editUser(user);
	}

	@Override
	@Transactional
	public List<SysUser> findAll() {
		// TODO Auto-generated method stub
		return sysUserDao.getAll();
	}

	@Override
	@Transactional
	public void delete(String ids) {
		// TODO Auto-generated method stub
		sysUserDao.delete(ids);
	}

	@Override
	@Transactional
	public SysUser get(String userName,String passWord) {
		// TODO Auto-generated method stub
		return sysUserDao.get(userName,passWord);
	}

	@Override
	@Transactional
	public DataPage<SysUser> queryUserDataPage(String field,String keyword,Integer pageNo,
			Integer pageSize) {
		// TODO Auto-generated method stub
		return sysUserDao.getUserDataPage(field,keyword,pageNo, pageSize);
	}

	@Override
	public SysUser get(Integer id) {
		// TODO Auto-generated method stub
		return sysUserDao.get(id);
	}
}
