package com.sx.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sx.base.GenericManagerImpl;
import com.sx.base.dao.ReportDao;
import com.sx.entity.Report;
import com.sx.service.ReportService;

/**
 * copyright (c) by sx
 * @author：苗双飞
 * E-mail: miaoshuangfei
 * @date：2014-03-27
 */
@Service
public class ReportServiceImpl extends GenericManagerImpl<Report, Integer> implements ReportService{
	@Autowired
	private ReportDao reportDao;

	@Override
	@Transactional
	public void deleteReport(String ids) {
		// TODO Auto-generated method stub
		reportDao.delete(ids);
	}

	@Override
	@Transactional
	public Report getReport(Integer id) {
		// TODO Auto-generated method stub
		return reportDao.get(id);
	}

	@Override
	@Transactional
	public void addReport(Report report) {
		// TODO Auto-generated method stub
		reportDao.add(report);
	}

	@Override
	@Transactional
	public void editReport(Report report) {
		// TODO Auto-generated method stub
		reportDao.edit(report);
	}

	@Override
	@Transactional
	public List<Report> queryAll() {
		// TODO Auto-generated method stub
		return reportDao.findAll();
	}

}
