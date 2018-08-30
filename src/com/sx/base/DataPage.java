/******************************************************************************
 * @Project 	ERSS
 * @Package 	com.sinosoft.util
 * @File  		DataPage.java
 * @Department 	解决方案部
 * Copyright(c) 中科软科技股份有限公司    2012  All Rights Reserved.
 * ****************************************************************************
 * 修改人  		修改时间  			修改内容
 * 
 * ****************************************************************************
 */
package com.sx.base;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @Description 分页工具类，封装页面的页数、记录数等信息
 * @DateTime 	2012-8-23下午02:05:08
 * @Author 		RXH
 * @Version 	1.0
 */
public class DataPage<T> implements Serializable {

	/* Default serialVersionUID */
	private static final long serialVersionUID = -5367107582169353927L;

	/* 每页记录数默认10条 */
	private static int DEFAULT_PAGE_SIZE = 10;

	/* 每页的记录数 */
	private int pageSize = DEFAULT_PAGE_SIZE;

	/* 当前页第一条数据在数据库中的位置,从0开始 */
	private int start;

	/* 当前页中存放的记录,类型一般为List */
	private List<T> data;

	/* 总记录数 */
	private int totalCount;

	/* 当前页数 */
	@SuppressWarnings("unused")
	private int currentPageNo=1;

	/* 总页数 */
	@SuppressWarnings("unused")
	private int totalPageCount;
	
	/* 上一页 */
	@SuppressWarnings("unused")
	private int prevPage;
	
	/* 下一页 */
	@SuppressWarnings("unused")
	private int nextPage;

	/**
	 * 构造方法，只构造空页.
	 */
	public DataPage() {
		this(0, 0, DEFAULT_PAGE_SIZE, new ArrayList<T>());
	}

	/**
	 * 默认构造方法.<br>
	 * @param start 本页数据在数据库中的起始位置
	 * @param totalSize 数据库中总记录条数
	 * @param pageSize 本页容量
	 * @param data 本页包含的数据
	 */
	public DataPage(int start, int totalSize, int pageSize, List<T> data) {
		this.pageSize = pageSize;
		this.start = start;
		this.totalCount = totalSize;
		this.data = data;
	}

	/**
	 * 取总记录数.<br>
	 * 
	 * @return 总记录数
	 */
	public int getTotalCount() {
		return this.totalCount;
	}

	/**
	 * 取总页数.<br>
	 * 
	 * @return 总页数
	 */
	public int getTotalPageCount() {
		if (totalCount % pageSize == 0)
			return totalCount / pageSize;
		else
			return totalCount / pageSize + 1;
	}

	/**
	 * 取每页记录数.<br>
	 * 
	 * @return 每页记录数
	 */
	public int getPageSize() {
		return pageSize;
	}

	/**
	 * 取当前页中的记录.<br>
	 * 
	 * @return 当前页中的记录
	 */
	public List<T> getData() {
		return data;
	}

	/**
	 * 取该页当前页码,页码从1开始.<br>
	 * 
	 * @return 该页当前页码
	 */
	public int getCurrentPageNo() {
		return start / pageSize + 1;
	}

	public void setCurrentPageNo(int currentPageNo) {
		this.currentPageNo = currentPageNo;
	}

	/**
	 * 该页是否有下一页.<br>
	 * 
	 * @return true：有下一页；false：没有下一页
	 */
	public boolean hasNextPage() {
		return this.getCurrentPageNo() < this.getTotalPageCount();
	}

	/**
	 * 该页是否有上一页.<br>
	 * 
	 * @return true：有上一页；false：没有上一页
	 */
	public boolean hasPreviousPage() {
		return this.getCurrentPageNo() > 1;
	}

	/**
	 * 获取任一页第一条数据在数据集的位置，每页条数使用默认值.<br>
	 * 
	 * @see #getStartOfPage(int,int)
	 */
	protected static int getStartOfPage(int pageNo) {
		return getStartOfPage(pageNo, DEFAULT_PAGE_SIZE);
	}

	/**
	 * 获取任一页第一条数据在数据集的位置.<br>
	 * 
	 * @param pageNo 从1开始的页号
	 * @param pageSize 每页记录条数
	 * @return 该页第一条数据
	 */
	public static int getStartOfPage(int pageNo, int pageSize) {
		return (pageNo - 1) * pageSize;
	}

	public void setData(List<T> data) {
		this.data = data;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public void setTotalPageCount(int totalPageCount) {
		this.totalPageCount = totalPageCount;
	}

	public int getPrevPage() {
		if(this.currentPageNo==1){
			return this.currentPageNo;
		}else{
			return this.currentPageNo-1;
		}
	}

	public void setPrevPage(int prevPage) {
		this.prevPage = prevPage;
	}

	public int getNextPage() {
		if(this.currentPageNo==this.totalPageCount){
			return this.currentPageNo;
		}else{
			return this.currentPageNo+1;
		}
	}

	public void setNextPage(int nextPage) {
		this.nextPage = nextPage;
	}
}
