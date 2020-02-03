/*jshint esversion: 6 */
$(document).ready(function() {
  let $canvas = $('#game-grid');
  let canvasMargin = (($(document).width() - $canvas.attr('width')) / 2 + 'px');
  $canvas.css('margin-left', canvasMargin);
  $(window).on('resize', function() {
    canvasMargin = (($(document).width() - $canvas.attr('width')) / 2 + 'px');
    $canvas.css('margin-left', canvasMargin);
  });
});

let cvs = document.getElementById('game-grid');
let ctx = cvs.getContext('2d');

const ROW = 20;
const COL = 20;
const SQ = 30;
const EMPTY = 'white';

// create board

let grid = [];
for (var r = 0; r < ROW; r++) {
  grid[r] = [];
  for (var c = 0; c < COL; c++) {
    grid[r][c] = EMPTY;
  }
}

function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

  ctx.strokeStyle = 'black';
  ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}



function drawGrid() {
  for (var r = 0; r < ROW; r++) {
    for (var c = 0; c < COL; c++) {
      drawSquare(c, r, grid[r][c]);
    }
  }
}

let player = {
  x: 0,
  y: 0,
  color: 'red',

  draw: function() {
    drawSquare(this.x, this.y, this.color);
  },

  erase: function() {
    drawSquare(this.x, this.y, EMPTY);
  }

};


document.addEventListener('keydown', movePlayer);

function movePlayer(e) {
  let change = false;
  let y;
  let x;
  switch (e.code) {
    case 'ArrowUp':
      y = 1;
      break;
    case 'ArrowDown':
      y = -1;
      break;
    case 'ArrowLeft':
      x = 1;
      break;
    case 'ArrowRight':
      x = -1;
      break;
  }

  if (y !== undefined || x !== undefined) {
    player.erase();
    if (y === 1 && player.y > 0) {
      player.y--;
    }
    if (y === -1 && player.y < ROW - 1) {
      player.y++;
    }
    if (x === 1 && player.x > 0) {
      player.x--;
    }
    if (x === -1 && player.x < COL - 1) {
      player.x++;
    }
    player.draw();
  }
}

drawGrid();
player.draw(0, 0, 'red');
