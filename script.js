const human = document.getElementById('human');
const playerScore = document.getElementById('score');
const deathSound = document.getElementById("death-sound");


let score = 0;
let canTriggerEvent = true;

human.addEventListener('mouseover', () => {
  if (canTriggerEvent) {
    canTriggerEvent = false;

    human.style.top = '-250px'; // loncatin si mobilnya sebanyak 30 0px

    setTimeout(() => {
      human.style.top = '0px'; //jatuhin lagi mobilnya ke tempat semula
    }, 1000);
    setTimeout(() => {
        canTriggerEvent = true; // bolehin si eventnya buat ke trigger lagi setelah dijeda 1 detik
    }, 1000);
  }
});

const ghost = document.getElementById('ghost')




let hasExecuted = false;

function checkCollision() {
    const humanRect = human.getBoundingClientRect();
    const ghostRect = ghost.getBoundingClientRect();
    console.log(humanRect.left, ghostRect.right)
  
    if (humanRect.right - 50 > ghostRect.left + 10 && humanRect.bottom > ghostRect.top && humanRect.left + 50 <  ghostRect.right - 10 && !hasExecuted) 
    {
          // Create an overlay element
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        overlay.style.backdropFilter = "blur(10px)";
        overlay.style.zIndex = "2";

        // Append the overlay to the body
        document.body.appendChild(overlay);

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
          deathSound.currentTime = 0; // Rewind the audio to the beginning
          deathSound.play()

          hasExecuted = true;
    }   
  }


setInterval(() => {
    score++
    playerScore.innerHTML = `Score : ${score} `;
    checkCollision();
}, 100)
