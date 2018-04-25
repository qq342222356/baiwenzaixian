var sessionAgent = {
	
	keyMap:{
		firstStart:'firstStart',		//安装或更新后第一次打开app boolean
		thumbInfo:'thumbInfo',			//开机导航图信息缓存 json={version:2,len:4},图片地址是：fs://thumb+i
		userAuthInfo: 'userAuth', 		//用户权限信息	json
		fontSize:'fontSize',			//内容页字体大小设置
		searchHis:'searchHis',			//搜索历史 数组
		adImgulArr:'adImgulArr',		//每次开机在index.html中获取，在书店的推荐与分类中各一张，共两种图
		lastestMag:'lastestMag',		//最新的几篇杂志，lastestMag={lastest:[这里只有1片杂志内容],others:[这里有3片]}
	},
	
	setLoginInfo : function(userEntity){
		sessionAgent.setStorage(sessionAgent.keyMap.userAuthInfo, userEntity);

		api.setPrefs({ key: 'userId', value: userEntity.userId });
		api.setPrefs({ key: 'userCellPhone', value: userEntity.cellPhone });
		api.setPrefs({ key: 'userNickName', value: userEntity.nickName });
	},

	getLoginInfo : function(){
		var userEntity = sessionAgent.getStorage(sessionAgent.keyMap.userAuthInfo);
		if(null==userEntity || ""==userEntity){
			userEntity= {};
		}
		return userEntity;
	},

	clearLoginInfo: function(){
		$api.rmStorage( sessionAgent.keyMap.userAuthInfo);
	
		api.removePrefs({ key: 'userId'});
		api.removePrefs({ key: 'userCellPhone'});
		api.removePrefs({ key: 'userNickName'});
	},
	
	setPrefInfo : function(infoKey, val){
		api.setPrefs({ key: infoKey, value: val });
	},
	
	getPrefInfo: function(infoKey){
		
		var returnStr;
		
		api.getPrefs({
	        key: infoKey
        },function(ret,err){
        	returnStr = ret.value;
        });
		
		return returnStr;
	},
	
	setStorage: function(key, obj){
		if(!!$api){
			$api.rmStorage( key)
			$api.setStorage(key, obj);
		}
	},

	rmStorage: function(key){
		if(!!$api){
			$api.rmStorage( key)
		}
	},

	getStorage: function(key){
		if(!!$api){
			return $api.getStorage(key);
		}else{
			return null;
		}
	},
	
	checkUserId: function(){
    	var userEntity = sessionAgent.getLoginInfo();
		var userId = userEntity.userId;
		if(userId != null && userId != ""){
			api.pageParam.userId = userId;
			return true;
        }else{
	    	api.openWin({
	            name: 'login',
	            url: 'win_commonRedBar.html',
	            pageParam:{
	            	bannerTitle: '登录',
	            	hidEditBtn: 'hidden',
	            	childHtmlUrl: 'frm_login.html'
				}
	        });
	        return false
        }
    }
}