import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image, Platform, DeviceInfo} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TimeSpan from '../model/TimeSpan';

export const timeSpan = [
  new TimeSpan('今 天', 'since=daily'),
  new TimeSpan('本 周 ', 'since=weekly'),
  new TimeSpan('本 月', 'since=monthly'),
];

export default class TrendingDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  componentDidMount() {
    
  }
  static propTypes = {
    // 对安卓点击回退键必须做处理
    onClose: Platform.OS === 'android' ? PropTypes.func.isRequired : PropTypes.func,
    onSelect: PropTypes.func.isRequired,
  }
  

  show() {
    this.setState({
      visible: true
    })
  }

  dismiss() {
    this.setState({
      visible: false
    })
  }

  render() {
    const  { onClose, onSelect } = this.props;
    return (
        <Modal 
          animationType={'fade'}
          transparent={true}
          visible={this.state.visible}
          onRequestClose={() => onClose}
        >
          <TouchableOpacity 
            style={styles.container}
            onPress={() => this.dismiss()}
          >
          <MaterialIcons 
            name={'arrow-drop-up'}
            size={36}
            style={styles.arrow}
          />

          <View style={styles.content}>
            {
              timeSpan.map((item, index, arr) => {
                return (
                  <TouchableOpacity 
                    key={index}
                    onPress={() => onSelect(arr[index])}
                    underlayColor='transparent'>
                    <View style={styles.text_container}>
                      <Text style={styles.text}>
                        {arr[index].showText}
                      </Text>
                    </View>
                    {
                      index !== arr.length -1 ? <View style={styles.text_line}></View> : null
                    }
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    alignItems: 'center',
    paddingTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0,
  },
  arrow: {
    color: '#fff',
    marginTop: 20,
    padding: 0,
    margin: -15,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 3,
    paddingVertical: 3,
    marginRight: 3,
    
  },
  text_container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    padding: 8,
    paddingHorizontal: 26,
  },
  text_line: {
    height: 0.3,
    backgroundColor: 'darkgray',
  }
})
