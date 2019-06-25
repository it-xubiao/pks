/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    KyGyDbEntity.java
 * @Package:  com.zdxb.tcmcsm.pks.entity
 * @Description:   参数实体
 * @author:      xuBiao
 * @date:  2019年6月3日 上午11:05:43
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.entity;

import java.util.Date;

import com.zdxb.tcmcsm.pks.page.BasePage;

/**
 * @ClassName: KyGyDbEntity
 * @Description: 参数实体表
 * @author: xuBiao
 * @date: 2019年6月3日 上午11:05:43
 */
public class KyGyDb extends BasePage {

	/**
	 * 批次号
	 */
	private String batchNumber;

	/**
	 * 罐号
	 */
	private String deviceCode;

	/**
	 * 罐名
	 */
	private String deviceName;

	/**
	 * 过程名称
	 */
	private String processName;

	/**
	 * 阶段名称
	 */
	private String stageName;

	/**
	 * 产品名称
	 */
	private String productName;

	/**
	 * 中间体名称
	 */
	private String paraName;

	/**
	 * 实际值
	 */
	private Double value;

	/**
	 * 单位
	 */
	private String unit;

	/**
	 * 系统时间
	 */
	private Date curt;

	/*** 自定义 **/

	/**
	 * 减压浓缩真空度
	 */
	private String jynszkd;

	/**
	 * 减压浓缩压力
	 */
	private String jynsyl;

	/**
	 * 浸膏冷藏真空度
	 */
	private String qgnczkd;

	/**
	 * @Title: KyGyDb
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
	 * @Title: KyGyDb
	 * @Description:获取 罐号
	 * @author: xuBiao
	 * @return: deviceCode
	 */
	public String getDeviceCode() {
		return deviceCode;
	}

	/**
	 * @Title: setDeviceCode
	 * @Description:设置罐号
	 * @author: xuBiao
	 * @param deviceCode
	 *            罐号
	 */
	public void setDeviceCode(String deviceCode) {
		this.deviceCode = deviceCode;
	}

	/**
	 * @Title: KyGyDb
	 * @Description:获取 罐名
	 * @author: xuBiao
	 * @return: deviceName
	 */
	public String getDeviceName() {
		return deviceName;
	}

	/**
	 * @Title: setDeviceName
	 * @Description:设置罐名
	 * @author: xuBiao
	 * @param deviceName
	 *            罐名
	 */
	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}

	/**
	 * @Title: KyGyDb
	 * @Description:获取 过程名称
	 * @author: xuBiao
	 * @return: processName
	 */
	public String getProcessName() {
		return processName;
	}

	/**
	 * @Title: setProcessName
	 * @Description:设置过程名称
	 * @author: xuBiao
	 * @param processName
	 *            过程名称
	 */
	public void setProcessName(String processName) {
		this.processName = processName;
	}

	/**
	 * @Title: KyGyDb
	 * @Description:获取 阶段名称
	 * @author: xuBiao
	 * @return: stageName
	 */
	public String getStageName() {
		return stageName;
	}

	/**
	 * @Title: setStageName
	 * @Description:设置阶段名称
	 * @author: xuBiao
	 * @param stageName
	 *            阶段名称
	 */
	public void setStageName(String stageName) {
		this.stageName = stageName;
	}

	/**
	 * @Title: KyGyDb
	 * @Description:获取 产品名称
	 * @author: xuBiao
	 * @return: productName
	 */
	public String getProductName() {
		return productName;
	}

	/**
	 * @Title: setProductName
	 * @Description:设置产品名称
	 * @author: xuBiao
	 * @param productName
	 *            产品名称
	 */
	public void setProductName(String productName) {
		this.productName = productName;
	}

	/**
	 * @Title: KyGyDb
	 * @Description:获取 中间体名称
	 * @author: xuBiao
	 * @return: paraName
	 */
	public String getParaName() {
		return paraName;
	}

	/**
	 * @Title: setParaName
	 * @Description:设置中间体名称
	 * @author: xuBiao
	 * @param paraName
	 *            中间体名称
	 */
	public void setParaName(String paraName) {
		this.paraName = paraName;
	}

	/**
	 * @Title: KyGyDb
	 * @Description:获取 实际值
	 * @author: xuBiao
	 * @return: value
	 */
	public Double getValue() {
		return value;
	}

	/**
	 * @Title: setValue
	 * @Description:设置实际值
	 * @author: xuBiao
	 * @param value
	 *            实际值
	 */
	public void setValue(Double value) {
		this.value = value;
	}

	/**
	 * @Title: KyGyDb
	 * @Description:获取 单位
	 * @author: xuBiao
	 * @return: unit
	 */
	public String getUnit() {
		return unit;
	}

	/**
	 * @Title: setUnit
	 * @Description:设置单位
	 * @author: xuBiao
	 * @param unit
	 *            单位
	 */
	public void setUnit(String unit) {
		this.unit = unit;
	}

	/**
	 * @Title: KyGyDb
	 * @Description:获取 系统时间
	 * @author: xuBiao
	 * @return: curt
	 */
	public Date getCurt() {
		return curt;
	}

	/**
	 * @Title: setCurt
	 * @Description:设置系统时间
	 * @author: xuBiao
	 * @param curt
	 *            系统时间
	 */
	public void setCurt(Date curt) {
		this.curt = curt;
	}

	/**
	 * @Title: KyGyDb
	 * @Description:获取 自定义
	 * @author: xuBiao
	 * @return: jynszkd
	 */
	public String getJynszkd() {
		return jynszkd;
	}

	/**
	 * @Title: setJynszkd
	 * @Description:设置自定义
	 * @author: xuBiao
	 * @param jynszkd
	 *            自定义
	 */
	public void setJynszkd(String jynszkd) {
		this.jynszkd = jynszkd;
	}

	/**
	 * @Title: KyGyDb
	 * @Description:获取 减压浓缩压力
	 * @author: xuBiao
	 * @return: jynsyl
	 */
	public String getJynsyl() {
		return jynsyl;
	}

	/**
	 * @Title: setJynsyl
	 * @Description:设置减压浓缩压力
	 * @author: xuBiao
	 * @param jynsyl
	 *            减压浓缩压力
	 */
	public void setJynsyl(String jynsyl) {
		this.jynsyl = jynsyl;
	}

	/**
	 * @Title: KyGyDb
	 * @Description:获取 浸膏冷藏真空度
	 * @author: xuBiao
	 * @return: qgnczkd
	 */
	public String getQgnczkd() {
		return qgnczkd;
	}

	/**
	 * @Title: setQgnczkd
	 * @Description:设置浸膏冷藏真空度
	 * @author: xuBiao
	 * @param qgnczkd
	 *            浸膏冷藏真空度
	 */
	public void setQgnczkd(String qgnczkd) {
		this.qgnczkd = qgnczkd;
	}

}
