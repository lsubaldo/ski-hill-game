function Heart(scene) {
	var heart;

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

	var redHeart = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({
          color: 0xFF0040,
          specular: 0x002000,
          shininess: 5
      }));
	redHeart.rotation.z = Math.PI; 

	var greyHeart = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({
          color: 0xFFFFFF,
          specular: 0x002000,
          shininess: 5
      }));
	greyHeart.rotation.z = Math.PI; 

	//scene.add(heart); 

	var counter = -1; 

	this.update = function(camera, game, keyEvent, sceneSubjects){
		var emrys = sceneSubjects[0].getEmrys(); 

		if (game.showHeart === "red"){
			redHeart.position.x = emrys.position.x + 23; 
			redHeart.position.y = emrys.position.y + 27; 
			redHeart.position.z = emrys.position.z; 
			if (counter == 0){
				scene.add(redHeart); 
			}
			counter ++; 

			if (counter >= 10){
				game.showHeart = null; 
				counter = 0;
				scene.remove(redHeart); 
			}
		}
		else if (game.showHeart === "grey"){
			greyHeart.position.x = emrys.position.x + 23; 
			greyHeart.position.y = emrys.position.y + 27; 
			greyHeart.position.z = emrys.position.z; 
			if (counter == 0){
				scene.add(greyHeart); 
			}
			counter ++; 

			if (counter >= 10){
				game.showHeart = null; 
				counter = 0;
				scene.remove(greyHeart); 
			}
		}
		

	}

}