import events from 'pub-sub'
import $ from '$'

let $loader = $('.loader')
let $text = $('.loading-message')

events.on('loader:update', ({percentage = 0, message = '', type = 'info'} = {}) => {
  if (type === 'error') {
    $loader.addClass('error')
  } else {
    $loader.addClass(`p${percentage}`)
  }
  $text[0].textContent = message
})

var canvas
var ctx
var vertexes = []
var diffPt = []
var autoDiff = 1000
var verNum = 250
var canvasW = window.innerWidth
var color1= "#6ca0f6"
var color2 = "#367aec"

window.addEventListener("load", init )

function resize() {
  canvasW = document.getElementById('container').offsetWidth + 40
  initCanvas(canvasW, window.innerHeight)
  var cW = canvas.width
  var cH = canvas.height
  for (var i = 0; i < verNum; i++) {
    vertexes[i] = new Vertex(cW / (verNum -1) * i, cH / 2, cH/2)
  }
  initDiffPt()
  var win_3 = window.innerWidth / 3
}

function init() {
  resize()
  var FPS = 30
  var interval = 1000 / FPS >> 0
  var timer = setInterval(update, interval);
  window.addEventListener('resize', resize);
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
      autoDiff = 1000;
      if (mouseX<canvas.width-2) {
        xx = 1 + Math.floor((verNum - 2) * mouseX / canvas.width);
        diffPt[xx] = autoDiff;
      }
    }
  }
}

function initDiffPt () {
  for (var i = 0; i < verNum; i++) {
    diffPt[i] = 0
  }
}

var xx = 150;
var dd = 15;

function update(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  autoDiff -= autoDiff*0.9;
  diffPt[xx] = autoDiff;
  for (var i=xx-1;i>0;i--) {
    var d = xx-i;
    if(d > dd)d=dd;
    diffPt[i] -= (diffPt[i]-diffPt[i+1])*(1-0.01*d);
  }
  for(var i=xx+1;i<verNum;i++)
  {
    var d = i-xx;
    if(d > dd)d=dd;
    diffPt[i] -= (diffPt[i]-diffPt[i-1])*(1-0.01*d);
  }

  for(var i = 0;i < vertexes.length;i++){
    vertexes[i].updateY(diffPt[i]);
  }

  draw();

}

function draw(){
  ctx.beginPath();
  ctx.moveTo(0,window.innerHeight);
  ctx.fillStyle=color1;
  ctx.lineTo(vertexes[0].x,vertexes[0].y);
  for(var i = 1;i < vertexes.length;i++){
    ctx.lineTo(vertexes[i].x,vertexes[i].y);
  }
  ctx.lineTo(canvas.width,window.innerHeight);
  ctx.lineTo(0,window.innerHeight);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(0,window.innerHeight);
  ctx.fillStyle=color2;
  ctx.lineTo(vertexes[0].x+15,vertexes[0].y+5);
  for(var i = 1;i < vertexes.length;i++){
    ctx.lineTo(vertexes[i].x+15,vertexes[i].y+5);
  }
  ctx.lineTo(canvas.width,window.innerHeight);
  ctx.lineTo(0,window.innerHeight);
  ctx.fill();

}

function initCanvas (width,height) {
  canvas = document.getElementById("canvas");
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext("2d");
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
