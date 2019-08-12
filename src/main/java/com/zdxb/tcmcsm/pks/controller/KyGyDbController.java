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

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.zdxb.tcmcsm.pks.common.HtmlUtil;
import com.zdxb.tcmcsm.pks.common.ServiceException;
import com.zdxb.tcmcsm.pks.common.excelUtil.ExcelUtil;
import com.zdxb.tcmcsm.pks.entity.ChuenChenNongSuo;
import com.zdxb.tcmcsm.pks.entity.KyGyDb;
import com.zdxb.tcmcsm.pks.entity.Student;
import com.zdxb.tcmcsm.pks.model.KyGyDbModel;
import com.zdxb.tcmcsm.pks.page.BasePage;
import com.zdxb.tcmcsm.pks.page.Pager;
import com.zdxb.tcmcsm.pks.service.BaseService;
import com.zdxb.tcmcsm.pks.service.KyGyDbService;

/**
 * @ClassName: KyGyDbController
 * @Description: 数据查询
 * @author: xuBiao
 * @date: 2019年6月3日 上午11:51:09
 */
@Controller
@RequestMapping("/selectAll")
public class KyGyDbController {

	/** 日志打印 */
	private static Logger logger = LoggerFactory.getLogger(KyGyDbController.class);

	@Autowired
	private KyGyDbService<?> kyGyDbService;


	/**
	 * 
	 * @Title: listAll
	 * @Description: 前端控制
	 * @param page
	 * @param pageSize
	 * @param sortOrder
	 * @param sortColumnb
	 * @param request
	 * @param response
	 * @author: xuBiao
	 */
	@RequestMapping(value = { "/listAll" })
	@ResponseBody
	public void listAll(KyGyDbModel model, HttpServletRequest request, HttpServletResponse response, String page,int limit) {
		@SuppressWarnings("unchecked")
		List<KyGyDb> dataList = (List<KyGyDb>) kyGyDbService.queryByList(model);
		// 设置页面数据
		HtmlUtil.writerJson(response, model.getPager().getRowCount(), dataList);

	}

	@RequestMapping(value = { "/selectStageName" })
	@ResponseBody
	public void selectStageName(KyGyDb model, HttpServletRequest request, HttpServletResponse response) {
		List<String> dataList = kyGyDbService.selectStageName();
		// 设置页面数据
		HtmlUtil.writerJson(response, model.getPager().getRowCount(), dataList);

	}
	
	/**
	 * 
	 * @Title: export
	 * @Description: TODO
	 * @param model
	 * @param request
	 * @param response
	 * @throws IOException
	 * @author: xuBiao
	 */
	@RequestMapping(value = { "/export" })
	public void export(KyGyDbModel  model, HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		// 导出的Excel头部，这个要根据自己项目改一下
		String[] headers = { "批次号", "罐号", "罐名","过程名称", "阶段名称", "产品名称", "中间体名称", "实际值","单位" ,"系统时间"};
		// 查询出来的数据，根据自己项目改一下
		List<KyGyDbModel> dataset = kyGyDbService.export(model);
		String excelName = "金青醇沉模板改版20190304";
		String codedFileName = java.net.URLEncoder.encode(excelName, "UTF-8");
		ExcelUtil.exportExcel(request, response, headers, dataset,codedFileName);

	}
	
	/**
	 * 百万数据导出
	 * @Title: export1
	 * @Description: TODO
	 * @param model
	 * @param request
	 * @param response
	 * @throws IOException
	 * @author: xuBiao
	 */
	@RequestMapping(value = { "/export1" })
	public void export1(KyGyDbModel  model, HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		List<KyGyDbModel> dataset = kyGyDbService.export(model);

		ArrayList<LinkedHashMap> titleList = new ArrayList<LinkedHashMap>();
		LinkedHashMap<String, String> titleMap = new LinkedHashMap<String, String>();
		titleMap.put("title1", "金青醇沉模板改版20190304");
		
		LinkedHashMap<String, String> headMap = new LinkedHashMap<String, String>();
		headMap.put("batchNumber", "批次号");
		headMap.put("deviceCode", "罐号");
		headMap.put("deviceName", "罐名");
		headMap.put("processName", "过程名称");
		headMap.put("stageName", "阶段名称");
		headMap.put("productName", "产品名称");
		
		headMap.put("paraName", "工艺参数");
		headMap.put("value", "实际值");
		headMap.put("unit", "单位");
		headMap.put("curt", "系统时间");
		titleList.add(titleMap);
		titleList.add(headMap);

//		File file = new File("D://ExcelExportDemo/");
//		if (!file.exists())
//			file.mkdir();// 创建该文件夹目录
		OutputStream os = null;
		Date date = new Date();
		String  codedFileName  = "数据查询";
		String excelName = java.net.URLEncoder.encode(codedFileName, "UTF-8");
		try {
			// .xlsx格式
//			os = new FileOutputStream(file.getAbsolutePath() + "/" + date.getTime() + ".xlsx");
			logger.info("正在导出xlsx...");
			ExcelUtil.exportExcelTo(titleList, dataset, os,response,excelName);
			logger.info("导出完成...共" + dataset.size() + "条数据,用时" + (new Date().getTime() - date.getTime()) + "ms");
			//logger.info("文件路径：" + file.getAbsolutePath() + "/" + date.getTime() + ".xlsx");
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			//os.close();
		}

	

	}
	


}
