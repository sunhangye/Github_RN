import actionTypes from '../../action/actionTypes';

const defaultState = {};

/**
 * 数据结构
 * favorite: {
 *  popular: {
 *    item: [],
 *    isLoading: false
 *  },
 *  trending: {
 *    item: [],
 *    isLoading: false
 *  }
 * }
 */
export default (state = defaultState, action) => {
  
  switch (action.type) {
    case actionTypes.FAVORITE_LOAD_DATA: // 加载数据
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: true,
        }
      }
    case actionTypes.FAVORITE_LOAD_SUCCESS: // 加载数据成功
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModels: action.projectModels,
          isLoading: false,
        }
      }
    case actionTypes.FAVORITE_LOAD_FAIL: // 加载数据失败
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false
        }
      }
    default:
      return state;
  }
}