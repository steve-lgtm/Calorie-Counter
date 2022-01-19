import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { shadow } from 'react-native-paper';
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
     let show=''
      let energy=''
      let weight=''
    if(props.finalweight!=undefined){
      show=false
     energy=((props.energy)/100*(props.finalweight)).toFixed()
     weight=props.finalweight+' g'
    }
    else{
      show=true
      energy=props.energy
    }


  return (
    <TouchableOpacity style={styles.foodItem} onPress={props.onPress} >
        <View>
      <Text style={styles.foodName}>{props.name}</Text>
        </View>

      {show ? (
         <View style={{ display:'flex', flexDirection: 'column'  }}>
         <Text style={{ fontSize: 20, color: 'red' ,alignSelf:'flex-end' }}>
         {energy} kcal
       </Text>
       </View>) : (
          <View style={{ display:'flex', flexDirection: 'column'  }}>
          <Text style={{ fontSize: 12, color: '#6dbc4e' ,alignSelf:'flex-end' }}>
         {energy} kcal
       </Text>

       <Text style={{ fontSize: 12, color:'white',alignSelf:'flex-end' }}>
         {weight}
       </Text>
          </View>)}

    </TouchableOpacity>
  );
};

export default FoodItemOver;
