<template>
  <div id="content">
    <ul class="movie_menu">
      <router-link to="city" tag="li" class="city_name">
        <p>{{ $store.state.city.nm }}</p>
        <i class="iconfont icon-lower-triangle"></i>
      </router-link>
      <router-link to="hot" tag="li" class="hot_item active">正在热映</router-link>
      <router-link to="comming" tag="li" class="hot_item">即将上映</router-link>
      <router-link to="search" tag="li" class="search_entry">
        <i class="iconfont"></i>
      </router-link>
    </ul>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import { messageBox } from "../messageBox/js/messageBox";
export default {
  mounted() {
    setTimeout(() => {
      this.axios.get("/api/getLocation").then(res => {
        if (res.data.msg === "ok") {
          var nm = res.data.data.nm;
          var id = res.data.data.id;
          if(this.$store.state.city.nm===nm){
              return
          }  
          messageBox({
            title: "定位",
            content: nm,
            cancel: "取消",
            ok: "设置",
            handleCancel() {
            },
            handleOk() {
              console.log(nm)
              window.sessionStorage.setItem('nowNm',nm)
              window.sessionStorage.setItem('nowId',275)
              window.location.reload()
            }
          });
        }
      });
    }, 2000);
  }
};
</script>
<style lang="stylus">
i::before {
  content: ' \e6aa';
}
</style>