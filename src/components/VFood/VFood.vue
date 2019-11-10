<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{ food.name }}</h1>
          <div class="detail">
            <span class="sell-count">月售{{ food.sellCount }}份</span>
            <span class="rating">好评率{{ food.rating }}%</span>
          </div>
          <div class="price">
            <span class="now">¥{{ food.price }}</span>
            <span class="old" v-if="food.oldPrice">¥{{ food.oldPrice }}</span>
          </div>
          <div class="cart-control-wrapper">
            <cart-control :food="food" @add-cart="addCart"></cart-control>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count === 0"
              @click.stop="addFirst"
            >加入购物车</div>
          </transition>
        </div>
        <v-split v-if="food.info"></v-split>
        <div class="info" v-if="food.info">
          <h1 class="title">商品介绍</h1>
          <div class="text">{{ food.info }}</div>
        </div>
        <v-split></v-split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <rating-select
            :select-type="selectType"
            :only-content="onlyContent"
            :desc="desc"
            :ratings="food.ratings"
            @rating-type-change="changeRatingType"
            @only-content-change="toggleOnlyContent"
          ></rating-select>
          <div class="rating-wrapper">
            <ul v-if="food.ratings && food.ratings.length">
              <li
                class="rating-item"
                v-for="(rating, index) in food.ratings"
                :key="index"
                v-show="needShow(rating.rateType, rating.text)"
              >
                <div class="user">
                  <span class="name">{{ rating.username }}</span>
                  <img class="avatar" :src="rating.avatar" width="12">
                </div>
                <div class="time">{{ rating.rateTime | formatDate }}</div>
                <p class="text">
                  <i
                    :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"
                  ></i>
                  {{ rating.text }}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-else>
              暂无评价
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll';
import CartControl from '@/components/CartControl/CartControl';
import VSplit from '@/components/VSplit/VSplit';
import RatingSelect from '@/components/RatingSelect/RatingSelect';
import {formatDate} from '@/common/js/date';

const ALL = 2;

export default {
  name: 'VFood',
  components: {
    CartControl,
    VSplit,
    RatingSelect
  },
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      scroll: null,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    };
  },
  filters: {
    formatDate(time) {
      const date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  methods: {
    initRatingSelect() {
      this.selectType = ALL;
      this.onlyContent = true;
    },
    show() {
      this.showFlag = true;
      this.initRatingSelect();
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.showFlag = false;
    },
    addCart(target) {
      this.$emit('add-cart', target);
    },
    addFirst(event) {
      this.$emit('add-cart', event.target);
      this.$set(this.food, 'count', 1);
    },
    changeRatingType(type) {
      this.selectType = type;
    },
    toggleOnlyContent() {
      this.onlyContent = !this.onlyContent;
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../common/less/mixin";

.food {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background-color: #fff;
  &.move-enter-active,
  &.move-leave-active {
    transform: translate3d(0, 0, 0);
    transition: all 0.4s linear;
  }
  &.move-enter,
  &.move-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .food-content {
    .image-header {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      img {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
      }
      .back {
        position: absolute;
        left: 14px;
        top: 14px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.4);
        .icon-arrow_lift {
          display: flex;
          justify-content: center;
          align-items: center;
          display: block;
          padding: 10px;
          font-size: 20px;
          color: #fff;
        }
      }
    }
    .content {
      position: relative;
      padding: 18px;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        font-size: 14px;
        font-weight: 700;
        color: rgba(7, 17, 27);
      }
      .detail {
        margin-bottom: 18px;
        height: 10px;
        line-height: 10px;
        font-size: 0;
        .sell-count,
        .rating {
          display: inline-block;
          font-size: 10px;
          color: rgb(147,153, 159);
        }
        .sell-count {
          margin-right: 12px;
        }
      }
      .price {
        font-weight: 700;
        line-height: 24px;
        .now {
          margin-right: 8px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }
        .old {
          text-decoration: line-through;
          font-size: 10px;
          font-weight: 700;
          color: rgb(147, 153, 159);
        }
      }
      .cart-control-wrapper {
        position: absolute;
        right: 12px;
        bottom: 12px;
        z-index: 5;
      }
      .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10;
        height: 24px;
        line-height: 24px;
        padding: 0 12px;
        border-radius: 24px;
        font-size: 10px;
        color: #fff;
        background-color: rgb(0, 160, 220);
        &.fade-enter-active,
        &.fade-leave-active {
          transition: all 0.4s;
        }
        &.fade-enter,
        &.fade-leave-to {
          opacity: 0;
        }
      }
    }
    .info {
      padding: 18px;
      .title {
        line-height: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .text {
        padding: 0 8px;
        line-height: 24px;
        font-size: 12px;
        color: rgb(77, 85, 93);
      }
    }
    .rating {
      padding-top: 18px;
      .title {
        line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .rating-wrapper {
        padding: 0 18px;
        .rating-item {
          position: relative;
          padding: 16px 0;
          .border-1px(rgba(7, 17, 27, 0.1));
          .user {
            display: flex;
            align-items: center;
            position: absolute;
            right: 0;
            top: 16px;
            line-height: 12px;
            color: rgb(147, 153, 159);
            .name {
              margin-right: 6px;
              font-size: 10px;
            }
            .avatar {
              border-radius: 50%;
            }
          }
          .time {
            margin-bottom: 6px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .text {
            line-height: 16px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .icon-thumb_up,
          .icon-thumb_down {
            margin-right: 4px;
            line-height: 16px;
            font-size: 12px;
          }
          .icon-thumb_up {
            color: rgb(0, 160, 220);
          }
          .icon-thumb_down {
            color: rgb(147, 153, 159);
          }
        }
        .no-rating {
          padding: 16px 0;
          font-size: 12px;
          color: rgb(147, 153, 159);
          text-align: center;
        }
      }
    }
  }
}
</style>
