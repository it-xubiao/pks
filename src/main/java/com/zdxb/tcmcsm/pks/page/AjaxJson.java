/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    AjaxJson.java
 * @Package:  com.zdxb.tcmcsm.pks.page
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月6日 下午5:05:29
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.page;

import java.util.Map;

/**
 * @ClassName: AjaxJson
 * @Description: TODO
 * @author: xuBiao
 * @date: 2019年6月6日 下午5:05:29
 */
public class AjaxJson {

	private boolean success = true;// 是否成功
	private String msg = "操作成功";// 提示信息
	private Object obj = null;// 其他信息
	private Map<String, Object> attributes;// 其他参数

	public Map<String, Object> getAttributes() {
		return attributes;
	}

	public void setAttributes(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Object getObj() {
		return obj;
	}

	public void setObj(Object obj) {
		this.obj = obj;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

}
