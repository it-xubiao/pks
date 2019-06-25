/*存储标签页，主要是生成Id，不清空，目前放置的内容是标签名称*/
var tabslist = new Array();
/**下一个标签元素，作用是标识关闭后需要选中的标签，点击关闭按钮做得临时变量*/
var nextNavId=null;
        
 window.onload = function(){
    calcFrame();
    /*计算标签容器宽度*/
    calcTabContainer();

    $("#roll-left").bind('click',function()
    {
      var left =  $("#tabs-ul").css('left');
      var leftNum = parseInt(left)+50;
      $("#tabs-ul").css('left',leftNum);             
    });
    
    $("#roll-right").bind('click',function()
    {
        var left =  $("#tabs-ul").css('left');
        var leftNum = parseInt(left)-50;
        $("#tabs-ul").css('left',leftNum);     
    });
    
    /*$(".tab-item").live('click',function()
    {
        $(".tab-item").removeClass('current-tab');
        $(this).addClass('current-tab');
    });*/
    
    $(document).on("click",".tab-item",function(){
        $(".tab-item").removeClass('current-tab');
        $(this).addClass('current-tab');
        
        var idNum = $(this).attr("id");
        
        idNum = idNum.replace("tab-item","");
        $(".content-holder").css("display","none");
        
        //alert("content-holder"+idNum);
        
        $("#content-holder"+idNum).css("display","block");
        
        if(nextNavId!=null)
        {
            idNum=nextNavId;
            $("#"+nextNavId).addClass('current-tab');
            idNum = idNum.replace("tab-item","");
            $(".content-holder").css("display","none");
            $("#content-holder"+idNum).css("display","block");
            nextNavId=null;
        }
        
    }); 
    
    $(document).on("click",".tab-close",function()
    {
       //if(confirm("确认要关闭当前页么?"))
       //{
           //alert("关闭了");
            var idNum = $(this).parent().attr("id");
            idNum = idNum.replace("tab-item","");
            $(".tab-item").removeClass('current-tab');
            nextNavId = $(this).parent().next().attr("id");
            
            $("#content-holder"+idNum).remove();
            
            $(this).parent().remove();
      // }
    });
    
    $(window).resize(function() {
        calcTabContainer();
        calcFrame();
    });
    
    
};

function calcTabContainer()
{
    var rollLeftW = $("#roll-left").width();
    var rollRightW = $("#roll-right").width();
    var tabContainerW = $(".tab-container").width();

    var width = parseInt(tabContainerW) - parseInt(rollLeftW)-parseInt(rollRightW)-2;
    
    console.log('width:'+width);            
    console.log($(".tab-container").width());
    
    $(".tabs").width(width);
}

function calcFrame()
{
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    
    var fixedHeight= windowHeight-50-40;
    
    $(".frame-display").width(windowWidth);
    $(".frame-display").height(fixedHeight);
    
    $("#content-holder").width(windowWidth);
    $("#content-holder").height(fixedHeight);
}


function addTab(icon,text,url,closable)
{
   var index = tabslist.length;
   var item= "<li class='tab-item' id=\"tab-item"+(index+1)+"\">";
       if(icon!=null)
       {
           item+="<div class='tab-icon' style=\"background-image: url('images/people.png')\"></div>";
       }                
       item+="<div class='tab-text'>"+text+"</div>";
       if(closable)
       {
           item+="<div class='tab-close'><a href='#' title='关闭'></a></div>";
       }
       item+="</li>";
       
      $("#tabs-ul").append(item);
      tabslist.push(text);
      addFrame(index+1,url);
      
      $(".tab-item").removeClass('current-tab');
      $("#tabs-ul").find("li").last().addClass('current-tab');
      calcFrame();
}

function addFrame(index,url)
{
    var frame ="<div id=\"content-holder"+index+"\" class=\"content-holder\" style=\"display: block\">";
        frame+="<iframe id=\"holder-frame"+index+"\" class=\"frame-display\" frameborder=\"no\" border=\"0\" width=\"100%\" height=\"100%\" src=\""+url+"\">";
        frame+="</iframe>";
        frame+="</div>";
        
        $(".content-holder").css("display","none");
        $(".tab-contents").append(frame);            
}