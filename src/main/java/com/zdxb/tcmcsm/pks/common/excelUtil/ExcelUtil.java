/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    ExcelUtil.java
 * @Package:  com.zdxb.tcmcsm.pks.common.excelUtil
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月12日 下午3:17:07
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.common.excelUtil;

import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.streaming.SXSSFCell;
import org.apache.poi.xssf.streaming.SXSSFRow;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFHyperlink;
import org.springframework.util.StringUtils;

import com.alibaba.fastjson.JSONObject;
import com.zdxb.tcmcsm.pks.entity.KyGyDb;
import com.zdxb.tcmcsm.pks.model.KyGyDbModel;

/**
 * @ClassName: ExcelUtil
 * @Description: Excel表格导出
 * @author: xuBiao
 * @date: 2019年6月12日 下午3:17:07
 */
public class ExcelUtil {

	public static final String DEFAULT_DATE_PATTERN = "yyyy年MM月dd日 HH点mm分ss秒";// 默认日期格式
	public static final int DEFAULT_COLUMN_WIDTH = 17;// 默认列宽

	/**
	 * 
	 * @Title: exportExcelTo
	 * @Description: 万条数据导出
	 * @param titleList
	 * @param dataset
	 * @param os
	 * @author: xuBiao
	 */
	public static void exportExcelTo(ArrayList<LinkedHashMap> titleList, List<KyGyDbModel> dataset, OutputStream os,
			HttpServletResponse response, String excelName) {
		String datePattern = DEFAULT_DATE_PATTERN;
		int minBytes = DEFAULT_COLUMN_WIDTH;

		/**
		 * 声明一个工作薄
		 */
		SXSSFWorkbook workbook = new SXSSFWorkbook(1000);// 大于1000行时会把之前的行写入硬盘
		workbook.setCompressTempFiles(true);

		// 表头1样式
		CellStyle title1Style = workbook.createCellStyle();

		// head样式
		CellStyle headerStyle = workbook.createCellStyle();

		// 单元格样式
		CellStyle cellStyle = workbook.createCellStyle();

		String title1 = (String) titleList.get(0).get("title1");
		LinkedHashMap<String, String> headMap = titleList.get(1);

		/**
		 * 生成一个(带名称)表格
		 */
		SXSSFSheet sheet = (SXSSFSheet) workbook.createSheet(title1);
		sheet.createFreezePane(0, 3, 0, 3);// (单独)冻结前三行

		/**
		 * 生成head相关信息+设置每列宽度
		 */
		int[] colWidthArr = new int[headMap.size()];// 列宽数组
		String[] headKeyArr = new String[headMap.size()];// headKey数组
		String[] headValArr = new String[headMap.size()];// headVal数组
		int i = 0;
		for (Map.Entry<String, String> entry : headMap.entrySet()) {
			headKeyArr[i] = entry.getKey();
			headValArr[i] = entry.getValue();

			int bytes = headKeyArr[i].getBytes().length;
			colWidthArr[i] = bytes < minBytes ? minBytes : bytes;
			sheet.setColumnWidth(i, colWidthArr[i] * 256);// 设置列宽
			i++;
		}

		/**
		 * 遍历数据集合，产生Excel行数据
		 */
		int rowIndex = 0;
		for (Object obj : dataset) {
			// 生成title+head信息
			if (rowIndex == 0) {
				/*
				 * SXSSFRow title1Row = (SXSSFRow) sheet.createRow(0);// title1行
				 * title1Row.createCell(0).setCellValue(title1);
				 * title1Row.getCell(0).setCellStyle(title1Style); sheet.addMergedRegion(new
				 * CellRangeAddress(0, 0, 0, headMap.size() - 1));// 合并单元格
				 */

				CreationHelper createHelper = workbook.getCreationHelper();
				XSSFHyperlink hyperLink = (XSSFHyperlink) createHelper.createHyperlink(null);// .createHyperlink(Hyperlink);
				sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, headMap.size() - 1));// 合并单元格

				SXSSFRow headerRow = (SXSSFRow) sheet.createRow(2);// head行
				for (int j = 0; j < headValArr.length; j++) {
					headerRow.createCell(j).setCellValue(headValArr[j]);
					headerRow.getCell(j).setCellStyle(headerStyle);
				}
				rowIndex = 3;
			}

			JSONObject jo = (JSONObject) JSONObject.toJSON(obj);
			// 生成数据
			SXSSFRow dataRow = (SXSSFRow) sheet.createRow(rowIndex);// 创建行
			for (int k = 0; k < headKeyArr.length; k++) {
				SXSSFCell cell = (SXSSFCell) dataRow.createCell(k);// 创建单元格
				Object o = jo.get(headKeyArr[k]);
				// String cellValue = "";

				if (o == null) {
					String cellValue = "";
					cell.setCellValue(cellValue);

				} else if (o instanceof Date) {
					String cellValue = new SimpleDateFormat(datePattern).format(o);
					cell.setCellValue(cellValue);
				} else if (o instanceof Float || o instanceof Double) {
					// cellValue = new BigDecimal(o.toString()).setScale(2,
					// BigDecimal.ROUND_HALF_UP).toString();
					Double cellValue = new BigDecimal(o.toString().trim()).doubleValue();
					cell.setCellValue(cellValue);
					// cellStyle = workbook.createCellStyle();

					// cellStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("0.00"));
				} else {
					String cellValue = o.toString();
					cell.setCellValue(cellValue);
				}
				// cell.setCellValue(cellValue);
				cell.setCellStyle(cellStyle);
			}
			rowIndex++;
		}

		try {
			response.setContentType("application/octet-stream");
			// response.setHeader("Content-disposition",
			// "attachment;filename=createList.xls");// 默认Excel名称
			String Name = "attachment;filename=" + excelName + ".csv";
			response.setHeader("Content-disposition", Name);// 默认Excel名称
			response.flushBuffer();
			workbook.write(response.getOutputStream());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 
	 * @Title: exportExcel
	 * @Description: TODO
	 * @param request
	 * @param response
	 * @param headers
	 *            文件头
	 * @param dataset
	 *            导出数据
	 * @param excelName
	 *            文件名称
	 * @throws IOException
	 * @author: xuBiao
	 */
	public static void exportExcel(HttpServletRequest request, HttpServletResponse response, String[] headers,
			List<?> dataset, String excelName) throws IOException {// 声明一个工作薄
		@SuppressWarnings("resource")
		HSSFWorkbook workbook = new HSSFWorkbook();
		// 生成一个表格
		HSSFSheet sheet = workbook.createSheet();
		// 设置表格默认列宽度为15个字节
		sheet.setDefaultColumnWidth((short) 18);

		HSSFRow row = sheet.createRow(0);
		for (short i = 0; i < headers.length; i++) {
			HSSFCell cell = row.createCell(i);
			HSSFRichTextString text = new HSSFRichTextString(headers[i]);
			cell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
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
						if (!(StringUtils.isEmpty(value))) {
							textValue = value.toString();
						} else {
							textValue = "";
						}
					}

					HSSFRichTextString richString = new HSSFRichTextString(textValue);
					HSSFFont font3 = workbook.createFont();
					font3.setColor(HSSFColor.BLUE.index);// 定义Excel数据颜色
					richString.applyFont(font3);
					cell.setCellValue(richString);
					cell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);

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
		// response.setHeader("Content-disposition",
		// "attachment;filename=createList.xls");// 默认Excel名称
		String Name = "attachment;filename=" + excelName + ".xlsx";
		response.setHeader("Content-disposition", Name);// 默认Excel名称
		response.flushBuffer();
		workbook.write(response.getOutputStream());
	}

}
