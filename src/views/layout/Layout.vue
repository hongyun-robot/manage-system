<template>
  <div class="layout">
    <el-container class="outside-container">
      <el-header height="70px">
        <Header />
      </el-header>
      <el-container class="inner-container">
        <el-aside
          width="200px"
          class="custom-aside"
        >
          <Aside />
        </el-aside>
        <el-container>
          <el-main class="custom-main">
            <z-breadcrumb />
            <div class="box">
              <RouterView />
            </div>
          </el-main>
          <el-footer class="custom-footer">
            <Footer />
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import Header from './components/Header.vue'
import Aside from './components/Aside.vue'
import Footer from './components/Footer.vue'
import ZBreadcrumb from '@/components/ZBreadcrumb.vue'
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;

  :deep(.el-header) {
    --el-header-padding: 0;
  }

  .outside-container {
    height: 100%;
    overflow: hidden;

    .inner-container {
      height: calc(100% - 70px);

      .custom-aside {
        height: 100%;
        // overflow-y: auto;
        // background-color: var(--el-color-primary-light-3);
      }

      .custom-main {
        background-color: var(--el-fill-color);
        --el-main-padding: 0px;
        display: flex;
        flex-direction: column;
        .box {
          flex: 1;
          padding: 20px;
          height: 100%;
        }
      }

      .custom-footer {
        --el-footer-height: 0;
      }
    }
  }
}
</style>
