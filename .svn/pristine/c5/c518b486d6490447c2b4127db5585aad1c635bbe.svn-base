package com.sx.base.dao;


import java.util.List;

import com.sx.base.GenericDao;
import com.sx.entity.ReportNode;


/**
 * copyright (c) by sx
 * @author：苗双飞
 * @date：2014-03-27
 */
public interface ReportNodeDao extends GenericDao<ReportNode, Integer>{
	//添加
	void add(ReportNode report);
	//修改
	void edit(ReportNode report);
	//查询
	ReportNode get(Integer id);
	//删除 
	void delete(String ids);
	//查询全部
	List<ReportNode> findAll();
	//查询节点
	List<ReportNode> queryReportNode(Integer reportid,Integer pid);
}
