package com.sx.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sx.base.GenericManagerImpl;
import com.sx.base.dao.ThemeMapDao;
import com.sx.entity.ThemeMap;
import com.sx.service.ThemeMapService;

/**
 * copyright (c) by 思行
 * @author：苗双飞
 * E-mail: miaoshuangfei
 * @date：2016-05-28
 */
@Service
public class ThemeMapServiceImpl extends GenericManagerImpl<ThemeMap, Integer> implements ThemeMapService{
	@Autowired
	private ThemeMapDao themeMapDao;

	@Override
	@Transactional
	public List<ThemeMap> queryList() {
		// TODO Auto-generated method stub
		return themeMapDao.queryList();
	}

	@Override
	@Transactional
	public void saveThemeMap(ThemeMap themeMap) {
		// TODO Auto-generated method stub
		themeMapDao.add(themeMap);
		
	}

	@Override
	@Transactional
	public void editThemeMap(ThemeMap themeMap) {
		// TODO Auto-generated method stub
		themeMapDao.edit(themeMap);
	}

	@Override
	@Transactional
	public void deleteThemeMap(Integer id) {
		// TODO Auto-generated method stub
		themeMapDao.delete(id);
		
	}

	@Override
	@Transactional
	public ThemeMap getThemeMap(Integer id) {
		// TODO Auto-generated method stub
		return themeMapDao.get(id);
	}

}
