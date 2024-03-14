import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const axes = new THREE.AxesHelper();
scene.add(axes);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matCapTexture = textureLoader.load("/textures/matcaps/3.png");

/**
 * Font Loader
 */
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Kashmira", {
    font: font,
    size: 1,
    height: 0.5,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 3,
  });
  //   Technical way of solving this
  //   textGeometry.computeBoundingBox();
  //   textGeometry.translate(
  //     //Subtracting bevelSize with x and y and thicknes with z will get accurate center position
  //     -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
  //     -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
  //     -(textGeometry.boundingBox.max.z - 0.01) * 0.5
  //   );
  //Easier way
  textGeometry.center();
  const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matCapTexture });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  //   textMesh.position.set(-2.5, 0, 0);
  scene.add(textMesh);
  const donuts = new THREE.TorusGeometry(0.3, 0.1, 20, 45);
  for (let i = 0; i < 300; i++) {
    const donut = new THREE.Mesh(donuts.clone(), textMaterial);
    donut.position.x = (Math.random() - 0.5) * 10;
    donut.position.y = (Math.random() - 0.5) * 10;
    donut.position.z = (Math.random() - 0.5) * 10;

    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;
    donut.rotation.z = Math.random() * Math.PI;

    const scaleFactor = Math.random() * 2;
    donut.scale.set(scaleFactor, scaleFactor, scaleFactor);

    scene.add(donut);
  }
  console.log(Math.random());
});
/**
 * Object
 */
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial()
// );

// scene.add(cube);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
