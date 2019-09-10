/**
 * 解决安卓后退按钮事件
 */
import React from 'react';
import {PropTypes} from 'prop-types';
import { BackHandler } from 'react-native'

export default class BackPressComponent {
  constructor(props) {

    this.props = props;
    this._handwareBackPress = this.onHandwareBackPress.bind(this);
    console.log('BackHandler :', BackHandler);
  }

  componentDidMount() {
    if (this.props.backPress) {
      BackHandler.addEventListener('hardwareBackPress', this._handwareBackPress);
    }
  }

  componentWillUnmount() {
    if (this.props.backPress) {
      BackHandler.removeEventListener('hardwareBackPress', this._handwareBackPress);
    }
  }
  
  onHandwareBackPress(e) {
    console.log('onHandwareBackPress', e)
    return this.props.backPress(e);
  }
  
}