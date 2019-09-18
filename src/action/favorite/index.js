import actionTypes from '../actionTypes';
import FavoriteDao from '../../expand/dao/FavoriteDao';
import ProjectModel from '../../model/ProjectModel'

/**
 * 刷新收藏页面数据
 * @param {*} storeName 顶部tab名
 * @returns action
 */
const loadFavoriteAction = (storeName) => ({
  type: actionTypes.FAVORITE_LOAD_DATA,
  storeName
});

/**
 * 加载收藏页面数据失败action
 * @param storeName 
 */
const loadFavoriteErrorAction = (storeName, error) => ({
  type: actionTypes.FAVORITE_LOAD_FAIL,
  storeName,
  error
});

/**
 * 加载收藏页面数据成功action
 * @param storeName 
 */
const loadPopularSuccessAction = (storeName, projectModels) => ({
  type: actionTypes.FAVORITE_LOAD_SUCCESS,
  storeName,
  projectModels
})

export const onLoadFavoriteData = (flag, isShowLoading) => {
  return (dispatch) => {
    // isShowLoading为false 则不执行show loading 动画
    if (isShowLoading) {
      dispatch(loadFavoriteAction(flag))
    }
    // 直接从本地缓存获取数据即可
    new FavoriteDao(flag).getAllItems().then((items) => {
     let projectModels = [];

     for (let i = 0; i < items.length; i++) {
       projectModels.push(new ProjectModel(items[i], true))
     }
     
     dispatch(loadPopularSuccessAction(flag, projectModels))
    }).catch(err => {
      dispatch(loadPopularFailAction(flag, err))
    })
  }
}





