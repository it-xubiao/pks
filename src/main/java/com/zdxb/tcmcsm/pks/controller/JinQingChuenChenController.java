/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    KyGyDbController.java
 * @Package:  com.zdxb.tcmcsm.pks.controller
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月3日 上午11:51:09
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zdxb.tcmcsm.pks.common.HtmlUtil;
import com.zdxb.tcmcsm.pks.entity.ChuenChenNongSuo;
import com.zdxb.tcmcsm.pks.entity.JinQingChuenChenOne;
import com.zdxb.tcmcsm.pks.model.KyGyDbModel;
import com.zdxb.tcmcsm.pks.service.JinQingChuenChenService;

/**
 * @ClassName: KyGyDbController
 * @Description: 金青醇沉
 * @author: xuBiao
 * @date: 2019年6月3日 上午11:51:09
 */
@Controller
@RequestMapping("/JinQingChuenChen")
public class JinQingChuenChenController {
	

	@Autowired
	private JinQingChuenChenService<?> jinQingChuenChenService;

	
	/**
	 * 
	 * @Title: listAll
	 * @Description: 查询金青醇沉第一阶段数据
	 * @param model
	 * @param request
	 * @param response
	 * @param page
	 * @author: xuBiao
	 */
	@RequestMapping(value = { "/listOne" })
	@ResponseBody
	public void listAll(KyGyDbModel model, HttpServletRequest request, HttpServletResponse response, String page) {
		
		// 加醇阶段1
		List<JinQingChuenChenOne> dataList = jinQingChuenChenService.selectAddEthanolOne(model);
		
		// 设置页面数据
		HtmlUtil.writerJson(response, model.getPager().getRowCount(), dataList);

	}
	
	/**
	 * 金青醇沉第一阶段 复杂表头导出方法
	 * 
	 * @param model
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping(value = { "/exportOne" })
	public void exportOne(KyGyDbModel model, HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		List<JinQingChuenChenOne> list = jinQingChuenChenService.exportOne(model);
		String excelName = "金青醇沉第一阶段";
		String codedFileName = java.net.URLEncoder.encode(excelName, "UTF-8");

		// 声明String数组，并初始化元素（表头名称）
		// 第一行表头字段，合并单元格时字段跨几列就将该字段重复几次
		String[] excelHeader0 = { "批 次 号", " 罐  号 ", "金青醇沉第一阶段", "金青醇沉第一阶段", "金青醇沉第一阶段", "金青醇沉第一阶段", "时 间", "时 间", "时 间", "时 间" };
		// “0,2,0,0” ===> “起始行，截止行，起始列，截止列”
		// 合并后有几列就声明几个数组
		String[] headnum0 = { "0,1,0,0", "0,1,1,1", "0,0,2,5", "0,1,6,9" };

		// 第二行表头字段，其中的空的双引号是为了补全表格边框
		String[] excelHeader1 = {"", " 罐上部温度(℃) ", " 罐下部温度(℃) ", " 乙醇流量计累积量(m3) ", " 乙醇流量计流速(m3/h) " };
		// 合并单元格
		String[] headnum1 = { "1,1,2,2", "1,1,3,3", "1,1,4,4", "1,1,5,5" };

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

			if (i >= 0 && i <= 4) {
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
			//sheet.addMergedRegion(new CellRangeAddress(startrow, overrow, startcol, overcol));
			if (!(startrow.equals(overrow) && startcol.equals(overcol))) {
				sheet.addMergedRegion(new CellRangeAddress(startrow, overrow, startcol, overcol));
			}
		}
		List<ChuenChenNongSuo> ccnsList = new ArrayList<>();

		// 第四行数据
		for (int i = 0; i < list.size(); i++) {

			row = sheet.createRow(i + 2);
			JinQingChuenChenOne report = list.get(i);
			// 导入对应列的数据
			HSSFCell cell = row.createCell(0);
			cell.setCellValue(report.getBatchNumber());
			cell.setCellStyle(style2);

			HSSFCell cell1 = row.createCell(1);
			cell1.setCellValue(report.getDeviceCode());
			cell1.setCellStyle(style2);

			HSSFCell cell2 = row.createCell(2);
			cell2.setCellValue(report.getUpperTemperature());
			cell2.setCellStyle(style2);

			HSSFCell cell3 = row.createCell(3);
			cell3.setCellValue(report.getLowerTemperature());
			cell3.setCellStyle(style2);

			HSSFCell cell4 = row.createCell(4);
			cell4.setCellValue(report.getCumulativeAmount());
			cell4.setCellStyle(style2);

			HSSFCell cell5 = row.createCell(5);
			cell5.setCellValue(report.getCurrentSpeed());
			cell5.setCellStyle(style2);

			if (report.getCurt() instanceof Date) {
				HSSFCell cell6 = row.createCell(6);
				cell6.setCellValue(report.getCurt());
				cell6.setCellStyle(style2);
				Date date = (Date) report.getCurt();
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				cell6.setCellValue(sdf.format(date));
				//textValue = sdf.format(date);
			} 
		}
		response.setContentType("application/octet-stream");
		String Name = "attachment;filename=" + codedFileName + ".xls";
		response.setHeader("Content-disposition", Name);// 默认Excel名称
		response.flushBuffer();
		wb.write(response.getOutputStream());

	}
	
	/**
	 * 
	 * @Title: listAll
	 * @Description: 金青醇沉第二阶段
	 * @param model
	 * @param request
	 * @param response
	 * @param page
	 * @author: xuBiao
	 */
	@RequestMapping(value = { "/listTow" })
	@ResponseBody
	public void listAllTow(KyGyDbModel model, HttpServletRequest request, HttpServletResponse response, String page) {
		
		// 加醇阶段1
		List<JinQingChuenChenOne> dataList = jinQingChuenChenService.selectAddEthanolTow(model);
		
		// 设置页面数据
		HtmlUtil.writerJson(response, model.getPager().getRowCount(), dataList);

	}
	
	/**
	 * 金青醇沉第二阶段 复杂表头导出方法
	 * 
	 * @param model
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping(value = { "/exportTow" })
	public void exportTow(KyGyDbModel model, HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		List<JinQingChuenChenOne> list = jinQingChuenChenService.exportTow(model);
		String excelName = "金青醇沉第二阶段";
		String codedFileName = java.net.URLEncoder.encode(excelName, "UTF-8");

		// 声明String数组，并初始化元素（表头名称）
		// 第一行表头字段，合并单元格时字段跨几列就将该字段重复几次
		String[] excelHeader0 = { " 批 次 号 ", " 罐  号 ", "金青醇沉第二阶段", "金青醇沉第二阶段", "金青醇沉第二阶段", "金青醇沉第二阶段", "时 间", "时 间", "时 间", "时 间" };
		// “0,2,0,0” ===> “起始行，截止行，起始列，截止列”
		// 合并后有几列就声明几个数组
		String[] headnum0 = { "0,1,0,0", "0,1,1,1", "0,0,2,5", "0,1,6,9" };

		// 第二行表头字段，其中的空的双引号是为了补全表格边框
		String[] excelHeader1 = {"", " 罐上部温度(℃) ", " 罐下部温度(℃) ", " 乙醇流量计累积量(m3) ", " 乙醇流量计流速(m3/h) " };
		// 合并单元格
		String[] headnum1 = { "1,1,2,2", "1,1,3,3", "1,1,4,4", "1,1,5,5" };

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

			if (i >= 0 && i <= 4) {
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
			//sheet.addMergedRegion(new CellRangeAddress(startrow, overrow, startcol, overcol));
			if (!(startrow.equals(overrow) && startcol.equals(overcol))) {
				sheet.addMergedRegion(new CellRangeAddress(startrow, overrow, startcol, overcol));
			}
		}
		List<ChuenChenNongSuo> ccnsList = new ArrayList<>();

		// 第四行数据
		for (int i = 0; i < list.size(); i++) {

			row = sheet.createRow(i + 2);
			JinQingChuenChenOne report = list.get(i);
			// 导入对应列的数据
			HSSFCell cell = row.createCell(0);
			cell.setCellValue(report.getBatchNumber());
			cell.setCellStyle(style2);

			HSSFCell cell1 = row.createCell(1);
			cell1.setCellValue(report.getDeviceCode());
			cell1.setCellStyle(style2);

			HSSFCell cell2 = row.createCell(2);
			cell2.setCellValue(report.getUpperTemperature());
			cell2.setCellStyle(style2);

			HSSFCell cell3 = row.createCell(3);
			cell3.setCellValue(report.getLowerTemperature());
			cell3.setCellStyle(style2);

			HSSFCell cell4 = row.createCell(4);
			cell4.setCellValue(report.getCumulativeAmount());
			cell4.setCellStyle(style2);

			HSSFCell cell5 = row.createCell(5);
			cell5.setCellValue(report.getCurrentSpeed());
			cell5.setCellStyle(style2);

			if (report.getCurt() instanceof Date) {
				HSSFCell cell6 = row.createCell(6);
				cell6.setCellValue(report.getCurt());
				cell6.setCellStyle(style2);
				Date date = (Date) report.getCurt();
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				cell6.setCellValue(sdf.format(date));
				//textValue = sdf.format(date);
			} 
		}
		response.setContentType("application/octet-stream");
		String Name = "attachment;filename=" + codedFileName + ".xls";
		response.setHeader("Content-disposition", Name);// 默认Excel名称
		response.flushBuffer();
		wb.write(response.getOutputStream());

	}
	
	/**
	 *  金青醇沉第三阶段
	 * @Title: listAllThree
	 * @Description: 金青醇沉第三阶段分页查询
	 * @param model
	 * @param request
	 * @param response
	 * @param page
	 * @author: xuBiao
	 */
	@RequestMapping(value = { "/listThree" })
	@ResponseBody
	public void listAllThree(KyGyDbModel model, HttpServletRequest request, HttpServletResponse response, String page) {
		
		// 加醇阶段1
		List<JinQingChuenChenOne> dataList = jinQingChuenChenService.selectAddEthanolThree(model);
		
		// 设置页面数据
		HtmlUtil.writerJson(response, model.getPager().getRowCount(), dataList);

	}
	
	/**
	 * 
	 * @Title: exportTow
	 * @Description: 金青醇沉第三阶段 复杂表头导出方法
	 * @param model
	 * @param request
	 * @param response
	 * @throws IOException
	 * @author: xuBiao
	 */
	@RequestMapping(value = { "/exportThree" })
	public void exportThree(KyGyDbModel model, HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		List<JinQingChuenChenOne> list = jinQingChuenChenService.exportThree(model);
		String excelName = "金青醇沉第三阶段";
		String codedFileName = java.net.URLEncoder.encode(excelName, "UTF-8");

		// 声明String数组，并初始化元素（表头名称）
		// 第一行表头字段，合并单元格时字段跨几列就将该字段重复几次
		String[] excelHeader0 = { " 批 次 号 ", " 罐  号 ", "金青醇沉第三阶段", "金青醇沉第三阶段", "金青醇沉第三阶段", "金青醇沉第三阶段", "时 间", "时 间", "时 间", "时 间" };
		// “0,2,0,0” ===> “起始行，截止行，起始列，截止列”
		// 合并后有几列就声明几个数组
		String[] headnum0 = { "0,1,0,0", "0,1,1,1", "0,0,2,5", "0,1,6,9" };

		// 第二行表头字段，其中的空的双引号是为了补全表格边框
		String[] excelHeader1 = {"", " 罐上部温度(℃) ", " 罐下部温度(℃) ", " 乙醇流量计累积量(m3) ", " 乙醇流量计流速(m3/h) " };
		// 合并单元格
		String[] headnum1 = { "1,1,2,2", "1,1,3,3", "1,1,4,4", "1,1,5,5" };

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

			if (i >= 0 && i <= 4) {
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
			if (!(startrow.equals(overrow) && startcol.equals(overcol))) {
				sheet.addMergedRegion(new CellRangeAddress(startrow, overrow, startcol, overcol));
			}
		}
		List<ChuenChenNongSuo> ccnsList = new ArrayList<>();

		// 第四行数据
		for (int i = 0; i < list.size(); i++) {

			row = sheet.createRow(i + 2);
			JinQingChuenChenOne report = list.get(i);
			// 导入对应列的数据
			HSSFCell cell = row.createCell(0);
			cell.setCellValue(report.getBatchNumber());
			cell.setCellStyle(style2);

			HSSFCell cell1 = row.createCell(1);
			cell1.setCellValue(report.getDeviceCode());
			cell1.setCellStyle(style2);

			HSSFCell cell2 = row.createCell(2);
			cell2.setCellValue(report.getUpperTemperature());
			cell2.setCellStyle(style2);

			HSSFCell cell3 = row.createCell(3);
			cell3.setCellValue(report.getLowerTemperature());
			cell3.setCellStyle(style2);

			HSSFCell cell4 = row.createCell(4);
			cell4.setCellValue(report.getCumulativeAmount());
			cell4.setCellStyle(style2);

			HSSFCell cell5 = row.createCell(5);
			cell5.setCellValue(report.getCurrentSpeed());
			cell5.setCellStyle(style2);

			if (report.getCurt() instanceof Date) {
				HSSFCell cell6 = row.createCell(6);
				cell6.setCellValue(report.getCurt());
				cell6.setCellStyle(style2);
				Date date = (Date) report.getCurt();
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				cell6.setCellValue(sdf.format(date));
				//textValue = sdf.format(date);
			} 
		}
		response.setContentType("application/octet-stream");
		String Name = "attachment;filename=" + codedFileName + ".xls";
		response.setHeader("Content-disposition", Name);// 默认Excel名称
		response.flushBuffer();
		wb.write(response.getOutputStream());

	}

}
