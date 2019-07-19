import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
