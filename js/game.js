function Game(){
	var speed = 5;
	var score = 0 ; 
	var hit = 0; 
	var pause = false; 
	var rotateEmrys = false; 
	var showHeart = false; 
	var waitingRotate = false; 

	var won = false; 
	var waitingReplay = false; 

	this.getSpeed = function(){
		return speed; 
	}
	this.increaseSpeed = function(inc){
		speed = speed + inc; 
		if (speed < 0) speed = 0;
	}

	this.getScore = function(){
		return score; 
	}
	this.increaseScore = function(inc){
		score = score + inc; 
	}

	this.getHit = function(){
		return hit; 
	}
	this.increaseHit = function(inc){
		hit = hit + inc; 
	}

	this.pause = function(){
		pause = true; 
	}
	this.pauseOrResume = function(){
		pause = !pause; 
	}
	this.isPaused = function(){
		return pause; 
	}

	this.resetGame = function(){
		speed = 5;
		score = 0 ; 
		hit = 0; 
		pause = false; 
		waitingRotate = false; 

		won = false; 
		waitingReplay = false; 

	}
}