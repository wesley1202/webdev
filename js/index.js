let show1 = false;
let show2 = false;
let show3 = false;
var skill_ref = document.getElementById("skills");
let skills = ["Javascript","HTML","CSS","Python","ColdFusion","Git","TypeScript","SQL","Java","PHP","C#","Front-End", "Back-End"];
let discarded_skills = [];
let counter = 0;

function showHoverState(){
    if(show1){
        document.getElementById("wysiwyg").classList.remove("clicked");

    } else {
        document.getElementById("wysiwyg").classList.add("clicked");

    }
    show1 = !show1;
}

function showHoverState2(){
    if(show2){
        document.getElementById("design").classList.remove("clicked2");

    } else {
        document.getElementById("design").classList.add("clicked2");

    }
    show2 = !show2;
}

function showHoverState3(){
    if(show3){
        document.getElementById("app_dev").classList.remove("clicked3");

    } else {
        document.getElementById("app_dev").classList.add("clicked3");

    }
    show3 = !show3;
}

// setInterval(function(){
//     getNextSkill();
    
// },5000);

function getRandSkill(){

    if(skills.length == 0){
        skills = discarded_skills;
        discarded_skills = [];
    }

    let random_int = Math.floor(Math.random() * skills.length);
    let chosen_skill = skills[random_int]
    discarded_skills.push(chosen_skill);
    skills.splice(random_int,1);
    skill_ref.innerText = chosen_skill;
}
function getNextSkill(){
   
    if(counter == skills.length-1){
        counter = 0;
    } else {
        counter += 1;
    }
    skill_ref.innerText = skills[counter];

}

function getPrevSkill(){
    if(counter == 0){
        counter = skills.length-1;
    } else {
        counter -=1 ;
    }
    skill_ref.innerText = skills[counter];

}

//code for game

var player = null;

player = document.getElementById("player");
player.style.position = "relative";
player.style.left = "0px";
player.style.top = "0px";
let game_container = player.parentElement;
let right_limit = game_container.offsetWidth;
let game_on = false;
let bottom_limit = game_container.offsetHeight;
portals_on_screen = [];
let score = 0;
let speed = 1500;
function getKeyAndMove(e) {
    var key_code = e.which || e.keyCode;
    if(game_on){
        if(key_code == 37){
            moveLeft();
        }
        if(key_code == 38){
            moveUp();
        }
        if(key_code == 39){
            moveRight();
        }
        if(key_code == 40){
            moveDown();
        }
        let B1 = parseInt(player.style.top) + 15;
        let T1 = parseInt(player.style.top);
        let R1 = parseInt(player.style.left) + 15;
        let L1 = parseInt(player.style.left);

        let B2 = 100;
        let T2 = 100;
        let R2 = 100;
        let L2 = 100;
        let portals = document.getElementsByClassName("portal");
        if(portals.length > 0){
            B2 = parseInt(portals[0].style.top) + 45;
            T2 = parseInt(portals[0].style.top) + 15;
            R2 = parseInt(portals[0].style.left) + 30;
            L2 = parseInt(portals[0].style.left);
        }
        if(B1 >= T2 && T1 <= B2 && L1 <= R2 && R1 >= L2){
            rmvPortal();
            initializePlayers()
            score += 1;
            speed = speed - (speed*.15);
            document.getElementById("score").innerText = `${score}`;
        }
    }
    
}
let movement;
function moveLeft() {
    if((parseInt(player.style.left) - 25) <= 0){
        player.style.left = "0px";
    } else {
        player.style.left = parseInt(player.style.left) - 10 + "px";
    }
}
function buttonLeft(){
    movement = setInterval(function(){
    moveLeft(); 
    },50);
}
function moveUp() {
    if((parseInt(player.style.top) - 25) <= 0){
        player.style.top = "0px";
    } else {
        player.style.top = parseInt(player.style.top) - 10 + "px";
    }
}
function buttonUp(){
    movement = setInterval(function(){
    moveUp(); 
    },50);
}
function clearIntervals(){
    movement = window.clearInterval(movement);
}
function moveRight() {
    if((parseInt(player.style.left) + 25) > right_limit){
        player.style.left = (right_limit - 15) + "px";
    } else {
        player.style.left = parseInt(player.style.left) + 10 + "px";
    }
}
function buttonRight(){
    movement = setInterval(function(){
    moveRight(); 
    },50);
}
function moveDown() {
    if((parseInt(player.style.top) + 25) > bottom_limit){
        player.style.top = (bottom_limit - 15) + "px";
    } else {
        player.style.top = parseInt(player.style.top) + 10 + "px";
    }
}
function buttonDown(){
    movement = setInterval(function(){
    moveDown(); 
    },50);
}
//disable / enable scrolling

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
    game_on = true;
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);

    document.getElementById("start_game").style.display = "none";
    document.getElementById("stop_game").style.display = "inline-block";
    rmvPortal();
    initializePlayers();
}

// call this to Enable
function enableScroll() {
    game_on = false;
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);

    document.getElementById("stop_game").style.display = "none";
    document.getElementById("start_game").style.display = "inline-block";

    
}
let inId;
function runGame(){
    intId = setInterval(function(){
        if(game_on){
            
            formPortal();
        }
        intId = window.clearInterval(intId);
        runGame();
    },speed);
}
runGame();

function getRandX(){
    let random_int = Math.floor(Math.random() * (right_limit-60));
    return random_int;
}

function getRandY(){
    let random_int = Math.floor(Math.random() * (bottom_limit-60));
    return random_int;
}

function rmvPortal(){
    let portals = document.getElementsByClassName("portal");
    if(portals.length > 0){
        portals[0].remove();
    }
}

function formPortal(){
    rmvPortal();
    let x = getRandX();
    let y = getRandY();
    const portal = document.createElement("div");
    portal.classList.add("portal");
    portal.style.top = y + "px";
    portal.style.left = x + "px";
    game_container.appendChild(portal);
}

function initializePlayers(){
    const portal = document.createElement("div");
    
    portal.classList.add("portal");
    portal.style.top = (bottom_limit-30)/2 + "px";
    portal.style.left = (right_limit-30)/2 + "px";
    player.style.top = "0px";
    player.style.left = "0px";
    game_container.appendChild(portal);

}