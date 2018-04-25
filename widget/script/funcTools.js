var utilsFuncs = {
	//将unicode编码转换为中文
	tranUnicode2Chn : function(str){
		if(arguments.length>0){
//			return unescape(str.replace(/&#x/g, '%u').replace(/;/g, ''));
			return unescape(str.replace(/\\/g,"%"));
		}else{
			return null;
		}
	},

	REGX_HTML_ENCODE : /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g,
	REGX_HTML_DECODE : /&\w+;|&#(\d+);/g,
	REGX_TRIM : /(^\s*)|(\s*$)/g,
	HTML_DECODE : {
        "&lt;" : "<", 
        "&gt;" : ">", 
        "&amp;" : "&", 
        "&nbsp;": " ", 
        "&quot;": "\"", 
        "©": "",
        "&iexcl;":"?","&laquo;":"?","&not;":"?",
        "&lsquo;":"‘","&rsquo;":"’","&sbquo;":"‚",
        "&ldquo;":"“","&rdquo;":"”"
    },
	encodeHtml : function(s){
        s = (s != undefined) ? s : '';
        return (typeof s != "string") ? s :
            s.replace(this.REGX_HTML_ENCODE, 
                      function($0){
                          var c = $0.charCodeAt(0), r = ["&#"];
                          c = (c == 0x20) ? 0xA0 : c;
                          r.push(c); r.push(";");
                          return r.join("");
                      });
    },
	decodeHtml : function(s){
        var HTML_DECODE = this.HTML_DECODE;

        s = (s != undefined) ? s : '';
        return (typeof s != "string") ? s :
            s.replace(this.REGX_HTML_DECODE,
                      function($0, $1){
                          var c = HTML_DECODE[$0];
                          if(c == undefined){
                              // Maybe is Entity Number
                              if(!isNaN($1)){
                                  c = String.fromCharCode(($1 == 160) ? 32:$1);
                              }else{
                                  c = $0;
                              }
                          }
                          return c;
                      });
    },

    //替换所有的回车换行
	replaceRN : function(content){
		var string = content;
		try{
			string=string.replace(/\r\n/g, "<br />")
	    	string=string.replace(/\n/g, "<br />");
		}catch(e) {
			alert(e.message);
		}
		return string;
	},
	
	replaceStr : function(str,str1,str2){		//将字符串str中的 str2替换成str1
		return str.replace(str1,str2);
	},
	
	trimStr: function(str){
		if(str==null || str==''){
			return '';
		}else{
			return str;
		}
	},
	splitStr: function(str,word){		//以word分割字符串str,得到数组arr
		if(str==null || str==''){
			return '';
		}else{
			var arr = str.split(word);
			return arr;
		}
	},
	strToJSON: function(str){			//字符串str转JSON
		if(str==null || str==''){
			return '';
		}else{
			return eval('(' + str + ')');
		}
	},
	rand6: function(){ 
		var randStr="";
		for(var i=0;i<6;i++){ 
			randStr+= Math.floor( Math.random()* 10); 
		}

		return randStr;
	},
	toastNetErr: function(errCode){
		var errMsg= '网络连接异常，请稍后再试';
		
		if(errCode!=null && errCode!=""){
			errMsg+= '('+ errCode+ ')';
		}
		api.toast({
		    msg: errMsg,
		    duration: 2000,
		    location: 'middle'
		});
	},
	limitStrLength: function(str, len){
		if(null==str || ""==str || isNaN(parseInt(len))){
			return "";
		}
		var rsStr= str.substr(0, len-3)+ '...';
		return rsStr;
	},
	getCatId: function(str){		//content_106-212584-1
		if(null==str || ""==str){
			return "";
		}
		var strs= str.split('_');
		var strss = strs[1].split('-');
		return strss[0];
	},
	dateDiff: function(hisTime,nowTime){
        var now =nowTime?nowTime:new Date().getTime(),
            diffValue = now - hisTime,
            result='',
            minute = 1000 * 60,
            hour = minute * 60,
            day = hour * 24,
            halfamonth = day * 15,
            month = day * 30,
            year = month * 12,

            _year = diffValue/year,
            _month =diffValue/month,
            _week =diffValue/(7*day),
            _day =diffValue/day,
            _hour =diffValue/hour,
            _min =diffValue/minute;

            if(_day>=1) result= new Date(hisTime).format("yyyy-MM-dd");
            else if(_hour>=1) result=parseInt(_hour) +"个小时前";
            else if(_min>=1) result=parseInt(_min) +"分钟前";
            else result="刚刚";
            return result;
    },
    openUrlInBrowser: function(url){
		if(url==null || url==""){
			return ;
		}
	
		if('ios'== api.systemType){
			api.openApp({
				iosUrl: url,
				appParam: {}
			});
		}else if('android'== api.systemType){
			api.openApp({
			    androidPkg: 'android.intent.action.VIEW',
			    mimeType: 'text/html',
			    uri: url
			},function(ret,err){});
		}
    },
    closeTag: 'false',
    closeAppMonitor: function(){
		api.addEventListener({
		    name:'keyback'
		},function(ret,err){
			if(utilsFuncs.closeTag=='false'){
				utilsFuncs.closeTag='true';

				setTimeout("utilsFuncs.closeTag='false'", 2000);
				api.toast({
				    msg: '再次点击退出',
				    duration:2000,
				    location: 'middle'
				});
			}else if(utilsFuncs.closeTag=='true'){
				api.closeWidget({ silent:true});
			}
		});
    },
    setNightTime: function(linkTagId, tag){
    	var linkObj= document.getElementById(linkTagId);
    	if(null!= linkObj && ""!=linkObj){
    		if(tag==1){
    			linkObj.setAttribute('href', '../css/nightStyle.css');
    		}else{
	    		linkObj.setAttribute('href', '');
    		}
    	}
    },
	fixIosHeight: function(){
	    var isAndroid = api.systemType=='android'? true: false;
	    var strSV = api.systemVersion;
	    var numSV = parseInt(strSV, 10);
	    var strDM = api.systemType;

	    if(!isAndroid && numSV >= 7){
			return true;
	    }else{
	    	return false;
	    }
	    
	},
	isEmpty: function(val){
		if(null == val || "" == val){
			return true;
		}
		return false;
	},
	getFixedStateBarHeigth:function(el){			//获取修复好的头部的高度，el代表header元素
		
		$api.fixStatusBar(el);
		var headerH,headH = $api.offset(el).h;
		var bodyW = $api.offset($api.dom('body')).w;
		
		headerH = api.winWidth*headH/bodyW;
		if(api.systemType=='android'){
			headerH = $api.offset(el).h;
		}
		
		return headerH;
	},
	getFixedFooterHeigth:function(el){			//获取修复好的头部的高度，el代表header元素
		var footerH,footH = $api.offset(el).h;
		var bodyW = $api.offset($api.dom('body')).w; 

		footerH = api.winWidth*footH/bodyW;
		return footerH;
	}
	
};

var rate =1;
var ajaxAgent = {

//	serverAction : 'http://api.bwnews.org',			//线上V110
//	serverAction : 'http://172.16.7.26:8082',		//dq测试
//	serverAction : 'http://172.16.8.123:8080',		//hzm测试
//	serverAction : 'http://172.16.8.124:8887',		//徐进-测试
//	serverAction : 'http://newapi.bwnews.org'		//线上
	serverAction : 'http://172.16.8.108:8081',		//测试

};
var validFuncs = {
	checkCellPhone: function(arg){
		var Pattern=/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i;
		if(Pattern.test(arg)==false){
			api.toast({
			    msg: '请输入正确的手机号码',
			    duration: 1000,
			    location: 'middle'
			});
			return false;
		}else{
			return true;
		}
	},
	
	checkMailBox: function(arg){
		var Pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if(!Pattern.test(arg)){
        	api.toast({
			    msg: '请输入正确的邮箱',
			    duration: 1000,
			    location: 'middle'
			});
             return false;
        }else{
			return true;
		}
	},
	
	checkPhoneAndMail: function(arg){
		var Pattern1 = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i;
		var Pattern2 = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if(!Pattern1.test(arg) && !Pattern2.test(arg)){
            api.toast({
			    msg: '请输入正确的手机号码或者邮箱！',
			    duration: 1000,
			    location: 'middle'
			});
			return false;
            
        }else{
        	return true;
		}
	},

	checkNull: function(arg){
		if(arg!=null && arg!=""){
			return true;
		}else{
			api.toast({
			    msg: '请填写完整信息',
			    duration: 1000,
			    location: 'middle'
			});
			return false;
		}
	},

	checkRepwd: function(){
		var pwd1 = $("#password").val();
		var pwd2 = $("#repassword").val();
		pwd1 = $.trim(pwd1);
		if(pwd1!="" && pwd1!=null && pwd1.length>5){
			if(pwd1==pwd2){
				return true;
			}else{
				api.toast({
				    msg: '请确保两次密码一致',
				    duration: 2000,
				    location: 'middle'
				});
				return false;
			}
		}else{
			api.toast({
				    msg: '请确保前后无空格且长度至少为6',
				    duration: 2000,
				    location: 'middle'
				});
				return false;
		}
		
	},
	
	checkYQM: function(arg){
		var yqmStr = $("#inviCode").attr("yqm");
		if(yqmStr!="" && yqmStr==arg){
			return true;
		}

		api.toast({
		    msg: '动态验证码不正确',
		    duration: 1000,
		    location: 'middle'
		});
		
		return false;
	},
	
	checkHttpUrl: function(urtStr){
		if(urtStr!="" && urtStr!=null){
			
			return false;
		}
		return false;
	}
};

Date.prototype.format = function(fmt) 
{ //author: meizz 
  var o = { 
    "M+" : this.getMonth()+1,                 //月份 
    "d+" : this.getDate(),                    //日 
    "h+" : this.getHours(),                   //小时 
    "m+" : this.getMinutes(),                 //分 
    "s+" : this.getSeconds(),                 //秒 
    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
    "S"  : this.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) 
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o) 
    if(new RegExp("("+ k +")").test(fmt)) 
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
  return fmt; 
}

var dataMap= {
	crowdType: {//众筹类型
		jyzx: '教育助学',
		qncx: '青年创新',
		axhb: '爱心环保'
	}
};
var markFunc={											//第二版埋点
	serverUrl:"http://mq.jiupaicn.com/jiupai/userLog/save",
	markToJAVA: function(params){
		params = markFunc.getSend(params);
		api.ajax({
	        url:markFunc.serverUrl,
	        timeout : 1,
	        method:"post",
	        data: {
	  			values:params
			}
        },function(ret,err){
        	if(false == params.isClose){
        		return;
        	}
        	if((params.stayTime!=null && params.stayTime !='') || true == params.isClose) {
    			api.closeWin();
        	}
        
        });
	},
	getSend: function(params){
		var userEntity = sessionAgent.getLoginInfo();
		var userArea = sessionAgent.getStorage(sessionAgent.keyMap.userArea);
		var source = api.loadSecureValue({
		    sync:true,
		    key:'app_channel'
		});

		if(null == userEntity.userId || "" ==userEntity.userId){
			params.userName = "游客";
		}
		else{
			params.userId = userEntity.userId;
			params.userName = userEntity.userName;
		}
		if(null == userArea || "" ==userArea){
			return params;
		}
		
		params.area = userArea.area;
		params.deviceId = api.deviceId;
		params.deviceModel = api.deviceModel;
		params.source = source;

		return params;

	}
}

var userVisitFunc={											//第三版埋点
//	serverUrl:"http://192.168.100.114:8080/user-access-controller/detail",
	serverUrl:'http://jphceshi.jiupaicn.com/app/userAccess/detail',		//测试
//	serverUrl:"http://jph-app.jiupaicn.com/app/userAccess/detail",		//测试  阿里
//	serverUrl:"http://appjph.jiupaicn.com/app/userAccess/detail",		
	
	markToJAVA: function(params){
		params = userVisitFunc.getSend(params);
		api.ajax({
	        url:userVisitFunc.serverUrl,
	        method: 'post',
		    timeout: 45,
		    dataType: 'json',
		    returnAll: false,
	        data: {
	  			values:{
	  				jsonStr:JSON.stringify(params)
	  			}
			}
        },function(ret,err){
//      	console.log(JSON.stringify(ret)+"==="+JSON.stringify(err));
        
        });
	},
	getSend: function(params){
		//params 表示要传给后台的参数
		
		var userEntity = sessionAgent.getLoginInfo();
		if(null == userEntity.userId || "" ==userEntity.userId){
			params.account = "游客";
		}
		else{
			params.userId = userEntity.userId;
			params.account = userEntity.userName;
			params.mobile = userEntity.cellPhone;
		}
		
		params.ip = sessionAgent.getStorage(sessionAgent.keyMap.IP);
		
		params.portalType = 2;		//2表示客户端登录
		params.deviceID	= api.deviceId;
		params.netAccessType = api.connectionType;
		params.pixel = api.screenWidth +"*"+ api.screenHeight;
		params.uaType = api.systemType;			
		params.uaInfo = api.deviceModel;		
		params.appVersion = api.appVersion;
		
		console.log(JSON.stringify(params));
		return params;

	}
}

var timeFunc={
	getTime : function(){
		var myDate = new Date();
		return myDate.getTime();
	},
	timeLength :function(t1,t2){
			var t = t2-t1;
			t = parseInt(t/1000);		//获得分钟数
			return t;
		}
}

var cacheFunc={
	imageCache: function(url){
	    var path=url;
	     api.imageCache({
	         url: url,
	         policy:'cache_only'
	     },function(ret,err){
	         if (ret) {
	              path = ret.url;
	         }
	     });
	     return path ;
	},
	setScroll: function (param) {
	    var oDiv = document.getElementById(param.listName);
	    if(null == oDiv || "" == oDiv){
	    	return;
	    }
	    var aLi = oDiv.children;
	    for (var i = 0, l = aLi.length; i < l; i++) {
	        var oLi = aLi[i];
	        //检查oLi是否在可视区域
	        var t = document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop);
	        var h = cacheFunc.getH(oLi);
	        param.imageName = param.imgListName + i;
	        if (t -h > -500 && t-h< 800) {
	             param.operation  = 0;//增加图片
	        }
	        else{
	        	 param.operation  = 1;//释放图片
	        }
	        cacheFunc.setImg(JSON.stringify(param));
	    }
    },
    //图像处理
    setImg: function(paramStr){
    	var param = JSON.parse(paramStr);
	    var oDiv=document.getElementById(param.imageName);
	    if(null == oDiv || "" == oDiv){
	    	return;
	    }
	   	if(param.type){//多张图
	   		var oUl=oDiv.children[0];
		    var aLi=oUl.children;
		    for (var i = 0, l = aLi.length; i < l; i++) {
		    	var src = "";
		    	if (aLi[i].dataset) {
			        src=aLi[i].dataset.src;
			    } 
			    else{
			        src=aLi[i].getAttribute('data-src');
			    }
	        	if(param.operation){
	        		if (aLi[i].children.length > 0) {
				        aLi[i].removeChild(aLi[i].children[0]); 
				    }
	        	}
	        	else{
	        		if (aLi[i].children.length==0) {
		        		var oImg=document.createElement('img');
			   			oImg.src = src;
		        		aLi[i].appendChild(oImg); 
				    }
	        	} 

		    }
	   	}else{//单张图
			var src = "";
	    	if (oDiv.dataset) {
		        src=oDiv.dataset.src;
		    } 
		    else{
		        src=oDiv.getAttribute('data-src');
		    }

	        if (oDiv.children.length==0) {
	        	if(param.operation){
	        		 oDiv.removeChild(oDiv.children); 
	        	}
	        	else{
	        		var oImg=document.createElement('img');
		   			oImg.src = src;
	        		oDiv.appendChild(oImg);
	        	} 
		    }
	    }
	    
	}, 
	getH: function(obj) {  
	    var h = 0;  
	    while (obj) {  
	        h += obj.offsetTop;  
	        obj = obj.offsetParent;  
	    }  
	    return h;  
	} 
}
//判断是否展示图片
function isShowPic(){ 
    var wifiShowImg=false;//是否设置了wifi下展示图片
    var systemSetting= sessionAgent.getStorage(sessionAgent.keyMap.systemSetKey );
    if(systemSetting.checkImgType=='true') wifiShowImg=true;//设置了wifi下才展示图片
    else wifiShowImg=false; 
    if(!wifiShowImg){
     return true;//没有设置
    }
    else{
	    //判断是否是wifi环境
	    var connectionType = api.connectionType;
	    var isWifi=false;
	    if(connectionType=='wifi' ){
	    	isWifi=true;
	    }
	    
	    if(isWifi){ return true;}
	    else {
	    	return false;
	    }
    }
    
}

function testGetData(){
	var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {//移动终端浏览器版本信息 
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        } (),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    console.log("语言版本: " + browser.language);
    console.log("<br />是否为移动终端: " + browser.versions.mobile);
    console.log("<br />ios终端: " + browser.versions.ios);
    console.log("<br />android终端: " + browser.versions.android);
    console.log("<br />是否为iPhone: " + browser.versions.iPhone);
    console.log("<br />是否iPad: " + browser.versions.iPad);
    console.log("<br />浏览器信息："+navigator.userAgent);

}
