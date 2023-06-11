import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

let renderer, scene, camera, stats;

init();

function init() {

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(150, 100, 200);

    scene = new THREE.Scene();

    RectAreaLightUniformsLib.init();

    const rectLight1 = new THREE.RectAreaLight(0xff0000, 75, 40, 100);
    rectLight1.position.set(-50, 50, 200);
    scene.add(rectLight1);

    const rectLight2 = new THREE.RectAreaLight(0x00ff00, 75, 40, 100);
    rectLight2.position.set(0, 50, 200);
    scene.add(rectLight2);

    const rectLight3 = new THREE.RectAreaLight(0x0000ff, 75, 40, 100);
    rectLight3.position.set(50, 50, 200);
    scene.add(rectLight3);

    scene.add(new RectAreaLightHelper(rectLight1));
    scene.add(new RectAreaLightHelper(rectLight2));
    scene.add(new RectAreaLightHelper(rectLight3));
    const geoFloor = new THREE.BoxGeometry(2000, 0.1, 2000);
    const matStdFloor = new THREE.MeshStandardMaterial({ color: 0xbcbcbc, roughness: 0.1, metalness: 0 });
    const mshStdFloor = new THREE.Mesh(geoFloor, matStdFloor);
    scene.add(mshStdFloor);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('jsm/libs/draco/gltf/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load('ssc_tuatara.glb', function (gltf) {
        scene.add(gltf.scene);
    });
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    //

    window.addEventListener('resize', onWindowResize);

    stats = new Stats();
    
}

function onWindowResize() {
    renderer.setPixelRatio(2)
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = (window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();

}

function animation() {
    renderer.render(scene, camera);
    stats.update();
}