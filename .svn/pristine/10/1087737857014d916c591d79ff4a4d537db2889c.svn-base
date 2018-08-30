package com.sx.base.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.sx.base.GenericDao;
import com.sx.entity.SysRoleModule;;

@Repository
public interface SysRoleModuleDao extends GenericDao<SysRoleModule, Long>{
	
	List<SysRoleModule> find(Integer roleID, boolean lazy);
	
	void save(String roleID,String modules,String moduldsNo);
	
}
