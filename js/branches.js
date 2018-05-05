function Branches(scene){

    var branches = new THREE.Object3D();


    obstacle(branches, 0);
    obstacle(branches, 1);
    obstacle(branches, 2);
    obstacle(branches, 0);
    obstacle(branches, 1);

    scene.add(branches);

this.update = function(camera, game, keyEvent, sceneSubjects){
  for (var i = 0; i < branches.children.length; i++) {
    if (branches.children[i].position.z >= camera.position.z) {
      branches.children[i].position.z -= 2000;
    }
    branches.children[i].position.z += game.getSpeed();
    var branchBbox = new THREE.Box3().setFromObject(branches.children[i]);

    var emrys = sceneSubjects[0];
    var emrysBbox = emrys.getBbox();
     if ((emrysBbox).intersectsBox(branchBbox)){
       console.log("Branch collision");
       game.rotateEmrys = true;
       game.waitingRotate = true;

       branches.remove(branches.children[i]);
       game.increaseScore(-10);
       game.increaseSpeed(-1);
       game.increaseHit(1);

      if (game.getHit()%5 === 0) {
        var randomInt = getRandomInt(0,3);
        obstacle(branches, Math.floor(randomInt));
      }

       if (game.getHit() >= 10){
         game.pause();
         console.log("lose");
         game.won = false;
         game.waitingReplay = true;
    //     showReplay();
       }
     }
  }
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
