# Emrys on Ski Hill

Sled down a ski hill by controlling movement, collect coins, and avoid branches! 

## Models

Models of the dog, trees, coins, and branches are all built from simple shapes. We started with drawing the figures with a lot of abstraction, then coded the models in an orbit control code example, to see the models from different directions and improve it as we go. 

## Scene

Used winter colors for the ski hill. Randomly generated trees at the side of the ski hill with a control in overlap and changing density. Included blue sky skybox with clouds for a full experience of the environment. Implementd a particle effect to show snow falling from the sky, contributing to the
aesthetic of the snowy ski hill. 

## Coins and obstacles



## Animations

Implemented animations for the tokens and Emrys to make the scene more dynamic. The tokens will slowly rotate in the y-axis in place. When Emrys hits a branch, he rotates for half a circle; when hitting a coin, he shows a little heart beside him. If Emrys hits a coin with his back, you lose score! 

## Animations

Implemented a welcome screen with instructions, and a replay screen. 


## Built With

* [Three.js]
 

## Authors

* **Jingxian Wu** 
* **Asad Jamil** 
* **Leslie Subaldo** 
* **Zoila Rodriguez** 


## Sources

* https://codepen.io/Yakudoo/pen/YXxmYR
* https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/
* http://graemefulton.com/writings/post/coding-an-infinite-3d-world-with-threejs-part-1
* https://aerotwist.com/tutorials/creating-particles-with-three-js/
* https://threejs.org/docs/#api/textures/Texture