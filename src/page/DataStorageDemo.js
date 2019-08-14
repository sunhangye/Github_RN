import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, AsyncStorage} from 'react-native';
import DataStore from '../expand/dao/DataStore'


type Props = {};
const KEY = "save_key";
export default class FetchDemo extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showText: '',
    }
    this.dataStore = new DataStore();
  }
  loadData() {
    const url = `https://api.github.com/search/repositories?q=${this.value}`;
    this.dataStore.fetchData(url).then((data) => {
      console.log(data);
      
      let showData = `初次加载时间：${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`;
      this.setState({
        showText: showData
      });
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>网络缓存框架设计</Text>
        <View style={styles.input_container}>
          <TextInput 
            style={styles.input}
            onChangeText={text => {
              this.value = text;
            }}
          />
        </View>
        <View style={styles.input_container}>
          
          <Text onPress={() => {
            this.loadData();
          }}>
              获取
          </Text>

          <Text>
            {this.state.showText}
          </Text>
        </View>
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
  input: {
    height: 30,
    flex: 1,
    borderColor: 'black',
      borderWidth: 1,
      marginRight: 10
    },
    input_container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around'
    }
});
