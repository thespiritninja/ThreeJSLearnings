import * as THREE from 'three'
const canvas = document.querySelector('canvas.webgl')

//scene
const scene = new THREE.Scene()

//mesh
const boxGeometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: '#9999ff'})
const mesh = new THREE.Mesh(boxGeometry, material)
scene.add(mesh)

//camera
const screenSize = {
    width: 800,
    height: 600
}
const camera = new THREE.PerspectiveCamera(75, (screenSize.width/screenSize.height))
camera.position.set(1,2,5)
scene.add(camera)

//renderer
const renderer = new THREE.WebGLRenderer(
    {canvas:canvas}
)
renderer.setSize(screenSize.width,screenSize.height)
renderer.render(scene,camera)