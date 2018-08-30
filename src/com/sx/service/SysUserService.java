package com.sx.service;

import java.util.List;

import com.sx.base.DataPage;
import com.sx.entity.SysUser;

public interface SysUserService {
	boolean exists(SysUser sysUser);
	//通过userName查询
	SysUser get(String userName,String passWord);
	//保存
	void saveUser(SysUser sysUser);
	//查询
	List<SysUser> findAll();
	//查询
	DataPage<SysUser> queryUserDataPage(String field,String keyword,Integer pageNo,Integer pageSize);
	//通过id查询
	SysUser get(Integer id);
	//删除
	void delete(String ids);
	//修改
	void updateUser(SysUser sysUser);
}
