window.onload = function(){
	$("nav").addClass("navbar-fixed-top");
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

	document.querySelector("#submit").addEventListener("click", function(){
		document.querySelector(".blackScreen").classList.remove("blackScreenDissapper");
		var fields = document.querySelectorAll("form .Disp input");
		var fieldsArr = [].slice.call(fields);
		var fieldValues = fieldsArr.map(function(ele){
			return ele.value;
		})
		var dispVals = ["Team Name:", "College Name:", "College ID:", "Team Leader:", "Phn No:", "Email:", "Idea Title:"];
		var disp = [].slice.call(document.querySelectorAll(".popup .Disp"));
		disp.forEach(function(ele, index){
			ele.innerHTML = "<strong>" + dispVals[index] + "</strong>" + " " + fieldValues[index];
		})
	})

	document.querySelector("#no").addEventListener("click", function(){
		document.querySelector(".blackScreen").classList.add("blackScreenDissapper");
	})

	document.querySelector("#yes").addEventListener("click", function(){
		document.querySelector(".blackScreen").classList.add("blackScreenDissapper");
		document.querySelector("#realSubmitBtn").click();
	})
}