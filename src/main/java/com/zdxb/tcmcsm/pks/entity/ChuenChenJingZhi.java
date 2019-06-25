/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    ChuenChenJingZhi.java
 * @Package:  com.zdxb.tcmcsm.pks.entity
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月18日 下午4:49:00
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.entity;

/**
 * @ClassName: ChuenChenJingZhi
 * @Description: 醇沉静置过程
 * @author: xuBiao
 * @date: 2019年6月18日 下午4:49:00
 */
public class ChuenChenJingZhi {

	/**
	 * 静置时间（min)
	 */
	private String quietTime;

	/**
	 * 醇沉静置罐内上部温度(℃)
	 */
	private String upperTemperature;

	/**
	 * 醇沉静置罐内下部温度(℃）
	 */
	private String lowerTemperature;

	/**
	 * @Title: ChuenChenJingZhi
	 * @Description:获取 静置时间（min)
	 * @author: xuBiao
	 * @return: quietTime
	 */
	public String getQuietTime() {
		return quietTime;
	}

	/**
	 * @Title: setQuietTime
	 * @Description:设置静置时间（min)
	 * @author: xuBiao
	 * @param quietTime
	 *            静置时间（min)
	 */
	public void setQuietTime(String quietTime) {
		this.quietTime = quietTime;
	}

	/**
	 * @Title: ChuenChenJingZhi
	 * @Description:获取 醇沉静置罐内上部温度(℃)
	 * @author: xuBiao
	 * @return: upperTemperature
	 */
	public String getUpperTemperature() {
		return upperTemperature;
	}

	/**
	 * @Title: setUpperTemperature
	 * @Description:设置醇沉静置罐内上部温度(℃)
	 * @author: xuBiao
	 * @param upperTemperature
	 *            醇沉静置罐内上部温度(℃)
	 */
	public void setUpperTemperature(String upperTemperature) {
		this.upperTemperature = upperTemperature;
	}

	/**
	 * @Title: ChuenChenJingZhi
	 * @Description:获取 醇沉静置罐内下部温度(℃）
	 * @author: xuBiao
	 * @return: lowerTemperature
	 */
	public String getLowerTemperature() {
		return lowerTemperature;
	}

	/**
	 * @Title: setLowerTemperature
	 * @Description:设置醇沉静置罐内下部温度(℃）
	 * @author: xuBiao
	 * @param lowerTemperature
	 *            醇沉静置罐内下部温度(℃）
	 */
	public void setLowerTemperature(String lowerTemperature) {
		this.lowerTemperature = lowerTemperature;
	}

}
