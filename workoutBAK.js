var complete = [];
var completeString;

function setComplete(){
$('h2').click(function(){
	var thisClick = $(this);
	var thisWeek = $(thisClick).parent().attr('id');
	var index = complete.indexOf(thisWeek);
	if (index > -1) {
		complete.splice(index, 1);
		completeString = JSON.stringify(complete);
		localStorage.setItem('complete', completeString);
		$(thisClick).parent().removeClass('closed');
	}

	else {
		complete.push(thisWeek);
		completeString = JSON.stringify(complete);
		localStorage.setItem('complete', completeString);
		$(thisClick).parent().addClass('closed');
	}
console.log(complete);
})
}

function checkComplete(){
//localStorage.removeItem('complete');
var storedComplete = localStorage.getItem('complete');
storedComplete = JSON.parse(storedComplete);
	if (storedComplete != null){
	//storedComplete = storedComplete.split(',');
		for (i=0; i < storedComplete.length; i++){
			checkWeek(storedComplete[i])
			complete.push(storedComplete[i]);
		}
	}
console.log(complete);
setComplete();
}

function checkWeek(weekId){
	var week = $('.week');
	for (v=0; v < week.length; v++){
		var thisWeekID = $(week[v]).attr('id');
		if (thisWeekID == weekId){
			$(week[v]).addClass('closed');
			return;
			}
		else {
			return;
		}

}	
} 
window.onload = checkComplete;

