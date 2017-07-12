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



window.onload = checkComplete;
