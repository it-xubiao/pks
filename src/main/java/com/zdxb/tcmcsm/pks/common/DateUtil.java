/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    DateUtil.java
 * @Package:  com.zdxb.tcmcsm.pks.common
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月6日 下午5:45:25
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.common;

import java.text.SimpleDateFormat;

/**
 * @ClassName:  DateUtil
 * @Description:   日期工具类
 * @author: xuBiao
 * @date:  2019年6月6日 下午5:45:25
*/
public class DateUtil {
	
	 public static String getFormattedDateUtil(java.util.Date dtDate, String strFormatTo) {
	        if (dtDate == null) {
	            return "";
	        }
	        strFormatTo = strFormatTo.replace('/', '-');
	        try {
	            SimpleDateFormat formatter = new SimpleDateFormat(strFormatTo);
	            return formatter.format(dtDate);
	        } catch (Exception e) {
	            // Common.printLog("转换日期字符串格式时出错;" + e.getMessage());
	            return "";
	        }
	    }

}
