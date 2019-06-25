/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    ChuenChenNongSuoEntity.java
 * @Package:  com.zdxb.tcmcsm.pks.entity
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月13日 下午3:27:08
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.entity;

import com.zdxb.tcmcsm.pks.page.BasePage;

/**
 * @ClassName: ChuenChenNongSuoEntity
 * @Description: 萃取浓缩
 * @author: xuBiao
 * @date: 2019年6月13日 下午3:27:08
 */
public class CueiQuNongSuo extends BasePage {

	/**
	 * 批次号
	 */
	private String batchNumber;

	/**
	 * 减压浓缩真空度
	 */
	private String temperature;

	/**
	 * 减压浓缩压力
	 */
	private String vacuumDegree;

	/**
	 * @Title: CueiQuNongSuo
	 * @Description:获取 批次号
	 * @author: xuBiao
	 * @return: batchNumber
	 */
	public String getBatchNumber() {
		return batchNumber;
	}

	/**
	 * @Title: setBatchNumber
	 * @Description:设置批次号
	 * @author: xuBiao
	 * @param batchNumber
	 *            批次号
	 */
	public void setBatchNumber(String batchNumber) {
		this.batchNumber = batchNumber;
	}

	/**
	 * @Title: CueiQuNongSuo
	 * @Description:获取 减压浓缩真空度
	 * @author: xuBiao
	 * @return: temperature
	 */
	public String getTemperature() {
		return temperature;
	}

	/**
	 * @Title: setTemperature
	 * @Description:设置减压浓缩真空度
	 * @author: xuBiao
	 * @param temperature
	 *            减压浓缩真空度
	 */
	public void setTemperature(String temperature) {
		this.temperature = temperature;
	}

	/**
	 * @Title: CueiQuNongSuo
	 * @Description:获取 减压浓缩压力
	 * @author: xuBiao
	 * @return: vacuumDegree
	 */
	public String getVacuumDegree() {
		return vacuumDegree;
	}

	/**
	 * @Title: setVacuumDegree
	 * @Description:设置减压浓缩压力
	 * @author: xuBiao
	 * @param vacuumDegree
	 *            减压浓缩压力
	 */
	public void setVacuumDegree(String vacuumDegree) {
		this.vacuumDegree = vacuumDegree;
	}

}
