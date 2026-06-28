<script setup lang="ts"></script>

<template>
  <main class="app">
    <el-menu mode="horizontal" style="margin-bottom: 24px;">
      <el-menu-item index="/home">
        <router-link to="/home">首页</router-link>
      </el-menu-item>
      <el-menu-item index="/list">
        <router-link to="/list">列表</router-link>
      </el-menu-item>
      <el-menu-item index="/publish">
        <router-link to="/publish">发布</router-link>
      </el-menu-item>
      <el-menu-item index="/message">
        <router-link to="/message">消息</router-link>
      </el-menu-item>
      <el-menu-item index="/profile">
        <router-link to="/profile">我的</router-link>
      </el-menu-item>
      <el-menu-item index="/board">
        <router-link to="/board">看板</router-link>
      </el-menu-item>
    </el-menu>
    <router-view />
  </main>
</template>

<style scoped>
.app {
  padding: 32px;
}
</style>