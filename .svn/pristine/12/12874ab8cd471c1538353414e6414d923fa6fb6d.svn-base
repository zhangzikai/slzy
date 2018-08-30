package com.sx.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sx.base.GenericManagerImpl;
import com.sx.base.dao.SceneDao;
import com.sx.entity.Scene;
import com.sx.service.SceneService;

/**
 * copyright (c) by sx
 * @author：苗双飞
 * E-mail: miaoshuangfei
 * @date：2014-03-27
 */
@Service
public class SceneServiceImpl extends GenericManagerImpl<Scene, Integer> implements SceneService{
	@Autowired
	private SceneDao sceneDao;

	@Override
	@Transactional
	public void deleteScene(String ids) {
		// TODO Auto-generated method stub
		sceneDao.delete(ids);
	}

	@Override
	@Transactional
	public Scene getScene(Integer id) {
		// TODO Auto-generated method stub
		return sceneDao.get(id);
	}

	@Override
	@Transactional
	public void addScene(Scene scene) {
		// TODO Auto-generated method stub
		sceneDao.add(scene);
	}

	@Override
	@Transactional
	public void editScene(Scene scene) {
		// TODO Auto-generated method stub
		sceneDao.edit(scene);
	}

	@Override
	@Transactional
	public List<Scene> queryAll() {
		// TODO Auto-generated method stub
		return sceneDao.findAll();
	}
}
