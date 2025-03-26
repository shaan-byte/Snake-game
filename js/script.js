let inputdir={x:0,y:0}; //game does not start until user input
const foodsound=new Audio('./assets/food.mp3');
const gameOverSound=new Audio('./assets/game-over-arcade-6435.mp3');
const movesound=new Audio('./assets/move.mp3');    //specifying sounds
const music=new Audio('./assets/game-music-player-console-8bit-background-intro-theme-297305.mp3');
let speed=5;
let score=0;
let lastPaintTime=0;
let snakearr=[{x:10,y:10}];
let food={x:5,y:5};

//game functions
let main= (curr_time)=>{
window.requestAnimationFrame(main); //requesting the browser to call the function again and again game loop
if((curr_time-lastPaintTime)/1000 < 1/speed){
    return;
}
lastPaintTime=curr_time;
gameengine();
}

function isCollide(snake) {
    // Check if the snake collides with itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // Check if the snake hits the wall
    if (snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0) {
        return true;
    }

    return false;
}



function gameengine(){
    //updating snake array & food
    if(isCollide(snakearr)){
        gameOverSound.play();
        music.pause();
        inputdir = { x: 0, y: 0 };
    
        alert("Game Over! Press Any Key To Play Again");
    
        // Reset game variables
        snakearr = [{ x: 10, y: 10 }];
        score = 0;
        scoreBox.innerHTML = "Score: " + score; // Reset score display
    
        music.play();
    
    }
    //if snake has eaten food increment the score regenerate food
    if(snakearr[0].y==food.y && snakearr[0].x==food.x){
        foodsound.play();
        score+=1;
        scoreBox.innerHTML="Score: "+ score;
        let a=2;    //Food spawns between gird a and b
        let b=16;   
        snakearr.unshift({x:snakearr[0].x+inputdir.x,y:snakearr[0].y+inputdir.y})
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }

    //moving the snake
    for(let i=snakearr.length-2;i>=0;i--){
    snakearr[i+1]={...snakearr[i]};        
    }
    snakearr[0].x+=inputdir.x;
    snakearr[0].y+=inputdir.y;


    //render snake
    board.innerHTML="";
    snakearr.forEach((e,inedx)=>{
        snakeelement=document.createElement('div');
        snakeelement.style.gridRowStart=e.y;    //places at that particular grid row that is y
        snakeelement.style.gridColumnStart=e.x; //places at that particular grid column that is x
        if(inedx===0){
            snakeelement.classList.add('head'); //if the snake is starting then show head
        }else{
            snakeelement.classList.add('snake'); //if the snake is not starting then show snake
        }
        board.appendChild(snakeelement);
    })
    //render food
    foodelement=document.createElement('div');
    foodelement.style.gridRowStart=food.y;    //places at that particular grid row that is y
    foodelement.style.gridColumnStart=food.x; //places at that particular grid column that is x
    foodelement.classList.add('food');
    board.appendChild(foodelement);
}






//Main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    movesound.play();
    
    switch (e.key) {
        case "ArrowUp":
        case "w":
            if (inputdir.y === 0) {  // Prevent moving up if already moving down
                inputdir.x = 0;
                inputdir.y = -1;
            }
            break;
        case "ArrowDown":
        case "s":
            if (inputdir.y === 0) {  // Prevent moving down if already moving up
                inputdir.x = 0;
                inputdir.y = 1;
            }
            break;
        case "ArrowLeft":
        case "a":
            if (inputdir.x === 0) {  // Prevent moving left if already moving right
                inputdir.x = -1;
                inputdir.y = 0;
            }
            break;
        case "ArrowRight":
        case "d":
            if (inputdir.x === 0) {  // Prevent moving right if already moving left
                inputdir.x = 1;
                inputdir.y = 0;
            }
            break;
    }
});
