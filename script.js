var runs = ["100m", "200m", "400m", "800m", "1km", "1500m ", "1mi", "2mi", "5km", "10km", "15km", "13.1mi", "26.2mi"]
var inm = [100, 200, 400, 800, 1000, 1500, 1609.344498, 3218.688996, 5000, 10000, 15000, 21082.41292, 42164.82584]

function speedmi(x, y) {
	var bh = runs.indexOf("1mi")
	var ch = runs.indexOf(y)
	var multiplier = inm[bh] / inm[ch]
	var mitime = x * multiplier
	var mph = 3600/mitime
	mph = parseFloat(mph).toFixed(2)
	$("#console").append("<br><div>mph</div><div><button>" + mph + "</button></div>")
}

function speedkm(x, y) {
	var bh = runs.indexOf("1km")
	var ch = runs.indexOf(y)
	var multiplier = inm[bh] / inm[ch]
	var kmtime = x * multiplier
	var kmph = 3600/kmtime
	kmph = parseFloat(kmph).toFixed(2)
	$("#console").append("<br><div>kmph</div><div><button>" + kmph + "</button></div>")
}

function conversion(x, z) {
	if ((x/3600)>=1) {
		hhh = Math.floor(x / 3600)
		msp = x%3600
		mmm = Math.floor(msp / 60)
		sss = (x%3600) % 60
		sms = sss
		sss = Math.floor(sss)
		point = sms - sss
		if (point == 0) {
			point = "00"
		}
		else {
			point = point.toString().substring(2, 4)
		}
		console.log(point)
		if (hhh < 10) {
			hhh = "0" + hhh
		}
		if (mmm < 10) {
			mmm = "0" + mmm
		}
		if (sss < 10) {
			sss = "0" + sss
		}
		$("#console").append("<div style='width: 25% text-align: right'>" + runs[z] + "</div><div><button>" + hhh + "</button>:<button>" + mmm + "</button>:<button>" + sss + "</button>.<button>" + point + "</button></div>")
	}
	else if ((x/60)>=1) {
		mmm = Math.floor(x / 60)
		sss = (x%3600) % 60
		sms = sss
		sss = Math.floor(sss)
		point = sms - sss
		console.log(point)
		if (point == 0) {
			point = "00"
		}
		else {
			point = point.toString().substring(2, 4)
		}
		if (mmm < 10) {
			mmm = "0" + mmm
		}
		if (sss < 10) {
			sss = "0" + sss
		}
		$("#console").append("<div style='width: 25% text-align: right'>" + runs[z] + "</div><div><button>00</button>:<button>" + mmm + "</button>:<button>" + sss + "</button>.<button>" + point + "</button></div>")
	}
	else {
		sms = x
		sss = Math.floor(x)
		point = sms - sss
		if (point == 0) {
			point = "00"
		}
		else {
			point = point.toString().substring(2, 4)
		}
		if (sss < 10) {
			sss = "0" + sss
		}
		$("#console").append("<div style='width: 25% text-align: right'>" + runs[z] + "</div><div><button>" + "00</button>:<button>00</button>:<button>" + sss + "</button>.<button>" + point + "</button></div>")
	}
}

function equivalence(x, y) {
	var ch = runs.indexOf(y)
	for (i in inm) {
		console.log(inm[i])
		var multiplier = inm[i] / inm[ch]
		var multiplied = multiplier*x
		conversion(multiplied, i)
	}
	speedmi(x, y)
	speedkm(x, y)
	$("#console").append("<br><div><button style='background-color: darkcyan; color: white;' onClick='initial()'>Restart</button></div>")
}

function next(y) {
	$("#chooser").click(function() {
		var hh = document.getElementById("hours").value * 3600
		var mm = document.getElementById("minutes").value * 60
		var ss = document.getElementById("seconds").value
		time = parseInt(hh)+parseInt(mm)+parseInt(ss)
		$("#console").empty()
		equivalence(time, y)
	})
}

function hrs(x) {	
	$("#console").append("<div style='text-align: center; width: 100%'><label for='hours'>How many hours does it take?</label><br><input type='number' id='hours' name='hours'></div><br>")
	var hours = document.getElementById("hours").value;
	if (hours<0) {
		$("#console").empty()
		$("#console").append("<div>Please enter positive positive numbers only</div>")
		runner(x)
	}
}

function mins(x) {
	$("#console").append("<div style='text-align: center; width: 100%'><label for='minutes'>How many minutes does it take?</label><br><input type='number' id='minutes' name='minutes'></div><br>")
	var minutes = document.getElementById("minutes").value;
	if (minutes<0) {
		$("#console").empty()
		$("#console").append("<div>Please enter positive positive numbers only</div>")
		runner(x)
	}

}

function secs(x) {
	$("#console").append("<div style='text-align: center; width: 100%'><label for='seconds'>How many seconds does it take?</Slabel><br><input type='number' id='seconds' name='seconds'></div>")
	var seconds = document.getElementById("seconds").value;
	if (seconds<0) {
		$("#console").empty()
		$("#console").append("<div>Please enter positive positive numbers only</div>")
		runner(x)
	}
}

function runner(race) {
	hrs()
	mins()
	secs()
	$("#console").append("<br><div style='text-align: center; width: 100%' id='chooser'><button>GO!</button></div>")
	next(race)
}

function initial() {
	$("#console").empty()
	$("#console").append("<br><div style='text-align: center;'>Which race do you need metrics on?</div><br>")
	for (i in runs) {
		$("#console").append("<div style='text-align: center;'><button style='text-align: center; height: 25px; width: 25%' id='" + runs[i] + "'>" + runs[i] + "</button></div>")
	}
	$("button").click(function() {
		var pick = $(this).attr('id')
		$("#console").empty()
		runner(pick)
	})
}

initial()




