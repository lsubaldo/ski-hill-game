var loader = new THREE.TextureLoader();
var particleSystem;
var particleCount;
var velocity = new THREE.Vector3(0, 0, 0);
//allow cross origin loading
loader.crossOrigin = true;
var particles = new THREE.Geometry(),
    pMaterial = new THREE.PointsMaterial({
	  color: 0xFFFFFF,
	  size: 10,
	  map: loader.load( 'images/particle.png' ),
		blending: THREE.AdditiveBlending,
		transparent: true
		});

function updateParticles() {
  particleSystem.rotation.x += 0.01;
	particleSystem.rotation.y += 0.01;
	particleSystem.rotation.z += 0.01;

  var pCount = particleCount-1;
  while (pCount && pCount >= 0) {
    // get the particle
    var particle = particles.vertices[pCount];
		//console.log(particle);
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

function createParticles(count, img) {
  particleCount = count;
  particleSystem = new THREE.Points(particles, pMaterial);
  for (var p = 0; p < particleCount; p++) {
    var pX = Math.random() * 500 - 250,
        pY = Math.random() * 500 - 250,
        pZ = Math.random() * 500 - 250,
        particle = new THREE.Vector3(pX, pY, pZ);

    // add it to the geometry
    particles.vertices.push(particle);
  }
  particleSystem.sortParticles = true;
  return particleSystem
}
