"use strict";

/*
	Colgate Slide
	Author: Lee Stemkoski
	Date: July 2013 (three.js v59dev)
*/

// MAIN

// standard global variables
var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var ground = [];
// custom global variables
var emrysBbox;
var box;


var emrys;
var trees = [];
var coins;
var branches;
var loader = new THREE.TextureLoader();
var particleSystem;
//allow cross origin loading
loader.crossOrigin = true;

var speed = 5;
var pause = false;
var waitingReplay = false; 
var won = false; 

var score = 0; 
var fieldScore; 
var branchesHit = 0; 
var fieldBranch; 
var replayMessage; 
var youWon;
var youLost; 


var particleCount = 900,

    particles = new THREE.Geometry(),
    pMaterial = new THREE.PointsMaterial({
	  color: 0xFFFFFF,
	  size: 10,
	  map: loader.load( 'images/particle.png' ),
		blending: THREE.AdditiveBlending,
		transparent: true
		});




// FUNCTIONS

function resetGame(){
	speed = 5;
	pause = false;
	waitingReplay = false; 

	score = 0; 
	branchesHit = 0; 

	fieldScore.innerHTML = score;
	fieldBranch.innerHTML = branchesHit; 

}

function showReplay(){
	console.log("showReplay"); 
	if (won) youWon.style.display="block";
	else youLost.style.display="block"; 
  replayMessage.style.display="block";
}

function hideReplay(){
	youWon.style.display="none";
	youLost.style.display="none";
  replayMessage.style.display="none";
}

function init()
{
	//UI
	fieldScore = document.getElementById("scoreValue");
	fieldBranch = document.getElementById("branchValue");
	replayMessage = document.getElementById("replayMessage");
	youWon = document.getElementById("youWon");
	youLost = document.getElementById("youLost");

	// SCENE
	scene = new THREE.Scene();
	// CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,150,400);
	camera.lookAt(scene.position);
	// RENDERER
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer();
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById( 'ThreeJS' );
	container.appendChild( renderer.domElement );
	// EVENTS
	THREEx.WindowResize(renderer, camera);
	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });

	// CONTROLS

  // Orbit Control
  controls = new THREE.OrbitControls(camera);
  controls.enableZoom = true;

	// STATS
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );
	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);

	var light2 = new THREE.SpotLight(0x808080);
	light2.position.set(0,60,-50);
	scene.add(light2);
	var light2_helper = new THREE.SpotLightHelper( light2 );
	scene.add( light2_helper );

	var light3 = new THREE.SpotLight(0x808080, 1, 200, 0.8, 0, 1);
	light3.position.set(0,60,140);
	scene.add(light3);
	var light3_helper = new THREE.SpotLightHelper( light3 );
	scene.add( light3_helper );
	// FLOOR

	// SKYBOX/FOG
	var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0xD5CFDD, side: THREE.BackSide } );
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	scene.add(skyBox);
	scene.fog = new THREE.Fog( 0xE5DFE1, 1000, 2000 );

	// create an array with six textures for a cool cube
	createTerrainMatrix();
	emrys = createEmrys();
	emrys.position.y+=20;
	emrys.position.z+=100;
	emrys.scale.set(10,10,10);
	box = new THREE.BoxHelper( emrys, 0xffff00 );
	emrysBbox = new THREE.Box3().setFromObject(emrys);
	scene.add( box );
	scene.add(emrys);

  camera.lookAt(emrys);

	trees = generateRandomTrees();

	for (var i=0; i<trees.length; i++) {
		scene.add(trees[i]);
	}

	coins = new THREE.Object3D();
	lineOfCoins(coins, 0);
	lineOfCoins(coins, 0);
	lineOfCoins(coins, 0);
	lineOfCoins(coins, 0);
	lineOfCoins(coins, 1);
	lineOfCoins(coins, 1);
  lineOfCoins(coins, 1);
	lineOfCoins(coins, 2);
	lineOfCoins(coins, 2);
  lineOfCoins(coins, 2);

	scene.add(coins);

	branches = new THREE.Object3D();
	obstacle(branches, 0);
	obstacle(branches, 1);
	obstacle(branches, 2);

	scene.add(branches);

	// create the particle system

	//handle mouse and key events
	document.addEventListener('keydown', handleKeyDown, false);
	document.addEventListener('mouseup', handleMouseUp, false);
  	document.addEventListener('touchend', handleTouchEnd, false);

	//var gui = new dat.GUI();

	animate(); 

}


function handleKeyDown(event){
	console.log(event.key);
	if (event.code == 'ArrowRight') {emrys.position.x += 10}
	else if (event.code == 'ArrowLeft') {emrys.position.x -= 10}
	else if (event.code == 'ArrowUp') speed += 2;
	else if (event.code == 'ArrowDown') speed -= 2;
  else if (event.code == 'Space' && !waitingReplay) pause = !pause;

	if (emrys.position.x > 100) {emrys.position.x = 100}
	else if (emrys.position.x < -100) {emrys.position.x = -100}
	if (speed < 0) speed = 0;
}

function handleMouseUp(event){
  if (waitingReplay == true){
    resetGame();
    console.log("hiding message"); 
    hideReplay();
  }
}

function handleTouchEnd(event){
  if (waitingReplay == true){
    resetGame();
    console.log("hiding message"); 
    hideReplay();
  }
}

function animate()
{
	requestAnimationFrame( animate );
	render();
	if (!pause) update();
}

function updateCoins() {
  var len = coins.children.length;

	for (var i = 0; i < len; i++) {
		coins.children[i].rotation.y += 0.05;
		if (coins.children[i].position.z >= camera.position.z) {
			coins.children[i].position.z -= 2000;
		}
		coins.children[i].position.z += speed;
		var coinBbox = new THREE.Box3().setFromObject(coins.children[i]);
		if ((emrysBbox).intersectsBox(coinBbox)){
			console.log("Collision");
			coins.remove(coins.children[i]);
			score += 20;
			fieldScore.innerHTML = score;

			if (score >= 1000){
				pause = true; 
				won = true; 
				waitingReplay = true; 
				showReplay();
			}
		}
	}
}

function updateBranches() {
  for (var i = 0; i < branches.children.length; i++) {
    if (branches.children[i].position.z >= camera.position.z) {
      branches.children[i].position.z -= 2000;
    }
    branches.children[i].position.z += speed;
    var branchBbox = new THREE.Box3().setFromObject(branches.children[i]);
    if ((emrysBbox).intersectsBox(branchBbox)){
      console.log("Collision");
      branches.remove(branches.children[i]);
      score -= 10;
      branchesHit += 1;
      fieldScore.innerHTML = score;
      fieldBranch.innerHTML = branchesHit;
      if (branchesHit >= 10){
        pause = true; 
		won = false; 
		waitingReplay = true; 
		showReplay();
      }
    }
  }
}

function updateParticles() {
  particleSystem.rotation.x += 0.01;
	particleSystem.rotation.y += 0.01;
	particleSystem.rotation.z += 0.01;

  var pCount = particleCount--;
  while (pCount >= 0) {
    // get the particle
    var particle = particles.vertices[pCount];
		//console.log(particle);
    // check if we need to reset
    if (particle.position.x < -200) {
      particle.position.x = 200;
      particle.velocity.x = 0;
    }

    // update the velocity with
    // a splat of randomniz
    particle.velocity.x -= Math.random() * .1;

    // and the position
    particle.position.addSelf(
      particle.velocity);

		pCount--;
  }
  // flag to the particle system
  // that we've changed its vertices.
  particleSystem.
    geometry.
    __dirtyVertices = true;
}

function update()
{
	var delta = clock.getDelta(); // seconds.
	var moveDistance = 200 * delta;
	emrysBbox.setFromObject(emrys);
	box.update();
	// rotate left/right/up/down

	var relativeCameraOffset = new THREE.Vector3(0,100, 400);

	var cameraOffset = relativeCameraOffset.applyMatrix4( emrys.matrixWorld );

	controls.update();
	moveWithCamera();
  updateCoins();
  updateBranches();
	//camera.updateMatrix();
	//camera.updateProjectionMatrix();

  stats.update();

	//experiment to get snowFALL
  updateParticles();
}

/*
function update()
{
	var delta = clock.getDelta(); // seconds.
	var moveDistance = 200 * delta;
	emrysBbox.setFromObject(emrys);
	box.update();
	// rotate left/right/up/down

	var relativeCameraOffset = new THREE.Vector3(0,100, 400);

	var cameraOffset = relativeCameraOffset.applyMatrix4( emrys.matrixWorld );

	controls.update();
	moveWithCamera();
	//camera.updateMatrix();
	//camera.updateProjectionMatrix();
	var len = coins.children.length;

	for (var i = 0; i < len; i++) {
		coins.children[i].rotation.y += 0.05;
		if (coins.children[i].position.z >= camera.position.z) {
			coins.children[i].position.z -= 2000;
		}
		coins.children[i].position.z += speed;
		var coinBbox = new THREE.Box3().setFromObject(coins.children[i]);
		if ((emrysBbox).intersectsBox(coinBbox)){
			console.log("Collision");
			coins.remove(coins.children[i]);
			score += 20; 
			fieldScore.innerHTML = score;

			if (score >= 1000){
				pause = true; 
				won = true; 
				waitingReplay = true; 
				showReplay();
			}
		}
	}

	for (var i = 0; i < branches.children.length; i++) {
		if (branches.children[i].position.z >= camera.position.z) {
			branches.children[i].position.z -= 2000;
		}
		branches.children[i].position.z += speed;
		var branchBbox = new THREE.Box3().setFromObject(branches.children[i]);
		if ((emrysBbox).intersectsBox(branchBbox)){
			console.log("Collision");
			branches.remove(branches.children[i]);
			score -= 20; 
			branchesHit += 1; 
			fieldScore.innerHTML = score;
			fieldBranch.innerHTML = branchesHit; 
			if (branchesHit >= 10){
				pause = true; 
				won = false; 
				waitingReplay = true; 
				showReplay();
			}
		}
	}



  stats.update();

	//experiment to get snowFALL
	particleSystem.rotation.x += 0.01;
	particleSystem.rotation.y += 0.01;
	particleSystem.rotation.z += 0.01;



  var pCount = particleCount--;
  while (pCount >= 0) {
    // get the particle
    var particle = particles.vertices[pCount];
		//console.log(particle);
    // check if we need to reset
    if (particle.position.x < -200) {
      particle.position.x = 200;
      particle.velocity.x = 0;
    }

    // update the velocity with
    // a splat of randomniz
    particle.velocity.x -= Math.random() * .1;

    // and the position
    particle.position.addSelf(
      particle.velocity);

		pCount--;
  }

  // flag to the particle system
  // that we've changed its vertices.
  particleSystem.
    geometry.
    __dirtyVertices = true;
}
*/

function render()
{
	renderer.render( scene, camera );
}


function createTerrainMatrix(){
	particleSystem = new THREE.Points(
			particles,
			pMaterial);
	for (var p = 0; p < particleCount; p++) {

		// create a particle with random
		// position values, -250 -> 250
		var pX = Math.random() * 500 - 250,
				pY = Math.random() * 500 - 250,
				pZ = Math.random() * 500 - 250,
				particle = new THREE.Vector3(pX, pY, pZ);

		// add it to the geometry
		particles.vertices.push(particle);
	}
	particleSystem.sortParticles = true;

	var terrain = new THREE.Object3D();
	// var floorTexture = new THREE.ImageUtils.loadTexture( 'images/checkerboard.jpg' );
	// floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
	// floorTexture.repeat.set( 10, 10 );
	var floorMaterial = new THREE.MeshBasicMaterial( { color: 0xA7C3D1, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(300, 20000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	floor.position.z = 1000;
	terrain.add(floor);
	terrain.add(particleSystem);

  // Mirror
  var mirrorGeom = new THREE.CircleBufferGeometry( 200, 64);
  var groundMirror = new THREE.Reflector( mirrorGeom, {
	    clipBias: 0.003,
	    textureWidth: 2,
	    textureHeight: 2,
	    color: 0x777777,
	    recursion: 1
	  } );
	groundMirror.position.y = -0.5;
	groundMirror.rotation.x = Math.PI / 2;
	groundMirror.position.z = 1000;
	terrain.add(groundMirror);

	scene.add(terrain);
	ground.push(floor);
}

function moveWithCamera(){
		for (var i=0; i<trees.length; i++) {
			if (trees[i].position.z >= camera.position.z ) {
				trees[i].position.z -= 2000;
    	}
			trees[i].position.z += speed;
		}
}


window.addEventListener('load', init, false);
