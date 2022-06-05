<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="(floor, index) in floorList" :key="index" :floor="floor" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted() {
    this.$store.dispatch("home/GetFloorList");
  },
  computed: {
    ...mapState("home", ["floorList"]),
  },
};
</script>

<style lang="less" scoped>
</style>

