const canvas = document.querySelector(".game");
const context = canvas.getContext("2d");
const btnUp = document.querySelector(".up");
const btnLeft = document.querySelector(".left");
const btnRight = document.querySelector(".right");
const btnDown = document.querySelector(".down");
const livesContainer = document.querySelector(".lives");
const timeContainer = document.querySelector(".time");
const recordContainer = document.querySelector(".record");
const resultContainer = document.querySelector(".result");
const restartButton = document.querySelector(".restart");

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
  x: undefined,
  y: undefined,
};

let playerPositionProportional = {
  x: undefined,
  y: undefined,
};

const bonePosition = {
  x: undefined,
  y: undefined,
};

const EPSILON = 0.1;

function arePositionsEqual(pos1, pos2) {
  return Math.abs(pos1 - pos2) < EPSILON;
}

let grassPositions = [];

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.75;
  } else {
    canvasSize = window.innerHeight * 0.75;
  }

  canvasSize = Math.floor(canvasSize / 10) * 10;

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;

  if (
    playerPositionProportional.x !== undefined &&
    playerPositionProportional.y !== undefined
  ) {
    playerPosition.x = playerPositionProportional.x * canvasSize;
    playerPosition.y = playerPositionProportional.y * canvasSize;
  }

  startGame();
}

function startGame() {
  context.font = elementsSize + "px Verdana";
  context.textAlign = "end";

  const map = maps[level];

  if (!map) {
    winGame();
    return;
  }

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
    showRecord();
  }
  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));

  showLives();

  grassPositions = [];
  context.clearRect(0, 0, canvasSize, canvasSize);

  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      if (col == "O") {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
        }
      } else if (col == "I") {
        bonePosition.x = posX;
        bonePosition.y = posY;
      } else if (col == "X") {
        grassPositions.push({
          x: posX,
          y: posY,
        });
      }

      context.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
}

function restartGame() {
  location.reload();
}

restartButton.addEventListener("click", restartGame);

function movePlayer() {
  const boneCollisionX = arePositionsEqual(playerPosition.x, bonePosition.x);
  const boneCollisionY = arePositionsEqual(playerPosition.y, bonePosition.y);
  const boneCollision = boneCollisionX && boneCollisionY;

  if (boneCollision) {
    levelWin();
  }

  const grassCollision = grassPositions.find((grass) => {
    const grassCollisionX = arePositionsEqual(grass.x, playerPosition.x);
    const grassCollisionY = arePositionsEqual(grass.y, playerPosition.y);
    return grassCollisionX && grassCollisionY;
  });

  if (grassCollision) {
    collisionGrass();
    setTimeout(looseLevel, 200);
    return;
  }

  playerPositionProportional.x = playerPosition.x / canvasSize;
  playerPositionProportional.y = playerPosition.y / canvasSize;

  context.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

function levelWin() {
  level++;
  startGame();
}

function looseLevel() {
  lives--;

  if (lives <= 0) {
    level = 0;
    lives = 3;
    timeStart = undefined;
  }

  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function winGame() {
  clearInterval(timeInterval);

  const timeRecord = localStorage.getItem("recordTime");
  const playerTime = Date.now() - timeStart;

  const secs = Math.floor((playerTime / 1000) % 60);
  const mins = Math.floor((playerTime / (1000 * 60)) % 60);

  const changedSeconds = String(secs).padStart(2, "0");
  const changedMinutes = String(mins).padStart(2, "0");

  const playerGoodTime = `${changedMinutes}:${changedSeconds}`;

  const timeRecordNumber = Number(timeRecord);

  if (timeRecordNumber) {
    if (playerTime <= timeRecordNumber) {
      localStorage.setItem("recordTime", playerTime);
      resultContainer.innerHTML = `¡New Record! Time: ${playerGoodTime}`;
    } else {
      resultContainer.innerHTML = `Sorry, you haven't broken your record ${formatTime(
        timeRecordNumber
      )}`;
    }
  } else {
    localStorage.setItem("recordTime", playerTime);
    resultContainer.innerHTML = `First record: ${playerGoodTime}`;
  }
}

function formatTime(time) {
  const secs = Math.floor((time / 1000) % 60);
  const mins = Math.floor((time / (1000 * 60)) % 60);

  const changedSeconds = String(secs).padStart(2, "0");
  const changedMinutes = String(mins).padStart(2, "0");

  return `${changedMinutes}:${changedSeconds}`;
}

function showLives() {
  const heartsArray = Array(lives).fill(emojis["HEART"]);

  livesContainer.innerHTML = "";
  heartsArray.forEach(
    (heart) => (livesContainer.innerHTML += " " + heart + " ")
  );
}

function showTime() {
  const elapsedTime = Date.now() - timeStart;

  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);

  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  timeContainer.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
}

function showRecord() {
  const recordTime = localStorage.getItem("recordTime");

  if (recordTime) {
    recordContainer.innerHTML = `${formatTime(Number(recordTime))}`;
  } else {
    recordContainer.innerHTML = "No hay récord registrado";
  }
}

function collisionGrass() {
  context.fillText(emojis["COLLISION"], playerPosition.x, playerPosition.y);
}

window.addEventListener("keydown", moveByKeys);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

function moveByKeys(event) {
  if (event.key == "ArrowUp") moveUp();
  else if (event.key == "ArrowLeft") moveLeft();
  else if (event.key == "ArrowRight") moveRight();
  else if (event.key == "ArrowDown") moveDown();
}
function moveUp() {
  if (playerPosition.y - elementsSize < elementsSize) {
  } else {
    playerPosition.y -= elementsSize;
    startGame();
  }
  playerPositionProportional.y = playerPosition.y / canvasSize;
}

function moveLeft() {
  if (playerPosition.x - elementsSize < elementsSize) {
  } else {
    playerPosition.x -= elementsSize;
    startGame();
  }
  playerPositionProportional.x = playerPosition.x / canvasSize;
}

function moveRight() {
  if (playerPosition.x + elementsSize > canvasSize) {
  } else {
    playerPosition.x += elementsSize;
    startGame();
  }
  playerPositionProportional.x = playerPosition.x / canvasSize;
}

function moveDown() {
  if (playerPosition.y + elementsSize > canvasSize) {
  } else {
    playerPosition.y += elementsSize;
    startGame();
  }
  playerPositionProportional.y = playerPosition.y / canvasSize;
}
