let count = 0;
let incrementClicks = 0;
let decrementClicks = 0;

function updateDisplay() {
  document.getElementById('count').innerText = count;
  document.getElementById('incCount').innerText = incrementClicks;
  document.getElementById('decCount').innerText = decrementClicks;
}

function increment() {
  count++;
  incrementClicks++;
  updateDisplay();
}

function decrement() {
  if (count > 0) {
    count--;
    decrementClicks++;
    updateDisplay();
  }
}
