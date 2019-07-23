// pages/detail/detail.js
import { getDetail, getRecommends, GoodsBaseInfo, ShopInfo, ParamInfo } from '../../api/detail.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid: '',
    topImages: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommends: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      iid: options.iid
    })
    this._getDate()
  },
  _getDate() {
    this._getDetail()
    this._getRecommends()
  },
  _getDetail() {
    getDetail(this.data.iid).then((res)=> {
      const data = res.result;
      const topImages = data.itemInfo.topImages; 
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)
      const shopInfo = new ShopInfo(data.shopInfo)
      const detailInfo = data.detailInfo
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)
      let commentInfo = {}
      if (data.rate && data.rate.cRate > 0) {
         commentInfo = data.rate.list[0]
      }
      
      this.setData({
        topImages,
        baseInfo,
        shopInfo,
        detailInfo,
        paramInfo,
        commentInfo
      })
    })
  },
  _getRecommends() {
    getRecommends().then(res => {
      this.setData({
        recommends: res.data.list
      })
    })
  },
  onAddCart() {
    // 1.获取商品对象
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImages[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;

    // 2.加入到购物车列表
    app.addToCart(obj)

    // 3.加入成功提示
    wx.showToast({
      title: '加入购物车成功',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})