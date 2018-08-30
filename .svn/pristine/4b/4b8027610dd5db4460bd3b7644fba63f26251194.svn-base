package com.sx.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sx.base.GenericManagerImpl;
import com.sx.base.dao.J2UnitCodeDao;
import com.sx.base.dao.XBFieldDao;
import com.sx.entity.J2UnitCode;
import com.sx.entity.XBField;
import com.sx.service.J2UnitCodeService;
import com.sx.service.XBFieldService;

/**
 * copyright (c) by 思行
 * @author：苗双飞
 * E-mail: miaoshuangfei
 * @date：2016-05-28
 */
@Service
public class XBFieldServiceImpl extends GenericManagerImpl<XBField, Integer> implements XBFieldService{
	@Autowired
	private XBFieldDao xbFieldCodeDao;

	@Override
	@Transactional
	public List<XBField> queryList(String isEnable) {
		// TODO Auto-generated method stub
		return xbFieldCodeDao.queryList(isEnable);
	}

	@Override
	@Transactional
	public List<XBField> queryListByWhere(String where) {
		// TODO Auto-generated method stub
		return xbFieldCodeDao.queryListByWhere(where);
	}

	@Override
	public List<XBField> queryAllList() {
		// TODO Auto-generated method stub
		return xbFieldCodeDao.queryAllList();
	}
	
	@Override
	public XBField get(Integer id) {
		// TODO Auto-generated method stub
		return xbFieldCodeDao.get(id);
	}

	@Override
	@Transactional
	public void saveXBField(XBField xbField) {
		// TODO Auto-generated method stub
		xbFieldCodeDao.saveXBField(xbField);
	}

	@Override
	@Transactional
	public XBField find(String fieldName) {
		// TODO Auto-generated method stub
		return xbFieldCodeDao.find(fieldName);
	}



	@Override
	@Transactional
	public void deleteXBField(Integer id) {
		// TODO Auto-generated method stub
		xbFieldCodeDao.deleteXBField(id);
	}

	@Override
	@Transactional
	public void editXBField(XBField xbField) {
		// TODO Auto-generated method stub
		xbFieldCodeDao.editXBField(xbField);
	}


	

}
