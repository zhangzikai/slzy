package com.sx.base.dao.hibernate;

import java.sql.SQLException;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.stereotype.Repository;

import com.sx.base.GenericDaoHibernate;
import com.sx.base.dao.CodeTableDao;
import com.sx.entity.CodeTable;

/**
 * copyright (c) by 思行
 * @author：miaoshuangfei
 * @date：2016-05-27
 */

@Repository
public class CodeTableDaohibernate extends GenericDaoHibernate<CodeTable, Integer> implements CodeTableDao{

	public CodeTableDaohibernate() {
		super(CodeTable.class);
	}

	@Override
	public List<CodeTable> queryList(String codeId,String codeName) {
		// TODO Auto-generated method stub
		String hql="from CodeTable where 1=1 ";
		if(codeId!=null && !codeId.isEmpty()){
			hql += " and codeId='"+codeId+"'";
		}
		if(codeName!=null && !codeName.isEmpty()){
			hql += " and codeName='"+codeName+"'";
		}
		return getHibernateTemplate().find(hql);
	}

	@Override
	public String findName(String codeName, String psbCode) {
		// TODO Auto-generated method stub
		String hql="from CodeTable where codeName='"+codeName+"' and psbCode='"+psbCode+"'";
		List<CodeTable> list=getHibernateTemplate().find(hql);
		if(list.size()>0){
			return list.get(0).getPsbValue();
		}else{
			return "";
		}
	}

	@Override
	public String findValue(String dilei, String lmsyq, String sllb, String lz,
			String sz) {
		// TODO Auto-generated method stub

		String result = "";
		
		if(dilei==""|| dilei=="null")dilei="9999,9999";
		String hql1="from CodeTable where codeName='地类' and psbCode in("+dilei+")";
		List<CodeTable> listDilei=getHibernateTemplate().find(hql1);
		String result1="地类:";
		for(int i=0;i<listDilei.size();i++){
			result1+=listDilei.get(i).getPsbValue()+",";
		}
		
		if(lmsyq==""|| lmsyq=="null")lmsyq="9999,9999";
		String hql2="from CodeTable where codeName='林木所有权' and psbCode in("+lmsyq+")";
		List<CodeTable> listLmsyq=getHibernateTemplate().find(hql2);
		String result2="林木所有权:";
		for(int i=0;i<listLmsyq.size();i++){
			result2+=listLmsyq.get(i).getPsbValue()+",";
		}

		if(sllb==""|| sllb=="null")sllb="9999,9999";
		String hql3="from CodeTable where codeName='森林类别' and psbCode in("+sllb+")";
		List<CodeTable> listSllb=getHibernateTemplate().find(hql3);
		String result3="森林类别:";
		for(int i=0;i<listSllb.size();i++){
			result3+=listSllb.get(i).getPsbValue()+",";
		}

		if(lz==""|| lz=="null")lz="9999,9999";
		String hql4="from CodeTable where codeName='林种' and psbCode in("+lz+")";
		List<CodeTable> listLz=getHibernateTemplate().find(hql4);
		String result4="林种:";
		for(int i=0;i<listLz.size();i++){
			result4+=listLz.get(i).getPsbValue()+",";
		}

		if(sz==""|| sz=="null")sz="9999,9999";
		String hql5="from CodeTable where codeName='优势树种' and psbCode in("+sz+")";
		List<CodeTable> listSz=getHibernateTemplate().find(hql5);
		String result5="优势树种:";
		for(int i=0;i<listSz.size();i++){
			result5+=listSz.get(i).getPsbValue()+",";
		}
		
		result = result1+";"+result2+";"+result3+";"+result4+";"+result5;
		
		return result;
	}

	@Override
	public List findBySql(final String sql) {
		// TODO Auto-generated method stub
		 List list = (List) this.getHibernateTemplate().execute(
			     new HibernateCallback() {
			      public Object doInHibernate(Session session)
			        throws SQLException, HibernateException {
			       SQLQuery query = session.createSQLQuery(sql);
			       List children = query.list();
			       return children;
			      }
			     });
		return list;
	}
}
