/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    ResponseList.java
 * @Package:  com.zdxb.tcmcsm.pks.common
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月3日 上午11:01:31
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.common;

import java.util.List;

/**
 * @ClassName:  ResponseList
 * @Description:   TODO
 * @author: xuBiao
 * @date:  2019年6月3日 上午11:01:31
*/
public class ResponseList<T> {
	
	/** 状态 */
	public int code = 0;
	/** 状态信息 */
	public String msg = "";
	/**每页显示数量 默认为10*/
	private int pageSize=10;
	/**当前页数*/
	private int pageNum;
	/**总条数*/
	private int total;
	/**返回的数据*/
	private List<T> data;
	
	/**
	* @Title:  ResponseList
	* @Description:获取每页显示数量默认为10
	* @author: xuBiao
	* @return: pageSize  pageSize
	*/
	public int getPageSize() {
		return pageSize;
	}

	/**
	*@Title: setPageSize
	*@Description:设置每页显示数量默认为10
	*@author: xuBiao
	*@param pageSize pageSize
	*/
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	/**
	* @Title:  ResponseList
	* @Description:获取当前页 
	* @author: xuBiao
	* @return: pageNum  pageNum
	*/
	public int getPageNum() {
		return pageNum;
	}

	/**
	*@Title: setPageNum
	*@Description:设置当前页
	*@author: xuBiao
	*@param pageNum pageNum
	*/
	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}

	/**
	* @Title:  ResponseList
	* @Description:获取总条数
	* @author: xuBiao
	* @return: total  total
	*/
	public int getTotal() {
		return total;
	}

	/**
	*@Title: setTotal
	*@Description:设置总条数
	*@author: xuBiao
	*@param total total
	*/
	public void setTotal(int total) {
		this.total = total;
	}

	/**
	* @Title:  ResponseList
	* @Description:获取data 
	* @author: xuBiao
	* @return: data  data
	*/
	public List<T> getData() {
		return data;
	}

	/**
	*@Title: setData
	*@Description:设置data
	*@author: xuBiao
	*@param data data
	*/
	public void setData(List<T> data) {
		this.data = data;
	}

	/**
	* @Title:  ResponseList
	* @Description:获取code 
	* @author: xuBiao
	* @return: code  code
	*/
	public int getCode() {
		return code;
	}

	/**
	*@Title: setCode
	*@Description:设置code
	*@author: xuBiao
	*@param code code
	*/
	public void setCode(int code) {
		this.code = code;
	}

	/**
	* @Title:  ResponseList
	* @Description:获取msg 
	* @author: xuBiao
	* @return: msg  msg
	*/
	public String getMsg() {
		return msg;
	}

	/**
	*@Title: setMsg
	*@Description:设置msg
	*@author: xuBiao
	*@param msg msg
	*/
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	

}
