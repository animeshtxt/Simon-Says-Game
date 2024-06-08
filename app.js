let gameSeq = [];
let userSeq = [];
let btns = ["button-one", "button-two", "button-three", "button-four"];
let h2 = document.querySelector('h2');
let progress = document.querySelector('h3');
let score = document.querySelector("#score");
let level = 0 , round = 1 , currLvl = 1 , highestScore = 0;
let start = document.querySelector('#start-btn');
let body = document.querySelector('body');
let scoreCard = document.querySelector('#score-card');
let scoreTable = document.querySelector('#score-table');
let scoreDisplay = 'none';
let help = document.querySelector("#help-btn");
let helpBox = document.querySelector('.help');
let helpDisplay = 'none';

start.addEventListener('click', function() {

    start.style.backgroundColor = 'rgb(255, 106, 0)' ;
    setTimeout(() => {
        start.style.backgroundColor = 'chocolate' ;
    }, 200);
    reset();
    
    body.style.backgroundColor = "burlywood" ;
        setTimeout(() => {
            levelUp();
        }, 700);
        start.innerText = "RESTART" ;
    
    
})

function levelUp () {
    for( bton of allBtns){
        bton.addEventListener('click', btnPress)
    }
    progress.innerHTML = `Correct guess : 0 &nbsp;&nbsp;&nbsp;&nbsp; Remaining : ${gameSeq.length+1}`;
    userSeq = [];
    level++ ;
    currLvl = 1 ;
    h2.innerHTML = `Round : ${round} <br> Level : ${level}` ;
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

function userFlash (btn){
    let bgCol = btn.style.backgroundColor ;
    btn.style.backgroundColor = "yellow";
    setTimeout(() => {
        btn.style.backgroundColor = bgCol ;
    }, 200);

}

let allBtns = document.querySelectorAll('.btn');
    for( bton of allBtns){
        bton.addEventListener('click', btnPress)
    }


function btnPress () {
    userFlash(this);
    userSeq.push(this.getAttribute('id'));
    checkAns(userSeq.length-1);
}

function checkAns(idx) {
    
    if(userSeq[idx] === gameSeq[idx]){
        progress.innerHTML = `Correct guess : ${idx+1} &nbsp;&nbsp;&nbsp;&nbsp; Remaining : ${gameSeq.length-idx-1}`;
        if(userSeq.length == gameSeq.length){
            
            for( bton of allBtns){
                bton.removeEventListener('click', btnPress)
            }
            
            setTimeout(() => {
                levelUp();
            }, 500);
        }
        
    } else {
        h2.innerHTML =  'Game over ! <br> Click on RESTART to start again' ;
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
            body.style.backgroundColor = 'burlywood' ;
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
    allBtns[1].style.backgroundColor = "rgb(14, 122, 211)";
    allBtns[2].style.backgroundColor = "rgb(85, 201, 91)" ;
    allBtns[3].style.backgroundColor = "rgb(129, 48, 241)" ;
    
}

scoreCard.addEventListener('click', function(){
    scoreCard.innerText = 'Hide Score Card';
    if(scoreDisplay === 'none'){
        scoreCard.innerText = 'Hide Score Card';
        scoreTable.style.display = "block";
        scoreDisplay = 'block' ;
    }else {
        scoreCard.innerText = 'Show Score Card';
        scoreTable.style.display = "none";
        scoreDisplay = 'none' ;
    }   
})

function addScore (round, level){
    let tr = document.createElement('tr');
    scoreTable.appendChild(tr);
    tr.innerHTML = `<th>${round}</th> <th>${level-1}</th>` ;
    tr.style.border = " 1px solid black" ;
    tr.style.width = "20vh" ;
}

help.addEventListener('click', function() {
    if(helpDisplay === 'none'){
        helpBox.style.display = "block" ;
        helpDisplay = 'block';
        help.innerText = 'Hide How to Play';
    }else{
        helpBox.style.display = "none"
        helpDisplay = 'none';
        help.innerText = 'Show How to Play';
    }
    
})