import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { Button, View, Text, StyleSheet, StatusBar, Pressable, TextInput, FlatList } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import http from './http';


function HomeScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={[,{marginRight:10}]} onPress={() => navigation.navigate('Search')}>
            <MaterialCommunityIcons name="magnify" color={"green"} size={37} />
            </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <MyTabs/>
  );
}

function SearchScreen({ navigation }) {
  const [ results, setResults ] = useState([]);
  const [ page, setPage ] = useState(0); 
  const [ ended, setEnded ] = useState(false);
  const onEndReached = () => {
    setPage(page + 1);
  };
  const onSubmit = e => {
    useEffect(() => {
      if (!ended) {
        http.get('/foods/search', {
          params: {
            expression: props.navigation.getParam('expression'),
            page,
          },
        }).then(res => {
          if (res.data.foods.food) {
            setResults(results.concat(res.data.foods.food));
          } else {
            setEnded(true);
          }
        });
      }
    }, [ page ]);
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', }}>
      <TextInput  onSubmitEditing={onSubmit} placeholder={'search for food'} style={{ color: 'cyan', fontSize: 32, backgroundColor:'grey',  width:'90%',borderRadius:10   }}/>
      <Button  onPress={() => navigation.goBack()} title="Go back home" />
      <FlatList
        data={results}
        onEndReachedThreashold={0.75}
        onEndReached={onEndReached}
        renderItem={({ item }) => {
          const onFoodItemPress = e => {
            props.navigation.navigate('AddFood', {
              food: item,
            });
          };
          return <FoodItem food={item} quantity={1} onPress={onFoodItemPress}/>;
        }}
      />
    </View>
    
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function MenuTabScreen({navigation}) {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: 'white' }]}>
    <StatusBar barStyle="light-content" backgroundColor="black" />
  <View style={{ backgroundColor:'black', alignItems: 'center', justifyContent: 'center' }}>
    <Button
      onPress={() => navigation.navigate('Notifications')}
      title="Go to notifications"
    />
    <Text>Home!</Text>
  </View>
    
  
  </SafeAreaView>
  );
}

function OverviewTabScreen() {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: 'white' }]}>
    <StatusBar barStyle="light-content" backgroundColor="black" />
    <Text>Settings!</Text>
    </SafeAreaView>
  );
}


const Tab = createBottomTabNavigator()
function MyTabs() {
  
  return (
    <Tab.Navigator screenOptions={  options={tabBarLabelStyle: {fontSize:13},tabBarStyle: {height: 60},tabBarShowLabel:true,tabBarLabelPosition:"below-icon"}}>
      <Tab.Screen options={{headerShown:false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="fire" color={"orange"} size={37} />
          ),}} name="Overview" component={OverviewTabScreen} />
      <Tab.Screen options={{headerShown:false,tabBarIcon: () => (
            <MaterialCommunityIcons name="food" color={"orange"} size={37} />
          ),}} name="Menu" component={MenuTabScreen} />
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

export default function App({navigation}) {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Calorie Counter" component={HomeScreen} options={{headerStyle:{}}}/>
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Search" component={SearchScreen} />
      </Drawer.Navigator>
      
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});