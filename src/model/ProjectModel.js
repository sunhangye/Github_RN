/**
 * 封装带有收藏状态的item
 * @param {Object}
 * @param {Boolean}
 */
export default class ProjectModel {
  constructor(item, isFavorite) {
    this.item = item;
    this.isFavorite = isFavorite;
  }
}

