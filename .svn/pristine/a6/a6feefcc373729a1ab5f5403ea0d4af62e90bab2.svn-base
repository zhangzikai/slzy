package com.sx.base.dao.hibernate;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.sx.base.DataPage;
import com.sx.base.GenericDaoHibernate;
import com.sx.base.dao.SysRoleModuleDao;
import com.sx.entity.SysRoleModule;
/**
 * copyright (c) by 
 */

@Repository
public class SysRoleModuleDaohibernate extends GenericDaoHibernate<SysRoleModule, Long> implements SysRoleModuleDao{

	public SysRoleModuleDaohibernate() {
		super(SysRoleModule.class);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SysRoleModule> find(Integer roleID, boolean lazy) {
		// TODO Auto-generated method stub
		String sql="from SysRoleModule m where m.sys_role_id = "+roleID;
		return getHibernateTemplate().find(sql);
	}

	@Override
	public void save(String roleID,String modules,String modulesNo) {
		// TODO Auto-generated method stub
		if(modulesNo.length()>0){
			String sql="delete from sys_role_module where sys_role_id = "+roleID+" and sys_module_id in("+modulesNo+")";
			this.execute(sql);
		}
		
		String sqlAdd="";
		if(modules.length()<1)return;
		String[] moduleIds = modules.split(",");
		for(int i=0;i<moduleIds.length;i++){
			String temp ="insert into sys_role_module(sys_role_id,sys_module_id) values("+roleID+","+moduleIds[i]+");";
			this.execute(temp);
		}
	}
	
}
