import { AnaglyphEffect } from './anaglyphEffect.js';
import * as THREE from './three.module.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.setFocalLength(1);

var movement = parseFloat(setSpeed) || .2;

scene.background = new THREE.Color(0xeeeeee);
// scene.fog = new THREE.FogExp2( 0xeeeeee, 0.04    );
scene.fog = new THREE.Fog(0xeeeeee, -20, 40);

// var light = new THREE.AmbientLight( 0xffffff ); 
// scene.add( light );

var light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
scene.add(light);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.x = 1.8 / 2 - .3;
camera.position.y = 1.1;
camera.position.z = 0;

// BRAKE LIGHTS
var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var geometry1 = new THREE.SphereGeometry(.1, 32, 32);
var sphere1 = new THREE.Mesh(geometry1, material);
var light1 = new THREE.PointLight(0xff0000, .5, 50);
light1.add(sphere1);
light1.position.x = 1.35 / 2;
light1.position.y = 1;
light1.updateMatrix();

var geometry2 = new THREE.SphereGeometry(.1, 32, 32);
var sphere2 = new THREE.Mesh(geometry2, material);
var light2 = new THREE.PointLight(0xff0000, .5, 50);
light2.add(sphere2);
light2.position.x = -1.35 / 2;
light2.position.y = 1;
light2.updateMatrix();

var groupCar = new THREE.Group();
groupCar.add( light1 );
groupCar.add( light2 );
// BRAKE LIGHTS

// CAR
var geometry = new THREE.BoxGeometry( 2, 0.9, 4 );
var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
var carBottom = new THREE.Mesh( geometry, material );
carBottom.position.z = -2;
carBottom.position.y = 0.8;

var geometry = new THREE.BoxGeometry( 1.8, 0.4, 2 );
var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
var carTop = new THREE.Mesh( geometry, material );
carTop.position.z = -2;
carTop.position.y = 0.8 + 0.9/2 + 0.4/2;


groupCar.add(carBottom);
groupCar.add(carTop);
// CAR

scene.add( groupCar );

// LINES
var lineGeometry = new THREE.BoxGeometry(.1, 0.1, 1000);
var cube1 = new THREE.Mesh(lineGeometry);
cube1.position.x = 3.3 / 2 + .1;
cube1.position.y = 0;
cube1.updateMatrix();

var cube2 = new THREE.Mesh(lineGeometry);
cube2.position.x = -3.3 / 2 - .1;
cube2.position.y = 0;
cube2.updateMatrix();

var cube3 = new THREE.Mesh(lineGeometry);
cube3.position.x = 3.3 + 3.3 / 2 + .1 + .1;
cube3.position.y = 0;
cube3.updateMatrix();

var linesGeometry = new THREE.Geometry();
linesGeometry.merge(cube1.geometry, cube1.matrix);
linesGeometry.merge(cube2.geometry, cube2.matrix);
linesGeometry.merge(cube3.geometry, cube3.matrix);

var material = new THREE.MeshPhongMaterial({ color: 0xffffff });
var lines = new THREE.Mesh(linesGeometry, material);
scene.add(lines);
// LINES

// ROAD 
var geometryRoad = new THREE.BoxGeometry(3.3, 0.1, 1000);
var material = new THREE.MeshPhongMaterial({ color: 0x333333 });
var road = new THREE.Mesh(geometryRoad, material);
scene.add(road);

var geometryRoad = new THREE.BoxGeometry(3.3, 0.1, 1000);
var material = new THREE.MeshPhongMaterial({ color: 0x333333 });
var road = new THREE.Mesh(geometryRoad, material);
road.position.x = 3.3 + .2;
road.position.y = 0;
scene.add(road);

groupCar.position.z = -50;

var enableAnim = true;

var prevTime = performance.now();
var speedCnt = 0;
var totalMovement = 0;

var width = window.innerWidth || 2;
var height = window.innerHeight || 2;

var effect = new AnaglyphEffect(renderer);
effect.setSize(width, height);

if (nofog) {
    scene.fog = new THREE.Fog(0xeeeeee, 0, 1500);
}

function animate() {
    requestAnimationFrame(animate);
    
    if (no3d) {
        renderer.render(scene, camera);
    } else {
        effect.render(scene, camera);
    }

    if (!enableAnim) {
        return;
    }

    groupCar.position.z += movement;

    totalMovement += movement;
    speedCnt += 1;

    if (speedCnt == 10) {
        var speedMps = totalMovement / ((performance.now() - prevTime) / 1000);
        var speedKmph = parseInt(speedMps * 3.6);
        var distance = parseInt(groupCar.position.z);
        document.getElementById('info').innerText = "Speed: # Distance: $".replace("#", speedKmph).replace("$", distance);
        prevTime = performance.now();
        speedCnt = 0;
        totalMovement = 0;
    }
}
animate();

