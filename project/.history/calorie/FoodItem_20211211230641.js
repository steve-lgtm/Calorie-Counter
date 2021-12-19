import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles, colors } from './styles';

const FoodItem = function (props) {
    styles.foodItem = {
        backgroundColor: colors.white,
        padding: 8,
        borde
        borderColor: colors.grey,
        borderRadius:10
      };
      styles.foodName = {
        fontSize: 24,
        color: colors.grey,
      };
      styles.brandName = {
        fontSize: 16,
        color: colors.orange
      };
  const calorie = props.food.calories
  const name = props.food.name
  const protein = props.food.protein_g
  const catbohydrates = props.food.catbohydrates_total_g
  const fat = props.food.fat_total_g
  const fiber = props.food.fiber_g
  const sugar = props.food.sugar_g
  const serving = props.food.serving_size_g

  
  return (
    <TouchableOpacity style={styles.foodItem}>
      <Text style={styles.foodName}>{name}</Text>       
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ fontSize: 16, color: colors.grey }}>
          {calorie} kcal
        </Text>
    
        <Text style={{ fontSize: 16, color: colors.grey }}>
          {serving} g
        </Text>
    </View>
    </TouchableOpacity>
  );
};

export default FoodItem;
