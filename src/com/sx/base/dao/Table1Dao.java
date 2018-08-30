package com.sx.base.dao;

import com.sx.base.GenericDao;
import com.sx.entity.Table1;;

public interface Table1Dao extends GenericDao<Table1, Integer>{
	Table1 find(String name);
}
