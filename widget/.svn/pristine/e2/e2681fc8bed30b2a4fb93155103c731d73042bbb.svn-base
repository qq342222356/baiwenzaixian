function openMag(id, name, contentIdList,thumb,remarks) { //分别代表杂志id，杂志名称，杂志文章idList，是否收藏杂志


	var userEntity = sessionAgent.getLoginInfo();
	var userId = userEntity.userId;
	console.log(userId);
	if(userId==null || userId==''){
		api.openWin({
            name: 'win_login',
            url: 'win_login.html'
        });
        return ;
	}
    api.openSlidLayout({
        type: 'left',
        leftEdge: api.winWidth * 0.2,
        fixedPane: { //目录
            name: 'dir',
            url: 'dir.html',
            bgColor: '#fff',
            //	        bounces: true,
            vScrollBarEnabled: true,
            hScrollBarEnabled: false,
            pageParam: {
                id: id,
                name: name,
                contentIdList: contentIdList
            }
        },
        slidPane: { //杂志头部
            name: 'win_magHeader',
            url: 'win_magHeader.html',
            bgColor: '#fff',
            //	        bounces: true,
            vScrollBarEnabled: true,
            hScrollBarEnabled: false,
            pageParam: {
                id: id,
                name: name,
                contentIdList: contentIdList,             
                thumb:thumb,
                remarks:remarks
            }
        }
    }, function(ret, err) {
       console.log(JSON.stringify(ret)+""+JSON.stringify(err));

    });

}