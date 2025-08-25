
// to open the screw
const screw1 = document.getElementById("img6");
const screw2 = document.getElementById("img7");

let isScrew1Up = false;
let isScrew2Up = false;

const originalBottom1 = 67; 
const originalBottom2 = 68; 

screw1.addEventListener("click", () => {
  if (!isScrew1Up) {
    screw1.style.bottom = (originalBottom1 + 3) + "%";
  } else {
    screw1.style.bottom = originalBottom1 + "%";
  }
  isScrew1Up = !isScrew1Up;

  checkScrews();  
  checkScrewsDown();


});

screw2.addEventListener("click", () => {
  if (!isScrew2Up) {
    screw2.style.bottom = (originalBottom2 + 3) + "%";
  } else {
    screw2.style.bottom = originalBottom2 + "%";
  }
  isScrew2Up = !isScrew2Up;


  checkScrews(); 
  checkScrewsDown();



});


function checkScrews() {
  if (step === 1 && isScrew1Up && isScrew2Up) {
    step++;
    updateInstruction(" Now click on the upper plate to move it on to the table.");
  }
}



function checkScrewsDown() {
  if (step === 5 && !isScrew1Up && !isScrew2Up) {
    step++;
    updateInstruction(" Now click on the Start button to start the experiment.");
  }
}
  

// upper part movement

const img3 = document.getElementById("img3"); 
const img5 = document.getElementById("img5"); 
let isMovedTogether = false;

img3.addEventListener("click", () => {
  if (!isMovedTogether) {
    img3.style.transform = "translate(300px, 100px)";
    img5.style.transform = "translate(300px, 100px)";


   
    if (step === 2) {
      step++;
      updateInstruction(" Observe all the equipment and take starting reading.");
      setTimeout(() => {
        step++;
        updateInstruction(" Now again click on plate to move it back to its original position.");
      }, 4000);
    }
  






  } else {
    img3.style.transform = "translate(0px, 0px)";
    img5.style.transform = "translate(0px, 0px)";


    
    if (step === 4) {
      step++;
      updateInstruction(" Now click on the knurled nuts to fix it with plate.");
    }




  }
  isMovedTogether = !isMovedTogether;
});
img5.addEventListener("click", () => img3.click());


// fountain
const fountainSound = document.getElementById("fountainSound");

const fountain = document.getElementById("fountain");
const startBtn = document.getElementById("startFountain");
let isRunning = false;

startBtn.addEventListener("click", () => {
  isRunning = !isRunning;
  fountain.classList.toggle("active", isRunning);
  startBtn.textContent = isRunning ? "Stop" : "Start";
  startBtn.style.backgroundColor = isRunning ? " #90EE90" : "";



  
if (step === 6 && isRunning) {
  step++;
  updateInstruction("Place the 50gm weight on spring of plate by clicking on to it.");
}



  if (isRunning) {
    fountainSound.play();
  } else {
    fountainSound.pause();
    fountainSound.currentTime = 0; 

    
  }

  
  
});


// weight movement
const weight = document.getElementById("img4");

let isWeightMoved = false;
const originalLeft4 = 19; 
const originalBottom4 = 16; 

weight.addEventListener("click", () => {
  if (!isWeightMoved) {
    weight.style.left = (originalLeft4 + 21) + "%";  
    weight.style.bottom = (originalBottom4 + 56) + "%"; 
  } else {
    weight.style.left = originalLeft4 + "%";
    weight.style.bottom = originalBottom4 + "%";



   
    if (step === 8) {
      step++;
      updateInstruction(" Take the required reading.");
    }



  }
  isWeightMoved = !isWeightMoved;

 
  if (step === 7 && isWeightMoved) {
    step++;
    updateInstruction("Wait for sometime and then Stop the experiment.");
  }



});





const instruction = document.getElementById("instructionText");
let step = 1;

function updateInstruction(text) {
  instruction.textContent = text;
}



















