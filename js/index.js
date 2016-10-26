'use strict'
function getDir(obj,ev){
	var x=obj.getBoundingClientRect().left+obj.offsetWidth/2-ev.clientX;
	var y=obj.getBoundingClientRect().top+obj.offsetHeight/2-ev.clientY;
	
	return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
}
function through(obj){
	obj.onmouseenter=function(ev){
		var oLi=obj.children[1];
		var oEvent=ev||event;
		var dir=getDir(obj,oEvent);
		switch(dir){
			case 0:
				oLi.style.top=0;
				oLi.style.left='250px';
				break;
			case 1:
				oLi.style.top='250px';
				oLi.style.left=0;
				break;
			case 2:
				oLi.style.top=0;
				oLi.style.left='-250px';
				break;
			case 3:
				oLi.style.top='-250px';
				oLi.style.left=0;
				break;
		}
		move(oLi,{left:0,top:0});	
	};
	obj.onmouseleave=function(ev){
		var oLi=obj.children[1];
		var oEvent=ev||event;
		var dir=getDir(obj,oEvent);
		switch(dir){
			case 0:
				move(oLi,{left:250,top:0});
				break;
			case 1:
				move(oLi,{left:0,top:250});
				break;
			case 2:
				move(oLi,{left:-250,top:0});
				break;
			case 3:
				move(oLi,{left:0,top:-250});
				break;
		}
	};		
}
function con(){
	var oDiv=document.getElementById('container');
	var aDiv=oDiv.children;
	var timer=null;
	var i=0;
	var oBox=document.getElementById('con-f');
	var oContact=document.getElementById('contact1');
	var oCon=document.getElementById('con');
	oBox.onmouseover=function(){
		move(oCon,{opacity:1,right:0});
	};
	oBox.onmouseout=function(){
		move(oCon,{opacity:0,right:-200});
	};
	oContact.onmouseover=function(){
		move(oCon,{opacity:1,right:0});
	};
	oContact.onmouseout=function(){
		move(oCon,{opacity:0,right:-200});
	};
	timer=setInterval(function(){
		move(aDiv[i],{opacity:1});
		i++;
		if(i==aDiv.length){
			clearInterval(timer);	
		}
	},500)
}
function banner(){
	var oBox=document.getElementById('banner');
	var oPrev=oBox.children[0];
	var oNext=oBox.children[1];
	var oUl=oBox.children[2];
	var oOl=oBox.children[3];	
	var aLi=oUl.children;
	var aBtn=oOl.children;
	var iNow=0;
	var timer2=null;
	
	oUl.innerHTML+=oUl.innerHTML;
	oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
	oBox.onmouseover=function(){
		move(oPrev,{opacity:1});
		move(oNext,{opacity:1});
		clearInterval(timer2);	
	};
	oBox.onmouseout=function(){
		move(oPrev,{opacity:0});
		move(oNext,{opacity:0});
		timer2=setInterval(next,3000);	
	};
	for(var i=0; i<aBtn.length; i++){
		(function(index){
			aBtn[i].onclick=function(){
				iNow=Math.floor(iNow/aBtn.length)*aBtn.length+index;
				tab();
			};	
		})(i);
	}
	window.onblur=function(){
		clearInterval(timer2);
	};
	window.onfocus=function(){
		timer2=setInterval(next,3000);
	};
	oPrev.onclick=function(){
		iNow--;
		tab();
	};
	function next(){
		iNow++;
		tab();
	};
	oNext.onclick=next; 
	timer2=setInterval(next,3000);
	function tab(){
		for(var i=0; i<aBtn.length; i++){
			aBtn[i].className='';
		}
		if(iNow>0){
			aBtn[iNow%aBtn.length].className='active';
		}else{
			aBtn[(iNow%aBtn.length+aBtn.length)%aBtn.length].className='active';
		}
		startMove(oUl,-iNow*aLi[0].offsetWidth);
	}
	
	var left=0;
	var timer=null;
	var W=oUl.offsetWidth/2;
	function startMove(obj,iTarget){
		clearInterval(timer);
		var start=left;
		var dis=iTarget - left;
		var count=Math.floor(1000/30);
		
		var n=0;
		timer=setInterval(function(){
			n++;
			var a=n/count;
			left=start+dis*a;
			if(left<0){
				obj.style.left=left%W+'px';
			}else{
				obj.style.left=(left%W-W)%W+'px';
			}
			if(n==count){
				clearInterval(timer);
			}
		},30);
	}
}
//返回顶部
function returnTop(){
	var oBtn = document.getElementById('btn2');	
	var timer = null;
	var bSin=false;
	
	window.onscroll=function(){
		if(bSin){
			clearInterval(timer);
		}
		bSin=true;
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		if(scrollTop){
			oBtn.style.display='block';	
		}else{
			oBtn.style.display='none';	
		}	
	};
	oBtn.onclick=function(){
		var start=document.documentElement.scrollTop||document.body.scrollTop;
		var dis=0-start;
		var count=Math.floor(1000/30);
		var n=0;
		timer=setInterval(function(){
			bSin=false;
			n++;
			var a=n/count;
			var cur=start+dis*a;
			document.documentElement.scrollTop=document.body.scrollTop=cur;	
			if(n==count){
				clearInterval(timer);	
			}
		},100);
	};
};