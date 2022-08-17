const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');

})

timeList.addEventListener('click', (event) => {
    if(event.target.classList.contains('time-btn')) {
        time = parseInt((event.target.getAttribute('data-time')));
        if(time < 10) {
            time = `0${time}`
        }
        screens[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click', (event) => {
    if(event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if(time === 0) {
        finishGame()
    } else {
        let current = --time;
        if(current < 10) {
            current = `0${current}`
        }
    setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счёт: <span class='primary'>${score}</span></h1>`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(5, 15);
    const {width, height} = board.getBoundingClientRect();
    const color = getRandomColor();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.left = `${x}px`
    circle.style.top = `${y}px`
    circle.style.background = color

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// случайный цвет
function getRandomColor() {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];

    let color = '#dd';
    for(let i = 2; i < 6; i++) {
        let index = Math.floor(Math.random() * arr.length);
        color += arr[index]
    } return color
}


function winTheGame(ms) {
    function killCircle() {
        const circle = document.querySelector('.circle');

        if(circle) {
            circle.click();
        }   
    }

    setInterval(killCircle, ms)
}