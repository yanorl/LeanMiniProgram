//app.js
App({
  addToCart(obj) {
   const oldList = this.globalData.cartList.find((item) => {
      return item.iid === obj.iid
    })
    if(oldList) {
      oldList.count += 1
    }else{
      obj.count = 1
      obj.checked = true
      this.globalData.cartList.push(obj)
    }
    if (this.addCartCallback) {
      this.addCartCallback()
    }
  },
  globalData: {
    cartList: []
  }
})