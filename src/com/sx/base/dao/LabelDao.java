package com.sx.base.dao;


import java.util.List;

import com.sx.base.DataPage;
import com.sx.base.GenericDao;
import com.sx.entity.Label;


/**
 * copyright (c) by 锐宇博图
 * @author：苗双飞
 * @date：2014-03-27
 */
public interface LabelDao extends GenericDao<Label, Integer>{
	//添加
	void add(Label label);
	//修改
	void edit(Label label);
	//查询
	Label get(Integer id);
	//删除 
	void delete(String ids);
	//分页查询
	DataPage<Label> getDataPage(String keyword,String category,Integer pageNo,Integer pageSize);
	//查询全部
	List<Label> findAll();
	//查询标签
	List<Label> findByType(String category);
}
