

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
  

document.querySelector('.start-btn').addEventListener('click', () => {
  document.getElementById('screen1').classList.remove('active');
  document.getElementById('screen2').classList.add('active');
});



const img3 = document.querySelector('.img3');
const img4 = document.querySelector('.img4');
const img5 = document.querySelector('.img5');
const img6 = document.querySelector('.img6');
const img7 = document.querySelector('.img7');
const screen3Header = document.querySelector('#screen2 .header-bar h1');
const fountainSound = document.getElementById('fountainSound');
const stopwatch = document.getElementById('stopwatch');

let valveOpen = false; // Track if valve is open
let stopwatchCompleted = false; 
let stopwatchInterval;

const screen2Header = document.querySelector('#screen2 .header-bar h1');

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

// checking for further experiment
// Base header messages (other than Step 2 which changes per cycle)
const otherHeaders = [
  "Now click on the valve so that water comes out from the nozzle.",
  "Open valve slowly to adjust the weight pan. Observe the experiment for 30 sec.",
  "30 seconds completed. Click the valve to stop the flow.",
  "Click on the collect button to collect water in measuring tank.",
  "Calculate the area of the water collected in the tank."
];

let currentCycle = 0; // Track which repetition we are in
let firstRun = true;  // Step 1 runs only first time

// --- Step 1: img3 click (first run only) ---
img3.addEventListener('click', () => {
  if (!firstRun) return; // Prevent running in later cycles

  img3.classList.remove('animate');
  void img3.offsetWidth; 
  img3.classList.add('animate');

  screen2Header.textContent = `Add ${50 * (currentCycle + 1)}gms weight on the weight pan.`; // 50g for first run
  firstRun = false; // Disable for future runs
});

// --- Step 2: img5 click ---
img5.addEventListener('click', () => {
  img3.classList.remove('upleft');
  void img5.offsetWidth;
  img5.classList.add('upleft');

  img3.style.transform = 'translateY(15%)';

  // Step 2 header: weight increases by +50g each cycle
  screen2Header.textContent = `Add ${50 * (currentCycle + 1)}gms weight on the weight pan.`;

  // Immediately after showing weight header, move to next step
  setTimeout(() => {
    screen2Header.textContent = otherHeaders[0]; // "Now click on the valve..."
  }, 1000);
});

// --- Step 3: Valve open ---
img4.addEventListener('click', () => {
  if (!valveOpen) {
    valveOpen = true;
    img4.style.transform = 'rotateZ(-15deg)';
    img6.classList.add('active');
    img3.style.transform = 'translateY(-0.5%)';
    fountainSound.play();
    screen2Header.textContent = otherHeaders[1]; // "Open valve slowly..."
    // img7.classList.add('active');
    img7.classList.remove('hide', 'active');
    void img7.offsetWidth; // Force reflow
    img7.classList.add('active');

    // Show collect button after 30s
    setTimeout(() => {
      const collectBtn = document.getElementById('collectBtn');
      collectBtn.classList.remove('hidden');
      collectBtn.classList.add('show');
    }, 30000);

    // Stopwatch logic
    setTimeout(() => {
      let seconds = 0;
      stopwatch.style.display = 'block';
      stopwatchInterval = setInterval(() => {
        seconds++;
        const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        stopwatch.textContent = `${minutes}:${secs}`;

        if (seconds >= 30) {
          clearInterval(stopwatchInterval);
          stopwatchCompleted = true;
          screen2Header.textContent = otherHeaders[2]; // "30 seconds completed..."
        }
      }, 1000);
    }, 1000);

  } else if (valveOpen && stopwatchCompleted) {
    img4.style.transform = 'rotateZ(0deg)';
    img6.classList.remove('active');
    fountainSound.pause();
    fountainSound.currentTime = 0;
    screen2Header.textContent = otherHeaders[3]; // "Click on the collect button..."
    valveOpen = false;
    stopwatchCompleted = false;
  }
});

// --- Step 4: Collect button click ---
document.getElementById('collectBtn').addEventListener('click', () => {
  img7.classList.remove('active');
  img7.classList.add('hide');
  img8.classList.add('up');

  const collectBtn = document.getElementById('collectBtn');
  collectBtn.classList.remove('show');
  collectBtn.classList.add('hidden');

  screen2Header.textContent = otherHeaders[4]; // "Calculate the area..."

  // Prepare for next cycle
  currentCycle++;
  if (currentCycle < 10) {
    setTimeout(resetForNextCycle, 2000);
  } else {
    screen2Header.textContent = "Experiment completed.";
  }
});

// --- Reset for next cycle ---
function resetForNextCycle() {
  img8.classList.remove('up');
  img3.classList.remove('animate');
  img5.classList.remove('upleft');
  // img7.classList.remove('hide');
  // img7.style.height = '0%';
  // img7.style.opacity = '0';
  img7.classList.remove('hide', 'active'); // Remove both states
  img7.style.height = '0%';
  img7.style.opacity = '0';

  // Skip Step 1 for next cycles → start at Step 2 header
  screen2Header.textContent = `Add ${50 * (currentCycle + 1)}gms weight on the weight pan.`;
}
}

















