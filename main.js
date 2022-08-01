//캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage,airplaneImage,bulletImage,enemyImage,gameOverImage;

// 비행기 좌표
let airplaneX = canvas.width/2-30
let airplaneY = canvas.height-60

function loadImage(){
    backgroundImage = new Image();
    backgroundImage.src = "images/space.jpg";

    airplaneImage = new Image();
    airplaneImage.src = "images/airplane.png";

    bulletImage = new Image();
    bulletImage.src = "images/bullet.png";

    enemyImage = new Image();
    enemyImage.src = "images/enemy.png";

    gameOverImage = new Image();
    gameOverImage.src = "images/gameOver.jpg";
}

function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(airplaneImage, airplaneX, airplaneY);
}

function main(){
    render();
    console.log("animation calls main function");
    requestAnimationFrame(main);
}

loadImage();
main();