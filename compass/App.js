
import React, {Component, useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text, ScrollView, Modal} from 'react-native';
import CompassHeading from 'react-native-compass-heading';


const styles = StyleSheet.create({
    header: {
        flex: 1,
       
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'black',
    },
    blank: {
        backgroundColor: 'black',
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    compass: {
        position: 'relative',
        width: 350,
        height: 350,
        alignSelf: 'center',
    },
    Arrow:{
        width: 300,
        height: 310,
        alignSelf: 'center',
        transform:90
    },
    num: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'black',
    },
});

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compassHeading: 0,
        };
    }

    componentDidMount(){
        const degree_update_rate = 0.00001;
        CompassHeading.start(degree_update_rate, (heading, accuracy) => {
            this.setState({
                compassHeading: parseInt(heading.heading)
            })
        })

    }

    render() {
        return (
            <Modal>
                <View style={styles.header}>
                    <Text style={{fontSize: 20, color: 'white'}}>Compass</Text>
                </View>
                
                <View style={styles.blank}>
                <Image source={require('./assets/arrow.png')} style={[,{width:30,height:30,}]}/>
                    <Image
                        style={[styles.
                    Arrow,
                            {transform: [{rotate: `-${this.state.compassHeading}deg`}]}]}
                        source={require('./assets/compass.png')}
                    />
                    
                </View>
                <View style={styles.num}>
                    <Text style={{fontSize: 20, color: 'white'}}>
                        {this.state.compassHeading == 0
                        ? 0
                        : 360-this.state.compassHeading.toString(10)}
                    </Text>
                </View>
            </Modal>
        );
    }
}
