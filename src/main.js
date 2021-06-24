'use strict'

const gamefield = document.querySelector('.game');
const mainMenu = document.querySelector('.main_menu');
const gameLevel = document.querySelector('.game_level')
const mainMenuBtn = document.querySelector('.main_menu_button');
const fieldRect = gamefield.getBoundingClientRect();
const gameTimer = document.querySelector('.game_timer');
const popup = document.querySelector('.pop_up');
const popupMessage = document.querySelector('.popup_message');
const popupButton = document.querySelector('.popup_button');

let timer = undefined;
let gameResult = undefined;
let level = 1;

mainMenuBtn.addEventListener('click', () => {
    initGame();
});

function initGame(){
    gameLevel.innerHTML = `LEVEL${level}`;
    popup.style.visibility = 'hidden';
    gamefield.innerHTML = '';
    gamefield.style.background = "url(img/waldo_" + level + "_background.jpeg) center/cover";
    mainMenu.style.visibility = 'hidden';
    throwWaldo();
    startTimer();
}

function throwWaldo(){
    var waldo = document.createElement("img");
    waldo.setAttribute("class", 'waldo');
    waldo.setAttribute("src", "./img/waldo_" + level + ".png");
    waldo.style.position = 'absolute';
    waldo.style.left = `${getRandomNum(0, fieldRect.width - 60)}px`;
    waldo.style.top = `${getRandomNum(0, fieldRect.height - 60)}px`;
    gamefield.appendChild(waldo);
}

function getRandomNum(min, max){
    return Math.random() * (max-min) + min;
}

function startTimer(){
    let remainingTimeSec = 120;
    timer = setInterval(()=>{
        updateTimerText(--remainingTimeSec);
        if(remainingTimeSec <= 0){
            clearInterval(timer);
            gameFail();
            gameResult = undefined;
            popupButton.addEventListener('click', () => {
                initGame();
            })
            return;
        }
        if(gameResult == true){
            clearInterval(timer);
            // gameSuccess();
            gameResult = undefined;
            popupButton.addEventListener('click', () => {
                initGame();
            })
            return;
        }
    }, 1000);
}

gamefield.addEventListener('click', event=>{    //  월리를 찾으면
    const cnt = event.target;
    if(cnt.className == 'waldo'){
        gameSuccess();
    }
})

function updateTimerText(time){
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes} : ${seconds}`;
}

function gameSuccess(){
    gameResult = true;
    popup.style.visibility = 'visible';
    popupMessage.innerHTML = `YOU FOUND HIM! NEXT LEVEL?`;
    popupButton.innerHTML = 'NEXT';
    level++;
}

function gameFail(){
    popup.style.visibility = 'visible';
    popupMessage.innerHTML = `YOU LOST HIM! TRY AGAIN?`;
    popupButton.innerHTML = 'RESTART';
}