package com.sx.base.dao.hibernate;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.sx.base.GenericDaoHibernate;
import com.sx.base.dao.ThemeMapDao;
import com.sx.entity.Scene;
import com.sx.entity.ThemeMap;

/**
 * copyright (c) by 思行
 * @author：miaoshuangfei
 * @date：2016-05-27
 */

@Repository
public class ThemeMapDaohibernate extends GenericDaoHibernate<ThemeMap, Integer> implements ThemeMapDao{

	public ThemeMapDaohibernate() {
		super(ThemeMap.class);
	}
	
	@Override
	public ThemeMap get(Integer id){
		ThemeMap themeMap = getHibernateTemplate().get(ThemeMap.class, id);
	    return themeMap;
	}

	@Override
	public List<ThemeMap> queryList() {
		// TODO Auto-generated method stub
		String hql="from ThemeMap where 1=1 ";
		return getHibernateTemplate().find(hql);
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		String hql="delete from ThemeMap where id in("+id+")";
		this.execute(hql);
		
	}

	@Override
	public void add(ThemeMap themeMap) {
		// TODO Auto-generated method stub
		 getHibernateTemplate().save(themeMap);
	}

	@Override
	public void edit(ThemeMap themeMap) {
		// TODO Auto-generated method stub
		getHibernateTemplate().update(themeMap);
	}
}
