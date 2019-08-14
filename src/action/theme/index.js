import actionTypes from '../actionTypes';
/**
 * 主题变更
 * @param theme 
 * @returns {{type: string, theme: *}}
 */
export const onThemeChange = (theme) => ({
  type: actionTypes.CHANGE_THEME,
  theme
})