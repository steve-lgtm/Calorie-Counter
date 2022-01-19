import 'react-native-gesture-handler';
import React, { useEffect, useState, useContext } from 'react';
import { Button, View, Text, StyleSheet, StatusBar, Pressable, TextInput, FlatList, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import FoodItem from './FoodItem';
import FoodItemBar from './FoodItemBar';
import FoodItemOver from './FoodItemOver';
import { DrawerContent } from './Drawercontent';
import { Value } from 'react-native-reanimated';
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import * as ctx from './contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { render } from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod';

import BarcodeScanner from 'react-native-scan-barcode';




function HomeScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{display:'flex',flexDirection:'row'}}>
        <Pressable style={[, { marginRight: 10 }]} onPress={() => navigation.navigate('Search')}>
          <MaterialCommunityIcons name="magnify" color={"black"} size={37} />
        </Pressable>
        <Pressable style={[, { marginRight: 10 }]} onPress={() => navigation.navigate('barcode')}>
          <MaterialCommunityIcons name="barcode" color={"black"} size={37} />
        </Pressable>
        </View>
      ),
    });
  }, [navigation]);

  return (

    <MyTabs />
  );
}


function DetailsScreen({ navigation, route }) {
  const [selectedweight, setSelectedweight] = useState(1);
  const [text, setText] = useState();

  const food = route.params.food;
  const name = food.name
  const energy = (food.calories).toFixed()
  const energykj = (food.calories * 4.184).toFixed()
  const protein = food.protein_g
  const catbohydrates = food.carbohydrates_total_g
  const fat = food.fat_total_g
  const fiber = food.fiber_g
  const sugar = food.sugar_g
  const serving = food.serving_size_g

  let finalweight = selectedweight * text


  const diaryCtx = useContext(ctx.Diary);
  function onAdd() {
    diaryCtx.addFood(name,energy,energykj, protein,catbohydrates,finalweight);
    navigation.navigate('Overview');
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fdca40" />
      <View style={[, { display: 'flex',width:400, alignItems: 'center', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
        <Text style={[, { fontSize: 35 }]}>{name}</Text>
      </View>
      <View style={[, { display: 'flex', width:400,borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
        <Text style={[, { color: 'white', margin: 10, fontSize: 16 }]}>Množstvo</Text>
        <View style={[, { margin: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }]}>
          <TextInput placeholderTextColor={'black'} keyboardType='numeric' textAlign={'center'} autoFocus={true} style={[, { backgroundColor: '#6dbc4e', borderBottomWidth: 1, color: 'white', height: 40, width: 70 }]} onChangeText={text => setText(text)}></TextInput>
          <Text style={[, { fontSize: 15 }]}>X</Text>
          <Picker style={[, { backgroundColor: '#6dbc4e', height: 40, width: 230 }]}
            selectedValue={selectedweight}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedweight(itemValue)
            }>
            <Picker.Item label="100 g" value={100} />
            <Picker.Item label="1 g" value={1} />
          </Picker>
        </View>
      </View>
      <View style={[, { display: 'flex',width:400, justifyContent: 'space-around', flexDirection: 'row', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
        <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={[, { color: 'white', fontSize: 16, margin: 10 }]}>Energia</Text>
          <Text style={[, { color: 'white', fontSize: 25, }]}>{energy} kcal</Text>
          <Text style={[, { color: 'white', fontSize: 16, margin: 10 }]}>Bielkoviny</Text>
          <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{protein} g</Text>

        </View>
        <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={[, { color: 'white', fontSize: 16, margin: 10 }]}>Energia</Text>
          <Text style={[, { color: 'white', fontSize: 25, }]}>{energykj} kJ</Text>
          <Text style={[, { color: 'white', fontSize: 16, margin: 10 }]}>Sacharidy</Text>
          <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{catbohydrates} g</Text>
        </View>
      </View>
      <View style={[, { display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')} style={[, { display: 'flex', height: 72, width: 190, alignItems: 'center', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5 }]} >
          <MaterialCommunityIcons name="cancel" color={"red"} size={70} />

        </TouchableOpacity>

        <TouchableOpacity onPress={onAdd} style={[, { display: 'flex', height: 72, width: 190, alignItems: 'center', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5 }]} >
          <MaterialCommunityIcons name="check" color={"white"} size={70} />

        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function DetailsScreenBar({ navigation, route }) {
  const [selectedweight, setSelectedweight] = useState(1);
  const [text, setText] = useState();

  const food = route.params.food
  const energy = food.product.nutriments['energy-kcal_100g'].toFixed()
  const name = food.product.product_name
  const quantity = food.product.product_quantity
  const energykj = food.product.nutriments['energy-kj_100g'].toFixed()
  const protein = food.product.nutriments.proteins_100g
  const catbohydrates = food.product.nutriments.carbohydrates_100g
  const fat = food.product.fat_100g
  const sugar = food.product.sugars_100g
  const serving = food.product.serving_quantity

  let finalweight = selectedweight * text


  const diaryCtx = useContext(ctx.Diary);
  function onAdd() {
    diaryCtx.addFood(name,energy,energykj, protein,catbohydrates,finalweight);
    navigation.navigate('Overview');
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fdca40" />
      <View style={[, { display: 'flex', alignItems: 'center', width:400, borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
        <Text style={[, { fontSize: 35 }]}>{name}{finalweight}</Text>
      </View>
      <View style={[, { display: 'flex', borderRadius: 10,width:400, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
        <Text style={[, { color: 'white', margin: 10, fontSize: 16 }]}>Množstvo</Text>
        <View style={[, { margin: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }]}>
          <TextInput placeholderTextColor={'black'} keyboardType='numeric' textAlign={'center'} autoFocus={true} style={[, { backgroundColor: '#6dbc4e', borderBottomWidth: 1, color: 'white', height: 40, width: 70 }]} onChangeText={text => setText(text)}></TextInput>
          <Text style={[, { fontSize: 15 }]}>X</Text>
          <Picker style={[, { backgroundColor: '#6dbc4e', height: 40, width: 230 }]}
            selectedValue={selectedweight}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedweight(itemValue)
            }>
            <Picker.Item label="100 g" value={100} />
            <Picker.Item label="1 g" value={1} />
          </Picker>
        </View>
      </View>
      <View style={[, { display: 'flex', justifyContent: 'space-around', width:400,flexDirection: 'row', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
        <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={[, { color: 'white', fontSize: 16, margin: 10 }]}>Energia</Text>
          <Text style={[, { color: 'white', fontSize: 25, }]}>{energy} kcal</Text>
          <Text style={[, { color: 'white', fontSize: 16, margin: 10 }]}>Bielkoviny</Text>
          <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{protein} g</Text>

        </View>
        <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={[, { color: 'white', fontSize: 16, margin: 10 }]}>Energia</Text>
          <Text style={[, { color: 'white', fontSize: 25, }]}>{energykj} kJ</Text>
          <Text style={[, { color: 'white', fontSize: 16, margin: 10 }]}>Sacharidy</Text>
          <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{catbohydrates} g</Text>
        </View>
      </View>
      <View style={[, { display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')} style={[, { display: 'flex', height: 72, width: 190, alignItems: 'center', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5 }]} >
          <MaterialCommunityIcons name="cancel" color={"red"} size={70} />

        </TouchableOpacity>

        <TouchableOpacity onPress={onAdd} style={[, { display: 'flex', height: 72, width: 190, alignItems: 'center', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5 }]} >
          <MaterialCommunityIcons name="check" color={"white"} size={70} />

        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function SearchScreen({ navigation, route }) {


  const [results, setResults] = useState([]);
  const [texti, setText] = useState();
  const [item, setItem] = useState();

  const onSubmit = e => {
    setResults('')
    let options = ''
    if (route.params != undefined) {

      options = {
        method: 'GET',
        url: 'https://world.openfoodfacts.org/api/v0/product/' + route.params.barcode + '.json',
      }
      axios.request(options).then(function (response) {
        setResults([response.data])
      }).catch(function (error) {
        console.error(error);
      });
      route.params = undefined
      setItem(false)
    }
    else {
      options = {
        method: 'GET',
        url: 'https://calorieninjas.p.rapidapi.com/v1/nutrition',
        params: { query: texti },
        dataType: "json",
        headers: {
          'x-rapidapi-host': 'calorieninjas.p.rapidapi.com',
          'x-rapidapi-key': 'd1a9325936msh0179d332e5deb83p179947jsn6228ebb26b02'
        }
      };
      axios.request(options).then(function (response) {
        console.log(response.data.items)
        if(response.data.items == ''){
          console.log('preslo')

          options = {
            method: 'GET',
            url: 'https://world.openfoodfacts.org/api/v0/product/' + texti + '.json',
          }
          axios.request(options).then(function (response) {
            if(response.data.status_verbose=='product not found'){
              console.log('nenaslo niccccccccccc')
              return
            }
            setResults([response.data])
          }).catch(function (error) {
            console.error(error);
          });
          route.params = undefined
          setItem(false)
          return
        }
        setResults(response.data.items)

      }).catch(function (error) {
        console.error(error);
      });
      setItem(true)
    }

  };

  const handleText = e => {
    let expression = e.nativeEvent.text.toString()
    setText(expression)
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fdca40" />
      <TextInput textAlign={'center'} autoFocus={true} onChange={handleText} placeholderTextColor={'white'} placeholder={'Search for food'} style={{ width: 420, marginTop: 1, marginBottom: 5, color: 'black', fontSize: 16, backgroundColor: 'grey', borderTopWidth: 0.5, borderBottomWidth: 0.2 }}>{route.params != undefined ? route.params.barcode : null}</TextInput>

      <Pressable onPress={onSubmit} style={{ display: 'flex', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green' }}><Text style={{}}>Search</Text></Pressable>
      <View >
        {item == true ? (
          <FlatList
            data={results}
            renderItem={({ item }) => {
              const onFoodItemPress = e => {
                navigation.navigate('Detail potraviny', {
                  food: item,
                });
              };
              return <FoodItem food={item} onPress={onFoodItemPress} />;
            }}
          />) : (
          <FlatList
            data={results}
            renderItem={({ item }) => {
              const onFoodItemPress = e => {
                navigation.navigate('Detail potraviny ', {
                  food: item,
                });
              };
              return <FoodItemBar food={item} onPress={onFoodItemPress} />;
            }}
          />)}
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

function MenuTabScreen({ navigation }) {
  return (
    <SafeAreaView style={[styles.container, {}]}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={{ backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => { navigation.navigate('barcode') }}
          title="Go to notifications"
        />
        <Text>Home!</Text>
      </View>


    </SafeAreaView>
  );
}

function UpdateFoodScreen({ navigation, route }) {
  const food = route.params
  const name = food.name
  const quantita = food.finalweight

  const [quantity, setQuantity] = useState(
    quantita
  );
  const diaryCtx = useContext(ctx.Diary);

  const onUpdate = () => {
    diaryCtx.updateFood(name, quantity);
    navigation.navigate('Overview');
  };

  const onRemove = () => {
    diaryCtx.removeFood(food);
    navigation.navigate('Overview');
  };

  return (
    <View style={[styles.container, styles.center]}>
      <Text style={styles.textLg}>{name}</Text>
      <TextInput
        autoFocus={true}
        keyboardType={'numeric'}
        style={{ color: 'cyan', fontSize: 32, marginTop: 16, marginBottom: 16 }}
        placeholder={'set quantity'}
        placeholderTextColor={'white'}
        onChangeText={text => {
          if (text) {
            setQuantity(parseInt(text));
          } else {
            setQuantity('');
          }
        }}
      >{quantita}</TextInput>
      <TouchableOpacity style={styles.btn} onPress={onUpdate}>
        <Text style={styles.textMd}>update entry</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, { marginTop: 8 }]} onPress={onRemove}>
        <Text style={styles.textMd}>remove from diary</Text>
      </TouchableOpacity>
    </View>
  );
}

function OverviewTabScreen({ navigation }) {
  const diaryyy = useContext(ctx.Diary);
  const diaryKeyDate = new Date(parseInt(diaryyy.diaryKey));
  const [date, setDate] = useState(diaryKeyDate);
  const [show, setShow] = useState(false);
  const total = diaryyy.entries.reduce(
    (prevValue, currentValue) => prevValue + currentValue.energy,
    0
  );
  const onPress = () => {
    setShow(true);
  };
  const onChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    const diaryKeyDate = new Date(
      currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()
    );
    setDate(diaryKeyDate);
    diaryyy.setDiaryKey(currentDate.getTime().toString());

  };

  const onPress1 = () => {
    navigation.navigate('Search');
  };
  return (
    <View style={styles.container}>
      {show && (
        <DateTimePicker
          mode={'date'}
          value={date}
          maximumDate={today}
          display="default"
          onChange={onChange} />)}
      <View style={styles.bar}>
        <Text style={[styles.text, { flex: 1 }]}>Tracking {date.toString().substr(0, 15)}</Text>
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text styles={styles.text}>edit</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.text, { textAlign: 'center' }]}>{total} kcal</Text>
      <FlatList
        data={diaryyy.entries}
        renderItem={({ item }) => {
          const onFoodItemPress = e => {
            navigation.navigate('Update potraviny', {
              name: item.name,
              finalweight: item.finalweight,
              energy: item.energy

            })
          };
          return <FoodItemOver name={item.name} finalweight={item.finalweight} energy={item.energy} onPress={onFoodItemPress} />;
        }}
      />
    </View>
  );
}


const Tab = createBottomTabNavigator()
function MyTabs() {

  return (
    <Tab.Navigator screenOptions={options = { tabBarLabelStyle: { fontSize: 13 }, tabBarStyle: { height: 60 }, tabBarShowLabel: true, tabBarLabelPosition: "below-icon" }}>
      <Tab.Screen options={{
        headerShown: false,
        tabBarIcon: () => (
          <MaterialCommunityIcons name="fire" color={"orange"} size={37} />
        ),
      }} name="Overview" component={OverviewTabScreen} />
      <Tab.Screen options={{
        headerShown: false, tabBarIcon: () => (
          <MaterialCommunityIcons name="food" color={"orange"} size={37} />
        ),
      }} name="Menu" component={MenuTabScreen} />
    </Tab.Navigator>
  );
}
function Barcode({ navigation }) {
  const [isActive, setIsActive] = useState(true);
  reload = () => {
    if (isActive) {
      setIsActive(false);
      if (isActive == false)
        setIsActive(true)
    }
    else
      setIsActive(true)
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Calorie App Camera Permission",
          message:
            "Calorie needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  requestCameraPermission()
  const barcodeReceived = e => {
    navigation.navigate('Search', {
      barcode: e.data
    });

  };
  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
    }}>
      {isActive && (
        <BarcodeScanner
          onBarCodeRead={barcodeReceived}
          torchMode={'on'}
          style={{ flex: 1 }}
        />
      )}

      <Button title="reload" onPress={reload} />
    </View>


  );
}
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

export default function App({ navigation }) {
  const [entries, setEntries] = useState([]);
  const [diaryKey, setDiaryKey] = useState(today.getTime().toString());


  useEffect(() => {
    AsyncStorage
      .getItem(diaryKey)
      .then(diary => {
        setEntries(JSON.parse(diary) || []);
      })
      .catch(err => {
        // TODO
      });
  }, [diaryKey]);

  function writeDiary(newDiary) {

    return AsyncStorage
      .setItem(diaryKey, JSON.stringify(newDiary))
      .catch(err => {
        // TODO
      });
  }
  const diaryCtx = {
    diaryKey,
    entries,
    setDiaryKey,
    addFood(name,energy,energykj, protein,catbohydrates,finalweight) {
      const newDiary = entries.concat({ name,energy,energykj, protein,catbohydrates,finalweight});
      writeDiary(newDiary);
      setEntries(newDiary);
    },
    updateFood(name, finalweight) {
      const target = entries.find(entry => {
        return (name === entry.name);
      });
      target.finalweight = finalweight;

      const newEntries = entries.filter(entry => {
        return (name !== entry.name);
      });
      newEntries.unshift(target);
      writeDiary(newEntries);
      setEntries(newEntries);
    },
    removeFood(food) {
      const newEntries = entries.filter(entry => {
        return (food.name !== entry.food.name);
      });
      writeDiary(newEntries);
      setEntries(newEntries);
    },
  };
  return (
    <ctx.Diary.Provider value={diaryCtx}>
      <SafeAreaProvider>

        <NavigationContainer>
          <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>

            <Drawer.Screen name="Calorie Counter" component={HomeScreen} options={{ headerStyle: { backgroundColor: '#fdca40', }, headerTintColor: 'black', }} />
            <Drawer.Screen name="Notifications" component={NotificationsScreen} />
            <Drawer.Screen options={{ headerStyle: { backgroundColor: '#fdca40', }, headerTintColor: 'black', }} name="Search" component={SearchScreen} />
            <Drawer.Screen name="Detail potraviny" component={DetailsScreen} options={{ headerStyle: { backgroundColor: '#fdca40', }, headerTintColor: 'black', }} />
            <Drawer.Screen name="Detail potraviny " component={DetailsScreenBar} options={{ headerStyle: { backgroundColor: '#fdca40', }, headerTintColor: 'black', }} />

            <Drawer.Screen name="Update potraviny" component={UpdateFoodScreen} options={{ headerStyle: { backgroundColor: '#fdca40', }, headerTintColor: 'black', }} />
            <Stack.Screen name="barcode" component={Barcode} options={{ headerStyle: { backgroundColor: '#fdca40', }, headerTintColor: 'black', }} />



          </Drawer.Navigator>

        </NavigationContainer>
      </SafeAreaProvider>
    </ctx.Diary.Provider>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: 'black' },
  container2: {
    flex: 1,
    backgroundColor: 'grey',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  bar: {
    borderColor: 'cyan',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});