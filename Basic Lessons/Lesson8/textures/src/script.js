import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/** 
 *  Traditional way of loading texture 

const image = new Image()
const imgTexture = new THREE.Texture(image)
imgTexture.colorSpace = THREE.SRGBColorSpace
image.onload = () => {
    imgTexture.needsUpdate = true
}
image.src = `/textures/door/color.jpg`
*/

/**
 * Suggested way of Loading a texture
 */
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load(`/textures/door/color.jpg`)
colorTexture.colorSpace = THREE.SRGBColorSpace
colorTexture.magFilter = THREE.NearestFilter

const checkBoxtexture = textureLoader.load(`/textures/checkerboard-8x8.png`)
checkBoxtexture.magFilter = THREE.NearestFilter
// loadingManager.onStart = () =>{
//     console.log('Loading Started')
// }

// loadingManager.onProgress = () =>{
//     console.log('Loading...')
// }
// loadingManager.onLoad = () =>{
//     console.log('Loading Completed')
// }
// loadingManager.onError = () =>{
//     console.log('Error occured')
// }

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
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map:checkBoxtexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
camera.position.z = 1
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

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()