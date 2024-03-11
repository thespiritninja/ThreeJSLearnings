import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

// Instantiate GUI
const gui = new GUI()
//Declaring a debugObject dict
const debugObject  = {}
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: '#9999ff' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
//Adding Range debug
const tweakCube = gui.addFolder('Tweak Cube')
tweakCube
    .add(mesh.scale, 'y')
    .min(1)
    .max(5)
    .step(0.05)
    .name('scaleY')

//Adding Boolean Debug
tweakCube
    .add(mesh,'visible')
tweakCube
    .add(mesh.material, 'wireframe')

//Adding Color Debug
tweakCube
    .addColor(mesh.material, 'color')
    .onChange((colorChanged)=>{
        // console.log(colorChanged.getHexString())
    })
debugObject.spin = () =>{
    gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2})
}

tweakCube
    .add(debugObject, 'spin')

debugObject.subdivisions = 2
tweakCube
    .add(debugObject,'subdivisions')
    .min(1)
    .max(10)
    .step(1)
    .onFinishChange(()=>{
        mesh.geometry.dispose()
        mesh.geometry = new THREE.BoxGeometry(1,1,1,
            debugObject.subdivisions, debugObject.subdivisions, debugObject.subdivisions)
    })

window.addEventListener('keydown', (e)=>{
    if(e.key == 'h'){
        gui.show(gui._hidden)
    }
})
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()