import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, WebView } from 'react-native';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../utils/ViewUtil'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationUtil from '../navigator/NavigationUtil';
import BackPressComponent from '../common/BackPressComponent'

type Props = {};
const THEME_COLOR = '#678';
const TRENDING_URL = 'https://github.com/';
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    const projectModels = params.projectModels;
    // 标题
    const title = projectModels.full_name || projectModels.fullName;
    // 详情页地址
    console.log(projectModels);
    
    const url = projectModels.html_url || TRENDING_URL + projectModels.item.fullName;
    
    this.state = {
      title: title,
      url: url,
      canGoBack: false
    };
    /**
     * 使用 backPress: this.onBackPress() 会直接执行，所以使用箭头函数
     */
    this.backPress = new BackPressComponent({backPress: () => this.onBackPress()});
  }

  componentDidMount() {
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  onBackPress() {
    this.onBack();
    return true;
  }

  onBack() {
    if (this.state.canGoBack) {
      this.webView.goBack()
    } else {
      NavigationUtil.goBack(this.props.navigation)
    }
  }

  renderRightButton() {
    return (
      <View style={{flexDirection: 'row', marginTop: 10,}}>
        <TouchableOpacity
          onPress={() => {}}
        >
          <FontAwesome
            name={'star-o'}
            size={20}
            style={{color: 'white', marginRight: 10}}
          />
        </TouchableOpacity>
        {ViewUtil.getShareButton(() => {})}
      </View>
    )
  }
  /**
   * 获取在Webwiew用户点击事件
   * @param {*} navState {canGoBack:true, canGoForward:true,loding: false,target: 817, title: '',url: ''}
   */
  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url
    }) 
  }
  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR
    }
    const {title} = this.state;
    
    const titleLayoutStyle = title.length > 20 ? {paddingRight: 30} : null;
    const navigationBar = (
        <NavigationBar 
          title={title}
          titleLayoutStyle={titleLayoutStyle}
          statusBar={statusBar}
          style={{backgroundColor: THEME_COLOR}}
          leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
          rightButton={this.renderRightButton()}
        />
    );
    return (
      <View style={styles.container}>
        {navigationBar}
        <WebView
          ref={(webView) => {this.webView = webView}}
          source={{uri: this.state.url}}
          startInLoadingState={true}
          onNavigationStateChange={e => this.onNavigationStateChange(e)}
         />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
