var data = [{
	"src":"1 (1).png",
	"title":"第1张图"
},{
	"src":"1 (1).png",
	"title":"第1张图"
},{
	"src":"1 (1).png",
	"title":"第1张图"
},{
	"src":"1 (1).png",
	"title":"第1张图"
},{
	"src":"1 (1).png",
	"title":"第1张图"
},{
	"src":"1 (1).png",
	"title":"第1张图"
},{
	"src":"1 (1).png",
	"title":"第1张图"
},{
	"src":"1 (1).png",
	"title":"第1张图"
},{
	"src":"1 (1).png",
	"title":"第1张图"
},{
	"src":"1 (1).png",
	"title":"第1张图"
},{
	"src":"1 (1).png",
	"title":"第1张图"
},{
	"src":"1 (1).png",
	"title":"第1张图"
},{
	"src":"1 (1).png",
	"title":"第1张图"
},{
	"src":"1 (1).png",
	"title":"第1张图"
},{
	"src":"1 (1).png",
	"title":"第1张图"
},{
	"src":"1 (1).png",
	"title":"第1张图"
},{
	"src":"1 (1).png",
	"title":"第1张图"
}]
 function waterfall(wrap,boxes){
	// 获取屏幕可显示的列数
 	var boxWidth = boxes.eq(0).width() + 40;
 	var windowWidth = $(window).width();
	var colsNumber = Math.floor(windowWidth / boxWidth);

 	//设置容器的宽度
	wrap.width(boxWidth * colsNumber);
	// 定义一个数组并存储每一列高 度
	var everyHeight = new Array();
	for (var i = 0; i < boxes.length; i++) {
		if(i < colsNumber){
			everyHeight[i] = boxes.eq(i).height() + 40;
		}else{	
		    //获取最小列高度	
			var minHeight = Math.min.apply(null,everyHeight);
			//获取最小列索引
			var minIndex = getIndex(minHeight,everyHeight);
			//设置盒子样式
			setStyle(boxes.eq(i),minHeight,boxes.eq(minIndex).position().left,i);
			//设置最小列的高度
			everyHeight[minIndex] +=boxes.eq(i).height() + 40;
		};
		// 鼠标经过图片半透明交互效果
		boxes.eq(i).hover(function(event) {
			$(this).stop().animate({
				'opacity':'0.5'
			},500);
		},function(event) {
			$(this).stop().animate({
				'opacity':'1'
			},500);
		} );
	};
};

// 获取最小列的索引
function getIndex(minHeight,everyHeight){
	for(index in everyHeight){
		if(everyHeight[index] == minHeight){
			return index;
		};
	};
};

// 设置追加盒子的样式
var getStartNumber = 0;
var setStyle = function(box,top,left,index){
	if(getStartNumber >= index){
		return false;
	};
	box.css({
		'position':'absolute',
		'top':top,
		'left':left,
        'opacity':'0'
	}).stop().animate({
		'opacity':'1'
	},3000);
	getStartNumber = index;
};

//数据请求检验
var getCheck = function(wrap) {
	// 获取文档高度
	var documentHeight = $(window).height();
	// 获取向上滚动高度
	var scrollHEight = $(window).scrollTop();
	// 获取最后一个盒子所在列的高度
	var boxes = wrap.children('div');
	var lastBoxTop = boxes.eq(boxes.length - 1).offset().top;
	var lastHeight = boxes.eq(boxes.length - 1).height() + 20;
	var lastColHeight = lastHeight + lastBoxTop;
	return documentHeight + scrollHEight >= lastColHeight ? true : false;
}

// 追加盒子函数
var appendBox = function(wrap,boxes){
	if(getCheck(wrap)){
		    for(i in data) {
			var innerString = '<div><img src="images/' + data[i].src + '"><a href="http://www.baidu.com"> ' + data[i].title +' </a></div>';
	        wrap.append(innerString);
        };
	};
	   waterfall(wrap,wrap.children('div'));
};

$(document).ready(function(event){
	// 获取容器盒子
	var wrap = $('#wrap');
	var boxes = $('#wrap').children('div');
	//加载盒子
	waterfall(wrap,boxes);
    //滚动事件
    $(this).scroll(function(event){
    	appendBox(wrap,boxes);
    });


    // 登陆动作
    $('#loginLink').click(function(){
    	//显示遮罩
    	$('#layer-mask').show();
    	//显示窗体
    	$('#layer-pop').show();
    	//关闭动作
    	$('#layer-close').click(function(){
    		//隐藏遮罩
    		$('#layer-mask').hide();
    		//隐藏窗体
    	    $('#layer-pop').hide();
    	})
    })
});

