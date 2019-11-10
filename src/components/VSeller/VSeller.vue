<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{ seller.name }}</h1>
        <div class="desc">
          <v-star :size="36" :score="seller.score"></v-star>
          <span class="text">({{ seller.ratingCount }})</span>
          <span class="text">月售{{ seller.sellCount }}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{ seller.minPrice }}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryPrice }}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryTime }}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <i class="icon-favorite" :class="{'active': favorite}"></i>
          <span class="text">{{ favoriteText }}</span>
        </div>
      </div>
      <v-split></v-split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{ seller.bulletin }}</p>
          <ul class="support" v-if="seller.supports">
            <li class="support-item"
              v-for="(item, index) in seller.supports"
              :key="index"
            >
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="description">{{ seller.supports[index].description }}</span>
            </li>
          </ul>
        </div>
      </div>
      <v-split></v-split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li
              class="pic-item"
              v-for="(pic, index) in seller.pics"
              :key="index"
            >
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <v-split></v-split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li
            class="info-item"
            v-for="(info, index) of seller.infos"
            :key="index"
          >{{ info }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import VStar from '@/components/VStar/VStar';
import VSplit from '@/components/VSplit/VSplit';
import {saveToLocal, loadFromLocal} from '@/common/js/store';

export default {
  name: 'seller',
  components: {
    VStar,
    VSplit
  },
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      scroll: null,
      picScroll: null,
      classMap: [
        'decrease',
        'discount',
        'special',
        'invoice',
        'guarantee'
      ],
      favorite: (() => {
        return loadFromLocal(this.seller.id, 'favorite', false);
      })()
    };
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏';
    }
  },
  watch: {
    seller() {
      console.log('***');
      this._initScroll();
      this._initPicsScroll();
    }
  },
  methods: {
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    },
    _initPicsScroll() {
      if (this.seller.pics) {
        const picWidth = 120;
        const margin = 6;
        const width = (picWidth + margin) * this.seller.pics.length - 6;
        this.$refs.picList.style.width = width + 'px';
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            });
          } else {
            this.picScroll.refresh();
          }
        });
      }
    },
    toggleFavorite() {
      this.favorite = !this.favorite;
      saveToLocal(this.seller.id, 'favorite', this.favorite);
    }
  },
  mounted() {
    this._initScroll();
    this._initPicsScroll();
  }
};
</script>

<style lang="less" scoped>
@import "../../common/less/mixin";

.seller {
  overflow: hidden;
  position: absolute;
  top: 176px;
  left: 0;
  bottom: 0;
  width: 100%;
  .overview {
    position: relative;
    padding: 18px;
    .title {
      margin-bottom: 8px;
      line-height: 14px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
    .desc {
      display: flex;
      align-items: center;
      padding-bottom: 18px;
      line-height: 18px;
      .border-1px(rgba(7, 17, 27, 0.1));
      .star {
        margin-right: 8px;
        margin-bottom: 4px;
      }
      .text {
        margin-right: 12px;
        font-size: 10px;
        color: rgb(77, 85, 93);
      }
    }
    .remark {
      display: flex;
      padding-top: 18px;
      .block {
        flex: 1;
        text-align: center;
        &:last-child {
          border-right: none;
        }
        h2 {
          margin-bottom: 4px;
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .content {
          line-height: 24px;
          font-size: 10px;
          color:rgb(7, 17, 27);
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          .stress {
            font-size: 24px;
            font-weight: 200;
          }
        }
      }
    }
    .favorite {
      position: absolute;
      right: 10px;
      top: 18px;
      width: 50px;
      text-align: center;
      .icon-favorite {
        display: block;
        margin-bottom: 4px;
        line-height: 24px;
        font-size: 24px;
        color: #d4d6d9;
        &.active {
          color: rgb(240, 20, 20);
        }
      }
      .text {
        line-height: 10px;
        font-size: 10px;
        color: rgb(77, 85, 93);
      }
    }
  }
  .bulletin {
    padding: 18px 18px 0 18px;
    .title {
      margin-bottom: 8px;
      line-height: 14px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
    .content-wrapper {
      padding: 0 12px 16px;
      .border-1px(rgba(7, 17, 27, 0.1));
      .content {
        line-height: 24px;
        font-size: 12px;
        color: rgb(240, 20, 20);
      }
      .support {
        .support-item {
          display: flex;
          align-items: center;
          padding: 16px 12px;
          .border-1px(rgba(7, 17, 27, 0.1));
          &:last-child {
            .border-none();
          }
          .icon {
            width: 12px;
            height: 12px;
            margin-right: 4px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease {
              .bg-image('decrease_4');
            }
            &.discount {
              .bg-image('discount_4');
            }
            &.guarantee {
              .bg-image('guarantee_4');
            }
            &.invoice {
              .bg-image('invoice_4');
            }
            &.special {
              .bg-image('special_4');
            }
          }
          .description {
            line-height: 16px;
            font-size: 12px;
            color:rgb(7, 17, 27);
          }
        }
      }
    }
  }
  .pics {
    padding: 18px;
    .title {
      margin-bottom: 8px;
      line-height: 14px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
    .pic-wrapper {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      .pic-list {
        font-size: 0;
        .pic-item {
          display: inline-block;
          margin-right: 6px;
          width: 120px;
          height: 90px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  .info {
    padding: 18px 18px 0 18px;
    color:rgb(7, 17, 27);
    .title {
      padding-bottom: 8px;
      .border-1px(rgba(7, 17, 27, 0.1));
      line-height: 14px;
      font-size: 14px;
    }
    .info-item {
      padding: 16px 12px;
      line-height: 16px;
      .border-1px(rgba(7, 17, 27, 0.1));
      font-size: 12px;
      &:last-child {
        .border-none();
      }
    }
  }
}
</style>
