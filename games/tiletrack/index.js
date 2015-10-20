/* Blank Level Template:
[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] */
var ctx = canvasPlus('canvas'),
tt = {
  levels: [
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 3, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 4, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 4, 0],
    [0, 4, 1, 3, 1, 1, 1, 1, 4, 0],
    [0, 1, 0, 0, 2, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 4, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 3, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 2, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 1, 4, 1, 1]],
    [[0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 2, 1, 1],
    [0, 0, 0, 0, 1, 1, 1, 1, 4, 1],
    [0, 0, 0, 0, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 4, 1, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 3, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 4, 1, 1, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 1]],
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 4, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 1, 0, 0, 0, 0],
    [1, 1, 0, 1, 0, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 0],
    [1, 4, 2, 1, 1, 1, 1, 0, 0, 0],
    [1, 4, 1, 1, 0, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 3]],
    [[3, 0, 0, 1, 1, 4, 1, 1, 4, 1],
    [1, 0, 0, 1, 0, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 1, 0, 1, 0, 1, 1],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 2]],
    [[2, 1, 4, 1, 1, 1, 1, 4, 1, 1],
    [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 4, 1, 1, 1, 4],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 4, 1, 4, 4, 4, 1, 4, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [1, 1, 4, 1, 4, 1, 4, 1, 4, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
  ],
  currentLevel: 0,
  levelNumber: 0,
  character: [1, 1],
  characterStart: [1, 1],
  game: false,
  bgGradient: null,
  drawCharacter: function (x, y, rad) {
    ctx.save();
    ctx.shadowOffsetY = rad / 5;
    ctx.shadowBlur = 5;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.fillStyle = 'black';
    ctx.drawCircle('fill', x, y, rad);
    ctx.restore();
    ctx.fillStyle = ctx.strokeStyle = 'white';
    ctx.drawCircle('fill', x - (rad / 10 * 3), y - (rad / 5 * 2), (rad / 25 * 2));
    ctx.drawCircle('fill', x + (rad / 10 * 3), y - (rad / 5 * 2), (rad / 25 * 2));
    ctx.drawCircle('fill', x, y, (rad / 25));
    ctx.beginPath();
    ctx.arc(x, y, (rad / 5 * 3), (Math.PI / 4), (3 * Math.PI / 4), false);
    ctx.stroke();
  },
  instancesOf: function (num) {
    var result = [],
    i,
    j;
    for (i = 0; i < tt.currentLevel[0].length; i += 1) {
      for (j = 0; j < tt.currentLevel.length; j += 1) {
        if (tt.currentLevel[i][j] === num) {
          result[result.length] = [i, j];
        }
      }
    }
    return result;
  },
  duplicateLevel: function (levelNum) {
    var result = [],
    i,
    j;
    for (i = 0; i < tt.levels[levelNum].length; i += 1) {
      result[result.length] = [];
    }
    for (i = 0; i < tt.levels[levelNum][0].length; i += 1) {
      for (j = 0; j < tt.levels[levelNum].length; j += 1) {
        result[i][j] = tt.levels[levelNum][i][j];
      }
    }
    return result;
  },
  drawMap: function () {
    var i,
    j;
    for (i = 0; i < tt.currentLevel[0].length; i += 1) {
      for (j = 0; j < tt.currentLevel.length; j += 1) {
        if (tt.currentLevel[j][i] === 0) {
          ctx.fillStyle = '#999999';
        }
        else if (tt.currentLevel[j][i] === 1 || tt.currentLevel[i][j] === 2) {
          ctx.fillStyle = 'green';
        }
        else if (tt.currentLevel[j][i] === 3) {
          ctx.fillStyle = 'red';
        }
        else if (tt.currentLevel[j][i] === 4) {
          ctx.fillStyle = 'blue';
        }
        ctx.drawRect('fill', i * (500 / tt.currentLevel[0].length), j * (500 / tt.currentLevel.length), 50, 50);
      }
    }
    tt.drawCharacter(tt.character[0] * 50 + 25, tt.character[1] * 50 + 25, 25);
    ctx.strokeStyle = 'black';
    for (i = 0; i < 10; i += 1) {
      ctx.drawLine(i * 50, 0, i * 50, 500);
    }
    for (i = 0; i < 10; i += 1) {
      ctx.drawLine(0, i * 50, 500, i * 50);
    }
    if (tt.instancesOf(1).length === 0 && tt.instancesOf(4).length === 0) {
      if (tt.levels[tt.levelNumber + 1]) {
        tt.levelNumber += 1;
        tt.currentLevel = tt.duplicateLevel(tt.levelNumber);
        tt.characterStart = tt.character.concat();
        tt.drawMap();
      }
      else {
        alert('You Win!');
        document.getElementById('reset').style.display = 'none';
        document.getElementById('start').style.display = 'inline';
        tt.game = false;
      }
    }
  },
  moveCharacter: function (moveX, moveY) {
    var gridPos = tt.currentLevel[tt.character[1] + moveY][tt.character[0] + moveX];
    if (tt.game && gridPos && (gridPos === 1 || gridPos === 4 || (gridPos === 3 && tt.instancesOf(1).length === 1 && tt.instancesOf(4).length === 0))) {
      tt.currentLevel[tt.character[1]][tt.character[0]] = (tt.currentLevel[tt.character[1]][tt.character[0]] === 4 ? 1 : 0);
      tt.character[0] += moveX;
      tt.character[1] += moveY;
    }
    tt.drawMap();
  }
};
document.addEventListener('keydown', function (e) {
  if (e.keyCode === 37 || e.keyCode === 65) {
    tt.moveCharacter(-1, 0);
  }
  if (e.keyCode === 38 || e.keyCode === 87) {
    tt.moveCharacter(0, -1);
  }
  if (e.keyCode === 39 || e.keyCode === 68) {
    tt.moveCharacter(1, 0);
  }
  if (e.keyCode === 40 || e.keyCode === 83) {
    tt.moveCharacter(0, 1);
  }
}, false);
tt.bgGradient = ctx.createLinearGradient(0, 0, 500, 500);
tt.bgGradient.addColorStop(0, '#00CCFF');
tt.bgGradient.addColorStop(1, '#000033');
ctx.fillStyle = tt.bgGradient;
ctx.drawRect('fill', 0, 0, 500, 500);
ctx.font = '60px Courier';
ctx.textAlign = 'center';
ctx.fillStyle = 'white';
ctx.strokeStyle = 'black';
ctx.fillText('TileTrack', 250, 100);
ctx.strokeText('TileTrack', 250, 100);
ctx.strokeStyle = 'black';
ctx.drawLine(300, 400, 25, 400);
ctx.drawLine(300, 375, 50, 375);
ctx.drawLine(300, 350, 75, 350);
ctx.drawLine(300, 325, 100, 325);
ctx.drawLine(300, 300, 125, 300);
ctx.save();
ctx.scale(1.25, 1);
ctx.shadowOffsetY = 20;
ctx.shadowBlur = 5;
ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
tt.drawCharacter(250, 300, 100);
ctx.restore();
document.getElementById('start').onclick = function () {
  tt.game = true;
  tt.levelNumber = 0;
  tt.currentLevel = tt.duplicateLevel(0);
  tt.character = [tt.instancesOf(2)[0][0], tt.instancesOf(2)[0][1]];
  document.getElementById('reset').style.display = 'inline';
  document.getElementById('start').style.display = 'none';
  ctx.clear();
  tt.drawMap();
};
document.getElementById('reset').onclick = function () {
  tt.currentLevel = tt.duplicateLevel(tt.levelNumber);
  tt.character = tt.characterStart.concat();
  tt.drawMap();
};