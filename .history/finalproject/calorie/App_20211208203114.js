import * as React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { NavigationContainer } from 'react-navigation/native';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        drawerType="front"
        initialRouteName="Profile"
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 10 },
        }}
       
      >
       
      </Drawer.Navigator>
    </NavigationContainer>
  );
}