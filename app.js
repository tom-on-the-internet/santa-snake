const DIMENSIONS = [20, 20];
let player = [{ x: 10, y: 10 }];
let direction = "NORTH";

function drawBoard() {
  const [width, height] = DIMENSIONS;

  const board = [...Array(height)].map(() => new Array(width).fill(null));
  player.forEach((item) => (board[item.y][item.x] = "🎅"));
  console.table(board);
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

drawBoard();
takeTurn();
drawBoard();
takeTurn();

drawBoard();
takeTurn();

drawBoard();
takeTurn();

drawBoard();
takeTurn();
