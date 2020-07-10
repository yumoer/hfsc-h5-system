<template>
  <van-action-sheet class="show" v-model="show" :title="title">
    <div class="showAdd">
      <div class="showInfo">
        <div class="showImage">
          <img v-lazy="result.default_image_url" alt="">
        </div>
        <div class="showText">
          <span class="showName">{{result.name}}</span>
          <div class="showOther">
            <span class="disprice">￥{{result.price}}</span>
            <span class="stock">剩余{{result.stock}}件</span>
          </div>
        </div>
      </div>
      <div class="showCount" style="">
        <span>购买数量</span>
        <van-stepper class="strpper" v-model="count" integer style=""></van-stepper>
      </div>
      <div class="showBtn" style="">
        <van-button
          class="submit"
          @click="goAdd()"
          @focus="origin_input=shop.count"
          @blur="on_input(index)"
          @plus="on_add(index)"
          @minus="on_minus(index)"
          round
          type="danger"
          style="width: 100%">确认</van-button>
      </div>
    </div>
  </van-action-sheet>
</template>

<script>
  export default {
    data () {
      return {
        show:false,
        title:'加入购物车'
      }
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .show{
    .showAdd{
      width 100%
      height 100%
      padding 20px
      .showInfo{
        width 100%
        height 100px
        .showImage{
          width 30%
          height 100%
          float left
          img{
            width 100px
            height 100%
          }
        }
        .showText{
          width 70%
          height 100%
          float left
          line-height 25px
          padding-left 20px
          .showName{
            display block
            color #000
            font-size 14px
            text-overflow ellipsis
            overflow hidden
            display -webkit-box
            -webkit-box-orient vertical
            -webkit-line-clamp 2
          }
          .showOther{
            margin-top: 20px;
            .disprice{
              color red
              font-size 16px
            }
            .stock{
              float right
            }
          }
        }
      }

      .showCount{
        width 100%
        height 50px
        line-height 50px
        .strpper{
          float right
        }
      }
      .showBtn{
        width 100%
        margin-top 20px
        .submit{
          width 100%
        }
      }
    }
  }
</style>
