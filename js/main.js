const canvas = document.getElementById("canvas"); 

window.addEventListener('resize', resizeCanvas, false); 
window.onresize = resizeCanvas(); 

//resizeCanvas();
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
    console.log()
	if (sceneManager != null) {
		//console.log("resizing"); 
		sceneManager.onWindowResize(); 
	}
}