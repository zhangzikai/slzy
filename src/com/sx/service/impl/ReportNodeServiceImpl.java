package com.sx.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sx.base.GenericManagerImpl;
import com.sx.base.dao.ReportNodeDao;
import com.sx.entity.ReportNode;
import com.sx.service.ReportNodeService;

/**
 * copyright (c) by sx
 * @author：苗双飞
 * E-mail: miaoshuangfei
 * @date：2014-03-27
 */
@Service
public class ReportNodeServiceImpl extends GenericManagerImpl<ReportNode, Integer> implements ReportNodeService{
	@Autowired
	private ReportNodeDao reportNodeDao;

	@Override
	@Transactional
	public void deleteReportNode(String ids) {
		// TODO Auto-generated method stub
		reportNodeDao.delete(ids);
	}

	@Override
	@Transactional
	public void addReportNode(ReportNode reportNode) {
		// TODO Auto-generated method stub
		reportNodeDao.add(reportNode);
	}

	@Override
	@Transactional
	public void editReportNode(ReportNode reportNode) {
		// TODO Auto-generated method stub
		reportNodeDao.edit(reportNode);
	}

	@Override
	@Transactional
	public List<ReportNode>  queryReportNode(Integer reportid,Integer pid){
		// TODO Auto-generated method stub
		return reportNodeDao.queryReportNode(reportid,pid);
	}
    

	@Override
	public ReportNode getReportNode(Integer id) {
		// TODO Auto-generated method stub
		return reportNodeDao.get(id);
	}

	@Override
	public List<ReportNode> findAll() {
		// TODO Auto-generated method stub
		return reportNodeDao.findAll();
	}

}
