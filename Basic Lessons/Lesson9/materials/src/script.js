import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//Creating a Debug UI
const debugUI = new GUI();

/**
 * Loading Textures
 */
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg");
const doorRoughnessTexture = textureLoader.load(
  "./textures/door/roughness.jpg"
);
const doorMetalnessTexture = textureLoader.load(
  "./textures/door/metalness.jpg"
);
const doorAmbientOcclusionTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
);
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");

/**
 * Loading Materials
 */
const matCap = textureLoader.load("./textures/matcaps/2.png");
matCap.colorSpace = THREE.SRGBColorSpace;
/**
 * Loading Gradients
 */
const gradientTexture = textureLoader.load("./textures/gradients/5.jpg");

/**
 * Experimenting Materials
 */
//Basic material
// const meshMaterial = new THREE.MeshBasicMaterial({ map: doorColorTexture });
// meshMaterial.alphaMap = doorAlphaTexture;
// meshMaterial.side = THREE.DoubleSide;

//Normal material
// const meshMaterial = new THREE.MeshNormalMaterial();
// meshMaterial.flatShading = true;

//MatCap material
// const meshMaterial = new THREE.MeshMatcapMaterial();
// meshMaterial.matcap = matCap;

//Depth material
// const meshMaterial = new THREE.MeshDepthMaterial();

// //Lambert material [Perfect use case for Moon App]
// const meshMaterial = new THREE.MeshLambertMaterial();

//Phong material
// const meshMaterial = new THREE.MeshPhongMaterial();
// meshMaterial.shininess = 100;
// meshMaterial.specular = new THREE.Color(0x1188ff);

//Toon material
// const meshMaterial = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// meshMaterial.gradientMap = gradientTexture;

//Standard material <Very IMP for realistic feels>
// const meshMaterial = new THREE.MeshStandardMaterial();
// meshMaterial.map = doorColorTexture;
// meshMaterial.roughness = 1;
// meshMaterial.metalness = 1;
// meshMaterial.aoMap = doorAmbientOcclusionTexture;
// meshMaterial.aoMapIntensity = 1;
// meshMaterial.displacementMap = doorHeightTexture;
// meshMaterial.displacementScale = 0.1;
// meshMaterial.metalnessMap = doorMetalnessTexture;
// meshMaterial.roughnessMap = doorRoughnessTexture;
// meshMaterial.normalMap = doorNormalTexture;
// meshMaterial.normalScale.set(0.5, 0.5);
// meshMaterial.transparent = true;
// meshMaterial.alphaMap = doorAlphaTexture;

// const standardMatDebugger = debugUI.addFolder("Standard Material");
// standardMatDebugger.add(meshMaterial, "roughness", 0, 1, 0.0001);
// standardMatDebugger.add(meshMaterial, "metalness", 0, 1, 0.0001);

//Commented for checking envMap
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.set(2, 5, 4);
// scene.add(pointLight);

//Physical Material:
const meshMaterial = new THREE.MeshPhysicalMaterial();
// meshMaterial.roughness = 1;
// meshMaterial.metalness = 1;
// meshMaterial.map = doorColorTexture;
// meshMaterial.aoMap = doorAmbientOcclusionTexture;
// meshMaterial.aoMapIntensity = 1;
// meshMaterial.displacementMap = doorHeightTexture;
// meshMaterial.displacementScale = 0.1;
// meshMaterial.metalnessMap = doorMetalnessTexture;
// meshMaterial.roughnessMap = doorRoughnessTexture;
// meshMaterial.normalMap = doorNormalTexture;
// meshMaterial.normalScale.set(0.5, 0.5);
// meshMaterial.transparent = true;
// meshMaterial.alphaMap = doorAlphaTexture;

const physicalMatDebugger = debugUI.addFolder("Physical Material");
physicalMatDebugger.add(meshMaterial, "roughness", 0, 1, 0.0001);
physicalMatDebugger.add(meshMaterial, "metalness", 0, 1, 0.0001);

//Different types of physical materials:
//Clearcoat Effect
// meshMaterial.clearcoat = 1;
// meshMaterial.clearcoatRoughness = 0;

// physicalMatDebugger.add(meshMaterial, "clearcoat", 0, 1, 0.0001);
// physicalMatDebugger.add(meshMaterial, "clearcoatRoughness", 0, 1, 0.0001);

//Sheen Effect <Better to test it on soft materials>
// meshMaterial.sheen = 1;
// meshMaterial.sheenRoughness = 0.15;
// meshMaterial.sheenColor.set(1, 1, 1);
// physicalMatDebugger.add(meshMaterial, "sheen", 0, 1, 0.0001);
// physicalMatDebugger.add(meshMaterial, "sheenRoughness", 0, 1, 0.0001);
// physicalMatDebugger.addColor(meshMaterial, "sheenColor");

//Iridescent Effect
// meshMaterial.iridescence = 0.5;
// meshMaterial.iridescenceIOR = 2.33;
//Can add debugger to tweak values

//Transmission Effect
meshMaterial.transmission = 1;
meshMaterial.ior = 2;
meshMaterial.thickness = 0.5;
physicalMatDebugger.add(meshMaterial, "transmission", 0, 1, 0.0001);
physicalMatDebugger.add(meshMaterial, "ior", 0, 3, 0.0001);
physicalMatDebugger.add(meshMaterial, "thickness", 0, 10, 0.0001);

//Environment Map
const rgbeLoader = new RGBELoader();
rgbeLoader.load("./textures/environmentMap/2k.hdr", (enviMap) => {
  enviMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = enviMap;
  scene.environment = enviMap;
});

/**
 * Geometries
 */
const meshSphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  meshMaterial
);
meshSphere.position.x = -1.5;

const meshPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), meshMaterial);

const meshTorus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  meshMaterial
);
meshTorus.position.x = 1.5;
scene.add(meshSphere, meshPlane, meshTorus);

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

  meshPlane.rotateX(-0.01);
  meshSphere.rotateX(-0.01);
  meshTorus.rotateX(-0.01);

  meshPlane.rotateY(0.01);
  meshSphere.rotateY(0.01);
  meshTorus.rotateY(0.01);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
