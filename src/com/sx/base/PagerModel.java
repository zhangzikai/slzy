package com.sx.base;

import java.util.List;

public class PagerModel {
	
	/**
	 * 总数
	 */
	private int total;
	
	/**
	 * 每页几条记录数
	 */
	private int pageSize=0;
	
	/**
	 * 当前页数
	 */
	private int pageNumber=1;
	
	/**
	 * 最大页数
	 */
	private int maxPageNumber;
	
	/**
	 * 分页信息
	 */
	private String pageInfo="";

	/**
	 * 数据
	 */
	private List<Object> datas;

	/**
	 * 是否有上一页
	 */
	private Boolean hasPrePage;
	/**
	 * 是否有下一页
	 */
	private Boolean hasNextPage;
	  
	public List<Object> getDatas() {
		return datas;
	}

	public void setDatas(List<Object> datas) {
		this.datas = datas;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public int getMaxPageNumber() {
		return maxPageNumber;
	}

	public void setMaxPageNumber(int maxPageNumber) {
		this.maxPageNumber = maxPageNumber;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	 public void setPageInfo(String pageInfo) {
		this.pageInfo = pageInfo;
	}
	 /**  
	  * 实现下面数字翻页  
	  * @return  
	  */  
	public String getPageInfo() {
		int start=1;
		int end=maxPageNumber;
		if(pageNumber-5>0){
			start=pageNumber-5;
		}
		if(pageNumber+5<maxPageNumber){
			end=pageNumber+5;
		}
	    for(int i=start;i<=end;i++){
	    	pageInfo+="<a href='javascript:void(0)' onclick='searchFormSubmit("+i+")'>"+i+"</a>";
	    }
	   return pageInfo;   
	}

	public Boolean getHasNextPage() {
	    this.hasNextPage = Boolean.valueOf((this.pageNumber != this.maxPageNumber) && (this.pageSize!= 0));
	    return this.hasNextPage;
	  }

	  public void setHasNextPage(Boolean hasNextPage) {
	    this.hasNextPage = hasNextPage;
	  }

	  public Boolean getHasPrePage() {
	    this.hasPrePage = Boolean.valueOf(this.pageNumber!= 1);
	    return this.hasPrePage;
	  }

	  public void setHasPrePage(Boolean hasPrePage) {
	    this.hasPrePage = hasPrePage;
	  }
	
	 
}
