// javascript plant vs rups v2



//cursor

// https://www.youtube.com/watch?v=5Ox6NisURis  gaat over hoe je cursor naar een plaatje kan veranderen
document.querySelectorAll('.plant').forEach(plant => {
  plant.addEventListener('mouseenter', () => {
    document.body.style.cursor = "url('images/gieter2.png'), auto";
  });
  plant.addEventListener('mouseleave', () => {
    document.body.style.cursor = "default";
  });
});

// muziek, vrij normaal // 
const audioButton = document.getElementById('audioButton');
const plantenmuziek = document.getElementById('plantenmuziek');


audioButton.addEventListener('click', () => {
  if (plantenmuziek.paused) {

    plantenmuziek.play();
    audioButton.textContent = ' pauze '; 
  } 
  
  else {
    plantenmuziek.pause();
    audioButton.textContent = 'play '; 
  }
});


//planten laten groeien, hier met floris naar gekeken
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
// plaatjes genummerd zorgt ervoor dat url ophogen zorgt voor plant naar volgende stage

    plant.src = currentSrc.slice(0, -5) + nextStage + ".png"; 
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

  // dit gaat over rups willekeurig plaatsen --> chat; 'how to give element random position' en dan over mijn code
  const maxWidth = window.innerWidth - rups.clientWidth; // Maximale breedte voor links
  const randomLeft = Math.floor(Math.random() * maxWidth);
  rups.style.left = `${randomLeft}px`; //--> chat


// dit gaat over hoe je kan verliezen in het 'spel'
//code pen: https://codepen.io/nishanc/pen/NWWPdZE, over hoe je een alert kan aanpassen naar een plaatje
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

// hij moet niet blijven
let rupsDisplayed = false;

// niet heel raar, score blokje alleen de nummers veranderen, en dat dus de rups komt bij elke tafel van 50
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
  if(score >= 50 && score % 50 === 0 && !rupsDisplayed) {
    showRups(); 
  }
}

