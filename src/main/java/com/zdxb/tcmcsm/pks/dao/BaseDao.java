/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    BaseDao.java
 * @Package:  com.zdxb.tcmcsm.pks.dao
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月6日 下午5:17:30
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.dao;

import java.util.List;

import com.zdxb.tcmcsm.pks.page.BasePage;


/**
 * @ClassName:  BaseDao
 * @Description:   TODO
 * @author: xuBiao
 * @date:  2019年6月6日 下午5:17:30
*/
public interface BaseDao<T> {
	
	public void add(T t);
	
	public void update(T t);
	
	public void delete(Object id);

	public int queryByCount(BasePage page);
	
	public List<T> queryByList(BasePage page);
	
	public T queryById(Object id);

}
