# Emrys on Ski Hill 
### Final Project of cosc435
### Instructor: Elodie Fourquet
### Students: Jingxian Wu, Zoila Rodriguez, Asad Jamil, Leslie Subaldo

## Game Overview

Sled down a ski hill while controlling moving direction, collecting coins, and avoiding branches! 

## Models

Models of the dog, trees, coins, and branches are all built from simple shapes. We started with looking for photo of the dog, then drew scratches of the models by hand. Then we coded the models in an starting scene with orbit control, to see the models from different directions and improve them as we go. Two spotlights are placed specifically for Emrys, and the light helpers of them can be made visible by activating debugging mode (key D).

## Scene

Used winter color palatte for the ski hill, including a lot of blue, white and grey. Randomly generated trees at both sided of the ski hill with a control in overlap and changing density, and added a small white cone of snow at the tip of each tree. Included a skybox with winter sky color for a full experience of the environment. Implementd a particle effect to show snow falling from the sky, contributing to the aesthetic of the snowy ski hill. 

## Coins and obstacles

Coins and branches are randomly generated and placed on the ski hill. The coins will slowly rotate in the y-axis in place, to make the scene more dynamic. Coins are branches are removed from the scene upon collision, and they are always being regenerated according to the amount consumed. 

## Collision

Collisions between Emrys and the tokens are implemented by using "Box3" in three.js. "Box3" is an optimal way to represent the bounding box for our objects, and provides collision detection. Each token and Emrys has a bounding box, which can be made visible by activating debugging mode (key D). 

## Animations

Implemented animations for Emrys. When Emrys hits a branch, he rotates for half a circle; in order not to lose scores, the player needs to use key A or S to turn him back before hitting coins. Emrys will also turn back upon hitting a second branch. When hitting a coin, he shows a little heart beside him; a grey heart warns the player that they are losing scores. 

## User Interface

Implemented a welcome screen with instructions - arrow left/right for movement, arrow up/down for speed up/down, A/S for turning clockwise/counterclockwise (only activated when Emrys is facing the player), D for debugging mode. 
Implemented a replay screen - after winning or losing, the game will waits for the user to click for replay. 


## Built With

* [Three.js](https://threejs.org)
 

## Authors

* **Jingxian Wu** - [GitHub](https://github.com/JingxianWu)
* **Asad Jamil** - [GitHub](https://github.com/Asadius)
* **Leslie Subaldo** - [GitHub](https://github.com/lsubaldo)
* **Zoila Rodriguez** - [GitHub](https://github.com/zrodriguez)


## Sources

* https://codepen.io/Yakudoo/pen/YXxmYR
* https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/
* http://graemefulton.com/writings/post/coding-an-infinite-3d-world-with-threejs-part-1
* https://aerotwist.com/tutorials/creating-particles-with-three-js/
* https://threejs.org/docs/#api/textures/Texture