//Example fetch using pokemonapi.co
document.querySelector('#newGame').addEventListener('click', getDeck)
document.querySelector('#draw').addEventListener('click', draw)

let cardImg1 = document.getElementById('player1')
let cardImg2 = document.getElementById('player2')

let myScoreEl = document.getElementById('myScoreEl')
let botScoreEl = document.getElementById('botScoreEl')

let myScore = Number(localStorage.getItem('myScore'))
let botScore = Number(localStorage.getItem('botScore'))

myScoreEl.innerText = myScore
botScoreEl.innerText = botScore



function getDeck() {
  const url = 'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'

  myScoreEl.innerText = 0
  botScoreEl.innerText = 0

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      localStorage.setItem('deckId', data.deck_id)
      cardImg1.src = ''
      cardImg2.src = ''
      myScore = 0
      botScore = 0

      localStorage.setItem('myScore', myScore)
      localStorage.setItem('botScore', botScore)
    })
    .catch(err => {
      console.log(`error ${err}`)
    })
}

function draw() {
  let deckId = localStorage.getItem('deckId')
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      let cards = data.cards
      let myCard = cards[0].value
      let botCard = cards[1].value

      cardImg1.src = cards[0].image
      cardImg2.src = cards[1].image

      determineWinner(cards, myCard, botCard)
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}

function determineWinner(cards, c1, c2) {
  for (let card in cards) {
    card.value = 'ACE' ? card.value = 14
      : card.value = 'KING' ? card.value = 13
        : card.value = 'QUEEN' ? card.value = 12
          : card.value = 'JACK' ? card.value = 11
            : card.value = Number(card.value)
  }

  if (c1 > c2) {
    myScore += 1
    myScoreEl.innerText = `${myScore}`
  } else if (c1 < c2) {
    botScore += 1
    botScoreEl.innerText = `${botScore}`
  }

  localStorage.setItem('myScore', myScore)
  localStorage.setItem('botScore', botScore)
}