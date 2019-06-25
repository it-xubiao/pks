/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    JinQingChunChen.java
 * @Package:  com.zdxb.tcmcsm.pks.entity
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月18日 下午3:49:25
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.entity;

import java.util.List;

import com.zdxb.tcmcsm.pks.page.BasePage;

/**
 * @ClassName: JinQingChunChen
 * @Description: 金青醇沉
 * @author: xuBiao
 * @date: 2019年6月18日 下午3:49:25
 */
public class JinQingChuenChen  extends BasePage{

	/**
	 * 浸膏分配阶段
	 */
	private List<JinGaoFenPei> jinGaoFenPeiList;

	/**
	 * 金青醇沉第一阶段
	 */
	private List<JinQingChuenChenOne> jinQingChuenChenOneList;

	/**
	 * 金青醇沉第二阶段
	 */
	private List<JinQingChuenChenTwo> jinQingChuenChenTwoList;

	/**
	 * 金青醇沉第三阶段
	 */
	private List<JinQingChuenChenThree> jinQingChuenChenThreeList;

	/**
	 * 醇沉静置过程
	 */
	private List<ChuenChenJingZhi> ChuenChenJingZhiList;

	/**
	 * @Title: JinQingChuenChen
	 * @Description:获取 浸膏分配阶段
	 * @author: xuBiao
	 * @return: jinGaoFenPeiList
	 */
	public List<JinGaoFenPei> getJinGaoFenPeiList() {
		return jinGaoFenPeiList;
	}

	/**
	 * @Title: setJinGaoFenPeiList
	 * @Description:设置浸膏分配阶段
	 * @author: xuBiao
	 * @param jinGaoFenPeiList
	 *            浸膏分配阶段
	 */
	public void setJinGaoFenPeiList(List<JinGaoFenPei> jinGaoFenPeiList) {
		this.jinGaoFenPeiList = jinGaoFenPeiList;
	}

	/**
	 * @Title: JinQingChuenChen
	 * @Description:获取 金青醇沉第一阶段
	 * @author: xuBiao
	 * @return: jinQingChuenChenOneList
	 */
	public List<JinQingChuenChenOne> getJinQingChuenChenOneList() {
		return jinQingChuenChenOneList;
	}

	/**
	 * @Title: setJinQingChuenChenOneList
	 * @Description:设置金青醇沉第一阶段
	 * @author: xuBiao
	 * @param jinQingChuenChenOneList
	 *            金青醇沉第一阶段
	 */
	public void setJinQingChuenChenOneList(List<JinQingChuenChenOne> jinQingChuenChenOneList) {
		this.jinQingChuenChenOneList = jinQingChuenChenOneList;
	}

	/**
	 * @Title: JinQingChuenChen
	 * @Description:获取 金青醇沉第二阶段
	 * @author: xuBiao
	 * @return: jinQingChuenChenTwoList
	 */
	public List<JinQingChuenChenTwo> getJinQingChuenChenTwoList() {
		return jinQingChuenChenTwoList;
	}

	/**
	 * @Title: setJinQingChuenChenTwoList
	 * @Description:设置金青醇沉第二阶段
	 * @author: xuBiao
	 * @param jinQingChuenChenTwoList
	 *            金青醇沉第二阶段
	 */
	public void setJinQingChuenChenTwoList(List<JinQingChuenChenTwo> jinQingChuenChenTwoList) {
		this.jinQingChuenChenTwoList = jinQingChuenChenTwoList;
	}

	/**
	 * @Title: JinQingChuenChen
	 * @Description:获取 金青醇沉第三阶段
	 * @author: xuBiao
	 * @return: jinQingChuenChenThreeList
	 */
	public List<JinQingChuenChenThree> getJinQingChuenChenThreeList() {
		return jinQingChuenChenThreeList;
	}

	/**
	 * @Title: setJinQingChuenChenThreeList
	 * @Description:设置金青醇沉第三阶段
	 * @author: xuBiao
	 * @param jinQingChuenChenThreeList
	 *            金青醇沉第三阶段
	 */
	public void setJinQingChuenChenThreeList(List<JinQingChuenChenThree> jinQingChuenChenThreeList) {
		this.jinQingChuenChenThreeList = jinQingChuenChenThreeList;
	}

	/**
	 * @Title: JinQingChuenChen
	 * @Description:获取 chuenChenJingZhiList
	 * @author: xuBiao
	 * @return: chuenChenJingZhiList
	 */
	public List<ChuenChenJingZhi> getChuenChenJingZhiList() {
		return ChuenChenJingZhiList;
	}

	/**
	 * @Title: set醇沉静置过程
	 * @Description:设置chuenChenJingZhiList
	 * @author: xuBiao
	 * @param chuenChenJingZhiList
	 *            chuenChenJingZhiList
	 */
	public void setChuenChenJingZhiList(List<ChuenChenJingZhi> chuenChenJingZhiList) {
		ChuenChenJingZhiList = chuenChenJingZhiList;
	}

}
