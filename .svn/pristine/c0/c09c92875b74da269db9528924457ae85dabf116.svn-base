package com.sx.base.dao.hibernate;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.sx.base.GenericDaoHibernate;
import com.sx.base.dao.XBFieldDao;
import com.sx.entity.XBField;

/**
 * copyright (c) by 思行
 * @author：miaoshuangfei
 * @date：2016-05-27
 */

@Repository
public class XBFieldDaohibernate extends GenericDaoHibernate<XBField, Integer> implements XBFieldDao{

	public XBFieldDaohibernate() {
		super(XBField.class);
	}

	@Override
	public List<XBField> queryList(String isEnable) {
		// TODO Auto-generated method stub
		String hql="from XBField where 1=1 ";
		if(isEnable!=null && !isEnable.isEmpty()){
			hql += " and isEnable="+isEnable;
		}
		return getHibernateTemplate().find(hql);
	}

	@Override
	public List<XBField> queryListByWhere(String where) {
		// TODO Auto-generated method stub
		String hql="from XBField where 1=1 ";
		if(where!=null && !where.isEmpty()){
			hql += " and "+where;
		}
		return getHibernateTemplate().find(hql);
	}

	@Override
	public List<XBField> queryAllList() {
		// TODO Auto-generated method stub
		String hql="from XBField where 1=1 ";
		return getHibernateTemplate().find(hql);
	}
	
	@Override
	public void saveXBField(XBField xbField) {
		// TODO Auto-generated method stub
		 getHibernateTemplate().save(xbField);
	}
	
	public XBField get(Long id){
		XBField xbField = getHibernateTemplate().get(XBField.class, id);
	    return xbField;
	}

	@Override
	public XBField find(String fieldName) {
		// TODO Auto-generated method stub
		String hql="from XBField where 1=1 ";
		if(fieldName!=null && !fieldName.isEmpty()){
			hql += " and fieldName='"+fieldName+"'";
		}
		List<XBField> list=getHibernateTemplate().find(hql);
		if(list.size()>0){
			return list.get(0);
		}else{
			return null;
		}
	}


	@Override
	public void deleteXBField(Integer id) {
		// TODO Auto-generated method stub
		String hql="delete from XBField where id in("+id+")";
		this.execute(hql);
	}

	@Override
	public void editXBField(XBField field) {
		// TODO Auto-generated method stub
		getHibernateTemplate().update(field);
	}

}
