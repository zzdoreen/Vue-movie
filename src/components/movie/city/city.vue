<template>
  <div class="city_body">
    <!-- 城市列表 -->
    <loading v-if="cityList==''"></loading>
    <div v-else class="city_list">
      <scroller ref="city_list">
        <div>
          <div class="pullDown">{{ pullDownMsg }}</div>
          <!-- 热门城市 -->
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li v-for="item in hotList" :key="item.id"
              @tap="handleToCity(item.nm,item.id)">{{item.nm}}</li>
            </ul>
          </div>

          <!-- 城市列表 -->
          <div class="city_sort" ref="city_sort">
            <div v-for="item in cityList" :key="item.id">
              <h2>{{item.index}}</h2>
              <ul v-for="city in item.list" :key="city.id">
                <li  @tap="handleToCity(city.nm,city.id)">{{city.nm}}</li>
              </ul>
            </div>
          </div>
        </div>
      </scroller>
    </div>
    <!-- 侧边字母索引栏 -->
    <div class="city_index">
      <ul>
        <li
          v-for="(item,index) in cityList"
          :key="item.id"
          @touchstart="handleToIndex(index)"
        >{{item.index}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cityList: [],
      hotList: [],
      pullDownMsg: ''
    };
  },
  mounted() {
    var cityList = window.sessionStorage.getItem('cityList')
    var hotList = window.sessionStorage.getItem('hotList')
    if(cityList&&hotList){
      this.cityList = JSON.parse(cityList)
      this.hotList = JSON.parse(hotList)
    }else{
       this.getData();
    }
   
  },
  methods: {
    getData() {
      this.axios.get("/api/cityList").then(res => {
        var msg = res.data.msg;
        if (msg === "ok") {
          var cities = res.data.data.cities;
          /**
           * 转化成
           * [ {
           *      index:'A',
           *      list:[
           *          {nm:'XX',id:'xx',py:'xx'},
           *          ...
           *      ]
           * } ]
           */
          var { cityList, hotList } = this.formatCityList(cities);
          this.cityList = cityList;
          this.hotList = hotList;
          window.sessionStorage.setItem('cityList',JSON.stringify(cityList))
          window.sessionStorage.setItem('hotList',JSON.stringify(hotList))
        }
      });
    },
    formatCityList(cities) {
      var cityList = [];
      var hotList = [];
      for (let i = 0; i < cities.length; i++) {
        if (cities[i].isHot === 1) {
          hotList.push(cities[i]);
        }
      }
      for (let i = 0; i < cities.length; i++) {
        let firstLetter = cities[i].py.slice(0, 1).toUpperCase();
        if (toCom(firstLetter)) {
          cityList.push({ index: firstLetter, list: [cities[i]] });
        } else {
          for (let j = 0; j < cityList.length; j++) {
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push(cities[i]);
            }
          }
        }
      }
      function toCom(firstLetter) {
        for (let i = 0; i < cityList.length; i++) {
          if (cityList[i].index === firstLetter) {
            return false; //已有首字母 返回false 进行累加
          }
        }
        return true; //没有首字母 返回true 进行添加
      }
      cityList.sort((n, m) => {
        return n.index > m.index ? 1 : -1;
      });

      return { cityList, hotList };
    },
    handleToIndex(index) {
      /**获取对应节点的滚动高度 设置父元素的滚动高度 */
      var h2Top = this.$refs.city_sort.getElementsByTagName("h2")[index].offsetTop;
      this.$refs.city_list.toScrollTop(-h2Top);
    },
    handleToCity(nm,id){
      window.sessionStorage.setItem('nowNm',nm)
      window.sessionStorage.setItem('nowId',id)
      this.$store.commit('city/CITY_INFO',{nm,id})
      this.$router.push('/movie/hot')
    }
  }
};
</script>
<style>
</style>