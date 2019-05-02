// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
	constructor(containerElement) {
		this.containerElement = containerElement;
		let choices=this.containerElement.querySelector('#choices')
		FLASHCARD_DECKS.forEach(function(item){
			let e=document.createElement('div')
			e.innerText=item.title
			choices.appendChild(e)
		})
	}

	show() {
		this.containerElement.classList.remove('inactive');
	}

	hide() {
		this.containerElement.classList.add('inactive');
	}
}
