/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    ReType.java
 * @Package:  com.zdxb.tcmcsm.pks.common
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月4日 上午10:07:27
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.common;


import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

/**
 * @ClassName: ReType
 * @Description: 前端显示
 * @author: xuBiao
 * @date: 2019年6月4日 上午10:07:27
 */
public class ReType implements Serializable {
	
	/**   
	 * @Fields serialVersionUID : TODO   
	 */ 
	private static final long serialVersionUID = 1L;
	
	/** 状态 */
	public int code = 0;
	/** 状态信息 */
	public String msg = "";
	/** 数据总数 */
	public long count;
	/** 页码 */
	public long pageNum;
	
	/**返回数据*/
	public List<?> data;

	public ReType() {
	}

	public ReType(long count, List<?> data) {
		this.count = count;
		this.data = data;
	}

	public ReType(long count, long pageNum, List<?> data) {
		this.count = count;
		this.pageNum = pageNum;
		this.data = data;
	}

	/**
	 * 动态添加属性 map 用法可以参考 activiti 模块中 com.len.JsonTest 测试类中用法
	 * 
	 * @param count
	 * @param data
	 * @param map
	 * @param node
	 *            绑定节点字符串 这样可以更加灵活
	 * @return
	 */
	public static String jsonStrng(long count, List<?> data, Map<String, Map<String, Object>> map, String node) {
		JSONArray jsonArray = JSONArray.parseArray(JSON.toJSONString(data));
		JSONObject object = new JSONObject();
		for (int i = 0; i < jsonArray.size(); i++) {
			JSONObject jsonData = (JSONObject) jsonArray.get(i);
			jsonData.putAll(map.get(jsonData.get(node)));
		}
		object.put("count", count);
		object.put("data", jsonArray);
		object.put("code", 0);
		object.put("msg", "");
		return object.toJSONString();
	}

}
