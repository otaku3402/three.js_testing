import {GLTFLoader} from 'GLTFLoader';
import * as THREE from 'three';

let scene = new THREE.Scene();
let canvas = document.querySelector('#canvas');
let renderer = new THREE.WebGLRenderer({
    canvas : canvas,
    antialias : true
});
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

let camera = new THREE.PerspectiveCamera(30, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
camera.position.set(0,0,6);

scene.background = new THREE.Color('white');
let light = new THREE.DirectionalLight(0xB1E1FF, 10);
scene.add(light);

let loader = new GLTFLoader();
loader.load('model/scene.gltf', function(gltf){
    scene.add(gltf.scene);

    // 모델을 화면 중앙(원점)으로 이동
    gltf.scene.position.set(0, 0, 0);

    let rotating = false;
    let rotationSpeed = 0.05;
    let speedInterval = null;

    // 모델을 클릭하면 회전 시작/정지
    canvas.addEventListener('click', () => {
        rotating = !rotating;

        if (rotating) {
            rotationSpeed = 0.05;
            speedInterval = setInterval(() => {
                rotationSpeed += 0.02;
            }, 1000);
        } else {
            clearInterval(speedInterval);
            gltf.scene.rotation.y = 0;
        }
    });

    // 모델 회전 및 속도 증가
    function animate(){
        requestAnimationFrame(animate)
        if (rotating) {
            gltf.scene.rotation.y += rotationSpeed;
        }
        renderer.render(scene, camera);
    }
    animate();
});