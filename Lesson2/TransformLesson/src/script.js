import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')
const groupCanvas = document.querySelector('canvas.groupWebgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: '#9999ff' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(1,1,3) 
scene.add(camera)

//Axes Helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

//Scale Object
mesh.scale.set(2,0.5,1)

//Rotate Object
mesh.rotation.set(0,0,Math.PI)

//Look at
camera.lookAt(mesh.position)
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

//Group Renderer
const groupedScene = new THREE.Scene()
groupedScene.add(camera)
groupedScene.add(axesHelper)

const cube1 = new THREE.Mesh(geometry, material)
const cube2 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#7799ff' }))
const cube3 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: '#3399ff' }))

//Transform cubes for visibility
cube1.position.set(-2,0,0)
cube3.position.set(2,0,0)

//Create Group 
const newGroup = new THREE.Group()
newGroup.add(cube1)
newGroup.add(cube2)
newGroup.add(cube3)

groupedScene.add(newGroup)

newGroup.rotateZ(45)

const groupRenderer = new THREE.WebGLRenderer({
    canvas: groupCanvas
})
groupRenderer.setSize(sizes.width, sizes.height)
groupRenderer.render(groupedScene, camera)