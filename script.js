// floris 
let gieter_x;
let gieter_y;

const dragImage = document.getElementById('dragImage');
let isDragging = false;

let offsetX, offsetY;
const originalX = 1075;
const originalY = 400;

dragImage.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', update);
document.addEventListener('mouseup', stopDrag);
document.addEventListener('load', stopDrag);

function startDrag(event){
  isDragging = true;
  offsetX = event.clientX - dragImage.getBoundingClientRect().left;
  offsetY = event.clientY - dragImage.getBoundingClientRect().top;
}

function stopDrag(event){
  isDragging = false;
  dragImage.style.left = `${originalX}px`;
  dragImage.style.top = `${originalY}px`;
}

function update(event) {
  console.log("muis beweegt");
  event.preventDefault();
  let x = event.clientX - offsetX;
    let y = event.clientY - offsetY;
    // Als aan het slepen
    if(isDragging == true){
        // Verplaats het afbeeldingselement naar de muispositie
        console.log("muis sleept");
        dragImage.style.left = `${x}px`;
        dragImage.style.top = `${y}px`;
    }}


//planten laten groeien. 

// constante om alle planten te mee te nemen in functie
const plantImages = document.querySelectorAll('.plant');

plantImages.forEach(plant => {
// hier dan over de individuele planten als je er op clickt
  plant.addEventListener('click', () => {
    // url in variable 
    let currentSrc = plant.src;

    let currentStage = parseInt(currentSrc.slice(-5, -4)); // groeistadia plant uit url van plaatje opnemen
    let nextStage = currentStage + 1; // stage plant ophogen bij een 

    if (nextStage > 5 ) { // want plant is dan uitgegroeid want ik heb maar 5 plaatjes
      nextStage = 1; // reset plant
      score += 10; // tien punten als je plant is volgroeid
      updateScore(); 
    }
    plant.src = currentSrc.slice(0, -5) + nextStage + ".png"; // dit heb ik niet zelf bedacht maar omdat ik dus alle plaatjes op een bepaalde manier heb genummerd kan hij op deze manier het nummer van de url met een ophogen en dan gaat hij dus vanzelf naar de volgende stage
    console.log("halloo");
  });
});

  function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`; // zorgt ervoor dat de cijfers veranderen bovenaan scherm
}
  let score = 0; // ja nulwaarde van de score

/// vanaf hier over de rups
function showRups() {
  const rups = document.getElementById('rups');
  rups.style.display = 'block'; 

  // dit heeft chat gpt voor me bedacht, ik vroeg ' hoe kan ik de waarde van de rups zijn locatie randomize. en dwat hij 
  const maxWidth = window.innerWidth - rups.clientWidth; // Maximale breedte voor links
  const randomLeft = Math.floor(Math.random() * maxWidth);
  rups.style.left = `${randomLeft}px`;

//code pen: https://codepen.io/nishanc/pen/NWWPdZE
  function showCustomAlert() {
    const customAlert = document.getElementById('customAlert');
    customAlert.style.display = 'block';
  
// dit zorgt ervoor dat je na 3 seconde weer opnieuw begint
    setTimeout(() => {
      customAlert.style.display = 'none';
      window.location.reload();
    }, 2000);
  }
  
// als de rups nog steeds er is na een seconde ga je dood
  setTimeout(() => {
    if (rups.style.display === 'block') {
      showCustomAlert();
      console.log("checkcheck");
    }
  }, 2000);
  
// om de rups te verslaan twee keer klikken en dan krijg je ook weer 10 punten als hij weg is
  rups.addEventListener('dblclick', () => {
    rups.style.display = 'none';
    score += 10; 
    updateScore(); 
  });
}

// Adjust the updateScore function to show 'rups' when the score reaches 50
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
  if(score >= 50 && score % 50 === 0 && !rupsDisplayed) {
    showRups(); 
  }
}
// Additional variable to keep track if the 'rups' image is displayed
let rupsDisplayed = false;

// game over situatie


