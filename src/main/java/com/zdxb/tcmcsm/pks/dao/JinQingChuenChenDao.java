/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    JinQingChuenChenDao.java
 * @Package:  com.zdxb.tcmcsm.pks.dao
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月19日 下午2:57:59
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.zdxb.tcmcsm.pks.entity.JinQingChuenChenOne;
import com.zdxb.tcmcsm.pks.entity.KyGyDb;
import com.zdxb.tcmcsm.pks.model.KyGyDbModel;
import com.zdxb.tcmcsm.pks.page.BasePage;

/**
 * @ClassName:  JinQingChuenChenDao
 * @Description:   TODO
 * @author: xuBiao
 * @date:  2019年6月19日 下午2:57:59
*/
@Mapper
public interface JinQingChuenChenDao<T> extends BaseDao<T> {
	
	/**
	 * 查询加醇阶段1
	 * @Title: queryByList1
	 * @Description: 查询金青醇沉数据
	 * @param page
	 * @return
	 * @author: xuBiao
	 */
	List<JinQingChuenChenOne> selectAddEthanolOne(BasePage page);
	
	/**
	 * 金青醇沉第一阶段Count
	 * @Title: selectAddEthanolOneByCount
	 * @Description: 获取数据Count
	 * @param page
	 * @return
	 * @author: xuBiao
	 */
	Integer selectAddEthanolOneByCount(BasePage page);
	
	/**
	 * 金青醇沉第一阶段导出
	 * @Title: export
	 * @Description: 导出
	 * @param model
	 * @return
	 * @author: xuBiao
	 */
	List<JinQingChuenChenOne> exportOne(KyGyDbModel model);
	
	/**
	 * 查询加醇阶段2
	 * @Title: queryByList1
	 * @Description: 查询金青醇沉数据
	 * @param page
	 * @return
	 * @author: xuBiao
	 */
	List<JinQingChuenChenOne> selectAddEthanolTow(BasePage page);
	
	/**
	 * 金青醇沉第二阶段Count
	 * @Title: selectAddEthanolOneByCount
	 * @Description: 获取数据Count
	 * @param page
	 * @return
	 * @author: xuBiao
	 */
	Integer selectAddEthanolTowByCount(BasePage page);
	
	/**
	 * 金青醇沉第二阶段导出
	 * @Title: export
	 * @Description: 导出
	 * @param model
	 * @return
	 * @author: xuBiao
	 */
	List<JinQingChuenChenOne> exportTow(KyGyDbModel model);
	
	/**
	 * 
	 * @Title: selectAddEthanolThreeByCount
	 * @Description: 金青醇沉第三阶段Count
	 * @param page
	 * @return
	 * @author: xuBiao
	 */
	Integer selectAddEthanolThreeByCount(BasePage page);
	
	/**
	 * 查询加醇阶段3
	 * @Title: selectAddEthanolTow
	 * @Description: 查询加醇阶段3
	 * @param page
	 * @return
	 * @author: xuBiao
	 */
	List<JinQingChuenChenOne> selectAddEthanolThree(BasePage page);
	
	/**
	 * 金青醇沉第二阶段导出
	 * @Title: export
	 * @Description: 导出
	 * @param model
	 * @return
	 * @author: xuBiao
	 */
	List<JinQingChuenChenOne> exportThree(KyGyDbModel model);

}
