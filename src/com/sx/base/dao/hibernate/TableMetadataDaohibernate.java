package com.sx.base.dao.hibernate;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.sx.base.GenericDaoHibernate;
import com.sx.base.dao.TableMetadataDao;
import com.sx.entity.TableMetadata;

/**
 * copyright (c) by 思行
 * @author：cwj
 * @date：2016-07-23
 */

@Repository
public class TableMetadataDaohibernate extends GenericDaoHibernate<TableMetadata, Integer> implements TableMetadataDao{

	public TableMetadataDaohibernate() {
		super(TableMetadata.class);
	}

	@Override
	public List<TableMetadata> queryList(String tableType) {
		// TODO Auto-generated method stub
		String hql="from TableMetadata where tableType='" + tableType + "'";
		return getHibernateTemplate().find(hql);
	}
}
