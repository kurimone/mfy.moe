<template>
  <div style="width: 100%; height: 100%; z-index: -1000">
    <canvas id="canvas_view"></canvas>
  </div>
</template>

<script setup>
import { init } from "./components/index";
import { onMounted } from "vue";

onMounted(() => {
  init();
});
</script>
