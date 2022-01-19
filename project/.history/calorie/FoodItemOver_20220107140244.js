import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles, colors } from './styles';

const FoodItemOver = function (props) {
    styles.foodItem = {
      borderWidth:0.5,
      borderColor:'white',
      width:400,
        paddingRight:20,
        display:'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
        margin:5,
        backgroundColor: '#6dbc4e',
        padding: 8,
        borderRadius:20
      };
      styles.foodName = {
          marginBottom:5,
          marginLeft:10,
        fontSize: 24,
        color: 'white'
      };
      styles.brandName = {
        fontSize: 16,
        color: colors.orange
      };


  return (
    <TouchableOpacity style={styles.foodItem} onPress={props.onPress} >
        <View>
      <Text style={styles.foodName}>{props.name}</Text>
        </View>
      <View style={{ display:'flex', flexDirection: 'column'  }}>
        <Text style={{ fontSize: 12, color: colors.grey ,alignSelf:'flex-end' }}>
          {((props.energy)/100*(props.finalweight)).toFixed()} kcal
        </Text>

        <Text style={{ fontSize: 12, color: colors.grey,alignSelf:'flex-end' }}>
          {props.finalweight} g
        </Text>
    </View>
    </TouchableOpacity>
  );
};

export default FoodItemOver;
