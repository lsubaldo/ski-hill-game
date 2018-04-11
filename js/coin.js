function createCoin(image) {

  var coin = new THREE.Object3D();
  // var coinTexture = THREE.ImageUtils.loadTexture(image);  //'images/GN.png'

  var materials = [];
  materials.push(new THREE.MeshLambertMaterial({ color: 0xC19A6B }));
  materials.push(new THREE.MeshLambertMaterial({ color: 0xC19A6B }));
  materials.push(new THREE.MeshLambertMaterial({ color: 0xC19A6B }));
  // materials.push(new THREE.MeshLambertMaterial({ map: coinTexture, transparent: false, color: 0xC19A6B }));
  // materials.push(new THREE.MeshLambertMaterial({ map: coinTexture, color: 0xC19A6B }));

  var base = new THREE.Mesh(
       new THREE.CylinderGeometry(5, 5, 0.75, 64, 1),
       new THREE.MeshFaceMaterial( materials ) // color: 0xC19A6B
  );

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

  // var piece4 = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.5,0.5), brown);
  // piece4.position.set(2.0,1.2,0);
  // branch.add(piece4);

  // var piece5 = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.5,0.5), brown);
  // piece5.position.set(2.5,1.3,0);
  // branch.add(piece5);

  // var piece6 = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.5,0.5), brown);
  // piece6.position.set(3.0,1.4,0);
  // branch.add(piece6);

  // var piece7 = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.5,0.5), brown);
  // piece7.position.set(2.0,0.8,0);
  // branch.add(piece7);

  // var piece8 = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.5,0.5), brown);
  // piece8.position.set(2.5,0.6,0);
  // branch.add(piece8);

  return branch;
}
