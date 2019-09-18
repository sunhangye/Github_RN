/**
 * 渲染公共小功能组件类
 */
import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class ViewUtil {

  /**
   * 获取左侧返回按钮
   * @param {Func} callback 点击返回按钮回调
   */
  static getLeftBackButton(callback) {
    return (
      <TouchableOpacity 
        style={{padding: 8, paddingLeft: 12, paddingTop: 12}}
        onPress={callback}
        underlayColor={'pink'}
      >
        <Ionicons 
          name={'ios-arrow-back'}
          size={26}
          style={{color:'white'}}
        />
      </TouchableOpacity>
    )
  }

  /**
   * 获取分享按钮
   * @param {*} callback 
   */
  static getShareButton(callback) {
    return (
      <TouchableOpacity
        underlayColor={'transparent'}
        onPress={callback}
      >
        <Ionicons 
          name={'md-share'}
          size={20}
          style={{opacity: 0.9, marginRight: 10, color: '#fff'}}
        />
      </TouchableOpacity>
    )
  }
}