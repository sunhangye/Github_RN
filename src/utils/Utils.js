/**
 * 工具类
 */
export default class Utils {
  /**
   * 检查Item是否被收藏
   * @param {*} item 
   * @param {*} keys 
   * @return {Boolean}
   */
  static checkFavorite(item, keys=[]) {
    if (!keys) {
      return false;
    }
    for (let i = 0; i < keys.length; i++) {
      let id = item.id ? item.id : item.fullName
      if (id.toString() === keys[i]) {
        return true;
      }
    }
    return false;
  }
}