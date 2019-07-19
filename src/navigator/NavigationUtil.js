/**
 * 全局导航工具类
 */
export default class NavigationUtil {

  /**
   * 跳转到指定页面
   * @param {Object} params 
   * @param {String} page 
   */
  static goPage(params, page) {
    const navigation = NavigationUtil.navigation;
    if (!navigation) {
      console.log('NavigationUtil.navigation can not be null')
      return;
    }
    navigation.navigate(
      page,
      {
        ...params
      }
    )
  }

  /**
   * 返回上一页
   * @param navigation 
   */
  static goBack(navigation) {
    navigation.goBack();
  }

  /**
   * 重置调到首页
   * @param  params 
   */
  static resetToHomePape(params) {
    const {navigation} = params;
    navigation.navigate('Main');
  }
}