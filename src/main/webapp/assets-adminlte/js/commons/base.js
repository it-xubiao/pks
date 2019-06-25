$package('sys');
var sys = {
	/* Json 工具类 */
	isJson : function(str) {
		var obj = null;
		try {
			obj = sys.paserJson(str);
		} catch (e) {
			return false;
		}
		var result = typeof (obj) == "object"
				&& Object.prototype.toString.call(obj).toLowerCase() == "[object object]"
				&& !obj.length;
		return result;
	},
	paserJson : function(str) {
		return eval("(" + str + ")");
	},
	infoAuto : function(msg, timeout) {
		$.messager.show({
			title : '提示',
			msg : msg,
			showType : 'show',
			timeout : timeout || 3000
		});
	},
	info : function(msg, callback) {
		$.messager.alert('消息', msg, 'info', callback);
	},
	infoNoRowSelect : function(callback) {
		sys.info('请选择要操作的记录', callback);
	},
	error : function(msg, callback) {
		$.messager.alert('错误', msg, 'error', callback);
	},
	warn : function(msg, callback) {
		$.messager.alert('警告', msg, 'warning', callback);
	},
	/* 弹出框 */
	alert : function(title, msg, icon, callback) {
		$.messager.alert(title, msg, icon, callback);
	},
	/* 弹出框 */
	confirm : function(title, msg, callback) {
		$.messager.confirm(title, msg, callback);
	},
	progress : function(title, msg) {
		var win = $.messager.progress({
			title : title || '请稍等',
			msg : msg || '正在加载数据...'
		});
	},
	closeProgress : function() {
		$.messager.progress('close');
	},
	/* 重新登录页面 */
	toLogin : function() {
		window.top.location = urls['msUrl'] + "/login.action";
	},
	checkLogin : function(data) {// 检查是否登录超时
		if (data.logoutFlag) {
			sys.closeProgress();
			sys.alert('提示', "登录超时,点击确定重新登录.", 'error', sys.toLogin);
			return false;
		}
		return true;
	},
	ajaxSubmit : function(form, option) {
		form.ajaxSubmit(option);
	},
	ajaxJson : function(url, option, callback) {
		$.ajax(url, {
			type : 'post',
			dataType : 'json',
			data : option,
			async:false,
			success : function(data) {
				// 坚持登录
				if (!sys.checkLogin(data)) {
					return false;
				}
				if ($.isFunction(callback)) {
					callback(data);
				}
			},
			error : function(response, textStatus, errorThrown) {
				try {
					sys.closeProgress();
					var data = $.parseJSON(response.responseText);
					// 检查登录
					if (!sys.checkLogin(data)) {
						return false;
					} else {
						sys.alert('提示', data.msg || "请求出现异常,请联系管理员", 'error');
					}
				} catch (e) {
					sys.alert('提示', "请求出现异常,请联系管理员.", 'error');
				}
			},
			complete : function() {

			}
		});
	}
}

/**
 * 增加formatString功能
 * 
 * 使用方法：formatString('字符串{0}字符串{1}字符串','第一个变量','第二个变量');
 * 
 * @returns 格式化后的字符串
 */
formatString = function(str) {
	for ( var i = 0; i < arguments.length - 1; i++) {
		str = str.replace("{" + i + "}", arguments[i + 1]);
	}
	return str;
};
/* 将2000-01-00 10:00:00 转成 2000-01-00 */
formatDate = function(value) {
	if (value != null) {
		var str = value.toString();
		if (str) {
			if (str.length > 10) {
				return str.substring(0, 10);
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
}
/* 将2000-01-00 10:00:00 转成  10:00 */
formatTime = function(value){
	if (value != null) {
		var str = value.toString();
		if (str) {
			if (str.length > 10) {
				return str.substr(11,5);
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
}
/* 表单转成json数据 */
$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
}



Date.prototype.pattern = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, // 小时
		"H+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	var week = {
		"0" : "/u65e5",
		"1" : "/u4e00",
		"2" : "/u4e8c",
		"3" : "/u4e09",
		"4" : "/u56db",
		"5" : "/u4e94",
		"6" : "/u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt
				.replace(
						RegExp.$1,
						((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f"
								: "/u5468")
								: "")
								+ week[this.getDay() + ""]);
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}

function getNextDay(nDate) {
	var date = new Date(Date.parse(nDate.replace(/-/g, "/")));
	if (date.getTime() > 0) {
		date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
		return date.pattern("yyyy-MM-dd HH:mm:ss");
	} else {
		return "";
	}
}
function getYesterDay() {
	var date = new Date();
	date.setTime(date.getTime() - 1 * 24 * 60 * 60 * 1000);
	return date.pattern("yyyy-MM-dd HH:mm:ss");
}

function getYesterDayMorning() {
	var date = new Date();
	date.setTime(date.getTime() - 1 * 24 * 60 * 60 * 1000);
	return date.pattern("yyyy-MM-dd 00:00:00");
}

function getYesterDayEnd(){
	var date = new Date();
	date.setTime(date.getTime() - 1 * 24 * 60 * 60 * 1000);
	return date.pattern("yyyy-MM-dd 23:59:59");
}

function getNowDayMorning() {
	var date = new Date();
	date.setTime(date.getTime());
	return date.pattern("yyyy-MM-dd 00:00:00");
}

function getNowDayNow() {
	var date = new Date();
	date.setTime(date.getTime());
	return date.pattern("yyyy-MM-dd HH:mm:ss");
}

function getNextDayMorning() {
	var date = new Date();
	date.setTime(date.getTime()+1 * 24 * 60 * 60 * 1000);
	return date.pattern("yyyy-MM-dd 00:00:00");
}
// 开始时间大于当前时间，截止时间大于开始时间
function checkDate(startDate, endDate) {
	var date = getNowDayMorning();
	if (startDate < date) {
		$.messager.show({
			title : '提示',
			msg : "请输入合理的时间"
		});
		return false;
	}
	if (endDate < startDate) {
		$.messager.show({
			title : '提示',
			msg : "请输入合理的时间"
		});
		return false;
	}
	return true;
}

//截止时间大于开始时间
function compareDate(startDate, endDate) {
	if (endDate <= startDate) {
		$.messager.show({
			title : '提示',
			msg : "开始时间必须小于结束时间"
		});
		return false;
	}
	return true;
}

function getBeforeDaysMorning(days) {
	var date = new Date();
	date.setTime(date.getTime() - 1 * 24 * 60 * 60 * 1000*Number(days));
	//date.setTime(date.getTime()+1 * 24 * 60 * 60 * 1000);
	return date.pattern("yyyy-MM-dd 00:00:00");
}

function getEndOfDay(){
	var date = new Date();
	date.setTime(date.getTime());
	return date.pattern("yyyy-MM-dd 23:59:59");
}

function formatDateUntilHour(date){
	
    var y = date.getFullYear();  	
    var m = (date.getMonth()+1)>=10?date.getMonth()+1:'0'+(date.getMonth()+1); 
    var d = date.getDate()>=10?date.getDate():'0'+date.getDate();
	var h = date.getHours()>=10?date.getHours():'0'+date.getHours();
    return y + "-" + m + "-" + d + " " + h +":00:00" ;
}

/**
 * 时间控件格式化
 * @param date
 * @returns {String}
 */
function dayFormatter(date){
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}

function dayParser(s){
	if (!s) return new Date();
		var ss = (s.split('-'));
		var y = parseInt(ss[0],10);
		var m = parseInt(ss[1],10);
		var d = parseInt(ss[2],10);
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
		return new Date(y,m-1,d);
	} else {
	return new Date();
	}
}
function monthFormatter(date){
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	return y+'-'+(m<10?('0'+m):m);
}
function monthParser(s){
	if (!s) return new Date();
	var ss = (s.split('-'));
	var y = parseInt(ss[0],10);
	var m = parseInt(ss[1],10);
	if (!isNaN(y) && !isNaN(m)){
		return new Date(y,m-1);
	} else {
		return new Date();
	}
}
function yearFormatter(date){
	var y = date.getFullYear();
	return y;
}
function yearParser(s){
	if (!s) return new Date();
	var y = s;
	var m = 1;
	var d = 1;
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
		return new Date(y,m-1,d);
	} else {
		return new Date();
	}
}
function getSelectTab(name,id,url,codeType,isDefaultLine,isCommon){
	 $.ajax({
       url: url+"/tag/getDictionaryItems.do?codeType="+codeType+"&isDefaultLine="+isDefaultLine+"&isCommon="+isCommon,
       type: "post",
       dataType: 'json',
       success: function (data) {
    	   $.each(data, function(i, item) {
               $("#"+id).append("<option value='"+item.codeValue+"'>"+item.codeText+"</option>");
           });
           
       },
       error: function (XMLHttpRequest, textStatus, errorThrown) {
    	   alert(name + '下拉选项加载失败！', '警告对话框');
       }
   });
}

/**
 * 获取收费员
 * @param name
 * @param id
 * @param url
 * @param codeType
 * @param isDefaultLine
 * @param isCommon
 */
function getCollector(name,id,url){
	 $.ajax({
      url: url + "/collector/getCollectorByCityCode.do",
      type: "post",
      dataType: 'json',
      success: function (data) {
   	   $.each(data, function(i, item) {
              $("#"+id).append("<option value='"+item.id+"'>"+item.name+"</option>");
          });
          
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
   	   alert(name + '下拉选项加载失败！', '警告对话框');
      }
  });
}

function getCollectorByDepartmentName(num,name,id,url){
	 $("#"+id).append("<option value=''>==请选择==</option>");
	 $.ajax({
     url: url + "/collector/getCollectorByCityCode.do",
     type: "post",
     dataType: 'json',
     success: function (data) {
  	   $.each(data, function(i, item) {
  		    if($('#departmentName'+num).val()==item.departmentId){
  		        $("#"+id).append("<option value='"+item.id+"'>"+item.name+"</option>");
  		    }
  		   
         });
         
     },
     error: function (XMLHttpRequest, textStatus, errorThrown) {
  	   alert(name + '下拉选项加载失败！', '警告对话框');
     }
 });
}

/**
* 获取收费小组
* @param name
* @param id
* @param url
* @param codeType
* @param isDefaultLine
* @param isCommon
*/
function getCollectorGroup(name,id,url){
	 $.ajax({
     url: url + "/collectorGroup/getCollectorGroupByCityCode.do",
     type: "post",
     dataType: 'json',
     success: function (data) {
  	   $.each(data, function(i, item) {
             $("#"+id).append("<option value='"+item.id+"'>"+item.groupName+"</option>");
         });
         
     },
     error: function (XMLHttpRequest, textStatus, errorThrown) {
  	   alert(name + '下拉选项加载失败！', '警告对话框');
     }
 });
}
/**获取使用人小组*/
function getUserGroup(name,id,url){
	 $.ajax({
    url: url + "/customer/getCustomerByCityCode.do",
    type: "post",
    dataType: 'json',
    success: function (data) {
 	   $.each(data, function(i, item) {
 		   if(item.customerName!=null){
 			   $("#"+id).append("<option value='"+item.id+"'>"+item.customerName+"</option>");
 		   }
        });
        
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
 	   alert(name + '下拉选项加载失败！', '警告对话框');
    }
});
}
/**领取收费员*/
function getCollectoItems(name,id,url){
	 $.ajax({
	    url: url + "/tag/getCollectoItems.do",
	    type: "post",
	    dataType: 'json',
	    success: function (data) {
	 	   $.each(data, function(i, item) {
	 		   if(item.text!=null){
	 			   $("#"+id).append("<option value='"+item.id+"'>"+item.text+"</option>");
	 		   }
	        });
	        
	    },
	    error: function (XMLHttpRequest, textStatus, errorThrown) {
	 	   alert(name + '下拉选项加载失败！', '警告对话框');
	    }
	});
}
/**
 * 获取停车点
 * @param name
 * @param id
 * @param url
 * @param codeType
 * @param isDefaultLine
 * @param isCommon
 */
function getPark(name,id,url){
	$.ajax({
		url: url + "/park/getParkByCityCode.do",
		type: "post",
		dataType: 'json',
		success: function (data) {
			$.each(data, function(i, item) {
				$("#"+id).append("<option value='"+item.id+"'>"+item.parkName+"</option>");
			});
			
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(name + '下拉选项加载失败！', '警告对话框');
		}
	});
}


var region_street_park = new Object();
function getregion_street_park() {
	$.ajax({
		url: basePath + "/park/getScheduleParkTree.do",
		type: "post",
		dataType: 'json',
		async:false,
		success: function (data) {
			region_street_park = data;
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(name + '下拉选项加载失败！', '警告对话框');
		}
	});
}


function get_region(num){
	getregion_street_park();
	$.each(region_street_park, function(i, item) {
		$("#region_select"+num).append("<option value='"+item.dataId+"'>"+item.text+"</option>");
	});
	$("#region_select"+num).bind("change",function(){
		if($("#region_select"+num).val()==""){
			$(".region_i_select"+num).each(function(i){
			   this.innerHTML="<option value=''>==请选择==</option>";
			 });
		}else{
			if($("#street_select"+num).val() !="undefined"){
				set_street($("#region_select"+num).val(),num);
			}
			if($("#departmentName"+num).val() !="undefined"){
				set_departmentName($("#region_select"+num).val(),num);
			}
		}
	});
}



function set_street(regionId,num){
	$("#street_select"+num).empty();
	$("#street_select"+num).append("<option value=''>==请选择==</option>");
	$("#street_select"+num).removeAttr("disabled","false");
	$.each(region_street_park, function(i, item) {
		if(item.dataId == regionId){
			var street = item.children;
			$.each(street , function(y, street_item) {				
				$("#street_select"+num).append("<option value='"+street_item.dataId+"'>"+street_item.text+"</option>");
			});
		}
	});
	$("#street_select"+num).bind("change",function(){
		if($("#street_select"+num).val()==""){
			$(".street_i_select"+num).each(function(i){
			   this.innerHTML = "<option value=''>==请选择==</option>";
			 });
		}else{
			if($("#park_select"+num).val() !="undefined"){
				set_park(regionId,$("#street_select"+num).val(),num);
			}
			
		}
	});
}

function set_departmentName(regionId,num){
	$("#departmentName"+num).empty();
	$("#departmentName"+num).append("<option value=''>==请选择==</option>");
	$("#departmentName"+num).removeAttr("disabled","false");
	$.ajax({
		url: basePath + "/tag/getDepartmentItems.do?regionId="+regionId,
		type: "post",
		dataType: 'json',
		async:false,
		success: function (data) {
			$.each(data, function(i, item) {					
				$("#departmentName"+num).append("<option value='"+item.id+"'>"+item.text+"</option>");				
			});
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(name + '部门下拉选项加载失败！', '警告对话框');
		}
	});
	
}

function set_park(regionId,streetId,num){
	$("#park_select"+num).empty();
	$("#park_select"+num).append("<option value=''>==请选择==</option>");
	$("#park_select"+num).removeAttr("disabled");
	$.each(region_street_park, function(i, item) {
		if(item.dataId == regionId){
			var street = item.children;
			$.each(street , function(y, street_item) {
				if(street_item.dataId == streetId){
					var park = street_item.children;
					$.each(park , function(y, park_item) {
						$("#park_select"+num).append("<option value='"+park_item.dataId+"'>"+park_item.text+"</option>");
					});
				}
				
			});
		}
	});
}


/*************** 停车点收费报表 区域、街道、停车点模型、停车点级联 start jx 2016-08-29  ***************/
function get_report_region(num){
	getregion_street_park();
	$.each(region_street_park, function(i, item) {
		$("#region_select"+num).append("<option value='"+item.dataId+"'>"+item.text+"</option>");
	});
	$("#region_select"+num).bind("change",function(){
		if($("#region_select"+num).val()==""){
			$("#parkMode").val("");
			$("#parkMode").attr("disabled","disabled");
			$(".region_i_select"+num).each(function(i){
			   this.innerHTML="<option value=''>==请选择==</option>";
			 });
			$(".region_i_select"+num).attr("disabled","disabled");
		}else{
			if($("#street_select"+num).val() !="undefined"){
				set_report_street($("#region_select"+num).val(),num);
			}
			$("#parkMode").val("");
			$("#parkMode").attr("disabled","disabled");
			$(".street_i_select"+num).each(function(i){
			    this.innerHTML = "<option value=''>==请选择==</option>";
			});
			$(".street_i_select"+num).attr("disabled","disabled");
		}
	});
}



function set_report_street(regionId,num){
	$("#street_select"+num).empty();
	$("#street_select"+num).append("<option value=''>==请选择==</option>");
	$("#street_select"+num).removeAttr("disabled","false");
	$.each(region_street_park, function(i, item) {
		if(item.dataId == regionId){
			var street = item.children;
			$.each(street , function(y, street_item) {				
				$("#street_select"+num).append("<option value='"+street_item.dataId+"'>"+street_item.text+"</option>");
			});
		}
	});
	$("#street_select"+num).bind("change",function(){
		if($("#street_select"+num).val()==""){
			$("#parkMode").val("");
			$("#parkMode").attr("disabled","disabled");
			$(".street_i_select"+num).each(function(i){
			    this.innerHTML = "<option value=''>==请选择==</option>";
			});
			$(".street_i_select"+num).attr("disabled","disabled");
		}else{
			if($("#parkMode").val() !="undefined"){
				relate_report_parkMode(regionId,num);
			}
			$(".street_i_select"+num).each(function(i){
			    this.innerHTML = "<option value=''>==请选择==</option>";
			});
			$(".street_i_select"+num).attr("disabled","disabled");
		}
	});
}

function relate_report_parkMode(regionId,num){
	$("#parkMode").removeAttr("disabled","false");
	$("#parkMode").bind("change",function(){
		if($("#parkMode").val() ==""){
			$(".street_i_select"+num).each(function(i){
			    this.innerHTML = "<option value=''>==请选择==</option>";
			});
			$(".street_i_select"+num).attr("disabled","disabled");
		}else{
			if($("#park_select"+num).val() !="undefined"){
				set_report_park(regionId,$("#street_select"+num).val(),$("#parkMode").val(),num);
			}
			
		}
	});
}

function set_report_park(regionId,streetId,parkMode,num){
	$("#park_select"+num).empty();
	$("#park_select"+num).append("<option value=''>==请选择==</option>");
	$("#park_select"+num).removeAttr("disabled");
	$.each(region_street_park, function(i, item) {
		if(item.dataId == regionId){
			var street = item.children;
			$.each(street , function(y, street_item) {
				if(street_item.dataId == streetId){
					var park = street_item.children;
					$.each(park , function(y, park_item) {
						if(park_item.attributes.parkMode == parkMode){
							$("#park_select"+num).append("<option value='"+park_item.dataId+"'>"+park_item.text+"</option>");
						}
					});
				}
				
			});
		}
	});
}

/*************** 停车点收费报表 区域、街道、停车点模型、停车点级联 end jx 2016-08-29  ***************/



function getCustomerName(customerId){
	 $.ajax({
	       url: basePath + '/action/customer/getCustomerByCityCode.do',
	       type: "post",
	       dataType: 'json',
	       success: function (data) {
	    	   $.each(data, function(i, item) {
	               $("#"+customerId).append("<option value='"+item.id+"'>"+item.customerName+"</option>");
	           });
	           
	       },
	       error: function (XMLHttpRequest, textStatus, errorThrown) {
	    	   alert('下拉选项加载失败！', '警告对话框');
	       }
	   });
}

Date.prototype.format = function(format) {  
    /* 
     * eg:format="yyyy-MM-dd hh:mm:ss"; 
     */  
    var o = {  
        "M+" : this.getMonth() + 1, // month  
        "d+" : this.getDate(), // day  
        "h+" : this.getHours(), // hour  
        "m+" : this.getMinutes(), // minute  
        "s+" : this.getSeconds(), // second  
        "q+" : Math.floor((this.getMonth() + 3) / 3), // quarter  
        "S" : this.getMilliseconds()  
        // millisecond  
    }  
  
    if (/(y+)/.test(format)) {  
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4  
                        - RegExp.$1.length));  
    }  
  
    for (var k in o) {  
        if (new RegExp("(" + k + ")").test(format)) {  
            format = format.replace(RegExp.$1, RegExp.$1.length == 1  
                            ? o[k]  
                            : ("00" + o[k]).substr(("" + o[k]).length));  
        }  
    }  
    return format;  
}  

function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    m=m<10?("0"+m):m;
    var d = dd.getDate();
    d=d<10?("0"+d):d;
    return y+"-"+m+"-"+d;
}
