import actionTypes from '../actionTypes';
import DataStore, { FLAG_STORAGE } from '../../expand/dao/DataStore';
import { handleData, _projectModels } from '../ActionUtil';

/**
 * 刷新Trending数据
 * @param {*} storeName 顶部tab名
 * @returns action
 */
const refreshTrendingAction = (storeName) => ({
  type: actionTypes.TRENDING_REFRESH,
  storeName
});


/**
 * 刷新Trending数据失败action
 * @param storeName 
 */
const refreshTrendingErrorAction = (storeName, error) => ({
  type: actionTypes.TRENDING_REFRESH_FAIL,
  storeName,
  error
});


const loadTrendingFail = (storeName, pageIndex, data) => ({
  type: actionTypes.TRENDING_LOAD_MORE_SUCCESS,
  storeName,
  pageIndex,
  projectModels: data
})

/**
 * 获取趋势模块数据的异步action
 * @param storeName
 * @param url
 * @param pageSize
 * @param favoriteDao
 * @returns {function(*=)}
 */
export const onRefreshTrending = (storeName, url, pageSize, favoriteDao) => {
  return (dispatch) => {
    dispatch(refreshTrendingAction(storeName));
    let dataStore = new DataStore();

    dataStore.fetchData(url, FLAG_STORAGE.flag_trending)
      .then((data) => {
        // 派送请求成功数据
        console.log('首次请求成功数据');
        
        handleData(actionTypes.TRENDING_REFRESH_SUCCESS, dispatch, storeName, pageSize, data, favoriteDao);

      })
      .catch((error) => {
        console.log('派送请求失败');
        console.error(error);
        dispatch(refreshTrendingErrorAction(storeName, error));
      })
  }
}

/**
 * 
 * @param  storeName 标签名
 * @param pageIndex 第几页
 * @param pageSize 每页展示条数
 * @param dataArray 原始数据
 * @param favoriteDao
 * @param callback 回调函数，可以通过回调函数向调用页面通信：比如异常信息的展示
 */
export const onLoadMoreTrending = (storeName, pageIndex, pageSize, dataArray = [], favoriteDao, callback) => {
  return (dispatch) => {
    // 模拟网络请求
    setTimeout(() => {
      // 判断上次请求到的数据是否已经大于等于总数据
      if ((pageIndex-1) * pageSize >= dataArray.length) {
        if (typeof callback === 'function') {
          callback('no more data');
        }
        dispatch({
          type: actionTypes.TRENDING_LOAD_MORE_FAIL,
          storeName,
          pageIndex: --pageIndex, // 总x页数
          projectModels: dataArray
        })
      } else {
        let max = pageSize * pageIndex >= dataArray ? dataArray.length : pageSize * pageIndex;

        _projectModels(dataArray.slice(0, max), favoriteDao, (projectModels) => {
          dispatch({
            type: actionTypes.TRENDING_LOAD_MORE_SUCCESS,
            storeName,
            pageIndex,
            projectModels
          })
        })
      }
    }, 500)
  }
}

export const onFlushTrendingFavorite = (storeName, pageIndex, pageSize, dataArray = [], favoriteDao) => {
  return (dispatch) => {
    let max = pageSize * pageIndex >= dataArray ? dataArray.length : pageSize * pageIndex;
    let showItems = dataArray.slice(0, max);

    _projectModels(showItems, favoriteDao, (projectModels) => {
      dispatch({
        type: actionTypes.TRENDING_FLUSH_FAVORITE,
        storeName,
        pageIndex,
        projectModels
      })
    })
  }
}



