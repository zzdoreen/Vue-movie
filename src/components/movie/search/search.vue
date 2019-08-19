<template>
    <div class="search_body">
        <div class="search_input">
            <div class="search_input_wrapper">
                <i class="iconfont icon-sousou"></i>
                <input type="text" v-model="msg">
            </div>
        </div>
        <div class="search_result">
            <h3>电影/电视剧/综艺</h3>
            <ul>
                <li v-for="item in moviesList" :key="item.id">
                    <div class="img"><img :src="item.img | setWH('128.180')" alt=""></div>
                    <div class="info">
                        <p><span>{{ item.nm }}</span><span>{{ item.sc }}</span></p>
                        <p>{{ item.enm }}</p>
                        <p>{{ item.cat }}</p>
                        <p>{{ item.rt }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            moviesList: [],
            msg:''
        }
    },
    methods: {
        getData(value){
            //axios自带阻止多次请求的api
            this.cancelRequest()
            var that = this
            var cityId = this.$store.state.city.id
            this.axios.get('/api/searchList?cityId='+cityId+'&kw='+value,{
                cancelToken: new this.axios.CancelToken(function excutor(c){
                    that.source = c
                })
            }).then((res)=>{
                if(res.data.msg==='ok' && res.data.data.movies){
                    var moviesList = res.data.data.movies.list
                    this.moviesList = moviesList
                }
            }).catch((err)=>{
                if(this.axios.isCancel(err)){
                    console.log("Request canceled",err.message)
                }else{
                    console.log(err)
                }
            })
        },
        cancelRequest(){
            if(typeof this.source=== 'function'){
                this.source('终止请求')
            }
        }
    },
    watch: {
      msg(newValue){
         this.getData(newValue)
      }  
    },
}
</script>
<style lang="stylus">
    
</style>