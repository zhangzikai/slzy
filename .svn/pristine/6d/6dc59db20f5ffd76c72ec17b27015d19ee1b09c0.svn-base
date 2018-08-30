package com.sx.base.dao.hibernate;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.sx.base.GenericDaoHibernate;
import com.sx.base.dao.SysModuleDao;
import com.sx.entity.SysModule;
/**
 * copyright (c) by 锐宇博图
 * @author：miaoshuangfei
 * @date：2014-03-27
 */

@Repository
public class SysModuleDaohibernate extends GenericDaoHibernate<SysModule, Long> implements SysModuleDao{

	public SysModuleDaohibernate() {
		super(SysModule.class);
	}
	
	@SuppressWarnings("rawtypes")
	@Override
	public void delete(String id) {
		// TODO Auto-generated method stub
		
		String hql0 = "select id from SysModule where pid="+id+" or id="+id;
		List lit =getHibernateTemplate().find(hql0);
		if(lit!=null && lit.size()>0 ){
			String idstr = "";
			for (int i = 0; i < lit.size(); i++) {
				idstr += ','+lit.get(i).toString();
			}
			String ids = idstr.substring(1);
			String hql1 = "delete from SysModule where id in ("+ids+")";
			this.execute(hql1);
		}
		
		//删除pid=id的孩子节点
		String hql2 = "delete from SysModule where pid="+id+" or id="+id;
		this.execute(hql2);
	}

	@Override
	public SysModule find(Integer id, boolean lazy) {
		// TODO Auto-generated method stub
		if(lazy){
			return getHibernateTemplate().load(SysModule.class, id);
		}else{
			return getHibernateTemplate().get(SysModule.class, id);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SysModule> listAll() {
		// TODO Auto-generated method stub
		String sql="from SysModule m where m.pid = 0 order by m.id";
		return getHibernateTemplate().find(sql);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SysModule> listTree(String pid) {
		// TODO Auto-generated method stub
		String hql = "from SysModule t where t.pid="+pid+" order by t.id";
		return getHibernateTemplate().find(hql);
	}

	@Override
	public SysModule findByScn(String scn) {
		// TODO Auto-generated method stub
		@SuppressWarnings("unchecked")
		List<SysModule> list=getHibernateTemplate().find("from SysModule where scn='"+scn+"'");
		if(list.size()>0){
			return list.get(0);
		}else{
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SysModule> findByIds(String ids) {
		// TODO Auto-generated method stub
		String hql = "from SysModule t where t.id in("+ids+")";
		return getHibernateTemplate().find(hql);
	}

}
