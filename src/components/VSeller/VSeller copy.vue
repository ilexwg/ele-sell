<template>
  <div class="seller">
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
    </div>
  </div>
</template>

<script>
import VStar from '@/components/VStar/VStar';
import VSplit from '@/components/VSplit/VSplit';

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
      classMap: [
        'decrease',
        'discount',
        'special',
        'invoice',
        'guarantee'
      ]
    };
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
        border-right: 1px solid rgba(7, 17, 27, 0.1);
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
          .stress {
            font-size: 24px;
            font-weight: 200;
          }
        }
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
        }
      }
    }
  }
}
</style>
