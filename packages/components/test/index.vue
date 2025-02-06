<script lang="ts" setup>
import { reactive, ref } from "vue";
interface TTT {
  name: string;
  age: number;
}
defineOptions({
  name: "TestComponent",
});

defineProps<{ msg?: string }>();
const data = reactive<TTT>({
  name: "张三",
  age: 18,
});
const value = ref("这是测试");
const counter = ref(0);
defineExpose({
  data,
  value,
  counter,
});
</script>

<template>
  <div class="test">
    {{ value }}
  </div>
  <div class="text-green">测试unocss</div>
  <span>{{ counter }}</span>
  <button @click="counter++">+</button>
</template>

<style lang="scss" scoped>
.test {
  color: red;
}
</style>
