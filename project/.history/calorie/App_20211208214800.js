
import React, {Component, useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text, ScrollView, Modal, SafeAreaView} from 'react-native';
import CompassHeading from 'react-native-compass-heading';


const styles = StyleSheet.create({
    head: {
        marginBottom:180,
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'black',
    },
    arrow: {
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    compass:{
        width: 300,
        height: 310,
        alignSelf: 'center',
        transform:90,
        marginBottom:200
    },
    num: {
      
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'black',
    },
});

export default function App{
    
        return (
            <SafeAreaView style={[{backgroundColor: 'black'}]}>
                <View style={styles.head}>
                    <Text style={{fontSize: 20, color: 'white'}}>Compass</Text>
                </View>
                <View style={styles.arrow}>
                <Image source={require('./assets/arrow.png')} style={[,{width:30,height:30,}]}/>
                    <Image
                        style={[styles.
                    compass,
                            {transform: [{rotate: `-${this.state.compassHeading}deg`}]}]}
                        source={require('./assets/compass.png')}
                    />
                </View>
                <View style={styles.num}>
                    <Text style={{fontSize: 20, color: 'white'}}>
                        {360-this.state.compassHeading}
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

