package com.sx.base.dao.hibernate;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.sx.base.GenericDaoHibernate;
import com.sx.base.dao.J2UnitCodeDao;
import com.sx.entity.J2UnitCode;

/**
 * copyright (c) by 思行
 * @author：miaoshuangfei
 * @date：2016-05-27
 */

@Repository
public class J2UnitCodeDaohibernate extends GenericDaoHibernate<J2UnitCode, Integer> implements J2UnitCodeDao{

	public J2UnitCodeDaohibernate() {
		super(J2UnitCode.class);
	}

	@Override
	public List<J2UnitCode> queryList(String codeIndex) {
		// TODO Auto-generated method stub
		String hql="from J2UnitCode where 1=1 ";
		if(codeIndex!=null && !codeIndex.isEmpty()&&!codeIndex.equals("0")){
			hql += " and codeIndex like '"+codeIndex+"____' order by codeIndex";
		}else{
			hql += " and codeLevel='1' order by codeIndex";
		}
		return getHibernateTemplate().find(hql);
	}
	
	
	@Override
	public List<J2UnitCode> queryByCode(String code,boolean isHas) {
		// TODO Auto-generated method stub
		String hql="from J2UnitCode where ";
		if(isHas){
			hql+=" code = '"+code+"'";
		}else{
			hql+=" code like '"+code+"___'";
		}
		hql+=" order by code";
		return getHibernateTemplate().find(hql);
	}
	
	@Override
	public String findName(String code) {
		// TODO Auto-generated method stub
		String hql="from J2UnitCode where code='"+code+"'";
		List<J2UnitCode> list=getHibernateTemplate().find(hql);
		if(list.size()>0){
			return list.get(0).getName();
		}else{
			return "";
		}
	}

	@Override
	public List<J2UnitCode> queryByCodeByWhere(String where) {
		// TODO Auto-generated method stub
		String hql="from J2UnitCode where ";
			hql+=" "+where +" ";
					//" code like '"+code+"___'";
		hql+=" order by code";
		return getHibernateTemplate().find(hql);
	}

	@Override
	public List<J2UnitCode> queryByCodeIndex(String codeIndex) {
		// TODO Auto-generated method stub
		return getHibernateTemplate().find("from J2UnitCode a where a.codeIndex like '"+codeIndex+"____'");
	}

	@Override
	public List<J2UnitCode> queryAllList() {
		String hql="from J2UnitCode where 1=1 ";
		List<J2UnitCode> listAll = getHibernateTemplate().find(hql);
		
		return null;
	}
}
