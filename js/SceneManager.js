function SceneManager(canvas){
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight; 

	var width = canvas.width;
	var height = canvas.height; 

	//scene setup
	var scene = new THREE.Scene(); 
	scene.fog = new THREE.Fog( 0xE5DFE1, 1000, 2000 );

	var renderer = buildRenderer(width, height); 
	var camera = buildCamera(width, height); 
	var light = buildLights(scene); 
	var orbitControl = buildOrbitControl(camera); 

	var skyBox = buildSkyBox(scene); 
	var terrain = buildTerrain(scene); 

	var sceneSubjects = [];
	sceneSubjects.push(new Emrys(scene)); 
	sceneSubjects.push(new Heart(scene)); 
	sceneSubjects.push(new Trees(scene)); 
	sceneSubjects.push(new Branches(scene)); 
	sceneSubjects.push(new Coins(scene)); 
	//sceneSubjects.push(new Particles(scene)); 

	var game = new Game(); 

	//handle key and mouse events
	document.addEventListener('keydown', handleKeyDown, false);
	document.addEventListener('mouseup', handleMouseUp, false);
  	document.addEventListener('touchend', handleTouchEnd, false);

  	 
  	var waitingReplay = false; 
  	var pause = false; 
  	var keyEvent = null; 

  	var fieldScore = document.getElementById("scoreValue");
  	var fieldHit = document.getElementById("branchValue");
  	var youWon = document.getElementById("youWon");
	var youLost = document.getElementById("youLost");


  	//var game = new Game();


	this.update = function(){

		if (!game.isPaused()){

			orbitControl.update(); 

			for (var i=0; i<sceneSubjects.length; i++){
				sceneSubjects[i].update(camera, game, keyEvent, sceneSubjects); 
			}

		}

		renderer.render(scene, camera); 

		keyEvent = null; 

		fieldScore.innerHTML = game.getScore();
		fieldHit.innerHTML = game.getHit(); 

		if (game.end){
			showReplay(); 
		}


	}

	function showReplay(){
		console.log("showReplay");
		if (game.won) youWon.style.display="block";
		else youLost.style.display="block";
	    replayMessage.style.display="block";
	}


	function hideReplay(){
		youWon.style.display="none";
		youLost.style.display="none";
	  replayMessage.style.display="none";
	}


	function handleKeyDown(event){
		keyEvent = event; 
		//console.log(event.key);

		if (event.code == 'ArrowUp') game.increaseSpeed(2); 
		else if (event.code == 'ArrowDown') game.increaseSpeed(-2); 
	  	else if (event.code == 'Space' && !waitingReplay) game.pauseOrResume();

		var speed = game.getSpeed(); 
		if (speed < 0) speed = 0;
	}

	function handleMouseUp(event){
	  if (game.waitingReplay == true){
	  	console.log("here!"); 
	    game.resetGame();
	    console.log("here! 2"); 

	    fieldScore.innerHTML = game.score;
		fieldBranch.innerHTML = game.hit;

	    console.log("hiding message");
	    hideReplay();
	  }
	}

	function handleTouchEnd(event){
	  if (game.waitingReplay == true){
	  	console.log("here!"); 
	    game.resetGame();
	    console.log("here! 2"); 
	    fieldScore.innerHTML = game.score;
		fieldBranch.innerHTML = game.hit;

	    console.log("hiding message");
	    hideReplay();
	  }
	}

	function buildRenderer(width, height){  
		renderer = new THREE.WebGLRenderer( {canvas: canvas, antialias:true, alpha: true} );
		var DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1; 
		renderer.setPixelRatio(DPR); 
		renderer.setSize(width, height); 

		//renderer.gammaInput = true;
		//renderer.gammaOutput = true; 

		return renderer; 
	}

	function buildCamera(width, height){
		var aspectRatio = width/height; 
		var VIEW_ANGLE = 45, ASPECT = width / height, NEAR = 0.1, FAR = 20000;
		var camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);

		camera.position.set(0,150,400);
		camera.lookAt(scene.position);

		return camera; 
	}

	function buildLights(scene){
		var light = new THREE.PointLight(0xffffff);
		light.position.set(0,250,0);
		scene.add(light);

		return light; 
	}

	function buildOrbitControl(camera){
		var controls = new THREE.OrbitControls(camera);
  		controls.enableZoom = true;
  		return controls; 
	}

	function buildSkyBox(scene){
		var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
		var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0xD5CFDD, side: THREE.BackSide } );
		var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
		scene.add(skyBox);
	}

	function buildTerrain(scene){

		var terrain = new THREE.Object3D();
		var floorMaterial = new THREE.MeshBasicMaterial( { color: 0xA7C3D1, side: THREE.DoubleSide } );
		var floorGeometry = new THREE.PlaneGeometry(300, 20000, 10, 10);
		var floor = new THREE.Mesh(floorGeometry, floorMaterial);
		floor.position.y = -0.5;
		floor.rotation.x = Math.PI / 2;
		floor.position.z = 1000;
		terrain.add(floor);

		scene.add(terrain);
		return terrain; 

	}



}
