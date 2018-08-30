package com.sx.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sx.base.GenericManagerImpl;
import com.sx.base.dao.FlyRouteDao;
import com.sx.entity.FlyRoute;
import com.sx.service.FlyRouteService;

/**
 * copyright (c) by sx
 * @author：苗双飞
 * E-mail: miaoshuangfei
 * @date：2014-03-27
 */
@Service
public class FlyRouteServiceImpl extends GenericManagerImpl<FlyRoute, Integer> implements FlyRouteService{
	@Autowired
	private FlyRouteDao flyRouteDao;

	@Override
	@Transactional
	public void deleteFlyRoute(String ids) {
		// TODO Auto-generated method stub
		flyRouteDao.deleteFlyRoute(ids);
	}

	@Override
	@Transactional
	public FlyRoute getFlyRoute(Integer id) {
		// TODO Auto-generated method stub
		return flyRouteDao.get(id);
	}

	@Override
	@Transactional
	public void saveFlyRoute(FlyRoute flyLine) {
		// TODO Auto-generated method stub
		flyRouteDao.save(flyLine);
	}

	@Override
	public List<FlyRoute> queryAll() {
		// TODO Auto-generated method stub
		return flyRouteDao.findAll();
	}
}
