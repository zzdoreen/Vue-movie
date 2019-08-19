<template>
    <div id="content">
        <ul class="movie_menu">
            <router-link to="list" tag="li" class="city_name">全城<i class="iconfont icon-lower-triangle"></i></router-link>
            <router-link to="list" tag="li" class="hot_item active">品牌<i class="iconfont icon-lower-triangle"></i></router-link>
            <router-link to="list" tag="li" class="hot_item">特色<i class="iconfont icon-lower-triangle"></i></router-link>
        </ul>
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>
<script>
export default {
}
</script>
<style>
    
</style>