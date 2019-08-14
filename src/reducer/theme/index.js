import actionTypes from '../../action/actionTypes';

const defaultState = {
  theme: 'blue',
}

export default (state=defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_THEME:
      return {
        ...state,
        theme: action.theme
      }
    default:
      return state;
  }
}