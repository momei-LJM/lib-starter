<script lang="ts" setup>
import { ref } from 'vue'

defineOptions({
    name: 'TestComponent',
})
const value = ref('这是测试')
</script>

<template>
    <div class="test">
        {{ value }}
    </div>
    <div class="text-blue">测试unocss</div>
</template>

<style lang="scss" scoped>
.test {
    color: red;
}
</style>
