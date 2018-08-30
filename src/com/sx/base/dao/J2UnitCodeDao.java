package com.sx.base.dao;

import java.util.List;

import com.sx.base.GenericDao;
import com.sx.entity.J2UnitCode;

/**
 * copyright (c) by 思行
 * @author：苗双飞
 * @date：2016-05-27
 */
public interface J2UnitCodeDao extends GenericDao<J2UnitCode, Integer>{
	List<J2UnitCode> queryList(String codeIndex);
	String findName(String code);
	List<J2UnitCode> queryByCode(String code,boolean isHas);
	List<J2UnitCode> queryByCodeByWhere(String where);
	List<J2UnitCode> queryByCodeIndex(String codeIndex);
	List<J2UnitCode> queryAllList();
}
