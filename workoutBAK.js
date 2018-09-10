var wkComplete = [];
var woComplete = [];
var wkCompleteString;
var woCompleteString;

// mark week complete
$('h2').click(function () {
	var thisClick = $(this);
	var thisWeek = $(thisClick).parent().attr('id');
	// check to see if item is already set as complete
	var index = wkComplete.indexOf(thisWeek);
	if (index > -1) {
		wkComplete.splice(index, 1);
		wkCompleteString = JSON.stringify(wkComplete);
		localStorage.setItem('wkComplete', wkCompleteString);
		$(thisClick).parent().removeClass('wkClosed');
	} else {
		wkComplete.push(thisWeek);
		wkCompleteString = JSON.stringify(wkComplete);
		localStorage.setItem('wkComplete', wkCompleteString);
	$(thisClick).parent().addClass('wkClosed');
	}
	//console.log(complete);
})

// mark workout complete
$('.woComplete').click(function () {
	var thisClick = $(this);
	var thisWorkout = $(thisClick).parent().attr('id');
	//thisWorkout = thisWorkout.split(' ');
	//thisWorkout = thisWorkout[1];
	// check to see if item is already set as complete

	var index = woComplete.indexOf(thisWorkout);
	if (index > -1) {
		woComplete.splice(index, 1);
		woCompleteString = JSON.stringify(woComplete);
		localStorage.setItem('woComplete', woCompleteString);
		$(thisClick).parent().removeClass('woClosed');
		$(thisClick).html('Mark workout complete');
	} else {
		woComplete.push(thisWorkout);
		woCompleteString = JSON.stringify(woComplete);
		localStorage.setItem('woComplete', woCompleteString);
		$(thisClick).parent().addClass('woClosed');
		$(thisClick).html('Reset to incomplete');
		checkWeek(thisWorkout);
	}

	//console.log(woComplete);
})

// get stored completion record and set styles - week
function checkComplete() {
	//localStorage.removeItem('wkComplete');
	var storedComplete = localStorage.getItem('wkComplete');
	storedComplete = JSON.parse(storedComplete);
	if (storedComplete != null) {
		for (i = 0; i < storedComplete.length; i++) {
			var weekId = storedComplete[i]
			var week = $('.week');
			for (v = 0; v < week.length; v++) {
				var thisWeekId = $(week[v]).attr('id');
				if (thisWeekId == weekId) {
					$(week[v]).addClass('wkClosed');
				}
			}
			wkComplete.push(storedComplete[i]);
		}
	}
	console.log(wkComplete);
	woCheckComplete();
}

// get stored completion record and set styles - workout
function woCheckComplete() {
	//localStorage.removeItem('woComplete');
	var storedComplete = localStorage.getItem('woComplete');
	storedComplete = JSON.parse(storedComplete);
	if (storedComplete != null) {
		for (i = 0; i < storedComplete.length; i++) {
			var weekId = storedComplete[i]
			var week = $('.workout');
			for (v = 0; v < week.length; v++) {
				var thisWeekId = $(week[v]).attr('id');
				if (thisWeekId == weekId) {
				$(week[v]).addClass('woClosed');
		$(week[v]).find('.woComplete').html('Reset to incomplete');
				}
			}
			woComplete.push(storedComplete[i]);
		}
	}
	//console.log('wo = ' + woComplete);
	//woCheckComplete();
}

// set week complete when all three workouts are set to complete
function checkWeek(workoutID) {
	var parentWeek = $('#' + workoutID).parent();
	var parentWeekID = $(parentWeek).attr('id');
	var weekNo = parentWeekID.split('wk')[1];
	var woCheck = $(parentWeek).find('.workout');
	var count = 0;

	for (i = 0; i < woCheck.length; i++) {
		if ($(woCheck[i]).hasClass('woClosed')) {
			count++;
			if (count == 3) {
				wkComplete.push(parentWeekID);
				wkCompleteString = JSON.stringify(wkComplete);
				localStorage.setItem('wkComplete', wkCompleteString);
				$(parentWeek).addClass('wkClosed');
	alert('Week ' + weekNo + ' complete! Nice work!');
			}
		}
	}
}


$('.clearBtn').click(function () {
	localStorage.removeItem('wkComplete');
	localStorage.removeItem('woComplete');
	location.reload()
})


var weekMin;
var weekSec;

$('#wk1-wo1 .woStart').click(function(){
	weekMin = 1;
	weekSec = 30;
	console.log(weekMin + weekSec);
	timerStart();
	$('.timerWrap').show();
	$('.containerInner').show();
});

//****************************************************
//
// TIMER
//
//****************************************************
	function timerStart(){
	// set initial entry
	var getMin = 1;
	var getSec = 5;

	timerWrap(getMin, getSec);

	function timerWrap(enterMin, enterSec){

		var currentMin = enterMin;
		var currentSec = enterSec;
		var currentMSec = 0;
		var totalSec = enterSec + enterMin*60;
		var totalMSec = enterSec*100 + (enterMin*60)*100;
		progMSec = totalMSec;

		console.log('totalMSec: ' + totalMSec);

		var newMin;
		var newSec;
		var newMSec;

		if (enterMin < 10 && enterMin >= 0) {enterMin = '0' + enterMin};
		if (enterSec < 10 && enterSec >= 0) {enterSec = '0' + enterSec};

		$('.timer .timerMin').html(enterMin);
		$('.timer .timerSec').html(enterSec);
		$('.timer .timerMSec').html('00');

		function runTimer(currentMin, currentSec, currentMSec){

		// begin interval
		var x = setInterval(function() {
			if(currentMSec >= 1) {
				currentMSec = currentMSec - 1;

			}
			else {
				currentMSec = 99;

				if(currentSec > 0){
					currentSec = currentSec - 1;

				}
				else {
					currentSec = 59;
					currentMin = currentMin - 1
				}
			}

			var currentMinD = currentMin;
			var currentSecD = currentSec;
			var currentMSecD = currentMSec;

            if (currentSecD < 10 && currentSecD >= 0) {currentSecD = '0' + currentSecD};
            if (currentMSecD < 10 && currentMSecD >= 0) {currentMSecD = '0' + currentMSecD};
			if (currentMinD < 10 && currentMinD >= 0) {currentMinD = '0' + currentMinD};



			$('.timer .timerMin').html(currentMinD);
			$('.timer .timerSec').html(currentSecD);
			$('.timer .timerMSec').html(currentMSecD);

			// display countdown
			if(currentMin == 0 && currentSec <= 5){
				//$('.countdown').fadeIn(300);
				$('.countdown').html(currentSec);
				//$('.countdown').fadeOut(700);
			}

			// stop timer when it reaches 0
			if (currentMin == 0 && currentSec == 0 && currentMSec == 0) {
				clearInterval(x);
				$('.timer').html('Done!');
				$('.pauseTimer').hide();
			  }

			// progress bar

			var progPct = 100/(totalMSec);
			progMSec = progMSec - 1;
			//var progMSec = (progMSec + currentMin*60);

			var progNow = progMSec*progPct;
			var progDisplay = 100 - progNow;
			//console.log('progMSec ' + progMSec);
			//console.log('progNow ' + progNow);
			//console.log('progDisplay ' + progDisplay);
			if(progDisplay >= 0 && progDisplay <= 100){
				$('.progress').css('width', progDisplay + '%');
			}




		}, 10); // end interval (set to 10 for final)

			// pause timer btn
			$('.pauseTimer').click(function(){
				//console.log('pause')
				clearInterval(x);
				newMin = currentMin;
				newSec = currentSec;
				newMSec = currentMSec;
				$(this).hide();
				$('.resumeTimer').show();
				$('.resetTimer').show();
			});

			// resume timer btn
			$('.resumeTimer').click(function(){
				//console.log('resume')
				$(this).hide();
				$('.resetTimer').hide();
				$('.pauseTimer').show();
				runTimer(newMin, newSec, newMSec)
			});

			// reset timer btn
			$('.resetTimer').click(function(){
				timerWrap(getMin, getSec)
				//console.log('reset');
				$(this).hide();
				$('.resumeTimer').hide();
				$('.startTimer').show().html('Start');

			});





		}; // end runTimer

		// start timer btn
		$('.startTimer').click(function(){
			runTimer(currentMin, currentSec, currentMSec)
			$(this).hide();
			$('.pauseTimer').show();
			$('.resetTimer').hide();
		});

	// close timer
	$('.closeTimer').click(function(){
		console.log('close');
		$('.containerInner').hide();
		$('.timerWrap').hide();
		//runTimer(9, 9, 9)
	});


	}
	}


// END TIMER ************************************************

window.onload = checkComplete;
