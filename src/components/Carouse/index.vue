<template>
  <div class="swiper-container" ref="reference">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="banner in bannerList" :key="banner.id">
        <img v-lazy="banner.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  props: ["bannerList"],
  name: "Carouse",
  watch: {
    bannerList: {
      immediate: true,
      handler(newVal, oldVal) {
        this.$nextTick(() => {
          new Swiper(this.$refs.reference, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>