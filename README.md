# Emrys on Ski Hill

### Team members: Jingxian Wu, Zoila Rodriguez, Asad Jamil, Leslie Subaldo

We developed this WebGL game for our final project in the Introduction to Computer Graphics (COSC 435) course taught by [Elodie Fourquet](http://cs.colgate.edu/~efourquet) at [Colgate University](http://www.colgate.edu). 

[Play our game!](http://cs.colgate.edu/~efourquet/cosc435/gallery/emrys-ski-hill/infinite_plane.html)
[Watch a demo video!](http://cs.colgate.edu/~efourquet/cosc435/gallery/final_project.html) 

## Game Overview

A dog, [Emrys](https://www.instagram.com/emrys_at_colgate/), is sledding down Colgate University's ski hill. Moving sideways, changing speed, and Emrys collects tokens from Hamilton local shops while avoiding tree branches. 

## Modeling

We modeled Emrys, trees, coins, and branches from simple shapes. Using pictures of Emrys, we drew an abstraction on paper. Then we coded the models in an starting scene with orbit control, to observe the models from different directions so as to improve and tune their appareance. Two spotlights are placed directly on Emrys. Light helpers are made visible in debugging mode (activated by pressing the D key).

## Scene

We used winter color palette for the ski hill, composed of blue, white and grey. Randomly generated trees are placed at both sided of the ski hill. A skybox with fog effect on the horizon gives the experience of a winter scene environment. A particle effect is used to create the falling snow, contributing to the aesthetic of the snowy ski hill. 

## Tokens and branches

Tokens and branches are randomly generated and placed on the ski hill. The tokens slowly rotate in the vertical axis, making the scene more dynamic. Coins are branches disappear from the scene upon collision. 

## Collision

Collision detection between Emrys and the tokens/branches uses axis-allied bounding box. The bounding boxes are visible by activating debugging mode (pressing key D). 

## Animations

Emrys model is animated. When Emrys hits a branch, he rotates for half a circle and thus will lose points, if he collects more tokens in that position. Emrys can turn back by using A/S keys. When collecting a token, a little heart is shown beside Emrys; a grey heart shows that Emrys is losing points. 

## Built With

* [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
* [Three.js](https://threejs.org)
 

## Authors' GitHub

* **[Jingxian Wu](https://github.com/JingxianWu)**
* **[Asad Jamil](https://github.com/Asadius)**
* **[Leslie Subaldo](https://github.com/lsubaldo)**
* **[Zoila Rodriguez](https://github.com/zrodriguez)**


## Sources

* https://codepen.io/Yakudoo/pen/YXxmYR
* https://aerotwist.com/tutorials/creating-particles-with-three-js/
* https://threejs.org/docs/#api/textures/Texture
* http://mozdevs.github.io/gamedev-js-3d-aabb/
* https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/
* http://graemefulton.com/writings/post/coding-an-infinite-3d-world-with-threejs-part-1