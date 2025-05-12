import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; // GLTFLoader 가져오기

// 장면 생성
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaaaaa); // 배경색 설정

// 카메라 생성 (시야각 75도, 종횡비, near 평면, far 평면)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 렌더러 생성 및 설정
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

// GLTFLoader를 사용하여 모델 로드
const loader = new GLTFLoader();
loader.load(
    '../model/scene.gltf', // 모델 파일 경로
    (gltf) => {
        const model = gltf.scene;
        scene.add(model); // 모델을 장면에 추가
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded'); // 로드 진행률 출력
    },
    (error) => {
        console.error('An error occurred while loading the model:', error); // 로드 에러 처리
    }
);

// 애니메이션 함수
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// 창 크기 변경 시 캔버스 크기 및 카메라 종횡비 업데이트
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);

animate();