package com.sx.base.dao.hibernate;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.sx.base.GenericDaoHibernate;
import com.sx.base.dao.SysDicDao;
import com.sx.entity.SysDic;
/**
 * copyright (c) by 锐宇博图
 * @author：miaoshuangfei
 * @date：2014-03-27
 */

@Repository
public class SysDicDaohibernate extends GenericDaoHibernate<SysDic, Long> implements SysDicDao{

	public SysDicDaohibernate() {
		super(SysDic.class);
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<SysDic> queryList(Integer parentId) {
		// TODO Auto-generated method stub
		String sql="from SysDic where parentId="+parentId;
		return getHibernateTemplate().find(sql);
	}
	
}
