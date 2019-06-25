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
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.zdxb.tcmcsm.pks.entity.ChuenChenNongSuo;
import com.zdxb.tcmcsm.pks.entity.CueiQuNongSuo;
import com.zdxb.tcmcsm.pks.entity.JinQingChuenChen;
import com.zdxb.tcmcsm.pks.entity.KyGyDb;
import com.zdxb.tcmcsm.pks.model.KyGyDbModel;
import com.zdxb.tcmcsm.pks.page.BasePage;

/**
 * @ClassName:  KyGyDbService
 * @Description:   TODO
 * @author: xuBiao
 * @date:  2019年6月3日 上午11:39:24
*/
public interface KyGyDbService<T> extends BaseService<T> {
	
	/**
	 * 获取阶段名称
	 * @Title: selectStageName
	 * @Description: TODO
	 * @return
	 * @author: xuBiao
	 */
	public List<String> selectStageName();
	
	/**
	 * 导出
	 * @Title: export
	 * @Description: TODO
	 * @param model
	 * @return
	 * @author: xuBiao
	 */
	public List<KyGyDbModel> export(KyGyDbModel model);
	
	/**
	 * 查询减压浓缩
	 * @Title: selectDecompressionConcentration
	 * @Description: TODO
	 * @return
	 * @author: xuBiao
	 */
	public  List<Map<String, Object>> selectDecompressionConcentration(KyGyDbModel model);
	
	/**
	 * 
	 * @Title: queryAvgByList
	 * @Description: TODO
	 * @param model
	 * @return
	 * @author: xuBiao
	 */
	public List<ChuenChenNongSuo> queryAvgByList(BasePage page);
	
	/**
	 * 醇沉浓缩导出
	 * @Title: ChuenChenNongSuoexport
	 * @Description: TODO
	 * @param model
	 * @return
	 * @author: xuBiao
	 */
	List<KyGyDb> ChuenChenNongSuoexport(KyGyDbModel model);

	/**
	 * 获取醇沉浓缩数据
	 * @Title: queryAvgByList3
	 * @Description: TODO
	 * @param page
	 * @return
	 * @author: xuBiao
	 */
	List<CueiQuNongSuo> queryAvgByList3(BasePage page);
	
	/**
	 * 复杂表头测试
	 * @Title: export
	 * @Description: TODO
	 * @param list
	 * @return
	 * @author: xuBiao
	 */
	public HSSFWorkbook export(List<ChuenChenNongSuo> list);
	
	/**
	 * 金青醇沉
	 * @Title: queryByList1
	 * @Description: 金青醇沉
	 * @param page
	 * @return
	 * @author: xuBiao
	 */
	List<JinQingChuenChen> queryByList1(BasePage page);
	
	

}
