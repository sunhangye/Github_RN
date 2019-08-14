import { combineReducers } from 'redux';
import themeReducer from './theme';
import popularReducer from './popular';
import {
  rootCom,
  RootNavigator
} from '../navigator/AppNavigators';


// 1. 指定默认state

const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom));


/** * 2.创建自己的 navigation reducer， */
const navReducer = (state=navState, action) => {
  return state;
}

const reducer = combineReducers({
  'nav': navReducer,
  'theme': themeReducer,
  'popular': popularReducer

})

export default reducer;