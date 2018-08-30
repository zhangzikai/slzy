package com.sx.base.dao.hibernate;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.sx.base.GenericDaoHibernate;
import com.sx.base.dao.ReportNodeDao;
import com.sx.entity.ReportNode;

/**
 * copyright (c) by 锐宇博图
 * @author：miaoshuangfei
 * @date：2014-03-27
 */

@Repository
public class ReportNodeDaohibernate extends GenericDaoHibernate<ReportNode, Integer> implements ReportNodeDao{

	public ReportNodeDaohibernate() {
		super(ReportNode.class);
	}
	
	@Override
	public ReportNode get(Integer id){
		ReportNode reportNode = getHibernateTemplate().get(ReportNode.class, id);
	    return reportNode;
	}

	@Override
	public void add(ReportNode reportNode) {
		// TODO Auto-generated method stub
		getHibernateTemplate().save(reportNode);
	}

	@Override
	public void edit(ReportNode reportNode) {
		// TODO Auto-generated method stub
		getHibernateTemplate().update(reportNode);
	}

	@Override
	public void delete(String ids) {
		// TODO Auto-generated method stub
		String hql="delete from report_node where id in("+ids+")";
		this.execute(hql);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ReportNode> findAll() {
		// TODO Auto-generated method stub
		return getHibernateTemplate().find("from ReportNode where 1=1 order by id desc");
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ReportNode> queryReportNode(Integer reportid,Integer pid){
		// TODO Auto-generated method stub
		String hql="from ReportNode where 1=1";
		if(reportid!=null){
			hql+=" and reportid='"+reportid+"'";
		}
		if(pid!=null){
			hql+=" and pid='"+pid+"'";
		}
		hql+=" order by orderby,id asc";
		return getHibernateTemplate().find(hql);
	}
}
