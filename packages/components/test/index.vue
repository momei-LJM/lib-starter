<script lang="ts" setup>
import { reactive, ref } from "vue";
import { getUserInfo } from "../api";
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

const userInfo = ref();
const initData = async () => {
  const res = await getUserInfo();
  userInfo.value = res;
  console.log("fromComponents", res);
};
initData();

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
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>
</template>

<style lang="scss" scoped>
.test {
  color: red;
}
</style>
