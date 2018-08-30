package com.sx.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sx.base.GenericManagerImpl;
import com.sx.base.dao.CodeTableDao;
import com.sx.entity.CodeTable;
import com.sx.service.CodeTableService;

/**
 * copyright (c) by 思行
 * @author：苗双飞
 * E-mail: miaoshuangfei
 * @date：2016-05-28
 */
@Service
public class CodeTableServiceImpl extends GenericManagerImpl<CodeTable, Integer> implements CodeTableService{
	@Autowired
	private CodeTableDao codeTableDao;

	@Override
	public List<CodeTable> queryList(String codeId,String codeName) {
		// TODO Auto-generated method stub
		return codeTableDao.queryList(codeId,codeName);
	}

	@Override
	public String findName(String codeName,String psbCode) {
		// TODO Auto-generated method stub
		return codeTableDao.findName(codeName,psbCode);
	}

	@Override
	public String findValue(String dilei, String lmsyq, String sllb, String lz,
			String sz) {
		// TODO Auto-generated method stub
		return codeTableDao.findValue(dilei, lmsyq, sllb, lz, sz);
	}

}
