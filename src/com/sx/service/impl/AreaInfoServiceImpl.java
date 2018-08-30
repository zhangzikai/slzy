package com.sx.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sx.base.GenericManagerImpl;
import com.sx.base.dao.AreaInfoDao;
import com.sx.entity.AreaInfo;
import com.sx.service.AreaInfoService;

/**
 * copyright (c) by 思行
 * @author：cwj
 * E-mail: cwj
 * @date：2016-06-11
 */
@Service
public class AreaInfoServiceImpl extends GenericManagerImpl<AreaInfo, Integer> implements AreaInfoService{
	@Autowired
	private AreaInfoDao areaInfoDao;

	@Override
	public AreaInfo find(String areaCode) {
		// TODO Auto-generated method stub
		return areaInfoDao.find(areaCode);
	}

}
