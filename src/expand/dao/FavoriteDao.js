import { AsyncStorage } from 'react-native';

const FAVORITE_KET_PREFIX = 'favorite_'
export default class FavoriteDao {
  constructor(flag) {
    // 区分最热和趋势模块
    this.favoriteKey = FAVORITE_KET_PREFIX + flag;
  }

  /**
   * 收藏项目，保存收藏的项目
   * @param {*} key 项目id
   * @param {JSON} value 收藏项目 
   * @param {*} callback 
   */
  saveFavoriteItem(key, value, callback) {
    AsyncStorage.setItem(key, value, (error, result) => {
      if (!error) {
        // 更新收藏列表的key
        this.updateFavoriteKeys(key, true)
      }
    })
  }

  /**
   * 取消收藏项目，移除收藏的项目
   * @param {*} key 项目id
   */
  removeFavoriteItem(key) {
    AsyncStorage.removeItem(key, (error, result) => {
      if (!error) {
        // 更新收藏列表的key
        this.updateFavoriteKeys(key, false)
      }
    })
  }

  /**
   * 更新收藏列表keys
   * @param {*} key 
   * @param {*} isAdd true:增加；false: 移除
   */
  updateFavoriteKeys(key, isAdd) {
    // 获取某个模块下的所有keys
    AsyncStorage.getItem(this.favoriteKey, (error, result) => {
      if (!error) {
        let favoriteKeys = [];
        if (result) {
          favoriteKeys = JSON.parse(result);
        }
        let index = favoriteKeys.indexOf(key);

        if (isAdd) {
          if (index === -1) { // 没有则添加
            favoriteKeys.push(key);
          }
        } else {
          if (index !== -1) { // 有则删除
            favoriteKeys.splice(index, 1);
          }
        }
        // 更新后key值集合保存本地
        AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys));
      }
    })
  }

  /**
   * 获取所有收藏列表keys
   * @return {Promise}
   */
  getFavoriteKeys() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.favoriteKey, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result));
          } catch (error) {
            reject(error);
          }
        } else {
          reject(error);
        }
      })
    })
  }

  /**
   * 从缓存重获取所有收藏的项目
   */
  getAllItems() {
    return new Promise((resolve, reject) => {
      this.getFavoriteKeys().then((keys) => {
        let items = [];
        if (keys) {
          AsyncStorage.multiGet(keys, (error, stores) => {
            stores.map((result, i, store) => {
              let key = store[i][0];
              let value = store[i][1];
              items.push(value);
            });
            resolve(items);
          })
        }
      }).catch((e) => {
        reject(e);
      })
    })
  }
}