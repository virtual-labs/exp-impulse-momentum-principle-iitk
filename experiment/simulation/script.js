document.querySelector('.start-btn').addEventListener('click', () => {
   document.getElementById('screen1').classList.remove('active'); 
   document.getElementById('screen2').classList.add('active'); });

// --- Config ---
const MAX_CYCLES = 10;
let cycleIndex = 1;        // 1..MAX_CYCLES
let firstRun = true;
let valveOpen = false;
let stopwatchCompleted = false;
let stopwatchInterval = null;
let collectBtnTimer = null;

// --- Elements ---
const img3 = document.querySelector('.img3');
const img5 = document.querySelector('.img5');
const img4 = document.querySelector('.img4');
const img6 = document.querySelector('.img6');
const img7 = document.querySelector('.img7');
const img8 = document.getElementById('img8');
const fountainSound = document.getElementById('fountainSound');
const stopwatch = document.getElementById('stopwatch');
const screen2Header = document.querySelector('#screen2 .header-bar h1');
const collectBtn = document.getElementById('collectBtn');

// --- Static headers for steps after the "weight" step ---
const otherHeaders = [
  "Now click on the valve so that water comes out from the nozzle.",
  "Open valve slowly to adjust the weight pan. Observe the experiment for 30 sec.",
  "30 seconds completed.Click on the collect button to collect water in measuring tank.",
  "Click on the collect button to collect water in measuring tank.",
  "Calculate the area of the water collected in the tank."
];

// --- Helpers ---
function weightHeaderForCurrentCycle() {
  return `Add ${50 * cycleIndex}gms weight on the weight pan.`;
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  // stopwatch.style.display = 'none';
  stopwatch.textContent = '00:00';
}

// wait for transitionend of a property (with fallback timeout)
function waitForTransitionEnd(el, propName, fallback = 3000) {
  return new Promise(resolve => {
    let resolved = false;
    function onEnd(e) {
      if (e.propertyName === propName) {
        resolved = true;
        el.removeEventListener('transitionend', onEnd);
        resolve();
      }
    }
    el.addEventListener('transitionend', onEnd);
    setTimeout(() => {
      if (!resolved) {
        el.removeEventListener('transitionend', onEnd);
        resolve();
      }
    }, fallback);
  });
}

// ensure img7 is in initial state (height 0, opacity 0) and classes removed
function prepareImg7InitialState() {
  img7.classList.remove('active', 'hide');
  // Use inline styles to force the starting point (then reflow)
  img7.style.height = '0%';
  img7.style.opacity = '0';
  void img7.offsetWidth; // force reflow
}

// --- Step 1: img3 click (only first run) ---
img3.addEventListener('click', () => {
  if (!firstRun) return;
  img3.classList.remove('animate');
  void img3.offsetWidth;
  img3.classList.add('animate');

  // show weight header for cycle 1
  screen2Header.textContent = weightHeaderForCurrentCycle();
  firstRun = false;
});

// --- Step 2: img5 click (shows weight header, then moves on) ---
img5.addEventListener('click', () => {
  img3.classList.remove('upleft');
  void img5.offsetWidth;
  img5.classList.add('upleft');

  // show weight header for current cycle
  screen2Header.textContent = weightHeaderForCurrentCycle();

  // after a short moment, instruct to open valve
  setTimeout(() => {
    screen2Header.textContent = otherHeaders[0]; // "Now click on the valve..."
  }, 700);
});

// --- Step 3: Valve click (open / close) ---
img4.addEventListener('click', () => {
  // Open valve
  if (!valveOpen) {
    valveOpen = true;
    img4.style.transform = 'rotateZ(-15deg)';
    img6.classList.add('active');
    img3.style.transform = 'translateY(-0.5%)';
    fountainSound.play();
    screen2Header.textContent = otherHeaders[1]; // "Open valve slowly..."

    // Prepare img7 to animate freshly
    prepareImg7InitialState();
    // small reflow then activate
    void img7.offsetWidth;
    img7.classList.add('active'); // this triggers the long (30s) rising animation

    // show collect button after 30s
    collectBtnTimer = setTimeout(() => {
      collectBtn.classList.remove('hidden');
      collectBtn.classList.add('show');
    }, 30000);

    // Start stopwatch after 1s
    setTimeout(() => {
      let seconds = 0;
      resetStopwatch();
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

  // Close valve (only allowed after stopwatchCompleted)

  } else if (valveOpen && stopwatchCompleted) {
    img4.style.transform = 'rotateZ(0deg)';
    img6.classList.remove('active');
    fountainSound.pause();
    fountainSound.currentTime = 0;
    screen2Header.textContent = otherHeaders[3]; // "Click on the collect button..."
    valveOpen = false;
    stopwatchCompleted = false;
    // clear any pending collect btn timer (defensive)
    if (collectBtnTimer) {
      clearTimeout(collectBtnTimer);
      collectBtnTimer = null;
    }
  }
});

// --- Step 4: Collect button click ---
// collectBtn.addEventListener('click', async () => {
//   // hide rising water by switching to the 'hide' state (CSS transitions handle this)
//   img7.classList.remove('active');
//   // force reflow then add hide so transitions apply consistently
//   void img7.offsetWidth;
//   img7.classList.add('hide');

//   // hide the collect button
//   collectBtn.classList.remove('show');
//   collectBtn.classList.add('hidden');

//   // Move background slightly as before
//   img8.classList.add('up');

//   // stop & reset stopwatch
//   resetStopwatch();

//   // Wait for the height transition to finish on img7 (height transition is 2s in CSS)
//   await waitForTransitionEnd(img7, 'height', 3500);

//   // Once hide transition finished, prepare next cycle
//   finalizeCycle();
// });



// --- Step 4: Collect button click (NEW – works without closing valve first) ---
collectBtn.addEventListener('click', async () => {
  // === IMMEDIATELY stop everything related to water flow ===
  valveOpen = false;                         // mark as closed internally
  clearInterval(stopwatchInterval);          // stop the timer
  stopwatchInterval = null;
  if (collectBtnTimer) {
    clearTimeout(collectBtnTimer);
    collectBtnTimer = null;
  }

  // Visual + audio feedback
  img4.style.transform = 'rotateZ(0deg)';     // close valve visually
  img6.classList.remove('active');            // hide fountain
  fountainSound.pause();
  fountainSound.currentTime = 0;

  // Hide rising water (smoothly)
  img7.classList.remove('active');
  void img7.offsetWidth;
  img7.classList.add('hide');

  // Hide collect button again
  collectBtn.classList.remove('show');
  collectBtn.classList.add('hidden');

  // Move the little background piece (your existing animation)
  img8.classList.add('up');

  // Hide & reset stopwatch
  stopwatch.classList.remove('visible');
  stopwatch.textContent = '00:00';

  // Wait for the "hide" animation of rising water to finish (2–3 seconds)
  await waitForTransitionEnd(img7, 'height', 3500);

  // Go to next cycle (or finish experiment)
  finalizeCycle();
});






function finalizeCycle() {
  // increment cycle count
  cycleIndex++;

  // If we've hit the max cycles -> finish

  // if (cycleIndex > MAX_CYCLES) {
  //   screen2Header.textContent = "Experiment completed.";
  //   // final cleanup
  //   prepareImg7InitialState();
  //   img8.classList.remove('up');
  //   img3.classList.remove('animate');
  //   img5.classList.remove('upleft');
  //   return;
  // }



if (cycleIndex > MAX_CYCLES) {
  screen2Header.textContent = "Experiment completed.";

  // Show observation table
  document.getElementById("observationTable").style.display = "block";

  // final cleanup
  prepareImg7InitialState();
  img8.classList.remove('up');
  img3.classList.remove('animate');
  img5.classList.remove('upleft');
  return;
}




  // else prepare for next cycle:
  // remove 'up' so background returns; reset classes
  img8.classList.remove('up');
  img3.classList.remove('animate');
  img5.classList.remove('upleft');

  // Remove both active & hide classes and set initial inline style
  prepareImg7InitialState();

  // Update header to the new weight for the NEXT cycle
  screen2Header.textContent = weightHeaderForCurrentCycle();
  // Now the UI waits for the user (img5 click) to continue (Step 2), skipping Step 1
}

// --- Defensive: if user navigates or you want to stop mid-cycle, ensure timers cleared ---
window.addEventListener('beforeunload', () => {
  clearInterval(stopwatchInterval);
  if (collectBtnTimer) clearTimeout(collectBtnTimer);
});










