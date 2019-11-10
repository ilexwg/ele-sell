<template>
  <div class="star" :class="starType">
    <span class="star-item"
      v-for="(itemClass, index) in itemClasses"
      :key="index"
      :class="itemClass"
    ></span>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_OFF = 'off';
const CLS_HALF = 'half';

export default {
  name: 'VStar',
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size;
    },
    itemClasses() {
      const result = [];
      const score = Math.floor(this.score * 2) / 2;
      const hasDecimal = score % 1 !== 0;
      const integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }

      return result;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../common/less/mixin";

.star {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0;
  white-space: nowrap;
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;
      &.on {
        .bg-image('star48_on');
      }
      &.off {
        .bg-image('star48_off');
      }
      &.half {
        .bg-image('star48_half');
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;
      &.on {
        .bg-image('star36_on');
      }
      &.off {
        .bg-image('star36_off');
      }
      &.half {
        .bg-image('star36_half');
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;
      &.on {
        .bg-image('star24_on');
      }
      &.off {
        .bg-image('star24_off');
      }
      &.half {
        .bg-image('star24_half');
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
