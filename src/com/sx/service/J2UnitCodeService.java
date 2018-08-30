package com.sx.service;

import java.util.List;

import com.sx.entity.J2UnitCode;

public interface J2UnitCodeService {
	//查询
	List<J2UnitCode> queryList(String codeIndex);
	List<J2UnitCode> findAll();
	String findName(String code);
	List<J2UnitCode> queryByCode(String code,boolean isHas);
	List<J2UnitCode> queryByCodeByWhere(String where);
	List<J2UnitCode> queryByCodeIndex(String codeIndex);
	List<J2UnitCode> queryAllList();
}
