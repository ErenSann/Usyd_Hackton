const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xeeeeee); // Set a light grey clear color
document.body.appendChild(renderer.domElement);

// Create a simple cube
let geometry = new THREE.SphereGeometry(1, 32, 32);

let loader = new THREE.TextureLoader();
let material;
loader.load('./earth_16k.jpg', function(texture) {
    let material = new THREE.MeshBasicMaterial({ map: texture });
    let earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    document.addEventListener('mousemove', function(event) {
        let mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        let mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        earth.rotation.y = mouseX * Math.PI;
        earth.rotation.x = mouseY * Math.PI;
    });

    animate();
});
    
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 3;

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

texture.minFilter = THREE.LinearFilter; // or THREE.NearestFilter
texture.magFilter = THREE.LinearFilter; // or THREE.NearestFilter
texture.wrapS = THREE.ClampToEdgeWrapping;
texture.wrapT = THREE.ClampToEdgeWrapping;
