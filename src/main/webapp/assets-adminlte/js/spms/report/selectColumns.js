
//基础指标
var BasicIndex =['日期','停车点','停车点是否已删除','停车点是否已作废','泊位数','停车总次数','包月停车次数','免费次数','逃缴次数','故障停车次数','特殊停车次数','正常缴费停车次数',
                 '泊位利用率%','平均泊位收益','周转率(次)','停车时长','包月停车时长','免费停车时长','免费率%'];
//基础费用
var BasicFee =['应收金额','实收金额','优惠金额','预付金额','未驶离预付','当日驶离预付','补缴金额','预付超额','预付退款','故障金额',
                 '包月停车费','特殊停车费','车载标签缴费'];

//App支付宝
var Alipay =['APP支付宝总金额','APP支付宝正常缴费','APP支付宝补缴','APP支付宝条码支付','App支付宝快捷支付','App支付宝二维码支付'];

//App微信
var Wechatpay =['App微信总金额','App微信正常缴费','App微信补缴','App微信条码支付','App微信快捷支付','App微信二维码支付'];

//微信公众号
var WechatPd = ['微信公众号总金额','微信公众号正常缴费','微信公众号补缴','微信公众号快捷支付'];

//App账户
var AppBalance = ['APP账户缴费总金额','APP账户正常缴费','APP账户补缴','APP账户余额支付'];

//代缴卡
var PaymentCard =['代刷金额','代缴卡正常支付','代缴卡补缴'];

//车主卡
var OwnerCard =['车主刷卡','车主卡正常支付','车主卡补缴'];

$(document).ready(function(){ 
	select_columns();
	select_columns1();
});

function select_columns (){
	//$('#select_columns').empty();
	var obj = $('#data_list_table').bootstrapTable('getOptions').columns;
    obj = obj[0];
	for(var i=0;i<obj.length;i++){
		var columns=obj[i];
		if(columns.visible==true){
			$('#select_columns').append(
					'<div class="col-sm-5 col-md-5" style="margin-top: 5px;">'+
					'<input type="checkbox" checked="checked" style="text-align:left;" class="select_columns_column" id="'+obj[i].field +'"> '+
					'<label class="control-label" style="width:90%;text-align:left;">'+obj[i].title+'</label>'+
					'</div>'
			);
			
		}else{
			$('#select_columns').append(
					'<div class="col-sm-5 col-md-5" style="margin-top: 5px;">'+
					'<input type="checkbox" class="select_columns_column" id="'+obj[i].field +'"> '+
					'<label class="control-label" style="width:90%;text-align:left;">'+obj[i].title+'</label>'+
					'</div>'
			);
		}
	}
}

function select_columns1(){
	//$('#select_columns').empty();
	var obj = $('#data_list_table').bootstrapTable('getOptions').columns;
    obj = obj[0];
	for(var i=0;i<obj.length;i++){
		var columns=obj[i];
		var checked = columns.visible==true?'checked="checked"':'';
		var str= '<div class="col-sm-4 col-md-4" style="margin-top: 5px;">'+
		'<input type="checkbox" '+checked+' style="text-align:left;" class="select_columns_column" id="'+obj[i].field +'"> '+
		'<label class="control-label" style="width:90%;text-align:left;">'+obj[i].title+'</label>'+
		'</div>';
        if(BasicIndex.toString().indexOf(columns.title)>-1){
    		$('#select_columns1').append(str);
		}else if(BasicFee.toString().indexOf(columns.title)>-1){
    		$('#select_columns2').append(str);  
		}else if(Alipay.toString().indexOf(columns.title)>-1){
   			$('#select_columns3').append(str); 
		}else if(PaymentCard.indexOf(columns.title)>-1){
   			$('#select_columns4').append(str); 
		}else if(OwnerCard.toString().indexOf(columns.title)>-1){
	   		$('#select_columns5').append(str); 
	    }else if(Wechatpay.toString().indexOf(columns.title)>-1){
	   		$('#select_columns6').append(str);
	    }else if(WechatPd.toString().indexOf(columns.title)>-1){
	   		$('#select_columns7').append(str); 
	    }else if(AppBalance.toString().indexOf(columns.title)>-1){
	   		$('#select_columns8').append(str); 
	    }
	}
}

function set_columns(){
	var obj = $('#data_list_table').bootstrapTable('getOptions').columns;
	obj = obj[0];
	for(var i=0;i<obj.length;i++){
		$('#data_list_table').bootstrapTable('hideColumn', obj[i].field);
	}
	$("input[type='checkbox'][class='select_columns_column']:checkbox:checked").each(function(){ 
		var id = $(this).attr("id");
		$('#data_list_table').bootstrapTable('showColumn', id);
	});
	
	$('#data_list_table').bootstrapTable('showColumn', 'sumFee');
}