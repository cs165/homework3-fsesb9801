// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
	constructor() {
		const menuElement = document.querySelector('#menu');
		this.menu = new MenuScreen(menuElement);
		let appObject=this
		Array.from(menuElement.querySelector('#choices').children).forEach(function(choice){
			choice.addEventListener('click',function(){
				appObject.toFlashCard(choice.innerText)
			})
		})

		const mainElement = document.querySelector('#main');
		this.flashcards = new FlashcardScreen(mainElement);
		document.body.addEventListener('finished',function(){
			appObject.toResult()
		})

		const resultElement = document.querySelector('#results');
		this.results = new ResultsScreen(resultElement);
		document.querySelector('#results .continue').addEventListener('click',function(){
			appObject.flashcards.retry(appObject.results.startOver)
			appObject.toFlashCard('',true)
		})
		document.querySelector('#results .to-menu').addEventListener('click',function(){
			appObject.toMenu()
		})
		
	}
	toMenu()
	{
		this.menu.show()
		this.flashcards.hide()
		this.results.hide()
	}
	toFlashCard(selectedSet,retry)
	{
		this.menu.hide()
		this.results.hide()
		this.flashcards.show(selectedSet,retry)
	}
	toResult()
	{
		this.menu.hide();
		this.flashcards.hide()
		this.results.show(app.flashcards.rightCard,app.flashcards.wrongCard);
	}
}
