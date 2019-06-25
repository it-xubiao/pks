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

import com.zdxb.tcmcsm.pks.common.HtmlUtil;
import com.zdxb.tcmcsm.pks.common.ServiceException;
import com.zdxb.tcmcsm.pks.common.excelUtil.ExcelUtil;
import com.zdxb.tcmcsm.pks.entity.ChuenChenNongSuo;
import com.zdxb.tcmcsm.pks.entity.KyGyDb;
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
	


}
