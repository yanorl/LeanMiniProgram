// pages/category/childComponents/w-content/w-content.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subcategories: {
      type: Array
    },
    categoryDetail: {
      type: Array
    } 
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
    topPosition: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
   scrollTo() {
     this.setData({
       topPosition: 0
     })
   }
  }
})
