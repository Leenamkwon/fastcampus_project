/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let score, roundscore, activePlayer;

score = [0, 0];
roundscore = 0;
activePlayer = 0;

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', () => {
  // 1. Random number
  const dice = Math.floor(Math.random() * 6) + 1;

  // 2. Display the result
  const diceDOM = document.querySelector(`#current-${activePlayer}`);
  diceDOM.style.display = 'block';
  diceDOM.src = `dice-${dice}.png`;

  // 3. update round
  if (dice !== 1) {
    roundscore += dice;
    diceDOM.textContent = roundscore;
  } else {
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  }
});
