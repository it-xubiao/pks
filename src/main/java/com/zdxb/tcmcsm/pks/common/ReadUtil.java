/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    ReadUtil.java
 * @Package:  com.zdxb.tcmcsm.pks.common
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月3日 上午11:00:36
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.common;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * @ClassName:  ReadUtil
 * @Description:   文件信息工具类
 * @author: xuBiao
 * @date:  2019年6月3日 上午11:00:36
*/
public class ReadUtil {
	
	/**日志处理*/
	public static Logger logger=LoggerFactory.getLogger(ReadUtil.class);
	
	/**属性集合*/
	private static Map<String,Properties> propMap = new HashMap<String,Properties>();
	
	/**
	 * 
	 * @Title: getProperties
	 * @Description: 读取配置文件信息
	 * @param config
	 * @return
	 * @throws Exception
	 * @author: xuBiao
	 */
	public static Properties getProperties(String config)  {
		if (propMap.containsKey(config)) {
			return propMap.get(config);
		}
		Properties p = new Properties();
		InputStream is = null;
		try {
			is = Thread.currentThread().getContextClassLoader()
					.getResourceAsStream(config);
			p.load(is);
			propMap.put(config, p);
			
		} catch (IOException e) {
			logger.error("读取配置文件失败");
			logger.error(ReadUtil.printStackTraceToString(e));
			e.printStackTrace();
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
					logger.error(ReadUtil.printStackTraceToString(e));
					e.printStackTrace();
				}
				
			}
		}
		return p;
	}
	
	/**
	 * 
	 * @Title: formatString
	 * @Description: 用于已插入参数的子格式模式
	 * @param orgString
	 * @param arguments
	 * @return
	 * @throws Exception
	 * @author: xuBiao
	 */
	public static String formatString(String orgString, Object[] arguments) throws Exception {
		return MessageFormat.format(orgString, arguments);
	}
	
	/**
	 * 
	 * @Title: getUUID
	 * @Description: 获取uuid
	 * @return
	 * @throws Exception
	 * @author: xuBiao
	 */
	public static String getUUID(){
		return UUID.randomUUID().toString().replaceAll("-", "");
	}
	
	/**
	 * 
	 * @Title: httpURLConectionGET
	 * @Description: 接口调用 GET
	 * @param geturl
	 * @return
	 * @throws Exception
	 * @author: xuBiao
	 */
    public static String httpURLConectionGET(String geturl) throws Exception {  
		HttpURLConnection connection = null;
		URL url = null;
		BufferedReader br = null;
		// 把字符串转换为URL请求地址
		try {
			url = new URL(geturl);   
		}catch(Exception e) {
			logger.error("url 格式非法："+geturl);
			e.printStackTrace();
			return null;
		}
		
        try {  
        	// 打开连接
            connection = (HttpURLConnection) url.openConnection();  
            // 连接会话
            connection.connect();   
            // 获取输入流
            br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));   
            String line = null;  
            StringBuilder sb = new StringBuilder();  
            // 循环读取流
            while ((line = br.readLine()) != null) {  
                sb.append(line);  
            }
            return sb.toString();  
            
        } catch (Exception e) {  
        	logger.error("调用url ："+geturl+" 发生异常："+e.getMessage());
            e.printStackTrace(); 
            return null;
        }finally { 
          	try {
          		if(br != null) {
          			br.close();
          		}
			} catch (IOException e) { 
				br = null;
			} 
          	// 断开连接
          	connection.disconnect();
        }
    }
    
    /**
     * 
     * @Title: printStackTraceToString
     * @Description: 返回异常的完整堆栈追踪信息
     * @param t
     * @return
     * @throws Exception
     * @author: xuBiao
     */
	public static String printStackTraceToString(Throwable t)  {
	    StringWriter sw = new StringWriter();
	    t.printStackTrace(new PrintWriter(sw, true));
	    return sw.getBuffer().toString();
	}

}
