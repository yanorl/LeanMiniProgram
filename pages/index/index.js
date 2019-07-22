// pages/index/index.js
import {getMultiData,getProduct} from '../../api/home.js'
import { POP, SELL, NEW,TYPE,BACK_TOP_POSITION} from '../../common/js/const.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ["流行", "新款", "精选"],
    goods: {
      [POP]: { page: 1, list: [] },
      [NEW]: { page: 1, list: [] },
      [SELL]: { page: 1, list: [] }
    },
    currentType: "pop",
    topPosition: 0,
    tabControlTop: 0,
    showBackTop: false,
    showTabControl: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._getDate()
  },
  _getDate() {
    this._getMultiData();
    this._getProduct(POP);
    this._getProduct(NEW);
    this._getProduct(SELL);
  },
  _getMultiData() {
    getMultiData().then((res) => {
      const banners = res.data.banner.list.map(item => {
        return item.image
      })
      const recommends = res.data.recommend.list;
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getProduct(type) {
    const page = this.data.goods[type].page;

    getProduct(type, page).then((res) => {
      const list = res.data.list;
      const oldGoods = this.data.goods;
      oldGoods[type].list.push(...list);
      oldGoods[type].page += 1;
      this.setData({
        goods: oldGoods
      })
    })
  },
  tabClick(e) {
    const index = e.detail.index;
    const types = TYPE[index];
    this.setData({
      currentType: types,
      topPosition: this.data.tabControlTop
    })
    this.selectComponent('#tab-control').setCurrentIndex(e.detail.index)
    this.selectComponent('.tab-control-temp').setCurrentIndex(e.detail.index)
  },
  loadMore() {
    this._getProduct(this.data.currentType);
  },
  scrollPosition(e) {
    const scrollTop = e.detail.scrollTop;
    this.setData({
      showBackTop: scrollTop > BACK_TOP_POSITION
    })

    wx.createSelectorQuery().select('#tab-control').boundingClientRect((rect) => {
      const show = rect.top > 0
      this.setData({
        showTabControl: !show
      })
    }).exec()
  },
  onImageLoad() {
    wx.createSelectorQuery().select('#tab-control').boundingClientRect((rect) => {
      this.setData({
        tabControlTop: rect.top
      })
    }).exec()
  },
  onBackTop() {
    this.setData({
      showBackTop: false,
      topPosition: 0,
      tabControlTop: 0
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})