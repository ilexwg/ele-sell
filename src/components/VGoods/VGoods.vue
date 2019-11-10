<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul class="menu-list">
          <li
            class="menu-item"
            :class="{'current': currentIndex === index}"
            v-for="(item, index) in goods"
            :key="index"
            @click="selectMenu(index)"
          >
            <span class="text">
              <span class="icon" :class="classMap[item.type]" v-show="item.type >= 0"></span>{{ item.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li
            class="food-list food-list-hook"
            v-for="(item, index) in goods"
            :key="index"
          >
            <h1 class="title">{{ item.name }}</h1>
            <ul>
              <li
                class="food-item"
                v-for="food in item.foods"
                :key="food.name"
                @click="selectFood(food)"
              >
                <div class="icon">
                  <img :src="food.icon" width="57">
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">¥{{ food.price }}</span>
                    <span class="old" v-if="food.oldPrice">¥{{ food.oldPrice }}</span>
                  </div>
                  <div class="cart-control-wrapper">
                    <cart-control :food="food" @add-cart="addCart"></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopping-cart
        ref="shoppingCart"
        :delivery-price="seller.deliveryPrice"
        :min-price="seller.minPrice"
        :select-foods="selectFoods"
      ></shopping-cart>
    </div>
    <v-food :food="selectedFood" ref="food" @add-cart="addCart"></v-food>
  </div>
</template>

<script>
import ShoppingCart from '@/components/ShoppingCart/ShoppingCart';
import CartControl from '@/components/CartControl/CartControl';
import VFood from '@/components/VFood/VFood';
import BScroll from 'better-scroll';

const ERR_OK = 0;

export default {
  name: 'goods',
  components: {
    ShoppingCart,
    CartControl,
    VFood
  },
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      classMap: [
        'decrease',
        'discount',
        'special',
        'invoice',
        'guarantee'
      ],
      menuScroll: null,
      foodsScroll: null,
      heightList: [],
      scrollY: 0,
      selectedFood: {}
    };
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.heightList.length; i++) {
        const h1 = this.heightList[i];
        const h2 = this.heightList[i + 1];
        if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      const foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  methods: {
    async getGoods() {
      const res = await this.$http.getGoods();
      if (res.errno === ERR_OK) {
        this.goods = res.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      }
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3,
        click: true
      });

      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      const foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook');
      let height = 0;
      this.heightList.push(height);
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight;
        this.heightList.push(height);
      }
    },
    selectMenu(index) {
      const foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook');
      const el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    addCart(target) {
      this.$refs.shoppingCart.drop(target);
    },
    selectFood(food) {
      this.selectedFood = food;
      this.$refs.food.show();
    }
  },
  created() {
    this.getGoods();
  }
};
</script>

<style lang="less" scoped>
@import "../../common/less/mixin";

.goods {
  display: flex;
  overflow: hidden;
  position: absolute;
  top: 176px;
  left: 0;
  bottom: 46px;
  width: 100%;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
    .menu-list {
      .menu-item {
        display: table;
        width: 100%;
        height: 54px;
        padding: 0 12px;
        line-height: 14px;
        &.current {
          position: relative;
          z-index: 10;
          margin-top: -1px;
          background-color: #fff;
          .text {
            font-weight: 400;
            .border-none();
          }
        }
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 2px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            .bg-image('decrease_3');
          }
          &.discount {
            .bg-image('discount_3');
          }
          &.guarantee {
            .bg-image('guarantee_3');
          }
          &.invoice {
            .bg-image('invoice_3');
          }
          &.special {
            .bg-image('special_3');
          }
        }
        .text {
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          .border-1px(rgba(7, 17, 27, 0.1));
          font-size: 12px;
        }
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background-color: #f3f5f7;
    }
    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      .border-1px(rgba(7, 17, 27, 0.1));
      &:last-child {
        .border-none();
        margin-bottom: 0;
      }
      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }
      .content {
        flex: 1;
        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .desc,
        .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .desc {
          margin-bottom: 8px;
          line-height: 14px;
        }
        .extra {
          .count {
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
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
