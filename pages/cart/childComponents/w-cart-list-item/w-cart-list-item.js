// pages/cart/childComponents/w-cart-list-item/w-cart-list-item.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
      type: Object,
      value: {}
    },
    index: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCheckClick(e) {
      const goods = app.globalData.cartList.find((item) => {
        return item.iid === this.properties.goods.iid
      })
      goods.checked = !goods.checked

      const index = e.currentTarget.dataset.index
      app.changeGoodsState(index, goods)
    }
  }
})
