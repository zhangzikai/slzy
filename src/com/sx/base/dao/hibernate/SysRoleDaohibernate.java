package com.sx.base.dao.hibernate;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.sx.base.DataPage;
import com.sx.base.GenericDaoHibernate;
import com.sx.base.dao.SysRoleDao;
import com.sx.entity.SysRole;
/**
 * copyright (c) by 锐宇博图
 * @author：miaoshuangfei
 * @date：2014-03-27
 */

@Repository
public class SysRoleDaohibernate extends GenericDaoHibernate<SysRole, Long> implements SysRoleDao{

	public SysRoleDaohibernate() {
		super(SysRole.class);
	}
	
	@Override
	public void delete(String ids) {
		// TODO Auto-generated method stub
		String hql="delete from SysRole where id in("+ids+")";
		this.execute(hql);
	}

	@Override
	public DataPage<SysRole> findPage(String roleName,Integer pageNo,Integer pageSize) {
		// TODO Auto-generated method stub
		String hql = "from SysRole where 1=1";
		if(roleName!=null && !roleName.isEmpty()){
			hql += " and roleName like '%"+roleName+"%'";
		}
		return this.pageQuery(hql, pageNo, pageSize);
	}

	@Override
	public SysRole find(Integer id, boolean lazy) {
		// TODO Auto-generated method stub
		if(lazy){
			return getHibernateTemplate().load(SysRole.class, id);
		}else{
			return getHibernateTemplate().get(SysRole.class, id);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SysRole> findAll() {
		// TODO Auto-generated method stub
		String sql="from SysRole";
		return getHibernateTemplate().find(sql);
	}
	
}
