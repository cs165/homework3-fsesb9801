// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
	constructor(containerElement) {
		this.containerElement = containerElement;
		this.flashcardContainer = document.querySelector('#flashcard-container');
		this.deckName=''
		this.deckWord=[]
		this.deckDesc=[]
		this.wrongCardWords=[]
		this.wrongCardDescs=[]
		this.currentCard=0
		this.deckCardCount=0
		this.ygoMode=false
		this.dragStartX=undefined
		this.dragStartY=undefined
		this.diffX=undefined
		this.diffY=undefined
		this.rightCard=0
		this.wrongCard=0
		this.touchDown=false
		this.event=new Event('finished')
		this.animStartTime=0
		let thisObj=this
		this.flashcardContainer.addEventListener('pointerdown',function(e){thisObj.pointDown(e)})
		this.flashcardContainer.addEventListener('pointermove',function(e){thisObj.pointMove(e)})
		this.flashcardContainer.addEventListener('pointerup',function(e){thisObj.pointUp(e)})
		document.body.addEventListener('pointermove',function bodyPointMove(e){thisObj.pointMove(e)})
		document.body.addEventListener('pointerup',function bodyPointUp(e){thisObj.pointUp(e)})
	}

	show(set,retry=false) {
		this.containerElement.classList.remove('inactive');
		if(!retry)
			this.init(set)
		const card = new Flashcard(this.flashcardContainer, this.deckWord[0], this.deckDesc[0],this.ygoMode);
	}

	hide() {
		this.containerElement.classList.add('inactive');
	}
	
	init(set)
	{
		console.log('DECK:'+set)
		this.rightCard=0
		this.wrongCard=0
		this.currentCard=0
		this.ygoMode=false
		document.querySelector('.status .correct').innerText=0
		document.querySelector('.status .incorrect').innerText=0
		let thisObj=this
		FLASHCARD_DECKS.forEach(function(deck){
			if(deck.title===set)
			{
				thisObj.deckName=set
				if(set==='Sokko maho hatsudo! Basakasouru!')
					thisObj.ygoMode=true
				thisObj.deckWord=Object.keys(deck.words)
				thisObj.deckDesc=Object.values(deck.words)
				thisObj.deckCardCount=thisObj.deckWord.length
			}
		})
	}
	newCard()
	{
		this.currentCard++
		document.querySelector('.flashcard-box').remove()
		if(this.currentCard<this.deckCardCount)
		{
			const card=new Flashcard(this.flashcardContainer, this.deckWord[this.currentCard], this.deckDesc[this.currentCard],this.ygoMode);
		}
		else
			document.body.dispatchEvent(this.event)
	}	
	pointDown=(e)=>
	{
		this.dragStartX=parseInt(e.clientX)
		this.dragStartY=parseInt(e.clientY)
		this.touchDown=true
	}
	pointMove=(e)=>
	{
		if(!this.touchDown)
			return
		this.diffX=e.clientX-this.dragStartX
		this.diffY=e.clientY-this.dragStartY
		let deg=0.2*this.diffX
		let correctElem=document.querySelector('.status .correct')
		let incorrectElem=document.querySelector('.status .incorrect')
		this.flashcardContainer.style.transform='translate('+this.diffX+'px,'+this.diffY+'px) rotate('+deg+'deg)'
		if(this.diffX>150)
		{
			document.body.style.backgroundColor='#78e6c3'
			correctElem.textContent=(this.rightCard+1)
			incorrectElem.textContent=this.wrongCard
		}
		else if(this.diffX<-150)
		{
			document.body.style.backgroundColor='#e67878'
			correctElem.textContent=this.rightCard
			incorrectElem.textContent=(this.wrongCard+1)
		}
		else
		{
			document.body.style.backgroundColor='#d0e6df'
			correctElem.textContent=this.rightCard
			incorrectElem.textContent=this.wrongCard
		}
	}
	pointUp=(e)=>
	{
		if(!this.touchDown)
			return
		this.touchDown=false
		document.body.style.backgroundColor='#d0e6df'
		if(this.diffX>150)
		{
			this.rightCard++
			this.flashcardContainer.style.transform='translate(0px,0px) rotate(0deg)'
			this.newCard()
		}
		else if(this.diffX<-150)
		{
			this.wrongCardWords[this.wrongCard]=this.deckWord[this.currentCard]
			this.wrongCardDescs[this.wrongCard]=this.deckDesc[this.currentCard]
			this.wrongCard++
			this.flashcardContainer.style.transform='translate(0px,0px) rotate(0deg)'
			this.newCard()
		}
		else
		{
			this.animStartTime=Date.now()
			requestAnimationFrame(this.animToCenter)
			this.flashcardContainer.style.transform='translate(0px,0px) rotate(0deg)'
		}
	}
	animToCenter=()=>
	{
		var progress=1-(Date.now()-this.animStartTime)/600
		var tx=this.diffX*progress
		var ty=this.diffY*progress
		var tdeg=tx*0.2
		this.flashcardContainer.style.transform='translate('+tx+'px,'+ty+'px) rotate('+tdeg+'deg)'
		if(progress>0)
			requestAnimationFrame(this.animToCenter)
	}
	retry(restart)
	{
		if(!restart)
		{
			this.deckWord=this.wrongCardWords
			this.deckDesc=this.wrongCardDescs
			this.deckCardCount=this.wrongCard
			this.wrongCard=0
			this.currentCard=0
		}
		else
			this.init(this.deckName)
	}
}
