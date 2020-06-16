/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let score, roundscore, activePlayer;

init();

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundscore = 0;

  // 이 부분을 toggle로 처리한다는 것은 정말 놀라웠음 보통 난 직접적인 click이벤트에만 toggle을 썻는데 이건 마치 편견의 틀을 꺠부순 거였음. 매우 기본적이고 단순하지만 놀라웠음. 앞으로 이 사람 코드를 유심히 봐야겠음
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-roll').addEventListener('click', () => {
  // 1. Random number
  const dice = Math.floor(Math.random() * 6) + 1;

  // 2. Display the result
  const diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  diceDOM.src = `dice-${dice}.png`;

  // 3. update round
  if (dice !== 1) {
    roundscore += dice;
    document.querySelector(`#current-${activePlayer}`).textContent = roundscore;
  } else {
    nextPlayer();
  }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  // Add CURRENT score to GLOBAL score
  score[activePlayer] += roundscore;

  // Update the UI
  document.querySelector(`#score-${activePlayer}`).textContent =
    score[activePlayer];

  // check if player won the game
  if (score[activePlayer] >= 100) {
    document.getElementById(`name-${activePlayer}`).textContent = `WINNER!`;
    document.querySelector('.dice').style.display = 'none';
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.add('winner');
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.remove('active');
  } else {
    nextPlayer();
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  score = [0, 0];
  roundscore = 0;
  activePlayer = 0;

  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.getElementById(`name-0`).textContent = `Player 1`;
  document.getElementById(`name-1`).textContent = `Player 2`;
  document.querySelector(`.player-0-panel`).classList.remove('winner');
  document.querySelector(`.player-1-panel`).classList.remove('winner');
  document.querySelector(`.player-0-panel`).classList.add('active');
  document.querySelector(`.player-1-panel`).classList.remove('active');
  document.querySelector('.dice').style.display = 'none';
}
