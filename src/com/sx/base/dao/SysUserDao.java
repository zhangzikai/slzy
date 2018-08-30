package com.sx.base.dao;


import com.sx.base.DataPage;
import com.sx.base.GenericDao;
import com.sx.entity.SysUser;


/**
 * copyright (c) by 锐宇博图
 * @author：苗双飞
 * @date：2014-03-27
 */
public interface SysUserDao extends GenericDao<SysUser, Integer>{
	void saveUser(SysUser sysUser);
	void editUser(SysUser sysUser);
	SysUser check(String userName,String passWord);
	boolean exists(String userName,String passWord);
	SysUser get(String userName,String passWord);
	void delete(String ids);
	DataPage<SysUser> getUserDataPage(String field,String keyword,Integer pageNo,Integer pageSize); 
}
