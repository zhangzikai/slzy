package com.sx.base.dao;

import java.util.List;

import com.sx.base.GenericDao;
import com.sx.entity.ThemeMap;

/**
 * copyright (c) by 思行
 * @author：苗双飞
 * @date：2016-05-27
 */
public interface ThemeMapDao extends GenericDao<ThemeMap, Integer>{
	List<ThemeMap> queryList();
	void delete(Integer id);
	void add(ThemeMap themeMap);
	ThemeMap get(Integer id);
	void edit(ThemeMap themeMap);
	
}
