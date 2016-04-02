window.onload = initAll;
var t = 0;
var moves = 0;
var timer;
var hs;
function initAll() {
	if(document.getElementById) {
		if (localStorage.getItem("high") !== null) {
  			hs = localStorage.getItem("high");
			document.getElementById("hg_sc").innerHTML = "Highest Score: " + hs;
		}
		document.getElementById("reload").onclick = another_card;
		new_card();
	}
	else {
		alert("Sorry your browser doesn't support the script!");
	}	
}

function new_card() {
	t = 0;
	moves = 0;
	timer = setInterval(myTimer, 1000);
	for(var i = 1;i <= 9;i++) {
		document.getElementById("bl" + i).style.display = "block";
	}
	for(var i = 1;i <= 9;i++) {
		set_sq(i);
	}
	play_game();
}

function set_sq(thissq) {
	var curr_sq = "bl" + thissq;
	var inp1 = new Array(1,2,3,4,0,6,7,5,8);
	document.getElementById(curr_sq).innerHTML = inp1[thissq-1];
}

function another_card() {
	clearInterval(timer);
	document.getElementById("result").innerHTML = "";
	new_card();
	return false;
}

function myTimer() {
	t++;
	//alert(t);
	document.getElementById("time").innerHTML = "Timer: " + t;
}

function play_game() {
	for(var j = 1;j <= 9;j++) {
		var ds = document.getElementById("bl" + j);

    	ds.onmouseover = function() {
       		this.style.backgroundColor = "#ff0000";
  		 }
        ds.onmouseout = function() {
      		this.style.backgroundColor = "#DC143C";  
   		 }

		document.getElementById("bl" + j).onclick = function() {
			var flag =  false;
            var i = this.id;
           // alert(this.id);
            i = i.charAt(2);
			if(valid(getup(i))) {
				var nm = getup(i);
				if(document.getElementById("bl" + nm).innerHTML === "0") {
					moves++;
					var temp = document.getElementById("bl" + i).innerHTML;
					document.getElementById("bl" + nm).innerHTML = temp;
					document.getElementById("bl" + i).innerHTML = "0";
					flag = true;
				}
			}
			if (valid(getdown(i))) {
				var nm = getdown(i);
				if(document.getElementById("bl" + nm).innerHTML === "0") {
					moves++;
					var temp = document.getElementById("bl" + i).innerHTML;
					document.getElementById("bl" + nm).innerHTML = temp;
					document.getElementById("bl" + i).innerHTML = "0";
					flag = true;
				}
			}
			if(valid(getleft(i))) {
				if(i != 4 && i != 7) {
					var nm = getleft(i);
					if(document.getElementById("bl" + nm).innerHTML === "0") {
						moves++;
						var temp = document.getElementById("bl" + i).innerHTML;
						document.getElementById("bl" + nm).innerHTML = temp;
						document.getElementById("bl" + i).innerHTML = "0";
						flag = true;
					}
				}
			}
			if(valid(getright(i))) {
				if(i != 3 && i != 6) {
					var nm = getright(i);
					if(document.getElementById("bl" + nm).innerHTML === "0") {
						moves++;
						var temp = document.getElementById("bl" + i).innerHTML;
						document.getElementById("bl" + nm).innerHTML = temp;
						document.getElementById("bl" + i).innerHTML = "0";
						flag = true;
					}
				}
			}
			if(win()) {
				end_game();
			}

		};
	}
}

function valid(i) {
	if(Number(i) >= 1 && Number(i) <= 9) {
		return true;
	}
	return false;

}

function getup(i) {
	return Number(i)-3;
}
function getdown(i) {
	return Number(i)+3;
}
function getleft(i) {
	return Number(i)-1;
}
function getright(i) {
	return Number(i)+1;
}

function win() {
	var ws = new Array(1,2,3,4,5,6,7,8,0);
	for(var i = 1;i <= 9;i++) {
		var a = ws[i-1];
		if(document.getElementById("bl" + i).innerHTML != a) {
			return false;
		}
	}
	return true;
}

function end_game() {
	for(var i = 1;i <= 9;i++) {
		document.getElementById("bl" + i).style.display = "none";
	}
	var sc = Math.floor(1000/(t*moves));
	document.getElementById("result").innerHTML = "Your Score: " + sc;
	if (localStorage.getItem("high") === null) {
  		localStorage.setItem("high",sc);
	}
	else {
		hs = localStorage.getItem("high");
		if(sc > hs) {
			localStorage.setItem("high",sc);
		}
	}
	hs = localStorage.getItem("high");
	document.getElementById("hg_sc").innerHTML = "Highest Score: " + hs;
	t = 0;
	clearInterval(timer);
}