import actionTypes from '../actionTypes';
import DataStore, { FLAG_STORAGE } from '../../expand/dao/DataStore';

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
 * 加载第一页列表数据
 * @param {Func} dispatch 
 * @param {Str} storeName 
 * @param {Num} pageSize 第一次加载列表item个数
 * @param {Obj} data 请求到的所有数据
 */
const handleData = (dispatch, storeName, pageSize, data) => {
  let fixItems = [];
  if (data && data.data && data.data.items) {
    fixItems = data.data.items;
  }
  
  dispatch({
    type: actionTypes.POPULAR_REFRESH_SUCCESS,
    items: fixItems,
    storeName,
    projectModels: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize), //第一次要加载的数据
    pageIndex: 1,
  })
}

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


export const onRefreshPopular = (storeName, url, pageSize) => {
  return (dispatch) => {
    dispatch(refreshPopularAction(storeName));
    let dataStore = new DataStore();

    dataStore.fetchData(url, FLAG_STORAGE.flag_popular)
      .then((data) => {
        // 派送请求成功数据
        console.log('首次请求成功数据');
        
        handleData(dispatch, storeName, pageSize, data);
        // dispatch(handleDataAction(storeName, data));
      })
      .catch((error) => {
        console.log('派送请求失败');
        console.error(error);
        dispatch(refreshPopularErrorAction(storeName, error));
      })
  }
}

/**
 * 
 * @param  storeName 标签名
 * @param pageIndex 第几页
 * @param pageSize 每页展示条数
 * @param dataArray 原始数据
 * @param callback 回调函数，可以通过回调函数向调用页面通信：比如异常信息的展示
 */
export const onLoadMorePopular = (storeName, pageIndex, pageSize, dataArray=[], callback) => {
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
        console.log(max, dataArray.slice(0, max));
        
        dispatch({
          type: actionTypes.POPULAR_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          projectModels: dataArray.slice(0, max)
        })
      }
    }, 500)
  }
}



