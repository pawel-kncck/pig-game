var scores, roundScore, activePlayer, gamePlaying, winningScore, lastDiceValue, winningScore;

winningScore = 100;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {

        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        console.log('Dice: ' + dice + '. Last Dice: ' + lastDiceValue + '. Round score: ' + roundScore + '. Scores: ' + scores)

        //2. Display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png'

        //3. Update the round score IF the rolled number was NOT a 1
        if (dice === 1) {
            changeActivePlayer();
            console.log('V1. One - change player, cancel round score')
        } else if (dice === 6 && lastDiceValue === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            changeActivePlayer();
            console.log('V2. Six six - change player, cancel total score')
        } else {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            console.log('V0')
            lastDiceValue = dice;
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add current score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if the player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
            winningScore = 0;
        } else {
            changeActivePlayer();
        }
    }
})

function changeActivePlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    lastDiceValue = 0;
    // hideDice();
}

function hideDice() {
    // document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice').classList.add('opacity');
}

function init() {
    gamePlaying = true;
    
    // while (winningScore < 20 || winningScore > 500 || typeof(winningScore) !== number) {
    //     winningScore = prompt("What should be the winning score? \(must be a number between 20 and 500\)");
    //     break;
    // }
    
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

    hideDice();
    lastDiceValue = 0;
}

document.querySelector('.btn-new').addEventListener('click', init);