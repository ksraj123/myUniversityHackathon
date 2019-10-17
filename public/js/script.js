$(window).scrollTop(0);
setTimeout(function(){
    var welcomeAni = document.querySelector("#welcomeAni");
    welcomeAni.style.opacity = 0;
    setTimeout(function(){
        welcomeAni.remove();
    }, 500)
    $("body").removeClass("disableScroll");
    $("nav").addClass("navbar-fixed-top");
    $(window).scrollTop(0);
}, 7000);


window.onload = function(){
	if (screen.width > 1150){
		document.querySelector("#robo").style.display = "none";
	}
	var scrollOffsetTop = document.querySelector("nav").clientHeight;
	animateBackground();
	var pageScoll = getScrollArray(scrollOffsetTop);
	// console.log(pageScoll);

	var lis = [].slice.call(document.querySelectorAll(".clickableNavItm"));
	lis.forEach(function(ele, index){
		ele.addEventListener("click", function(){
			// makeAllInactive(lis);
			// ele.classList.add("active");
			window.scrollTo({top: pageScoll[index] - scrollOffsetTop, behavior: 'smooth'});
			if (screen.width <= 1150){
				document.querySelector("#hamburger").click();
			}
		})
	})

	upDownvisi(pageScoll);
	window.onscroll = function(){
		var scroll = $(window).scrollTop();
		
		if (scroll < pageScoll[0]  - scrollOffsetTop){
			makeAllInactive(lis);
		}
		if (pageScoll[0] - scrollOffsetTop <= scroll && scroll < pageScoll[1] - scrollOffsetTop){
			makeAllInactive(lis);
			lis[0].classList.add("active");
		}
		if (pageScoll[1] - scrollOffsetTop <= scroll && scroll < pageScoll[2] - scrollOffsetTop){
			makeAllInactive(lis);
			lis[0].classList.add("active");
		}
		if (pageScoll[2] - scrollOffsetTop <= scroll && scroll < pageScoll[3] - scrollOffsetTop){
			makeAllInactive(lis);
			lis[2].classList.add("active");
		}
		if (pageScoll[3] - scrollOffsetTop <= scroll && scroll < pageScoll[4] - scrollOffsetTop){
			makeAllInactive(lis);
			lis[3].classList.add("active");
		}
		if (pageScoll[4] - scrollOffsetTop <= scroll && scroll < pageScoll[5] - scrollOffsetTop){
			makeAllInactive(lis);
			lis[4].classList.add("active");
		}


		upDownvisi(pageScoll);
		// console.log(scroll);
	}

	upDownFunc(pageScoll, scrollOffsetTop);

	document.querySelector("#hamburger").addEventListener("click", function(){
		setTimeout(function(){
			document.querySelector("#hamburger").disabled = true;
			setTimeout(function(){
				document.querySelector("#hamburger").disabled = false;
			}, 300);
		}, 10);
		document.querySelector("#overlay").classList.toggle("overlay");
	})

	document.querySelector("#overlay").addEventListener("click", function(){
		// console.log(document.querySelector(".navbar-collapse").classList);
		if (document.querySelector(".navbar-collapse").classList[2] == "in" || document.querySelector(".navbar-collapse").classList[1] == "collapsing"){
			document.querySelector("#hamburger").click();

		} else {
			document.querySelector("#overlay").classList.remove("overlay");
		}
	})
};

function upDownFunc(pageScoll, scrollOffsetTop){
	var up = document.querySelector("#upBtn");
	var down = document.querySelector("#downBtn");
	up.addEventListener("click", function(){
		var scroll = $(window).scrollTop();
		for(var i = 0; i < pageScoll.length; i++){
			if (scroll < pageScoll[i]){
				break;
			}
		}
		window.scrollTo({top: pageScoll[i-1] - scrollOffsetTop, behavior: 'smooth'});
	});

	down.addEventListener("click", function(){
		var scroll = $(window).scrollTop() + scrollOffsetTop;
		for(var i = 0; i < pageScoll.length; i++){
			if (scroll < pageScoll[i]){
				break;
			}
		}
		window.scrollTo({top: pageScoll[i] - scrollOffsetTop, behavior: 'smooth'});
	});
}


function upDownvisi(pageScoll){
	var scroll = $(window).scrollTop();
	if (scroll < window.innerHeight/3){	
		document.querySelector("#upDown").style.opacity = "0";
	}
	else{
		document.querySelector("#upDown").style.opacity = "1";
	}
}


function getScrollArray(scrollOffsetTop){
	var pageScoll = [].slice.call(document.querySelectorAll(".page"));
	pageScoll = pageScoll.map(function(ele){
		return ele.clientHeight;
	});
	pageScoll.reverse();
	pageScoll.push(scrollOffsetTop + document.querySelector(".banner").clientHeight);
	pageScoll.reverse();

	for (var i = 1; i < pageScoll.length; i++){
		pageScoll[i] += pageScoll[i-1];
	}

	console.log(pageScoll);
	return pageScoll;
}


function makeAllInactive(lis){
	lis.forEach(function(ele){
		ele.classList.remove("active");
	})
}


function animateBackground(){
	var body = document.querySelector("body");
		body.style.backgroundPosition = "0px 0px";
		var pos = 0;
		setInterval(function(){
			pos--;
			if (pos == -3177){
				body.style.backgroundPosition = "0px 0px";
				pos = 0;
			} else {
				body.style.backgroundPosition = pos + "px 0px";
			}
		}, 10);
}