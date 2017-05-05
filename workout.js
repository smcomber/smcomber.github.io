var wkComplete = [];
var woComplete = [];
var wkCompleteString;
var woCompleteString;


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

$('.woComplete').click(function () {
	var thisClick = $(this);
	var thisWorkout = $(thisClick).parent().attr('class');
	thisWorkout = thisWorkout.split(' ');
	thisWorkout = thisWorkout[1];
	// check to see if item is already set as complete

	var index = woComplete.indexOf(thisWorkout);
	if (index > -1) {
		woComplete.splice(index, 1);
		woCompleteString = JSON.stringify(woComplete);
		localStorage.setItem('woComplete', woCompleteString);
		$(thisClick).parent().removeClass('woClosed');
	} else {
		woComplete.push(thisWorkout);
		woCompleteString = JSON.stringify(woComplete);
		localStorage.setItem('woComplete', woCompleteString);
		$(thisClick).parent().addClass('woClosed');
	}

	console.log(woComplete);
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
	//console.log(wkComplete);
	//woCheckComplete();
}



window.onload = checkComplete;
