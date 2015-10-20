var colors = {r: 'red', g: 'green', b: 'blue'};
var Chroma = function (width, height) {
  var chroma = this;
  this.width = width,
  this.height = height;
  this.board = [];
  this.current = [];
  this.pressed = '';
  this.levels = 8;
  this.goal = null;
  this.score = 0;
  this.lastMove = []; // [color, {tile: tile, value: x} x2]
  
  var info = '<div class="info"><span class="red"></span><br /><span class="green"></span><br /><span class="blue"></span></div>';
  
  var increments = function () { return 256 / chroma.levels; };
  
  var createBoard = function () { // Create board with randomized colors
    var i, j, tile;
	for (i = 0; i < height; i += 1) {
	  chroma.board[i] = [];
	  for (j = 0; j < width; j += 1) {
		tile = chroma.Tile.random();
		tile.row = i;
		tile.col = j;
		chroma.board[i][j] = tile;
	  }
	}
  };
  
  var randomColor = function () {
	return Math.floor(Math.random() * chroma.levels);
  };
  
  this.makeGoal = function () {
	while (chroma.boardHasTile((chroma.goal = chroma.Tile.random()))); // Pick a tile that isn't already on the board
	$('td#goal').css('background-color', chroma.goal.hex);
	this.updateInfo('goal');
  };
  
  this.makeTitle = function () {
	var heading = '',
	i,
	tile;
	for (i = 0; i < 'Chroma'.length; i += 1) {
	  tile = this.Tile.random();
	  heading += '<span style="color: ' + tile.hex() + '">' + 'Chroma'[i] + '</span>';
	}
	$('#chromaTitle').html(heading);  
  };
    
  this.adjacentCoords = function (row, col) {
	row = row === undefined ? chroma.current[0] : row;
	col = col === undefined ? chroma.current[1] : col;
	var left = col === 0 ? null : [row, col - 1],
	right = col === width - 1 ? null : [row, col + 1],
	up = row === 0 ? null : [row - 1, col],
	down = row === height - 1 ? null : [row + 1, col];
	return [up, left, down, right];
  };
  
  var elementQueryStr = function (row, col) {
	return '[data-row="' + row + '"][data-col="' + col + '"]';
  };
  
  var modifyInfo = function (mode, row, col) { // Mode true for update, false for clear
    var goal = row === 'goal';
	row = row === undefined && !goal ? chroma.current[0] : row;
	col = col === undefined && !goal ? chroma.current[1] : col;
	var el = goal ? '#goal' : elementQueryStr(row, col),
	tile = goal ? chroma.goal : chroma.getTile(row, col);
	$(el + ' .info')[mode ? 'show' : 'hide']();
	$.each(colors, function (k, v) {
	  $(el + ' .' + v).html(mode ? tile[k] : '');
	});
  }
  
  this.updateInfo = function (row, col) { // row can also be 'goal' or 'adjacent', no args for current
    if (row === 'adjacent') {
	  $.each(c.adjacentCoords(), function (i, e) {
		if (e) {
	      modifyInfo(true, e[0], e[1]);
		}
	  });
	}
	else {
	  modifyInfo(true, row, col);
	}
  };
  
  this.clearInfo = function (row, col) {
	if (row === 'adjacent') {
	  $.each(c.adjacentCoords(), function (i, e) {
	    if (e) {
	      modifyInfo(false, e[0], e[1]);
		}
	  });
	}
	else {
	  modifyInfo(false, row, col);
	}
  };
  
  this.currentElement = function () {
	return $(elementQueryStr(this.current[0], this.current[1]));
  };
  
  this.getTile = function (row, col) {
	return this.board[row][col];  
  };
  
  this.currentTile = function () {
	return this.getTile(this.current[0], this.current[1]);  
  };
  
  this.updateTile = function (row, col) {
    $(elementQueryStr(row, col)).css('background-color', this.getTile(row, col).hex());  
  };
  
  this.isCurrent = function (row, col) {
	if (!this.current) {
	  return false;	
	}
	return this.current[0] === row && this.current[1] === col;
  };
  
  this.adjacentElements = function () {
	var str = '';
	$(this.adjacentCoords()).each(function (i, e) {
	  if (e) {
	    str += elementQueryStr(e[0], e[1]) + ',';
	  }
	});
	return $(str.slice(0, -1)); // Remove trailing comma
  };
  
  this.removeCurrent = function () {
	if (this.current.length) {
	  this.currentElement().removeClass('current');
	  this.adjacentElements().removeClass('adjacent');
	  this.clearInfo();
	  this.clearInfo('adjacent');
	  this.current = [];
	}
  };
  
  this.makeCurrent = function (row, col) {
	this.removeCurrent();
	this.current = [row, col];
	this.currentElement().addClass('current');
	this.adjacentElements().addClass('adjacent');
	this.updateInfo();
	this.updateInfo('adjacent');
  };
  
  this.boardHasTile = function (tile) {
	var i, j, current;
	for (i = 0; i < height; i += 1) {
	  for (j = 0; j < width; j += 1) {
		current = this.board[i][j];
		if (current.r === tile.r && current.g === tile.g && current.b === tile.b) {
		  return true;	
		}
	  }
	}
	return false;
  };
  
  this.undo = function () {
	var i, j;
	if (this.lastMove.length) {
	  this.lastMove[1].tile[this.lastMove[0]] = this.lastMove[1].value;
	  this.lastMove[2].tile[this.lastMove[0]] = this.lastMove[2].value;
	  this.updateTile(this.lastMove[1].tile.row, this.lastMove[1].tile.col);
	  this.updateTile(this.lastMove[2].tile.row, this.lastMove[2].tile.col);
	  this.makeCurrent(this.lastMove[1].tile.row, this.lastMove[1].tile.col);
	  this.lastMove = [];
	}
  };
  
  this.flash = function (color, callback) { // Flash the entire board in a given color
	var i, j, mode;
	mode = $('#mode').css('background-color');
	this.removeCurrent();
	$('td').css('background-color', color);
	$('h1 span').css('color', color);
	setTimeout(function () {
	  for (i = 0; i < height; i += 1) {
		for (j = 0; j < width; j += 1) {
		  chroma.updateTile(i, j);	
		}
	  }
	  $('#points, #undo').css('background-color', 'white');
	  $('#mode').css('background-color', mode);
	  chroma.makeTitle();
	  chroma[callback]();
	}, 600);
  };
  
  this.Tile = function (r, g, b) { // rgb from 0 to 255
    var tile = this;
    this.r = r;
	this.g = g;
	this.b = b;
	this.row = -1;
	this.col = -1;
	this.spill = function (color, tile) { // Spill color content into given tile
	  var amount = this[color];
	  chroma.lastMove = [color, {tile: this, value: amount}, {tile: tile, value: tile[color]}];
	  this[color] = 0;
	  tile[color] += amount;
	  if (tile[color] > chroma.levels) { // If we've spilled too much, put some back
		amount = tile[color] - chroma.levels;
		this[color] += amount;
		tile[color] = chroma.levels;
	  }
	};
	this.hex = function () {
	  var hex = '#',
	  part;
	  $.each(colors, function (k, v) {
		part = tile.colorValue(k).toString(16);
		part = part === '100' ? 'ff' : part; // Correct 256 to 255
		hex += part.length === 1 ? '0' + part : part; // Add 0 at beginning if necessary
	  });
	  return hex;
	};
	this.colorValue = function (color) {
	  return this[color] * increments();
	};
  };
  this.Tile.random = function () {
	return new this(randomColor(), randomColor(), randomColor());
  };
  
  createBoard();
  
  this.drawBoard = function () {
	var i, j, row,
	table = $('#chroma table');
	for (i = 0; i < this.height; i += 1) {
	  row = $(document.createElement('tr'));
	  for (j = 0; j < this.width; j += 1) {
		row.append($(document.createElement('td')).addClass('tile').attr('data-row', i).attr('data-col', j)
		   .css('background-color', this.board[i][j].hex())).html();
	  }
	  table.append(row);
	}
	$('td').append(info);
	this.makeGoal();
  };
},
c = new Chroma(5, 5);
c.makeTitle();
c.drawBoard();
var coordsIn = function (coords, arr) {
  var retVal = false;
  $.each(arr, function (i, e) {
	if (e && coords[0] === e[0] && coords[1] === e[1]) {
	  retVal = true;	
	}
  });
  return retVal;
};
$(document).keydown(function (e) {
  var spill = null;
  switch (e.keyCode) {
  case 82:
    c.pressed = 'r';
	break;
  case 71:
    c.pressed = 'g';
	break;
  case 66:
    c.pressed = 'b';
	break;
  case 87: // w
    spill = c.adjacentCoords()[0];
	break;
  case 65: // a
    spill = c.adjacentCoords()[1];
	break;
  case 83: // s
    spill = c.adjacentCoords()[2];
	break;
  case 68: // d
    spill = c.adjacentCoords()[3];
	break;
  }
  $('#mode').css('background-color', colors[c.pressed]);
  if (spill && c.pressed) {
	c.currentTile().spill(c.pressed, c.getTile(spill[0], spill[1]));
	c.updateTile(spill[0], spill[1]);
	c.updateTile(c.current[0], c.current[1]);
	c.updateInfo();
	c.updateInfo(spill[0], spill[1]);
	c.makeCurrent(spill[0], spill[1]);
	if (c.boardHasTile(c.goal)) {
	  $('#score').html(++c.score);
	  c.flash(c.goal.hex, 'makeGoal');
	}
  }
});
$('#chroma td').click(function () {
  var row = Number($(this).attr('data-row')),
  col = Number($(this).attr('data-col'));
  if (c.current) {
	if (c.isCurrent(row, col)) {
	  c.removeCurrent();
	}
	else {
	  c.makeCurrent(row, col);	
	}
  }
  else {
	c.makeCurrent(row, col);
  }
});
$('#chroma td').hover(
  function (e) {
	var row = Number($(this).attr('data-row')),
    col = Number($(this).attr('data-col'));
	if (!c.isCurrent(row, col)) {
	  c.updateInfo(row, col);
	}
  },
  function (e) {
	var row = Number($(this).attr('data-row')),
    col = Number($(this).attr('data-col'));
	if (!c.current || !c.isCurrent(row, col)  && !coordsIn([row, col], c.adjacentCoords())) {
	  c.clearInfo(row, col);
	}
  }
);
$('#undo').click(function () {
  c.undo();
});