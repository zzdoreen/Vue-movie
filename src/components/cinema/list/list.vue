<template>
  <div class="cinema_body" ref="cinema_body">
    <loading v-if="cinemas==''"></loading>
    <scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
      <ul>
        <li class="pullDown">{{pullDownMsg}}</li>
        <li v-for="item in cinemas" :key="item.id">
          <div>
            <span>{{ item.nm }}</span>
            <span class="q">
              <span class="price">{{ item.sellPrice }}</span>元起
            </span>
          </div>
          <div class="address">
            <span>{{ item.addr }}</span>
            <span>{{ item.distance }}</span>
          </div>
          <div class="card">
            <div
              v-for="(itemCard,key) in item.tag"
              v-if="itemCard===1"
              :key="key"
              :class="key | classCard"
            >{{ key | formatCard }}</div>
          </div>
        </li>
      </ul>
    </scroller>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      cinemas: [],
      pullDownMsg: "",
      preCityId: -1
    };
  },
  activated() {
    var cityId = this.$store.state.city.id
    if(this.preCityId===cityId)return
    this.getData()
  },
  methods: {
    getData() {
      var cityId = this.$store.state.city.id
      this.axios.get("/api/cinemaList?cityId="+cityId).then(res => {
        if (res.data.msg === "ok") {
          var cinemas = res.data.data.cinemas;
          this.cinemas = cinemas;
          this.preCityId = cityId
        }
      });
    },
    handleToScroll(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = "正在刷新...";
      }
    },
    handleToTouchEnd(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = "刷新成功!";
        setTimeout(() => {
          this.pullDownMsg = "";
        }, 1000);
      }
    }
  },
  filters: {
    formatCard(key) {
      var card = [
        { key: "allowRefund", value: "改签" },
        { key: "endorse", value: "退" },
        { key: "sell", value: "折扣卡" },
        { key: "snack", value: "小吃" }
      ];
      for (var i = 0; i < card.length; i++) {
        if (card[i].key === key) {
          return card[i].value;
        }
      }
      return "";
    },
    classCard(key) {
      var card = [
        { key: "allowRefund", value: "or" },
        { key: "endorse", value: "or" },
        { key: "sell", value: "bl" },
        { key: "snack", value: "bl" }
      ];
      for (var i = 0; i < card.length; i++) {
        if (card[i].key === key) {
          return card[i].value;
        }
      }
      return "";
    }
  }
};
</script>
<style lang="stylus">
.cinema_body .pullDown {
  margin: 0;
  padding: 0;
  border: none;
  color: #ccc;
}
</style>