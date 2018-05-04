const canvas = document.getElementById("canvas"); 

window.onresize = resizeCanvas(); 

var sceneManager = new SceneManager(canvas);  

render(); 


function render()
{
	requestAnimationFrame( render );
	sceneManager.update(); 
}


function resizeCanvas(){
	var canvas = document.getElementById("canvas"); 
	canvas.style.width = window.innerWidth+"px"; 
	canvas.style.height = window.innerHeight+"px";

	if (sceneManager) 
		sceneManager.onWindowResize(); 
}