<template>
    <div id="detailContainer" class="slide-enter-active">
        <header id="header">
            <i class="iconfont icon-right" @touchstart = 'handleToBack'></i>
            <h1>影片详情</h1>
        </header>
        <loading v-if='detailMovie==""' />
        <div v-else id="content" class="contentDetail">
            <div class="detail_list">
                <div class="detail_list_bg" :style="{'background-image': 'url('+detailMovie.img.replace(/w\.h/,'148.208')+')'}"></div>
                <div class="detail_list_filter"></div>
                <div class="detail_list_content">
                    <div class="detail_list_img">
                        <img :src="detailMovie.img | setWH('148.208')" alt="">
                    </div>
                    <div class="detail_list_info">
                        <h2>{{ detailMovie.nm }}</h2>
                        <p>{{ detailMovie.enm }}</p>
                        <p>{{ detailMovie.sc }}</p>
                        <p>{{ detailMovie.cat }}</p>
                        <p>{{ detailMovie.src }}</p>
                        <p>{{ detailMovie.pubDesc }}</p>
                    </div>
                </div>
            </div>
            <div class="detail_intro">
                <p>{{ detailMovie.dra }}</p>
            </div>
            <div class="detail_player swiper-container" ref="detail_player">
                <ul class="swiper-wrapper">
                    <li class="swiper-slide" v-for="(item,index) in detailMovie.photos" :key="index">
                        <div>
                            <img :src="item | setWH('350.200')" alt="">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {Swiper} from '@/assets/lib/swiper-4.1.0.min.js'
export default {
    data() {
        return {
            detailMovie:[]
        }
    },
    props:['id'],
    activated() {
        this.getData()
    },
    methods: {
        handleToBack(){
            this.$router.back()
        },
        getData(){
            this.axios.get('/api/detailmovie?movieId='+this.id).then(res=>{
                if(res.data.msg==='ok'){
                    var detailMovie = res.data.data.detailMovie
                    this.detailMovie = detailMovie

                    this.$nextTick(()=>{
                        new Swiper(this.$refs.detail_player,{
                            slidesPerView: 'auto',
                            freeMode: true,
                            freeModeSticky: true
                        })
                    })
                }
            })
        }
    },
}
</script>
<style lang="stylus" scoped>
    #detailContainer
        position fixed
        left 0
        top 0
        z-index 100
        width 100%
        min-height 100%
        background white
    .slide-enter-active
        animation .3s slideMove
    
    @keyframes slideMove {
        0%{
            transform translateX(100%)
        }
        100%{
            transform translateX(0)
        }
    }
</style>