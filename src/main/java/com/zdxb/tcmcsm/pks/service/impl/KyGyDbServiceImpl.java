/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    KyGyDbServiceImpl.java
 * @Package:  com.zdxb.tcmcsm.pks.service.impl
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月3日 上午11:39:57
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.zdxb.tcmcsm.pks.entity.CueiQuNongSuo;
import com.zdxb.tcmcsm.pks.entity.JinQingChuenChen;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zdxb.tcmcsm.pks.dao.BaseDao;
import com.zdxb.tcmcsm.pks.dao.KyGyDbDao;
import com.zdxb.tcmcsm.pks.entity.ChuenChenNongSuo;
import com.zdxb.tcmcsm.pks.entity.KyGyDb;
import com.zdxb.tcmcsm.pks.model.KyGyDbModel;
import com.zdxb.tcmcsm.pks.page.BasePage;
import com.zdxb.tcmcsm.pks.service.KyGyDbService;

/**
 * @ClassName: KyGyDbServiceImpl
 * @Description: TODO
 * @author: xuBiao
 * @date: 2019年6月3日 上午11:39:57
 */
@Service("KyGyDbService")
public class KyGyDbServiceImpl<T> extends BaseServiceImpl<T> implements KyGyDbService<T> {

	@Autowired
	private KyGyDbDao<T> kyGyDbDao;

	/**
	 * Title: getDao Description: TODO
	 * 
	 * @return
	 * @author: xuBiao
	 * @see com.zdxb.tcmcsm.pks.service.impl.BaseServiceImpl#getDao()
	 */
	@Override
	public BaseDao<T> getDao() {
		// TODO Auto-generated method stub
		return kyGyDbDao;
	}

	/**
	 * Title: selectStageName Description: TODO
	 * 
	 * @return
	 * @author: xuBiao
	 * @see com.zdxb.tcmcsm.pks.service.KyGyDbService#selectStageName()
	 */
	@Override
	public List<String> selectStageName() {
		List<String> str = null;
		str = kyGyDbDao.selectStageName();
		return str;
	}

	/**
	 * Title: export Description: 导出
	 * 
	 * @param model
	 * @return
	 * @author: xuBiao
	 * @see com.zdxb.tcmcsm.pks.service.KyGyDbService#export(com.zdxb.tcmcsm.pks.entity.KyGyDb)
	 */
	@Override
	public List<KyGyDbModel> export(KyGyDbModel model) {
		return kyGyDbDao.export(model);
	}

	/**
	 * Title: selectDecompressionConcentration Description: 查询减压浓缩
	 * 
	 * @return
	 * @author: xuBiao
	 * @see com.zdxb.tcmcsm.pks.service.KyGyDbService#selectDecompressionConcentration()
	 */
	@Override
	public List<Map<String, Object>> selectDecompressionConcentration(KyGyDbModel model) {
		List<Map<String, Object>> list = new ArrayList<>();
		Map<String, Object> map = new HashMap<>();

		map.put("decompressionConcentrationVacuumDegree", kyGyDbDao.decompressionConcentrationVacuumDegree(model));

		map.put("decompressionConcentrationPressure", kyGyDbDao.decompressionConcentrationPressure(model));

		map.put("extractColdstorageVacuumDegree", kyGyDbDao.extractColdstorageVacuumDegree(model));

		list.add(map);

		return list;
	}

	/**
	 * Title: queryAvgByList Description: 醇沉浓缩平均值
	 * 
	 * @param model
	 * @return
	 * @author: xuBiao
	 * @see com.zdxb.tcmcsm.pks.service.KyGyDbService#queryAvgByList(com.zdxb.tcmcsm.pks.model.KyGyDbModel)
	 */
	@Override
	public List<ChuenChenNongSuo> queryAvgByList(BasePage page) {

		Integer rowCount = kyGyDbDao.queryAvgByCount(page);
		page.getPager().setRowCount(rowCount);
		return kyGyDbDao.queryAvgByList(page);
	}

	/**
	 * Title: ChuenChenNongSuoexport Description: TODO
	 * 
	 * @param model
	 * @return
	 * @author: xuBiao
	 * @see com.zdxb.tcmcsm.pks.service.KyGyDbService#ChuenChenNongSuoexport(com.zdxb.tcmcsm.pks.model.KyGyDbModel)
	 */
	@Override
	public List<KyGyDb> ChuenChenNongSuoexport(KyGyDbModel model) {
		return kyGyDbDao.ChuenChenNongSuoexport(model);
	}
	
	/**
	 * 获取醇沉浓缩相关数据(02)
	 * Title: queryAvgByList3  
	 * Description: TODO   
	 * @param page
	 * @return 
	 * @author:  xuBiao   
	 * @see com.zdxb.tcmcsm.pks.service.KyGyDbService#queryAvgByList3(com.zdxb.tcmcsm.pks.page.BasePage)
	 */
	@Override
	public List<CueiQuNongSuo> queryAvgByList3(BasePage page) {
		Integer rowCount = kyGyDbDao.queryAvgByCount(page);
		page.getPager().setRowCount(rowCount);
		return kyGyDbDao.queryAvgByList3(page);
	}

	/**
	 * Title: export Description: 复杂表头测试
	 * 
	 * @param list
	 * @return
	 * @author: xuBiao
	 * @see com.zdxb.tcmcsm.pks.service.KyGyDbService#export(java.util.List)
	 */
	@Override
	public HSSFWorkbook export(List<ChuenChenNongSuo> list) {

		// 声明String数组，并初始化元素（表头名称）
		// 第一行表头字段，合并单元格时字段跨几列就将该字段重复几次
		String[] excelHeader0 = { "城市名称", "监测点", "污染物浓度及空气质量分指数（AQI）", "污染物浓度及空气质量分指数（AQI）", "污染物浓度及空气质量分指数（AQI）",
				"污染物浓度及空气质量分指数（AQI）", "污染物浓度及空气质量分指数（AQI）", "污染物浓度及空气质量分指数（AQI）", "污染物浓度及空气质量分指数（AQI）",
				"污染物浓度及空气质量分指数（AQI）", "污染物浓度及空气质量分指数（AQI）", "污染物浓度及空气质量分指数（AQI）", "污染物浓度及空气质量分指数（AQI）",
				"污染物浓度及空气质量分指数（AQI）", "空气质量指数（AQI）", "首要污染物", "空气质量指数级别", "空气质量指数类别", "空气质量指数类别" };
		// “0,2,0,0” ===> “起始行，截止行，起始列，截止列”
		String[] headnum0 = { "0,2,0,0", "0,2,1,1", "0,0,2,13", "0,2,14,14", "0,2,15,15", "0,2,16,16", "0,1,17,18" };

		// 第二行表头字段，其中的空的双引号是为了补全表格边框
		String[] excelHeader1 = { "二氧化硫（SO₂）24小时平均", "二氧化硫（SO₂）24小时平均", "二氧化氮（NO₂）24小时平均", "二氧化氮（NO₂）24小时平均",
				"颗粒物（粒径小于等于10μm）24小时平均", "颗粒物（粒径小于等于10μm）24小时平均", "一氧化碳（CO）24小时平均", "一氧化碳（CO）24小时平均", "臭氧（O₃）最大8小时平均",
				"臭氧（O₃）最大8小时平均", "颗粒物（粒径小于等于2.5μm）24小时平均", "颗粒物（粒径小于等于2.5μm）24小时平均", "", "", "", "", "" };
		// 合并单元格
		String[] headnum1 = { "1,1,2,3", "1,1,4,5", "1,1,6,7", "1,1,8,9", "1,1,10,11", "1,1,12,13" };

		// 第三行表头字段
		String[] excelHeader2 = { "", "", "浓度/（μg/m3）", "分指数", "浓度/（μg/m3）", "分指数", "浓度/（μg/m3）", "分指数", "浓度/（μg/m3）",
				"分指数", "浓度/（μg/m3）", "分指数", "浓度/（μg/m3）", "分指数", "", "类别", "颜色" };

		String[] headnum2 = { "2,2,2,2", "2,2,3,3", "2,2,4,4", "2,2,5,5", "2,2,6,6", "2,2,7,7", "2,2,8,8", "2,2,9,9",
				"2,2,10,10", "2,2,11,11", "2,2,12,12", "2,2,13,13", "2,2,17,17", "2,2,18,18" };

		// 声明一个工作簿
		HSSFWorkbook wb = new HSSFWorkbook();
		// 生成一个表格
		HSSFSheet sheet = wb.createSheet("TAQIDataReport");

		// 生成一种样式
		HSSFCellStyle style = wb.createCellStyle();
		// 设置样式
		style.setFillForegroundColor(HSSFColor.SKY_BLUE.index);

		// 生成一种字体
		HSSFFont font = wb.createFont();
		// 设置字体
		font.setFontName("微软雅黑");
		// 设置字体大小
		font.setFontHeightInPoints((short) 12);

		// 在样式中引用这种字体
		style.setFont(font);

		// 生成并设置另一个样式
		HSSFCellStyle style2 = wb.createCellStyle();
		style2.setFillForegroundColor(HSSFColor.LIGHT_YELLOW.index);

		// 生成另一种字体2
		HSSFFont font2 = wb.createFont();
		// 设置字体
		font2.setFontName("微软雅黑");
		// 设置字体大小
		font2.setFontHeightInPoints((short) 12);
		// 字体加粗
		// font2.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		// 在样式2中引用这种字体
		style2.setFont(font2);

		// 生成表格的第一行
		// 第一行表头
		HSSFRow row = sheet.createRow(0);
		for (int i = 0; i < excelHeader0.length; i++) {

			sheet.autoSizeColumn(i, true);// 根据字段长度自动调整列的宽度
			HSSFCell cell = row.createCell(i);
			cell.setCellValue(excelHeader0[i]);
			cell.setCellStyle(style);

			System.out.println(excelHeader0[i]);

			if (i >= 0 && i <= 18) {
				for (int j = 0; j < excelHeader0.length; j++) {
					// 从第j列开始填充
					cell = row.createCell(j);
					// 填充excelHeader1[j]第j个元素
					cell.setCellValue(excelHeader0[j]);
					cell.setCellStyle(style);
				}

			}
		}

		// 动态合并单元格
		for (int i = 0; i < headnum0.length; i++) {
			sheet.autoSizeColumn(i, true);
			String[] temp = headnum0[i].split(",");
			Integer startrow = Integer.parseInt(temp[0]);
			Integer overrow = Integer.parseInt(temp[1]);
			Integer startcol = Integer.parseInt(temp[2]);
			Integer overcol = Integer.parseInt(temp[3]);
			sheet.addMergedRegion(new CellRangeAddress(startrow, overrow, startcol, overcol));
		}
		// 第二行表头
		row = sheet.createRow(1);
		for (int i = 0; i < excelHeader1.length; i++) {

			sheet.autoSizeColumn(i, true);// 自动调整宽度
			HSSFCell cell = row.createCell(i + 1);
			cell.setCellValue(excelHeader1[i]);
			cell.setCellStyle(style);

			if (i >= 2 && i <= 18) {
				for (int j = 0; j < excelHeader1.length; j++) {
					// 从第j+1列开始填充
					cell = row.createCell(j + 2);
					// 填充excelHeader1[j]第j个元素
					cell.setCellValue(excelHeader1[j]);
					cell.setCellStyle(style);
				}
			}
		}

		// 动态合并单元格
		for (int i = 0; i < headnum1.length; i++) {

			sheet.autoSizeColumn(i, true);
			String[] temp = headnum1[i].split(",");
			Integer startrow = Integer.parseInt(temp[0]);
			Integer overrow = Integer.parseInt(temp[1]);
			Integer startcol = Integer.parseInt(temp[2]);
			Integer overcol = Integer.parseInt(temp[3]);
			sheet.addMergedRegion(new CellRangeAddress(startrow, overrow, startcol, overcol));
		}
		// 第三行表头
		row = sheet.createRow(2);
		for (int i = 0; i < excelHeader2.length; i++) {

			HSSFCell cell = row.createCell(i + 2);
			cell.setCellValue(excelHeader2[i]);
			cell.setCellStyle(style);
			// System.out.println(excelHeader2[i]);
			sheet.autoSizeColumn(i, true);// 自动调整宽度

			if (i > 1 && i <= 18) {
				for (int j = 0; j < excelHeader2.length; j++) {
					// 从第j+2列开始填充
					cell = row.createCell(j);
					// 填充excelHeader1[j]第j个元素
					cell.setCellValue(excelHeader2[j]);
					cell.setCellStyle(style);
				}
			}
		}
		// 动态合并单元格
		for (int i = 0; i < headnum2.length; i++) {

			sheet.autoSizeColumn(i, true);
			String[] temp = headnum2[i].split(",");
			Integer startrow = Integer.parseInt(temp[0]);
			Integer overrow = Integer.parseInt(temp[1]);
			Integer startcol = Integer.parseInt(temp[2]);
			Integer overcol = Integer.parseInt(temp[3]);
			sheet.addMergedRegion(new CellRangeAddress(startrow, overrow, startcol, overcol));
		}

		// 第四行数据
		for (int i = 0; i < list.size(); i++) {

			row = sheet.createRow(i + 3);
			ChuenChenNongSuo report = list.get(i);

			// 导入对应列的数据
			HSSFCell cell = row.createCell(0);
			cell.setCellValue(report.getBatchNumber());
			cell.setCellStyle(style2);

			HSSFCell cell1 = row.createCell(1);
			cell1.setCellValue(report.getJynsyl());
			cell1.setCellStyle(style2);

			HSSFCell cell2 = row.createCell(2);
			cell2.setCellValue(report.getJynsylRSD());
			cell2.setCellStyle(style2);
			HSSFCell cell3 = row.createCell(3);
			cell3.setCellValue(report.getJynszkd());
			cell3.setCellStyle(style2);

			HSSFCell cell4 = row.createCell(4);
			cell4.setCellValue(report.getJynszkdRSD());
			cell4.setCellStyle(style2);
			HSSFCell cell5 = row.createCell(5);
			cell5.setCellValue(report.getOrder());
			cell5.setCellStyle(style2);

			HSSFCell cell6 = row.createCell(6);
			cell6.setCellValue(report.getQgnczkdRSD());
			cell6.setCellStyle(style2);

		}
		return wb;
	}

	/**   
	 * Title: queryByList1  
	 * Description: 金青醇沉   
	 * @param page
	 * @return 
	 * @author:  xuBiao   
	 * @see com.zdxb.tcmcsm.pks.service.KyGyDbService#queryByList1(com.zdxb.tcmcsm.pks.page.BasePage) 
	 */
	@Override
	public List<JinQingChuenChen> queryByList1(BasePage page) {
		Integer rowCount = kyGyDbDao.queryAvgByCount(page);
		page.getPager().setRowCount(rowCount);
		return  null ;//kyGyDbDao.queryAvgByList3(page);
	}

}
