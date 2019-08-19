<template>
  <div id="main">
    <header id="header">
      <h1>Z站</h1>
    </header>
    <router-view />
    <footer id="footer">
      <ul>
        <router-link to="/movie" tag="li" class="active">
          <i  class="iconfont icon-dianying"></i>
          <p>电影</p>
        </router-link>
        <router-link to="/cinema" tag="li">
          <i class="iconfont icon-yingyuan"></i>
          <p>影院</p>
        </router-link>
        <router-link to="/mine" tag="li">
          <i class="iconfont icon-wode"></i>
          <p>我的</p>
        </router-link>
      </ul>
    </footer>
    <router-view name="Detail"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  created() {}
};
</script>