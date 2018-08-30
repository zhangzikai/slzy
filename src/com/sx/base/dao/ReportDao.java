package com.sx.base.dao;


import java.util.List;

import com.sx.base.GenericDao;
import com.sx.entity.Report;


/**
 * copyright (c) by sx
 * @author：苗双飞
 * @date：2014-03-27
 */
public interface ReportDao extends GenericDao<Report, Integer>{
	//添加
	void add(Report report);
	//修改
	void edit(Report report);
	//查询
	Report get(Integer id);
	//删除 
	void delete(String ids);
	//查询全部
	List<Report> findAll();
}
