import ProjectModel from '../model/ProjectModel';
import Utils from '../utils/Utils';

/**
 * 加载第一页列表数据
 * @param {Obj} actionType
 * @param {Func} dispatch 
 * @param {Str} storeName 
 * @param {Num} pageSize 第一次加载列表item个数
 * @param {Obj} data 请求到的所有数据
 * @param {Func} favoriteDao 收藏处理函数
 */
export const handleData = (actionType, dispatch, storeName, pageSize, data, favoriteDao) => {
  let fixItems = [];
  if (data && data.data) {
    if (Array.isArray(data.data)) {
      fixItems = data.data;
    } else if (Array.isArray(data.data.items)) {
      fixItems = data.data.items;
    }
  }

  //第一次要加载的数据
  let showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize);

  _projectModels(showItems, favoriteDao, (projectModels) => {
    dispatch({
      type: actionType,
      items: fixItems,
      storeName,
      projectModels,
      pageIndex: 1,
    })
  })
  
}

/**
 * 将收藏项目的状态包装到Item中
 * @param {*} showItems 
 * @param {*} favoriteDao 收藏项目处理函数
 * @param {*} callback (projectModels) 
 */
export async function _projectModels (showItems, favoriteDao, callback) {
  let keys = [];
  try {
    keys = await favoriteDao.getFavoriteKeys();
  } catch (error) {
    console.log(error);
  }
  let projectModels = [];
  for (let i = 0; i < showItems.length; i++) {
    projectModels.push(new ProjectModel(showItems[i], Utils.checkFavorite(showItems[i], keys)));
  }
  if (typeof callback === 'function') {
    callback(projectModels);
  }
}