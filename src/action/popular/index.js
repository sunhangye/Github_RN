import actionTypes from '../actionTypes';
import DataStore, { FLAG_STORAGE } from '../../expand/dao/DataStore';
import { handleData, _projectModels } from '../ActionUtil';

/**
 * 刷新popular数据
 * @param {*} storeName 顶部tab名
 * @returns action
 */
const refreshPopularAction = (storeName) => ({
  type: actionTypes.POPULAR_REFRESH,
  storeName
});

/**
 * 刷新popular数据失败action
 * @param storeName 
 */
const refreshPopularErrorAction = (storeName, error) => ({
  type: actionTypes.POPULAR_REFRESH_FAIL,
  storeName,
  error
});

const loadPopularFail = (storeName, pageIndex, data) => ({
  type: actionTypes.POPULAR_LOAD_MORE_SUCCESS,
  storeName,
  pageIndex,
  projectModels: data
})

/**
 * 获取最热数据的异步action
 * @param storeName
 * @param url
 * @param pageSize
 * @param favoriteDao
 * @returns {function(*=)}
 */
export const onRefreshPopular = (storeName, url, pageSize, favoriteDao) => {
  return (dispatch) => {
    dispatch(refreshPopularAction(storeName));
    let dataStore = new DataStore();

    dataStore.fetchData(url, FLAG_STORAGE.flag_popular)
      .then((data) => {
        // 派送请求成功数据
        console.log('首次请求成功数据');
        
        handleData(actionTypes.POPULAR_REFRESH_SUCCESS, dispatch, storeName, pageSize, data, favoriteDao);

      })
      .catch((error) => {
        console.log('派送请求失败');
        console.error(error);
        dispatch(refreshPopularErrorAction(storeName, error));
      })
  }
}

/**
 * 上拉加载更多数据
 * @param  storeName 标签名
 * @param pageIndex 第几页
 * @param pageSize 每页展示条数
 * @param dataArray 原始数据
 * @param favoriteDao
 * @param callback 回调函数，可以通过回调函数向调用页面通信：比如异常信息的展示
 * @returns {function(*)}
 */
export const onLoadMorePopular = (storeName, pageIndex, pageSize, dataArray = [], favoriteDao, callback) => {
  return (dispatch) => {
    // 模拟网络请求
    setTimeout(() => {
      // 判断上次请求到的数据是否已经大于等于总数据
      if ((pageIndex-1) * pageSize >= dataArray.length) {
        if (typeof callback === 'function') {
          callback('no more data');
        }
        dispatch({
          type: actionTypes.POPULAR_LOAD_MORE_FAIL,
          storeName,
          pageIndex: --pageIndex, // 总页数
          projectModels: dataArray
        })
      } else {
        let max = pageSize * pageIndex >= dataArray ? dataArray.length : pageSize * pageIndex;
        let showItems = dataArray.slice(0, max);

        _projectModels(showItems, favoriteDao, (projectModels) => { 
          dispatch({
            type: actionTypes.POPULAR_LOAD_MORE_SUCCESS,
            storeName,
            pageIndex,
            projectModels
          })
        })
        
      }
    }, 500)
  }
}

export const onFlushPopularFavorite = (storeName, pageIndex, pageSize, dataArray=[], favoriteDao) => {
  return (dispatch) => {
    let max = pageSize * pageIndex >= dataArray ? dataArray.length : pageSize * pageIndex;
    let showItems = dataArray.slice(0, max);

    _projectModels(showItems, favoriteDao, (projectModels) => {
      dispatch({
        type: actionTypes.POPULAR_FLUSH_FAVORITE,
        storeName,
        pageIndex,
        projectModels
      })
    })
  }
}