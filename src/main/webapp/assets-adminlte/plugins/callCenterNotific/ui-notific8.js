var UINotific8 = function () {
    return {
        init: function () {
        	
        	//轮询呼叫后台表,查出未显示过的呼叫信息并弹出到页面
        	setInterval(function() {
	        	$.ajax({
	        		url : basePath+"/action/homeStat/getCallCenterJson.do",
	        		type : 'get',
	        		success : function(result) {
	        			for(var i in result){
	        				var settings = {
	        		                theme: 'ruby',
	        		                sticky: 1,
	        		                horizontalEdge: 'top',
	        		                verticalEdge: 'right'
	        		            },
	        		            $button = $(this);
	        		            settings.heading = result[i].regionName + " " + result[i].parkName +" 收费员：" + result[i].collectorName;
	        		            settings.life = 3000;
	        		            $.notific8('zindex', 11500);
	        		            $.notific8("呼叫：" + (result[i].callType == 0 ? "巡查" : "片长"), settings);
	        		            $button.attr('disabled', 'disabled');
                           	 playSound();
	        			}
	        		}
	        	})
        	}, 2000);
        }
    };
}();
function playSound()
{
    var borswer = window.navigator.userAgent.toLowerCase();
    if ( borswer.indexOf( "ie" ) >= 0 )
    {
        //IE内核浏览器
        var strEmbed = '<embed name="embedPlay" src="http://www.gongqinglin.com/accessory/ding.wav" autostart="true" hidden="true" loop="false"></embed>';
        if ( $( "body" ).find( "embed" ).length <= 0 )
            $( "body" ).append( strEmbed );
        var embed = document.embedPlay;

        //浏览器不支持 audion，则使用 embed 播放
        embed.volume = 100;
        //embed.play();这个不需要
    } else
    {
        //非IE内核浏览器
        var strAudio = "<audio id='audioPlay' src='http://www.gongqinglin.com/accessory/ding.wav' hidden='true'>";
        if ( $( "body" ).find( "audio" ).length <= 0 )
            $( "body" ).append( strAudio );
        var audio = document.getElementById( "audioPlay" );

        //浏览器支持 audion
        audio.play();
    }
}
jQuery(document).ready(function() {    
   UINotific8.init();
});