var top_5_color = ['#C1232B','#B5C334','#FCCE10','#E87C25','#FFA64D'];
function top5(names,values,colors,div_id){		
    for(var i=values.length-1;i>=0;i--){
    	var width = values[i]/values[values.length-1] * 100;
    	var str = '<div class="clearfix">'+
        			'<span class="pull-left">'+names[i]+'</span>'+
        			'<small class="pull-right">'+values[i]+'元</small>'+
        		   '</div>'+
        		   '<div class="progress xs">'+
        		   	' <div class="progress-bar progress-bar-red" style="width:'+width+'%;background-color:'+colors[i]+';"></div>'+
        		   ' </div>';
    	$("#"+div_id).append(str);
    }
    //解决首页Top5不足5个排版问题
    if(values.length<5){
    	for(var j=0;j<5-values.length;j++){
        	var str = '<div class="clearfix">'+
            			'<span class="pull-left">&nbsp;</span>'+
            			'<small class="pull-right">&nbsp;</small>'+
            		   '</div>'+
            		   '<div class="progress xs">'+
            		   	' <div class="progress-bar progress-bar-red" style="width:100%;background-color:#F5F5F5;"></div>'+
            		   ' </div>';
        	$("#"+div_id).append(str);
        }
    }
}

function top5Park(topParkJson){
	var parksTop = topParkJson.parksTop;
    var totalChargeFee_park = topParkJson.totalChargeFee;
    top5(parksTop, totalChargeFee_park, top_5_color, "top5Park");
}

function top5Collector(topCollectorJson){
    var collectorsTop = topCollectorJson.collectorsTop;
    var totalChargeFee_coll = topCollectorJson.totalChargeFee;
    top5(collectorsTop, totalChargeFee_coll, top_5_color, "top5Collector");	    
}
	
       