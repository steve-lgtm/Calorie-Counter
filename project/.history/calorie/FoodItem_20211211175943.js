import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles, colors } from './styles';

const FoodItem = function (props) {
  styles.foodItem = {
    backgroundColor: colors.white,
    padding: 8,
    borderBottomWidth: 2,
    borderColor: colors.grey,
  };
  styles.foodName = {
    fontSize: 24,
    color: colors.grey,
  };
  styles.brandName = {
    fontSize: 16,
    color: colors.orange
  };
  console.log(props.food[0].calories)
  const calorie = props.food[0].calories
  const name = props.food[0].name
  

  return (
    <TouchableOpacity style={styles.foodItem} onPress={props.onPress}>
      <Text numberOfLines={1} style={styles.foodName}>{name}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 16, color: 'grey' }}>
          {calorie}
        </Text>
        </View>
    </TouchableOpacity>
  );
};

export default FoodItem;
