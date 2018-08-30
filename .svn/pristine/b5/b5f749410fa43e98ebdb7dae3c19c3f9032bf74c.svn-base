package com.sx.base.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.sx.base.DataPage;
import com.sx.base.GenericDao;
import com.sx.entity.SysRole;

@Repository
public interface SysRoleDao extends GenericDao<SysRole, Long>{

	DataPage<SysRole> findPage(String roleName,Integer pageNo,Integer pageSize);
	
	SysRole find(Integer id, boolean lazy);
	
	void delete(String ids);

	List<SysRole> findAll();
}
