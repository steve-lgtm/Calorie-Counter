import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles, colors } from './styles';

const FoodItem = function (props) {
  styles.foodItem = {
    backgroundColor: 'white',
    padding: 8,
    borderBottomWidth: 2,
    borderColor: 'grey',
  };
  styles.foodName = {
    fontSize: 24,
    color: 'grey',
  };
  styles.brandName = {
    fontSize: 16,
    color: 'grey'
  };
  console.log(props.food.name)
  const calorie = props.food.calories
  const name = props.food.name
  

  return (
      <View>
      <Text style={[,{color:'black'}]} >{name}</Text>

    
      <Text style={[,{color:'black'}]}>dgffd</Text>
        <Text style={[,{color:'black'}]}>
          {calorie}
        </Text>
       
    </View>
  );
};

export default FoodItem;
