<!--  -->
<template>
  <div class="antv-panel">
    <div class="content-panel">
      <div :id="'testid'" class="antv-container" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Graph } from "@antv/x6";
import { computed, nextTick, onMounted, reactive, ref } from "vue";
import FlowGraph from './hooks/flowGraph'
import Test from './components/Text.vue'


// 初始化antv画板
const initAntv = () => {
  nextTick(() => {
    const graph = FlowGraph.init()

    Graph.registerVueComponent(
      "test",
      {
        template: `<Test />`,
        components: {
          Test,
        },
      },
      true
    );

    graph.addNode({
      shape: 'rect',
      x: 500, y: 600,
      width: 100, height: 100
    })
    graph.addNode({
      x: 40,
      y: 40,
      width: 100,
      height: 50,
      shape: 'vue-shape',
      component: 'test',
    })
  })
}

onMounted(() => {
  initAntv()
})
</script>
<style scoped lang="less">
.antv-panel {
  .antv-container {
    width: 100vw;
    height: 100vh;
  }
}
</style>