// 캔버스 세팅
let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 700;

document.body.appendChild(canvas);

let backgroundImage,spaceshipImage,bulletImage,enemyImage,gameOverImage;

// 우주선 좌표
let spaceshipX = canvas.width/2 - 30
let spaceshipY = canvas.height - 60

let bulletList = [] // 총알들을 저장하는 리스트
function Bullet() {
    this.x = 0;
    this.y = 0;
    this.init = function(){
        this.x = spaceshipX
        this.y = spaceshipY

        bulletList.push(this)
    }
}

function loadImage(){
    backgroundImage = new Image();
    backgroundImage.src = "images/space.jpg";

    spaceshipImage = new Image();
    spaceshipImage.src = "images/spaceship.png";

    bulletImage = new Image();
    bulletImage.src = "images/bullet.png";

    enemyImage = new Image();
    enemyImage.src = "images/enemy.png";

    gameOverImage = new Image();
    gameOverImage.src = "images/gameOver.jpg";
}


let keysDown = {};

function setupKeyboardListener(){
    document.addEventListener("keydown", function(event){
        console.log("무슨 키가 눌렸어?", event.key)
        keysDown[event.key] = true;
        //console.log("키다운 객체에 들어간 값은?", keysDown);
    });
    document.addEventListener("keyup",function(event){
        delete keysDown[event.key];
        //console.log("버튼 클릭후", keysDown);
        if(event.key == ' '){
            createBullet() // 총알 생성
            
        }
    });
}

// 총알을 생성해주는 함수
function createBullet(){
    console.log("총알 생성");
    let b = new Bullet() // 총알 하나 생성
}

function update(){ // 좌표의 값을 바꿔주는 함수
    // right
    if('ArrowRight' in keysDown){
        spaceshipX += 5; // 우주선의 속도
    }
    // left
    if('ArrowLeft' in keysDown){
        spaceshipX -= 5;
    }

    // 우주선 위치 경기장 안으로 한정

    if(spaceshipX <= 0){
        spaceshipX = 0;
    }
    if(spaceshipX >= canvas.width-60){
        spaceshipX = canvas.width-60;
    }



}

function render(){
    // ctx.drawImage(image, dx, dy, dWidth, dHeight)
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
}

function main(){
    update(); // 좌표값을 업데이트하고
    render(); // 그려주고
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();


// 총알 만들기
// 1. 스페이스바 누르면 총알 발사
// 2. 총알이 발사 = 총알의 y값이 --, 총알의 X값은? 스페이스를 누른 순간의 우주선의 x좌표
// 3. 발사된 총알들은 총알 배열에 저장을 한다
// 4. 총알들은 x,y 좌표값이 있어야한다.
// 5. 총알 배열을 가지고 그려준다.