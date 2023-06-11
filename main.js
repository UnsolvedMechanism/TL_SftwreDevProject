import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

import { OrbitControls } from './OrbitControls.js';
import { RectAreaLightHelper } from './RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from './RectAreaLightUniformsLib.js';
import { GLTFLoader } from './GLTFLoader.js';
import { DRACOLoader } from './DRACOLoader.js';


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

    const ambLight = new THREE.AmbientLight(0xffff00,0.15);
    scene.add(ambLight);

    const light = new THREE.PointLight(0xff00ff);
    light.position.set(0, 100, 50);
    scene.add(light);

    const rectLight0 = new THREE.RectAreaLight(0xffff00, 10, 40, 100);
    rectLight0.position.set(-100, 50, 200);
    scene.add(rectLight0);

    const rectLight1 = new THREE.RectAreaLight(0xff0000, 10, 40, 100);
    rectLight1.position.set(-50, 50, 200);
    scene.add(rectLight1);

    const rectLight2 = new THREE.RectAreaLight(0x00ff00, 10, 40, 100);
    rectLight2.position.set(0, 50, 200);
    scene.add(rectLight2);

    const rectLight3 = new THREE.RectAreaLight(0x0000ff, 10, 40, 100);
    rectLight3.position.set(50, 50, 200);
    scene.add(rectLight3);

    const rectLight4 = new THREE.RectAreaLight(0x00ffff, 10, 40, 100);
    rectLight4.position.set(100, 50, 200);
    scene.add(rectLight4);

    scene.add(new RectAreaLightHelper(rectLight0));
    scene.add(new RectAreaLightHelper(rectLight1));
    scene.add(new RectAreaLightHelper(rectLight2));
    scene.add(new RectAreaLightHelper(rectLight3));
    scene.add(new RectAreaLightHelper(rectLight4));
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