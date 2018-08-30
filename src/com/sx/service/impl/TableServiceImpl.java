package com.sx.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sx.base.GenericDao;
import com.sx.base.GenericManagerImpl;
import com.sx.base.dao.CodeTableDao;
import com.sx.base.dao.LabelDao;
import com.sx.base.dao.Table1Dao;
import com.sx.entity.Label;
import com.sx.entity.Table1;
import com.sx.service.TableService;

/**
 * copyright (c) by 锐宇博图
 * @author：苗双飞
 * E-mail: miaoshuangfei
 * @date：2014-03-27
 */
@Service
public class TableServiceImpl extends GenericManagerImpl<Label, Integer> implements TableService{
	@Autowired
	private CodeTableDao codeTableDao;
	
	@Autowired
	private Table1Dao table1Dal;

	@Override
	public Table1 find(String name) {
		// TODO Auto-generated method stub
		return table1Dal.find(name);
	}

	@Override
	public List findList(String tableName, String fields, String tjdw) {
		// TODO Auto-generated method stub
		//select t2.`name`,t3.PSB_VALUE from j2210423tjnew01_2011 t1 LEFT JOIN  j2_unitcode t2 ON t1.c_tjdw=t2.CODE LEFT JOIN code_table t3 ON t1.c_tdsyq=t3.PSB_CODE where t1.c_tjdw='210423' and t3.CODE_ID='C_TDSY'
		return codeTableDao.findBySql("select "+fields+" from "+tableName+" where c_tjdw ='"+tjdw+"'");
	}

}
