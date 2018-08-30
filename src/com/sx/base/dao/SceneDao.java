package com.sx.base.dao;


import java.util.List;

import com.sx.base.GenericDao;
import com.sx.entity.Scene;


/**
 * copyright (c) by sx
 * @author：苗双飞
 * @date：2014-03-27
 */
public interface SceneDao extends GenericDao<Scene, Integer>{
	//添加
	void add(Scene scene);
	//修改
	void edit(Scene scene);
	//查询
	Scene get(Integer id);
	//删除 
	void delete(String ids);
	//查询全部
	List<Scene> findAll();
}
