package com.sx.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sx.base.GenericManagerImpl;
import com.sx.base.dao.ThemePicDao;
import com.sx.entity.ThemePic;
import com.sx.service.ThemePicService;

/**
 * copyright (c) by 锐宇博图
 * 
 * @author：苗双飞 E-mail: miaoshuangfei
 * @date：2014-03-27
 */
@Service
public class ThemePicServiceImpl extends GenericManagerImpl<ThemePic, Integer>
		implements ThemePicService {
	@Autowired
	private ThemePicDao themePicDao;

	@Override
	@Transactional
	public void deletePic(String ids) {
		// TODO Auto-generated method stub
		themePicDao.delete(ids);
	}

	@Override
	@Transactional
	public void savePic(ThemePic themePic) {
		// TODO Auto-generated method stub
		themePicDao.save(themePic);
	}

	@Override
	@Transactional
	public List<ThemePic> queryByClassify(String classify) {
		// TODO Auto-generated method stub
		return themePicDao.findByClassify(classify);
	}

	@Override
	@Transactional
	public void editPic(ThemePic themePic) {
		// TODO Auto-generated method stub
		themePicDao.save(themePic);
	}

	@Override
	@Transactional
	public ThemePic getPic(Integer id) {
		// TODO Auto-generated method stub
		return themePicDao.get(id);
	}
}
