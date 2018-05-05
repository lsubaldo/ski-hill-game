function Particles(scene){
	var loader = new THREE.TextureLoader();
	var particleSystem;
	var particleCount = 900,

    particles = new THREE.Geometry(),
    pMaterial = new THREE.PointsMaterial({
	  color: 0xFFFFFF,
	  size: 10,
	  map: loader.load( 'images/particle.png' ),
		blending: THREE.AdditiveBlending,
		transparent: true
		});

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

	scene.add(particleSystem);

	this.update = function(camera, game, keyEvent, sceneSubjects){
		var velocity = new THREE.Vector3(0, 0, 0);
		console.log("updating particles");
		particleSystem.rotation.x += 0.01;
		particleSystem.rotation.y += 0.01;
		particleSystem.rotation.z += 0.01;

		  var pCount = particleCount--;
			while (pCount && pCount >= 0) {
			// get the particle
			var particle = particles.vertices[pCount];
			// check if we need to reset
			if (particle.x < -200) {
				particle.x = 200;
			}

			// update the velocity with
			// a splat of randomniz
			velocity.x -= Math.random() * .1;

			// and the position
			particle.add(velocity);

			pCount--;
		}
		// flag to the particle system
		// that we've changed its vertices.
		particleSystem.geometry.__dirtyVertices = true;
		}

}
