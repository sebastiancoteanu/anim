let container;
let camera;
let renderer;
let scene;
let figurine;

function init() {
  container = document.getElementById('container');

  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 500;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 2, 20);

  const ambient = new THREE.AmbientLight(0x626262, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(10, 10, 30);
  scene.add(light);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  const loader = new THREE.GLTFLoader();
  loader.load('../3d/scene.gltf', function(gltf) {
    scene.add(gltf.scene);
    figurine = gltf.scene.children[0];
    animate();
  });

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
  requestAnimationFrame(animate);
  figurine.rotation.z += 0.005;
  renderer.render(scene, camera);
}

function main() {
  init();
}

main();
