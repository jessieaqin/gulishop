<template>
  <div class="pagination">
    <!-- 当当前页等于1的时候 -->
    <button
      :disabled="currentPageNo === 1"
      @click="$emit('changePageNO', currentPageNo - 1)"
    >
      上一页
    </button>
    <!-- 当起始页大于1 -->
    <button v-if="startEnd.start > 1" @click="$emit('changePageNO', 1)">
      1
    </button>
    <!-- 当起始页大于2的时候 显示 -->
    <button v-if="startEnd.start > 2">···</button>

    <button
      v-for="page in startEnd.end"
      :key="page"
      :class="{ active: page === currentPageNo }"
      @click="$emit('changePageNO', page)"
      v-if="page >= startEnd.start"
    >
      {{ page }}
    </button>

    <!-- 当末尾页小于总页数-1 -->
    <button v-if="startEnd.end < pageTotal - 1">···</button>
    <!--当末尾页小于总页数  -->
    <button
      v-if="startEnd.end < pageTotal"
      @click="$emit('changePageNO', pageTotal)"
    >
      {{ pageTotal }}
    </button>
    <!-- 当末尾页等于总页数 -->
    <button
      v-if="(startEnd.end = pageTotal)"
      @click="$emit('changePageNO', currentPageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">{{ total }}</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    //当前页
    currentPageNo: Number,
    //总条数
    total: {
      type: Number,
      default: 0,
    },
    //每页的条数
    pageSize: {
      type: Number,
      default: 10,
    },
    //连续页总数
    continueNo: {
      type: Number,
      require: true,
    },
  },
  computed: {
    //总页码
    pageTotal() {
      let { total, pageSize } = this;
      return Math.ceil(total / pageSize);
    },
    startEnd() {
      let { currentPageNo, pageTotal, continueNo } = this;
      let start = 0;
      let end = 0;
      //总页码小于连续页总数
      if (pageTotal <= continueNo) {
        start = 1;
        end = pageTotal;
      } else {
        start = currentPageNo - Math.floor(continueNo / 2);
        end = currentPageNo + Math.floor(continueNo / 2);
      }
      //非正常情况-左侧
      if (start <= 0) {
        start = 1;
        end = continueNo;
      }
      if (end > pageTotal) {
        start = pageTotal - currentPageNo + 1;
        end = pageTotal;
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>