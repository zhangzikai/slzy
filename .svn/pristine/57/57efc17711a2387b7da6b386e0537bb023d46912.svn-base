package com.sx.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sx.base.GenericManagerImpl;
import com.sx.base.dao.TableMetadataDao;
import com.sx.entity.TableMetadata;
import com.sx.service.TableMetadataService;

/**
 * copyright (c) by 思行
 * @author：cwj
 * E-mail: cwj
 * @date：2016-07-23
 */
@Service
public class TableMetadataServiceImpl extends GenericManagerImpl<TableMetadata, Integer> implements TableMetadataService{
	@Autowired
	private TableMetadataDao tableMetadataDao;

	@Override
	public List<TableMetadata> queryList(String tableType) {
		// TODO Auto-generated method stub
		return tableMetadataDao.queryList(tableType);
	}

}
