/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    KyGyDbService.java
 * @Package:  com.zdxb.tcmcsm.pks.service
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月3日 上午11:39:24
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.service;

import java.util.List;
import com.zdxb.tcmcsm.pks.entity.JinQingChuenChenOne;
import com.zdxb.tcmcsm.pks.model.KyGyDbModel;
import com.zdxb.tcmcsm.pks.page.BasePage;

/**
 * @ClassName:  KyGyDbService
 * @Description:   TODO
 * @author: xuBiao
 * @date:  2019年6月3日 上午11:39:24
*/
public interface JinQingChuenChenService<T> extends BaseService<T> {

	
	/**
	 * 金青醇沉 加醇阶段1
	 * @Title: queryByList1
	 * @Description: 金青醇沉
	 * @param page
	 * @return
	 * @author: xuBiao
	 */
	List<JinQingChuenChenOne> selectAddEthanolOne(BasePage page);
	
	/**
	 * 
	 * @Title: export
	 * @Description: 金青醇沉 加醇阶段1 导出
	 * @param model
	 * @return
	 * @author: xuBiao
	 */
	List<JinQingChuenChenOne> exportOne(KyGyDbModel model);
	
	/**
	 * 
	 * @Title: selectAddEthanolTow
	 * @Description: 金青醇沉 加醇阶段2
	 * @param page
	 * @return
	 * @author: xuBiao
	 */
	List<JinQingChuenChenOne> selectAddEthanolTow(BasePage page);
	
	/**
	 * 
	 * @Title: export
	 * @Description: 金青醇沉 加醇阶段2 导出
	 * @param model
	 * @return
	 * @author: xuBiao
	 */
	List<JinQingChuenChenOne> exportTow(KyGyDbModel model);
	
	
	/**
	 * 
	 * @Title: selectAddEthanolTow
	 * @Description: 金青醇沉 加醇阶段2
	 * @param page
	 * @return
	 * @author: xuBiao
	 */
	List<JinQingChuenChenOne> selectAddEthanolThree(BasePage page);
	
	/**
	 * 
	 * @Title: exportThree
	 * @Description: 金青醇沉 加醇阶段3 导出
	 * @param model
	 * @return
	 * @author: xuBiao
	 */
	List<JinQingChuenChenOne> exportThree(KyGyDbModel model);
	
	
	
	

}
