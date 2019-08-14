import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import { connect } from 'react-redux';
import actionCreators from '../action/index';

type Props = {};
class Favorite extends Component<Props> {
  
  render() {
    const {navigation, changeTheme} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Favorite!</Text>
        <Button 
          title="改变主题颜色"
          onPress={() => {
            changeTheme('#096');
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

const mapState = (state) => ({});

const mapDispatch = (dispatch) => ({
  changeTheme(theme) {
    dispatch(actionCreators.onThemeChange(theme))
  }
});


export default connect(mapState, mapDispatch)(Favorite);
