import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles, colors } from './styles';

const FoodItem = function (props) {
  styles.foodItem = {
    backgroundColor: colors.white,
    padding: 8,
    borderBottomWidth: 2,
    borderColor: 'colors.grey',
  };
  styles.foodName = {
    fontSize: 24,
    color: colors.grey,
  };
  styles.brandName = {
    fontSize: 16,
    color: colors.orange
  };
  console.log(props.food.name)
  const calorie = props.food.calories
  const name = props.food.name
  

  return (
    <TouchableOpacity style={styles.foodItem}>
      <Text numberOfLines={1} style={styles.foodName}>{name}</Text>
     
      <View style={{ flexDirection: 'row' }}>
      <Text style={[,{color:'black'}]}>dgffd</Text>
        <Text style={{ fontSize: 16, color: 'grey' }}>
          {calorie}
        </Text>
        </View>
    </TouchableOpacity>
  );
};

export default FoodItem;
