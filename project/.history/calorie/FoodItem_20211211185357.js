import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles, colors } from './styles';

const FoodItem = function (props) {
  console.log(props.food.name)
  const calorie = props.food.calories
  const name = props.food.name
  const 
  
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
