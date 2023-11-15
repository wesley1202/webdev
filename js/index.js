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