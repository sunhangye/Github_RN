import actionTypes from '../../action/actionTypes';

const defaultState = {};

/**
 * 数据结构
 * popular: {
 *  java: {
 *    item: [],
 *    isLoading: false
 *  },
 *  ios: {
 *    item: [],
 *    isLoading: false
 *  }
 * }
 */
export default (state = defaultState, action) => {
  console.log(action.type);
  
  switch (action.type) {
    case actionTypes.POPULAR_REFRESH_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          items: action.items, // 原始数据
          projectModels: action.projectModels,
          isLoading: false,
          hideLoadingMore: false,
          pageIndex: action.pageIndex
        }
      }
    case actionTypes.POPULAR_REFRESH: // 下拉刷新
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: true,
          hideLoadingMore: true
        }
      }
    case actionTypes.POPULAR_REFRESH_FAIL: // 下拉刷新失败
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false
        }
      }
    case actionTypes.POPULAR_LOAD_MORE_SUCCESS: // 上拉加载更多成功
      return {
        ...state, // Object.assign
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: false,
          pageIndex: action.pageIndex,
          projectModels: action.projectModels,
        }
      }
    case actionTypes.POPULAR_LOAD_MORE_FAIL: // 上拉加载更多失败
      return {
        ...state, // Object.assign
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          pageIndex: action.pageIndex,
        }
      }
    default:
      return state;
  }
}