const rulesBtn = document.getElementById('rules-btn'); 
const closeBtn = document.getElementById('close-btn'); 
const rules = document.getElementById('rules');
const canvas = document.getElementsByClassName('canvas')[0]; 
const ctx = canvas.getContext('2d'); 
let score = 0; 

const brickRowCount = 9; 
const brickColumnCount = 5;

// Create brick props 
const brickInfo = {
  w: 70, 
  h: 20, 
  padding: 10, 
  offsetX: 45, 
  offsetY: 60, 
  visible: true
}

// create bricks 
const bricks = []
for(let i=0; i< brickRowCount; i++) {
  bricks[i] = []; 

  for(let j =0; j < brickColumnCount; j++) {
    const x = i*(brickInfo.w + brickInfo.padding) + brickInfo.offsetX; 
    const y = j*(brickInfo.h + brickInfo.padding) + brickInfo.offsetY; 
    bricks[i][j] = {...brickInfo, x, y}
  }

}

// Create ball props 
const ball = {
  x: canvas.width / 2, 
  y: canvas.height / 2, 
  size: 10, 
  speed: 4, 
  dx: 4, 
  dy: -4
}

// draw ball on canvas 
function drawBall() {
  ctx.beginPath(); 
  ctx.arc(ball.x, ball.y,ball.size, 0, Math.PI*2, true); 
  ctx.fillStyle = '#0095dd'; 
  ctx.fill(); 
  ctx.closePath(); 
}

// Create paddle props 
const paddle = {
  x: (canvas.width / 2) -40, 
  y: (canvas.height -20), 
  w: 80, 
  h: 10, 
  speed: 8, 
  dx: 0
}

// draw paddle on canvas 
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h); 
  ctx.fillStyle = '#0095dd'; 
  ctx.fill(); 
  ctx.closePath(); 
}

// Draw bricks 
function drawBricks() {

  console.log('draw bricks called'); 

  bricks.forEach(column => {
    console.log(column); 
    column.forEach(brick=> {
      ctx.beginPath(); 
      ctx.rect(brick.x, brick.y, brick.w, brick.h); 
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
      ctx.fill(); 
      ctx.closePath(); 
    }); 
  })
}

// draw everything
function draw() { 
  console.log('draw called'); 
  drawBall(); 
  drawPaddle(); 
  drawScore(); 
  drawBricks(); 
} 

// Draw  scoer on vanvas 
function drawScore() {
  ctx.font = '20px Arial'; 
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30); 
}

draw(); 

// rules and close evnet handler 
rulesBtn.addEventListener('click', ()=> {
  rules.classList.add('show'); 
}); 

closeBtn.addEventListener('click', ()=> {
  rules.classList.remove('show'); 
}); 

