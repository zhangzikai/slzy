package com.sx.base.dao.hibernate;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.sx.base.GenericDaoHibernate;
import com.sx.base.dao.ReportDao;
import com.sx.entity.Report;

/**
 * copyright (c) by sx
 * @author：miaoshuangfei
 * @date：2014-03-27
 */

@Repository
public class ReportDaohibernate extends GenericDaoHibernate<Report, Integer> implements ReportDao{

	public ReportDaohibernate() {
		super(Report.class);
	}
	
	@Override
	public Report get(Integer id){
		Report report = getHibernateTemplate().get(Report.class, id);
	    return report;
	}
	
	@Override
	public void add(Report report) {
		// TODO Auto-generated method stub
		getHibernateTemplate().save(report);
	}

	@Override
	public void edit(Report report) {
		// TODO Auto-generated method stub
		getHibernateTemplate().update(report);
	}

	@Override
	public void delete(String ids) {
		// TODO Auto-generated method stub
		String hqlNode="delete from report_node where reportid in("+ids+")";
		this.execute(hqlNode);
		String hql="delete from Report where id in("+ids+")";
		this.execute(hql);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Report> findAll() {
		// TODO Auto-generated method stub
		return getHibernateTemplate().find("from Report where 1=1 order by id desc");
	}
}
