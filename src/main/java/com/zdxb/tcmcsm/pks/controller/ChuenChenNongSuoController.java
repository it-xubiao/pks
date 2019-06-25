/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    ChuenChenNongSuoController.java
 * @Package:  com.zdxb.tcmcsm.pks.controller
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月14日 下午5:02:24
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.controller;

import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.util.CellRangeAddress;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zdxb.tcmcsm.pks.common.HtmlUtil;
import com.zdxb.tcmcsm.pks.common.excelUtil.ExcelUtil;
import com.zdxb.tcmcsm.pks.entity.ChuenChenNongSuo;
import com.zdxb.tcmcsm.pks.entity.JinQingChuenChen;
import com.zdxb.tcmcsm.pks.entity.KyGyDb;
import com.zdxb.tcmcsm.pks.model.KyGyDbModel;
import com.zdxb.tcmcsm.pks.service.BaseService;
import com.zdxb.tcmcsm.pks.service.KyGyDbService;

/**
 * @ClassName: ChuenChenNongSuoController
 * @Description: 醇沉浓缩前端控制器
 * @author: xuBiao
 * @date: 2019年6月14日 下午5:02:24
 */
@Controller
@RequestMapping("/ChuenChenNongSuo")
public class ChuenChenNongSuoController {

	/** 日志打印 */
	private static Logger logger = LoggerFactory.getLogger(KyGyDbController.class);

	@Autowired
	private KyGyDbService<?> kyGyDbService;

	@RequestMapping(value = { "/selectAlcoholPrecipitationConcentrationAvg" })
	public void selectAlcoholPrecipitationConcentrationAvg(KyGyDbModel model, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		List<ChuenChenNongSuo> dataList = kyGyDbService.queryAvgByList(model);

		// 设置页面数据
		HtmlUtil.writerJson(response, model.getPager().getRowCount(), dataList);

	}

	/**
	 * 复杂表头导出方法
	 * 
	 * @param model
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping(value = { "/export2" })
	public void ChuenChenNongSuoexport1(KyGyDbModel model, HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		List<KyGyDb> list = kyGyDbService.ChuenChenNongSuoexport(model);
		String excelName = "醇沉浓缩增添数据导出模板";
		String codedFileName = java.net.URLEncoder.encode(excelName, "UTF-8");

		// 声明String数组，并初始化元素（表头名称）
		// 第一行表头字段，合并单元格时字段跨几列就将该字段重复几次
		String[] excelHeader0 = { "批次号", "减压浓缩", "减压浓缩", "减压浓缩", "减压浓缩", "浸膏冷藏", "浸膏冷藏" };
		// “0,2,0,0” ===> “起始行，截止行，起始列，截止列”
		// 合并后有几列就声明几个数组
		String[] headnum0 = { "0,2,0,0", "0,0,1,4", "0,0,5,6" };

		// 第二行表头字段，其中的空的双引号是为了补全表格边框
		String[] excelHeader1 = { "真空度1", "真空度1", "压力", "压力", "真空度2", "真空度2" };
		// 合并单元格
		String[] headnum1 = { "1,1,1,2", "1,1,3,4", "1,1,5,6" };

		// 第三行表头字段
		String[] excelHeader2 = { "平均值1", "RSD2", "平均值3", "RSD4", "平均值5", "RSD6", "" };

		// “0,2,0,0” ===> “起始行，截止行，起始列，截止列”
		String[] headnum2 = { "2,2,1,1", "2,2,2,2", "2,2,3,3", "2,2,4,4", "2,2,5,5" };

		// 声明一个工作簿
		HSSFWorkbook wb = new HSSFWorkbook();
		// 生成一个表格
		HSSFSheet sheet = wb.createSheet("TAQIDataReport");

		// 生成一种样式
		HSSFCellStyle style = wb.createCellStyle();
		// 设置样式
		style.setFillForegroundColor(HSSFColor.SKY_BLUE.index);
		// 垂直居中
		style.setAlignment(HorizontalAlignment.CENTER);

		// 生成一种字体
		HSSFFont font = wb.createFont();
		// 设置字体
		font.setFontName("微软雅黑");
		font.setBold(true);
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
		// font2.setBoldweight(HSSFFont.COLOR_NORMAL);
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

			if (i >= 0 && i <= 3) {
				for (int j = 0; j < excelHeader0.length; j++) {
					// 从第j列开始填充
					cell = row.createCell(j);
					// 填充excelHeader1[j]第j个元素
					cell.setCellValue(excelHeader0[j]);
					cell.setCellStyle(style);
				}

			}
		}

		// 动态合并第一行单元格
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

			if (i >= 1 && i <= 6) {
				for (int j = 0; j < excelHeader1.length; j++) {
					// 从第j+1列开始填充
					cell = row.createCell(j + 1);
					// 填充excelHeader1[j]第j个元素
					cell.setCellValue(excelHeader1[j]);
					cell.setCellStyle(style);
				}
			}
		}

		// 动态合并第二行单元格
		for (int i = 0; i < headnum1.length; i++) {
			sheet.autoSizeColumn(i, true);
			String[] temp = headnum1[i].split(",");
			Integer startrow = Integer.parseInt(temp[0]);// 开始行
			Integer overrow = Integer.parseInt(temp[1]);// 结束行
			Integer startcol = Integer.parseInt(temp[2]);// 开始列
			Integer overcol = Integer.parseInt(temp[3]);// 结束列
			sheet.addMergedRegion(new CellRangeAddress(startrow, overrow, startcol, overcol));
		}
		// 第三行表头
		row = sheet.createRow(2);
		for (int i = 0; i < excelHeader2.length; i++) {

			HSSFCell cell = row.createCell(i + 2);
			cell.setCellValue(excelHeader2[i]);
			cell.setCellStyle(style);
			sheet.autoSizeColumn(i, true);// 自动调整宽度

			if (i > 1 && i <= 5) {
				for (int j = 0; j < excelHeader2.length; j++) {
					// 从第j+2列开始填充
					cell = row.createCell(j + 1);
					// 填充excelHeader1[j]第j个元素
					cell.setCellValue(excelHeader2[j]);
					cell.setCellStyle(style);
				}
			}
		}
		// 动态合并第三行单元格
		for (int i = 0; i < headnum2.length; i++) {

			sheet.autoSizeColumn(i, true);
			String[] temp = headnum2[i].split(",");
			Integer startrow = Integer.parseInt(temp[0]);
			Integer overrow = Integer.parseInt(temp[1]);
			Integer startcol = Integer.parseInt(temp[2]);
			Integer overcol = Integer.parseInt(temp[3]);
			if (!(startrow.equals(overrow) && startcol.equals(overcol))) {
				sheet.addMergedRegion(new CellRangeAddress(startrow, overrow, startcol, overcol));
			}
		}
		List<ChuenChenNongSuo> ccnsList = new ArrayList<>();

		for (KyGyDb date : list) {
			ChuenChenNongSuo ccns = new ChuenChenNongSuo();
			ccns.setBatchNumber(date.getBatchNumber());
			ccns.setJynsyl(date.getJynsyl());
			ccns.setJynsylRSD("");
			ccns.setJynszkd(date.getJynszkd());
			ccns.setJynszkdRSD("");
			ccns.setQgnczkd(date.getQgnczkd());
			ccns.setQgnczkdRSD("");
			ccnsList.add(ccns);
		}

		// 第四行数据
		for (int i = 0; i < ccnsList.size(); i++) {

			row = sheet.createRow(i + 3);
			ChuenChenNongSuo report = ccnsList.get(i);

			// 导入对应列的数据
			HSSFCell cell = row.createCell(0);
			cell.setCellValue(report.getBatchNumber());
			cell.setCellStyle(style2);

			HSSFCell cell1 = row.createCell(1);
			cell1.setCellValue(report.getJynszkd());
			cell1.setCellStyle(style2);

			HSSFCell cell2 = row.createCell(2);
			cell2.setCellValue(report.getJynszkdRSD());
			cell2.setCellStyle(style2);

			HSSFCell cell3 = row.createCell(3);
			cell3.setCellValue(report.getJynsyl());
			cell3.setCellStyle(style2);

			HSSFCell cell4 = row.createCell(4);
			cell4.setCellValue(report.getJynsylRSD());
			cell4.setCellStyle(style2);

			HSSFCell cell5 = row.createCell(5);
			cell5.setCellValue(report.getQgnczkd());
			cell5.setCellStyle(style2);

			HSSFCell cell6 = row.createCell(6);
			cell6.setCellValue(report.getQgnczkdRSD());
			cell6.setCellStyle(style2);

		}
		response.setContentType("application/octet-stream");
		String Name = "attachment;filename=" + codedFileName + ".xls";
		response.setHeader("Content-disposition", Name);// 默认Excel名称
		response.flushBuffer();
		wb.write(response.getOutputStream());

	}

	/**
	 * 单行表头导出方法
	 * 
	 * @param model
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping(value = { "/export1" })
	public void ChuenChenNongSuoexport(KyGyDbModel model, HttpServletRequest request, HttpServletResponse response)
			throws IOException {

		
		  // 导出的Excel头部，这个要根据自己项目改一下
	String[] headers3 = { "批次号", "平均值 ", "RSD", "平均值","RSD","平均值" ,"RSD"};

	String excelName = "醇沉浓缩增添数据导出模板";
	String codedFileName = java.net.URLEncoder.encode(excelName, "UTF-8");

	List<ChuenChenNongSuo> ccnsList = new ArrayList<>(); // 查询出来的数据，根据自己项目改一下
	List<KyGyDb> dataset = kyGyDbService.ChuenChenNongSuoexport(model);

	List<Map<String, Object>> listMap = new ArrayList<>();
	Map<String, Object>
		 map = new HashMap<>();for(KyGyDb date:dataset){
		ChuenChenNongSuo ccns = new ChuenChenNongSuo();
		ccns.setBatchNumber(date.getBatchNumber());
		ccns.setJynsyl(date.getJynsyl());
		ccns.setJynsylRSD("");
		ccns.setJynszkd(date.getJynszkd());
		ccns.setJynszkdRSD("");
		ccns.setQgnczkd(date.getQgnczkd());
		ccns.setQgnczkdRSD("");
		ccnsList.add(ccns);
	}

		 @SuppressWarnings("resource")
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 生成一个表格
			HSSFSheet sheet = workbook.createSheet();
			// 设置表格默认列宽度为15个字节
			sheet.setDefaultColumnWidth((short) 18);
			HSSFRow row = sheet.createRow(0);
		for (short i = 0; i < headers3.length; i++) {
				HSSFCell cell = row.createCell(i);
				HSSFRichTextString text = new HSSFRichTextString(headers3[i]);
				cell.setCellValue(text);
			}
			// 遍历集合数据，产生数据行
			Iterator<?> it = dataset.iterator();
			int index = 0;
			while (it.hasNext()) {
				index++;
				row = sheet.createRow(index);
				KyGyDb t = (KyGyDb) it.next();
				// 利用反射，根据javabean属性的先后顺序，动态调用getXxx()方法得到属性值
				Field[] fields = t.getClass().getDeclaredFields();
				for (short i = 0; i < fields.length; i++) {
					HSSFCell cell = row.createCell(i);
					Field field = fields[i];
					String fieldName = field.getName();
					String getMethodName = "get" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);
					try {
						Class<? extends KyGyDb> tCls = t.getClass();
						Method getMethod = tCls.getMethod(getMethodName, new Class[] {});
						Object value = getMethod.invoke(t, new Object[] {});
						String textValue = null;

						if (value instanceof Date) {
							Date date = (Date) value;
							SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
							textValue = sdf.format(date);
						} else {
							// 其它数据类型都当作字符串简单处理
							textValue = value.toString();
						}

						HSSFRichTextString richString = new HSSFRichTextString(textValue);
						HSSFFont font3 = workbook.createFont();
						font3.setColor(HSSFColor.BLUE.index);// 定义Excel数据颜色
						richString.applyFont(font3);
						cell.setCellValue(richString);

					} catch (SecurityException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (NoSuchMethodException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (IllegalArgumentException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (IllegalAccessException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (InvocationTargetException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}
			response.setContentType("application/octet-stream");
			//response.setHeader("Content-disposition", "attachment;filename=createList.xls");// 默认Excel名称
			String Name ="attachment;filename="+excelName +".xls";
			response.setHeader("Content-disposition", Name);// 默认Excel名称
			response.flushBuffer();
			workbook.write(response.getOutputStream());

	}

}
