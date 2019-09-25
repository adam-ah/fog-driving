var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

scene.background = new THREE.Color(0xeeeeee);
// scene.fog = new THREE.FogExp2( 0xeeeeee, 0.03 );
scene.fog = new THREE.Fog(0xeeeeee, -150, 150);

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
light1.position.x = 1.8 / 2;
light1.position.y = 0.5;
light1.updateMatrix();
scene.add(light1);

var geometry2 = new THREE.SphereGeometry(.1, 32, 32);
var sphere2 = new THREE.Mesh(geometry2, material);
var light2 = new THREE.PointLight(0xff0000, .5, 50);
light2.add(sphere2);
light2.position.x = -1.8 / 2;
light2.position.y = 0.5;
light2.updateMatrix();
scene.add(light2);

// sphere2.position.x = -1.8 / 2;
// sphere2.position.y = 0;
// sphere2.updateMatrix();

// var spheresGeometry = new THREE.Geometry();
// spheresGeometry.merge(sphere1.geometry, sphere1.matrix);
// spheresGeometry.merge(sphere2.geometry, sphere2.matrix);

// var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// var spheres = new THREE.Mesh(spheresGeometry, material);
// scene.add(spheres);

// spheres.position.z = -300;
// spheres.position.x = 0;
// spheres.position.y = .5;
// BRAKE LIGHTS


// LINES
var geometry1 = new THREE.BoxGeometry(.1, 0.1, 1000);
var cube1 = new THREE.Mesh(geometry1);
cube1.position.x = 3.3 / 2 + .1;
cube1.position.y = 0;
cube1.updateMatrix();

var geometry2 = new THREE.BoxGeometry(.1, 0.1, 1000);
var cube2 = new THREE.Mesh(geometry2);
cube2.position.x = -3.3 / 2 - .1;
cube2.position.y = 0;
cube2.updateMatrix();

var geometry3 = new THREE.BoxGeometry(.1, 0.1, 1000);
var cube3 = new THREE.Mesh(geometry2);
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
var cubeRoad = new THREE.Mesh(geometryRoad);
var material = new THREE.MeshPhongMaterial({ color: 0x333333 });
var road = new THREE.Mesh(geometryRoad, material);
scene.add(road);

var geometryRoad = new THREE.BoxGeometry(3.3, 0.1, 1000);
var cubeRoad = new THREE.Mesh(geometryRoad);
var material = new THREE.MeshPhongMaterial({ color: 0x333333 });
var road = new THREE.Mesh(geometryRoad, material);
road.position.x = 3.3 + .2;
road.position.y = 0;
scene.add(road);
// ROAD RIGHT

// var sphere = new THREE.SphereBufferGeometry(0.1, 8, 8);
// light1 = new THREE.PointLight(0xff0000, 2, 50);
// light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff0000 })));
// light1.position.x = 0;
// light1.position.y = 1;
// light1.position.z = -5;
// scene.add(light1);

light1.position.z = -200;
light2.position.z = -200;

// var loader = new THREE.FontLoader();

// loader.load('helvetiker_regular.typeface.json', function (font) {
//     var textGeo = new THREE.TextGeometry('Hello three.js!', {
//         font: font,
//         size: 1,
//         height: 0,
//         curveSegments: 12,
//         bevelEnabled: false,
//         bevelThickness: 0,
//         bevelSize: 0,
//         bevelOffset: 0,
//         bevelSegments: 5
//     });
//     var material = new THREE.MeshBasicMaterial({ color: 0x000000 });
//     material.fog = false;
//     textGeo.computeBoundingBox();
//     textGeo.computeVertexNormals();
//     textGeo = new THREE.BufferGeometry().fromGeometry( textGeo );
//     textMesh1 = new THREE.Mesh( textGeo, material );
//     textMesh1.position.y = 6;
//     textMesh1.position.z = -10;
//     scene.add(textMesh1);
// });

var enableAnim = true;

var prevTime = performance.now();
var speedCnt = 0;
var totalMovement = 0;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    if (!enableAnim) {
        return;
    }

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    // sphere1.position.z += 0.4;
    // sphere2.position.z += 0.4;
    // spheres.position.z += 0.5;
    var movement = .2

    light1.position.z += movement;
    light2.position.z += movement;

    totalMovement += movement;
    speedCnt += 1;

    if (speedCnt == 10) {
        var speedMps = totalMovement / ((performance.now() - prevTime) / 1000);
        var speedKmph = parseInt(speedMps * 3.6);
        var distance = parseInt(light1.position.z);
        document.getElementById('info').innerText = "Speed: # Distance: $".replace("#", speedKmph).replace("$", distance);
        prevTime = performance.now();
        speedCnt = 0;
        totalMovement = 0;
    }
}
animate();

