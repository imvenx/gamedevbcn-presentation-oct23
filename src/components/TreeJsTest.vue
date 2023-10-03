<template>
  <div ref="container"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { BoxGeometry, Mesh, MeshNormalMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const container = ref(null);

onMounted(() => {
  const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.z = 1;

  const scene = new Scene();

  const geometry = new BoxGeometry(0.2, 0.2, 0.2);
  const material = new MeshNormalMaterial();

  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animation);

  if (container.value) {
    (container.value as any).appendChild(renderer.domElement);
  }


  const loader = new GLTFLoader();

  loader.load(
    'meshes/sword.glb',
    (gltf) => {
      gltf.scene.position.set(0, 0, 0); // Center the object at (0,0,0)
      scene.add(gltf.scene);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
      console.error('An error happened', error);
    }
  );

  function animation(time: any) {
    mesh.rotation.x = time / 2000;
    mesh.rotation.y = time / 1000;

    renderer.render(scene, camera);
  }
});
</script>

<style scoped>
.container {
  border: 1px solid red;
  width: 100vw;
  height: 100vh;
}
</style>
