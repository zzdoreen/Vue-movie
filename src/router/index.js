import Vue from 'vue'
import Router from 'vue-router'
import Movie from '@/components/movie/movie'
import Hot from '@/components/movie/hot/hot'
import Detail from '@/components/movie/detail/detail'
import Comming from '@/components/movie/comming/comming'
import City from '@/components/movie/city/city'
import Search from '@/components/movie/search/search'
import Mine from '@/components/mine/mine'
import Cinema from '@/components/cinema/cinema'
import List from '@/components/cinema/list/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'*',
      redirect: '/movie/hot',
    },
     {
      path: '/movie',
      redirect: '/movie/hot',
      name: 'Movie',
      component: Movie,
      children:[
        {
          path: 'detail/:id',
          name: 'Detail',
          component: Detail,
          props: true
        },
        {
          path: 'hot',
          name: 'Hot',
          component: Hot
        },
        {
          path: 'city',
          name: 'City',
          component: City
        },
        {
          path: 'comming',
          name: 'Comming',
          component: Comming
        },
        {
          path: 'search',
          name: 'Search',
          component: Search
        }
      ]
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/cinema',
      redirect: '/cinema/list',
      name: 'Cinema',
      component: Cinema,
      children:[
        {
          path:'list',
          name: 'List',
          component: List
        }
      ]
    }   
  ]
})
