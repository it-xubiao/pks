/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    KyGyDbEntity.java
 * @Package:  com.zdxb.tcmcsm.pks.entity
 * @Description:   参数实体
 * @author:      xuBiao
 * @date:  2019年6月3日 上午11:05:43
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.model;

import java.util.Date;

import com.zdxb.tcmcsm.pks.page.BasePage;

/**
 * @ClassName:  KyGyDbEntity
 * @Description:   参数实体表
 * @author: xuBiao
 * @date:  2019年6月3日 上午11:05:43
*/
public class KyGyDbModel extends BasePage {
	
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
	
	/**
	 * 开始时间
	 */
	private String start;
	
	/**
	 * 结束时间
	 */
	private String end;
	
	
	/**
	* @Title:  KyGyDbEntity
	* @Description:获取batchNumber 
	* @author: xuBiao
	* @return: batchNumber  batchNumber
	*/
	public String getBatchNumber() {
		return batchNumber;
	}

	/**
	*@Title: setBatchNumber
	*@Description:设置batchNumber
	*@author: xuBiao
	*@param batchNumber batchNumber
	*/
	public void setBatchNumber(String batchNumber) {
		this.batchNumber = batchNumber;
	}

	/**
	* @Title:  KyGyDbEntity
	* @Description:获取deviceCode 
	* @author: xuBiao
	* @return: deviceCode  deviceCode
	*/
	public String getDeviceCode() {
		return deviceCode;
	}

	/**
	*@Title: setDeviceCode
	*@Description:设置deviceCode
	*@author: xuBiao
	*@param deviceCode deviceCode
	*/
	public void setDeviceCode(String deviceCode) {
		this.deviceCode = deviceCode;
	}

	/**
	* @Title:  KyGyDbEntity
	* @Description:获取deviceName 
	* @author: xuBiao
	* @return: deviceName  deviceName
	*/
	public String getDeviceName() {
		return deviceName;
	}

	/**
	*@Title: setDeviceName
	*@Description:设置deviceName
	*@author: xuBiao
	*@param deviceName deviceName
	*/
	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}

	/**
	* @Title:  KyGyDbEntity
	* @Description:获取processName 
	* @author: xuBiao
	* @return: processName  processName
	*/
	public String getProcessName() {
		return processName;
	}

	/**
	*@Title: setProcessName
	*@Description:设置processName
	*@author: xuBiao
	*@param processName processName
	*/
	public void setProcessName(String processName) {
		this.processName = processName;
	}

	/**
	* @Title:  KyGyDbEntity
	* @Description:获取stageName 
	* @author: xuBiao
	* @return: stageName  stageName
	*/
	public String getStageName() {
		return stageName;
	}

	/**
	*@Title: setStageName
	*@Description:设置stageName
	*@author: xuBiao
	*@param stageName stageName
	*/
	public void setStageName(String stageName) {
		this.stageName = stageName;
	}

	/**
	* @Title:  KyGyDbEntity
	* @Description:获取productName 
	* @author: xuBiao
	* @return: productName  productName
	*/
	public String getProductName() {
		return productName;
	}

	/**
	*@Title: setProductName
	*@Description:设置productName
	*@author: xuBiao
	*@param productName productName
	*/
	public void setProductName(String productName) {
		this.productName = productName;
	}

	/**
	* @Title:  KyGyDbEntity
	* @Description:获取paraName 
	* @author: xuBiao
	* @return: paraName  paraName
	*/
	public String getParaName() {
		return paraName;
	}

	/**
	*@Title: setParaName
	*@Description:设置paraName
	*@author: xuBiao
	*@param paraName paraName
	*/
	public void setParaName(String paraName) {
		this.paraName = paraName;
	}

	/**
	* @Title:  KyGyDbEntity
	* @Description:获取value 
	* @author: xuBiao
	* @return: value  value
	*/
	public Double getValue() {
		return value;
	}

	/**
	*@Title: setValue
	*@Description:设置value
	*@author: xuBiao
	*@param value value
	*/
	public void setValue(Double value) {
		this.value = value;
	}

	/**
	* @Title:  KyGyDbEntity
	* @Description:获取unit 
	* @author: xuBiao
	* @return: unit  unit
	*/
	public String getUnit() {
		return unit;
	}

	/**
	*@Title: setUnit
	*@Description:设置unit
	*@author: xuBiao
	*@param unit unit
	*/
	public void setUnit(String unit) {
		this.unit = unit;
	}

	/**
	* @Title:  KyGyDbEntity
	* @Description:获取curt 
	* @author: xuBiao
	* @return: curt  curt
	*/
	public Date getCurt() {
		return curt;
	}

	/**
	*@Title: setCurt
	*@Description:设置curt
	*@author: xuBiao
	*@param curt curt
	*/
	public void setCurt(Date curt) {
		this.curt = curt;
	}

	/**
	* @Title:  KyGyDbEntity
	* @Description:获取start 
	* @author: xuBiao
	* @return: start  start
	*/
	public String getStart() {
		return start;
	}

	/**
	*@Title: setStart
	*@Description:设置start
	*@author: xuBiao
	*@param start start
	*/
	public void setStart(String start) {
		this.start = start;
	}

	/**
	* @Title:  KyGyDbEntity
	* @Description:获取end 
	* @author: xuBiao
	* @return: end  end
	*/
	public String getEnd() {
		return end;
	}

	/**
	*@Title: setEnd
	*@Description:设置end
	*@author: xuBiao
	*@param end end
	*/
	public void setEnd(String end) {
		this.end = end;
	}
	
	
	
}
