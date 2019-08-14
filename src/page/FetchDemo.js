import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';

type Props = {};
export default class FetchDemo extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showText: '',
    }
  }
  loadData2() {
    let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
    fetch(url)
      .then(response => {
        console.log('response', response);
        if (!response.ok) {
          return response.text();
        }
      })
      .then(responseText => {
        this.setState({
          showText: responseText
        });
      })
      .catch(e => {
        this.setState({
          showText: e.toString(),
        })
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to FetchDemo!</Text>
        <View style={styles.input_container}>
          <TextInput 
            style={styles.input}
            onChangeText={text => {
              this.searchKey = text;
            }}
          />
        </View>
        <Button 
          title="获取"
          onPress={() => {
            this.loadData2()
          }}
        />
        <Text>
          {this.state.showText}
        </Text>
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
