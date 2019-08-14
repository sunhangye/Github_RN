import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, AsyncStorage} from 'react-native';


type Props = {};
const KEY = "save_key";
export default class FetchDemo extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showText: '',
    }
  }
  async doSave() {
    
    
    AsyncStorage.setItem(KEY, this.value, (error) => {
      console.log(error, value);
      
      this.setState({
        showText: this.value
      });
      error && console.log(error.toString());
    })
  };
  async doDelete() {
    this.setState({
      showText: ''
    });
    AsyncStorage.removeItem(KEY).catch(error => {
      error && console.log(error.toString());
    })
  };
  async doGet() {
    try {
      const newValue = await AsyncStorage.getItem(KEY);
      this.setState({ showText: newValue });
    } catch (error) {
      error && console.log(error.toString());
    }
    
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>AsyncStorageDemoPage 网络缓存使用</Text>
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
            this.doSave();
          }}>
              存储
          </Text>
          <Text onPress={() => {
            this.doDelete();
          }}>
              删除
          </Text>
          <Text onPress={() => {
            this.doGet();
          }}>
              读取
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
