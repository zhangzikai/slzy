package com.sx.base.dao;



import java.util.List;

import com.sx.base.GenericDao;
import com.sx.entity.SysDic;

/**
 * copyright (c) by 锐宇博图
 * @author：苗双飞
 * @date：2014-03-27
 */
public interface SysDicDao extends GenericDao<SysDic, Long>{
	List<SysDic> queryList(Integer parentId);
}
