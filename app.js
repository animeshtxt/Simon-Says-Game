let gameSeq = [];
let userSeq = [];
let btns = ["button-one", "button-two", "button-three", "button-four"];
let header = document.querySelector('#header');
let progress = document.querySelector('h3');
let score = document.querySelector("#score");
let level = 0 , round = 1 , currLvl = 1 , highestScore = 0;
let start = document.querySelector('#start-btn');
let body = document.querySelector('body');
let scoreCardBtn = document.querySelector('#score-card-btn');
let scoreCard = document.querySelector('#score-card');
let scoreDisplay = 'none';
let initScore = document.querySelector('#init-score');
let helpBtn = document.querySelector("#help-btn");
let helpBox = document.querySelector('.help');
let rules = document.querySelector('#rules');
let helpDisplay = 'none';

let allBtns = document.querySelectorAll('.btn');

start.addEventListener('click', function() {

    header.scrollIntoView({ behavior: 'smooth', block: 'center' });
    start.style.backgroundColor = 'rgb(225, 96, 84)' ;
    setTimeout(() => {
        start.style.backgroundColor = 'rgb(218, 71, 58)' ;
    }, 200);
    reset();
    
    body.style.backgroundColor = "rgb(225, 170, 97)" ;
        setTimeout(() => {
            levelUp();
        }, 700);
        start.innerText = "RESTART" ;
    
    
})

function levelUp () {
    for( bton of allBtns){
        bton.addEventListener('click', btnPress)
    }
    allBtns[0].style.backgroundColor = "rgb(209, 109, 109)";
    allBtns[1].style.backgroundColor = "rgb(18, 99, 164)";
    allBtns[2].style.backgroundColor = "rgb(85, 201, 91)" ;
    allBtns[3].style.backgroundColor = "rgb(201, 69, 32)" ;
    score.innerHTML = `Highest score : ${highestScore}`;
    progress.innerHTML = `Correct guess : 0 &nbsp;&nbsp; Remaining : ${gameSeq.length+1}`;
    userSeq = [];
    level++ ;
    currLvl = 1 ;
    header.innerHTML = `Round : ${round} <br> Level : ${level}` ;
    let randIdx = Math.floor(Math.random()*4);
    let randBtn = btns[randIdx];
    let flashBtn = document.querySelector(`#${randBtn}`) ;
    gameSeq.push(randBtn);
    gameFlash(flashBtn);
    
}

function gameFlash (btn){
    let bgCol = btn.style.backgroundColor ;
    btn.style.backgroundColor = "white";
    setTimeout(() => {
        btn.style.backgroundColor = bgCol ;
    }, 200);

}


function btnPress () {
    userFlash(this);
    userSeq.push(this.getAttribute('id'));
    checkAns(userSeq.length-1);
}

function userFlash (btn){
    let bgCol = btn.style.backgroundColor ;
    btn.style.backgroundColor = "yellow";
    setTimeout(() => {
        btn.style.backgroundColor = bgCol ;
    }, 200);

}

function checkAns(idx) {
    
    if(userSeq[idx] === gameSeq[idx]){
        progress.innerHTML = `Correct guess : ${idx+1} &nbsp;&nbsp; Remaining : ${gameSeq.length-idx-1}`;
        if(userSeq.length == gameSeq.length){
            
            for( bton of allBtns){
                bton.removeEventListener('click', btnPress)
            }
            
            setTimeout(() => {
                levelUp();
            }, 500);
        }
        
    } else {
        header.innerHTML =  'Game over ! <br> Click on RESTART to start again' ;
        for( bton of allBtns){
            bton.removeEventListener('click', btnPress)
        }
        addScore(round,level);
        round++ ;
        if(highestScore < level-1){
            highestScore = level-1 ;
        }
        score.innerHTML = `Your score : ${level-1} <br> Highest score : ${highestScore}`;
        body.style.backgroundColor = 'red' ;
        setTimeout(function(){
            body.style.backgroundColor = 'rgb(225, 170, 97)' ;
        }, 1000)
        reset() ;
    }
}

function reset () {
    progress.innerHTML = '';
    gameSeq = [] ;
    userSeq = [] ;
    level = 0 ;
    
    allBtns[0].style.backgroundColor = "rgb(209, 109, 109)";
    allBtns[1].style.backgroundColor = "rgb(18, 99, 164)";
    allBtns[2].style.backgroundColor = "rgb(85, 201, 91)" ;
    allBtns[3].style.backgroundColor = "rgb(201, 69, 32)" ;
    
}

scoreCardBtn.addEventListener('click', function(){
    scoreCardBtn.innerText = 'Hide Score Card';
    if(scoreDisplay === 'none'){
        scoreCardBtn.innerText = 'Hide Score Card';
        scoreCard.style.display = "block";
        scoreDisplay = 'block' ;
        scoreCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }else {
        scoreCardBtn.innerText = 'Show Score Card';
        scoreCard.style.display = "none";
        scoreDisplay = 'none' ;
    }   
})

function addScore (round, level){
    initScore.remove();
    let tr = document.createElement('tr');
    scoreCard.appendChild(tr);
    tr.innerHTML = `<th>${round}</th> <th>${level-1}</th>` ;
    tr.style.border = " 1px solid black" ;
    tr.style.width = "20vh" ;
}

function displaySc() {
    if(helpDisplay === 'none'){
        helpBox.style.display = "block" ;
        helpDisplay = 'block';
        helpBtn.innerText = 'Hide How to Play';
        rules.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }else{
        helpBox.style.display = "none"
        helpDisplay = 'none';
        helpBtn.innerText = 'Show How to Play';
    }
}
helpBtn.addEventListener('click', displaySc);
