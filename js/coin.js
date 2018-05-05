"use strict";

var tokens = ['images/SL(1).png', 'images/FS(1).png', 'images/GN(1).png'];

var SL = 0;
var FS = 1;
var GN = 2;
var BR = 3;

var numCoins = 0;
var spin = true;
var rotate = 0.05;

function Coins(scene){

	var coins = new THREE.Object3D();
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


this.update = function(camera, game, keyEvent, sceneSubjects) {
	var speed = game.getSpeed();
  	var len = coins.children.length;

	for (var i = 0; i < len; i++) {
		coins.children[i].rotation.y += rotate;
		if (coins.children[i].position.z >= camera.position.z) {
			coins.children[i].position.z -= 2000;
		}
		coins.children[i].position.z += speed;
		var coinBbox = new THREE.Box3().setFromObject(coins.children[i]);

		var emrys = sceneSubjects[0];
		var emrysBbox = emrys.getBbox();
		 if ((emrysBbox).intersectsBox(coinBbox)){
		 	console.log("Coin collision");
		 	game.showHeart = true;
		 	coins.remove(coins.children[i]);
		 	if (!game.waitingRotate) game.increaseScore(20);
      else game.increaseScore(-20);
       		numCoins += 1;

	       if (numCoins%5 === 0) {
	         var randomInt = getRandomInt(0,3);
	         console.log(Math.floor(randomInt));
	         lineOfCoins(coins, Math.floor(randomInt));
	       }

	       if (numCoins%10 === 0) {
	         game.increaseSpeed(2);
	       }

		 	if (game.getScore() >= 1500){
		 		game.pause();
		 		console.log("won");
		 		game.won = true;
		 		game.waitingReplay = true;
		// 		showReplay();
		 	}
		 }
		 if (keyEvent != null) {
			 if (keyEvent.code == 'KeyC') {
				 spin = !spin;
				 if (spin) {
					 rotate = 0.05;
				 } else {
					 rotate = 0;
				 }
			 }
		 }
	}
}

function createCoin(image) {

  var coin = new THREE.Object3D();
  var coinTexture = new THREE.TextureLoader().load(image);  //'images/GN.png'
  var materials = [];
  materials.push(new THREE.MeshLambertMaterial({ color: 0xC19A6B }));
  materials.push(new THREE.MeshLambertMaterial({ map: coinTexture, transparent: false, color: 0xC19A6B }));
  materials.push(new THREE.MeshLambertMaterial({ map: coinTexture, color: 0xC19A6B }));

  var base = new THREE.Mesh(
       new THREE.CylinderGeometry(2.5, 2.5, 0.75, 64, 1),
       new THREE.MeshFaceMaterial( materials ) // color: 0xC19A6B
  );

  base.rotateX(Math.PI/2);


  coin.add(base);
  return coin;
}

// function createPaper() {
//   var paper = new THREE.Object3D();
//   var white = new THREE.MeshPhongMaterial({
//        color: "white",
//        specular: 0x080808,
//        shininess: 8,
//        shading: THREE.FlatShading
//   });
//   var stack = new THREE.Mesh(new THREE.BoxGeometry(3,0.5,2.5), white);
//   stack.position.set(0.5,1.4,0);
//   paper.add(stack);
//   return paper;
// }

function createBranch() {
  var branch = new THREE.Object3D();
  var brown = new THREE.MeshPhongMaterial({
       color: "brown",
       specular: 0x080808,
       shininess: 8,
       shading: THREE.FlatShading
  });

  var piece1 = new THREE.Mesh(new THREE.ConeGeometry(0.75,5, 32), brown);
  // var piece1 = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.5,0.5), brown);
  piece1.position.set(0.5,1.0,0);
  branch.add(piece1);

  var piece2 = new THREE.Mesh(new THREE.ConeGeometry(0.45,1.5, 32), brown);
  // var piece2 = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.5,0.5), brown);
  piece2.position.set(1.2,1.0,0);
  piece2.rotation.z = -Math.PI/3;
  branch.add(piece2);

  var piece3 = new THREE.Mesh(new THREE.ConeGeometry(0.25, 1.25, 32), brown);
  // var piece3 = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.5,0.5), brown);
  piece3.position.set(0.0,1.75,0);
  piece3.rotation.z = Math.PI/3;
  branch.add(piece3);

  return branch;
}

function lineOfCoins(model, level) {
  var num = 5; // getRandomInt(1, 10);
  var coin = createCoin(tokens[level]);
  var x = getRandomInt(-120, 120);
  var y = 15;
  var z = getRandomInt(-1500 * (level + 1), -3000 * (level + 1));
  var scale = 5;
  for (var i = 0; i < num; i++) {
    var c = coin.clone();
    c.position.x = x;
    c.position.y = y;
    c.position.z = z;
    c.scale.set(scale,scale,scale);
    model.add(c);
    z -= 50;
  }
}

function obstacle(model, level) {
  var num = 2 * (level + 1);
  var y = 40;
  var scale = 5;
  var branch = createBranch();
  for (var i = 0; i < num; i++) {
    var x = getRandomInt(-120, 120);
    var z = getRandomInt(-1500 * (level + 1), -3000 * (level + 1));
    var b = branch.clone();
    b.position.x = x;
    b.position.y = y;
    b.position.z = z;
    b.scale.set(scale, scale, scale);
    model.add(b);
  }
}

}
