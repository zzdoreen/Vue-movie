<template>
  <div class="movie_body" ref="movie_body">
    <loading v-if="comingList==''"></loading>
    <scroller v-else :handleToScroll = "handleToScroll" :handleToTouchEnd="handleToTouchEnd">
    <ul>
      <li class="pullDown">{{ pullDownMsg }}</li>
      <li v-for="item in comingList" :key="item.id">
        <div class="pic_show" @tap="handleToDetail(item.id)">
          <img :src="item.img | setWH('128.180')" alt />
        </div>
        <div class="info_list" @tap="handleToDetail(item.id)">
          <h2>{{ item.nm }}<img src="@/assets/images/max.png" v-if="item.version==='v3d imax'" /> </h2>
          <p>
            <span class="person">{{ item.wish }}</span>人想看
          </p>
          <p>主演：{{ item.star }}</p>
          <p>{{ item.rt }}上映</p>
        </div>
        <div class="btn_pre">预售</div>
      </li>
    </ul>
    </scroller>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comingList: [],
      pullDownMsg: '',
      preCityId: -1
    }
  },
  activated() {
    var cityId = this.$store.state.city.id
    if(this.preCityId===cityId)return
    this.getData()
  },
  methods: {
    getData(){
      var cityId = this.$store.state.city.id
      this.axios.get('/api/movieComingList?cityId='+cityId).then((res)=>{
        if(res.data.msg==='ok'){
          var comingList = res.data.data.comingList
          this.comingList = comingList
          this.preCityId = cityId
        }
      })
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
    },
    handleToDetail(id){
      this.$router.push('/movie/detail/'+id)
    }
  },
};
</script>
<style lang="stylus"></style>