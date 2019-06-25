/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    JinQingChuenChenOne.java
 * @Package:  com.zdxb.tcmcsm.pks.entity
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月18日 下午4:01:24
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.entity;

import java.util.Date;

import com.zdxb.tcmcsm.pks.page.BasePage;

/**
 * @ClassName: JinQingChuenChenOne
 * @Description: 金青醇沉第一阶段
 * @author: xuBiao
 * @date: 2019年6月18日 下午4:01:24
 */
public class JinQingChuenChenOne extends BasePage{
	
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
	private double deviceName;

	/**
	 * 加醇第一阶段罐内上部温度(℃)
	 */
	private double upperTemperature;

	/**
	 * 加醇第一阶段罐内下部温度(℃）
	 */
	private double lowerTemperature;

	/**
	 * 乙醇流量计累积量
	 */
	private double cumulativeAmount;

	/**
	 * 乙醇流量计流速
	 */
	private double currentSpeed;
	
	/**
	 * 系统时间
	 */
	private Date curt;

	/**
	* @Title:  JinQingChuenChenOne
	* @Description:获取 批次号 
	* @author: xuBiao
	* @return: batchNumber  
	*/
	public String getBatchNumber() {
		return batchNumber;
	}
	

	/**
	*@Title: setBatchNumber
	*@Description:设置批次号
	*@author: xuBiao
	*@param batchNumber 批次号
	*/
	public void setBatchNumber(String batchNumber) {
		this.batchNumber = batchNumber;
	}
	

	/**
	* @Title:  JinQingChuenChenOne
	* @Description:获取 罐号 
	* @author: xuBiao
	* @return: deviceCode  
	*/
	public String getDeviceCode() {
		return deviceCode;
	}
	

	/**
	*@Title: setDeviceCode
	*@Description:设置罐号
	*@author: xuBiao
	*@param deviceCode 罐号
	*/
	public void setDeviceCode(String deviceCode) {
		this.deviceCode = deviceCode;
	}
	
	
	/**
	* @Title:  JinQingChuenChenOne
	* @Description:获取 罐名 
	* @author: xuBiao
	* @return: deviceName  
	*/
	public double getDeviceName() {
		return deviceName;
	}
	


	/**
	*@Title: setDeviceName
	*@Description:设置罐名
	*@author: xuBiao
	*@param deviceName 罐名
	*/
	public void setDeviceName(double deviceName) {
		this.deviceName = deviceName;
	}
	


	/**
	* @Title:  JinQingChuenChenOne
	* @Description:获取 加醇第一阶段罐内上部温度(℃) 
	* @author: xuBiao
	* @return: upperTemperature  
	*/
	public double getUpperTemperature() {
		return upperTemperature;
	}
	


	/**
	*@Title: setUpperTemperature
	*@Description:设置加醇第一阶段罐内上部温度(℃)
	*@author: xuBiao
	*@param upperTemperature 加醇第一阶段罐内上部温度(℃)
	*/
	public void setUpperTemperature(double upperTemperature) {
		this.upperTemperature = upperTemperature;
	}
	


	/**
	* @Title:  JinQingChuenChenOne
	* @Description:获取 加醇第一阶段罐内下部温度(℃） 
	* @author: xuBiao
	* @return: lowerTemperature  
	*/
	public double getLowerTemperature() {
		return lowerTemperature;
	}
	


	/**
	*@Title: setLowerTemperature
	*@Description:设置加醇第一阶段罐内下部温度(℃）
	*@author: xuBiao
	*@param lowerTemperature 加醇第一阶段罐内下部温度(℃）
	*/
	public void setLowerTemperature(double lowerTemperature) {
		this.lowerTemperature = lowerTemperature;
	}
	


	/**
	* @Title:  JinQingChuenChenOne
	* @Description:获取 乙醇流量计累积量 
	* @author: xuBiao
	* @return: cumulativeAmount  
	*/
	public double getCumulativeAmount() {
		return cumulativeAmount;
	}
	


	/**
	*@Title: setCumulativeAmount
	*@Description:设置乙醇流量计累积量
	*@author: xuBiao
	*@param cumulativeAmount 乙醇流量计累积量
	*/
	public void setCumulativeAmount(double cumulativeAmount) {
		this.cumulativeAmount = cumulativeAmount;
	}
	


	/**
	* @Title:  JinQingChuenChenOne
	* @Description:获取 乙醇流量计流速 
	* @author: xuBiao
	* @return: currentSpeed  
	*/
	public double getCurrentSpeed() {
		return currentSpeed;
	}
	


	/**
	*@Title: setCurrentSpeed
	*@Description:设置乙醇流量计流速
	*@author: xuBiao
	*@param currentSpeed 乙醇流量计流速
	*/
	public void setCurrentSpeed(double currentSpeed) {
		this.currentSpeed = currentSpeed;
	}
	


	/**
	* @Title:  JinQingChuenChenOne
	* @Description:获取 系统时间 
	* @author: xuBiao
	* @return: curt  
	*/
	public Date getCurt() {
		return curt;
	}
	

	/**
	*@Title: setCurt
	*@Description:设置系统时间
	*@author: xuBiao
	*@param curt 系统时间
	*/
	public void setCurt(Date curt) {
		this.curt = curt;
	}
	
}
