// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
	this.startOver=undefined
  }

  show(numberCorrect, numberWrong) {
    this.containerElement.classList.remove('inactive');
	let percentage=(numberCorrect*100/(numberCorrect+numberWrong)).toFixed(1)
	document.querySelector('#results .percent').innerText=percentage
	document.querySelector('#results .correct').innerText=numberCorrect
	document.querySelector('#results .incorrect').innerText=numberWrong
	if(percentage>=99.9)
	{
		document.querySelector('#results .continue').innerText='Start Over?'
		this.startOver=true
	}
	else
	{
		document.querySelector('#results .continue').innerText='Continue'
		this.startOver=false
	}
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
