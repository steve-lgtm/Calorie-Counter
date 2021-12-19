import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles, colors } from './styles';

const FoodItem = function (props) {
  console.log(props.food.name)
  const calorie = props.food.calories
  const name = props.food.name
  const protein = props.food.protein_g
  const catbohydrates = props.food.catbohydrates_total_g
  const fat = props.food.fat_total_g
  const fiber = props.food.fiber_g
  const sugar = props.food.sugar_g
  


  
  return (
      <View>
      <Text style={[,{color:'black'}]} >{name}</Text>
        <Text style={[,{color:'black'}]}>
          {calorie}
        </Text>
    </View>
  );
};

export default FoodItem;
