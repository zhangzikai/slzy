<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="common/taglibs.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
   <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
	<title>森林资源管理系统——用户登录</title>
	<link href="${ctx}/css/login.css" type="text/css" rel="stylesheet" />
	<script type="text/javascript" src="${ctx}/js/jquery-1.6.1.js"></script>
 	<script type="text/javascript" language="javascript">
        function login() {
            var userName = $("#userName").val();
            var passWord = $("#passWord").val();
            var code = $("#code").val();
            if (userName == "" || passWord == "" || code == "") {
                Ext.MessageBox.alert('系统提示',"用户名、密码、验证码都不能为空,请输入用户名、密码、验证码!");
                return;
            }
            var loading = "<img alt='载入中，请稍候...' height='28' width='28' src='${ctx}/images/loading.gif' />";
            $("#msg").html(loading + "载入中，请稍候...");
            var params = {userName:userName,passWord:passWord,code: code };
			$.post('${ctx}/login.jhtml',$.param(params),function(msg){
				if(msg){
					$("#msg").html(msg.message);
					if (msg.isSuccess) {
						window.location.href ="${ctx}/main.jsp";
					}
				}else {
					$("#msg").html("为载入相关数据，请重试");
				}
			},'json');
        }
    </script>
</head>
<body id="userlogin_body" style="text-align: center;">
	<div style="height:130px;text-align: center; line-height: 120px;">
		<label style="font-family:KaiTi;color:white;font-size:64px;margin:auto">辽宁省森林资源管理系统</label>
    </div>
    <div id="user_login">
        <dl>
            <dd id="user_top">
                <ul>
                    <li class="user_top_l"></li>
                    <li class="user_top_c"></li>
                    <li class="user_top_r"></li>
                </ul>
                <div id="user_main">
                    <ul>
                        <li class="user_main_l"></li>
                        <li class="user_main_c">
                            <div class="user_main_box">
                                <ul>
                                    <li class="user_main_text">用户名： </li>
                                    <li class="user_main_input">
                                        <input class="txtusernamecssclass" id="userName" maxlength="20" name="userName" value="admin"/>
                                    </li>
                                </ul>
                                <ul>
                                    <li class="user_main_text">密 码： </li>
                                    <li class="user_main_input">
                                        <input class="txtpasswordcssclass" id="passWord" type="password" name="passWord" value="admin"/>
                                    </li>
                                </ul>
                                <ul>
                                    <li class="user_main_text">验证码:</li>
                                    <li class="user_main_input">
                                    <input id="code" class="txtvalidatecodecssclass" name="code" style="width:95px;" maxlength="4" onkeydown="if(event.keyCode==13)login();"/>
									<img src="${ctx}/common/verifyCode.jsp" style="cursor: pointer;margin-left:5px;" alt="点击刷新" onclick="this.src=this.src+'?';" />
                                    </li>
                                </ul>
                                    <br />
                                    <br />
                                 <div style="text-align:center;color:Red;line-height:30px;height:30px;" id="msg">请输入用户名、密码、验证码!</div> 
                            </div>
                        </li>
                        <li class="user_main_r">
                            <input class="ibtnentercssclass" id="ibtnenter" style="border-top-width: 0px; border-left-width: 0px;
                                border-bottom-width: 0px; border-right-width: 0px" type="image" src="${ctx}/images/login/user_botton.gif"
                                name="ibtnenter" onclick="login();"/>
                        </li>
                    </ul>
                    <ul>
                        <li class="user_bottom_l"></li>
                        <li class="user_bottom_c"><span style="margin-top: 40px"></span> </li>
                        <li class="user_bottom_r"></li>
                    </ul>
                </div>
        </dl>
    </div>
    <span id="valrusername" style="display: none; color: red"></span><span id="valrpassword"
        style="display: none; color: red"></span><span id="valrvalidatecode" style="display: none;
            color: red"></span>
    <div id="validationsummary1" style="display: none; color: red">
    </div>
    <div>
    </div>
</body>
</html>
