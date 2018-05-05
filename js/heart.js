function createHeart() {
	var x = 0, y = 0;
	var heartShape = new THREE.Shape(); // From http://blog.burlock.org/html5/130-paths
	heartShape.moveTo( x + 2.5, y + 2.5 );
	heartShape.bezierCurveTo( x + 2.5, y + 2.5, x + 2.0, y, x, y );
	heartShape.bezierCurveTo( x - 3.0, y, x - 3.0, y + 3.5, x - 3.0, y + 3.5 );
	heartShape.bezierCurveTo( x - 3.0, y + 5.5, x - 1.0, y + 7.7, x + 2.5, y + 9.5 );
	heartShape.bezierCurveTo( x + 6.0, y + 7.7, x + 8.0, y + 5.5, x + 8.0, y + 3.5 );
	heartShape.bezierCurveTo( x + 8.0, y + 3.5, x + 8.0, y, x + 5.0, y );
	heartShape.bezierCurveTo( x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5 );
	var extrudeSettings = { amount: 2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

	var geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );

	var heart = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({
          color: 0xFF0040,
          specular: 0x002000,
          shininess: 5
      }));
	heart.rotation.z = Math.PI; 

	return heart; 

}