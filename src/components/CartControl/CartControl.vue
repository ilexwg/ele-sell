<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count > 0" @click.stop="decreaseCart">
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
    <div class="cart-add icon-add_circle" @click.stop="addCart"></div>
  </div>
</template>

<script>
export default {
  name: 'CartControl',
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      this.$emit('add-cart', event.target);
    },
    decreaseCart() {
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.cart-control {
  display: flex;
  align-items: center;
  .cart-decrease {
    padding: 6px;
    font-size: 24px;
    color: rgb(0, 160, 220);
    &.move-enter-active,
    &.move-leave-active {
      transition: all 0.3s linear;
    }
    &.move-enter,
    &.move-leave-to {
      opacity: 0;
      transform: translate3d(24px, 0, 0) rotate(180deg);
    }
  }
  .cart-count {
    width: 12px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .cart-add {
    padding: 6px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }
}
</style>
