"use strict";

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

function generateRandomTrees() {
  var trees = [];

  var tree = createTree();
  for (var i = 0; i < 400; i++) {
    var newTree = tree.clone();
    var x = getRandomInt(-300,-150);
    var y = 0.01;
    var z = getRandomInt(-2000,2000);
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
    var z = getRandomInt(-2000,2000);
    var scale = 30;
    newTree.position.x = x;
    newTree.position.y = y;
    newTree.position.z = z;
    newTree.scale.set(scale,scale,scale);
    newTree.rotation.x = Math.PI/6;
    trees.push(newTree);
  }

  return trees;
}

function createPlanes(diskworldModel) {
  // var ground = new THREE.Object3D();
  var middle = new THREE.Mesh(
       // new THREE.PlaneGeometry(5.5, 10, 32),
       new THREE.PlaneGeometry(5,20,4,4),
       new THREE.MeshBasicMaterial( { color: 0x53D989, side: THREE.DoubleSide } )
  );

  var boundary1 = new THREE.Mesh(
       // new THREE.PlaneGeometry(5.5, 10, 32),
       new THREE.PlaneGeometry(3,20,4,4),
       new THREE.MeshBasicMaterial( { color: 0x00CC55, side: THREE.DoubleSide } )
  );

  //53D989
  // var ground2 = ground.clone();
  var boundary2 = boundary1.clone();

  boundary1.position.x = -4;
  boundary2.position.x = 4;

  middle.rotation.x = -Math.PI/2;
  boundary1.rotation.x = -Math.PI/2;
  boundary2.rotation.x = -Math.PI/2;

  diskworldModel.add(middle, boundary1, boundary2);
  return diskworldModel;
}

function createWorld() {
   // Create the main diskworld model.
   var diskworldModel = new THREE.Object3D();

   createPlanes(diskworldModel);
   generateRandomTrees(diskworldModel);

   return diskworldModel;
}
