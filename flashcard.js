// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
	constructor(containerElement, frontText, backText ,ygoMode=false) {
		this.containerElement = containerElement;

		this._flipCard = this._flipCard.bind(this);

		this.flashcardElement = this._createFlashcardDOM(frontText, backText,ygoMode);
		this.containerElement.append(this.flashcardElement);

		this.flashcardElement.addEventListener('click', this._flipCard);
		
	}

	// Creates the DOM object representing a flashcard with the given
	// |frontText| and |backText| strings to display on the front and
	// back of the card. Returns a reference to root of this DOM
	// snippet. Does not attach this to the page.
	//
	// More specifically, this creates the following HTML snippet in JS
	// as a DOM object:
	// <div class="flashcard-box show-word">
	//	 <div class="flashcard word">frontText</div>
	//	 <div class="flashcard definition">backText</div>
	// </div>
	// and returns a reference to the root of that snippet, i.e. the
	// <div class="flashcard-box">
	_createFlashcardDOM(frontText, backText,ygoMode) {
		const cardContainer = document.createElement('div');
		cardContainer.classList.add('flashcard-box');
		cardContainer.classList.add('show-word');

		const wordSide = document.createElement('div');
		wordSide.classList.add('flashcard');
		wordSide.classList.add('word');
		wordSide.textContent = frontText;
		if(ygoMode)
		{
			wordSide.style.background='#733526'
			wordSide.style.boxShadow='0 8px #b5895a'
		}
	
		const definitionSide = document.createElement('div');
		definitionSide.classList.add('flashcard');
		definitionSide.classList.add('definition');
		definitionSide.textContent= backText;
		if(ygoMode)
		{
			definitionSide.style.background='#ba8e25'
			definitionSide.style.boxShadow='0 8px #3e4b4e'
		}

		cardContainer.appendChild(wordSide);
		cardContainer.appendChild(definitionSide);
		return cardContainer;
	}

	_flipCard(event) {
		this.flashcardElement.classList.toggle('show-word');
	}

}
