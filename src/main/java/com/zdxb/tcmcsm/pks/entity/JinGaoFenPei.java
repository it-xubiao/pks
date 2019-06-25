/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    JinGaoFenPei.java
 * @Package:  com.zdxb.tcmcsm.pks.entity
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月18日 下午3:55:27
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.entity;

/**
 * @ClassName: JinGaoFenPei
 * @Description: 浸膏分配阶段
 * @author: xuBiao
 * @date: 2019年6月18日 下午3:55:27
 */
public class JinGaoFenPei {

	/**
	 * 分配时间(min)
	 */
	private String distributionTime;

	/**
	 * 浸膏分配罐内上部温度(℃)
	 */
	private String upperTemperature;

	/**
	 * 浸膏分配罐内下部温度(℃)
	 */
	private String lowerTemperature;

	/**
	 * @Title: JinGaoFenPei
	 * @Description:获取 分配时间(min)
	 * @author: xuBiao
	 * @return: distributionTime
	 */
	public String getDistributionTime() {
		return distributionTime;
	}

	/**
	 * @Title: setDistributionTime
	 * @Description:设置分配时间(min)
	 * @author: xuBiao
	 * @param distributionTime
	 *            分配时间(min)
	 */
	public void setDistributionTime(String distributionTime) {
		this.distributionTime = distributionTime;
	}

	/**
	 * @Title: JinGaoFenPei
	 * @Description:获取 浸膏分配罐内上部温度(℃)
	 * @author: xuBiao
	 * @return: upperTemperature
	 */
	public String getUpperTemperature() {
		return upperTemperature;
	}

	/**
	 * @Title: setUpperTemperature
	 * @Description:设置浸膏分配罐内上部温度(℃)
	 * @author: xuBiao
	 * @param upperTemperature
	 *            浸膏分配罐内上部温度(℃)
	 */
	public void setUpperTemperature(String upperTemperature) {
		this.upperTemperature = upperTemperature;
	}

	/**
	 * @Title: JinGaoFenPei
	 * @Description:获取 浸膏分配罐内下部温度(℃)
	 * @author: xuBiao
	 * @return: lowerTemperature
	 */
	public String getLowerTemperature() {
		return lowerTemperature;
	}

	/**
	 * @Title: setLowerTemperature
	 * @Description:设置浸膏分配罐内下部温度(℃)
	 * @author: xuBiao
	 * @param lowerTemperature
	 *            浸膏分配罐内下部温度(℃)
	 */
	public void setLowerTemperature(String lowerTemperature) {
		this.lowerTemperature = lowerTemperature;
	}

}
