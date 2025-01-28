<script lang="ts" setup>
import { ref } from "vue";

defineOptions({
  name: "TestComponent",
});
const value = ref("这是测试");
const counter = ref(0);
</script>

<template>
  <div class="test">
    {{ value }}
  </div>
  <div class="text-blue">测试unocss</div>
  <span>{{ counter }}</span>
  <button @click="counter++">+</button>
</template>

<style lang="scss" scoped>
.test {
  color: red;
}
</style>
