const human = document.getElementById('human') 
const playerScore = document.getElementById('score') 
const deathSound = document.getElementById("death-sound") 
const jumpSound = document.getElementById("jump-sound") 
const landSound = document.getElementById("land-sound") 
const roadBackground = document.getElementById('road-background')
const roadBackground2 = document.getElementById('road-background-2')
const ghost = document.getElementById('ghost')
const bat = document.getElementById('bat')
const blood = document.querySelector('.blood')
let score = 0 
let canTriggerEvent = true 
let hasExecuted = false 


var humansrc = sessionStorage.getItem('humanimg');
const manusia_img = document.getElementById('human')
manusia_img.src = "./assets/manusia/" + humansrc + ".gif"

var ghostsrc = sessionStorage.getItem('pocongimg');
const ghost_img = document.getElementById('ghost')
ghost_img.style.backgroundImage = 'url("./assets/pocong/'+ ghostsrc +'.gif")'


human.addEventListener('mouseover', () => {
  if (canTriggerEvent) {
    canTriggerEvent = false
    console.log(humansrc) 
    manusia_img.src = "./assets/manusia/jump/" + humansrc + ".gif"

    human.style.top = '-250px'  // loncatin si mobilnya sebanyak 30 0px
    jumpSound.currentTime = 0  // Rewind the audio to the beginning

    jumpSound.play()

    setTimeout(() => {
      human.style.top = '0px'  //jatuhin lagi mobilnya ke tempat semula
      landSound.currentTime = 0  // Rewind the audio to the beginning
      landSound.play()
      manusia_img.src = "./assets/manusia/" + humansrc + ".gif"
    }, 900) 
    setTimeout(() => {
        canTriggerEvent = true  // bolehin si eventnya buat ke trigger lagi setelah dijeda 1 detik
    }, 1000) 
  }
}) 


// Fungsi check tabrakan
function checkCollision() {
    const humanRect = human.getBoundingClientRect() 
    const ghostRect = ghost.getBoundingClientRect() 

    if (score == 1000 && hasExecuted == false){ // Cek kalau user sudah mencapai batas score untuk menang atau tidak
      stopAnimation()
      Swal.fire({
        title: 'Kamu menang!',
        text: 'Selamat kamu menang dengan skor ' + score,
      }).then((result) => {
        if(result.isConfirmed){
            window.location.reload()
        }
      })
    }


    // check tabrakan
    if (humanRect.right - 50 > ghostRect.left + 10 && humanRect.bottom > ghostRect.top + 50 && humanRect.left + 50 <  ghostRect.right - 10 && !hasExecuted) 
    {
          // red overlay
        const overlay = document.createElement("div") 
        overlay.style.position = "fixed" 
        overlay.style.top = "0" 
        overlay.style.left = "0" 
        overlay.style.width = "100%" 
        overlay.style.height = "100%" 
        overlay.style.backgroundColor = "red" 
        overlay.style.opacity = "40%" 
        overlay.style.zIndex = "2" 

        document.body.appendChild(overlay) // Memberikan overlay merah dibelakang swal
        
        stopAnimation()
        const explosionX = humanRect.left + (humanRect.width / 2) - 100  // ukuran ledakan
        const explosionY = humanRect.top + (humanRect.height / 2) - 100 
        explode(explosionX, explosionY) // trigger gif darah
        playerScore.style.display = "none" // hapus score

        Swal.fire({
            title: 'Kamu mati!',
            text: 'Kamu mati dengan skor ' + score,
            imageUrl: './assets/dead.png',
            imageHeight: 200,
            imageAlt: 'dead',
          }).then((result) => {
            if(result.isConfirmed){
                window.location.reload()
            }
          })
          deathSound.currentTime = 0  // Rewind the audio to the beginning
          deathSound.play()

          hasExecuted = true // membuat swal diatas tidak bisa terbuka lagi
    }   
  }

  // fungsi stop animasi
  function stopAnimation(){
    roadBackground.style.animationPlayState = 'paused' 
    roadBackground2.style.animationPlayState = 'paused' 
    ghost.style.animationPlayState = 'paused' 
    bat.style.animationPlayState = 'paused' 
    playerScore.style.display = "none"
  }


  // fungsi efek darah
  function explode(x, y) {
    blood.style.left = `${x}px` 
    blood.style.top = `${y}px` 
    blood.style.display = 'block' 
  }
  
// cek tabrakan setiap 100ms
setInterval(() => {
    score++
    playerScore.innerHTML = `Score : ${score} ` 
    checkCollision() 
}, 100)



