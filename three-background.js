// Three.js 3D Background Module
import * as THREE from 'three';

// Setup scene, camera, renderer
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05070a);
scene.fog = new THREE.FogExp2(0x05070a, 0.008);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 12);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// --- Lighting System ---
const ambientLight = new THREE.AmbientLight(0x111122);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x2266ff, 0.8);
pointLight.position.set(3, 5, 5);
scene.add(pointLight);

const backLight = new THREE.PointLight(0x00ccff, 0.5);
backLight.position.set(-2, 1, -5);
scene.add(backLight);

const fillLight = new THREE.PointLight(0x44aaff, 0.4);
fillLight.position.set(1, 2, 3);
scene.add(fillLight);

// --- Central Abstract Object (Torus Knot) ---
const knotGeo = new THREE.TorusKnotGeometry(1.1, 0.28, 180, 24, 3, 4);
const knotMat = new THREE.MeshStandardMaterial({ 
    color: 0x2a9dff, 
    emissive: 0x0055aa, 
    emissiveIntensity: 0.6, 
    metalness: 0.7, 
    roughness: 0.3 
});
const knot = new THREE.Mesh(knotGeo, knotMat);
scene.add(knot);

// --- Particle System (Stars/Dust) ---
const particleCount = 2200;
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
    // Position in a spherical-ish cloud
    positions[i*3] = (Math.random() - 0.5) * 45;
    positions[i*3+1] = (Math.random() - 0.5) * 25;
    positions[i*3+2] = (Math.random() - 0.5) * 35 - 10;
    
    // Color variations (blue to cyan)
    colors[i*3] = 0.3 + Math.random() * 0.7;     // R
    colors[i*3+1] = 0.5 + Math.random() * 0.5;   // G
    colors[i*3+2] = 0.8 + Math.random() * 0.2;   // B
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particleMat = new THREE.PointsMaterial({ 
    color: 0x88ccff, 
    size: 0.06, 
    transparent: true, 
    opacity: 0.6,
    vertexColors: true
});
const particles = new THREE.Points(particlesGeometry, particleMat);
scene.add(particles);

// --- Floating Ring ---
const ringGeo = new THREE.TorusGeometry(1.5, 0.05, 64, 200);
const ringMat = new THREE.MeshStandardMaterial({ 
    color: 0x00e0ff, 
    emissive: 0x0088aa, 
    emissiveIntensity: 0.4 
});
const ring = new THREE.Mesh(ringGeo, ringMat);
ring.rotation.x = Math.PI / 2;
ring.position.y = -0.8;
scene.add(ring);

// --- Orbiting Spheres Array ---
const orbitingSpheres = [];
const sphereCount = 80;

for (let i = 0; i < sphereCount; i++) {
    const sphereGeo = new THREE.SphereGeometry(0.065, 12, 12);
    const sphereMat = new THREE.MeshStandardMaterial({ 
        color: 0x88ccff, 
        emissive: 0x2266aa,
        emissiveIntensity: 0.3
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    
    // Store orbital parameters
    sphere.userData = {
        radius: 2.0 + Math.random() * 2.2,
        speed: 0.003 + Math.random() * 0.012,
        angle: Math.random() * Math.PI * 2,
        yOffset: (Math.random() - 0.5) * 3.5,
        ySpeed: 0.005 + Math.random() * 0.01
    };
    
    scene.add(sphere);
    orbitingSpheres.push(sphere);
}

// --- Additional Floating Small Particles (Glitter) ---
const glitterCount = 800;
const glitterGeometry = new THREE.BufferGeometry();
const glitterPositions = new Float32Array(glitterCount * 3);

for (let i = 0; i < glitterCount; i++) {
    glitterPositions[i*3] = (Math.random() - 0.5) * 30;
    glitterPositions[i*3+1] = (Math.random() - 0.5) * 20;
    glitterPositions[i*3+2] = (Math.random() - 0.5) * 25 - 8;
}

glitterGeometry.setAttribute('position', new THREE.BufferAttribute(glitterPositions, 3));
const glitterMat = new THREE.PointsMaterial({ color: 0x88aaff, size: 0.03, transparent: true, opacity: 0.4 });
const glitter = new THREE.Points(glitterGeometry, glitterMat);
scene.add(glitter);

// --- Mouse Interaction Variables ---
let mouseX = 0, mouseY = 0;
let targetRotationX = 0, targetRotationY = 0;

window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = (event.clientY / window.innerHeight) * 2 - 1;
    targetRotationY = mouseX * 0.5;
    targetRotationX = mouseY * 0.3;
});

// --- Animation Loop ---
let time = 0;

function animate() {
    requestAnimationFrame(animate);
    time += 0.012;
    
    // Rotate central knot
    knot.rotation.x += 0.008;
    knot.rotation.y += 0.012;
    knot.rotation.z += 0.005;
    
    // Animate ring with slight oscillation
    ring.rotation.z += 0.005;
    ring.rotation.x = Math.PI / 2 + Math.sin(time * 0.5) * 0.1;
    
    // Update orbiting spheres
    orbitingSpheres.forEach(sphere => {
        sphere.userData.angle += sphere.userData.speed;
        const rad = sphere.userData.radius;
        const x = Math.cos(sphere.userData.angle) * rad;
        const z = Math.sin(sphere.userData.angle) * rad;
        sphere.position.x = x;
        sphere.position.z = z;
        sphere.position.y = sphere.userData.yOffset + Math.sin(time * 1.2 + sphere.userData.angle) * 0.25;
    });
    
    // Rotate particle systems slowly
    particles.rotation.y += 0.0008;
    particles.rotation.x = Math.sin(time * 0.1) * 0.1;
    glitter.rotation.y -= 0.0004;
    glitter.rotation.x += 0.0003;
    
    // Interactive camera movement (subtle parallax)
    camera.position.x += (targetRotationY * 0.6 - camera.position.x) * 0.05;
    camera.position.y += (-targetRotationX * 0.4 - camera.position.y) * 0.05;
    camera.lookAt(0, 0.5, 0);
    
    // Pulse effect on knot emissive intensity
    const pulse = 0.5 + Math.sin(time * 2) * 0.15;
    knotMat.emissiveIntensity = 0.5 + pulse * 0.2;
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();

console.log('Three.js background initialized with interactive particles');