(function(){
  'use strict';

  /* code here! */

  console.log('hello world!');


  

  /**
   * 设计要被激活的dom
   * @param {[type]} active [当前将要被激活的dom]
   */
  function setActive(active){
  	active.addClass('carousel-slide-active');
  }

  /**
   * 删除被激活的样式
   * @param  {[type]} actived [当前被激活的dom]
   * @return {[type]}         [description]
   */
  function removeActive(actived){
  	actived.removeClass('carousel-slide-active');
  }

  /**
   * 初始化的时候默认中间的图片为显示第一张【由于为了简单起见，直接返回1，默认为第一张】
   * @return {[type]} [description]
   */
  function findMidIndex(){
  	// return Math.ceil($(".carousel-slide").length / 2);
  	return 1;
  }

  /**
   * 找到当前被激活的节点
   * @return {[type]} [description]
   */
  function findActive(){
  	return $(".carousel-slide-active");
  }

  /**
   * 找到被激活节点的前一个节点
   * @return {[type]} [description]
   */
  function findPrev(){
  	return $(".carousel-slide-active").prev();
  }

  /**
   * 找到当前节点的下一个节点
   * @return {[type]} [description]
   */
  function findNext(){
  	return $(".carousel-slide-active").next();
  }

  /**
   * 向前更换被激活的dom
   * @return {[type]} [description]
   */
  function changePreActive(){
  	var pre = findPrev();
  	var active = findActive();
  	setActive(pre);
  	removeActive(active);
  }

  /**
   * 向后更换呗激活的dom
   * @return {[type]} [description]
   */
  function changeNextActive(){
  	var next = findNext();
  	var active = findActive();
  	setActive(next);
  	removeActive(active);
  }

  /**
   * 检查是否存在前一个元素
   * @return {[type]} [description]
   */
  function checkPrev(){
  	return $(".carousel-slide-active").prev().length > 0;
  }

  /**
   * 检查是否存在后一个元素
   * @return {[type]} [description]
   */
  function checkNext(){
  	return $(".carousel-slide-active").next().length > 0;
  }

  /**
   * 初始化draw
   * @return {[type]} [description]
   */
  function initDraw(){
  	var active = findActive();
  	var pre = findPrev();
  	var next = findNext();

  }

  /**
   * 初始化激活
   * @return {[type]} [description]
   */
  function initSetActive(){
  	var index = findMidIndex();
  	$(".carousel-slide:nth-child("+index+")").addClass('carousel-slide-active');
  }

  /**
   * 设置silde的宽度，和wrapper的宽度
   */
  function initSetWidth(){
  	//获取slide的最大宽度，一切按照最大宽度来计算
  	var maxWidth = 0;
  	for(var i = 0 ; i < $(".carousel-slide").length; i++){
  		maxWidth > $(".carousel-slide")[i].offsetWidth ? maxWidth : maxWidth = $(".carousel-slide")[i].offsetWidth;
  	}
  	//将所有元素赋值为最大宽度
  	$(".carousel-slide").width(maxWidth);
  	//设置图片不能拖着走
  	$(".carousel-slide img").attr("draggable","false");
  	//获取所有slide的宽度和
  	var widthSum = $(".carousel-slide").length * maxWidth;
  	$(".carousel-wrapper").width(widthSum);
  	console.log(maxWidth);
  	console.log(widthSum);
  }

  /**
   * 初始化函数，为了简单起见，默认到第一张图片作为slide的开始，非3D所以不需要draw
   * @return {[type]} [description]
   */
  function init(){
  	initSetWidth();
  	initSetActive();
  	// initDraw();
  }

  init();

  //触发拖动的事件如果是移动端就用touch，否则使用鼠标事件
  var touchend = 'ontouchend' in window ? "touchend" : "mouseup";
  var touchstrat = 'ontouchstart' in window ? "touchstrat" : "mousedown";
  var touchmove = 'ontouchmove' in window ? "touchmove" : "mousemove";
  var startX,moveX,endMoveX = 0;

  /**
   * 获取最开始时候点击的坐标
   * @param  {[type]} e){               	startX [description]
   * @return {[type]}      [description]
   */
  $(document).on(touchstrat,".carousel-slide",function(e){
  	startX = e.clientX;
  });

  /**
   * 在结束的时候判断到底是否切换到下一个slide
   * @param  {[type]} e){               	startX [将开始点击获取的坐标清空]
   * @return {[type]}      [description]
   */
  $(document).on(touchend,".carousel-slide",function(e){
  	startX = null;
  	endMoveX = endMoveX + moveX;
  	//释放鼠标时移动距离如果大于50px就自动切换到下一张
  	//小于50就回到初始位置
  	var next = findNext();
  	var prev = findPrev();
  	if(Math.abs(moveX) > 50){
  		if(moveX < 0 && checkNext()){
  			changeNextActive();
  			var nextX = next[0].offsetLeft;
	  		$(".carousel-slide").css("transform","translateX("+(-nextX)+"px)");
	  		endMoveX = -nextX;
	  	}else if(moveX > 0 && checkPrev()){
	  		changePreActive();
	  		var prevX = prev[0].offsetLeft;
	  		$(".carousel-slide").css("transform","translateX("+(-prevX)+"px)");
	  		endMoveX = -prevX;
	  	}
  	}else{
	  	$(".carousel-slide").css("transform","translateX("+(endMoveX - moveX)+"px)");
	  	endMoveX = endMoveX - moveX; 		
  	}

  });

  /**
   * touch的时候让图片跟随鼠标走动
   * @param  {[type]} e){               	if(!startX){  		return;  	}  	moveX [如果鼠标没有点击那么就不触发]
   * @return {[type]}      [不触发的时候直接返回]
   */
  $(document).on(touchmove,".carousel-slide",function(e){
  	if(!startX){
  		return;
  	}
  	moveX = e.clientX - startX;
  	if(moveX < 0 && checkNext()){
  		$(".carousel-slide").css("transform","translateX("+(endMoveX+moveX)+"px)");
  	}else if(moveX > 0 && checkPrev()){
  		$(".carousel-slide").css("transform","translateX("+(endMoveX+moveX)+"px)");
  	}
  	console.log(moveX);
  	
  });



})();
