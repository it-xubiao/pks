/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    KyGyDbDao.java
 * @Package:  com.zdxb.tcmcsm.pks.dao
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月3日 上午11:18:53
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.dao;


import java.util.List;
import java.util.Map;

import com.zdxb.tcmcsm.pks.entity.CueiQuNongSuo;
import com.zdxb.tcmcsm.pks.entity.JinQingChuenChen;
import com.zdxb.tcmcsm.pks.entity.JinQingChuenChenOne;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.zdxb.tcmcsm.pks.entity.ChuenChenNongSuo;
import com.zdxb.tcmcsm.pks.entity.KyGyDb;
import com.zdxb.tcmcsm.pks.model.KyGyDbModel;
import com.zdxb.tcmcsm.pks.page.BasePage;

/**
 * @ClassName:  KyGyDbDao
 * @Description:   DAO层
 * @author: xuBiao
 * @date:  2019年6月3日 上午11:18:53
*/
@Mapper
public interface KyGyDbDao<T> extends BaseDao<T>{
	
	/**
	 * 查询所有
	 * @Title: queryAll
	 * @Description: TODO
	 * @param sPage
	 * @param ePage
	 * @param sortOrder
	 * @param sortColumn
	 * @return
	 * @author: xuBiao
	 */
	public List<KyGyDb> queryByList(@Param("condition")Map<String,Object> condition,
			   @Param("sPage")int sPage,@Param("ePage")int ePage,@Param("sortOrder")String sortOrder,@Param("sortColumn")String sortColumn);
	
	/**
	 * 获取总数
	 * @Title: total
	 * @Description: TODO
	 * @return
	 * @author: xuBiao
	 */
	public int total(@Param("condition") Map<String,Object> condition);
	
	/**
	 * 
	 * @Title: selectStageName
	 * @Description: TODO
	 * @return
	 * @author: xuBiao
	 */
	public List<String> selectStageName();
	
	/**
	 * 
	 * @Title: export
	 * @Description: 导出
	 * @param model
	 * @return
	 * @author: xuBiao
	 */
	List<KyGyDbModel> export(KyGyDbModel model);
	
	/**
	 * 
	 * @Title: decompressionConcentrationVacuumDegree
	 * @Description: 1.获取减压浓缩真空度的平均值  
	 * @param model
	 * @return
	 * @author: xuBiao
	 */
	public Float decompressionConcentrationVacuumDegree(KyGyDbModel model);
	
	/**
	 * 
	 * @Title: decompressionConcentrationPressure
	 * @Description: 2.减压浓缩压力 平均值
	 * @param model
	 * @return
	 * @author: xuBiao  extractColdstorageVacuumDegree
	 */
	public Float decompressionConcentrationPressure(KyGyDbModel model);
	
	/**
	 * 
	 * @Title: extractColdstorageVacuumDegree
	 * @Description: 3.浸膏冷藏真空度
	 * @param model
	 * @return
	 * @author: xuBiao
	 */
	public Float extractColdstorageVacuumDegree(KyGyDbModel model);
	
	/**
	 * 查询醇沉浓缩平均值
	 * @Title: queryAvgByList
	 * @Description: TODO
	 * @param model
	 * @return
	 * @author: xuBiao
	 */
	List<ChuenChenNongSuo> queryAvgByList(BasePage page);
	
	/**
	 * 查询醇沉浓缩count
	 * @Title: queryAvgByCount
	 * @Description: TODO
	 * @param page
	 * @return
	 * @author: xuBiao
	 */
	Integer queryAvgByCount(BasePage page);
	
	/**
	 * 
	 * @Title: export
	 * @Description: 醇沉浓缩导出
	 * @param model
	 * @return
	 * @author: xuBiao
	 */
	List<KyGyDb> ChuenChenNongSuoexport(KyGyDbModel model);
	
	/**
	 * 
	 * @Title: queryAvgByList3
	 * @Description: 查询醇沉浓缩数据
	 * @param page
	 * @return
	 * @author: xuBiao
	 */
	List<CueiQuNongSuo> queryAvgByList3(BasePage page);
	
	
	
	

}
