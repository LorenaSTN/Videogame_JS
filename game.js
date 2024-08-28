const canvas = document.querySelector("#game");
const context = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const livesContainer = document.querySelector("#lives");
const timeContainer = document.querySelector("#time");

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

const bonePosition = {
  x: undefined,
  y: undefined,
};

let grassPositions = [];

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;

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

function movePlayer() {
  const boneCollisionX =
    playerPosition.x.toFixed(3) == bonePosition.x.toFixed(3);
  const boneCollisionY =
    playerPosition.y.toFixed(3) == bonePosition.y.toFixed(3);
  const boneCollision = boneCollisionX && boneCollisionY;

  if (boneCollision) {
    levelWin();
  }

  const grassCollision = grassPositions.find((grass) => {
    const grassCollisionX = grass.x.toFixed(3) == playerPosition.x.toFixed(3);
    const grassCollisionY = grass.y.toFixed(3) == playerPosition.y.toFixed(3);
    return grassCollisionX && grassCollisionY;
  });

  if (grassCollision) {
    looseLevel();
  }

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
}

function showLives() {
  const heartsArray = Array(lives).fill(emojis["HEART"]);

  livesContainer.innerHTML = "";
  heartsArray.forEach((heart) => (livesContainer.innerHTML += heart));
}

function showTime() {
  timeContainer.innerHTML = Date.now() - timeStart;
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
}
function moveLeft() {
  if (playerPosition.x - elementsSize < elementsSize) {
  } else {
    playerPosition.x -= elementsSize;
    startGame();
  }
}
function moveRight() {
  if (playerPosition.x + elementsSize > canvasSize) {
  } else {
    playerPosition.x += elementsSize;
    startGame();
  }
}
function moveDown() {
  if (playerPosition.y + elementsSize > canvasSize) {
  } else {
    playerPosition.y += elementsSize;
    startGame();
  }
}
