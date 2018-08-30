package com.sx.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sx.base.GenericManagerImpl;
import com.sx.base.dao.SysDicDao;
import com.sx.entity.SysDic;
import com.sx.service.SysDicService;

/**
 * copyright (c) by 锐宇博图
 * @author：苗双飞
 * E-mail: miaoshuangfei
 * @date：2014-03-27
 */
@Service
public class SysDicServiceImpl extends GenericManagerImpl<SysDic, Long> implements SysDicService{
	@Autowired
	private SysDicDao sysDicDao;

	

	@Override
	@Transactional
	public List<SysDic> queryList(Integer parentId) {
		// TODO Auto-generated method stub
		return sysDicDao.queryList(parentId);
	}
	
}
