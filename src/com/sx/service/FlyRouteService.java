package com.sx.service;

import java.util.List;

import com.sx.entity.FlyRoute;

public interface FlyRouteService {
	//保存
	void saveFlyRoute(FlyRoute flyRoute);
	//通过id查询
	FlyRoute getFlyRoute(Integer id);
	//删除
	void deleteFlyRoute(String ids);
	//查询全部
	List<FlyRoute> queryAll();
}
