<template>
  <div class="ratings" ref="ratingContainer">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{ seller.score }}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <v-star :size="36" :score="seller.serviceScore"></v-star>
            <span class="score">{{ seller.serviceScore }}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <v-star :size="36" :score="seller.foodScore"></v-star>
            <span class="score">{{ seller.foodScore }}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <v-split></v-split>
      <rating-select
        :select-type="selectType"
        :only-content="onlyContent"
        :ratings="ratings"
        @rating-type-change="changeRatingType"
        @only-content-change="toggleOnlyContent"
      ></rating-select>
      <div class="rating-wrapper">
        <ul>
          <li
            class="rating-item"
            v-for="(rating, index) of ratings"
            :key="index"
            v-show="needShow(rating.rateType, rating.text)"
          >
            <div class="avatar">
              <img :src="rating.avatar" width="28">
            </div>
            <div class="content">
              <h1 class="name">{{ rating.username }}</h1>
              <div class="star-wrapper">
                <v-star class="star" :size="24" :score="rating.score"></v-star>
                <span class="delivery" v-if="rating.deliveryTime">{{ rating.deliveryTime }}分钟送达</span>
              </div>
              <p class="text">{{ rating.text }}</p>
              <div class="recommend" v-if="rating.recommend && rating.recommend.length">
                <i class="icon-thumb_up"></i>
                <span
                  class="item"
                  v-for="(item, index) of rating.recommend"
                  :key="index"
                >{{ item }}</span>
              </div>
              <div class="time">
                {{ rating.rateTime | formatDate }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import VStar from '@/components/VStar/VStar';
import VSplit from '@/components/VSplit/VSplit';
import RatingSelect from '@/components/RatingSelect/RatingSelect';
import {formatDate} from '@/common/js/date';

const ERR_OK = 0;
const ALL = 2;

export default {
  name: 'ratings',
  components: {
    VStar,
    VSplit,
    RatingSelect
  },
  props: {
    seller: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true,
      scroll: null
    };
  },
  filters: {
    formatDate(time) {
      const date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  methods: {
    async getRatings() {
      const res = await this.$http.getRatings();
      if (res.errno === ERR_OK) {
        this.ratings = res.data;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratingContainer, {
            click: true
          });
        });
      }
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
  },
  created() {
    this.getRatings();
  }
};
</script>

<style lang="less" scoped>
@import "../../common/less/mixin";

.ratings {
  overflow: hidden;
  position: absolute;
  top: 176px;
  left: 0;
  bottom: 0;
  width: 100%;
  .ratings-content {
    width: 100%;
    .overview {
      display: flex;
      padding: 18px 0;
      .overview-left {
        flex: 0 0 137px;
        width: 137px;
        padding: 6px 0;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
        @media only screen and (max-width: 320px) {
          flex: 0 0 120px;
          width: 120px;
        }
        .score {
          margin-bottom: 6px;
          line-height: 28px;
          font-size: 24px;
          color: rgb(255, 153, 0);
        }
        .title {
          margin-bottom: 8px;
          line-height: 12px;
          font-size: 12px;
        }
        .rank {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
      .overview-right {
        flex: 1;
        padding: 6px 0 6px 24px;
        @media only screen and (max-width: 320px) {
          padding-left: 6px;
        }
        .score-wrapper {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          .title {
            line-height: 18px;
            font-size: 12px;
            color: rgb(7, 17, 27)
          }
          .star {
            margin: 0 12px;
          }
          .score {
            line-height: 18px;
            font-size: 12px;
            color: rgb(255, 153, 0);
          }
        }
        .delivery-wrapper {
          display: flex;
          align-items: center;
          line-height: 18px;
          font-size: 12px;
          .title {
            color: rgb(7, 17, 27);
          }
          .delivery {
            margin-left: 12px;
            color:rgb(147, 153, 159);
          }
        }
      }
    }
    .rating-wrapper {
      padding: 0 18px;
      .rating-item {
        display: flex;
        padding: 18px 0;
        .border-1px(rgba(7, 17, 27, 0.1));
        .avatar {
          flex: 0 0 28px;
          width: 28px;
          margin-right: 12px;
          img {
            border-radius: 50%;
          }
        }
        .content {
          position: relative;
          flex: 1;
          .name {
            margin-bottom: 4px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(7, 17, 27);
          }
          .star-wrapper {
            display: flex;
            align-items: center;
            margin-bottom: 6px;
            .star {
              margin-bottom: 2px;
            }
            .delivery {
              margin-left: 6px;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .text {
            margin-bottom: 8px;
            line-height: 18px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .recommend {
            line-height: 16px;
            font-size: 9px;
            .icon-thumb_up,
            .item {
              margin: 0 8px 4px 0;
            }
            .icon-thumb_up {
              color: rgb(0, 160, 220);
            }
            .item {
              padding: 2px 6px;
              border: 1px solid rgba(7, 17, 27, 0.1);
            }
          }
          .time {
            position: absolute;
            top: 0;
            right: 0;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
}
</style>
