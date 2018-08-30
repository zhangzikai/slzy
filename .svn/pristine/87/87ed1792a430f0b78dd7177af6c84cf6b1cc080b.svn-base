package com.sx.base.dao.hibernate;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.sx.base.GenericDaoHibernate;
import com.sx.base.dao.SceneDao;
import com.sx.entity.Scene;

/**
 * copyright (c) by sx
 * @author：miaoshuangfei
 * @date：2014-03-27
 */

@Repository
public class SceneDaohibernate extends GenericDaoHibernate<Scene, Integer> implements SceneDao{

	public SceneDaohibernate() {
		super(Scene.class);
	}
	
	@Override
	public Scene get(Integer id){
		Scene scene = getHibernateTemplate().get(Scene.class, id);
	    return scene;
	}

	@Override
	public void add(Scene scene) {
		// TODO Auto-generated method stub
		getHibernateTemplate().save(scene);
	}

	@Override
	public void edit(Scene scene) {
		// TODO Auto-generated method stub
		getHibernateTemplate().update(scene);
	}

	@Override
	public void delete(String ids) {
		// TODO Auto-generated method stub
		String hql="delete from Scene where id in("+ids+")";
		this.execute(hql);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Scene> findAll() {
		// TODO Auto-generated method stub
		return getHibernateTemplate().find("from Scene where 1=1 order by id desc");
	}
}
