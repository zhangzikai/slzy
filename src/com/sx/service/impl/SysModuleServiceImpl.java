package com.sx.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sx.base.GenericManagerImpl;
import com.sx.base.dao.SysModuleDao;
import com.sx.entity.SysModule;
import com.sx.service.SysModuleService;

/**
 * copyright (c) by 锐宇博图
 * @author：苗双飞
 * E-mail: miaoshuangfei
 * @date：2014-03-27
 */
@Service
public class SysModuleServiceImpl extends GenericManagerImpl<SysModule, Integer> implements SysModuleService{
	@Autowired
	private SysModuleDao sysModuleDao;

	@Override
	@Transactional
	public List<SysModule> listTree(String pid) {
		// TODO Auto-generated method stub
		return sysModuleDao.listTree(pid);
	}

	@Override
	public SysModule find(Integer id, boolean lazy) {
		// TODO Auto-generated method stub
		return sysModuleDao.find(id, lazy);
	}

	@Override
	public void delete(String id) {
		// TODO Auto-generated method stub
		sysModuleDao.delete(id);
	}

	@Override
	public void update(SysModule sysModule) {
		// TODO Auto-generated method stub
		sysModuleDao.save(sysModule);
	}

	@Override
	public SysModule add(SysModule sysModule) {
		// TODO Auto-generated method stub
		return sysModuleDao.save(sysModule);
	}

	@Override
	@Transactional
	public List listAll() {
		// TODO Auto-generated method stub
		return showTreeList(sysModuleDao.listAll());
	}
	
	@SuppressWarnings({ "unchecked"})
	private List showTreeList(List<SysModule> list){
		List result = new ArrayList();
		for (int i = 0; i < list.size(); i++) {
			SysModule m = list.get(i);
			HashMap map = new HashMap();
			map.put("id", m.getId());
			map.put("text", m.getText());
			map.put("leaf", m.isLeaf());
			map.put("scn", m.getScn());
			map.put("pid", m.getPid());
			map.put("checked", false);
			if(!m.isLeaf()){
				List childs = this.listTree(String.valueOf(m.getId()));
				map.put("children", showTreeList(childs));
				map.put("expanded", true);
			}
			result.add(map);
		}
		return result;
	}

	@Override
	public SysModule findByScn(String scn) {
		// TODO Auto-generated method stub
		return sysModuleDao.findByScn(scn);
	}

	@Override
	public List<SysModule> findByIds(String ids) {
		// TODO Auto-generated method stub
		return sysModuleDao.findByIds(ids);
	}
	
}
