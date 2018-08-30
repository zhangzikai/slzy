package com.sx.base.dao;

import java.util.List;

import com.sx.base.GenericDao;
import com.sx.entity.TableMetadata;

/**
 * copyright (c) by 思行
 * @author：崔
 * @date：2016-07-23
 */
public interface TableMetadataDao extends GenericDao<TableMetadata, Integer>{
	List<TableMetadata> queryList(String tableType);
}
