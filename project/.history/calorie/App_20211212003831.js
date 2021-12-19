import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { Button, View, Text, StyleSheet, StatusBar, Pressable, TextInput, FlatList } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import FoodItem from './FoodItem';
import { Value } from 'react-native-reanimated';




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
function DetailsScreen({navigation}){
  return(
    <Text>Details Screen</Text>
  );
}

function SearchScreen({ navigation }) {
  const [ results, setResults ] = useState([]);
  const [ energy, setEnergy ] = useState(); 
  const [ name, setName ] = useState(); 

  const [ ended, setEnded ] = useState(false);
  const onEndReached = () => {
    setPage(page + 1);
  };
 
  const onSubmit = e => {
     let expression= e.nativeEvent.text.toString()
    const options = {
      method: 'GET',
      url: 'https://calorieninjas.p.rapidapi.com/v1/nutrition',
      params: {query: expression},
      dataType: "json",
      headers: {
        'x-rapidapi-host': 'calorieninjas.p.rapidapi.com',
        'x-rapidapi-key': 'd1a9325936msh0179d332e5deb83p179947jsn6228ebb26b02'
      }
    };
    
    axios.request(options).then(function (response) {
      setResults(response.data.items)
      console.log(response.data.items)

    }).catch(function (error) {
      console.error(error);
    });
  
  };
  return (
    <SafeAreaView style={styles.container}>
     
      <TextInput blurOnSubmit={true} textAlign={'center'} onSubmitEditing={onSubmit} placeholderTextColor={'white'} placeholder={'Search for food'} style={{ marginTop:1,marginBottom:5,color: 'black', fontSize: 16, backgroundColor:'grey', borderTopWidth:0.5, borderBottomWidth:0.2 }}/>
      <Button onPress={() => navigation.navigate('Details')}>gdfgfdg</Button>
      <View >
      <FlatList
        data={results}
        renderItem={({ item }) => {
          const onFoodItemPress = e => {
            props.navigation.navigate('AddFood', {
              food: item,
            });
          };
          return <FoodItem food={item} onPress={onFoodItemPress}/>;
        }}
      />
    </View>
    </SafeAreaView>
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
const Stack = createNativeStackNavigator();

export default function App({navigation}) {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
      <Stack.Screen name="Details" component={DetailsScreen} />
        <Drawer.Screen name="Calorie Counter" component={HomeScreen} options={{headerStyle:{}}}/>
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen  options={{headerStyle: {
              backgroundColor: '#fdca40',
            },headerTintColor: '#fff',}} name="Search" component={SearchScreen} />
      </Drawer.Navigator>
      
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor:'black'},
  container2: {
    flex: 1,
    backgroundColor: 'grey',
  }
});