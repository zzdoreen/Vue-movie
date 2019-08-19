<template>
  <div class="movie_body" ref="movie_body">
    <loading v-if="movieList==''"></loading>
    <scroller v-else :handleToScroll = "handleToScroll" :handleToTouchEnd="handleToTouchEnd">
      <ul>
        <li class="pullDown">{{ pullDownMsg }}</li>
        <li v-for="item in movieList" :key="item.id">
          <div class="pic_show" @tap="handleToDetail(item.id)">
            <img :src="item.img | setWH('128.180')" />
          </div>
          <div class="info_list" @tap="handleToDetail(item.id)">
            <h2>
              {{ item.nm }}
              <img src="@/assets/images/max.png" v-if="item.version==='v3d imax'" />
            </h2>
            <p>
              观众评分：
              <span class="grade">{{ item.sc }}</span>
            </p>
            <p>主演：{{ item.star }}</p>
            <p>{{ item.showInfo }}</p>
          </div>
          <div class="btn_mall">购票</div>
        </li>
      </ul>
    </scroller>
  </div>
</template>
<script>
export default {
  data() {
    return {
      movieList: [],
      pullDownMsg: "",
      preCityId: -1
    };
  },
  activated() {
    var cityId = this.$store.state.city.id
    if(this.preCityId===cityId)return
    this.getData();
  },
  methods: {
    getData() {
      var cityId = this.$store.state.city.id
      this.axios.get("/api/movieOnInfoList?cityId="+cityId).then(res => {
        if (res.data.msg === "ok") {
          var movie = res.data.data.movieList;
          this.movieList = movie;
          this.preCityId = cityId
        }
      });
    },
    handleToDetail(id){
        this.$router.push('/movie/detail/'+id)
    },
    handleToScroll(pos){
        if(pos.y>30){
            this.pullDownMsg = '正在刷新...'
        }
    },
    handleToTouchEnd(pos){
        if(pos.y>30){
            this.pullDownMsg = '刷新成功!'
            setTimeout(()=>{
                this.pullDownMsg = ''
            },1000)
        }
    }
  }
};
</script>
<style>
</style>