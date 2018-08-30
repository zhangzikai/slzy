package com.sx.base.dao.hibernate;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.sx.base.DataPage;
import com.sx.base.GenericDaoHibernate;
import com.sx.base.dao.SysUserDao;
import com.sx.entity.SysUser;

/**
 * copyright (c) by 锐宇博图
 * @author：miaoshuangfei
 * @date：2014-03-27
 */

@Repository
public class SysUserDaohibernate extends GenericDaoHibernate<SysUser, Integer> implements SysUserDao{

	public SysUserDaohibernate() {
		super(SysUser.class);
	}
	public SysUser check(String userName,String passWord){
		// TODO Auto-generated method stub
		SysUser user=(SysUser) getHibernateTemplate().find("from SysUser where username='"+userName+"' and password='"+passWord+"'");
		return user;
	}
	public SysUser get(Long id){
		SysUser user = getHibernateTemplate().get(SysUser.class, id);
	    return user;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SysUser> getAll() {
		// TODO Auto-generated method stub
		return getHibernateTemplate().find("from SysUser");
	}

	@SuppressWarnings("unchecked")
	@Override
	public boolean exists(String userName,String passWord) {
		// TODO Auto-generated method stub
		List<SysUser> users=getHibernateTemplate().find("from SysUser where username='"+userName+"' and password='"+passWord+"'");
		if(users.size()>0){
			return true;
		}else{
			return false;
		}
	}

	@Override
	public void saveUser(SysUser sysUser) {
		// TODO Auto-generated method stub
		 getHibernateTemplate().save(sysUser);
	}
	@Override
	public List<SysUser> findByNamedQuery(String queryName,
			Map<String, Object> queryParams) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@SuppressWarnings("unchecked")
	public int checkUserExits(SysUser sysUser) {
		if(sysUser!=null&&sysUser.getUsername()!=null&&sysUser.getPassword()!=null){
			List<SysUser> sysUsers=getHibernateTemplate().find("from SysUser where username='"+sysUser.getUsername()+"' and password='"+sysUser.getPassword()+"'");
			if(sysUsers.size()>0){
				return 1;
			}else{
				return 0;
			}
		}else{
			return 0;
		}
	}

	@Override
	public void delete(String ids) {
		// TODO Auto-generated method stub
		String hql="delete from SysUser where userid in("+ids+")";
		this.execute(hql);
	}
	@SuppressWarnings("unchecked")
	@Override
	public SysUser get(String userName,String passWord) {
		// TODO Auto-generated method stub
		SysUser sysUser=null;
		List<SysUser> sysUsers;
		if(userName!=null){
			if(passWord!=null){
				sysUsers=getHibernateTemplate().find("from SysUser where username='"+userName+"' and password='"+passWord+"'");
			}else{
				sysUsers=getHibernateTemplate().find("from SysUser where username='"+userName+"'");
			}
			if(sysUsers.size()>0){
				sysUser=sysUsers.get(0);
			}
		}
		return sysUser;
	}
	@Override
	public DataPage<SysUser> getUserDataPage(String field,String keyword,Integer pageNo,
			Integer pageSize) {
		// TODO Auto-generated method stub
		String hql = "from SysUser where 1=1";
		if(field!=""){
			hql+=" and "+field+" like '%"+keyword+"%' order by  userid desc";
		}
		return this.pageQuery(hql, pageNo, pageSize);
	}
	@Override
	public void editUser(SysUser user) {
		// TODO Auto-generated method stub
		getHibernateTemplate().update(user);
	}
}
