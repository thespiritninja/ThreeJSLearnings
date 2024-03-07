import * as THREE from 'three'
import {OrbitControls} from  'three/examples/jsm/Addons'
/**
 * Base
 */
//Adding a mouse event
const cursorDeets = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (e)=>{
    cursorDeets.x = (e.clientX / sizes.width) - 0.5 
    cursorDeets.y = (e.clientY / sizes.height) - 0.5 
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: '#9999ff' })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 100)

//Orthographic Camera
const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1*aspectRatio,
//     1*aspectRatio,
//     1,
//     -1,
//     0.1,100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3

scene.add(camera)

//OrbitControl for the Camera

const oControl = new OrbitControls(camera, canvas)
oControl.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // learning to rotate on mouse events
    // camera.position.x = cursorDeets.x * 5
    // camera.position.y = cursorDeets.y * 5
    // camera.lookAt(new THREE.Vector3())
    
    //Now we rotate it to make the backside of cube visible too, We use MATH
    // camera.position.x = Math.sin(cursorDeets.x * Math.PI * 2) + 2
    // camera.position.z = -Math.cos(cursorDeets.x * Math.PI * 2) + 2
    // camera.position.y = cursorDeets.y * 5
    // camera.lookAt(new THREE.Vector3())
    
    // Update objects
    // mesh.rotation.y = elapsedTime;
    oControl.update()
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()