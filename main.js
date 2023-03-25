// 캔버스 세팅
let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d"); // 그림을 그려주는 역할

canvas.width = 400;
canvas.height = 700;

document.body.appendChild(canvas);

let backgroundImage,spaceshipImage,bulletImage,enemyImage,gameOverImage;
let gameOver = false // true이면 게임이 끝남
let score = 0

// 우주선 좌표
let spaceshipX = canvas.width/2 - 30
let spaceshipY = canvas.height - 60

let bulletList = [] // 총알들을 저장하는 리스트

function Bullet() {
    this.x = 0;
    this.y = 0;
    this.init = function(){
        this.x = spaceshipX + 17;
        this.y = spaceshipY;
        this.alive = true // true면 살아있는 총알 false면 죽은 총알

        bulletList.push(this);
    };
    this.update = function(){
        this.y -= 7;
    };

    this.checkHit = function(){
        // 총알.y <= 적군.y And
        // 총알.x >= 적군.x and 총알.x <= 적군.x + 적군의 넓이
        for(let i=0; i < enemyList.length; i++){
            if(this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x+40){
                // 총알이 없어짐(죽음) 적군이 없어짐, 점수 획득
                score++;
                this.alive = false // 죽은 총알
                enemyList.splice(i,1)
            }
        }
    }
}

function generateRandomValue(min, max){
    let randomNum = Math.floor(Math.random()*(max-min+1))+min
    return randomNum
};

let enemyList = []
function Enemy(){
    this.x = 0;
    this.y = 0;
    this.init = function(){
        this.y = 0
        this.x = generateRandomValue(0, canvas.width-48)
        enemyList.push(this)
    };
    this.update = function(){
        this.y += 2 // 적군의 속도 조절

        if(this.y >= canvas.height-48){
            gameOver = true;
            console.log("gameOver")
        }
    }
}

function loadImage(){
    backgroundImage = new Image(); // "이것은 이미지 입니다."
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
    // 키가 눌렸을 경우
    document.addEventListener("keydown", function(event){
        console.log("무슨 키가 눌렸어?", event.key)
        keysDown[event.key] = true;
        //console.log("키다운 객체에 들어간 값은?", keysDown);
    });

    // 키가 눌렀다가 띄었을 때
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
    b.init();
    console.log("새로운 총알 리스트", bulletList)
}

function createEnemy(){
    const interval = setInterval(function(){
        let e = new Enemy()
        e.init();
    },1000)
}

// 좌표의 값을 바꿔주는 함수
function update(){
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

    // 총알의 y좌표를 업데이트하는 함수 호출
    for(let i=0; i<bulletList.length; i++){
        if(bulletList[i].alive){
            bulletList[i].update();
            bulletList[i].checkHit();
        }
    }

    // 적의 y좌표를 업데이트하는 함수 호출
    for(let i=0; i<enemyList.length; i++){
        enemyList[i].update();
    }
}

function render(){
    // ctx.drawImage(image, dx, dy, dWidth, dHeight)
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
    ctx.fillText(`score:${score}`, 20, 20);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";

    for(let i=0; i<bulletList.length; i++){
        if(bulletList[i].alive){
            ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
        }
    }

    for(let i=0; i<enemyList.length; i++){
        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
    }
}

function main(){
    if(!gameOver){
        update(); // 좌표값을 업데이트하고
        render(); // 그려주고
        requestAnimationFrame(main); // main을 계속 호출
    }else{ // 게임 오버가 되면
        ctx.drawImage(gameOverImage, 10, 100, 380, 380);
    }
}

loadImage();
setupKeyboardListener();
createEnemy();
main();


// 총알 만들기
// 1. 스페이스바 누르면 총알 발사
// 2. 총알이 발사 = 총알의 y값이 --, 총알의 X값은? 스페이스를 누른 순간의 우주선의 x좌표
// 3. 발사된 총알들은 총알 배열에 저장을 한다
// 4. 총알들은 x,y 좌표값이 있어야한다.
// 5. 총알 배열을 가지고 그려준다.

// 적군 만들기
// 적군은 위치가 랜덤하다
// 적군은 밑으로 내려온다
// 1초마다 하나씩 적군이 나온다
// 적군의 우주선이 바닥에 닿으면 게임 오버
// 적군과 총알이 만나면 적군이 사라진다. -> 점수 1점 획득

// 적군이 죽는다
// 총알이 적군에게 닿는다
// 총알.y <= 적군.y And
// 총알.x >= 적군.x and 총알.x <= 적군.x + 적군의 넓이

// 닿았다

// 총알이 죽게됨. 적군의 우주선이 없어짐, 점수 획득