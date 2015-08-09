import events from 'pub-sub'
import $ from '$'

let $text = $('.loading-message')

events.on('loader:update', ({percentage = 0, message = '', type = 'info'} = {}) => {
  $text[0].textContent = message
})

var canvas = document.querySelector('.js-loader-canvas')
var ctx = canvas.getContext('2d')
var width = canvas.offsetWidth + 40
var height = canvas.offsetHeight

var size = 250
var nodes = []
var deltas = []
var defaultDelta = 1000

resize()

var timer = setInterval(update, 30);
window.addEventListener('resize', resize);

function resize () {
  width = canvas.width = canvas.offsetWidth + 40;
  height = canvas.height = canvas.offsetHeight
  var length = width / (size - 1)
  for (var i = 0; i < size; i++) {
    nodes[i] = new Vertex(length * i, height / 2, height / 2)
    deltas[i] = 0
  }
}

var xx = 150;
var dd = 15;

function update(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  defaultDelta -= defaultDelta * 0.9;
  deltas[xx] = defaultDelta;
  for (var i=xx-1;i>0;i--) {
    var d = xx-i;
    if(d > dd)d=dd;
    deltas[i] -= (deltas[i]-deltas[i+1])*(1-0.01*d);
  }
  for(var i=xx+1;i<size;i++)
  {
    var d = i-xx;
    if(d > dd)d=dd;
    deltas[i] -= (deltas[i]-deltas[i-1])*(1-0.01*d);
  }

  for(var i = 0; i < nodes.length; i++){
    nodes[i].updateY(deltas[i]);
  }

  draw();

}

function draw () {
  ctx.beginPath();
  ctx.moveTo(0,window.innerHeight);
  ctx.fillStyle = '#6ca0f6' // blue 1
  ctx.lineTo(nodes[0].x,nodes[0].y);
  for(var i = 1;i < nodes.length;i++){
    ctx.lineTo(nodes[i].x,nodes[i].y);
  }
  ctx.lineTo(canvas.width,window.innerHeight);
  ctx.lineTo(0,window.innerHeight);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(0,window.innerHeight);
  ctx.fillStyle= '#367aec';
  ctx.lineTo(nodes[0].x+15,nodes[0].y+5);
  for(var i = 1;i < nodes.length;i++){
    ctx.lineTo(nodes[i].x+15,nodes[i].y+5);
  }
  ctx.lineTo(canvas.width,window.innerHeight);
  ctx.lineTo(0,window.innerHeight);
  ctx.fill();

}

function Vertex (x,y,baseY) {
  this.baseY = baseY;
  this.x = x;
  this.y = y;
  this.vy = 0;
  this.targetY = 0;
  this.friction = 0.15;
  this.deceleration = 0.95;
}

Vertex.prototype.updateY = function (diffVal) {
  this.targetY = diffVal + this.baseY;
  this.vy += this.targetY - this.y
  this.y += this.vy * this.friction;
  this.vy *= this.deceleration;
}

// this creates a "drop" on the surface
canvas.onmousedown = function (e) {
  var mouseX,mouseY;
  if (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  } else {
    mouseX = event.x + document.body.scrollLeft;
    mouseY = event.y + document.body.scrollTop;
  }
  if (window.innerHeight/2 - mouseY < 50 && window.innerHeight/2 - mouseY> -50) {
    defaultDelta = 1000;
    if (mouseX<canvas.width-2) {
      xx = 1 + Math.floor((size - 2) * mouseX / canvas.width);
      deltas[xx] = defaultDelta;
    }
  }
}
