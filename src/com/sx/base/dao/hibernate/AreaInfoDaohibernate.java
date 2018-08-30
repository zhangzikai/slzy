package com.sx.base.dao.hibernate;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.sx.base.GenericDaoHibernate;
import com.sx.base.dao.AreaInfoDao;
import com.sx.entity.AreaInfo;

/**
 * copyright (c) by 思行
 * @author：cwj
 * @date：2016-06-11
 */

@Repository
public class AreaInfoDaohibernate extends GenericDaoHibernate<AreaInfo, Integer> implements AreaInfoDao{

	public AreaInfoDaohibernate() {
		super(AreaInfo.class);
	}

	@Override
	public AreaInfo find(String areaCode) {
		// TODO Auto-generated method stub
		String hql="from AreaInfo where 1=1 ";
		if(areaCode!=null && !areaCode.isEmpty()){
			hql += " and areaCode='"+areaCode+"'";
		}
		List<AreaInfo> list=getHibernateTemplate().find(hql);
		if(list.size()>0){
			return list.get(0);
		}else{
			return null;
		}
	}
}
