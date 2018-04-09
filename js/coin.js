function createCoin() {

  var coin = new THREE.Object3D();
  var coinTexture = THREE.ImageUtils.loadTexture('images/GN.png');
  var materials = [];

  materials.push(new THREE.MeshLambertMaterial({ color: 0xC19A6B }));
  materials.push(new THREE.MeshLambertMaterial({ map: coinTexture, transparent: false, color: 0xC19A6B }));
  materials.push(new THREE.MeshLambertMaterial({ color: 0xC19A6B }));
  // materials.push(new THREE.MeshLambertMaterial({ color: 0xC19A6B }));
  // materials.push(new THREE.MeshLambertMaterial({ color: 0xC19A6B }));
  // materials.push(new THREE.MeshLambertMaterial({ map: coinTexture }));
  // materials.push(new THREE.MeshLambertMaterial({ map: coinTexture, color: 0xC19A6B }));
  // materials.push(new THREE.MeshLambertMaterial({ color: 0xC19A6B }));
  // materials.push(new THREE.MeshLambertMaterial({ color: 0xC19A6B }));

  // The base of the world; everything else is on the top of this cylinder.
  var base = new THREE.Mesh(
       new THREE.CylinderGeometry(5, 5, 0.75, 64, 1),
       new THREE.MeshFaceMaterial( materials ) // color: 0xC19A6B
  );

  coin.add(base);

  return coin;

}
