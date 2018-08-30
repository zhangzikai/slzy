package com.sx.service;

import java.util.List;

import com.sx.base.DataPage;
import com.sx.entity.Label;

public interface LabelService {
	//保存
	void addLabel(Label label);
	//查询
	DataPage<Label> queryDataPage(String keyword,String category,Integer pageNo,Integer pageSize);
	//通过id查询
	Label getLabel(Integer id);
	//删除
	void deleteLabel(String ids);
	//修改
	void editLabel(Label label);
	//查询全部
	List<Label> queryAll();
	//查询标签
	List<Label> queryByType(String category);
}
