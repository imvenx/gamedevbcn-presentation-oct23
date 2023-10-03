<template>
  <div ref="renderCanvas"></div>
</template>

<script lang="ts" setup>
import { Arcane, GetQuaternionEvent } from 'arcanepad-web-sdk';
import { Engine, Scene, FreeCamera, Vector3, HemisphericLight, MeshBuilder, Quaternion, SceneLoader } from 'babylonjs';
import { ref, onMounted, onUnmounted } from 'vue';
import '@babylonjs/loaders';

const renderCanvas = ref<HTMLDivElement | null>(null);
let quaternion: Quaternion | null = new Quaternion(0, 0, 0, 0)

onMounted(() => {
  const pad = Arcane.pads[0]
  pad.startGetQuaternion()
  pad.onGetQuaternion(({ w, x, y, z }: GetQuaternionEvent) => {
    quaternion = new Quaternion(x, y, z, w)
  })
  create3DScene()
})

async function create3DScene() {
  if (renderCanvas.value) {
    const canvas = document.createElement('canvas');
    renderCanvas.value.appendChild(canvas);

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());

    const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
    // const cube = MeshBuilder.CreateBox('box', {}, scene);

    SceneLoader.ImportMesh('', '/meshes/', 'sword.glb', scene, (meshes) => {
      // Code to run after the model has been loaded
    });

    // var phone = BABYLON.MeshBuilder.CreateBox('phone', {});

    // phone.scaling = new BABYLON.Vector3(2, 4, 0.1);
    // phone.position.y = 0.2;

    engine.runRenderLoop(() => {
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      // phone.rotationQuaternion = quaternion as any
      scene.render();
    });

    window.addEventListener('resize', () => {
      engine.resize();
    });

    onUnmounted(() => {
      engine.dispose();
      window.removeEventListener('resize', () => {
        engine.resize();
      });
    });
  }
}
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
  border: 5px solid red;
}
</style>
