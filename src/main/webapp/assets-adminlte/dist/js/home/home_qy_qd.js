 // Get context with jQuery - using jQuery's .get() method.
var colors_qy = ['#ff7f50','#DA70D6','#87CEFA','#DA70D6'];
var colors_qd = ['#32CD32','#FF7F50','#87CEFA','#DA70D6'];
// 各区域收入情况
function radioIncomeByAreaFun(radioIncomeByAreaJson){
	    var areaChargeTotal_qy = radioIncomeByAreaJson.areaChargeTotal;
	    var areaRefillTotal_qy = radioIncomeByAreaJson.areaRefillTotal;
	    
	    $("#qysfzj").html(areaChargeTotal_qy);
	    // 充值
	    var areaRefilleRankContent_qy = radioIncomeByAreaJson.areaRefilleRankContent;
	    var regions_qycz = new Array();
	    var refillTotal_qycz = new Array();
	    for(var i=0; i<areaRefilleRankContent_qy.length; i++){  
	    	regions_qycz[i]= areaRefilleRankContent_qy[i].region;
	    	refillTotal_qycz[i]= areaRefilleRankContent_qy[i].refillTotal;
	 	}
	    
	  // 收费
	    var areaChargeRankContent_qy = radioIncomeByAreaJson.areaChargeRankContent;
	    var regions_qysf = new Array();
	    var chargeTotal_qysf = new Array();
	    for(var i=0; i<areaChargeRankContent_qy.length; i++){  
	    	regions_qysf[i]= areaChargeRankContent_qy[i].region;
	    	chargeTotal_qysf[i]= areaChargeRankContent_qy[i].chargeTotal;
	 	}
	     var series_data=[
            // {value:areaRefillTotal_qy, name:'今日充值', selected:true
			// ,itemStyle:{normal:{color:"#FF5C26"}}},
            {value:areaChargeTotal_qy, name:'今日收费', itemStyle:{normal:{color:"#0080FF"}}}
         ];
	     var option_qy_value = new Array();
	     /*
			 * for(var i=0;i<regions_qycz.length;i++){
			 * option_qy_value[option_qy_value.length] =
			 * {value:refillTotal_qycz[i], name:regions_qycz[i],
			 * itemStyle:{normal:{color:colors[option_qy_value.length]}}}; }
			 */
	     var count=0;
	     for(var i=0;i<regions_qysf.length;i++){
	    	 if(chargeTotal_qysf[i] != 0){
	    		 // option_qy_value.length = option_qy_value.length + 1;
	    		 option_qy_value[count] = {value:chargeTotal_qysf[i], name:regions_qysf[i], itemStyle:{normal:{color:colors_qy[count]}}};
		    	 count++;
	    	 }
	     }
	     
	     var pieEChart_qy =  echarts.init(document.getElementById('qyDiv'));
	     option_qy = {
	        tooltip: {
	            trigger: 'item',
	            /* {a}, {b}，{c}，{d}%，分别表示系列名，数据名，数据值 百分比 */
	            formatter: "{a} <br/>{b}: {c} ({d}%)"
	        },
	        legend: {
// orient: 'vertical',
	            x: 'right',
	            data:regions_qysf
	        },
	        series: [
	            /*
				 * { name:'今日收入', type:'pie', selectedMode: 'single', radius :
				 * [0, 70],
				 * 
				 * label: { normal: { position: 'inner' } }, labelLine: {
				 * normal: { show: false } }, data:series_data }, {
				 * name:'今日收入', type:'pie', radius: [90, 120],
				 * data:option_qy_value }
				 */
	            {
		            name: '今日收费',
		            type: 'pie',
		            radius : '65%',
		            center: ['40%', '50%'],
		            itemStyle: {normal: {
		                label : {show:true,position:'top',formatter:'{b}:\n {c}元 \n ({d}%)'}
		            }},
		            data:option_qy_value,
		        }
	        ]
	     };
	     pieEChart_qy.setOption(option_qy);
}

// 各渠道收入情况
function radioIncomeByPaytypeFun(radioIncomeByPaytypeJson){
	   
	    var areaChargeTotal_qd = radioIncomeByPaytypeJson.areaChargeTotal;
	    var areaRefillTotal_qd = radioIncomeByPaytypeJson.areaRefill;
	    $("#qdsfzj").html(areaChargeTotal_qd);
	    
		var series_data_qd=[
            // {value:areaRefillTotal_qd, name:'今日充值', selected:true
			// ,itemStyle:{normal:{color:"#FF5C26"}}},
            {value:areaChargeTotal_qd, name:'今日收费', itemStyle:{normal:{color:"#0080FF"}}}
         ];
		
	    // 收费
	    var areaChargeRankContent_qd = radioIncomeByPaytypeJson.areaChargeRankContent;
	    var regions_qdsf = new Array();
	    var chargeTotal_qdsf = new Array();
	    for(var i=0; i<areaChargeRankContent_qd.length; i++){  
	    	regions_qdsf[i]= areaChargeRankContent_qd[i].name;
	    	chargeTotal_qdsf[i]= areaChargeRankContent_qd[i].value;
	 	}
	    // 充值
	    /*
		 * var areaRefilleRankContent_qd =
		 * radioIncomeByPaytypeJson.areaRefilleRankContent; var regions_qdcz =
		 * new Array(); var refillTotal_qdcz = new Array(); for(var i=0; i<areaRefilleRankContent_qd.length;
		 * i++){ regions_qdcz[i]= areaRefilleRankContent_qd[i].name;
		 * refillTotal_qdcz[i]= areaRefilleRankContent_qd[i].value; }
		 */
	     
	     var option_qd_value = new Array();
	    /*
		 * for(var i=0;i<regions_qdcz.length;i++){
		 * option_qd_value[option_qd_value.length] =
		 * {value:refillTotal_qdcz[i], name:regions_qdcz[i],
		 * itemStyle:{normal:{color:colors[option_qd_value.length]}}}; }
		 */
	     var count=0;
	     for(var i=0;i<regions_qdsf.length;i++){
	    	 if(chargeTotal_qdsf[i] != 0){
	    		 option_qd_value[count] = {value:chargeTotal_qdsf[i], name:regions_qdsf[i], itemStyle:{normal:{color:colors_qd[i]}}};
		    	 count++;
	    	 }
	     }
	     
	   // 收费渠道情况
	     var pieEChart_qd =  echarts.init(document.getElementById('qdDiv'));
	     option_qd = {
	        tooltip: {
	            trigger: 'item',
	            /* {a}, {b}，{c}，{d}%，分别表示系列名，数据名，数据值 百分比 */
	            formatter: "{a} <br/>{b}: {c} ({d}%)"
	        },
	        legend: {
// orient: 'vertical',
	            x: 'right',
	            data:regions_qdsf
	        },
	        series: [
	            /*
				 * { name:'今日收入', type:'pie', selectedMode: 'single', radius :
				 * [0, 70],
				 * 
				 * label: { normal: { position: 'inner' } }, labelLine: {
				 * normal: { show: false } }, data:series_data_qd }, {
				 * name:'今日收入', type:'pie', radius: [90, 120],
				 * 
				 * data:option_qd_value }
				 */
	            {
		            name: '今日收费',
		            type: 'pie',
		            radius : '65%',
		            center: ['40%', '50%'],
		            itemStyle: {normal: {
		                label : {show:true,position:'top',formatter:'{b}:\n {c}元 \n ({d}%)'}
		            }},
		            data:option_qd_value,
		        }
	        ]
	     };
	     pieEChart_qd.setOption(option_qd);
	     
}
       