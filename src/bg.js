import * as Three from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new Three.WebGL1Renderer({
    canvas : document.querySelector("#bg"),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);

camera.position.setZ(30);
const loader = new GLTFLoader();

// loader.load('./src/assets/mirror/scene.gltf', function(gltf) {
//   const torus = gltf.scene.children[0];
//   const material = new Three.MeshStandardMaterial();
//   torus.material = material;
//   scene.add(torus);
// });

const tmpbg= new Three.TextureLoader().load('/src/assets/522184.jpg',()=>{
    console.log(scene.background)
    animate()
    scene.background= tmpbg
    
})


// eperiment
// navigator.mediaDevices.getUserMedia( { video: true } )
// .then( (stream) => {
//     const video = document.createElement( 'video' );
//     video.srcObject = stream;
//     video.play();
//     const texture = new Three.VideoTexture( video );
//     const Geometry = new Three.PlaneGeometry(window.innerWidth, window.innerHeight );
//     const Material = new Three.MeshBasicMaterial( { map: texture } );
//     const mesh = new Three.Mesh( Geometry, Material );
//     mesh.position.set(10,10,10)

//      camera.add(mesh)
// } )
// .catch( (error) => {
//       scene.background= tmpbg
//     console.log('Unable to access camera', error);
//   } );

  


// eperiment





const geometry= new Three.TorusGeometry(10,3,16,100);
const material = new Three.MeshStandardMaterial({color:0x581E97});
const material2 = new Three.MeshStandardMaterial({color:0x4C4452});
const torus = new Three.Mesh(geometry,material);
const torus2 = new Three.Mesh(geometry,material2);
const pointLight = new Three.PointLight(0xffffff);
pointLight.position.set(20,25,35)
const ambientLight = new Three.AmbientLight(0xffffff);
const controls = new OrbitControls(camera, renderer.domElement);

scene.add(torus,torus2)
scene.add( pointLight,ambientLight)

// particles
// create particle system
let particleCount = 1000;
let particles = new Three.geometry();
let particleMaterial = new Three.PointsMaterial({
    color: 0xff6600,
    size: 10,
    map: new Three.TextureLoader().load("path/to/fire-texture.png"),
    blending: Three.AdditiveBlending,
    transparent: true
});

// create particle emitter
for (let i = 0; i < particleCount; i++) {
    let x = Math.random() * 200 - 100;
    let y = Math.random() * 200;
    let z = Math.random() * 200 - 100;

    let particle = new Three.Vector3(x, y, z);
    particles.vertices.push(particle);
}

// add particles to the scene
let particleSystem = new Three.Points(particles, particleMaterial);
scene.add(particleSystem);


// particles

function animate(){
    requestAnimationFrame(animate)
 torus.rotation.x+=0.02;
 torus.rotation.y+=0.02;
 torus.rotation.z+=0.02;
 torus2.rotation.x+=0.047;
 torus2.rotation.y+=0.047;
 torus2.rotation.z+=0.047;
//  scene.children[3].rotation.x+=0.047;
//  scene.children[3].rotation.y+=0.047;
//  scene.children[3].rotation.z+=0.047;

controls.update()
    renderer.render(scene,camera)
}

