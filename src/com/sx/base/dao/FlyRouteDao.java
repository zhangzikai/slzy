package com.sx.base.dao;


import java.util.List;

import com.sx.base.GenericDao;
import com.sx.entity.FlyRoute;


/**
 * copyright (c) by sx
 * @author：苗双飞
 * @date：2014-03-27
 */
public interface FlyRouteDao extends GenericDao<FlyRoute, Integer>{
	void saveFlyRoute(FlyRoute flyRoute);
	FlyRoute getFlyRoute(Integer id);
	void deleteFlyRoute(String ids);
	List<FlyRoute> findAll();
}
