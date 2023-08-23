const human = document.getElementById('human') 
const playerScore = document.getElementById('score') 
const deathSound = document.getElementById("death-sound") 
const jumpSound = document.getElementById("jump-sound") 
const landSound = document.getElementById("land-sound") 


let score = 0 
let canTriggerEvent = true 

human.addEventListener('mouseover', () => {
  if (canTriggerEvent) {
    canTriggerEvent = false 

    human.style.top = '-250px'  // loncatin si mobilnya sebanyak 30 0px
    jumpSound.currentTime = 0  // Rewind the audio to the beginning

    jumpSound.play()

    setTimeout(() => {
      human.style.top = '0px'  //jatuhin lagi mobilnya ke tempat semula
      landSound.currentTime = 0  // Rewind the audio to the beginning
      landSound.play()
    }, 1000) 
    setTimeout(() => {
        canTriggerEvent = true  // bolehin si eventnya buat ke trigger lagi setelah dijeda 1 detik
    }, 1000) 
  }
}) 

const roadBackground = document.getElementById('road-background')
const roadBackground2 = document.getElementById('road-background-2')
const ghost = document.getElementById('ghost')
const bat = document.getElementById('bat')
const blood = document.querySelector('.blood')





let hasExecuted = false 

function checkCollision() {
    const humanRect = human.getBoundingClientRect() 
    const ghostRect = ghost.getBoundingClientRect() 

    if (score == 100){
      stopAnimation()
      Swal.fire({
        title: 'Kamu menang!',
        text: 'Kamu menang dengan skor ' + score,
      }).then((result) => {
        if(result.isConfirmed){
            window.location.reload()
        }
      })
    }
  
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

        document.body.appendChild(overlay) 
        
        stopAnimation()
        const explosionX = humanRect.left + (humanRect.width / 2) - 100  // ukuran ledakan
        const explosionY = humanRect.top + (humanRect.height / 2) - 100 
        explode(explosionX, explosionY) 
        playerScore.style.display = "none"

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

          hasExecuted = true 
    }   
  }

  function stopAnimation(){
    roadBackground.style.animationPlayState = 'paused' 
    roadBackground2.style.animationPlayState = 'paused' 
    ghost.style.animationPlayState = 'paused' 
    bat.style.animationPlayState = 'paused' 
    playerScore.style.display = "none"
  }


  function explode(x, y) {
    blood.style.left = `${x}px` 
    blood.style.top = `${y}px` 
    blood.style.display = 'block' 
  }
  

setInterval(() => {
    score++
    playerScore.innerHTML = `Score : ${score} ` 
    checkCollision() 
}, 100)



