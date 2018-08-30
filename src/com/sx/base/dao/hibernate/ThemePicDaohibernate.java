package com.sx.base.dao.hibernate;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.sx.base.GenericDaoHibernate;
import com.sx.base.dao.ThemePicDao;
import com.sx.entity.ThemePic;

/**
 * copyright (c) by 锐宇博图
 * @author：miaoshuangfei
 * @date：2014-03-27
 */

@Repository
public class ThemePicDaohibernate extends GenericDaoHibernate<ThemePic, Integer> implements ThemePicDao{

	public ThemePicDaohibernate() {
		super(ThemePic.class);
	}

	@Override
	public void delete(String ids) {
		// TODO Auto-generated method stub
		String hql="delete from ThemePic where id in("+ids+")";
		this.execute(hql);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ThemePic> findByClassify(String classify){
		// TODO Auto-generated method stub
		String sql="from ThemePic where 1=1";
		if(classify!=null&&!classify.equals("0")){
			sql+=" and classify.id="+classify;
		}
		sql+=" order by id desc";
		return getHibernateTemplate().find(sql);
	}
}
