package com.sx.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sx.base.DataPage;
import com.sx.base.GenericManagerImpl;
import com.sx.base.dao.LabelDao;
import com.sx.entity.Label;
import com.sx.service.LabelService;

/**
 * copyright (c) by 锐宇博图
 * @author：苗双飞
 * E-mail: miaoshuangfei
 * @date：2014-03-27
 */
@Service
public class LabelServiceImpl extends GenericManagerImpl<Label, Integer> implements LabelService{
	@Autowired
	private LabelDao labelDao;

	@Override
	@Transactional
	public void deleteLabel(String ids) {
		// TODO Auto-generated method stub
		labelDao.delete(ids);
	}

	@Override
	@Transactional
	public Label getLabel(Integer id) {
		// TODO Auto-generated method stub
		return labelDao.get(id);
	}

	@Override
	@Transactional
	public void addLabel(Label label) {
		// TODO Auto-generated method stub
		labelDao.add(label);
	}

	@Override
	@Transactional
	public DataPage<Label> queryDataPage(String keyword,String category,Integer pageNo,
			Integer pageSize) {
		// TODO Auto-generated method stub
		return labelDao.getDataPage(keyword,category,pageNo, pageSize);
	}

	@Override
	@Transactional
	public void editLabel(Label label) {
		// TODO Auto-generated method stub
		labelDao.edit(label);
	}

	@Override
	@Transactional
	public List<Label> queryAll() {
		// TODO Auto-generated method stub
		return labelDao.findAll();
	}

	@Override
	public List<Label> queryByType(String category) {
		// TODO Auto-generated method stub
		return labelDao.findByType(category);
	}
}
