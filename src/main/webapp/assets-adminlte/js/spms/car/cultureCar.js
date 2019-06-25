var myPath=basePath+'/action/cultureCar';
$(function () {
    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();

    //2.初始化表单的验证
    var oFormInit = new FormInit();
    oFormInit.Init();

    //3.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();

});


var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#data_list_table').bootstrapTable({
            url:myPath+ '/dataList.do',      //请求后台的URL（*）
            method: 'post',           //请求方式（*）
            toolbar: '#toolbar',        //工具按钮用哪个容器
            striped: true,           //是否显示行间隔色
            cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            showRefresh:true,
            showToggle:true,
            showColumns:true,
            pagination: true,          //是否显示分页（*）
            sortable: true,           //是否启用排序
            sortName:"id",     //排序字段名称
            sortOrder: "desc",          //排序方式
            queryParamsType:'limit',
            queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "server",      //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,            //初始化加载第一页，默认第一页
            pageSize: 10,            //每页的记录行数（*）
            pageList: [10, 25, 50, 100],    //可供选择的每页的行数（*）
            strictSearch: true,
            clickToSelect: true,        //是否启用点击选中行
// 	        height: 460,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",           //每一行的唯一标识，一般为主键列
            cardView: false,          //是否显示详细视图
            contentType: "application/x-www-form-urlencoded",
            columns: [
                {
                    field: 'checkbox',
                    checkbox: true,
                    align: 'center',
                    valign: 'middle'

            },{field: 'driverName',title: '车主姓名', align:'center',valign:'middle',sortable:true},{

                field: 'id',
                    title: '序号',
                    align: 'center',
                    valign: 'middle',
                    visible:false
                },
                {
                    field: 'plateNo',
                    title: '车牌号',
                    align:'center',
                    valign:'middle',
                    sortable:true
                },
                {
                    field: 'plateColor',
                    title: '车牌颜色',
                    align:'center',
                    valign:'middle',
                    sortable:true,
                    formatter : sys.dicts.text('PLATE_COLOR')
                },
                {field: 'effictiveTime',title: '生效时间', align:'center',valign:'middle',sortable:true},
                {field: 'expireTime',title: '失效时间', align:'center',valign:'middle',sortable:true},
            ],



        });
    };

    oTableInit.queryParams = function (params) {
        $.each(params,function(key,val){
            if($.isPlainObject(val) || $.isArray(val)){
                subObj(val);
            }else{
                console.log(key+'='+val);
            }
        });
        var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
            rows: params.limit, //页码
            /*  sort : params.sort,
             order : params.order,*/
            date: $("#codeType").val(),
            plateNo:$('#search_plateNo').val(),
            driverName:$('#search_driverName').val()
        };
        return temp;
    };
    return oTableInit;
};


var ButtonInit=function(){
    var oButtonInit = new Object();
    //初始化Table
    oButtonInit.Init = function () {


        $('#modify').click(function(){

            var rows=$('#data_list_table').bootstrapTable('getAllSelections');
            if(rows==null||rows.length>1 || rows.length<=0){
                swal("请选择一条记录");
                return ;
            }
            $.ajax({
                url:myPath+'/getId.do',
                type:"post",
                data:{id:rows[0].id},
                success: function(result) {
                    /*  $('#editForm').form('reset')*/
                    var data=result.data;
                    $('#plateNo').val(data.plateNo),
                        $('#id').val(data.id),
                        $('#plateNo').val(data.plateNo),
                        $('#plateColor').val(data.plateColor),
                        $('#driverName').val(data.driverName),
                        $('#edit').modal('show');
                }
            });

        })
        $('#delete').click(function(){
            var ids=[] ;
            var names=[];
            var rows=$('#data_list_table').bootstrapTable('getAllSelections');
            if(rows.length==0){
                swal("请选择一条记录！");
                return;
            }
            for(var i=0;i<rows.length;i++){
                ids.push(rows[i].id)
                names.push(rows[i].plateNo);
            }
            swal({
                    title: "删除提醒",
                    text: "你确定要删除车牌分别为："+names+"的数据吗？",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    closeOnConfirm: true,
                    closeOnCancel: true
                },
                function(isConfirm){
                    if (isConfirm) {
                        $.ajax({
                            url:myPath+'/delete.do',
                            type:"post",
                            data:{"id":ids},
                            traditional:true,
                            success: function(result) {
                                if(result.success){
                                    swal("", "删除成功", "success");
                                    $('#data_list_table').bootstrapTable("refresh");

                                }else{
                                    swal("", "删除失败", "error");
                                }

                            }
                        });



                    }
                });


        })
        $('#searchBtn').click(function(){

            $('#data_list_table').bootstrapTable("refresh");
        })


        $('#edit').on('hide.bs.modal', function () {
            document.getElementById('editForm').reset()
           $('#editForm').data('bootstrapValidator').resetForm(true);
        })





    }

    return oButtonInit;
}



var FormInit=function(){
    var oFormInit = new Object();
    //初始化Table
    oFormInit.Init = function () {


        $('#editForm').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                plateNo: {
                    validators: {
                        regexp: {
                            regexp: /^^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z_0-9]{4}[a-zA-Z_0-9_\u4e00-\u9fa5]$|^[a-zA-Z]{2}\d{7}$ $/,
                            message: '车牌号码无效（例：浙A12350）'
                        }

                    }
                },

            },

        }).on('success.form.bv', function (e) {


            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.post(myPath+"/save.do", $form.serialize(), function(result) {
                if(result.success){
                    swal("",result.msg,"success");
                    $('#edit').modal('hide');
                    $('#data_list_table').bootstrapTable("refresh");
                }else{
                    swal("",result.msg,"error");
                }
            }, 'json');

        });

    /*    return false ;*/





    }

    return oFormInit;
}





function downloadTemplate() {
    window.open(myPath + '/downloadTemplate.do');
}

function upload(){


    var options = {
        success: function(result){
            if(result.success){
                swal("",result.msg,"success");
                $('#data_list_table').bootstrapTable("refresh");
                $('#import').modal("hide");
            }else{

                swal("",result.msg==null?"数据错误":result.msg,"error");
            }

        },  //处理完成
        resetForm: true,
    };
          $("#uploadForm").ajaxSubmit(options);
}







