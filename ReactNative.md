# 日常挖坑踩坑爬坑

##  React Native error 'Unable to resolve module `react-native`
  启动一个新项目，报之前的项目问题，清除缓存就行了。

 IOS
```
# Clean cache
rm -rf $TMPDIR/react-*; rm -rf $TMPDIR/haste-*; rm -rf $TMPDIR/metro-*; watchman watch-del-all

# Start React-Native directly
react-native start --reset-cache

# Now run android/iOS in another tab
react-native run-android
```

Android
```
cd android
gradlew clean
cd.. and remove the node_modules folder
npm cache clean --force
npm install
npm start -- --reset-cache
react-native run-android
```

## Mac Xcode Simulator模拟器调出菜单快捷键

command+D 调出菜单; command+R 刷新;

### xcode 命令行启动虚拟机 



```
# 列出所有的虚拟机
xcrun instruments -s
# 启动指定虚拟机
xcrun instruments -w 'iPhone X (12.2)'
```

# 学习使用React Navigation 3x

### 种类

* createStackNavigator: 类似于普通的Navigator，屏幕上方导航栏；
* createBottomTabNavigator：相当于iOS里面的TabBarController，屏幕下方的标签栏；
* createMaterialTopTabNavigator：屏幕顶部的材料设计主题标签栏；
* createDrawerNavigator: 抽屉效果，侧边滑出；
* createSwitchNavigator：SwitchNavigator 的用途是一次只显示一个页面。

## 使用react-navigation

报错`undefined is not an object (evaluating 'RootComponent.prototype')`

原因: `import AppContainer from './src/navigator/AppNavigators';` ==> `import {AppContainer} from './src/navigator/AppNavigators';`

### 使用自定义TabBarComponent 使用 react-navigation-tabs
 报错 `Native module cannot be null'
 原因： 因为平台区别，ios没有次依赖，使用```react-native link```,中间提示我没有`react-native-reanimated`, 直接`yarn add react-native-reanimated`
## ES6 使用
```
class A {
  static foo() { // 函数前面添加一个static关键字，表明这是一个静态方法，不会被实例继承，只能通过类来调用

  }
}
```

## 自定义底部导航主题色

> 实现底部标签栏动态配置功能，可进行主题切换。 --> src/navigator/DynamicTabNavigator.js

首先创建一个自定义Js类。我这里定义为DynamicTabNavigator。
因为要自定义tabbar，这里需要几个组件。

1. import {BottomTabBar} from 'react-navigation-tabs';这个是自定义底部标签栏必要的组件
  
```
  class TabBarComponent extends Component {
  constructor(props) {
    super(props);
    this.theme = {
      tintColor: props.activeTintcolor,
      updateTime: new Date().getTime()
    }
  }
  render() {
    // 取出路由和索引
    const {routes, index} = this.props.navigation.state;
    // 判断是否有params
    if (routes[index].params) {
      const {theme} = routes[index].params;
      // 当前时间大于之前时间，更新主题
      if (theme && theme.updateTime > this.theme.updateTime) {
        this.theme = theme;
      }
    }
    // 渲染底部栏
    return ( 
      <BottomTabBar 
        {...this.props}
        activeTintColor={this.theme.tintColor || this.props.activeTintColor}
      />
    )
  }
}
```

在其他页面改变主题颜色即可
```
type Props = {};
export default class App extends Component<Props> {
  
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Favorite!</Text>
        <Button 
          title="改变主题颜色"
          onPress={() => {
            navigation.setParams({
              theme: {
                tintColor: 'green',
                updateTime: new Date().getTime(),
              }
            })
          }}
        />
      </View>
    );
  }
}
```

## 实现顶部导航动态配置功能，可滑动，设置相关样式，可传递参数。
```
type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    // 这里可异步渲染导航栏
    this.tabNames = ['Java', 'Android', 'iOS', 'PHP', 'ReactNative'];
  }

  _generTab() {
    let tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <PopularTab {...props} tabLable={item} />,
        navigationOptions: {
          title: item,
        },
      };
    });
    return tabs;
  }
  render() {
    const MatetialTab = createAppContainer(createMaterialTopTabNavigator(this._generTab(), {
      tabBarOptions: {
        activeTintColor: 'white', // 设置TabBar选中状态下的标签和图标的颜色
        inactiveTintColor: 'black', // 设置TabBar非选中状态下的标签和图标的颜色
        upperCaseLabel: false, // 是否使标签大写
        tabStyle: styles.tabStyle, // 设置单个tab的样式
        indicatorStyle: styles.indicatorStyle, // 设置 indicator(tab下面的那条线)的样式
        labelStyle: styles.labelStyle, // 设置TabBar标签的样式；
        style: styles.tabsStyle, // 设置整个TabBar的样式
        scrollEnabled: true, // 是否支持 选项卡滚动
        pressOpacity: 1, // 按下标签时的不透明度（支持 iOS 和 Android < 5.0）
      }
    }))
    
    return (
      <View style={styles.container}>
        <MatetialTab />
      </View>
    );
  }
}
```

## 什么是Redux
  Redux是JavaScript状态容器，提供状态管理，可以构建一致化应用。

  ### 创建异步函数

## `actions must be plain object use custom middleware for async actions`

定位错误位置：actionCreators。

    同步操作： `export const foo = () => ({})` 返回一个对象！
    
    异步操作：使用redux-thunk `export const foo = () => {return (dispatch) => {}}`  返回一个函数！

## 数据存储：AsyncStorage

  三种使用方式
```
async doSave() {
  AsyncStorage.setItem(KEY, this.value, err => error && console.log(error.toString()))
}

AsyncStorage.setItem(KEY, this.value)
  .catch(error => {
    error && console.log(error.toString())
})

try {
  await AsyncStorage.setItem(KEY, this.value)
} catch (error) {
  error && console.log(error.toString())
}
```

## 浅拷贝和深拷贝


先说下基本数据类型和引用数据类型的概念
* 基本数据类型有哪些，number,string,boolean,null,undefined五类
* 引用数据类型(Object类)有常规名值对的无序对象{a:1}，数组[1,2,3]，以及函数等

a.基本类型--名值存储在栈内存中，例如let a=1;

![](https://images2018.cnblogs.com/blog/1213309/201711/1213309-20171124130901890-511917244.jpg)
![](https://images2018.cnblogs.com/blog/1213309/201711/1213309-20171124131822437-430949998.jpg)

b.引用数据类型--名存在栈内存中，值存在于堆内存中，但是栈内存会提供一个引用的地址指向堆内存中的值,当b=a进行拷贝时，其实复制的是a的引用地址，而并非堆里面的值。

![](https://images2018.cnblogs.com/blog/1213309/201711/1213309-20171124133428359-1292133331.jpg)

而当我们a[0]=1时进行数组修改时，由于a与b指向的是同一个地址，所以自然b也受了影响，这就是所谓的浅拷贝了。

那，要是在堆内存中也开辟一个新的内存专门为b存放值，就像基本类型那样，起步就达到深拷贝的效果了

![](https://images2018.cnblogs.com/blog/1213309/201711/1213309-20171124140906203-2099568933.jpg)

```
方法一： Object.assign()
// 对象浅拷贝，obj1复制给obj2
const obj1 = {a: 1};
const obj2 = {};
Object.assign( obj2, obj1)
 

方法二 ：ES6扩展运算符(...)
//对象深拷贝，obj1复制给obj2
const obj1 = {a: 1};
const obj2 = {...obj1};
 

方法三 ：深拷贝
//对象深拷贝，obj1复制给obj2
const obj1 = {a: 1};
const obj2 = JSON.parse(JSON.stringify(obj1));

方法四: 遍历
function deepClone(obj){
    let objClone = Array.isArray(obj)?[]:{};
    if(obj && typeof obj==="object"){
        for(key in obj){
            if(obj.hasOwnProperty(key)){
                //判断ojb子元素是否为对象，如果是，递归复制
                if(obj[key]&&typeof obj[key] ==="object"){
                    objClone[key] = deepClone(obj[key]);
                }else{
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}    
let a=[1,2,3,4],
    b=deepClone(a);
a[0]=2;
console.log(a,b);
```

## 使用FlatList

### 渲染不出数据

定位数据源没问题。最后发现是renderItem没有返回Item显示的布局。
```
// wrong
renderItem={data => {this.renderItem(data)}}

// right
renderItem={data => this.renderItem(data)}
```

## Debug调试

react native调试在谷歌浏览器中查看network信息，看不到数据请求信息.在入口文件（index.js或app.js）中加入这一行

```GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest```

即可

如果还是不行，重启项目，关闭谷歌浏览器，重新启动即可

## react native 样式阴影设置

### IOS

> shadowColor color
Sets the drop shadow color
shadowOffset {width: number, height: number}
Sets the drop shadow offset
shadowOpacity number
Sets the drop shadow opacity (multiplied by the color's alpha component)
shadowRadius number
Sets the drop shadow blur radius

### Android

在 Android 原生开发中，Android SDK 为了给视图增加阴影而为我们提供了 elevation 属性，顾名思义就是 “仰角”。通过为视图增加 “仰角” 方式来提供阴影，仰角越大，阴影越大。(然而并不能控制阴影的 offset......)简书阴影介绍

[简书阴影介绍](https://www.jianshu.com/p/7da2d6393a9f)

### FlatList 上拉加载多次触发

1. 设置onEndReachedThreshold（决定当距离内容最底部还有多远时触发onEndReached回调。注意此参数是一个比值而非像素单位。比如，0.5表示距离内容最底部的距离为当前列表可见长度的一半时触发。）
   ```
   onEndReachedThreshold={0.2}
   ```
2. 在onMomentumScrollBegin属性中监听是否触发滚动（滚动动画开始时调用此函数）
   ```
   <FlatList
      data={this.props.data}
      onEndReched={() => {
        if (this.canLoadMore) {
          this.loadData();
          this.canLoadMore = false;
        }
      }}
      onMomentumScrollBegin={() => {
        this.canLoadMore = true;
      }}
   />
   ```
### ActivityIndicator 菊花loading组件

|       属性       |   类型   |                             描述                             |
| :--------------: | :------: | :----------------------------------------------------------: |
|    animating     |   bool   |             默认true，如果为false，将不再显示。              |
|      color       | function | 指示器的颜色， ios默认为gray（#999999），android 默认使用progressBar的系统样式，取决于你设置的style。 |
|       size       |  string  | iOS中‘small’: 宽高各20 ‘large’: 宽高各36 ，android可以随便定义大小 |
| hidesWhenStopped |   bool   |       仅iOS，当停止动画的时候，是否隐藏。默认为true。        |

### 运行工程控制台一直输入如下log

解决方法：
1、Xcode menu -> Product -> Edit Scheme...
2、Environment Variables -> Add -> Name: "OS_ACTIVITY_MODE", Value:"disable"
3、Run again

### 用NetInfo API获取手机当前网络状态，iOS获取网络状态一直是false

现象：
iOS单独使用

```
NetInfo.isConnected.fetch().done((isConnected) => {
  console.log('First, is ' + (isConnected ? 'online' : 'offline'));
});
```

解决方法：
添加监听网络状态改变的方法，配合获取网络状态的方法一起使用即可

```
componentWillMount() {
    NetInfo.fetch().done((status)=> {
        console.log('Status:' + status);
    });
    //监听网络状态改变
    NetInfo.addEventListener('change', this.handleConnectivityChange);

}

componentWillUnmount() {
    console.log("componentWillUnmount");
    NetInfo.removeEventListener('change', this.handleConnectivityChange);
}

handleConnectivityChange(status) {
    console.log('status change:' + status);
    //监听第一次改变后, 可以取消监听.或者在componentUnmount中取消监听
    // NetInfo.removeEventListener('change', this.handleConnectivityChange);
}
```

### react-native 网络请求超时处理

解决方法：
引入一个polyfill文件，然后在自己的网络请求方法里，采用它定义的fetch方法，就可以设置timeout参数，进行网络超时限制

例：
```
// https://github.com/robinpowered/react-native-fetch-polyfill

  import fetch from './fetch-polyfill';

  console.warn("fetch url: " + url);
  getData(url, callback) {
    fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          timeout: 20 * 1000
      })
      .then((response) => response.json())
      .then((responseData) => {

          console.warn("response code:" + responseData.code)
          if(responseData.code === "C0000"
          || responseData.code === "1000"
          || responseData.code === 1000) {

            console.warn("response:" + responseData.data);
            callback(responseData.data, 0);
          } else {
            callback(responseData, -1);
          }
        }).catch(error => {

               // an error when the request fails, such as during a timeout
                callback(null, -1); 
            });
       }
}

module.exports = {
    getData
}
```

### React Native在Android平台无法运行gif

解决方法：
使用facebook fresco

要解决上面的问题，方法还是很多的，最简单的莫过于使用facebook的jar支持库，在android/app/build.gradle文件中新增
```
compile 'com.facebook.fresco:animated-gif:0.13.0'
```

### react native之DeviceEventEmitter使用方法

使用native之DeviceEventEmitter进行RN发送和接收以此刷新页面

A页面注册通知：
```
import  {DeviceEventEmitter} from 'react-native';
//…
//调用事件通知
DeviceEventEmitter.emit('xxxName’,param);
//xxxName:通知的名称 param：发送的消息（传参）
```
B页面接收通知：

```
componentDidMount(){
    var self = this;
    this.listener =DeviceEventEmitter.addListener('xxxName',function(param){

    //  use param do something
    });
}
//xxxName:通知的名称    param:接收到的消息（传参）

componentWillUnmount(){
      this.listener.remove();
  }

//在componentWillUnmount 内需要我们手动移除通知
```

#### react native 跨域

```bash
open -n /Applications/Google\ Chrome.app/ --args --disable-web-security --user-data-dir=/Users/sunhangye/data
```

### [React-navigation - 屏幕导航(Screen Navigation Prop)](https://www.jianshu.com/p/c0f41609c490)

### [WebView组件的使用](https://www.jianshu.com/p/75e890254223)

  注意点：处理webwiew二级三级页面点击RN导航返回键事件处理

webview提供属性

```
<WebView
  ref={(webView) => {this.webView = webView}}
  source={{uri: this.state.url}}
  startInLoadingState={true}
  onNavigationStateChange={e => this.onNavigationStateChange(e)}
  />

// 改变状态
onNavigationStateChange(navState) {
  this.setState({
    canGoBack: navState.canGoBack,
    url: navState.url
  }) 
}
// 后退点击
onBack() {
    if (this.state.canGoBack) {
      this.webView.goBack()
    } else {
      NavigationUtil.goBack(this.props.navigation)
    }
  }
```

### 收藏模块问题
* 封装favoriteDao及多数据存蓄
* 使用 static-lifecyle-methods
* 封装和继承baseItem
* 解决callback 解决Item跨组件更新
   详情页更新收藏后更新到列表页
    在PopularItem

* 跨界面通信解决方案EventBus
* 监听导航器的Tab切换

### 父子组件间通讯

#### 子组件向父组件通信

> 子组件向父组件通讯，同样也需要父组件向子组件传递 props 进行通讯，只是父组件传递的，是作用域为父组件自身的函数，子组件调用该函数，将子组件想要传递的信息，作为参数，传递到父组件的作用域中。