/* This is a starter file for experimenting with 3D animated models in three.js.
 * The user can rotate the model using the keyboard, and can turn animation on and off.

 * As an example, it shows  a sphere rotating around a cube.
 *
 * To make your own model, add any global variables that you need for animating the model,
 * build the model in the createWorld() function, and update the animation variables in
 * the updateForFrame() function.
 *
 */

"use strict";

var container, scene, camera, renderer, controls;  // Three.js rendering basics.

var canvas;  // The canvas on which the image is rendered.


var STARTER = 0;
var PINE = 1;
var AXLE = 2;
var CAR = 3;
var WORLD = 4;

// Contains the visible objects in the scene, but not the lights or camera.
// The current model can be rotated using the keyboard.
var models = [];

// Index of the current visible objects in the scene: one of the many models
// defined by the above constant
var currentModel = STARTER;


// Nodes in the scene graphs that are modified as part of the animation:
//var sphereRotator;  // The sphere is a child of this object; rotating
                    // this object about the y-axis rotates the sphere.

var animating = false;  // This is set to true when an animation is running.


// what is it?
function createStarter() {

  var model = new THREE.Object3D();

  model.add( new THREE.Mesh(  // add a big cube at the origin; the cube is not animated
      new THREE.BoxGeometry(3,3,3),
    new THREE.MeshLambertMaterial({ color: 0xff7700 })
  ));

  model.add( new THREE.Mesh(  // A tall narrow cylinder on the axis of rotation
        new THREE.CylinderGeometry(0.3,0.3,8),
    new THREE.MeshLambertMaterial({ color: 0x0000AA })
  ));

  var sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1,32,16),
    new THREE.MeshPhongMaterial({
         color: "green",
      specular: 0x101010,
      shininess: 32
    })
  );
  sphere.position.x = 4;
  sphereRotator = new THREE.Object3D();
  sphereRotator.add(sphere);
  model.add(sphereRotator);

  // Tip it forward a bit, so we're not looking at it edge-on.
  model.rotation.set(0.2,0,0);
  return model;
}


// not best but because part of Axle and also Headlight
  var yellow = new THREE.MeshPhongMaterial({
        color: 0xffff00,
      specular: 0x101010,
      shininess: 16
    });


function createAxle() {
  // Create the wheels and axles.

  // Tire, the wheel object also contains the spokes
  var wheel = new THREE.Mesh(
    new THREE.TorusGeometry(0.75, 0.25, 16, 32),
    new THREE.MeshLambertMaterial({ color: 0x0000A0 })
  );


  // a yellow cylinder with height 1 and diameter 1
  var cylinder = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5,0.5,1,32,1),
    yellow
  );
  // Make it thin and long for use as a spoke
  cylinder.scale.set(0.15,1.2,0.15);
  // Add a copy of the cylinder
  wheel.add(cylinder.clone());
  // Add a rotation about the z-axis for the second spoke
  cylinder.rotation.z = Math.PI/3;
  wheel.add(cylinder.clone());
  // For third spoke, use a negative rotation about z-axis
  cylinder.rotation.z = -Math.PI/3;
  wheel.add(cylinder.clone());

  // A model containing two wheels and a cylinder.
  var axleModel = new THREE.Object3D();
  // scale the cylinder for use as an axle
  cylinder.scale.set(0.2,4.3,0.2);
  // rotate its axis onto the z-axis
  cylinder.rotation.set(Math.PI/2,0,0);
  axleModel.add(cylinder);

  // the wheels are positioned at the top and bottom of cylinder
  wheel.position.z = 2;
  axleModel.add(wheel.clone());
  wheel.position.z = -2;
  axleModel.add(wheel);

  return axleModel;
}

function createCar(axleModel) {
  // Create a car, consisting of two boxes, two spheres for the headlights, and two axles.
  var carModel = new THREE.Object3D();
  var red = new THREE.MeshPhongMaterial({
       color: "red",
       specular: 0x080808,
       shininess: 8,
       shading: THREE.FlatShading
  });

   var body = new THREE.Mesh(new THREE.BoxGeometry(6,1.2,3), red);
   body.position.y = 0.6;

   var hood = new THREE.Mesh(new THREE.BoxGeometry(3,1,2.8), red);
   hood.position.set(0.5,1.4,0);

   var headlight1 = new THREE.Mesh(new THREE.SphereGeometry(1,16,8), yellow);
   headlight1.scale.set(0.1,0.25,0.25);
   headlight1.position.set(-3,0.6,-1);
   var headlight2 = headlight1.clone();
   headlight1.position.set(-3,0.6,1);

   // need to retrieve to animate
   var carAxle1 = axleModel.clone();
   carAxle1.position.x = -2.5;
   var carAxle2 = axleModel.clone();
   carAxle2.position.x = 2.5;

   // 0 and 1st children of carModel!
   carModel.add(carAxle1);
   carModel.add(carAxle2);
   carModel.add(body);
   carModel.add(hood);
   carModel.add(headlight1);
   carModel.add(headlight2);
   return carModel;
}


/*  Create the scene graph.  This function is called once, as soon as the page loads.
 *  The renderer has already been created before this function is called.
 */
function createScene() {
  // Set background color.
  renderer.setClearColor( 0xBBBBBB );
  scene = new THREE.Scene();

  // create a camera, sitting on the positive z-axis.  The camera is not part of the scene.
  camera = new THREE.PerspectiveCamera(45, canvas.width/canvas.height, 1, 30);
  camera.position.z = 15;

  controls = new THREE.OrbitControls( camera, renderer.domElement );

  // create some lights and add them to the scene.

  // dim light shining from above
  scene.add( new THREE.DirectionalLight( 0xffffff, 0.4 ) );
  // a light to shine in the direction the camera faces
  var viewpointLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
  viewpointLight.position.set(0,0,1);  // shines down the z-axis
  scene.add(viewpointLight);

  var bottomlight = new THREE.DirectionalLight( 0xffffff, 0.8 );
  bottomlight.position.set(0,-1,0);
  scene.add(bottomlight);

  // create the model
  var model = createCoin('images/GN.png'); // 'images/GN.png'
  scene.add(model);

  models[STARTER] = model;

  // create another model
  var axleModel = createAxle();
  models[AXLE] = axleModel;

  var car = createCar(axleModel);

  // Needs to be bigger when it's displayed alone. Need to be done after the car creation!
  axleModel.scale.set(2,2,2);
  models[CAR] = car;

  var world = createWorld();
  models[WORLD] = world;

  doFrame();
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
          color: 0x00BB00,
          specular: 0x002000,
          shininess: 5
      })
  );
  leaves.position.y = 2;  // move bottom of cone to top of trunk

  tree.add(trunk);
  tree.add(leaves);
  return tree;
}

function getRandomInt(min, max) {
  return Math.random() * (max - min) + min; //The maximum is exclusive and the minimum is inclusive
}

function createWorld() {
   // Create the main diskworld model.
   var diskworldModel = new THREE.Object3D();

   // The base of the world; everything else is on the top of this cylinder.
   var middle = new THREE.Mesh(
        // new THREE.PlaneGeometry(5.5, 10, 32),
        new THREE.PlaneGeometry(5,10,4,4),
        new THREE.MeshBasicMaterial( { color: 0x00CC55, side: THREE.DoubleSide } )
   );

   var boundary1 = new THREE.Mesh(
        // new THREE.PlaneGeometry(5.5, 10, 32),
        new THREE.PlaneGeometry(3,10,4,4),
        new THREE.MeshBasicMaterial( { color: 0x00CC55, side: THREE.DoubleSide } )
   );

   //53D989
   // var ground2 = ground.clone();
   var boundary2 = boundary1.clone();

   // var ground = new THREE.Object3D();

   boundary1.position.x = -4;
   boundary2.position.x = 4;

   middle.rotation.x = -Math.PI/2;
   boundary1.rotation.x = -Math.PI/2;
   boundary2.rotation.x = -Math.PI/2;

   // ground.add(middle, boundary1, boundary2);

   diskworldModel.add(middle, boundary1, boundary2);

   var tree = createTree();
   for (var i = 0; i < 15; i++) {
     var newTree = tree.clone();
     var x = getRandomInt(-6,-2.5);
     var y = 0.01;
     var z = getRandomInt(-5,5);
     var scale = 1;
     newTree.position.x = x;
     newTree.position.y = y;
     newTree.position.z = z;
     newTree.scale.set(scale,scale,scale);
     diskworldModel.add(newTree);
   }

   for (var i = 0; i < 15; i++) {
     var newTree = tree.clone();
     var x = getRandomInt(2.5,6);
     var y = 0.01;
     var z = getRandomInt(-5,5);
     var scale = 1;
     newTree.position.x = x;
     newTree.position.y = y;
     newTree.position.z = z;
     newTree.scale.set(scale,scale,scale);
     diskworldModel.add(newTree);
   }

   // diskworldModel.add(tree);
   // diskworldModel.add(newTree);
   return diskworldModel;

}


/*  Render the scene.  This is called for each frame of the animation.
 */
function render() {
    renderer.render(scene, camera);
}


/*  When an animation is in progress, this function is called just before rendering each
 *  frame of the animation, to make any changes necessary in the scene graph to prepare
 *  for that frame.
 */
function updateForFrame() {
  if (currentModel == AXLE) {
    models[AXLE].rotation.z += 0.05;
  }
  else if (currentModel == CAR) {
    var ax1 = models[CAR].children[0];
    var ax2 = models[CAR].children[1];
    ax1.rotation.z += 0.05;
    ax2.rotation.z += 0.05;
  }
  else if (currentModel == WORLD) {
    var rotator = models[WORLD].children;


    // Need to be able to reuse objects, so that you don't
    // have to keep on creating more
    for (var i=0; i<rotator.length; i++) {
      rotator[i].position.z += 0.05;
    }

    // OOP would be better
    // var rotator = models[WORLD].children[2];
    // var car = rotator.children[0];
    // car.children[0].rotation.z += 0.05;
    // car.children[1].rotation.z += 0.05;

    //global variables as below are BAD; use the SCENE graph structure
    //diskworldAxle2.rotation.z += 0.05;
    // rotator.rotation.y += 0.007;

  } else {
    //sphereRotator.rotation.y += 0.03;
  }
}


//--------------------------- animation support -----------------------------------

/* This function runs the animation by calling updateForFrame() then calling render().
 * Finally, it arranges for itself to be called again to do the next frame.  When the
 * value of animating is set to false, this function does not schedule the next frame,
 * so the animation stops.
 */
function doFrame() {
  controls.update();
  if (animating) {
    updateForFrame();
  }
  render();
  requestAnimationFrame(doFrame);
}


/* Responds when the setting of the "Animate" checkbox is changed.
 * This function will start or stop the animation, depending on its setting.
 */
function doAnimateCheckbox() {
   var anim = document.getElementById("animate").checked;
   if (anim != animating) {
      animating = anim;
      if (animating) {
         doFrame();
      }
   }
}



//----------------------------- keyboard support ----------------------------------

/*  Responds to user's key press.  Here, it is used to rotate the model.
 */
function doKey(event) {
  var code = event.code;
  var rotated = true;
  switch( code ) {
      case "ArrowLeft": models[currentModel].rotation.y -= 0.03;  break;    // left arrow
      case "ArrowRight":  models[currentModel].rotation.y +=  0.03; break;    // right arrow
      case "ArrowUp":  models[currentModel].rotation.x -= 0.03;  break;    // up arrow
      case "ArrowDown":  models[currentModel].rotation.x += 0.03;  break;    // down arrow
      case "PageUp":  models[currentModel].rotation.z -= 0.03;  break;    // page up
      case "PageDown":  models[currentModel].rotation.z += 0.03;  break;    // page down
      case "Home":  models[currentModel].rotation.set(0.2,0,0); break;  // home
      default: rotated = false;
  }
  if (rotated) {
    event.preventDefault();  // Prevent keys from scrolling the page.
    if (!animating) { // (if an animation is running, no need for an extra render)
      render();
    }
  }
}


//------------------ handle the radio buttons that select the model-------------------------

/*  Changes the model that is displayed, when the user changes the setting of
 *  radio buttons that are used to select the model.  The model is reset to
 *  its initial rotation.
 */

function doChangeModel() {
   var axle = document.getElementById("axle").checked;
   var car = document.getElementById("car").checked;
   var diskworld = document.getElementById("diskworld").checked;

   var newModel = axle ? AXLE : car ? CAR : diskworld ? WORLD : STARTER;

   if (newModel != currentModel) {
      scene.remove(models[currentModel]);
      currentModel = newModel;
      models[currentModel].rotation.set(0.2,0,0);
      scene.add( models[currentModel]);
      if (!animating) {
         render();
      }
   }
}

//----------------------------------------------------------------------------------

/**
 *  This init() function is called when by the onload event when the document has loaded.
 */
function init() {
  try {
    canvas = document.getElementById("glcanvas");
    renderer = new THREE.WebGLRenderer( {
        canvas: canvas,
        antialias: true
    } );
  }
  catch (e) {
    document.getElementById("canvas-holder").innerHTML =
             "<h3><b>Sorry, WebGL is required but is not available.</b><h3>";
    return;
  }

  document.addEventListener("keydown", doKey, false);
  document.getElementById("animate").checked = false;
  document.getElementById("animate").onchange = doAnimateCheckbox;
  document.getElementById("starter").checked = true;

  document.getElementById("axle").onchange = doChangeModel;
  document.getElementById("car").onchange = doChangeModel;
  document.getElementById("diskworld").onchange = doChangeModel;
  document.getElementById("starter").onchange = doChangeModel;

  createScene();
  render();
}
