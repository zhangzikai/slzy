package com.sx.base.dao.hibernate;

import org.springframework.stereotype.Repository;

import com.sx.base.DataPage;
import com.sx.base.GenericDaoHibernate;
import com.sx.base.dao.SysLogDao;
import com.sx.entity.SysLog;
/**
 * copyright (c) by 锐宇博图
 * @author：miaoshuangfei
 * @date：2014-03-27
 */

@Repository
public class SysLogDaohibernate extends GenericDaoHibernate<SysLog, Long> implements SysLogDao{

	public SysLogDaohibernate() {
		super(SysLog.class);
	}
	@Override
	public void saveSysLog(SysLog sysLog) {
		// TODO Auto-generated method stub
		getHibernateTemplate().save(sysLog);
	}
	@Override
	public void delete(String ids) {
		// TODO Auto-generated method stub
		String hql="delete from syslog where id in("+ids+")";
		this.execute(hql);
	}
	@Override
	public void batchDelete(String operate,String beginTime,String endTime) {
		// TODO Auto-generated method stub
		String hql="delete from syslog where 1=1";
		if(operate!=null&&!operate.isEmpty()){
			hql+=" and logInfo like '%"+operate+"%'";
		}
		if(beginTime!=null && !beginTime.isEmpty()){
			hql += " and logTime>='"+beginTime+"'";
		}
		if(endTime!=null && !endTime.isEmpty()){
			hql += " and logTime<='"+endTime+"'";
		}
		this.execute(hql);
	}
	@Override
	public DataPage<SysLog> queryPage(String operate,String beginTime,String endTime,String userName, Integer pageNo,Integer pageSize) {
		// TODO Auto-generated method stub
		String hql = "from SysLog where 1=1";
		if(operate!=null&&operate!=""){
			hql+=" and logInfo like '%"+operate+"%'";
		}
		if(beginTime!=null && !beginTime.isEmpty()){
			hql += " and logTime>='"+beginTime+"'";
		}
		if(endTime!=null && !endTime.isEmpty()){
			hql += " and logTime<='"+endTime+"'";
		}
		if(userName!=null&&userName!=""){
			hql+=" and userName='"+userName+"'";
		}
		hql+=" order by logTime desc";
		return this.pageQuery(hql, pageNo, pageSize);
	}
	
}
