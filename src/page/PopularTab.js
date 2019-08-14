import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';

type Props = {};
export default class PopularTab extends Component < Props > {
  
  render() {
    const {tabLable} = this.props;
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{tabLable}</Text>
        <Button 
          title="跳转到详情页"
          onPress={() => NavigationUtil.goPage({}, 'DetailPage')}
        />
        <Button 
          title = "跳转到FetchDemoPage"
          onPress={() => NavigationUtil.goPage({}, 'FetchDemoPage')}
        />
        <Button 
          title = "跳转到AsyncStorageDemoPage"
          onPress = {
            () => NavigationUtil.goPage({}, 'AsyncStorageDemoPage')
          }
        />
        <Button 
          title = "跳转到DataStorageDemoPage"
          onPress = {
            () => NavigationUtil.goPage({}, 'DataStorageDemoPage')
          }
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
