import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Htmlview from 'react-native-htmlview'
import BaseItem from './BaseItem';
/**
 * 自定义最热模块item
 */
export default class TrendingItem extends BaseItem {
  
  render() {
    const { projectModel } = this.props;
    const { item } = projectModel;
    
    if (!item) {
      return null
    }
    
    return (
      <TouchableOpacity
        onPress={() => this.onItemClick()}
      >
        <View style={styles.cell_container}>
          <Text style={styles.title}>
            {item.fullName}
          </Text>

          <Htmlview 
            onLinkPress={(url) => console.log(`clicked link: ${url}`)}
            stylesheet={{
              p: styles.description,
              a: styles.description
            }}
            value={item.description}
          />
          <Text style={styles.description}>
            {item.meta}
          </Text>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text style={{marginRight: 2}}>Built by: </Text>
              {
                item.contributors.map((item, index, arr) => (
                  <Image 
                    key={index}
                    style={styles.avatarPic}
                    source={{
                      uri: arr[index],
                      cache: "force-cache"
                    }}
                    style={{width: 12, height: 12, margin: 2}}
                  />
                ))
              }
              
            </View>
            {this._favariteIcon()}
          </View>
        </View>   
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  cell_container: {
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 3,
    borderColor: '#ddd',
    borderWidth: .5,
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: {width: .5, height: .5},
    shadowOpacity: .4,
    shadowRadius: 1,
    elevation: 2
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121'
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575',
  },
  avatarPic: {
    width: 22,
    height: 22,
    borderRadius: 11
  },
  starWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
