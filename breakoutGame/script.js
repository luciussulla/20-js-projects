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
const bricks = []; 
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

// move paddle on canvas 
function movePaddle() {
  paddle.x += paddle.dx; 

  // wall detection 
  if(paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width-paddle.w; 
  }

  if(paddle.x < 0) {
    paddle.x = 0; 
  }
}

// move Ball

function moveBall() {
  ball.x += ball.dx; 
  ball.y += ball.dy; 
  // wall detection calliion x
  if(ball.x + ball.size > canvas.width || ball.x-ball.size < 0) {
    ball.dx *= -1; 
  }
  // wall collision celining and floor 
  if(ball.y + ball.size >canvas.height || ball.y-ball.size < 0) {
    ball.dy *= -1; 
  }
  // paddle collision 
  if( ball.x - ball.size > paddle.x && 
      ball.x + ball.size < paddle.x + paddle.w &&
      ball.y + ball.size > paddle.y) {
        ball.dy = -ball.speed;
  }
  bricks.forEach(column => {
    column.forEach(brick=> {
      if(brick.visible) {
        if(ball.x - ball.size > brick.x && // left brick side 
           ball.x + ball.size < brick.x + brick.w && // right brick side 
           ball.y + ball.size > brick.y && // top brick side check
           ball.y - ball.size < brick.y + brick.h // bottom brick side check
        ){
          ball.dy *= -1; 
          brick.visible = false; 

          increaseScore(); 
        }
      }
    }); 
  }); 

  // hit bottom wall - lose 
  if(ball.y+ball.size > canvas.height) {
    showAllBricks(); 
    score = 0; 
  }
}

// Increase score 
function increaseScore() {
  score++; 

  if(score % (brickRowCount*brickColumnCount) === 0) {
    showAllBricks(); 
  }
}

// Make all bricks appear 
function showAllBricks() {
  bricks.forEach(column=> {
    column.forEach(brick=> brick.visible = true)
  });  
}

// Draw bricks 
function drawBricks() { 

  bricks.forEach(column => {
    column.forEach(brick=> {
      ctx.beginPath(); 
      ctx.rect(brick.x, brick.y, brick.w, brick.h); 
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
      ctx.fill(); 
      ctx.closePath(); 
    }); 
  }); 

}

// Draw everything
function draw() { 
  // clear canvas 
  ctx.clearRect(0,0, canvas.width, canvas.height); 

  drawBall(); 
  drawPaddle(); 
  drawScore(); 
  drawBricks(); 
} 

// update canvas all positions
function update() {
  movePaddle(); 
  moveBall(); 
  // Draw everything 
  draw(); 

  requestAnimationFrame(update); 
}

update(); 

// Keydown events
function keyDown(e) {
  // console.log(e); 
  if(e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed; 
  } else if(e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed; 
  }
}
// Keyup event 
function keyUp(e) {
  if(e.key === 'Right' || e.key=== "ArrowRight" || e.key === 'Left' || e.key=== "ArrowLeft" ) {
    paddle.dx = 0; 
  }
}

// Keyboard event handlers 
document.addEventListener('keydown', keyDown); 
document.addEventListener('keyup', keyUp); 

// Draw  scoer on vanvas 
function drawScore() {
  ctx.font = '20px Arial'; 
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30); 
}

// rules and close evnet handler 
rulesBtn.addEventListener('click', ()=> {
  rules.classList.add('show'); 
}); 

closeBtn.addEventListener('click', ()=> {
  rules.classList.remove('show'); 
}); 

