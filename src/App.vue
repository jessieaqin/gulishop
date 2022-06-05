<template>
  <div>
    <Header />
    <router-view></router-view>
    <!-- 可以，但是如果业务逻辑复杂，很多页面 footer不需要展示，很长，页面不美观 -->
    <!-- <Footer v-show="$route.path !== '/login' && $route.path !== '/register'" /> -->
    <Footer v-show="!$route.meta.ishidden" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: { Header, Footer },
  mounted() {
    this.$store.dispatch("home/GetCategoryList");
  },
};
</script>

<style>
</style>
