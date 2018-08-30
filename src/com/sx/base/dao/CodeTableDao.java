package com.sx.base.dao;

import java.util.List;

import com.sx.base.GenericDao;
import com.sx.entity.CodeTable;

/**
 * copyright (c) by 思行
 * @author：苗双飞
 * @date：2016-05-27
 */
public interface CodeTableDao extends GenericDao<CodeTable, Integer>{
	List<CodeTable> queryList(String codeId,String codeName);
	String findName(String codeName,String psbCode);
	String findValue(String dilei,String lmsyq,String sllb,String lz,String sz);
	List findBySql(String sql);
}
