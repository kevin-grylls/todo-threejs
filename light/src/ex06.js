import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import dat from "dat.gui";

// ----- 주제: RectAreaLight

export default function example() {
  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // 그림자 설정
  renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = THREE.PCFShadowMap; // 기본값
  // renderer.shadowMap.type = THREE.BasicShadowMap; // 거칠게
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 부드럽게

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.y = 1.5;
  camera.position.z = 4;
  scene.add(camera);

  // Light
  const light = new THREE.RectAreaLight("orange", 10, 2, 2);
  light.position.y = 2;
  light.position.z = 4;
  scene.add(light);

  const lightHelper = new RectAreaLightHelper(light);
  scene.add(lightHelper);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  const planeGeometry = new THREE.PlaneGeometry(10, 10);
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const sphereGeometry = new THREE.SphereGeometry(0.7, 16, 16);

  const material1 = new THREE.MeshStandardMaterial({
    color: "white",
  });
  const material2 = new THREE.MeshStandardMaterial({
    color: "royalblue",
  });
  const material3 = new THREE.MeshStandardMaterial({
    color: "gold",
  });

  // Mesh
  const plane = new THREE.Mesh(planeGeometry, material1);
  const box = new THREE.Mesh(boxGeometry, material2);
  const sphere = new THREE.Mesh(sphereGeometry, material3);

  plane.rotation.x = -Math.PI * 0.5;
  box.position.set(1, 1, 0);
  sphere.position.set(-1, 1, 0);

  // 그림자 설정
  plane.receiveShadow = true;
  box.castShadow = true;
  box.receiveShadow = true;
  sphere.castShadow = true;
  sphere.receiveShadow = true;

  scene.add(plane, box, sphere);

  // AxesHelper
  const axesHelper = new THREE.AxesHelper(3);
  scene.add(axesHelper);

  // Dat GUI
  const gui = new dat.GUI();
  gui.add(light.position, "x", -5, 5, 0.1).name("Light X");
  gui.add(light.position, "y", -5, 5, 0.1).name("Light Y");
  gui.add(light.position, "z", 2, 10, 0.1).name("Light Z");

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const time = clock.getElapsedTime(); // 계속 늘어나는 시간 반영

    // light.position.x = Math.cos(time) * 5;
    // light.position.z = Math.sin(time) * 5;

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
