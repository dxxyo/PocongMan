
// SETTINGS

const pocong_img = document.getElementById('pocong-img')
const manusia_img = document.getElementById('human')

let pocong_src = 1
let manusia_src = 1

sessionStorage.setItem('pocongimg', pocong_src) 
sessionStorage.setItem('humanimg', manusia_src) 


function pocongback(){
    if(pocong_src > 1){
        pocong_src--
    } else {
        pocong_src = 3
    }
    sessionStorage.setItem('pocongimg', pocong_src) 
    pocong_img.src =  "./assets/pocong/" + sessionStorage.getItem('pocongimg') + ".gif"
}

function pocongnext(){
    if(pocong_src < 4){
        pocong_src++
    } else {
        pocong_src = 1
    }
    sessionStorage.setItem('pocongimg', pocong_src) 
    pocong_img.src =  "./assets/pocong/" + sessionStorage.getItem('pocongimg') + ".gif"
}

function humanBack(){
    if(manusia_src > 1){
        manusia_src--
    } else {
        manusia_src = 3
    }
    sessionStorage.setItem('humanimg', manusia_src) 
    manusia_img.src = "./assets/manusia/" + sessionStorage.getItem('humanimg') + ".gif"
}

function humanNext(){
    if(manusia_src < 3){
        manusia_src++
    } else {
        manusia_src = 1
    }
    sessionStorage.setItem('humanimg', manusia_src) 
    manusia_img.src = "./assets/manusia/" + sessionStorage.getItem('humanimg') + ".gif"
}


