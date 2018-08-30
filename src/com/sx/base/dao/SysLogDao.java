package com.sx.base.dao;



import com.sx.base.DataPage;
import com.sx.base.GenericDao;
import com.sx.entity.SysLog;


/**
 * copyright (c) by 锐宇博图
 * @author：苗双飞
 * @date：2014-03-27
 */
public interface SysLogDao extends GenericDao<SysLog, Long>{
	void saveSysLog(SysLog sysLog);
	void delete(String ids);
	void batchDelete(String operate,String beginTime,String endTime);
	DataPage<SysLog> queryPage(String operate,String beginTime,String endTime,String userName,Integer pageNo,Integer pageSize); 
}
