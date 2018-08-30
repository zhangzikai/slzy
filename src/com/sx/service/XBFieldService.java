package com.sx.service;

import java.util.List;

import com.sx.entity.XBField;

public interface XBFieldService {
	//查询
	List<XBField> queryList(String isEnable);
	List<XBField> queryListByWhere(String where);
	List<XBField> queryAllList();
	//保存
	void saveXBField(XBField xbField);
	XBField get(Integer id);
	XBField find(String fieldName);
	
	void editXBField(XBField xbField);
	void deleteXBField(Integer id);
}
