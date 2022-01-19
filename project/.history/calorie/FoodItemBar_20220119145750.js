import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles, colors } from './styles';

const FoodItemBar = function (props) {
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
      backgroundColor: 'black',
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
  const calorie = props.food.product.nutriments['energy-kcal_100g']
  const name = props.food.product.product_name
  const quantity = props.food.product.product_quantity


  return (
    <TouchableOpacity style={styles.foodItem} onPress={props.onPress} >
        <View>
      <Text style={styles.foodName}>{name}</Text>
        </View>
      <View style={{ display:'flex', flexDirection: 'column'  }}>
        <Text style={{ fontSize: 12, color: '#6dbc4e' ,alignSelf:'flex-end' }}>
          {calorie} kcal
        </Text>

        <Text style={{ fontSize: 12, color: 'white',alignSelf:'flex-end' }}>
          100 g
        </Text>
    </View>
    </TouchableOpacity>
  );
};

export default FoodItemBar;