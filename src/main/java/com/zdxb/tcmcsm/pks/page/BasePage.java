/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    BasePage.java
 * @Package:  com.zdxb.tcmcsm.pks.page
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月6日 下午5:06:07
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.page;

import org.apache.commons.lang.StringUtils;


/**
 * @ClassName: BasePage
 * @Description: 分页实体bean
 * @author: xuBiao
 * @date: 2019年6月6日 下午5:06:07
 */
public class BasePage {

	private Integer page = 1;

	private Integer limit = 10;

	private String sort;

	private String order;

	/**
	 * 分页导航
	 */
	private Pager pager = new Pager();

	public Pager getPager() {
		pager.setPageId(getPage());
		pager.setPageSize(getLimit());
		String orderField = "";
		if (StringUtils.isNotBlank(sort)) {
			orderField = sort;
		}
		if (StringUtils.isNotBlank(orderField) && StringUtils.isNotBlank(order)) {
			orderField += " " + order;
		}
		pager.setOrderField(orderField);
		return pager;
	}

	public void setPager(Pager pager) {
		this.pager = pager;
	}

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}
	

	/**
	* @Title:  BasePage
	* @Description:获取limit 
	* @author: xuBiao
	* @return: limit  limit
	*/
	public Integer getLimit() {
		return limit;
	}

	/**
	*@Title: setLimit
	*@Description:设置limit
	*@author: xuBiao
	*@param limit limit
	*/
	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}

}
