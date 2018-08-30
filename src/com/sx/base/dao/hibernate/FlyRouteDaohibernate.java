package com.sx.base.dao.hibernate;


import java.util.List;

import org.springframework.stereotype.Repository;
import com.sx.base.GenericDaoHibernate;
import com.sx.base.dao.FlyRouteDao;
import com.sx.entity.FlyRoute;

/**
 * copyright (c) by sx
 * @author：miaoshuangfei
 * @date：2014-03-27
 */

@Repository
public class FlyRouteDaohibernate extends GenericDaoHibernate<FlyRoute, Integer> implements FlyRouteDao{

	public FlyRouteDaohibernate() {
		super(FlyRoute.class);
	}
	
	@Override
	public FlyRoute getFlyRoute(Integer id){
		FlyRoute flyLine = getHibernateTemplate().get(FlyRoute.class, id);
	    return flyLine;
	}
	
	@Override
	public void deleteFlyRoute(String ids) {
		// TODO Auto-generated method stub
		String hql="delete from FlyRoute where id in("+ids+")";
		this.execute(hql);
	}
	@Override
	public void saveFlyRoute(FlyRoute flyRoute) {
		// TODO Auto-generated method stub
		getHibernateTemplate().save(flyRoute);
	}

	@Override
	public List<FlyRoute> findAll() {
		// TODO Auto-generated method stub
		return getHibernateTemplate().find("from FlyRoute where 1=1 order by id desc");
	}
}
