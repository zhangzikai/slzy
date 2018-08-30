package com.sx.base.dao.hibernate;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.sx.base.GenericDaoHibernate;
import com.sx.base.dao.Table1Dao;
import com.sx.entity.CodeTable;
import com.sx.entity.SysUser;
import com.sx.entity.Table1;

@Repository
public class Table1Daohibernate extends GenericDaoHibernate<Table1, Integer> implements Table1Dao{ 
	
	public Table1Daohibernate() {
		super(Table1.class);
	}

	@Override
	public Table1 find(String name) {
		String hql="from Table1 where A='"+name+"' and B='' and C=''";
		
		List<Table1> list=getHibernateTemplate().find(hql);
		if(list.size()>0){
			return list.get(0);
		}else{
			return null;
		}
	}
}
