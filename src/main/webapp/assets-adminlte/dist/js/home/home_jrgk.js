function todayChargeFun(todayChargeJson) {
	var totalChargeFee = todayChargeJson.totalChargeFee;
	var paymentCard = todayChargeJson.paymentCard;
	var alipay = todayChargeJson.alipay;
	var wecha = todayChargeJson.wecha;
	var otherCardPay = todayChargeJson.otherCardPay;
	$("#totalChargeFee").html((totalChargeFee));
	$("#totalChargeFee2").html((totalChargeFee));
	$("#paymentCard").html((paymentCard));
	$("#alipay").html((alipay));
	$("#wecha").html((wecha));
	$("#otherCardPay").html((otherCardPay));
	var todayFee1 = new Array();
    var todayFee2 = new Array();
    var todayFee3 = new Array();
    var todayFee4 = new Array();
    todayFee1[0] = paymentCard;
    todayFee1[1] = alipay;
    todayFee1[2] = wecha;
    todayFee1[3] = otherCardPay;
    
    todayFee2[0] = "paymentCard_pro";
    todayFee2[1] = "alipay_pro";
    todayFee2[2] = "wecha_pro";
    todayFee2[3] = "otherCardPay_pro";
	//今日收费百分比
	var paymentCard_pro, alipay_pro, wecha_pro, otherCardPay_pro;
	if (totalChargeFee == 0) {//总数0,直接返回
		paymentCard_pro = 0;
		alipay_pro = 0;
		wecha_pro = 0;
		otherCardPay_pro = 0;
	} else {
		var j=1;
		var countun=0;
		var k=0;
		for(var i=0; i<todayFee1.length; i++){
			if(todayFee1[i] != 0){
				todayFee3[k] = todayFee1[i];
				todayFee4[k] = todayFee2[i];
				k++;
			}
		}
		for(var i=0; i<todayFee3.length; i++){
//			if(todayFee1[i] != 0){
				if(j == todayFee3.length){
					$("#" + todayFee4[i]).html(""+Math.round(100-countun)+"%");
				}else{
					$("#" + todayFee4[i]).html(""+Math.round((todayFee3[i]/totalChargeFee)*100)+"%");
				}
				countun = countun + Math.round((todayFee3[i]/totalChargeFee)*100);
//			}
			j++;
		}
	}
}
//今日充值
function todayRefileeFun(todayRefileeJson) {
	var totalRefillFee = todayRefileeJson.totalRefillFee;
	var payment_Card = todayRefileeJson.paymentCard;
	var driverCard = todayRefileeJson.driverCard;
	var versualCard = todayRefileeJson.versualCard;
	var cartag = todayRefileeJson.cartag;
	$("#totalRefillFee").html((totalRefillFee));
	$("#totalRefillFee2").html((totalRefillFee));
	$("#payment_Card").html((payment_Card));
	$("#driverCard").html((driverCard));
	$("#versualCard").html((versualCard));
	$("#cartag").html((cartag));
	
	var todayReFee1 = new Array();
    var todayReFee2 = new Array();
    var todayReFee3 = new Array();
    var todayReFee4 = new Array();
    todayReFee1[0] = payment_Card;
    todayReFee1[1] = driverCard;
    todayReFee1[2] = versualCard;
    todayReFee1[3] = cartag;
    
    todayReFee2[0] = "payment_Card_pro";
    todayReFee2[1] = "driverCard_pro";
    todayReFee2[2] = "versualCard_pro";
    todayReFee2[3] = "cartag_pro";

	//今日充值百分比
	var paymentCard_pro, driverCard_pro, versualCard_pro ,cartag_pro;
	if (totalRefillFee == 0) {//总数0,直接返回
		paymentCard_pro = 0;
		driverCard_pro = 0;
		versualCard_pro = 0;
		cartag_pro = 0;
	} else {
		var j=1;
		var countun=0;
		var k=0;
		for(var i=0; i<todayReFee1.length; i++){
			if(todayReFee1[i] != 0){
				todayReFee3[k] = todayReFee1[i];
				todayReFee4[k] = todayReFee2[i];
				k++;
			}
		}
		for(var i=0; i<todayReFee3.length; i++){
//			if(todayReFee1[i] != 0){
				if(j == todayReFee3.length){
					$("#" + todayReFee4[i]).html(""+Math.round(100-countun)+"%");
				}else{
					$("#" + todayReFee4[i]).html(""+Math.round((todayReFee3[i]/totalRefillFee)*100)+"%");
				}
				countun = countun + Math.round((todayReFee3[i]/totalRefillFee)*100);
//			}
			j++;
		}
	}
}

//停车次数
function todayParktimesFun(todayParktimesJson) {
	var parkTimes = todayParktimesJson.parkTimes;
	var berthTurnover = todayParktimesJson.berthTurnover;
	var berthBusyRadio = todayParktimesJson.berthBusyRadio;
	var berthUserRadio = todayParktimesJson.berthUserRadio;
	$("#parkTimes").html((parkTimes));
	$("#parkTimes2").html((parkTimes));
	$("#berthTurnover").html(berthTurnover);
	if (berthBusyRadio != 0)
		$("#berthBusyRadio").html(Math.round(berthBusyRadio) + "%");
		//$("#berthBusyRadio").html(berthBusyRadio + "%");
	if (berthUserRadio != 0)
		$("#berthUserRadio").html(Math.round(berthUserRadio) + "%");
		//$("#berthUserRadio").html(berthUserRadio + "%");
}
//缴费次数
function todayChargetimesFun(todayChargetimesJson) {
	var totalChargeTimes = todayChargetimesJson.totalChargeTimes;
	var chargeFeeAverage = todayChargetimesJson.chargeFeeAverage;
	var berthAverageFee = todayChargetimesJson.berthAverageFee;
	$("#totalChargeTimes").html((totalChargeTimes));
	$("#totalChargeTimes2").html((totalChargeTimes));
	$("#chargeFeeAverage").html(chargeFeeAverage);
	$("#berthAverageFee").html(berthAverageFee);
}
//今日泊位
function todayIdleBerthNumFun(todayIdleBerthNumJson) {
	var idleBerthNum = todayIdleBerthNumJson.idleBerthNum;
	var berthNum = todayIdleBerthNumJson.berthNum;
	var parkNum = todayIdleBerthNumJson.parkNum;
	$("#berthNum").html((berthNum));
	$("#idleBerthNum").html((idleBerthNum));
	$("#idleBerthNum2").html((idleBerthNum));
	$("#parkNum").html((parkNum));
}
//在线人数
function todayOnlineCollectorFun(todayOnlineCollectorJson) {
	var onlineNum = todayOnlineCollectorJson.onlineNum;
	var collectorNum = todayOnlineCollectorJson.collectorNum;
	var offlineNum = todayOnlineCollectorJson.offlineNum;
	$("#onlineNum").html((onlineNum));
	$("#onlineNum2").html((onlineNum));
	$("#collectorNum").html((collectorNum));
	$("#offlineNum").html((offlineNum));
}
