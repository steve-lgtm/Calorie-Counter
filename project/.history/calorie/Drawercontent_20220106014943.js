import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function DrawerContent(props) {

    const paperTheme = useTheme();

    return(
        <View style={{flex:1, backgroundColor:'black'}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={{display:'flex',alignSelf:'center',marginTop:5,}}>
                        <Text style={{fontSize:20}}>
                            MENU
                        </Text>
                    </View>


                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                name="home-outline"
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Calorie Counter')}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                name="magnify"
                                color={color}
                                size={size}
                                />
                            )}
                            label="Search"
                            onPress={() => {props.navigation.navigate('Search')}}
                        />
                         <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                name="barcode"
                                color={color}
                                size={size}
                                />
                            )}
                            label="Barcode"
                            onPress={() => {props.navigation.navigate('barcode')}}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">

                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },

    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });