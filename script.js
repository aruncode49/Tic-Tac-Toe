let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let winContainer = document.querySelector(".winner-container");
let winMsg = document.querySelector(".winner-msg");
let newGameBtn = document.querySelector(".new-game-btn");

let turnX = true;
let countClick = 0;

let winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// disable boxes
function disableBoxes() {
  for (let box of boxes) {
    box.disabled = true;
  }
}

// enable boxes
function enableBoxes() {
  for (let box of boxes) {
    box.innerHTML = "";
    box.disabled = false;
  }
}

// show winner
function showWinner(winner) {
  winMsg.innerHTML = `Player ${winner} Won 🎉`;
  winContainer.classList.remove("hidden");
  disableBoxes();
}

// check draw match
function showDrawMsg() {
    winContainer.classList.remove("hidden");
    winMsg.innerHTML = "Game Draw 🙂";
    disableBoxes();
}

// check winner
function checkWinner() {
  for (let winPat of winPattern) {
    const pos1Val = boxes[winPat[0]].innerHTML;
    const pos2Val = boxes[winPat[1]].innerHTML;
    const pos3Val = boxes[winPat[2]].innerHTML;

    if (pos1Val !== "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
}

// new game
function newGame() {
  winContainer.classList.add("hidden");
  countClick = 0;
  enableBoxes();
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    countClick++;
    if (turnX) {
      box.innerHTML = "X";
      box.style.color = "#F5A7AC";
      turnX = false;
    } else {
      box.innerHTML = "O";
      box.style.color = "#97F580";
      turnX = true;
    }
    box.disabled = true;
    let isWinner = checkWinner();

    if (countClick === 9 && !isWinner) showDrawMsg();
  });
});

// new game functionality
newGameBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", newGame);
