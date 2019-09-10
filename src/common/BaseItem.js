/**
 * 创建基本类作为列表Item基本组件，将几个页面相同功能封装到一起
 * 1、从props中获取初始收藏状态赋值到存储到state中
 * 2 使用getDerivedStateFromProps， 将从props获取的states prevState与nextState对比， 依次将新传入的props来映射到state， 如果props传入的内容不需要影响到你的state， 那么就需要返回一个null。
 * 3、点击收藏按钮onPressFavorite,更新state,同时使用暴露出的onFavorite更新数据源收藏状态
 * 4、使用方法如下：
 * PopularItem: class PopularItem extends BaseItem
 * Popular: <PopularItem 
 *            projectModel={}
 *            onSelect={()=>{}}
 *            onFavorite={()=>{}}
 *          />
 */

import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class BaseItem extends Component {
  static propTypes = {
    projectModel: PropTypes.object,
    onSelect: PropTypes.func,
    onFavorite: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.projectModel.isFavorite
    }
  }

  /**
   * componentWillReceiveProps在新版React中不能再用了
   * @param {*} nextProps 
   * @param {*} prevState 
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    const isFavorite = nextProps.projectModel.isFavorite;
    if (prevState.isFavorite !== isFavorite) {
      return {
        isFavorite: isFavorite
      }
    }
    return null;
  }

  /**
   * 更新state
   * @param {*} isFavorite 
   */
  setFavoriteState(isFavorite) {
    this.props.projectModel.isFavorite = isFavorite;
    this.setState({
      isFavorite: isFavorite
    })
  }
  /**
   * 点击收藏按钮动作
   */
  onPressFavorite() {
    const { onFavorite, projectModel } = this.props;
    this.setFavoriteState(!this.state.isFavorite);

    onFavorite(projectModel.item, !this.state.isFavorite);
  }
  /**
   * 
   */
  onItemClick() {
    // 点击item的callback从详情页中获取到收藏状态后更新item的state
    this.props.onSelect((isFavorite) => {
      this.setFavoriteState(isFavorite);
    })
  }

  _favariteIcon() {
    return (
      <TouchableOpacity 
        onPress={() => this.onPressFavorite()}
        underlayColor='transprent'
        style={{padding: 6}}
      >
        <FontAwesome 
          name={this.state.isFavorite ? 'star' : 'star-o'}
          size={26}
          color={'red'}
        />
      </TouchableOpacity>
    )
  }
  
}
