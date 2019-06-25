var myDate = new Date();
var year = myDate.getFullYear();
var month = myDate.getMonth()+1;
var day = myDate.getDate(); 
if(month<10){
	month = "0"+month;
}
if(day<10){
	day = "0"+day;
}
var date = year+"-"+month+"-"+day;


var current_day_data = new Array();
function getData(){
	$.ajax({
		type : "post",
		async : false, // 同步执行
		url : '/spms/action/hoursparkberthtrand/getCurrentDayData.do',
		data:{dataDate:date},
		dataType : "json", // 返回数据形式为json
		success : function(result) {
			if (result.length != 0) {
				result = result[0];
				current_day_data[0] = result.hours;
				current_day_data[1] = result.lyl;
				current_day_data[2] = result.zyl;
				current_day_data[3] = result.zzl;
				current_day_data[4] = result.sr;
				current_day_data[5] = result.sl;
			} else {
				current_day_data[0] = [];
				current_day_data[1] = [];
				current_day_data[2] = [];
				current_day_data[3] = [];
				current_day_data[4] = [];
				current_day_data[5] = [];
			}
		}
	});
	
	$.ajax({
		url:'/spms/action/homeStat/getOverviewJson.do',
		type:'post',
		async : false, // 同步执行
		data:{dataDate:date},
		success:function(result){
			if(result.length != 0){
				var rankList = result[0].tendChrage;
				rankList = eval('('+rankList+')');
				current_day_data[6] = rankList.hours;
				current_day_data[7] = rankList.totalChargeFee;	
				current_day_data[8] = rankList.paymentCard;
				current_day_data[9] = rankList.unionPay;
				current_day_data[10] = rankList.alipay;
				current_day_data[11] = rankList.wecha;
			}else{
				current_day_data[6] = [];
				current_day_data[7] = [];	
				current_day_data[8] = [];
				current_day_data[9] = [];
				current_day_data[10] = [];
				current_day_data[11] = [];
			}			
		}
	});
}
getData();
