/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    JinQingChuenChenServiceImpl.java
 * @Package:  com.zdxb.tcmcsm.pks.service.impl
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月19日 下午2:56:08
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zdxb.tcmcsm.pks.dao.BaseDao;
import com.zdxb.tcmcsm.pks.dao.JinQingChuenChenDao;
import com.zdxb.tcmcsm.pks.entity.JinQingChuenChenOne;
import com.zdxb.tcmcsm.pks.model.KyGyDbModel;
import com.zdxb.tcmcsm.pks.page.BasePage;
import com.zdxb.tcmcsm.pks.service.JinQingChuenChenService;

/**
 * @ClassName:  JinQingChuenChenServiceImpl
 * @Description:   金青醇沉第一阶段
 * @author: xuBiao
 * @date:  2019年6月19日 下午2:56:08
*/
@Service("JinQingChuenChenService")
public class JinQingChuenChenServiceImpl<T> extends BaseServiceImpl<T> implements JinQingChuenChenService<T> {
	
	@Autowired
	private JinQingChuenChenDao<T> jinQingChuenChenDao;

	/**   
	 * Title: selectAddEthanolOne  
	 * Description: 金青醇沉第一阶段 分页查询   
	 * @param page
	 * @return 
	 * @author:  xuBiao   
	 * @see com.zdxb.tcmcsm.pks.service.JinQingChuenChenService#selectAddEthanolOne(com.zdxb.tcmcsm.pks.page.BasePage) 
	 */
	@Override
	public List<JinQingChuenChenOne> selectAddEthanolOne(BasePage page) {
		
		Integer rowCount = jinQingChuenChenDao.selectAddEthanolOneByCount(page);
		page.getPager().setRowCount(rowCount);
		return jinQingChuenChenDao.selectAddEthanolOne(page);
	}

	/**   
	 * Title: getDao  
	 * Description: TODO   
	 * @return 
	 * @author:  xuBiao   
	 * @see com.zdxb.tcmcsm.pks.service.impl.BaseServiceImpl#getDao() 
	 */
	@Override
	public BaseDao<T> getDao() {
		return jinQingChuenChenDao;
	}

	/**   
	 * Title: export  
	 * Description: 金青醇沉第一阶段 导出   
	 * @param model
	 * @return 
	 * @author:  xuBiao   
	 * @see com.zdxb.tcmcsm.pks.service.JinQingChuenChenService#export(com.zdxb.tcmcsm.pks.model.KyGyDbModel) 
	 */
	@Override
	public List<JinQingChuenChenOne> exportOne(KyGyDbModel model) {
		
		return jinQingChuenChenDao.exportOne(model);
	}

	/**   
	 * Title: selectAddEthanolTow  
	 * Description: 金青醇沉第二阶段 分页查询      
	 * @param page
	 * @return 
	 * @author:  xuBiao   
	 * @see com.zdxb.tcmcsm.pks.service.JinQingChuenChenService#selectAddEthanolTow(com.zdxb.tcmcsm.pks.page.BasePage) 
	 */
	@Override
	public List<JinQingChuenChenOne> selectAddEthanolTow(BasePage page) {
		Integer rowCount = jinQingChuenChenDao.selectAddEthanolTowByCount(page);
		page.getPager().setRowCount(rowCount);
		return jinQingChuenChenDao.selectAddEthanolTow(page);
	}

	/**   
	 * Title: exportTow  
	 * Description: 金青醇沉第二阶段 导出      
	 * @param model
	 * @return 
	 * @author:  xuBiao   
	 * @see com.zdxb.tcmcsm.pks.service.JinQingChuenChenService#exportTow(com.zdxb.tcmcsm.pks.model.KyGyDbModel) 
	 */
	@Override
	public List<JinQingChuenChenOne> exportTow(KyGyDbModel model) {
		
		return jinQingChuenChenDao.exportTow(model);
	}

	/**   
	 * Title: selectAddEthanolThree  
	 * Description: 金青醇沉第三阶段 分页查询   
	 * @param page
	 * @return 
	 * @author:  xuBiao   
	 * @see com.zdxb.tcmcsm.pks.service.JinQingChuenChenService#selectAddEthanolThree(com.zdxb.tcmcsm.pks.page.BasePage) 
	 */
	@Override
	public List<JinQingChuenChenOne> selectAddEthanolThree(BasePage page) {
		Integer rowCount = jinQingChuenChenDao.selectAddEthanolThreeByCount(page);
		page.getPager().setRowCount(rowCount);
		return jinQingChuenChenDao.selectAddEthanolThree(page);
	}

	/**   
	 * Title: exportThree  
	 * Description: TODO   
	 * @param model
	 * @return 
	 * @author:  xuBiao   
	 * @see com.zdxb.tcmcsm.pks.service.JinQingChuenChenService#exportThree(com.zdxb.tcmcsm.pks.model.KyGyDbModel) 
	 */
	@Override
	public List<JinQingChuenChenOne> exportThree(KyGyDbModel model) {
		return jinQingChuenChenDao.exportThree(model);
	}

}
