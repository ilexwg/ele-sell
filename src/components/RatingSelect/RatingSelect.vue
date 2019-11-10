<template>
  <div class="rating-select">
    <div class="rating-type">
      <span class="block positive"
        :class="{'active': selectType === 2}"
        @click="select(2)"
      >{{ desc.all }}<span class="count">{{ ratings.length }}</span>
      </span>
      <span class="block positive"
        :class="{'active': selectType === 0}"
        @click="select(0)"
      >{{ desc.positive }}<span class="count">{{ positives.length }}</span>
      </span>
      <span class="block negative"
        :class="{'active': selectType === 1}"
        @click="select(1)"
      >{{ desc.negative }}<span class="count">{{ negatives.length }}</span>
      </span>
    </div>
    <div class="switch" :class="{'on': onlyContent}"
      @click="toggleContent"
    >
      <i class="icon-check_circle"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
// const ALL = 2;

export default {
  name: 'RatingSelect',
  props: {
    ratings: {
      type: Array,
      default: () => []
    },
    selectType: {
      type: Number,
      default: 2
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  },
  methods: {
    select(type) {
      this.$emit('rating-type-change', type);
    },
    toggleContent() {
      this.$emit('only-content-change');
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../common/less/mixin";

.rating-select {
  .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    .border-1px(rgba(7, 17, 27, 0.1));
    font-size: 0;
    .block {
      display: inline-block;
      padding: 8px 12px;
      margin-right: 8px;
      border-radius: 1px;
      font-size: 12px;
      color: rgb(77, 85, 93);
      .count {
        margin-left: 2px;
        line-height: 16px;
        font-size: 8px;
      }
      &.active {
        color: #fff;
      }
      &.positive {
        background-color: rgba(0, 160, 220, 0.2);
        &.active {
          background-color: rgb(0, 160, 220);
        }
      }
      &.negative {
        background-color: rgba(77, 85, 93, 0.2);
        &.active {
          background-color: rgb(77, 85, 93);
        }
      }
    }
  }
  .switch {
    display: flex;
    align-items: center;
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: 2px solid rgba(7, 17, 27, 0.1);
    font-size: 0;
    color: rgb(147, 153, 159);
    .icon-check_circle {
      margin: 4px;
      font-size: 24px;
    }
    .text {
      font-size: 12px;
    }
    &.on {
      .icon-check_circle {
        color: #00c850;
      }
    }
  }
}
</style>
