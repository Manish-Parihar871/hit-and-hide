const holes = document.querySelectorAll('.hole');
console.log(holes);
const scoreboard  = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');

let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score  = 0;
let countdown ;

function pickRandomHole(holes){
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if(hole==lastHole){
        return pickRandomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function popOut(){
    const time =  Math.random() * 1300 + 400;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');
    setTimeout(function(){
        hole.classList.remove('up');
        if(!timeUp) popOut();
    },time);
}
//popOut();
function startGame(){
    countdown = timeLimit/1000;
    scoreboard.textContent =0;
    scoreboard.style.display = 'block';
    countdownBoard.textContent = countdown;
    timeUp = false;
    score= 0;
    popOut();
    setTimeout(() => {
        timeUp = true;
    }, timeLimit);
    let startCountdown = setInterval(function(){
        countdown -=1;
        countdownBoard.textContent = countdown;
        if(countdown<0){
            countdown =0;
            clearInterval(startCountdown);
            countdownBoard.textContent = "Time up Thank you";
        }
    },1000);
}
function whack(e){
    score++;
    this.style.backgroundImage = 'url("yoda2.png")';
    setTimeout(() => {
        this.style.backgroundImage = 'url("yoda1.png")';
    }, 800);
    scoreboard.textContent = score;
}
moles.forEach(mole => mole.addEventListener('click',whack));
