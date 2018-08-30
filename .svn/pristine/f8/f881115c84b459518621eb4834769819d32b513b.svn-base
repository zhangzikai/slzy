package com.sx.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sx.base.GenericManagerImpl;
import com.sx.base.dao.J2UnitCodeDao;
import com.sx.entity.J2UnitCode;
import com.sx.service.J2UnitCodeService;

/**
 * copyright (c) by 思行
 * @author：苗双飞
 * E-mail: miaoshuangfei
 * @date：2016-05-28
 */
@Service
public class J2UnitCodeServiceImpl extends GenericManagerImpl<J2UnitCode, Integer> implements J2UnitCodeService{
	@Autowired
	private J2UnitCodeDao j2UnitCodeDao;

	@Override
	public List<J2UnitCode> queryList(String codeIndex) {
		// TODO Auto-generated method stub
		return j2UnitCodeDao.queryList(codeIndex);
	}

	@Override
	public List<J2UnitCode> findAll(){
		// TODO Auto-generated method stub
		return j2UnitCodeDao.getAll();
	}
	@Override
	public String findName(String code) {
		// TODO Auto-generated method stub
		return j2UnitCodeDao.findName(code);
	}

	@Override
	public List<J2UnitCode> queryByCode(String code,boolean isHas) {
		// TODO Auto-generated method stub
		return j2UnitCodeDao.queryByCode(code,isHas);
	}

	@Override
	public List<J2UnitCode> queryByCodeByWhere(String where) {
		// TODO Auto-generated method stub
		return j2UnitCodeDao.queryByCodeByWhere(where);
	}

	@Override
	public List<J2UnitCode> queryByCodeIndex(String codeIndex) {
		// TODO Auto-generated method stub
		return j2UnitCodeDao.queryByCodeIndex(codeIndex);
	}

	@Override
	public List<J2UnitCode> queryAllList() {
		return j2UnitCodeDao.queryAllList();
	}

}
