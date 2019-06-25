/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    HtmlUtil.java
 * @Package:  com.zdxb.tcmcsm.pks.common
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月6日 下午5:34:43
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.common;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;

import com.google.gson.Gson;
import com.zdxb.tcmcsm.pks.common.json.JSONUtil;




/**
 * @ClassName:  HtmlUtil
 * @Description:   页面工具类
 * @author: xuBiao
 * @date:  2019年6月6日 下午5:34:43
*/
public class HtmlUtil {
	
	/**
	 * 
	 * <br>
	 * <b>功能：</b>输出json格式<br>
	 * @param response
	 * @param jsonStr
	 * @throws Exception
	 */
	public static void writerJson(HttpServletResponse response,String jsonStr) {
			writer(response,jsonStr);
	}
	
	public static void writerJson(HttpServletResponse response,Object object){
			try {
				response.setContentType("application/json");
				/*response.setCharacterEncoding("UTF-8");
				response.setContentType("text/html;charset=UTF-8");*/
				writer(response,JSONUtil.toJSONString(object));
			} catch (JSONException e) {
				e.printStackTrace();
			}
	}
	
	public static void writerJson(HttpServletResponse response,int count,List<?> data){
		try {
			response.setContentType("application/json");
			/*response.setCharacterEncoding("UTF-8");
			response.setContentType("text/html;charset=UTF-8");*/
			Map<String,Object> jsonMap = new HashMap<String,Object>();
			jsonMap.put("total",count);
			jsonMap.put("data", data);
			jsonMap.put("code", 0);
			writer(response,JSONUtil.toJSONString(jsonMap));
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 
	 * <br>
	 * <b>功能：</b>输出HTML代码<br>
	 * @param response
	 * @param htmlStr
	 * @throws Exception
	 */
	public static void writerHtml(HttpServletResponse response,String htmlStr) {
		writer(response,htmlStr);
	}
	
	private static void writer(HttpServletResponse response,String str){
		try {
			//设置页面不缓存
			response.setHeader("Pragma", "No-cache");
			response.setHeader("Cache-Control", "no-cache");
			response.setCharacterEncoding("UTF-8");
			PrintWriter out= null;
			out = response.getWriter();
			out.print(str);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	} 
	
	/**
	 * 
	 * 写json数据 SPMS3.0 ADDED BY LWS 20160415
	 * 
	 * @param response
	 * @param str
	 */
	public static void writeGson(HttpServletResponse response, Map<String, Object> contentMap){
		PrintWriter out= null;
		try {
			//设置页面不缓存
			response.setHeader("Pragma", "No-cache");
			response.setHeader("Cache-Control", "no-cache");
			response.setCharacterEncoding("UTF-8");
			
			out = response.getWriter();
			Gson gson = new Gson();
			String content = gson.toJson(contentMap);
			out.write(content);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	} 
	


}
