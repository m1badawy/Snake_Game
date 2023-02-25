//board
let blockSize = 20
let rows = 20
let cols = 20
let board 
let context


//snake 
let snakeX = blockSize * 5
let snakeY = blockSize * 5


//food

let foodX
let foodY


//speed
let speedX = 0
let speedY = 0


//snake body
let snakeBody = []

//game over
let gameOver = false


window.onload = function() {
    board = document.getElementById("gameBoard")
    board.height = rows * blockSize
    board.width = cols * blockSize
    context = board.getContext("2d")

    placeFood()
    document.addEventListener("keyup", changeDirection)
    setInterval(update, 1000/10) 
}



function update() {
    if (gameOver) {
        return
    }
    context.fillStyle = "black"
    context.fillRect(0, 0, board.width, board.height)


    context.fillStyle = "red"
    context.fillRect(foodX, foodY, blockSize, blockSize)

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placeFood()
    }

    
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1]
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }

    context.fillStyle = "yellow"
    snakeX += speedX * blockSize
    snakeY += speedY * blockSize
    context.fillRect(snakeX, snakeY, blockSize, blockSize)
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
        
    }

    //game over
    if (snakeX < -blockSize || snakeX > cols*blockSize || snakeY < -blockSize || snakeY > rows*blockSize) {
        gameOver = true
        alert("Game Over!")
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true
            alert("Game Over!")
        }
        
    }
}


function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize
    foodY = Math.floor(Math.random() * rows) * blockSize
}

    
function changeDirection(event) {
    if (event.code == "ArrowUp" && speedY != 1) {
        speedX = 0
        speedY = -1
    }
    else if (event.code == "ArrowDown" && speedY != -1) {
        speedX = 0
        speedY = 1
    }
    else if (event.code == "ArrowLeft" && speedX != 1) {
        speedX = -1
        speedY = 0
    }
    else if (event.code == "ArrowRight" && speedX != -1) {
        speedX = 1
        speedY = 0
    }
}