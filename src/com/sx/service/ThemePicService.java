package com.sx.service;

import java.util.List;

import com.sx.entity.ThemePic;

public interface ThemePicService {
	//保存
	void savePic(ThemePic themePic);
	//删除
	void deletePic(String ids);
	//修改
	void editPic(ThemePic themePic);
	//获取
	ThemePic getPic(Integer id);
	//查询全部
	List<ThemePic> queryByClassify(String classify);
}
