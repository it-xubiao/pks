var upload_status = 0;
document.write(" <script language=\"javascript\" src=\"../../assets-adminlte/plugins/common/idno.js\" > <\/script>");
$(document).ready(function () {
    $("form input ").blur(function () {
        var form_name = get_form_name($(this));
        var input_name = $(this).attr("name");
        check_form_info(form_name, input_name);
    });
});

//检查表单内所有input
function check_form_info_all(formName) {
    return check_form_info(formName, "-1");
}

function check_form_info(formName, select_input_name) {
    var success_flag = 1;
    var error_type = $("form[name=" + formName + "]").attr("error_type");
    //判断input
    $("form[name=" + formName + "] input ").each(function () {
        var next_flag = 0;
        if (select_input_name != "-1") {
            //只是指定一个
            if ($(this).attr("name") != select_input_name) {
                next_flag = 1;
            }
        }
        if (next_flag == 1) {
            return true;
        }
        //底部显示错误类型
        if (error_type == "bottom") {
            if (success_flag == 0)
                return;
        }
        var error_msg; //错误信息
        //获取input类型
        var type = $(this).attr("type");
        //判断 data-verify 是否需要检验
        var display_value = "inline-block";
        display_value = $(this).css("display");

        if ($(this).attr("data-verify") && display_value != "none") {
            //alert($(this).attr("data-verify"));
            var data_verify_array = get_data_verify_info($(this).attr("data-verify"));
            //循环验证data
            for (var i = 0; i < data_verify_array.length; i++) {
                var error_flag = 0;
                //如果该数值为空，而且该数值不要求必填的，可以不考虑
                var need_check = 1;
                if ($(this).val() == "") {
                    var find_flag = 0;
                    for (var t = 0; t < data_verify_array.length; t++) {
                        if (data_verify_array[t] == "empty")
                            find_flag = 1;
                    }
                    if (find_flag == 0)
                        need_check = 0;
                }
                //alert(need_check);
                if (need_check == 1) {
                    switch (data_verify_array[i]) {
                        //验证 非空
                        case "empty":
                        {
                            //alert( $(this).val() );
                            if ($(this).val() == "") {
                                //alert( $(this).val() );
                                error_msg = get_error_msg(formName, $(this), data_verify_array[i]);
                                error_flag = 1;
                                break;
                            }
                            break;
                        }

                        //验证 手机号
                        case "mobile":
                        {
                            var reg = /^1\d{10}$/;
                            /*定义正则表达式,手机号只验证是否为11位数字*/
                            if (reg.test($(this).val()) == false) {
                                error_msg = get_error_msg(formName, $(this), data_verify_array[i]);
                                error_flag = 1;
                                break;
                            }
                            break;
                        }

                        //验证 登录名
                        case "login_name":
                        {
                            var reg = /^[0-9a-zA-Z_-]{6,20}$/;
                            if (reg.test($(this).val()) == false) {
                                error_msg = get_error_msg(formName, $(this), data_verify_array[i]);
                                error_flag = 1;
                                break;
                            }
                            break;
                        }

                        //验证码
                        case "ehong":
                        {
                            if ($.idcode.validateCode() == false) {
                                error_msg = get_error_msg(formName, $(this), data_verify_array[i]);
                                error_flag = 1;
                                break;
                            }
                            break;
                        }

                        //手机验证码
                        case "recom_code" :
                        {
                            var reg = /\d{6}/;
                            /*定义正则表达式,手机验证码只验证是否为6位数字*/
                            if (reg.test($(this).val()) == false) {
                                error_msg = get_error_msg(formName, $(this), data_verify_array[i]);
                                error_flag = 1;
                                break;
                            }
                            break;
                        }

                        //密码
                        case "password" :
                        {
                            var reg = /^[a-zA-Z0-9]{6,20}$/;
                            /*定义正则表达式,密码只验证是否为6位数字*/
                            if (reg.test($(this).val()) == false) {
                                error_msg = get_error_msg(formName, $(this), data_verify_array[i]);
                                error_flag = 1;
                                break;
                            }
                            break;
                        }

                        //再次确认
                        case "twice" :
                        {
                            var pre_name = $(this).attr("data-twice");
                            var pre_val = $("input[name=" + pre_name + "]").val();
                            //alert(pre_val)
                            if ($(this).val() != pre_val) {
                                error_msg = get_error_msg(formName, $(this), data_verify_array[i]);
                                error_flag = 1;
                                break;
                            }
                            break;
                        }

                        //昵称验证
                        case "nickname" :
                        {
                            var reg = /^[a-zA-Z0-9]{1,20}$/;
                            /*定义正则表达式,密码只验证是否为6位数字*/
                            if (reg.test($(this).val()) == false) {
                                error_msg = get_error_msg(formName, $(this), data_verify_array[i]);
                                error_flag = 1;
                                break;
                            }
                            break;
                        }

                        //邮箱验证
                        case "mail" :
                        {
                            var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                            if (reg.test($(this).val()) == false) {
                                //alert($(this).val());
                                error_msg = get_error_msg(formName, $(this), data_verify_array[i]);
                                error_flag = 1;
                                break;
                            }
                            break;
                        }

                        //真实姓名
                        case "real_name" :
                        {
                            var reg = /^\s*[\u4e00-\u9fa5]{1,15}\s*$/;
                            if (reg.exec($(this).val()) == false) {
                                error_msg = get_error_msg(formName, $(this), data_verify_array[i]);
                                error_flag = 1;
                                break;
                            }
                            break;
                        }

                        //不能有空格
                        case "no_space" :
                        {
                            var reg = /\s/;
                            if (reg.exec($(this).val()) == false) {
                                error_msg = get_error_msg(formName, $(this), data_verify_array[i]);
                                error_flag = 1;
                                break;
                            }
                            break;
                        }

                        //身份证号
                        case "id_no" :
                        {
                            var checkFlag = new clsIDCard($(this).val());
                            if (!checkFlag.IsValid()) {

                                //    if(IdentityCodeValid($(this).val())==false)
                                //{
                                error_msg = get_error_msg(formName, $(this), data_verify_array[i]);
                                error_flag = 1;
                                break;
                            }

                            break;

                            //var patrn = /^\s*\d{15}\s*$/;
                            //var patrn1 = /^\s*\d{16}[\dxX]{2}\s*$/;
                            //if(!patrn.exec($(this).val()) && !patrn1.exec($(this).val()))
                            //{
                            //    error_msg = get_error_msg(formName,$(this),data_verify_array[i]);
                            //    error_flag = 1;
                            //    break;
                            //}
                            //break;
                        }

                        //文件
                        case "file" :
                        {
                            if ($(this).attr("param_value") == "") {
                                error_msg = get_error_msg(formName, $(this), data_verify_array[i]);
                                error_flag = 1;
                                break;
                            }
                            break;
                        }

                        //银行卡号
                        case "bankcard" :
                        {
                            //var reg = /^\d{1,30}/;  /*定义正则表达式,手机验证码只验证是否为6位数字*/
                            //if(reg.test($(this).val()) == false)
                            if (luhmCheck($(this).val()) == false) {
                                error_msg = get_error_msg(formName, $(this), data_verify_array[i]);
                                error_flag = 1;
                                break;
                            }
                            break;
                        }

                        //金额
                        case "money" :
                        {
                            var reg = /\d{1,}/;
                            /*定义正则表达式,手机验证码只验证是否为6位数字*/
                            if (reg.test($(this).val()) == false) {
                                error_msg = get_error_msg(formName, $(this), data_verify_array[i]);
                                error_flag = 1;
                                break;
                            }
                        }
                    }
                }

                //处理
                if (error_flag == 1) {
                    export_error(formName, $(this), error_msg);
                    success_flag = 0;
                    i = data_verify_array.length;
                    //alert(error_msg);
                }
                else {
                    export_success(formName, $(this));
                }
            }
        }
    });

    if (success_flag == 1) {
        return true;
    }
    else
        return false;
}

//错误提示
function get_error_msg(formName, object, data_verify_type) {

    //alert(data_verify_type);
    var type_name = object.attr("type");
    var error_type = $("form[name=" + formName + "]").attr("error_type");
    var error_msg = "";

    //非空错误
    if (data_verify_type == "empty") {
        error_msg = get_chinese_name(object.attr("name")) + "不能为空";
    }

    //登录名格式错误
    if (data_verify_type == "login_name") {
        error_msg = get_chinese_name(object.attr("name")) + "格式错误，长度应为6-20个字符";
    }

    //手机格式错误
    if (data_verify_type == "mobile") {
        error_msg = get_chinese_name(object.attr("name")) + "格式错误";
    }

    //手机格式错误
    if (data_verify_type == "newmobile") {
        error_msg = get_chinese_name(object.attr("name")) + "格式错误";
    }

    //密码格式错误
    if (data_verify_type == "password") {
        error_msg = get_chinese_name(object.attr("name")) + "格式错误，需6-20位字符(字母或数字)";
    }

    //验证码
    if (data_verify_type == "ehong") {
        error_msg = get_chinese_name(object.attr("name")) + "错误";
    }

    //手机验证码
    if (data_verify_type == "recom_code") {
        error_msg = get_chinese_name(object.attr("name")) + "格式错误";
    }

    //手机验证码
    if (data_verify_type == "new_recom_code") {
        error_msg = get_chinese_name(object.attr("name")) + "格式错误";
    }

    //手机验证码
    if (data_verify_type == "twice") {
        error_msg = "两次输入不一致";
    }

    //昵称
    if (data_verify_type == "nickname") {
        error_msg = get_chinese_name(object.attr("name")) + "格式错误";
    }

    //邮箱
    if (data_verify_type == "mail") {
        error_msg = get_chinese_name(object.attr("name")) + "格式错误";
    }

    //姓名

    if (data_verify_type == "real_name") {
        error_msg = get_chinese_name(object.attr("name")) + "格式错误";
    }

    //身份证
    if (data_verify_type == "id_no") {
        error_msg = get_chinese_name(object.attr("name")) + "格式错误";
    }

    //身份证
    if (data_verify_type == "file") {
        error_msg = get_chinese_name(object.attr("param_name")) + "不能为空";
    }

    //银行卡
    if (data_verify_type == "bankcard") {
        error_msg = get_chinese_name(object.attr("name")) + "格式错误";
    }

    //金额
    if (data_verify_type == "money") {
        error_msg = get_chinese_name(object.attr("name")) + "格式错误";
    }

    //金额
    if (data_verify_type == "no_space") {
        error_msg = get_chinese_name(object.attr("name")) + "不能有空格";
    }
    return error_msg;
}

//获取标题
function get_chinese_name(en_name) {
    if (en_name == "mobile")
        return "手机号";
    if (en_name == "newmobile")
        return "新手机号";

    if (en_name == "login_name")
        return "登录名";

    if (en_name == "password")
        return "密码";

    if (en_name == "oldpwd")
        return "原密码";

    if (en_name == "captcha")
        return "验证码";

    if (en_name == "recom_code")
        return "手机验证码";

    if (en_name == "new_recom_code")
        return "新手机验证码";

    if (en_name == "password_confirm")
        return "确认密码";

    if (en_name == "nickname")
        return "昵称";

    if (en_name == "mail")
        return "邮箱";

    if (en_name == "real_name")
        return "姓名";

    if (en_name == "id_no")
        return "身份证";

    if (en_name == "positive_file_pic")
        return "正面照片";
    if (en_name == "negative_file_pic")
        return "反面照片";

    if (en_name == "branch_name")
        return "支行名称";

    if (en_name == "bankcard_no")
        return "银行卡号";
    if (en_name == "money")
        return "金额";
    if (en_name == "remark")
        return "备注";
    if (en_name == "bank_name")
        return "银行名称";


    if (en_name == "nick_name")
        return "昵称";
    if (en_name == "day")
        return "天数";
    if (en_name == "login_name")
        return "帐号";
    if (en_name == "role_name")
        return "权限组";

    //产品发布
    if (en_name == "product_name")
        return "产品名称";
    if (en_name == "start_time")
        return "募集开始时间";
    if (en_name == "raise_target")
        return "募集目标";
    if (en_name == "min_invest")
        return "最小起投";
    if (en_name == "year_yield")
        return "预期年化";
    if (en_name == "plateNo")
        return "车牌号";
    if (en_name == "plateColor")
        return "车牌颜色";
    

    //策略师申请表单字段
    if(en_name == "person_note")
        return "投资理念";

    return "";
}

//输出错误

function export_error(formName, object, error_msg) {
    var type_name = object.attr("type");
    var error_type = $("form[name=" + formName + "]").attr("error_type");

    //边框提示
    if (error_type == "border") {
        object.addClass("error_border");
    }

    //底部显示错误类型
    if (error_type == "bottom") {
        object.addClass("error_border");

        $("form[name=" + formName + "] .form-error-bottom").html(error_msg);
        $("form[name=" + formName + "] .form-error-bottom").removeClass("display_none");
        //alert(error_type)
    }

    //右侧显示错误
    if (error_type == "right") {
        object.addClass("error_border");
        object.parent().children(".error_msg").remove();
        object.parent().append("<span class='error_msg' style='color:red;'>(" + error_msg + ")</span>");
    }
}


//输出api 错误

function export_api_error(formName, error_msg) {


    var error_type = $("form[name=" + formName + "]").attr("error_type");


    //底部显示错误类型
    //if(error_type == "bottom")
    {

        $("form[name=" + formName + "] .form-error-bottom").html(error_msg);
        $("form[name=" + formName + "] .form-error-bottom").removeClass("display_none");
        //alert(error_type)
    }

}

function remove_api_error(formName) {
    $("form[name=" + formName + "] .form-error-bottom").html("");
    $("form[name=" + formName + "] .form-error-bottom").addClass("display_none");
}


//检验成功
function export_success(formName, object) {
    var error_type = $("form[name=" + formName + "]").attr("error_type");
    //底部显示类型
    if (error_type == "bottom") {
        object.removeClass("error_border");
        $("form[name=" + formName + "] .form-error-bottom").html();
        $("form[name=" + formName + "] .form-error-bottom").addClass("display_none");
    }

    //右侧
    if (error_type == "right") {
        object.removeClass("error_border");
        object.parent().children(".error_msg").remove();
    }
}


//拆分 data-verify
function get_data_verify_info(infostr) {
    var data_verify_array = new Array();
    data_verify_array = infostr.split(" "); //字符分割

    return data_verify_array;

}


//获取 form 中所有 上传参数的列表

function get_form_param_str(formName) {

    var paramstr = "";


    //判断input
    $("form[name=" + formName + "] input ").each(function () {

        //获取input类型
        var type = $(this).attr("type");


        if (type == "text" || type == "password" || type == "hidden") {
            var value = $(this).val();

            if (typeof($(this).attr("encode")) == "undefined") {
                //alert("0");
            }
            else {
                if ($(this).attr("encode") == 1) {
                    value = urlencode($(this).val());

                    //alert(value);

                }
            }

            paramstr = paramstr + "&" + $(this).attr("name") + "=" + value;
        }

        if (type == "file") {
            // var target_id = $(this).attr("target_id");

            //var src = document.getElementById(target_id).src;

            paramstr = paramstr + "&" + $(this).attr("param_name") + "=" + $(this).attr("param_value");


            //alert($("'#"+target_id+"'").src());
        }


        if (type == "radio") {
            if ($(this).attr("checked") == "checked") {

                paramstr = paramstr + "&" + $(this).attr("name") + "=" + $(this).val();
            }

        }


    });

    //判断select
    $("form[name=" + formName + "] select ").each(function () {


        if (typeof($(this).attr("name")) == "undefined") {

        }
        else {

            var value = $(this).find('option:selected').val();


            paramstr = paramstr + "&" + $(this).attr("name") + "=" + value;
        }


    });

    //判断textarea
    $("form[name=" + formName + "] textarea ").each(function () {


        if (typeof($(this).attr("name")) == "undefined") {

        }
        else {
            var v = $(this).val();

            var value = line2bren(v);

            //alert("123");


            if ($(this).attr("encode") == 1) {

                v = $(this).val();+$('#input').prop('placholder')

                var u = line2bren(v);

                value = urlencode(u);

                //alert(value);

            }


            //alert(value);
            paramstr = paramstr + "&" + $(this).attr("name") + "=" + value;


        }


    });


    //alert(paramstr);


    return paramstr;
}

//调用服务器api

function send_request(form_name, process_success) {
    $.ajax({
        url: $("form[name=" + form_name + "]").attr("action"),
        type: "post",
        data: get_form_param_str(form_name),
        dataType: 'json',
        success: function (data) {

            //alert(data.code);
            if (data.code == 1) {
                export_api_error(form_name, data.msg);

                //alert(data.msg)
            }
            else {
                remove_api_error(form_name);
                process_success(data);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            export_api_error(form_name, textStatus);

        }
    });

}


function send_request_with_parameters(form_name, parameters, process_success) {
    var final_param = get_form_param_str(form_name) + parameters;

    //alert(final_param);
    //return;
    $.ajax({
        url: $("form[name=" + form_name + "]").attr("action"),
        type: "post",
        data: final_param,
        dataType: 'json',
        success: function (data) {

            //alert(data.code);
            if (data.code == 1) {
                export_api_error(form_name, data.msg);

                //alert(data.msg)
            }
            else {
                remove_api_error(form_name);
                process_success(data);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            export_api_error(form_name, textStatus);

        }
    });

}

//最终
function ajax_request_post(form_name, parameters, process_success, process_fail) {
    if (upload_status == 1)
        return;

    upload_status = 1;
    var final_param = get_form_param_str(form_name);


    //return;
    $.ajax({
        url: $("form[name=" + form_name + "]").attr("action") + "?" + final_param,
        type: "post",
        data: parameters,
        dataType: 'json',
        success: function (data) {
            upload_status = 0;
            //alert(data.code);
            if (data.code == 1) {
                export_api_error(form_name, data.msg);

                process_fail();

                //alert(data.msg)
            }
            else {
                //alert(data.code);
                remove_api_error(form_name);
                process_success(data);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            upload_status = 0;
            export_api_error(form_name, textStatus);
            process_fail();

        }
    });

}
//最终
function ajax_request(form_name, parameters, process_success, process_fail) {
    if (upload_status == 1)
        return;

    upload_status = 1
    var final_param = get_form_param_str(form_name) + parameters;

    //alert(final_param);
    //return;
    $.ajax({
        url: $("form[name=" + form_name + "]").attr("action"),
        type: "post",
        data: final_param,
        dataType: 'json',
        success: function (data) {
            upload_status = 0;
            // alert(data.code);
            if (data.code == 1) {
                export_api_error(form_name, data.msg);

                process_fail();

                //alert(data.msg)
            }
            else {
                remove_api_error(form_name);
                process_success(data);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            upload_status = 0;
            export_api_error(form_name, textStatus);
            process_fail();

        }
    });

}


//直接调用api
function send_request_direct(url, paramlist, process_success, process_fail) {
    $.ajax({
        url: url,
        type: "post",
        data: paramlist,
        dataType: 'json',
        success: function (data) {

            if (data.code == 1) {


                process_fail(data);
            }
            else {

                process_success(data);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            process_fail(data);


        }
    });

}


//获取所在form 表单的 form name

function get_form_name(obj) {
    var form_name = "";

    var t_obj = obj;

    for (var i = 1; i < 15; i++) {
        if (t_obj.is('form')) {
            // alert(t_obj.attr("name"));

            return t_obj.attr("name");

        }
        else {

        }

        t_obj = t_obj.parent();
    }


}


function get_form_obj(obj) {
    var form_name = "";

    var t_obj = obj;

    for (var i = 1; i < 15; i++) {
        if (t_obj.is('form')) {
            // alert(t_obj.attr("name"));

            return t_obj;

        }
        else {

        }

        t_obj = t_obj.parent();
    }


}

function urlencode(str) {
    str = (str + '').toString();
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
        replace(/\)/g, '%29').replace(/\*/g, '%2A');//.replace(/%20/g, '+')
}

function urldecode(str) {
    str = (str + '').toString();

    return decodeURIComponent(str);//
}

function line2bren(text) {
    return text.replace(/\n/g, "<br/>").replace(/ /g, '&nbsp');
}


function line2brde(text) {
    return text.replace(/<br\/>/g, "\n").replace(/&nbsp/g, ' ');
}


function dateJoiningtogether(date) {
    if (date.length < 14) {
        return date;
    }
    var year = date.substring(0, 4);
    var month = date.substring(4, 6);
    var day = date.substring(6, 8);
    var hours = date.substring(8, 10);
    var minutes = date.substring(10, 12);
    var seconds = date.substring(12, 14);
    var datenew = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    return datenew;
}


function IdentityCodeValid(code) {
    var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
    };
    var tip = "";
    var pass = true;

    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        tip = "身份证号格式错误";
        pass = false;
    }

    else if (!city[code.substr(0, 2)]) {
        tip = "地址编码错误";
        pass = false;
    }
    else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if (parity[sum % 11] != code[17]) {
                tip = "校验位错误";
                pass = false;
            }
        }
    }
    if (!pass) alert(tip);
    return pass;
}


function urlDecodeGBK(str) {
    var ret = "";
    for (var i = 0; i < str.length; i++) {
        var chr = str.charAt(i);
        if (chr == "+") {
            ret += " ";
        }
        else if (chr == "%") {
            var asc = str.substring(i + 1, i + 3);
            if (parseInt("0x" + asc) > 0x7f) {
                ret += asc2str(parseInt("0x" + asc + str.substring(i + 4, i + 6)));
                i += 5;
            }
            else {
                ret += asc2str(parseInt("0x" + asc));
                i += 2;
            }
        }
        else {
            ret += chr;
        }
    }

    return ret;
}


document.onkeydown = function (e) {
    if (!e) e = window.event;//火狐中是 window.event
    if ((e.keyCode || e.which) == 13) {
        $(".btn-submit").click();
    }
}


function luhmCheck(bankno) {
    var lastNum = bankno.substr(bankno.length - 1, 1);//取出最后一位（与luhm进行比较）

    var first15Num = bankno.substr(0, bankno.length - 1);//前15或18位
    var newArr = new Array();
    for (var i = first15Num.length - 1; i > -1; i--) {    //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i, 1));
    }
    var arrJiShu = new Array();  //奇数位*2的积 <9
    var arrJiShu2 = new Array(); //奇数位*2的积 >9

    var arrOuShu = new Array();  //偶数位数组
    for (var j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 == 1) {//奇数位
            if (parseInt(newArr[j]) * 2 < 9)
                arrJiShu.push(parseInt(newArr[j]) * 2);
            else
                arrJiShu2.push(parseInt(newArr[j]) * 2);
        }
        else //偶数位
            arrOuShu.push(newArr[j]);
    }

    var jishu_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
    for (var h = 0; h < arrJiShu2.length; h++) {
        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }

    var sumJiShu = 0; //奇数位*2 < 9 的数组之和
    var sumOuShu = 0; //偶数位数组之和
    var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal = 0;
    for (var m = 0; m < arrJiShu.length; m++) {
        sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    }

    for (var n = 0; n < arrOuShu.length; n++) {
        sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
    }

    for (var p = 0; p < jishu_child1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

    //计算Luhm值
    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
    var luhm = 10 - k;

    if (lastNum == luhm) {
        //$("#banknoInfo").html("Luhm验证通过");
        return true;
    }
    else {
        // $("#banknoInfo").html("银行卡号必须符合Luhm校验");
        return false;
    }
}
