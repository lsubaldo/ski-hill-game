"use strict";

var tokens = ['images/SL(1).png', 'images/FS(1).png', 'images/GN(1).png'];

var SL = 0;
var FS = 1;
var GN = 2;
var BR = 3;

function createCoin(image) {

  var coin = new THREE.Object3D();
  var coinTexture = new THREE.TextureLoader().load(image);  //'images/GN.png'
  console.log(coinTexture);
  var materials = [];
  materials.push(new THREE.MeshLambertMaterial({ color: 0xC19A6B }));
  materials.push(new THREE.MeshLambertMaterial({ map: coinTexture, transparent: false, color: 0xC19A6B }));
  materials.push(new THREE.MeshLambertMaterial({ map: coinTexture, color: 0xC19A6B }));

  var base = new THREE.Mesh(
       new THREE.CylinderGeometry(2.5, 2.5, 0.75, 64, 1),
       new THREE.MeshFaceMaterial( materials ) // color: 0xC19A6B
  );

  base.rotateX(190);

  coin.add(base);
  return coin;
}

function createPaper() {
  var paper = new THREE.Object3D();
  var white = new THREE.MeshPhongMaterial({
       color: "white",
       specular: 0x080808,
       shininess: 8,
       shading: THREE.FlatShading
  });
  var stack = new THREE.Mesh(new THREE.BoxGeometry(3,0.5,2.5), white);
  stack.position.set(0.5,1.4,0);
  paper.add(stack);
  return paper;
}

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
  // var coins = [];
  // var level = 0;
  var num = 8; // getRandomInt(1, 10);
  var coin = createCoin(tokens[level]);
  var x = getRandomInt(-120, 120);
  var y = 40;
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
    var x = getRandomInt(-140, 140);
    var z = getRandomInt(-1500 * (level + 1), -3000 * (level + 1));
    var b = branch.clone();
    b.position.x = x;
    b.position.y = y;
    b.position.z = z;
    b.scale.set(scale, scale, scale);
    model.add(b);
  }
}

// function render() {
//     renderer.render(scene, camera);
// }
//
// function updateForFrame() {
//   models[STARTER].rotation.y += 0.025;
// }
//
// function doFrame() {
//   controls.update();
//   if (animating) {
//     updateForFrame();
//   }
//   render();
//   requestAnimationFrame(doFrame);
// }
