<template>
  <div id="app">
    <!-- router-view路由容器 -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//vue的装饰器包

@Component({})
export default class App extends Vue {}
</script>

<style>
</style>
