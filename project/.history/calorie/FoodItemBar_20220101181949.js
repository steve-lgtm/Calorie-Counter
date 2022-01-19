import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles, colors } from './styles';

const FoodItemBar = function (props) {
    styles.foodItem = {
        paddingRight:20,
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
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
console.log(props.food.product.nutriments)
  const calorie = props.food.product.nutriments.energy-kcal_100g
  const name = props.food.product.product_name
  console.log(name,calorie)

  const protein = props.food.protein_g
  const catbohydrates = props.food.catbohydrates_total_g
  const fat = props.food.fat_total_g
  const fiber = props.food.fiber_g
  const sugar = props.food.sugar_g
  const serving = props.food.serving_size_g

  
  return (
    <TouchableOpacity style={styles.foodItem} onPress={props.onPress} >
        <View>
      <Text style={styles.foodName}>{name}</Text>       
        </View>
      <View style={{ display:'flex', flexDirection: 'column'  }}>
        <Text style={{ fontSize: 12, color: colors.grey ,alignSelf:'flex-end' }}>
          {calorie} kcal
        </Text>
    
        <Text style={{ fontSize: 12, color: colors.grey,alignSelf:'flex-end' }}>
          {props.quantity} g
        </Text>
    </View>
    </TouchableOpacity>
  );
};

export default FoodItemBar;
