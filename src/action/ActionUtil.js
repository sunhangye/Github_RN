/**
 * 加载第一页列表数据
 * @param {Obj} actionType
 * @param {Func} dispatch 
 * @param {Str} storeName 
 * @param {Num} pageSize 第一次加载列表item个数
 * @param {Obj} data 请求到的所有数据
 */
export const handleData = (actionType, dispatch, storeName, pageSize, data) => {
  let fixItems = [];
  if (data && data.data) {
    if (Array.isArray(data.data)) {
      fixItems = data.data;
    } else if (Array.isArray(data.data.items)) {
      fixItems = data.data.items;
    }
  }

  dispatch({
    type: actionType,
    items: fixItems,
    storeName,
    projectModels: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize), //第一次要加载的数据
    pageIndex: 1,
  })
}