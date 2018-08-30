package com.sx.base.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.sx.base.GenericDao;
import com.sx.entity.SysModule;

@Repository
public interface SysModuleDao extends GenericDao<SysModule, Long>{

	List<SysModule> listTree(String pid);
	
	List<SysModule> findByIds(String ids);

	SysModule find(Integer id, boolean lazy);

	SysModule findByScn(String scn);
	
	void delete(String id);
	
	List<SysModule> listAll();
}
