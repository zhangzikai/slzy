package com.sx.service;

import java.util.List;

import com.sx.base.DataPage;
import com.sx.entity.SysLog;

public interface SysLogService {
	//保存
	void saveSysLog(SysLog sysLog);
	//查询
	List<SysLog> findAll();
	//删除
	void delete(String ids);
	//批量删除
	void batchDelete(String operate,String beginTime,String endTime);
	//分页查询
	DataPage<SysLog> queryDataPage(String operate,String beginTime,String endTime,String userName, Integer pageNo,Integer pageSize);
}
