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

import java.math.BigDecimal;

import com.zdxb.tcmcsm.pks.page.BasePage;

/**
 * @ClassName: ChuenChenNongSuoEntity
 * @Description: 醇沉浓缩
 * @author: xuBiao
 * @date: 2019年6月13日 下午3:27:08
 */
public class ChuenChenNongSuo extends BasePage {

	/**
	 * 批次号
	 */
	private String batchNumber;

	/**
	 * 减压浓缩真空度平均值
	 */
	private String jynszkd;
	/**
	 * 减压浓缩真空度RSD
	 */
	private String jynszkdRSD;

	/**
	 * 减压浓缩压力平均值
	 */
	private String jynsyl;
	
	/**
	 * 减压浓缩压力RSD
	 */
	private String jynsylRSD;

	/**
	 * 浸膏冷藏真空度平均值
	 */
	private String qgnczkd;

	/**
	 *浸膏冷藏真空度RSD
	 */
	private String qgnczkdRSD;

	/**
	* @Title:  ChuenChenNongSuo
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
	* @Title:  ChuenChenNongSuo
	* @Description:获取 减压浓缩真空度平均值 
	* @author: xuBiao
	* @return: jynszkd  
	*/
	public String getJynszkd() {
		return jynszkd;
	}
	

	/**
	*@Title: setJynszkd
	*@Description:设置减压浓缩真空度平均值
	*@author: xuBiao
	*@param jynszkd 减压浓缩真空度平均值
	*/
	public void setJynszkd(String jynszkd) {
		this.jynszkd = jynszkd;
	}
	

	/**
	* @Title:  ChuenChenNongSuo
	* @Description:获取 减压浓缩真空度RSD 
	* @author: xuBiao
	* @return: jynszkdRSD  
	*/
	public String getJynszkdRSD() {
		return jynszkdRSD;
	}
	

	/**
	*@Title: setJynszkdRSD
	*@Description:设置减压浓缩真空度RSD
	*@author: xuBiao
	*@param jynszkdRSD 减压浓缩真空度RSD
	*/
	public void setJynszkdRSD(String jynszkdRSD) {
		this.jynszkdRSD = jynszkdRSD;
	}
	

	/**
	* @Title:  ChuenChenNongSuo
	* @Description:获取 减压浓缩压力平均值 
	* @author: xuBiao
	* @return: jynsyl  
	*/
	public String getJynsyl() {
		return jynsyl;
	}
	

	/**
	*@Title: setJynsyl
	*@Description:设置减压浓缩压力平均值
	*@author: xuBiao
	*@param jynsyl 减压浓缩压力平均值
	*/
	public void setJynsyl(String jynsyl) {
		this.jynsyl = jynsyl;
	}
	

	/**
	* @Title:  ChuenChenNongSuo
	* @Description:获取 减压浓缩压力RSD 
	* @author: xuBiao
	* @return: jynsylRSD  
	*/
	public String getJynsylRSD() {
		return jynsylRSD;
	}
	

	/**
	*@Title: setJynsylRSD
	*@Description:设置减压浓缩压力RSD
	*@author: xuBiao
	*@param jynsylRSD 减压浓缩压力RSD
	*/
	public void setJynsylRSD(String jynsylRSD) {
		this.jynsylRSD = jynsylRSD;
	}
	

	/**
	* @Title:  ChuenChenNongSuo
	* @Description:获取 浸膏冷藏真空度平均值 
	* @author: xuBiao
	* @return: qgnczkd  
	*/
	public String getQgnczkd() {
		return qgnczkd;
	}
	

	/**
	*@Title: setQgnczkd
	*@Description:设置浸膏冷藏真空度平均值
	*@author: xuBiao
	*@param qgnczkd 浸膏冷藏真空度平均值
	*/
	public void setQgnczkd(String qgnczkd) {
		this.qgnczkd = qgnczkd;
	}
	

	/**
	* @Title:  ChuenChenNongSuo
	* @Description:获取 浸膏冷藏真空度RSD 
	* @author: xuBiao
	* @return: qgnczkdRSD  
	*/
	public String getQgnczkdRSD() {
		return qgnczkdRSD;
	}
	

	/**
	*@Title: setQgnczkdRSD
	*@Description:设置浸膏冷藏真空度RSD
	*@author: xuBiao
	*@param qgnczkdRSD 浸膏冷藏真空度RSD
	*/
	public void setQgnczkdRSD(String qgnczkdRSD) {
		this.qgnczkdRSD = qgnczkdRSD;
	}
	
}
