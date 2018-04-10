function createEmrys(){
  var emrysOnSled = new THREE.Object3D(); 

  var emrys = new THREE.Object3D();

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
    shading:THREE.FlatShading
  });

  var sledGeom = new THREE.BoxGeometry(3.5, 0.2, 5); 

  var sled = new THREE.Mesh(sledGeom, maroonMat); 
  sled.position.x = 0;
  sled.position.y = -1.6;
  sled.position.z = 0; 
  sled.add(sled); 

  emrysOnSled.add(sled); 

  emrysOnSled.rotation.y = Math.PI; 

  return emrysOnSled; 

}