<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked"
              @click="changeChecked(cart.id, cart.isChecked)"
            />
          </li>
          <li class="cart-list-con2">
            <img v-lazy="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeSukNum(cart, true, -1)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="changeSukNum(cart, false, $event.target.value)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeSukNum(cart, true, 1)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="javascript:;"
              class="sindelet"
              @click="deleteCartShop(cart)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isCheckedAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteCartShopAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ cartQuantity }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） :</em>
          <i class="summoney">{{ cartPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getCartListInfo();
  },
  methods: {
    getCartListInfo() {
      this.$store.dispatch("getCartListInfo");
    },
    //改变商品数量
    async changeSukNum(cart, flag, disNum) {
      //获取商品原本的数量
      let originNum = cart.skuNum;
      //如果是通过点击+-号进来的
      if (flag) {
        //当originNum：1 点击-1时需要将disNum(变化的数据)-1修正为0，以保证最小值为1
        if (originNum + disNum < 1) {
          disNum = 1 - originNum;
        }
        //通过点击输入框进来的
      } else {
        //这里disNum时总数，我们需要拿到变化的值：disNum
        if (disNum < 1) {
          //当总数小于1时，计算出变化的数据 disNum
          disNum = 1 - originNum;
        } else {
          //当输入框的值大于1时，计算出变化的数据disNum
          disNum = disNum - originNum;
        }
      }
      try {
        await this.$store.dispatch("addShopCartInfo", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        this.getCartListInfo();
      } catch (error) {
        alert(error.message);
      }
    },
    //修改购物车选中状态，单个修改
    async changeChecked(id, isChecked) {
      try {
        await this.$store.dispatch("UpdataCartIscheck", {
          skuId: id,
          isChecked: isChecked ? 0 : 1,
        });
        this.getCartListInfo();
      } catch (error) {
        alert(error.message);
      }
    },
    //删除购物车单个商品
    async deleteCartShop(cart) {
      try {
        await this.$store.dispatch("DeleteCartShop", cart.skuId);
        // await this.$store.dispatch("DeleteCartShop", { skuId: cart.skuId });
        alert("删除成功");
        this.getCartListInfo();
      } catch (error) {
        alert("修改失败" + error.message);
      }
    },
    //删除购物车多个商品
    async deleteCartShopAll() {
      try {
        await this.$store.dispatch("DeleteCartShopAll");
        this.getCartListInfo();
        alert("删除多个成功");
      } catch (error) {
        alert("删除多个商品失败" + error.message);
      }
    },
  },
  computed: {
    ...mapGetters(["cartInfo"]),
    cartInfoList() {
      return this.cartInfo.cartInfoList || [];
    },
    //计算购物车的数量
    cartQuantity() {
      return this.cartInfoList.reduce((prev, item) => {
        if (item.isChecked) {
          prev += item.skuNum;
        }
        return prev;
      }, 0);
    },
    //计算购物车的总价
    cartPrice() {
      return this.cartInfoList.reduce((prev, item) => {
        if (item.isChecked) {
          prev += item.skuPrice * item.skuNum;
        }
        return prev;
      }, 0);
    },
    //计算全选属性
    isCheckedAll: {
      get() {
        //读取
        return this.cartInfoList.every((item) => item.isChecked);
      },
      async set(val) {
        //修改
        try {
          const result = await this.$store.dispatch(
            "UpdataCartIscheckAll",
            val ? 1 : 0
          );
          console.log(result); //["ok","ok","ok","ok"]
          this.getCartListInfo();
        } catch (error) {
          alert(error.message);
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>