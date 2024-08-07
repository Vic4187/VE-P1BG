var scoreDisplayElem = document.querySelector('.scoreboard');
var hiscoreDisplayElem = document.querySelector('.hi');
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var paused = false;
var grid = 16;
var count = 0;
var frameSkip = 10;  // Increase this value to slow down the snake

function resetSnake() {
    var snake = {
        x: 160,
        y: 160,
        dx: grid,
        dy: 0,
        cells: [],
        maxCells: 4,
    };
    return snake;
}

var snake = resetSnake();
var score = 0;
var hiscore = 0;
var apple = { x: 320, y: 320 };

const getRandomInt = (mn, mx) => Math.floor(Math.random() * (mx - mn)) + mn;

function gameLoop() {
    requestAnimationFrame(gameLoop);
    if (++count < frameSkip) return;  // Use frameSkip variable here
    if (paused) return;
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) snake.x = canvas.width - grid;
    else if (snake.x >= canvas.width) snake.x = 0;

    if (snake.y < 0) snake.y = canvas.height - grid;
    else if (snake.y >= canvas.width) snake.y = 0;

    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.maxCells) snake.cells.pop();

    context.fillStyle = 'green';
    context.fillRect(apple.x, apple.y, grid + 1, grid + 1);

    context.fillStyle = 'red';
    snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid + 1, grid + 1);
        if (cell.x === apple.x && cell.y == apple.y) {
            snake.maxCells++;
            scoreDisplayElem.innerHTML = ++score;
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
            if (score > hiscore) {
                hiscore = score;
                hiscoreDisplayElem.innerHTML = '' + hiscore;
            }
        }

        for (var i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                scoreDisplayElem.innerHTML = ' 0';
                score = 0;
                snake = resetSnake();
                apple.x = getRandomInt(0, 25) * grid;
                apple.y = getRandomInt(0, 25) * grid;
            }
        }
    });
}

document.addEventListener('keydown', function (e) {
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
    else if (e.which == 32) {
        paused = !paused;
        document.querySelector('.pause').innerHTML = paused ? 'Play' : 'Pause';
    }
});

function left() {
    if (snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
};
function right() {
    if (snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
};
function up() {
    if (snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
};
function down() {
    if (snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
};
function pause() {
    paused = !paused;
    document.querySelector('.pause').innerHTML = paused ? 'Play' : 'Pause';
}

requestAnimationFrame(gameLoop);
