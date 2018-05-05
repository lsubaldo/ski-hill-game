"use strict";

function Emrys(scene){

  var emrys = createEmrys(); 
  var rotationCounter = 0; 

  var rotateLeft = false; 
  var rotateRight = false; 

  //set emrys to fit in the scene
  emrys.position.y+=20;
  emrys.position.z+=100;
  emrys.scale.set(10,10,10);

  scene.add(emrys);

  //lights
    var frontLight = new THREE.SpotLight(0x808080, 2, 200, 1.2, 0, 1);
    frontLight.position.set(0,60,-20);
    scene.add(frontLight);
    var frontLight_helper = new THREE.SpotLightHelper( frontLight );
    scene.add( frontLight_helper );

    var backLight = new THREE.SpotLight(0x808080, 2, 200, 0.5, 0, 1);
    backLight.position.set(0,60,180);
    scene.add(backLight);
    var backLight_helper = new THREE.SpotLightHelper( backLight );
    scene.add( backLight_helper ); 

  //bounding box
  var boundingBoxHelper = new THREE.BoxHelper( emrys, 0xffff00 );
  var emrysBbox = new THREE.Box3().setFromObject(emrys);
  scene.add( boundingBoxHelper );

  this.getEmrys = function(){
    return emrys; 
  }

  this.getBbox = function(){
    return emrysBbox; 
  }

  this.update = function(camera, game, keyEvent, sceneSubjects){
    if (keyEvent != null){
      if (game.waitingRotate){
        if (keyEvent.code == 'ArrowRight'){
          game.waitingRotate = false; 
          rotateRight = true; 
          rotateLeft = false; 
        }
        if (keyEvent.code == 'ArrowLeft'){
          game.waitingRotate = false; 
          rotateLeft = true; 
          rotateRight = false; 
        }
      }

      else {
        if (keyEvent.code == 'ArrowRight') {emrys.position.x += 10}
        else if (keyEvent.code == 'ArrowLeft') {emrys.position.x -= 10}
        if (emrys.position.x > 100) {emrys.position.x = 100}
        else if (emrys.position.x < -100) {emrys.position.x = -100}
      }
    }

    if (game.rotateEmrys) {
      if (rotationCounter < 10){
        emrys.rotation.y = (emrys.rotation.y + Math.PI/10) % (2*Math.PI);
      }
      else {
        game.waitingRotate = true; 
        if (rotateRight) emrys.rotation.y = (emrys.rotation.y + Math.PI/10) % (2*Math.PI);
        else if (rotateLeft) emrys.rotation.y = (emrys.rotation.y - Math.PI/10);

      }
        rotationCounter += 1;
    }

    //console.log(rotationCounter);
    if (emrys.rotation.y == Math.PI || emrys.rotation.y == -Math.PI) {
      game.rotateEmrys = false;
      rotationCounter = 0;
      rotateRight = false; 
      rotateLeft = false;
    }

    //update lights and bounding box helper
    frontLight.position.x = emrys.position.x;
    backLight.position.x = emrys.position.x;
    emrysBbox.setFromObject(emrys); 
    boundingBoxHelper.update(); 
  }


  function createEmrys(){
      var colors = {
        yellow: 0xfdd276,
        red: 0xad3525,
        pink: 0xe55d2b,
        white: 0xffffff,
        purple: 0x451954,
        grey: 0x653f4c,
        black: 0x302925
      };

      var emrysOnSled = new THREE.Object3D();

      var emrys = new THREE.Object3D();

      var yellowMat = new THREE.MeshLambertMaterial ({
        color: colors.yellow,
        shading:THREE.FlatShading
      });
      var redMat = new THREE.MeshLambertMaterial ({
        color: colors.red,
        shading:THREE.FlatShading
      });

      var pinkMat = new THREE.MeshLambertMaterial ({
        color: colors.pink,
        shading:THREE.FlatShading
      });

      var whiteMat = new THREE.MeshLambertMaterial ({
        color: colors.white,
        shading:THREE.FlatShading
      });

      var purpleMat = new THREE.MeshLambertMaterial ({
        color: colors.purple,
        shading:THREE.FlatShading
      });

      var greyMat = new THREE.MeshLambertMaterial ({
        color: colors.grey,
        shading:THREE.FlatShading
      });

      var blackMat = new THREE.MeshLambertMaterial ({
        color: colors.black,
        shading:THREE.FlatShading
      });


      //var bodyGeom = new THREE.CylinderGeometry(30,80, 140, 4);
      var maneGeom = new THREE.BoxGeometry(40,40,15);
      //var faceGeom = new THREE.BoxGeometry(80,80,80);
      var spotGeom = new THREE.BoxGeometry(4,4,4);
      var mustacheGeom = new THREE.BoxGeometry(30,2,1);
      mustacheGeom.applyMatrix( new THREE.Matrix4().makeTranslation( 15, 0, 0 ) );

      //var earGeom = new THREE.BoxGeometry(20,20,20);
      //var noseGeom = new THREE.BoxGeometry(40,40,20);
      //var eyeGeom = new THREE.BoxGeometry(5,30,30);
      //var irisGeom = new THREE.BoxGeometry(4,10,10);
      var mouthGeom = new THREE.BoxGeometry(20,20,10);
      var smileGeom = new THREE.TorusGeometry( 12, 4, 2, 10, Math.PI );
      var lipsGeom = new THREE.BoxGeometry(40,15,20);
      //var kneeGeom = new THREE.BoxGeometry(25, 80, 80);
      //kneeGeom.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 50, 0 ) );
      //var footGeom = new THREE.BoxGeometry(40, 20, 20);


      var faceGeom = new THREE.BoxGeometry(1.4, 1.4, 1.4);
      var eyeGeom = new THREE.BoxGeometry(0.4, 0.4, 0.4);
      var irisGeom = new THREE.CylinderGeometry(0.1,0.2,0.2, 20);
      var earGeom = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      var noseGeom = new THREE.BoxGeometry(0.2,0.2,0.2);

      var bodyGeom = new THREE.ConeGeometry(0.9, 3, 7);
      var bodyGeom2 = new THREE.SphereGeometry(0.8, 6, 6);
      var tailGeom = new THREE.CylinderGeometry(0.15, 0.2, 0.7);
      var tail2Geom = new THREE.ConeGeometry(0.18, 0.7, 10);

      var kneeGeom = new THREE.BoxGeometry(0.4, 0.8, 0.4);
      var footGeom = new THREE.BoxGeometry(0.5, 0.3, 0.3);


      //face
      var face = new THREE.Mesh(faceGeom, yellowMat);
      face.position.y = 1;
      face.position.z = 0.2;
      emrys.add(face);

      //ear
      var leftEar = new THREE.Mesh(earGeom, yellowMat);
      leftEar.position.x = -0.8;
      leftEar.position.y = 1.9;
      leftEar.position.z = -0.2;
      emrys.add(leftEar);

      var rightEar = new THREE.Mesh(earGeom, yellowMat);
      rightEar.position.x = 0.8;
      rightEar.position.y = 1.9;
      rightEar.position.z = -0.2;
      emrys.add(rightEar);

      // eyes
      var irisGeom2 = new THREE.CylinderGeometry(0.25,0.2,0.2, 20);
      var e = new THREE.Mesh(irisGeom2, whiteMat);
      e.position.x = 0.4;
      e.position.y = 1.2;
      e.position.z = 0.9;
      e.rotation.x = 1.5;
      emrys.add(e);

      var rightEye = new THREE.Mesh(irisGeom2, whiteMat);
      rightEye.position.x = -0.4;
      rightEye.position.y = 1.2;
      rightEye.position.z = 0.9;
      rightEye.rotation.x = 1.5;
      emrys.add(rightEye);


      // iris
      var leftIris = new THREE.Mesh(irisGeom, greyMat);
      leftIris.position.x = 0.4;
      leftIris.position.y = 1.2;
      leftIris.position.z = 0.95;
      leftIris.rotation.x = 1.5;
      emrys.add(leftIris);

      var rightIris = new THREE.Mesh(irisGeom, greyMat);
      rightIris.position.x = -0.4;
      rightIris.position.y = 1.2;
      rightIris.position.z = 0.95;
      rightIris.rotation.x = 1.5;
      emrys.add(rightIris);

      //nose
      var nose = new THREE.Mesh(noseGeom, greyMat);
      nose.position.x = 0;
      nose.position.y = 0.8;
      nose.position.z = 0.9;
      emrys.add(nose);

      // body
      var body = new THREE.Mesh(bodyGeom, yellowMat);

      /*
      var body = new THREE.Mesh(bodyGeom2, yellowMat);
      body.position.x = 0;
      body.position.y = -0.4;
      body.position.z = 0.1;
      body.scale.set(1, 1.2, 1);
      */

      /*
      body.position.z = -60;
      body.position.y = -30;
      var bodyVertices = [0,1,2,3,4,10];

      for (var i=0;i<bodyVertices.length; i++){
        var tv = this.body.geometry.vertices[this.bodyVertices[i]];
        tv.z =70;
        tv.x = 0;
        this.bodyInitPositions.push({x:tv.x, y:tv.y, z:tv.z});
      }*/

      emrys.add(body);

      //tail
      var tail = new THREE.Mesh(tailGeom, yellowMat);
      tail.position.x = 0;
      tail.position.y = -1.2;
      tail.position.z = -1;
      tail.rotation.x = -1;
      emrys.add(tail);

      var tail2 = new THREE.Mesh(tail2Geom, yellowMat);
      tail2.position.x = 0;
      tail2.position.y = -0.8;
      tail2.position.z = -1.35;
      tail2.rotation.x = -0.5;
      emrys.add(tail2);

      // knee
      var leftKnee = new THREE.Mesh(kneeGeom, yellowMat);

      leftKnee.position.x = -1;
      leftKnee.position.y = -0.9;
      leftKnee.position.z = 0.3;
      leftKnee.rotation.z = .3;
      emrys.add(leftKnee);

      var rightKnee = new THREE.Mesh(kneeGeom, yellowMat);
      rightKnee.position.x = 1;
      rightKnee.position.y = -0.9;
      rightKnee.position.z = 0.3;
      rightKnee.rotation.z = -.3;
      emrys.add(rightKnee);


      // feet
      var backLeftFoot = new THREE.Mesh(footGeom, yellowMat);
      backLeftFoot.position.x = -1;
      backLeftFoot.position.y = -1.3;
      backLeftFoot.position.z = 0.3;

      emrys.add(backLeftFoot);

      var backRightFoot = new THREE.Mesh(footGeom, yellowMat);
      backRightFoot.position.x = 1;
      backRightFoot.position.y = -1.3;
      backRightFoot.position.z = 0.3;

      emrys.add(backRightFoot);


      var frontRightFoot = new THREE.Mesh(footGeom, yellowMat);
      frontRightFoot.position.x = -0.3;
      frontRightFoot.position.y = -1.3;
      frontRightFoot.position.z = 0.9;

      emrys.add(frontRightFoot);

      var frontLeftFoot = new THREE.Mesh(footGeom, yellowMat);
      frontLeftFoot.position.x = 0.3;
      frontLeftFoot.position.y = -1.3;
      frontLeftFoot.position.z = 0.9;

      emrys.add(frontLeftFoot);

      emrysOnSled.add(emrys);




      //sled
      var sled = new THREE.Object3D();

      var maroonMat = new THREE.MeshLambertMaterial ({
        color: 0x800000,
        shading:THREE.FlatShading,
        side: THREE.DoubleSide
      });


      var botGeom = new THREE.CylinderGeometry(2, 2, 0.3, 20);

      var bot = new THREE.Mesh(botGeom, maroonMat);
      bot.position.x = 0;
      bot.position.y = -1.6;
      bot.position.z = 0;
      bot.scale.set(1, 1, 1.6);
      sled.add(bot);

      var points = [];
      for ( var i = 0; i < 10; i ++ ) {
        points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
      }
      var edgeGeom1 = new THREE.LatheGeometry(points, 6, -0.64, 1.2);

      var edge1 = new THREE.Mesh(edgeGeom1, maroonMat);
      edge1.position.x = 0;
      edge1.position.y = -1.8;
      edge1.position.z = -2;
      edge1.scale.set(0.2, 0.1, 0.35);
      sled.add(edge1);

      var edgeGeom2 = new THREE.LatheGeometry(points, 6, 2.6, 1);

      var edge2 = new THREE.Mesh(edgeGeom2, maroonMat);
      edge2.position.x = -0.1;
      edge2.position.y = -1.8;
      edge2.position.z = 1.9;
      edge2.scale.set(0.2, 0.1, 0.35);
      sled.add(edge2);

      emrysOnSled.add(sled);

      emrysOnSled.rotation.y = Math.PI;

      return emrysOnSled; 

  }

}
