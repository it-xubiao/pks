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
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.springframework.util.StringUtils;

import com.zdxb.tcmcsm.pks.entity.KyGyDb;

/**
 * @ClassName: ExcelUtil
 * @Description: Excel表格导出
 * @author: xuBiao
 * @date: 2019年6月12日 下午3:17:07
 */
public class ExcelUtil {

	/**
	 * 
	 * @Title: exportExcel
	 * @Description: TODO
	 * @param request
	 * @param response
	 * @param headers  文件头
	 * @param dataset 导出数据
	 * @param excelName 文件名称
	 * @throws IOException
	 * @author: xuBiao
	 */
	public static void exportExcel(HttpServletRequest request, HttpServletResponse response, String[] headers,
			List<?> dataset,String excelName) throws IOException {// 声明一个工作薄
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
                        if (!(StringUtils.isEmpty(value))){
                            textValue = value.toString();
                        }else {
                            textValue = "";
                        }
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
