package com.sx.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sx.base.DataPage;
import com.sx.base.GenericManagerImpl;
import com.sx.base.dao.SysLogDao;
import com.sx.entity.SysLog;
import com.sx.service.SysLogService;

/**
 * copyright (c) by 锐宇博图
 * @author：苗双飞
 * E-mail: miaoshuangfei
 * @date：2014-03-27
 */
@Service
public class SysLogServiceImpl extends GenericManagerImpl<SysLog, Long> implements SysLogService{
	@Autowired
	private SysLogDao sysLogDao;

	@Override
	public List<SysLog> findAll() {
		// TODO Auto-generated method stub
		return sysLogDao.getAll();
	}

	@Override
	public void saveSysLog(SysLog sysLog) {
		// TODO Auto-generated method stub
		sysLogDao.saveSysLog(sysLog);
	}

	@Override
	public void delete(String ids) {
		// TODO Auto-generated method stub
		sysLogDao.delete(ids);
	}
	
	@Override
	public void batchDelete(String operate,String beginTime,String endTime) {
		// TODO Auto-generated method stub
		sysLogDao.batchDelete(operate,beginTime,endTime);
	}

	@Override
	@Transactional
	public DataPage<SysLog> queryDataPage(String operate,String beginTime,String endTime,String userName, Integer pageNo,
			Integer pageSize) {
		// TODO Auto-generated method stub
		return sysLogDao.queryPage(operate,beginTime,endTime,userName, pageNo, pageSize);
	}
}
