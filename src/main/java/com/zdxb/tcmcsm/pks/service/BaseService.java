/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    BaseService.java
 * @Package:  com.zdxb.tcmcsm.pks.service
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月6日 下午5:22:48
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.service;

import java.util.List;

import com.zdxb.tcmcsm.pks.common.ServiceException;
import com.zdxb.tcmcsm.pks.page.BasePage;


/**
 * @ClassName:  BaseService
 * @Description:   TODO
 * @author: xuBiao
 * @date:  2019年6月6日 下午5:22:48
*/
public interface BaseService<T> {
	
	public void add(T t)  throws ServiceException;
	
	public void update(T t)  throws ServiceException;
	
	public void delete(Object... ids) throws ServiceException;
	
	public int queryByCount(BasePage page)throws ServiceException;
	
	public List<T> queryByList(BasePage page) throws ServiceException;

	public T queryById(Object id) throws ServiceException;


}
