const DIMENSIONS = [20, 20];
const player = [{ x: 10, y: 10 }];
const house = { x: 10, y: 5 };
let direction = "SOUTH";
const board = document.getElementById("board");

function houseAtPosition(x, y) {
  return house.x === x && house.y === y ? "🏠" : false;
}

function playerAtPosition(x, y) {
  const length = player.length;

  for (const [index, segment] of player.entries()) {
    if (segment.x !== x || segment.y !== y) {
      continue;
    }

    return length === index + 1 ? "🎅" : "🦌";
  }

  return false;
}

function drawBoard() {
  const [width, height] = DIMENSIONS;
  board.innerHTML = "";

  [...Array(height)].forEach((_, rowIndex) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    [...Array(width)].forEach((_, colIndex) => {
      const div = document.createElement("div");
      div.classList.add("cell");
      const house = houseAtPosition(colIndex, rowIndex);
      const player = playerAtPosition(colIndex, rowIndex);

      if (player) {
        div.innerHTML = player;
      } else if (house) {
        div.innerHTML = house;
      } else {
        div.innerHTML = "XX";
      }
      rowDiv.append(div);
    });

    board.append(rowDiv);
  });
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
});

drawBoard();

setInterval(() => {
  takeTurn();
  drawBoard();
}, 100);
