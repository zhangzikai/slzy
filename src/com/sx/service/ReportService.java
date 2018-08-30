package com.sx.service;

import java.util.List;

import com.sx.entity.Report;

public interface ReportService {
	//保存
	void addReport(Report report);
	//删除
	void deleteReport(String ids);
	//修改
	void editReport(Report report);
	//查询全部
	List<Report> queryAll();
	//查询
	Report getReport(Integer id);
}
