/**
 * 隐藏冻结列
 * @param colModel 列属性
 */
function hideFrozencolModel(colModel) {
	for (var i = 0; i < colModel.length; i++) {
		if (colModel[i].frozen == true) {
			$("#col_" + colModel[i].name).parent().hide();
		}
		;
	}
}
/**
 * 查找列是否显示
 * @param colModelFromCookie 自定义列cookie
 * @param name 
 * @returns {Boolean}
 */
function findHiddenColums(colModelFromCookie, name) {
	if (colModelFromCookie) {
		for (var i = 0; i < colModelFromCookie.length; i++) {
			var colModel = colModelFromCookie[i].substring(4,
					colModelFromCookie[i].length);
			if (colModel == name) {
				return true;
			}
		}
	}
	return false;
}
/**
 * jqGrid 首次加载
 * @param defaultOption
 * @param option
 * @param colModelFromCookie
 */
function extendDefaultOption(defaultOption, option, colModelFromCookie) {
	defaultOption.height = $(".ui-layout-west").outerHeight()
			- $("#nav:visible").outerHeight()
			- $("#thisCrumbs:visible").outerHeight() - 65;
	if (defaultOption.pager == false) {
		defaultOption.rowNum = -1;
	}
	$.extend(defaultOption, option);
	for (var i = 0; i < defaultOption.colModel.length; i++) {
		if (colModelFromCookie
				&& findHiddenColums(colModelFromCookie,
						defaultOption.colModel[i].name)) {
			defaultOption.colModel[i].hidden = false;
		} else if (colModelFromCookie) {
			defaultOption.colModel[i].hidden = true;
		}

		if (defaultOption.colModel[i].name == "id") {
			if (defaultOption.showColModelButton) {
				defaultOption.colModel[i].hidden = true;
				defaultOption.colModel[i].hidedlg = true;
			}
			;
		}
		;
	}
}
/**
 * 列cookie读取
 * @param self
 * @returns
 */
function getColModelFromCookie(self) {
	var colModelFromCookie;
	if ($.cookie("gridColums")) {
		var jsonData = eval("(" + $.cookie("gridColums") + ")");
		colModelFromCookie = jsonData[self.attr("id")];
	}
	return colModelFromCookie;
}
/**
 * 自定义列显示位置
 * @param selfId
 */
function proccessStyleWhenSetColumShow(selfId) {
	$("#ColTbl_" + selfId).css({
		height : "200px",
		overflow : "auto"
	}).parents(".ui-widget:first").css({
		"z-index" : "2500"
	});
	$(".ui-jqdialog").css({
		bottom : "25px",
		left : "0px"
	});
	$(".jqResize").remove();
}
//json转换
var Convert = {
    StringToJSON: function(str) {
		return eval('(' + str + ')');
    },
    ToJSONString: function(obj) {
        switch(typeof(obj))
        {
            case 'object':
                var ret = [];
                if (obj instanceof Array)
                {
                    for (var i = 0, len = obj.length; i < len; i++)
                    {
                        ret.push(Convert.ToJSONString(obj[i]));
                    }
                    return '[' + ret.join(',') + ']';
                }
                else if (obj instanceof RegExp)
                {
                    return obj.toString();
                }
                else
                {
                    for (var a in obj)
                    {
                        ret.push(a + ':' + Convert.ToJSONString(obj[a]));
                    }
                    return '{' + ret.join(',') + '}';
                }
            case 'function':
                return 'function() {}';
            case 'number':
                return obj.toString();
            case 'string':
                return "\"" + obj.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function(a) {return ("\n"==a)?"\\n":("\r"==a)?"\\r":("\t"==a)?"\\t":"";}) + "\"";
            case 'boolean':
                return obj.toString();
            default:
                return obj.toString();

        }
    }
};
/**
 * 确定按钮事件绑定
 * @param dialog
 * @param selfId
 */
function bindClickToOkButton(dialog, selfId) {
	$("#dData").click(function() {
		var dialogValue = "";
		dialog.find(".cbox").each(function() {
			if ($(this).is(":checked")) {
				dialogValue = dialogValue + "'" + $(this).attr("id") + "',";
			}
		});
		dialogValue = dialogValue.substring(0, dialogValue.length - 1);

		var cookieData = selfId + ":[" + dialogValue + "]";
		var cookieValue = $.cookie("gridColums");
		var jsonData = {};
		if (cookieValue && cookieValue != "") {
			jsonData = eval("(" + cookieValue + ")");
		}
		jsonData[selfId] = eval("([" + dialogValue + "])");
		$.cookie("gridColums", Convert.ToJSONString(jsonData), {
			expires : 80000,
			path : '/'
		});
	});
}
/**
 * checkbox选中
 * @param dialog
 */
function bindClickToCancelButton(dialog) {
	var dialogChecked = new Array();
	dialog.find(".cbox").each(
			function(i, n) {
				if ($(this).attr("checked") == true
						|| $(this).attr("checked") == "checked") {
					dialogChecked[i] = true;
				} else {
					dialogChecked[i] = false;
				}
			});
	$("#eData").click(function() {
		dialog.find(".cbox").each(function(i, n) {
			$(this).attr("checked", dialogChecked[i]);
		});
	})
}
/**
 * 自定义窗口显示标签
 * @param dialog
 */
function proccessLabelShow(dialog) {
	var labels = $("label", dialog);
	labels.each(function(i, node) {
		var text = $(node).text();
		var index = text.lastIndexOf("(");
		if (index != -1)
			$(node).text(text.substring(0, text.lastIndexOf("(")));
	});
};
/**
 * 翻页图标样式
 * 
 * @param table
 */
function updatePagerIcons(table) {
	var replacement = {
		'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
		'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
		'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
		'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
	};
	$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon')
			.each(function() {
				var icon = $(this);
				var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
				if ($class in replacement)
					icon.attr('class', 'ui-icon ' + replacement[$class]);
			})
};
/**
 * 显示工具提示气泡
 * 
 * @param table
 */
function enableTooltips(table) {
	$('.navtable .ui-pg-button').tooltip({
		container : 'body'
	});
	$(table).find('.ui-pg-div').tooltip({
		container : 'body'
	});
}
/**
 * 没有记录显示方法
 */
function displayNoneData(table) {
	var rowNum = $(table).jqGrid('getGridParam', 'records');
	if (rowNum == 0) {
		if ($("#norecords").html() == null) {
			$(table).parent().append(
					"<pre> <div id='norecords'>没有查询记录显示！</div> </pre>");
		}
		$("#norecords").show();
	} else {// 如果存在记录，则隐藏提示信息。
		$("#norecords").hide();
	}
}
(function($) {
	$.fn.setPostData = function(postData) {
		$(this).jqGrid('setGridParam', {
			postData : null
		});
		$(this).jqGrid("setGridParam", {
			'postData' : postData
		});
	}
	$.fn.getPostData = function() {
		return jQuery(this).jqGrid('getGridParam', 'postData');
	}
	$.fn.jqGridFunction = function(option) {
		var self = $(this);
		var defaultOption = {
			autoheight : true,
			height : 400,
			showColModelButton : true,
			rowNum : 10,
			rowList : [ 10, 20, 30, 40, 50 ],
			sortname : 'id',
			autowidth : true,
			rownumbers : true,// 是否显示行号
			rownumWidth : 35,
			pagerpos : 'center', // 指定分页栏显示的位置
			loadonce : false,// true表示数据只加载一次，翻页按钮不可用
			hiddengrid : false, // true表示缩进表格，点击右上方箭头开始显示和加载数据
			viewrecords : true, // 是否显示行数
			multiselect : true, // 是否显示checkbox ，true表示显示
			multiselectWidth : 35,
			multiboxonly : false, // 显示checkbox 是否支持多选，true表示不支持
			sortorder : "desc",
			loadComplete : function() {
				var table = this;
				updatePagerIcons(table);
				enableTooltips(table);
				displayNoneData(table);
			},
		}
		extendDefaultOption(defaultOption, option, getColModelFromCookie(self));
		for (var i = 0; i < defaultOption.colModel.length; i++) {
			if (defaultOption.colModel[i].sortable == undefined) {
				defaultOption.colModel[i].sortable = false;
			}
		}
		if (option.loadComplete) {
			defaultOption.loadComplete = function() {
				option.loadComplete();
				// $.loadingComp("close");
				$('#' + $(this).attr("id") + 'Pager .ui-pg-input').attr("size",
						"5");
			}
		}
		self.jqGrid(defaultOption);
		window._currentGrid = self;
		if (defaultOption.pager) {
			// 默认操作按钮
			self.navGrid('#' + $(this).attr("id") + 'Pager', {
				add : true,
				addicon : 'ace-icon fa fa-plus-circle purple',
				edit : true,
				editicon : 'ace-icon fa fa-pencil blue',
				del : true,
				delicon : 'ace-icon fa fa-trash-o red',
				search : true,
				searchicon : 'ace-icon fa fa-search orange',
				refresh : true,
				refreshicon : 'ace-icon fa fa-refresh green',
				view : true,
				viewicon : 'ace-icon fa fa-search-plus grey',
				position : "left",
				cloneToTop : false
			});
			if (defaultOption.showColModelButton) {
				var bindClick = false;
				// 自定义操作按钮
				self.navButtonAdd('#' + $(this).attr("id") + 'Pager', {
					caption : "",
					title : "选择列",
					position : "last",
					buttonicon : "ace-icon fa fa-eye red ",
					onClickButton : function() {
						self.setColumns({
							width : 200,
							drag : false,
							resizable : false,
							beforeShowForm : function(dialog) {
								var selfId = self.attr("id");
								proccessStyleWhenSetColumShow(selfId);
								if (!bindClick) {
									bindClickToOkButton(dialog, selfId);
								}
								bindClickToCancelButton(dialog);
								bindClick = true;
								proccessLabelShow(dialog);
								hideFrozencolModel(defaultOption.colModel);
							}
						});
						$(this).jqGrid('setColumns');
					},
					position : "last"
				});
			}
		}
	};

	$.fn.toEnd = function(url, postData, successCallBack) {
		var selfDoc = $(this);
		var rowid = selfDoc.jqGrid('getGridParam', 'selrow');
		var selectedRow = $("#" + rowid, selfDoc);
		if (url) {
			$.ajax({
				type : "post",
				url : url,
				data : postData,
				success : function(data) {
					selfDoc.append(selectedRow);
					if (successCallBack) {
						successCallBack.call(null, data);
					}
				}
			});
		} else {
			$(this).append(selectedRow);
		}
	};

	$.fn.getGridRowData = function() {
		return $(this).getRowData($(this).getGridParam("selrow"));
	};
	$.fn.reloadDataGrid = function(url, postData) {
		if (url == null && postData == null) {
			$(this).trigger("reloadGrid");
			return;
		}
		$(this).setGridParam({
			url : url,
			postData : postData
		});
		$(this).trigger("reloadGrid");
	};
})(jQuery);