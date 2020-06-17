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
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;

  // 2. Display the result
  document.getElementById('dice-1').style.display = 'block';
  document.getElementById('dice-2').style.display = 'block';
  document.getElementById('dice-1').src = `dice-${dice1}.png`;
  document.getElementById('dice-2').src = `dice-${dice2}.png`;

  // 3. update round
  if (dice1 !== 1 && dice2 !== 1) {
    roundscore += dice1 + dice2;
    document.querySelector(`#current-${activePlayer}`).textContent = roundscore;
  } else if (dice1 === 6 && dice2 === 6) {
    score[activePlayer] = 0;
    nextPlayer();
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

  var input = document.querySelector('.final-score').value;
  let winningScore;
  if (input.trim() === '') {
    winningScore = 100;
  } else {
    winningScore = input;
  }

  // check if player won the game
  if (score[activePlayer] >= winningScore) {
    document.getElementById(`name-${activePlayer}`).textContent = `WINNER!`;
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
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

  for (let i = 0; i <= score.length - 1; i++) {
    document.getElementById(`score-${i}`).textContent = 0;
    document.getElementById(`current-${i}`).textContent = 0;
    document.getElementById(`name-${i}`).textContent = `Player ${i}`;
    document.querySelector(`.player-${i}-panel`).classList.remove('winner');
    document.querySelector(`.player-${i}-panel`).classList.remove('active');
  }
  document.querySelector(`.player-0-panel`).classList.add('active');
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}
