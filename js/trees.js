"use strict";

function Trees(scene) {

  var trees = [];

  var tree = createTree();
  for (var i = 0; i < 400; i++) {
    var newTree = tree.clone();
    var x = getRandomInt(-300,-150);
    var y = 0.01;
    var z = getRandomInt(-2000,300);
    var scale = 30;
    newTree.position.x = x;
    newTree.position.y = y;
    newTree.position.z = z;
    newTree.scale.set(scale,scale,scale);
    newTree.rotation.x = Math.PI/6;
    trees.push(newTree);
  }

  for (var i = 0; i < 400; i++) {
    var newTree = tree.clone();
    var x = getRandomInt(150,300);
    var y = 0.01;
    var z = getRandomInt(-2000,300);
    var scale = 30;
    newTree.position.x = x;
    newTree.position.y = y;
    newTree.position.z = z;
    newTree.scale.set(scale,scale,scale);
    newTree.rotation.x = Math.PI/6;
    trees.push(newTree);
  }

  for (var i=0; i<trees.length; i++) {
    scene.add(trees[i]);
  }

  this.update = function(camera, game, keyEvent, sceneSubjects){
    var speed = game.getSpeed(); 

    for (var i=0; i<trees.length; i++) {
      if (trees[i].position.z >= camera.position.z ) {
        trees[i].position.z -= 2000;
      }
      trees[i].position.z += speed;
    }
  }

}

function getRandomInt(min, max) {
  return Math.random() * (max - min) + min; //The maximum is exclusive and the minimum is inclusive
}

function createTree() {
  var tree = new THREE.Object3D();

  var trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2,0.2,1,16,1),
      new THREE.MeshLambertMaterial({
          color: 0x885522
      })
  );
  trunk.position.y = 0.5;  // move base up to origin

  var leaves = new THREE.Mesh(
      new THREE.ConeGeometry(.7,2,16,3),
      new THREE.MeshPhongMaterial({
          color: 0xA5B8BF,
          specular: 0x002000,
          shininess: 5
      })
  );
  leaves.position.y = 2;  // move bottom of cone to top of trunk

  var snow = new THREE.Mesh(
      new THREE.ConeGeometry(.25,0.5,16,3),
      new THREE.MeshPhongMaterial({
          color: 0xFFFFFF,
          specular: 0x002000,
          shininess: 5
      })
  );
  snow.position.y = 2.73;

  tree.add(trunk);
  tree.add(leaves);
  tree.add(snow);
  return tree;
}


