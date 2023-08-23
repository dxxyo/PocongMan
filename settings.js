
// SETTINGS

const pocong_img = document.getElementById('pocong-img')
const manusia_img = document.getElementById('human')

let pocong_src = 1
let manusia_src = 1



function pocongback(){
    if(pocong_src > 1){
        pocong_src--
    } else {
        pocong_src = 3
    }
    console.log(pocong_src)
    sessionStorage.setItem('pocongimg', "./assets/pocong/" + pocong_src + ".gif") 
    pocong_img.src = sessionStorage.getItem('pocongimg')
}

function pocongnext(){
    if(pocong_src < 4){
        pocong_src++
    } else {
        pocong_src = 1
    }
    sessionStorage.setItem('pocongimg', "./assets/pocong/" + pocong_src + ".gif") 
    pocong_img.src = sessionStorage.getItem('pocongimg') 
}

function humanBack(){
    if(manusia_src > 1){
        manusia_src--
    } else {
        manusia_src = 3
    }
    sessionStorage.setItem('humanimg', "./assets/manusia/" + manusia_src + ".gif") 
    manusia_img.src = sessionStorage.getItem('humanimg')
}

function humanNext(){
    if(manusia_src < 3){
        manusia_src++
    } else {
        manusia_src = 1
    }
    sessionStorage.setItem('humanimg', "./assets/manusia/" + manusia_src + ".gif") 
    manusia_img.src = sessionStorage.getItem('humanimg')
}


