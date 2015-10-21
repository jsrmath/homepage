var ctx = canvasPlus('canvas'),
i,
j,
makeGrid = function () {
  var scale = Math.abs(document.getElementById('scale').value) || 25;
  ctx.drawRect('clear', 0, 0, 500, 500);
  ctx.applyStyleObject({strokeStyle: '#000', lineWidth: 0.5});
  for (i = 0; i <= 250; i += scale) {
	ctx.drawLine(250 + i, 0, 250 + i, 500);
	ctx.drawLine(250 - i, 0, 250 - i, 500);
  }
  for (i = 0; i <= 250; i += scale) {
	ctx.drawLine(0, 250 + i, 500, 250 + i);
	ctx.drawLine(0, 250 - i, 500, 250 - i);
  }
  ctx.lineWidth = 2;
  ctx.drawLine(0, 250, 500, 250);
  ctx.drawLine(250, 0, 250, 500);
},
distance = function (x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};
makeGrid();
document.getElementById('button').onclick = function () {
  var conic = document.getElementById('conic').value,
  scale = Math.abs(document.getElementById('scale').value) || 25,
  max = 250 / scale,
  f1,
  f2,
  dirAxis,
  dir,
  rad,
  dist,
  a,
  b,
  c,
  center,
  vertex,
  lastY;
  makeGrid();
  ctx.lineJoin = 'round';
  ctx.save();
  ctx.translate(250, 250);
  if (conic === 'circ') {
	center = [Number(document.getElementById('circCentX').value), Number(document.getElementById('circCentY').value)];
	rad = Math.abs(Number(document.getElementById('circRad').value));
	ctx.applyStyleObject({lineWidth: 1, strokeStyle: '#00F'}, true);
	ctx.drawLine(center[0] * scale, -center[1] * scale, center[0] * scale, -(center[1] + rad) * scale);
	ctx.restore();
	ctx.drawCircle('fill', center[0] * scale, -center[1] * scale, scale / 8);
	ctx.drawCircle('stroke', center[0] * scale, -center[1] * scale, rad * scale);
  }
  if (conic === 'ell') {
	f1 = [Number(document.getElementById('ellFoc1X').value), Number(document.getElementById('ellFoc1Y').value)];
	f2 = [Number(document.getElementById('ellFoc2X').value), Number(document.getElementById('ellFoc2Y').value)];
	dist = Number(document.getElementById('ellDist').value);
	center = [(f1[0] + f2[0]) / 2, (f1[1] + f2[1]) / 2];
	a = dist / 2;
	c = distance(f1[0], f1[1], center[0], center[1]);
	if (dist >= 2 * c) {
	  b = Math.sqrt(Math.pow(a, 2) - Math.pow(c, 2));
	  ctx.applyStyleObject({lineWidth: 1, strokeStyle: '#00F'}, true);
	  ctx.rotateFromPoint(center[0] * scale, -center[1] * scale, Math.atan2(f2[0] - f1[0], f2[1] - f1[1]) + Math.PI / 2);
	  ctx.drawLine((center[0] - a) * scale, -center[1] * scale, center[0] * scale, -center[1] * scale);
	  ctx.drawLine(center[0] * scale, -(center[1] - b) * scale, center[0] * scale, -center[1] * scale);
	  ctx.restore();
	  if (a === c) {
		ctx.drawLine(f1[0] * scale, -f1[1] * scale, f2[0] * scale, -f2[1] * scale);    
	  }
	  ctx.drawCircle('fill', center[0] * scale, -center[1] * scale, scale / 8);
	  ctx.drawCircle('fill', f1[0] * scale, -f1[1] * scale, scale / 8);
	  ctx.drawCircle('fill', f2[0] * scale, -f2[1] * scale, scale / 8);
	  ctx.save();
	  ctx.rotateFromPoint(center[0] * scale, -center[1] * scale, Math.atan2(f2[0] - f1[0], f2[1] - f1[1]) + Math.PI / 2);
	  ctx.drawCircle('fill', (center[0] + a) * scale, -center[1] * scale, scale / 8);
	  ctx.drawCircle('fill', (center[0] - a) * scale, -center[1] * scale, scale / 8);
	  ctx.restore();
	  ctx.drawEllipseFromFoci('stroke', f1[0] * scale, f1[1] * scale, f2[0] * scale, f2[1] * scale, dist * scale);
	}
	else {
	  ctx.drawCircle('fill', f1[0] * scale, -f1[1] * scale, scale / 8);
	  ctx.drawCircle('fill', f2[0] * scale, -f2[1] * scale, scale / 8);
	  b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
	  ctx.drawCircle('fill', center[0] * scale, -center[1] * scale, scale / 8);
	  ctx.drawCircle('fill', f1[0] * scale, -f1[1] * scale, scale / 8);
	  ctx.drawCircle('fill', f2[0] * scale, -f2[1] * scale, scale / 8);
	  ctx.save();
	  ctx.rotateFromPoint(center[0] * scale, -center[1] * scale, Math.atan2(f2[0] - f1[0], f2[1] - f1[1]) + Math.PI / 2);
	  ctx.drawCircle('fill', (center[0] + a) * scale, -center[1] * scale, scale / 8);
	  ctx.drawCircle('fill', (center[0] - a) * scale, -center[1] * scale, scale / 8);
	  ctx.beginPath();
	  ctx.moveTo(-500, -scale * ((a / b) * Math.sqrt(Math.pow(-max * 2 - center[0], 2) - Math.pow(a, 2)) + center[1]));
	  for (i = -500, j = -max * 2; i <= 500; i += 2, j += 2 / scale) {
		if (-scale * ((a / b) * Math.sqrt(Math.pow(j - center[0], 2) - Math.pow(a, 2)) + center[1])) {
		  lastY = -scale * ((a / b) * Math.sqrt(Math.pow(j - center[0], 2) - Math.pow(a, 2)) + center[1]);
		  ctx.lineTo(i, lastY);
		}
		else {
		  ctx.moveTo(i, lastY);  
		}
	  }
	  ctx.moveTo(-500, -scale * ((-a / b) * Math.sqrt(Math.pow(-max * 2 - center[0], 2) - Math.pow(a, 2)) + center[1]));
	  for (i = -500, j = -max * 2; i <= 500; i += 2, j += 2 / scale) {
		if (-scale * ((-a / b) * Math.sqrt(Math.pow(j - center[0], 2) - Math.pow(a, 2)) + center[1])) {
		  lastY = -scale * ((-a / b) * Math.sqrt(Math.pow(j - center[0], 2) - Math.pow(a, 2)) + center[1]);
		  ctx.lineTo(i, lastY);
		}
		else {
		  ctx.moveTo(i, lastY);
		}
	  }
	  ctx.stroke();
	  ctx.applyStyleObject({lineWidth: 1, strokeStyle: '#00F'}, true);
	  ctx.translate(center[0] * scale, -center[1] * scale);
	  ctx.drawLine(-500, (-500 * -a / b), 500, (500 * -a / b));
	  ctx.drawLine(-500, (-500 * a / b), 500, (500 * a / b));
	  ctx.drawLine(0, -500, 0, 500);
	  ctx.drawLine(-c * scale, 0, c * scale, 0);
	  ctx.restore();
	  ctx.restore();
	  ctx.restore();
	}
  }
  if (conic === 'para') {
	dirAxis = document.getElementById('paraAxis').value;
	dir = Number(document.getElementById('paraDir').value);
	f1 = [Number(document.getElementById('paraFocX').value), Number(document.getElementById('paraFocY').value)];
	ctx.drawCircle('fill', f1[0] * scale, -f1[1] * scale, scale / 8);
	if (dirAxis === 'y') {
	  ctx.applyStyleObject({lineWidth: 1, strokeStyle: '#00F'}, true);
	  ctx.drawLine(-250, -dir * scale, 250, -dir * scale);
	  ctx.restore();
	  vertex = [f1[0], (dir + f1[1]) / 2];
	  dist = (f1[1] - dir) / 2;
	  if (dist === 0) {
		ctx.drawLine(f1[0] * scale, -250, f1[0] * scale, 250);  
	  }
	  ctx.drawCircle('fill', vertex[0] * scale, -vertex[1] * scale, scale / 8);
	  ctx.beginPath();
	  ctx.moveTo(-250, -scale * ((Math.pow(-max - vertex[0], 2)) / (4 * dist) + vertex[1]));
	  for (i = -250, j = -max; i <= 250; i += 2, j += 2 / scale) {
		ctx.lineTo(i, -scale * ((Math.pow(j - vertex[0], 2)) / (4 * dist) + vertex[1]));
	  }
	  ctx.stroke();
	}
	else {
	  ctx.applyStyleObject({lineWidth: 1, strokeStyle: '#00F'}, true);
	  ctx.drawLine(dir * scale, -250, dir * scale, 250);
	  ctx.restore();
	  vertex = [(dir + f1[0]) / 2, f1[1]];
	  dist = (f1[0] - dir) / 2;
	  if (dist === 0) {
		ctx.drawLine(-250, -f1[1] * scale, 250, -f1[1] * scale);  
	  }
	  ctx.drawCircle('fill', vertex[0] * scale, -vertex[1] * scale, scale / 8);
	  ctx.beginPath();
	  ctx.moveTo(scale * ((Math.pow(-max - vertex[1], 2)) / (4 * dist) + vertex[0]), 250);
	  for (i = -250, j = -max; i <= 250; i += 2, j += 2 / scale) {
		ctx.lineTo(scale * ((Math.pow(j - vertex[1], 2)) / (4 * dist) + vertex[0]), -i);
	  }
	  ctx.stroke();  
	}
  }
  ctx.restore();
};
document.getElementById('conic').onchange = function () {
  var conics = ['circ', 'ell', 'para'],
  i;
  for (i = 0; i < conics.length; i += 1) {
	document.getElementById(conics[i]).style.display = 'none';  
  }
  document.getElementById(this.value).style.display = 'block';
};