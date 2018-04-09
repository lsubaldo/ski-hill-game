

function createEmrys(){

  var emrys = new THREE.Object3D();

  var bodyInitPositions = [];
  var maneParts = [];
  // var threegroup = new THREE.Group();

  var yellowMat = new THREE.MeshLambertMaterial ({
    color: 0xfdd276,
    shading:THREE.FlatShading
  });
  var redMat = new THREE.MeshLambertMaterial ({
    color: 0xad3525,
    shading:THREE.FlatShading
  });

  var pinkMat = new THREE.MeshLambertMaterial ({
    color: 0xe55d2b,
    shading:THREE.FlatShading
  });

  var whiteMat = new THREE.MeshLambertMaterial ({
    color: 0xffffff,
    shading:THREE.FlatShading
  });

  var purpleMat = new THREE.MeshLambertMaterial ({
    color: 0x451954,
    shading:THREE.FlatShading
  });

  var greyMat = new THREE.MeshLambertMaterial ({
    color: 0x653f4c,
    shading:THREE.FlatShading
  });

  var blackMat = new THREE.MeshLambertMaterial ({
    color: 0x302925,
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
  var eyeGeom = new THREE.BoxGeometry(5,30,30);
  var irisGeom = new THREE.BoxGeometry(4,10,10);
  var mouthGeom = new THREE.BoxGeometry(20,20,10);
  var smileGeom = new THREE.TorusGeometry( 12, 4, 2, 10, Math.PI );
  var lipsGeom = new THREE.BoxGeometry(40,15,20);
  //var kneeGeom = new THREE.BoxGeometry(25, 80, 80);
  //kneeGeom.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 50, 0 ) );
  //var footGeom = new THREE.BoxGeometry(40, 20, 20);


  var faceGeom = new THREE.BoxGeometry(1.4, 1.4, 1.4);
  var earGeom = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  var noseGeom = new THREE.BoxGeometry(0.4,0.4,0.4);

  var bodyGeom = new THREE.ConeGeometry(0.9, 3, 7);
  var tailGeom = new THREE.BoxGeometry(0.3, 0.3, 0.7);

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
  var leftEye = new THREE.Mesh(eyeGeom, whiteMat);
  leftEye.position.x = 40;
  leftEye.position.y = 120;
  leftEye.position.z = 25;

  var rightEye = new THREE.Mesh(eyeGeom, whiteMat);
  rightEye.position.x = -40;
  rightEye.position.y = 120;
  rightEye.position.z = 25;

  //nose
  var nose = new THREE.Mesh(noseGeom, greyMat);
  nose.position.x = 0;
  nose.position.y = 0.8;
  nose.position.z = 0.9;
  emrys.add(nose);

  // body
  var body = new THREE.Mesh(bodyGeom, yellowMat);

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
  tail.rotation.x = 0.5;
  emrys.add(tail);

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

  return emrys;

}
