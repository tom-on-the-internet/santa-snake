const DIMENSIONS = [20, 20];
const cellSize = (innerWidth - innerWidth / 3) / DIMENSIONS[0];
const player = [{ x: 10, y: 10 }];
const house = { x: 10, y: 5 };
let direction = "SOUTH";
const wrapper = document.getElementById("wrapper");
const board = document.getElementById("board");
const score = document.getElementById("score");
let gameStatus = "ready";

function houseAtPosition(x, y) {
  return house.x === x && house.y === y ? "🏠" : false;
}

function playerAtPosition(x, y) {
  const length = player.length;

  for (const [index, segment] of player.entries()) {
    if (segment.x !== x || segment.y !== y) {
      continue;
    }

    if (gameStatus === "over") {
      return "🪦";
    }

    return length === index + 1 ? "🎅" : "🦌";
  }

  return false;
}

function deliveredToHouse() {
  const headOfSleigh = player[0];
  return house.x === headOfSleigh.x && house.y === headOfSleigh.y;
}

function isOutOfBounds() {
  const [width, height] = DIMENSIONS;
  const headOfSleigh = player[0];

  return (
    headOfSleigh.x < 0 ||
    headOfSleigh.x > width - 1 ||
    headOfSleigh.y < 0 ||
    headOfSleigh.y > height - 1
  );
}

function ranIntoSelf() {
  const headOfSleigh = player[0];

  const [, , ...remainderOfSleigh] = player;
  return remainderOfSleigh.some(
    (item) => item.x === headOfSleigh.x && item.y === headOfSleigh.y
  );
}

function lostGame() {
  return isOutOfBounds() || ranIntoSelf();
}

function moveHouse() {
  const [width, height] = DIMENSIONS;
  while (true) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);

    if (!playerAtPosition(x, y)) {
      house.x = x;
      house.y = y;
      return;
    }
  }
}

function addReindeer() {
  const santa = player[player.length - 1];
  player.push({ x: santa.x + 1, y: santa.y });
}

function drawBoard() {
  const [width, height] = DIMENSIONS;
  board.innerHTML = "";

  [...Array(height)].forEach((_, rowIndex) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    [...Array(width)].forEach((_, colIndex) => {
      const div = document.createElement("div");
      div.style.width = `${cellSize}px`;
      div.style.height = `${cellSize}px`;
      div.classList.add("cell");
      const house = houseAtPosition(colIndex, rowIndex);
      const player = playerAtPosition(colIndex, rowIndex);

      if (player) {
        div.innerHTML = player;
      } else if (house) {
        div.innerHTML = house;
      }

      rowDiv.append(div);
    });

    board.append(rowDiv);
  });
}

function drawScore() {
  let scoreMessage = "SCORE: ";
  scoreMessage += player.length - 1;
  if (gameStatus === "over") {
    scoreMessage += " GAME OVER!";
  }

  score.innerHTML = scoreMessage;
}

function takeTurn() {
  const { ...head } = player[0];

  if (direction === "NORTH") {
    head.y--;
  }
  if (direction === "SOUTH") {
    head.y++;
  }
  if (direction === "WEST") {
    head.x--;
  }
  if (direction === "EAST") {
    head.x++;
  }

  player.unshift(head);
  player.pop();
}
function startGame() {
  const gameLoop = setInterval(() => {
    takeTurn();
    if (lostGame()) {
      gameStatus = "over";
      clearInterval(gameLoop);
    } else if (deliveredToHouse()) {
      moveHouse();
      addReindeer();
    }
    drawScore();
    drawBoard();
  }, 100);
}

function setUp() {
  // event listeners
  document.addEventListener("keydown", ({ code }) => {
    if (code === "ArrowUp") {
      direction = "NORTH";
    } else if (code === "ArrowDown") {
      direction = "SOUTH";
    } else if (code === "ArrowLeft") {
      direction = "WEST";
    } else if (code === "ArrowRight") {
      direction = "EAST";
    }

    if (gameStatus === "ready") {
      gameStatus = "active";
      startGame();
    }
  });

  // set size of santa and houses
  wrapper.style.fontSize = `${cellSize * 0.8}px`;
}

setUp();

drawBoard();
drawScore();
