package com.sx.base.dao.hibernate;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.sx.base.DataPage;
import com.sx.base.GenericDaoHibernate;
import com.sx.base.dao.LabelDao;
import com.sx.entity.Label;

/**
 * copyright (c) by 锐宇博图
 * @author：miaoshuangfei
 * @date：2014-03-27
 */

@Repository
public class LabelDaohibernate extends GenericDaoHibernate<Label, Integer> implements LabelDao{

	public LabelDaohibernate() {
		super(Label.class);
	}
	
	@Override
	public Label get(Integer id){
		Label label = getHibernateTemplate().get(Label.class, id);
	    return label;
	}
	
	@Override
	public DataPage<Label> getDataPage(String keyword,String category,Integer pageNo,
			Integer pageSize) {
		// TODO Auto-generated method stub
		String hql = "from Label where labelname like '%"+keyword+"%'";
		if(category!=null&&category!=""&&!category.equals("请选择...")){
			hql+=" and category='"+category+"'";
		}
		hql+=" order by  id desc";
		return this.pageQuery(hql, pageNo, pageSize);
	}

	@Override
	public void add(Label label) {
		// TODO Auto-generated method stub
		getHibernateTemplate().save(label);
	}

	@Override
	public void edit(Label label) {
		// TODO Auto-generated method stub
		getHibernateTemplate().update(label);
	}

	@Override
	public void delete(String ids) {
		// TODO Auto-generated method stub
		String hql="delete from Label where id in("+ids+")";
		this.execute(hql);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Label> findAll() {
		// TODO Auto-generated method stub
		return getHibernateTemplate().find("from Label where 1=1 order by id desc");
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Label> findByType(String category) {
		// TODO Auto-generated method stub
		String hql="from Label where 1=1";
		if(category!=null&&category!=""){
			hql+=" and category='"+category+"'";
		}
		hql+=" order by id desc";
		return getHibernateTemplate().find(hql);
	}
}
