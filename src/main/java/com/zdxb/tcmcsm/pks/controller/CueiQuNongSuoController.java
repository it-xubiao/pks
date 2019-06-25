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

import com.zdxb.tcmcsm.pks.common.HtmlUtil;
import com.zdxb.tcmcsm.pks.entity.ChuenChenNongSuo;
import com.zdxb.tcmcsm.pks.entity.CueiQuNongSuo;
import com.zdxb.tcmcsm.pks.entity.KyGyDb;
import com.zdxb.tcmcsm.pks.model.KyGyDbModel;
import com.zdxb.tcmcsm.pks.service.KyGyDbService;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @ClassName: ChuenChenNongSuoController
 * @Description: 萃取浓缩前端控制器
 * @author: xuBiao
 * @date: 2019年6月14日 下午5:02:24
 */
@Controller
@RequestMapping("/CueiQuNongSuo")
public class CueiQuNongSuoController {

	/** 日志打印 */
	private static Logger logger = LoggerFactory.getLogger(KyGyDbController.class);

	@Autowired
	private KyGyDbService<?> kyGyDbService;

	
	/**
	 * 获取醇沉浓缩数据
	 * @Title: selectAlcoholPrecipitationConcentrationAvg
	 * @Description: TODO
	 * @param model
	 * @param request
	 * @param response
	 * @throws IOException
	 * @author: xuBiao
	 */
	@RequestMapping(value = { "/selectAlcoholPrecipitationConcentrationAvg" })
	public void selectAlcoholPrecipitationConcentrationAvg(KyGyDbModel model, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		List<CueiQuNongSuo> dataList = kyGyDbService.queryAvgByList3(model);

		// 设置页面数据
		HtmlUtil.writerJson(response, model.getPager().getRowCount(), dataList);

	}

	@RequestMapping(value = { "/export1" })
	public void ChuenChenNongSuoexport(KyGyDbModel model, HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		// 导出的Excel头部，这个要根据自己项目改一下
		String[] headers = { "批次号", "减压浓缩 真空度平均值", "减压浓缩 压力平均值", "浸膏冷藏 真空度平均值" };
		String excelName = "醇沉浓缩增添数据导出模板";
		String codedFileName = java.net.URLEncoder.encode(excelName, "UTF-8");
		ChuenChenNongSuo ccns = new ChuenChenNongSuo();
		List<ChuenChenNongSuo> ccnsList = new ArrayList<>();
		// 查询出来的数据，根据自己项目改一下
		List<KyGyDb> dataset = kyGyDbService.ChuenChenNongSuoexport(model);

		List<Map<String, Object>> listMap = new ArrayList<>();
		Map<String, Object> map = new HashMap<>();
		for (KyGyDb date : dataset) {
			ccns.setBatchNumber(date.getBatchNumber());
			ccns.setJynsyl(date.getJynsyl());
			ccns.setJynszkd(date.getJynszkd());
			ccns.setQgnczkd(date.getQgnczkd());
			ccnsList.add(ccns);
		}

		// 声明一个工作薄
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
			cell.setCellValue(text);
		}
		// 遍历集合数据，产生数据行
		Iterator<?> it = ccnsList.iterator();
		int index = 0;
		while (it.hasNext()) {
			index++;
			row = sheet.createRow(index);
			ChuenChenNongSuo t = (ChuenChenNongSuo) it.next();
			// 利用反射，根据javabean属性的先后顺序，动态调用getXxx()方法得到属性值
			Field[] fields = t.getClass().getDeclaredFields();
			for (short i = 0; i < fields.length; i++) {
				HSSFCell cell = row.createCell(i);
				Field field = fields[i];
				String fieldName = field.getName();
				String getMethodName = "get" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);
				try {
					Class<? extends ChuenChenNongSuo> tCls = t.getClass();
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
		// response.setHeader("Content-disposition",
		// "attachment;filename=createList.xls");// 默认Excel名称
		String Name = "attachment;filename=" + codedFileName + ".xls";
		response.setHeader("Content-disposition", Name);// 默认Excel名称
		response.flushBuffer();
		workbook.write(response.getOutputStream());

		/*
		 * String excelName = "醇沉浓缩增添数据导出模板"; String codedFileName =
		 * java.net.URLEncoder.encode(excelName, "UTF-8");
		 * ExcelUtil.exportExcel(request, response, headers, dataset,codedFileName,);
		 */

	}

}
