import Vue from 'vue';
import Router from 'vue-router';
import VGoods from '@/components/VGoods/VGoods';
import VRatings from '@/components/VRatings/VRatings';
import VSeller from '@/components/VSeller/VSeller';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      name: 'goods',
      path: '/goods',
      component: VGoods
    },
    {
      name: 'ratings',
      path: '/ratings',
      component: VRatings
    },
    {
      name: 'seller',
      path: '/seller',
      component: VSeller
    },
    {
      name: 'root',
      path: '/',
      redirect: '/goods'
    }
  ]
});
