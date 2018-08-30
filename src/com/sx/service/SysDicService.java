package com.sx.service;

import java.util.List;

import com.sx.entity.SysDic;

public interface SysDicService {
	//查询
	List<SysDic> queryList(Integer parentId);
}
