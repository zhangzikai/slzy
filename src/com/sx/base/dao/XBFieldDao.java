package com.sx.base.dao;

import java.util.List;

import com.sx.base.GenericDao;
import com.sx.entity.XBField;

/**
 * copyright (c) by 思行
 * @author：苗双飞
 * @date：2016-05-27
 */
public interface XBFieldDao extends GenericDao<XBField, Integer>{
	List<XBField> queryList(String isEnable);
	List<XBField> queryListByWhere(String where);
	List<XBField> queryAllList();
	void saveXBField(XBField xbField);
	XBField get(Integer id);
	XBField find(String fieldName);
	
	void editXBField(XBField field);
	void deleteXBField(Integer id);
}
