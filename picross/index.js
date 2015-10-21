var board = document.getElementById('picrossBoard'),
cells = [],
i,
j,
game = true,
numberOfCells,
numberClicked,
lives = 3,
createBoard = function (size) {
  var i,
  j,
  html = '<tr><th scope="col" rowspan="' + Math.ceil(size / 2) + '" colspan = "' + Math.ceil(size / 2) + '"></th>';
  for (i = 0; i < Math.ceil(size / 2); i += 1) {
    if (i !== 0) {
      html += '<tr>';
    }
    for (j = 0; j < size; j += 1) {
      html += '<th scope="col" id="c' + i + ',' + j + '"></th>';
    }
    html += '</tr>';
  }
  html += '</tr>';
  for (i = 0; i < size; i += 1) {
    html += '<tr>';
    for (j = 0; j < Math.ceil(size / 2); j += 1) {
      html += '<th scope="row" id="r' + j + ',' + i + '"></th>';
    }
    for (j = 0; j < size; j += 1) {
      html += '<td id="' + i + ',' + j + '"></td>';
    }
    html += '</tr>';
  }
  board.innerHTML = html;
},
click = function (e) {
  var coords = this.id.split(',');
  if (game && !this.clicked) {
	this.clicked = true;
    if (cells[coords[0]][coords[1]] === 1) {
      this.style.backgroundColor = '#00a';
      numberClicked += 1;
      if (numberClicked === numberOfCells) {
        alert('You Win!');
        game = false;
      }
    }
    else {
      this.style.backgroundColor = '#f66';  
      lives -= 1;
      document.getElementById('picrossLives').innerHTML = '';
      for (i = 0; i < lives; i += 1) {
        document.getElementById('picrossLives').innerHTML += '<div class="picrossLife"></div>';
      }
      if (lives === 0) {
        alert('Game Over!');
        game = false;
      }
    }
  }
},
generateBoard = function (size) {
  var i,
  j,
  tds,
  horizontalGroupLength,
  verticalGroupLength,
  currentHorizontalCell,
  currentVerticalCell;
  createBoard(size);
  game = true;
  lives = 3;
  document.getElementById('picrossLives').innerHTML = '<div class="picrossLife"></div><div class="picrossLife"></div><div class="picrossLife"></div>';
  cells = [];
  numberOfCells = 0;
  numberClicked = 0;
  for (i = 0; i < size; i += 1) {
    cells[i] = [];
    for (j = 0; j < size; j += 1) {
      cells[i][j] = Math.random() < Number(document.getElementById('difficulty').value) ? 1 : 0;
      if (cells[i][j] === 1) {
        numberOfCells += 1;  
      }
    }
  }
  tds = document.getElementsByTagName('td');
  for (i = 0; i < tds.length; i += 1) {
    tds[i].onclick = click;
  }
  for (i = 0; i < size; i += 1) {
    horizontalGroupLength = 0;
    verticalGroupLength = 0;
    currentHorizontalCell = Math.ceil(size / 2) - 1;
    currentVerticalCell = Math.ceil(size / 2) - 1;
    for (j = size - 1; j >= 0; j -= 1) {
      if (cells[i][j] === 1) {
        horizontalGroupLength += 1;  
      }
      if (cells[i][j] === 0 || j === 0) {
        if (horizontalGroupLength !== 0) {
          document.getElementById('r' + currentHorizontalCell + ',' + i).style.visibility = 'visible';
          document.getElementById('r' + currentHorizontalCell + ',' + i).innerHTML += horizontalGroupLength;
          horizontalGroupLength = 0;
          currentHorizontalCell -= 1;
        }
      }
      if (cells[j][i] === 1) {
        verticalGroupLength += 1;  
      }
      if (cells[j][i] === 0 || j === 0) {
        if (verticalGroupLength !== 0) {
          document.getElementById('c' + currentVerticalCell + ',' + i).style.visibility = 'visible';
          document.getElementById('c' + currentVerticalCell + ',' + i).innerHTML += verticalGroupLength;
          currentVerticalCell -= 1;
          verticalGroupLength = 0;
        }
      }
    }
  }
};
generateBoard(10);
document.getElementById('generate').onclick = function () {
  generateBoard(Number(document.getElementById('size').value));
}