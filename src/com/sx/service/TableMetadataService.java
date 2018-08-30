package com.sx.service;

import java.util.List;

import com.sx.entity.TableMetadata;

public interface TableMetadataService {
	//查询
	List<TableMetadata> queryList(String tableType);
}
