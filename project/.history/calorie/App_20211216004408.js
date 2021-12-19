import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { Button, View, Text, StyleSheet, StatusBar, Pressable, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import FoodItem from './FoodItem';
import { DrawerContent } from './Drawercontent';
import { Value } from 'react-native-reanimated';
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';




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
function DetailsScreen({navigation,route}){
  const [selectedweight, setSelectedweight] = useState(100);
      const food = route.params.food;
    const name = food.name
    const energy = (food.calories).toFixed()
    const energykj = (food.calories*4.184).toFixed()
    const protein = food.protein_g
    const catbohydrates = food.carbohydrates_total_g
    const fat = food.fat_total_g
    const fiber = food.fiber_g
    const sugar = food.sugar_g
    const serving = food.serving_size_g
  
    console.log(food)
    return(
      <SafeAreaView style={styles.container}>
         <StatusBar barStyle="dark-content" backgroundColor="#fdca40" />
         <View style={[,{display:'flex', alignItems:'center', borderRadius:10, backgroundColor: '#6dbc4e',marginVertical:10,marginHorizontal:5,padding:2}]}>
         <Text style={[,{fontSize:35}]}>{name}</Text>
         </View>
         <View style={[,{display:'flex', borderRadius:10, backgroundColor: '#6dbc4e',marginVertical:10,marginHorizontal:5,padding:2}]}>
         <Text style={[,{color:'white',margin:10,fontSize:16}]}>Množstvo</Text>
         <View style={[,{margin:5,display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}]}>
          <TextInput placeholderTextColor={'black'} defaultValue="1" keyboardType='numeric' textAlign={'center'} style={[,{backgroundColor:'#6dbc4e',borderBottomWidth:1, color:'white',height:40, width:70}]}></TextInput>
          <Text style={[,{fontSize:15}]}>X</Text>
          <Picker style={[,{backgroundColor:'#6dbc4e',height:40, width:230}]}
  selectedValue={selectedweight}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedweight(itemValue)
  }>
  <Picker.Item label="100 g" value={100} />
  <Picker.Item label="1 g" value={1} />
</Picker>
         </View>
         </View>
         <View style={[,{display:'flex', justifyContent:'space-around', flexDirection:'row', borderRadius:10, backgroundColor: '#6dbc4e',marginVertical:10,marginHorizontal:5,padding:2}]}>
         <View style={[,{justifyContent:'center',alignItems:'center'}]}>
         <Text style={[,{color:'white',fontSize:16, margin:10}]}>Energia</Text>
         <Text style={[,{color:'white',fontSize:25, }]}>{energy} kcal</Text>
         <Text style={[,{color:'white',fontSize:16,margin:10 }]}>Bielkoviny</Text>
         <Text style={[,{color:'white',fontSize:16, marginBottom:5}]}>{protein} g</Text>


         </View>
         <View style={[,{justifyContent:'center',alignItems:'center'}]}>
          <Text style={[,{color:'white',fontSize:16, margin:10}]}>Energia</Text>
          <Text style={[,{color:'white',fontSize:25, }]}>{energykj} kJ</Text>
          <Text style={[,{color:'white',fontSize:16,margin:10 }]}>Sacharidy</Text>
         <Text style={[,{color:'white',fontSize:16,marginBottom:5 }]}>{catbohydrates} g</Text>
         </View>
         </View>
          <View style={[,{display:'flex',flexDirection:'row',justifyContent:'space-around'}]}>
         <TouchableOpacity style={[,{display:'flex', height:72, width:190, alignItems:'center', borderRadius:10, backgroundColor: '#6dbc4e',marginVertical:10,marginHorizontal:5}]} >
           <MaterialCommunityIcons name="fire" color={"orange"} size={70}/>

           </TouchableOpacity>
           
         <TouchableOpacity style={[,{display:'flex', height:72, width:190, alignItems:'center', borderRadius:10, backgroundColor: '#6dbc4e',marginVertical:10,marginHorizontal:5}]} >
           <MaterialCommunityIcons name="fire" color={"orange"} size={70}/>

           </TouchableOpacity>
           </View>
      </SafeAreaView>
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
      console.log('prebehlo')
      setResults(response.data.items)

    }).catch(function (error) {
      console.error(error);
    });
  
  };
  return (
    <SafeAreaView style={styles.container}>
     <StatusBar barStyle="dark-content" backgroundColor="#fdca40" />
      <TextInput textAlign={'center'} autoFocus={true} onSubmitEditing={onSubmit} placeholderTextColor={'white'} placeholder={'Search for food'} style={{ marginTop:1,marginBottom:5,color: 'black', fontSize: 16, backgroundColor:'grey', borderTopWidth:0.5, borderBottomWidth:0.2 }}/>
      <View >
      <FlatList
        data={results}
        renderItem={({ item }) => {
          const onFoodItemPress = e => {
            navigation.navigate('Detail potraviny', {
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
    <Drawer.Navigator drawerContent={props => <DrawerContent {... props}/>}>
    
        <Drawer.Screen name="Calorie Counter" component={HomeScreen} options={{headerStyle: {backgroundColor: '#fdca40',},headerTintColor: 'black',}}/>
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen  options={{headerStyle: {backgroundColor: '#fdca40',},headerTintColor: 'black',}} name="Search" component={SearchScreen} />
        <Drawer.Screen name="Detail potraviny" component={DetailsScreen} options={{headerStyle: {backgroundColor: '#fdca40',},headerTintColor: 'black',}}/>
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