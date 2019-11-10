<template>
  <div id="app">
    <!-- <router-view/> -->
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import VHeader from '@/components/VHeader/VHeader';

const ERR_OK = 0;

export default {
  name: 'App',
  data() {
    return {
      seller: {
        id: (() => {
          return this.$route.query.id;
        })()
      }
    };
  },
  components: {
    VHeader
  },
  methods: {
    async getSellerData() {
      const res = await this.$http.getSeller({
        id: this.seller.id
      });
      if (res.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, res.data);
      }
    }
  },
  created() {
    this.getSellerData();
  }
};
</script>

<style scoped lang="less">
@import "../src/common/less/mixin";

.tab {
  position: relative;
  z-index: 20;
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  .border-1px(rgba(7, 17, 27, 0.1));

  .tab-item {
    flex: 1;
    text-align: center;

    & > a {
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
      &.active {
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>
