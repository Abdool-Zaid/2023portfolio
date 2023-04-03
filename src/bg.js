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

loader.load('/src/assets/mirror.glb', function(gltf) {
  const torus = gltf.scene.children[0]; // assuming the torus is the only object in the scene
  const material = new Three.MeshStandardMaterial({ metalness: 1.0 });
  torus.material = material;
  // add the torus object to your Three.js scene
  scene.add(torus);
});

const geometry= new Three.TorusGeometry(10,3,16,100);
const material = new Three.MeshStandardMaterial({color:0x581E97});
const torus = new Three.Mesh(geometry,material);
const pointLight = new Three.PointLight(0xffffff);
pointLight.position.set(20,25,35)
const ambientLight = new Three.AmbientLight(0xffffff);
const controls = new OrbitControls(camera, renderer.domElement);

scene.add(torus)
scene.add( pointLight,ambientLight)

function addStar(){
    const geometry = new Three.SphereGeometry(0.25, 24, 24);
    const material = new Three.MeshStandardMaterial({color: 0xfffffe})
const star = new Three.Mesh(geometry,material);

const [x,y,z] = Array(3).fill().map(()=>Three.MathUtils.randFloatSpread(100));
star.position.set(x,y,z)

scene.add(star)

}

Array(200).fill().forEach(addStar)

function animate(){
    requestAnimationFrame(animate)
 torus.rotation.x+=0.02;
 torus.rotation.y+=0.02;
 torus.rotation.z+=0.02;


controls.update()
    renderer.render(scene,camera)
}

animate()