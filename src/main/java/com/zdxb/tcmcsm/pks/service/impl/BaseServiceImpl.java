/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    BaseServiceImpl.java
 * @Package:  com.zdxb.tcmcsm.pks.service.impl
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月6日 下午5:27:16
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.service.impl;

import java.util.List;
import java.util.UUID;


import com.zdxb.tcmcsm.pks.common.ClassReflectUtil;
import com.zdxb.tcmcsm.pks.common.ServiceException;
import com.zdxb.tcmcsm.pks.dao.BaseDao;
import com.zdxb.tcmcsm.pks.page.BasePage;
import com.zdxb.tcmcsm.pks.service.BaseService;

/**
 * @ClassName:  BaseServiceImpl
 * @Description:   TODO
 * @author: xuBiao
 * @date:  2019年6月6日 下午5:27:16
*/
public abstract class BaseServiceImpl<T> implements BaseService<T>{
	
	public abstract BaseDao<T> getDao();

	public void add(T t)  throws ServiceException{
		//设置主键.字符类型采用UUID,数字类型采用自增
		try {
			ClassReflectUtil.setIdKeyValue(t,"id",UUID.randomUUID().toString());
		} catch (Exception e) {
			throw new ServiceException(e);
		}
		getDao().add(t);
	}
	
	public void update(T t)  throws ServiceException{
		getDao().update(t);
	}
	
	public void delete(Object... ids) throws ServiceException{
		if(ids == null || ids.length < 1){
			return;
		}
		for(Object id : ids ){
			getDao().delete(id);
		}
	}
	
	public int queryByCount(BasePage page)throws ServiceException{
		return getDao().queryByCount(page);
	}
	
	public List<T> queryByList(BasePage page) throws ServiceException{
		Integer rowCount = queryByCount(page);
		page.getPager().setRowCount(rowCount);
		return getDao().queryByList(page);
	}

	public T queryById(Object id) throws ServiceException{
		return getDao().queryById(id);
	}
	
	

}
