/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    ServiceException.java
 * @Package:  com.zdxb.tcmcsm.pks.common
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月6日 下午5:25:09
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.common;

/**
 * @ClassName:  ServiceException
 * @Description:   Service层公用的Exception.继承自RuntimeException, 从由Spring管理事务的函数中抛出时会触发事务回滚.
 * @author: xuBiao
 * @date:  2019年6月6日 下午5:25:09
*/
public class ServiceException extends RuntimeException{
	
	private static final long serialVersionUID = 3583566093089790852L;

	public ServiceException() {
		super();
	}

	public ServiceException(String message) {
		super(message);
	}

	public ServiceException(Throwable cause) {
		super(cause);
	}

	public ServiceException(String message, Throwable cause) {
		super(message, cause);
	}


}
