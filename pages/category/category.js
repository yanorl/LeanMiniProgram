// pages/category/category.js
import { getCategory, getSubcategory, getCategoryDetail, CreateCategory } from '../../api/category.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    categoryData: {},
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getData()
  },
  _getData() {
    // 1.请求分类数据
    this._getCategory()
  },
  _getCategory() {
    getCategory().then(res => {
      // 1.获取categories
      const categories = res.data.category.list;
      const categoryData = this._normalizeCategory(categories)
      this.setData({
        categories,
        categoryData
      })
      this._getSubcategory(0)
      this._getCategoryDetail(0)
    })
  },
  _normalizeCategory(list) {
    let map = {}
    list.forEach((item, index) => {
      map[index] = {
        subcategories: [],
        categoryDetail: []
      }
    })
    return map
  },
  _getSubcategory(currentIndex) {
    const maitkey = this.data.categories[currentIndex].maitKey;
    getSubcategory(maitkey).then(res => {
      const tempCategoryData = this.data.categoryData;
      // Object.assign({}, test)
      tempCategoryData[currentIndex].subcategories = res.data.list;
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  _getCategoryDetail(currentIndex) {
    const miniWallKey = this.data.categories[currentIndex].miniWallkey;

    this._getRealCategoryDetail(currentIndex, miniWallKey, 'pop');
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'new');
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'sell');
  },
  _getRealCategoryDetail(index, miniWallKey, type) {
    getCategoryDetail(miniWallKey, type).then(res => {
      const categoryData = this.data.categoryData;

      categoryData[index].categoryDetail = res;
      this.setData({
        categoryData
      })
    })
  },
  menuClick(e) {
    const currentIndex = e.detail.currentIndex;
    this.setData({
      currentIndex
    })
    this._getSubcategory(currentIndex)
    this._getCategoryDetail(currentIndex)
    this.selectComponent('.categoriesBox').scrollTo()
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