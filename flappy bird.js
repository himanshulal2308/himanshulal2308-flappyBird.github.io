var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//Loading Images
var bird = new Image();
var fg = new Image();
var bg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

//giving images a source
bird.src = "images/bird.png";
fg.src = "images/fg.png";
bg.src = "images/bg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

//gap between pipeNorth and pipeSouth
var gap = 300;
var constant = pipeNorth.height + gap ;
var bX = 10;
var bY = 150;
var gravity = 1.5;
var score = 0;

//to move birdUP
document.addEventListener("click",moveUp);
function moveUp(){
	bY-=25;
	fly.play();
}

//audio files
var fly = new Audio();
var scor = new Audio(); 
fly.src = "sound/fly.mp3";
scor.src = "sound/score.mp3";

//pipe cordinate array
var pipe = [];
pipe[0]={
	x:cvs.width,
	y:0
};  

//drawing images
function draw(){
	ctx.drawImage(bg,0,0);
	for(var i=0;i<pipe.length;i++){

	ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
	ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
	pipe[i].x--;

		if(pipe[i].x==125){
			pipe.push({
				x:cvs.width,
				y:Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
			});
		}
		if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            location.reload(); // reload the page
        }

        if(pipe[i].x==10)
        {
        	score++;
        	scor.play();
        }	

	}


	ctx.drawImage(fg,0,cvs.height-fg.height);
	ctx.drawImage(bird,bX,bY);
	bY+=gravity;
	ctx.fillStyle = "#000";
	ctx.font = "20px Verdana";
	ctx.fillText("Score: " + score,10,cvs.height-20);
	requestAnimationFrame(draw);
}

draw();
