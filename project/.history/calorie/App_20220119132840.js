import 'react-native-gesture-handler';
import React, { useEffect, useState, useContext } from 'react';
import { Button, View, Text, StyleSheet, StatusBar, Pressable, TextInput, FlatList, TouchableOpacity, PermissionsAndroid, Modal } from 'react-native';
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
import {PieChart as Piechart2, LineChart} from "react-native-chart-kit";
import * as ctx from './contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import {PieChart as PieChart1} from "react-native-gifted-charts";

import { useTranslation } from 'react-i18next';

import BarcodeScanner from 'react-native-scan-barcode';
import { ForceTouchGestureHandler, ScrollView } from 'react-native-gesture-handler';
import { yellow100 } from 'react-native-paper/lib/typescript/styles/colors';
import { color } from 'react-native-reanimated';




function HomeScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{display:'flex',flexDirection:'row'}}>
        <Pressable style={[, { marginRight: 10 }]} onPress={() => navigation.navigate('Search')}>
          <MaterialCommunityIcons name="magnify" color={"black"} size={37} />
        </Pressable>
        <Pressable style={[, { marginRight: 10 }]} onPress={() => navigation.navigate('Barcode Scanner')}>
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
  const [selectedweight, setSelectedweight] = useState(100);
  const [haha, setText] = useState(1);
  let finalweight = selectedweight * haha
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
  const energyx=((energy/100)*finalweight).toFixed()
  const energykjx=((energykj/100)*finalweight).toFixed()
  const proteinx=((protein/100)*finalweight).toFixed()
  const catbohydratesx=((catbohydrates/100)*finalweight).toFixed()
  const fatx=((fat/100)*finalweight).toFixed()
  const fiberx=((fiber/100)*finalweight).toFixed()
  const data = [
    {
      name: "Protein",
      population: protein,
      color: "red",
      legendFontColor: "#000000",
      legendFontSize: 15
    },
    {
      name: "Fat",
      population: fat,
      color: "yellow",
      legendFontColor: "#000000",
      legendFontSize: 15
    },
    {
      name: "Carbohydrates",
      population: catbohydrates,
      color: "blue",
      legendFontColor: "#000000",
      legendFontSize: 15
    },
    {
      name: "Fiber",
      population: fiber,
      color: "green",
      legendFontColor: "#000000",
      legendFontSize: 15
    },

  ];
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false // optional
  };

  const diaryCtx = useContext(ctx.Diary);
  function onAdd() {
    diaryCtx.addFood(name,energy,energykj, protein,catbohydrates,fat, fiber,finalweight);
    navigation.navigate('Overview');
  }
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor="#fdca40" />
    <View style={[, { display: 'flex', alignItems: 'center', width:400, borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
      <Text style={[, { fontSize: 35, color:'white'  }]}>{name}</Text>
    </View>
    <ScrollView>
    <View style={[, { display: 'flex', borderRadius: 10,width:400, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
      <Text style={[, { color: 'white', margin: 10, fontSize: 16 }]}>Quantity</Text>
      <View style={[, { margin: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }]}>
        <TextInput placeholderTextColor={'black'} keyboardType='numeric' textAlign={'center'} autoFocus={true} style={[, { backgroundColor: '#6dbc4e', borderBottomWidth: 1, color: 'white', height: 40, width: 70 }]} onChangeText={text => setText(text)}>1</TextInput>
        <Text style={[, { fontSize: 15 }]}>X</Text>
        <Picker style={[, { backgroundColor: '#6dbc4e', height: 40, width: 230 }]}
          selectedValue={selectedweight}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedweight(itemValue)
          }>
          <Picker.Item label="100 g" value={100} />
          <Picker.Item label="1 g" value={1} />
          <Picker.Item label={'porcia ('+serving+'g)'} value={serving} />

        </Picker>
      </View>
    </View>
    <View style={[, { display: 'flex', justifyContent: 'space-around', width:400,flexDirection: 'row', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
      <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={[, { color: 'white', fontSize: 16, margin: 10,color:'black' }]}>Energy</Text>
        <Text style={[, { color: 'white', fontSize: 25,marginBottom:7}]}>{energyx} kcal</Text>


      </View>
      <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={[, { color: 'white', fontSize: 16, margin: 10 , color:'black' }]}>Energy</Text>
        <Text style={[, { color: 'white', fontSize: 25,marginBottom:7}]}>{energykjx} kJ</Text>

      </View>

    </View>
    <View style={[, { display: 'flex', justifyContent: 'space-around', width:400,flexDirection: 'row', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
      <View style={[, { justifyContent: 'center', alignItems: 'center',width:150 }]}>

        <Text style={[, { color: 'white', fontSize: 16, margin: 10 , color:'black' }]}>Proteins</Text>
        <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{proteinx} g</Text>
        <Text style={[, { color: 'white', fontSize: 16, margin: 10, color:'black'  }]}>Fiber</Text>
        <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{fiberx} g</Text>

      </View>
      <View style={[, { justifyContent: 'center', alignItems: 'center',width:150 }]}>

        <Text style={[, { color: 'white', fontSize: 16, margin: 10 , color:'black' }]}>Fats</Text>
        <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{fatx} g</Text>
        <Text style={[, { color: 'white', fontSize: 16, margin: 10, color:'black'  }]}>Carbohydrates</Text>
        <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{catbohydratesx} g</Text>
      </View>

    </View>
    <View style={[, { display: 'flex', borderRadius: 10,width:400, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
      <View style={{height:200}}>
      <Piechart2
  data={data}
  width={400}
  height={200}
  chartConfig={chartConfig}
  accessor={"population"}
  backgroundColor={"transparent"}
  paddingLeft={"-13"}
  center={[15,0]}
/>
            </View>
</View>
</ScrollView>
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
  const [selectedweight, setSelectedweight] = useState(100);
  const [haha, setText] = useState(1);
  const diaryCtx = useContext(ctx.Diary);
  let finalweight = selectedweight * haha
  const food = route.params.food
  const energy = food.product.nutriments['energy-kcal_100g']
  const name = food.product.product_name
  const quantity = food.product.product_quantity
  const energykj = food.product.nutriments['energy-kj_100g']
  const protein = food.product.nutriments.proteins_100g
  const catbohydrates = food.product.nutriments.carbohydrates_100g
  const fat = food.product.nutriments.fat_100g
  const fiber = food.product.nutriments.fiber_100g
  const sugar = food.product.sugars_100g
  const serving = food.product.serving_quantity
  const energyx=((energy/100)*finalweight).toFixed()
  const energykjx=((energykj/100)*finalweight).toFixed()
  const proteinx=((protein/100)*finalweight).toFixed()
  const catbohydratesx=((catbohydrates/100)*finalweight).toFixed()
  const fatx=((fat/100)*finalweight).toFixed()
  const fiberx=((fiber/100)*finalweight).toFixed()
  const data = [
    {
      name: "Protein",
      population: protein,
      color: "red",
      legendFontColor: "#000000",
      legendFontSize: 15
    },
    {
      name: "Fat",
      population: fat,
      color: "yellow",
      legendFontColor: "#000000",
      legendFontSize: 15
    },
    {
      name: "Carbohydrates",
      population: catbohydrates,
      color: "blue",
      legendFontColor: "#000000",
      legendFontSize: 15
    },
    {
      name: "Fiber",
      population: fiber,
      color: "green",
      legendFontColor: "#000000",
      legendFontSize: 15
    },

  ];
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false // optional
  };


  function onAdd() {
    diaryCtx.addFood(name,energy,energykj, protein,catbohydrates,fat, fiber,finalweight);
    navigation.navigate('Overview');
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fdca40" />
      <View style={[, { display: 'flex', alignItems: 'center', width:400, borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
        <Text style={[, { fontSize: 35, color:'white'  }]}>{name}</Text>
      </View>
      <ScrollView>
      <View style={[, { display: 'flex', borderRadius: 10,width:400, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
        <Text style={[, { color: 'white', margin: 10, fontSize: 16 }]}>Quantity</Text>
        <View style={[, { margin: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }]}>
          <TextInput placeholderTextColor={'black'} keyboardType='numeric' textAlign={'center'} autoFocus={true} style={[, { backgroundColor: '#6dbc4e', borderBottomWidth: 1, color: 'white', height: 40, width: 70 }]} onChangeText={text => setText(text)}>1</TextInput>
          <Text style={[, { fontSize: 15 }]}>X</Text>
          <Picker style={[, { backgroundColor: '#6dbc4e', height: 40, width: 230 }]}
            selectedValue={selectedweight}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedweight(itemValue)
            }>
            <Picker.Item label="100 g" value={100} />
            <Picker.Item label="1 g" value={1} />
            <Picker.Item label={'porcia ('+serving+'g)'} value={serving} />

          </Picker>
        </View>
      </View>
      <View style={[, { display: 'flex', justifyContent: 'space-around', width:400,flexDirection: 'row', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
        <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={[, { color: 'white', fontSize: 16, margin: 10,color:'black' }]}>Energy</Text>
          <Text style={[, { color: 'white', fontSize: 25,marginBottom:7}]}>{energyx} kcal</Text>


        </View>
        <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={[, { color: 'white', fontSize: 16, margin: 10 , color:'black' }]}>Energy</Text>
          <Text style={[, { color: 'white', fontSize: 25,marginBottom:7}]}>{energykjx} kJ</Text>

        </View>

      </View>
      <View style={[, { display: 'flex', justifyContent: 'space-around', width:400,flexDirection: 'row', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
        <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>

          <Text style={[, { color: 'white', fontSize: 16, margin: 10 , color:'black' }]}>Proteins</Text>
          <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{proteinx} g</Text>
          <Text style={[, { color: 'white', fontSize: 16, margin: 10, color:'black'  }]}>Fiber</Text>
          <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{fiberx} g</Text>

        </View>
        <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>

          <Text style={[, { color: 'white', fontSize: 16, margin: 10 , color:'black' }]}>Fats</Text>
          <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{fatx} g</Text>
          <Text style={[, { color: 'white', fontSize: 16, margin: 10, color:'black'  }]}>Carbohydrates</Text>
          <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{catbohydratesx} g</Text>
        </View>

      </View>
      <View style={[, { display: 'flex', borderRadius: 10,width:400, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
      <Piechart2
  data={data}
  width={400}
  height={200}
  chartConfig={chartConfig}
  accessor={"population"}
  backgroundColor={"transparent"}
  paddingLeft={"-13"}
  center={[15,0]}
/>
</View>
</ScrollView>
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
  const { t, i18n } = useTranslation();


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{display:'flex',flexDirection:'row'}}>
        <Pressable style={[, { marginRight: 10 }]} onPress={() => navigation.navigate('Barcode Scanner')}>
          <MaterialCommunityIcons name="barcode" color={"black"} size={37} />
        </Pressable>
        </View>
      ),
    });
  }, [navigation]);

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
      <View style={{display:'flex',flexDirection:'row'}}>
      <TextInput textAlign={'center'} autoFocus={true} onChange={handleText} placeholderTextColor={'white'} placeholder={t('Type name of food..')} style={{ width: 300,borderRadius:20, marginTop:20,marginBottom: 15, color: 'black', fontSize: 16, backgroundColor: 'lightgrey', borderTopWidth: 0.5, borderBottomWidth: 0.2 }}>{route.params != undefined ? route.params.barcode : null}</TextInput>
      <TouchableOpacity onPress={onSubmit} style={{ display: 'flex', height: 49, width: 100,marginLeft:10,marginTop:20,borderRadius:20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green' }}><Text style={{color:'white'}}>{t("Submit")}</Text></TouchableOpacity>
      </View>

      <View >
        {item == true ? (
          <FlatList
            data={results}
            renderItem={({ item }) => {
              const onFoodItemPress = e => {
                navigation.navigate('Details food', {
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
                navigation.navigate('Details food ', {
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
  const diaryyy = useContext(ctx.Diary);
  const diaryKeyDate = new Date(parseInt(diaryyy.diaryKey));
  const [date, setDate] = useState(diaryKeyDate);
  const [show, setShow] = useState(false);
  const { t, i18n } = useTranslation();

  const onPress = () => {
    setShow(true);

  };
  const onChange = (event, selectedDate) => {

    setShow(false);
    const currentDate = selectedDate || date;
    if(selectedDate!=undefined){
    setDate(currentDate);
    const diaryKeyDate = new Date(
      currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()
    );
    setDate(diaryKeyDate);
    diaryyy.setDiaryKey(currentDate.getTime().toString());
    }
  };
  let day =''
  switch (diaryKeyDate.getDay()) {
    case 0:
      day = t("Sunday");
      break;
    case 1:
      day = t("Monday");
      break;
    case 2:
       day = t("Tuesday");
      break;
    case 3:
      day = t("Wednesday");
      break;
    case 4:
      day = t("Thursday");
      break;
    case 5:
      day = t("Friday");
      break;
    case 6:
      day = t("Saturday");
  }
  return (
    <SafeAreaView style={[styles.container, {}]}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      {show && (
        <DateTimePicker
          mode={'date'}
          value={diaryKeyDate}
          maximumDate={today}
          display="default"
          onChange={onChange} />)}
      <View style={styles.bar}>
      <TouchableOpacity style={[styles.btn,{flex: 1,flexDirection:'row',justifyContent:'center',alignItems:'center'}]} onPress={onPress}>

      <MaterialCommunityIcons name="calendar" color={"white"} size={30} />
        <Text style={[styles.text, { marginLeft:7 }]}>
 {day}, {diaryKeyDate.toString().substr(8, 2)}. {(diaryKeyDate.getMonth())+1}.</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={diaryyy.entries}
        renderItem={({ item }) => {
          if(item.weight==undefined){
          const onFoodItemPress = e => {
            if(item.energy!=undefined){
            navigation.navigate('Update food', {
              name: item.name,
              finalweight: item.finalweight,
              energy: item.energy,
              energykj: item.energykj,
              protein : item.protein,
              catbohydrates: item.catbohydrates,
              fat : item.fat,
              fiber : item.fiber
            })}
            else{
              navigation.navigate('Update activity',{
              name: item.nameofactivity,
              energy: item.energyofactivity
              }
              )
            }
          };
          return <FoodItemOver name={item.name||item.nameofactivity} finalweight={item.finalweight} energy={item.energy||item.energyofactivity} onPress={onFoodItemPress} />;
        }}}
      />

    </SafeAreaView>
  );
}

function UpdateActivityScreen({ navigation, route }) {

  const [haha, setText] = useState(route.params.energy);

  const diaryCtx = useContext(ctx.Diary);

  const name = route.params.name

  const energy = route.params.energy



  const onUpdate = () => {
    diaryCtx.updateActivity(name,haha);
    navigation.navigate('Foods');
  };

  const onRemove = () => {
    diaryCtx.removeActivity(name);
    navigation.navigate('Foods');
  };




  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fdca40" />
      <View style={[, { display: 'flex', alignItems: 'center', width:400, borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
        <Text style={[, { fontSize: 35, color:'white'  }]}>{name}</Text>
      </View>

      <View style={[, { display: 'flex', borderRadius: 10,width:400, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
        <Text style={[, { color: 'white', margin: 10, fontSize: 16 }]}>Calorie (Energy in kcal):</Text>
        <View style={[, { margin: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }]}>
          <TextInput  onChangeText={text => setText(text)} keyboardType='numeric'  placeholderTextColor={'lightgrey'} placeholder={'Calorie'} style={{paddingLeft:20, width: 380,borderRadius:10,marginTop:10, marginBottom: 15, color: 'black', fontSize: 16, backgroundColor: 'white', borderTopWidth: 0.5, borderBottomWidth: 0.2 }}>{energy}</TextInput>

         </View>
         </View>
      <View style={[, { display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }]}>
        <TouchableOpacity onPress={onRemove} style={[, { display: 'flex', height: 72, width: 190, alignItems: 'center', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5 }]} >
          <MaterialCommunityIcons name="trash-can-outline" color={"red"} size={70} />

        </TouchableOpacity>

        <TouchableOpacity onPress={onUpdate} style={[, { display: 'flex', height: 72, width: 190, alignItems: 'center', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5 }]} >
          <MaterialCommunityIcons name="check" color={"white"} size={70} />

        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function WeightProgressScreen({ navigation, route }) {

  const diaryyy = useContext(ctx.Diary);
  const diaryKeyDate = new Date(parseInt(diaryyy.diaryKey));
  let dates=[]
  let values
  let keys = []


  const[responses,setResponses]=useState()

  let yesterday = new Date(today)
  let yesterday1=yesterday.setDate(yesterday.getDate()-1)
  let yesterday2=yesterday.setDate(yesterday.getDate()-2)
  let yesterday3=yesterday.setDate(yesterday.getDate()-3)
  let yesterday4=yesterday.setDate(yesterday.getDate()-4)
  let yesterday5=yesterday.setDate(yesterday.getDate()-5)


  const getMultiple = async () => {

    try {
      const values = await AsyncStorage.multiGet([yesterday1.toString(),yesterday2.toString(),yesterday3.toString(),yesterday4.toString(),yesterday5.toString()])
      const test= JSON.stringify(values)
      setResponses(test)
    } catch(e) {
      // read error
    }
    // example console.log output:
    // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
  }
  useEffect(
    () => {
      getMultiple()
    },[responses]
  )
console.log(responses)
let str = responses;
let indices = [];
for(let i=1; i<str.length;i++) {
    if (str[i-1]=='"' && str[i] == 'w') indices.push(i-1);
}
let resu=[]
for(let i=0;i<indices.length;i++){
  for(let j=indices[i];j<=indices[i]+13;j++){
  resu[i]+=str[j]
  }
}

console.log(resu,'ggggggg')
console.log(indices,'34253')

console.log(responses.match("weight"))
 let datum= yesterday.getDate()+'. '+((yesterday.getMonth())+1)
 dates.unshift(datum)


  const data = {
    labels: dates,
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43,7,9,8],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  };
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false // optional
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fdca40" />
      <LineChart
  data={data}
  width={400}
  height={700}
  chartConfig={chartConfig}
/>
    </SafeAreaView>
  );
}

function UpdateFoodScreen({ navigation, route }) {

  const [selectedweight, setSelectedweight] = useState(1);
  const [haha, setText] = useState(route.params.finalweight);
  let finalweight = selectedweight * haha
  const diaryCtx = useContext(ctx.Diary);
  const food = route.params
  const name = food.name
  const quantita = food.finalweight
  const energy = food.energy
  const energykj =  food.energykj
  const protein = food.protein
  const catbohydrates = food.catbohydrates
  const fat = food.fat
  const fiber = food.fiber
  const energyx=((energy/100)*finalweight).toFixed()
  const energykjx=((energykj/100)*finalweight).toFixed()
  const proteinx=((protein/100)*finalweight).toFixed()
  const catbohydratesx=((catbohydrates/100)*finalweight).toFixed()
  const fatx=((fat/100)*finalweight).toFixed()
  const fiberx=((fiber/100)*finalweight).toFixed()

  const onUpdate = () => {
    diaryCtx.updateFood(name,finalweight);
    navigation.navigate('Overview');
  };

  const onRemove = () => {
    diaryCtx.removeFood(name);
    navigation.navigate('Overview');
  };


  const data = [
    {
      name: "Protein",
      population: protein,
      color: "red",
      legendFontColor: "#000000",
      legendFontSize: 15
    },
    {
      name: "Fat",
      population: fat,
      color: "yellow",
      legendFontColor: "#000000",
      legendFontSize: 15
    },
    {
      name: "Carbohydrates",
      population: catbohydrates,
      color: "blue",
      legendFontColor: "#000000",
      legendFontSize: 15
    },
    {
      name: "Fiber",
      population: fiber,
      color: "green",
      legendFontColor: "#000000",
      legendFontSize: 15
    },

  ];
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false // optional
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fdca40" />
      <View style={[, { display: 'flex', alignItems: 'center', width:400, borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
        <Text style={[, { fontSize: 35, color:'white'  }]}>{name}</Text>
      </View>
      <ScrollView>
      <View style={[, { display: 'flex', borderRadius: 10,width:400, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
        <Text style={[, { color: 'white', margin: 10, fontSize: 16 }]}>Quantity</Text>
        <View style={[, { margin: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }]}>
          <TextInput placeholderTextColor={'black'} keyboardType='numeric' textAlign={'center'} autoFocus={true} style={[, { backgroundColor: '#6dbc4e', borderBottomWidth: 1, color: 'white', height: 40, width: 70 }]} onChangeText={text => setText(text)}>{quantita}</TextInput>
          <Text style={[, { fontSize: 15 }]}>X</Text>
          <Picker style={[, { backgroundColor: '#6dbc4e', height: 40, width: 230 }]}
            selectedValue={selectedweight}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedweight(itemValue)
            }>
            <Picker.Item label="100 g" value={100} />
            <Picker.Item label="1 g" value={1} />
            <Picker.Item label={'porcia (g)'} value={7} />

          </Picker>
        </View>
      </View>
      <View style={[, { display: 'flex', justifyContent: 'space-around', width:400,flexDirection: 'row', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
        <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={[, { color: 'white', fontSize: 16, margin: 10,color:'black' }]}>Energy</Text>
          <Text style={[, { color: 'white', fontSize: 25,marginBottom:7}]}>{energyx} kcal</Text>


        </View>
        <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={[, { color: 'white', fontSize: 16, margin: 10 , color:'black' }]}>Energy</Text>
          <Text style={[, { color: 'white', fontSize: 25,marginBottom:7}]}>{energykjx} kJ</Text>

        </View>

      </View>
      <View style={[, { display: 'flex', justifyContent: 'space-around', width:400,flexDirection: 'row', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
        <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>

          <Text style={[, { color: 'white', fontSize: 16, margin: 10 , color:'black' }]}>Proteins</Text>
          <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{proteinx} g</Text>
          <Text style={[, { color: 'white', fontSize: 16, margin: 10, color:'black'  }]}>Fiber</Text>
          <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{fiberx} g</Text>

        </View>
        <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>

          <Text style={[, { color: 'white', fontSize: 16, margin: 10 , color:'black' }]}>Fats</Text>
          <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{fatx} g</Text>
          <Text style={[, { color: 'white', fontSize: 16, margin: 10, color:'black'  }]}>Carbohydrates</Text>
          <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{catbohydratesx} g</Text>
        </View>

      </View>
      <View style={[, { display: 'flex', borderRadius: 10,width:400, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>

      <Piechart2
  data={data}
  width={400}
  height={200}
  chartConfig={chartConfig}
  accessor={"population"}
  backgroundColor={"transparent"}
  paddingLeft={"-13"}
  center={[15,0]}
/>
</View>
</ScrollView>
      <View style={[, { display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }]}>
        <TouchableOpacity onPress={onRemove} style={[, { display: 'flex', height: 72, width: 190, alignItems: 'center', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5 }]} >
          <MaterialCommunityIcons name="trash-can-outline" color={"red"} size={70} />

        </TouchableOpacity>

        <TouchableOpacity onPress={onUpdate} style={[, { display: 'flex', height: 72, width: 190, alignItems: 'center', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5 }]} >
          <MaterialCommunityIcons name="check" color={"white"} size={70} />

        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function OverviewTabScreen({ navigation }) {



  const diaryyy = useContext(ctx.Diary);
  const diaryKeyDate = new Date(parseInt(diaryyy.diaryKey));
  const [date, setDate] = useState(diaryKeyDate);
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { t, i18n } = useTranslation();


  const goalEnergy = diaryyy.goalEnergy

  let goalProtein = 105
  let goalFat = 47.5
  let goalFiber = 27.5
  let goalCatrbohydrates = 205
  if(diaryyy.isCheckbox!=true){
  if(goalEnergy==2000){
     goalProtein = 105
   goalFat = 129
   goalFiber = 30
   goalCatrbohydrates = 436
  }
  if(goalEnergy==1500){
    goalProtein = 225
  goalFat = 90
  goalFiber = 25
  goalCatrbohydrates = 250
 }
 if(goalEnergy==2500){
  goalProtein = 150
goalFat = 123
goalFiber = 25
goalCatrbohydrates = 500
}}
else{
  goalProtein = diaryyy.goalProtein
   goalFat = diaryyy.goalFat
   goalFiber = diaryyy.goalFiber
   goalCatrbohydrates = diaryyy.goalCarbohydrates
}


let totalEnergy=0
let totalProtein=0
let totalFiber=0
let totalFat=0
let totalCarbohydrates=0
let totalActivity=0
let weightjson=0
for(let i=0;i<diaryyy.entries.length;i++){
  if(diaryyy.entries[i].energy!=undefined){
totalProtein=totalProtein+parseInt((diaryyy.entries[i].protein/100)*diaryyy.entries[i].finalweight)
totalFiber=totalFiber+parseInt((diaryyy.entries[i].fiber/100)*diaryyy.entries[i].finalweight)
totalFat=totalFat+parseInt((diaryyy.entries[i].fat/100)*diaryyy.entries[i].finalweight)
totalCarbohydrates=totalCarbohydrates+parseInt((diaryyy.entries[i].catbohydrates/100)*diaryyy.entries[i].finalweight)
totalEnergy=totalEnergy+parseInt((diaryyy.entries[i].energy/100)*diaryyy.entries[i].finalweight)}
else{
  if(diaryyy.entries[i].weight==undefined)
  totalActivity=totalActivity+parseInt(diaryyy.entries[i].energyofactivity)
  else
  weightjson=parseInt(diaryyy.entries[i].weight)
    }
}
const [weight,setWeight]=useState()


  const totalEnergyPercent = (100*((totalEnergy-totalActivity)/goalEnergy)).toFixed()
  const totalProteinPercent = (100*(totalProtein/goalProtein)).toFixed()
  const totalFatPercent = (100*(totalFat/goalFat)).toFixed()
  const totalFiberPercent = (100*(totalFiber/goalFiber)).toFixed()
  const totalCarbohydratesPercent = (100*(totalCarbohydrates/goalCatrbohydrates)).toFixed()



  let colorEnergy='orange'
  let colorTextEnergy='orange'

  let colorProtein ='orange'
  let colorCarbohydrates='orange'
  let colorFat='orange'
  let colorFiber = 'orange'
  let colorEnergyZvysok='lightgray'
  let colorProteinZvysok ='lightgray'
  let colorCarbohydratesZvysok='lightgray'
  let colorFatZvysok='lightgray'
  let colorFiberZvysok = 'lightgray'
  if(totalEnergyPercent>80){
  colorEnergy='green'
  colorTextEnergy='green'
    if(totalEnergyPercent>100){
    colorEnergyZvysok='green'
    colorTextEnergy='green'
      if(totalEnergyPercent>120){
        colorTextEnergy='red'
        colorEnergyZvysok='red'
        colorEnergy='red'
    }
  }
}
if(totalProteinPercent>80){
  colorProtein='green'

    if(totalProteinPercent>100){
    colorProteinZvysok='green'
      if(totalProteinPercent>120){
        colorProteinZvysok='red'
        colorProtein='red'
    }
  }
}
if(totalFiberPercent>80){
  colorFiber='green'
    if(totalFiberPercent>100){
    colorFiberZvysok='green'
      if(totalFiberPercent>120){
        colorFiberZvysok='red'
        colorFiber='red'
    }
  }
}
if(totalCarbohydratesPercent>80){
  colorCarbohydrates='green'
    if(totalCarbohydratesPercent>100){
    colorCarbohydratesZvysok='green'
      if(totalCarbohydratesPercent>120){
        colorCarbohydratesZvysok='red'
        colorCarbohydrates='red'
    }
  }
}
if(totalFatPercent>80){
  colorFat='green'
    if(totalFatPercent>100){
    colorFatZvysok='green'
      if(totalFatPercent>120){
        colorFatZvysok='red'
        colorFat='red'
    }
  }
}

  const onPress = () => {
    setShow(true);

  };
  const EnergyData = [
    {value: totalEnergy, color: colorEnergy},
    {value: goalEnergy-totalEnergy, color: colorEnergyZvysok
}
];
const ProteinData = [
  {value: totalProtein, color: colorProtein},
  {value: goalProtein-totalProtein, color: colorProteinZvysok}
];
const FatData = [
  {value: totalFat, color: colorFat},
  {value: goalFat-totalFat, color: colorFatZvysok}
];
const CarbohydratesData = [
  {value: totalCarbohydrates, color: colorCarbohydrates},
  {value: goalCatrbohydrates-totalCarbohydrates, color: colorCarbohydratesZvysok}
];
const FiberData = [
  {value: totalFiber, color: colorFiber},
  {value: goalFiber-totalFiber, color: colorFiberZvysok}
];
  const onChange = (event, selectedDate) => {
    console.log(parseInt(undefined))

    setShow(false);
    const currentDate = selectedDate || date;
    if(selectedDate!=undefined){

    setDate(currentDate);
    const diaryKeyDate = new Date(
      currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()
    );
    setDate(diaryKeyDate);
    diaryyy.setDiaryKey(currentDate.getTime().toString());
    }
  };
  const onPress1 = () => {
    diaryyy.weight(weight),
    setModalVisible(!modalVisible)
  };
  let day =''
  switch (diaryKeyDate.getDay()) {
    case 0:
      day = t("Sunday");
      break;
    case 1:
      day = t("Monday");
      break;
    case 2:
       day = t("Tuesday");
      break;
    case 3:
      day = t("Wednesday");
      break;
    case 4:
      day = t("Thursday");
      break;
    case 5:
      day = t("Friday");
      break;
    case 6:
      day = t("Saturday");
  }
  return (
    <View style={styles.container}>
      {show && (
        <DateTimePicker
          mode={'date'}
          value={diaryKeyDate}
          maximumDate={today}
          display="default"
          onChange={onChange} />)}
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{color:'lightgrey',fontSize:30}}>{t("Weight")}</Text>
            <TextInput onChangeText={text => setWeight(text)} autoFocus={true}  placeholderTextColor={'lightgrey'} placeholder={'Weight (Kg)'} style={{paddingLeft:20, width: 200,borderRadius:10,marginTop:10, marginBottom: 15, color: 'black', fontSize: 16, backgroundColor: 'white', borderTopWidth: 0.5, borderBottomWidth: 0.2 }}/>
            <View style={{display:'flex',flexDirection:'row'}}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={[, { display: 'flex', height: 75, width: 100, alignItems: 'center', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5 }]} >
          <MaterialCommunityIcons name="cancel" color={"red"} size={70} />

        </TouchableOpacity>

        <TouchableOpacity onPress={onPress1} style={[, { display: 'flex', height: 75, width: 100, alignItems: 'center', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5 }]} >
          <MaterialCommunityIcons name="check" color={"white"} size={70} />

        </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
       <View style={styles.bar}>
      <TouchableOpacity style={[styles.btn,{flex: 1,flexDirection:'row',justifyContent:'center',alignItems:'center'}]} onPress={onPress}>

      <MaterialCommunityIcons name="calendar" color={"white"} size={30} />
        <Text style={[styles.text, { marginLeft:7 }]}>
 {day}, {diaryKeyDate.toString().substr(8, 2)}. {(diaryKeyDate.getMonth())+1}.</Text>
        </TouchableOpacity>
      </View>
      <View style={{display: 'flex',marginTop:0,height:90,width:420,justifyContent:'space-evenly',flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Foods')}>
        <View style={{backgroundColor:'black',borderColor:'white',borderWidth:0.5 ,height:90,width:190,margin:5,borderRadius:20, padding:10,display:'flex',justifyContent:'space-between'}}>
       <Text style={{color:'grey',paddingLeft:5,fontSize:15}}>{t('Calories')}</Text>
       <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><Text style={{paddingLeft:5,fontSize:29,  color:'white'}}>{totalEnergy} kcal</Text><MaterialCommunityIcons style={{}} name="plus-circle" color={"green"} size={20} />
</View>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
        <View style={{backgroundColor:'black',borderColor:'white',borderWidth:0.5, height:90,width:190,margin:5,borderRadius:20, padding:10,display:'flex',justifyContent:'space-between'}}>
       <Text style={{color:'grey',paddingLeft:5,fontSize:15}}>{t("You need")}</Text>
       <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><Text style={{paddingLeft:5,fontSize:29,  color:colorTextEnergy}}>{goalEnergy-totalEnergy} kcal</Text><MaterialCommunityIcons style={{}} name="plus-circle" color={"green"} size={20} />
</View>
        </View>
        </TouchableOpacity>
      </View>
      <View style={{display: 'flex',marginTop:15,height:90,width:420,justifyContent:'space-evenly',flexDirection:'row'}}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={{backgroundColor:'black',borderColor:'white',borderWidth:0.5, height:90,width:190,margin:5,borderRadius:20, padding:10,display:'flex',justifyContent:'space-between'}}>
       <Text style={{color:'grey',paddingLeft:5,fontSize:15}}>{t("Weight")}</Text>
       <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><Text style={{paddingLeft:5,fontSize:29,  color:'white'}}>{weightjson} kg</Text><MaterialCommunityIcons style={{}} name="plus-circle" color={"green"} size={20} />
</View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate(t('Add Activity'))}>
        <View style={{backgroundColor:'black',borderColor:'white',borderWidth:0.5, height:90,width:190,margin:5,borderRadius:20, padding:10,display:'flex',justifyContent:'space-between'}}>
       <Text style={{color:'grey',paddingLeft:5,fontSize:15}}>{t("Activity")}</Text>
       <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><Text style={{paddingLeft:5,fontSize:29,  color:'white'}}>-{totalActivity} kcal</Text><MaterialCommunityIcons style={{}} name="plus-circle" color={"green"} size={20} />
</View>
        </View>
        </TouchableOpacity>
      </View>
      <View style={{display:'flex', flexDirection:'row', justifyContent:'center',width:420,height:200,marginTop:15}}>
       <View style={{display:'flex',justifyContent:'flex-start',marginLeft:0,marginRight:0}}>
       <PieChart1
       style={{}}
       backgroundColor={'black'}

                donut
                radius={70}
                innerRadius={50}
                data={EnergyData}
                centerLabelComponent={() => {
                return <Text style={{fontSize: 25, color:'black'}}>{totalEnergyPercent} %</Text>;
                }}
            />
             </View>
            <View style={{display:'flex',justifyContent:'center', alignItems:'center',width:200}}>
            <Text style={{color:'lightgray',fontSize:18}}>{t("Total")}</Text>
              <Text style={{color:'white',fontSize:30}}>{totalEnergy-totalActivity} kcal</Text>
              <Text style={{color:'lightgray',fontSize:15}}>{t("of")} {goalEnergy} kcal</Text>

            </View>

    </View>
    <View style={{display:'flex', flexDirection:'row', marginTop:-25,}}>
      <View style={{marginLeft:-20}}>
       <PieChart1
       style={{}}
                donut
                radius={35}
                innerRadius={20}
                data={ProteinData}
                centerLabelComponent={() => {
                return <Text style={{fontSize: 10, color:'black'}}>{totalProteinPercent} %</Text>;
                }}
            />
            </View>
             <View style={{display:'flex',justifyContent:'center', alignItems:'flex-start',marginLeft:-15, width:80}}>
            <Text style={{color:'lightgray',fontSize:10}}>{t("Protein")}</Text>
              <Text style={{color:'white',fontSize:18}}>{totalProtein} g</Text>
              <Text style={{color:'lightgray',fontSize:13}}>{t("of")} {goalProtein} g</Text>

            </View>
            <PieChart1
       style={{}}
                donut
                radius={35}
                innerRadius={20}
                data={FatData}
                centerLabelComponent={() => {
                return <Text style={{fontSize: 10, color:'black'}}>{totalFatPercent} %</Text>;
                }}
            />
             <View style={{display:'flex',justifyContent:'center', alignItems:'flex-start',marginLeft:-15,width:80,}}>
            <Text style={{color:'lightgray',fontSize:10}}>{t("Fat")}</Text>
              <Text style={{color:'white',fontSize:18}}>{totalFat} g</Text>
              <Text style={{color:'lightgray',fontSize:13}}>{t("of")} {goalFat} g</Text>

            </View>
    </View>
    <View style={{display:'flex', flexDirection:'row', marginTop:-25}}>
      <View style={{marginLeft:-20}}>
       <PieChart1
       style={{}}
                donut
                radius={35}
                innerRadius={20}
                data={CarbohydratesData}
                centerLabelComponent={() => {
                return <Text style={{fontSize: 10, color:'black'}}>{totalCarbohydratesPercent} %</Text>;
                }}
            />
            </View>
             <View style={{display:'flex',justifyContent:'center', alignItems:'flex-start',marginLeft:-15,width:80,}}>
            <Text style={{color:'lightgray',fontSize:10}}>{t("Carbohydrates")}</Text>
              <Text style={{color:'white',fontSize:18}}>{totalCarbohydrates} g</Text>
              <Text style={{color:'lightgray',fontSize:13}}>{t("of")} {goalCatrbohydrates} g</Text>

            </View>
            <PieChart1
       style={{}}
                donut
                radius={35}
                innerRadius={20}
                data={FiberData}
                centerLabelComponent={() => {
                return <Text style={{fontSize: 10, color:'black'}}>{totalFiberPercent} %</Text>;
                }}
            />
             <View style={{display:'flex',justifyContent:'center', alignItems:'flex-start',marginLeft:-15,width:80,}}>
            <Text style={{color:'lightgray',fontSize:10}}>{t("Fiber")}</Text>
              <Text style={{color:'white',fontSize:18}}>{totalFiber} g</Text>
              <Text style={{color:'lightgray',fontSize:13}}>{t("of")} {goalFiber} g</Text>

            </View>
    </View>
    </View>

  );
}


const Tab = createBottomTabNavigator()
function MyTabs() {
  const { t, i18n } = useTranslation();

  return (
    <Tab.Navigator screenOptions={options = {tabBarItemStyle:{backgroundColor:'gray'}, tabBarActiveBackgroundColor:'#fdca40',tabBarLabelStyle: {color:'white',  fontSize: 13 }, tabBarStyle: { height: 60 }, tabBarShowLabel: true, tabBarLabelPosition: "below-icon" }}>
      <Tab.Screen options={{
        headerShown: false,
        tabBarIcon: () => (
          <MaterialCommunityIcons name="fire" color={"#fdca40"} size={37} />
        ),
      }} name={t("Overview")} component={OverviewTabScreen} />
      <Tab.Screen options={{
        headerShown: false, tabBarIcon: () => (
          <MaterialCommunityIcons name="food" color={"#fdca40"} size={37} />
        ),
      }} name={t("Foods")} component={MenuTabScreen} />
    </Tab.Navigator>
  );
}

function SettingsScreen({navigation}){
  const [name,setName]=useState('')
  const [calorie,setCalorie]=useState('')
  const diaryyy = useContext(ctx.Diary);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [isSelected, setSelection] = useState(false);

  const [selectedGoal, setSelectedGoal] = useState();
  const [selectedProtein, setSelectedProtein] = useState();
  const [selectedFiber, setSelectedFiber] = useState();
  const [selectedFat, setSelectedFat] = useState();
  const [selectedCarbohydrates, setSelectedCarbohydrates] = useState();

  let goalProtein = 105
  let goalFat = 47.5
  let goalFiber = 27.5
  let goalCatrbohydrates = 205
  if(isSelected!=true){
  if(diaryyy.goalEnergy==2000){
     goalProtein = 105
   goalFat = 129
   goalFiber = 30
   goalCatrbohydrates = 436
  }
  if(diaryyy.goalEnergy==1500){
    goalProtein = 225
  goalFat = 90
  goalFiber = 25
  goalCatrbohydrates = 250
 }
 if(diaryyy.goalEnergy==2500){
  goalProtein = 150
goalFat = 123
goalFiber = 25
goalCatrbohydrates = 500
}}
else{
  goalProtein = diaryyy.goalProtein
  goalFat = diaryyy.goalFat
  goalFiber = diaryyy.goalFiber
  goalCatrbohydrates = diaryyy.goalCarbohydrates
}



    const handleTextName = e => {
      let name = e.nativeEvent.text.toString()
      setName(name)
    }
    const handleTextCalorie = e => {
      let calorie = e.nativeEvent.text.toString()
      setCalorie(calorie)
    }
    function onAdd(){
      diaryyy.addActivity(name,calorie);
      navigation.navigate('Overview');
    }
    const onPress1 = () => {
      diaryyy.setGoalEnergy(selectedGoal)
      setModalVisible(!modalVisible)
    };
    const onPress2 = () => {
      diaryyy.setIsChceckbox(isSelected)
      if(isSelected==true){
      diaryyy.setGoalProtein(selectedProtein)
      diaryyy.setGoalFat(selectedFat)
      diaryyy.setGoalFiber(selectedFiber)
      diaryyy.setGoalCarbohydrates(selectedCarbohydrates)
      }
      setModal2Visible(!modal2Visible)
    };
    const onPress3 = () => {
    setModalVisible(!modalVisible)
    diaryyy.setIsChceckbox(isSelected)
    }
    return(
      <View style={styles.container}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView2}>
            <Text style={{color:'lightgrey',fontSize:30, marginBottom:20}}>Goal</Text>
            <Picker style={[, {textAlign:'center', backgroundColor: 'black', height: 20, width: 250, marginBottom:20 }]}
          selectedValue={selectedGoal}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedGoal(itemValue)
          }>
          <Picker.Item label="Gain muscle" value={2500} />
          <Picker.Item label="Be fit" value={2000} />
          <Picker.Item label='Lose weight' value={1500} />

        </Picker>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center', marginBottom:20}}>
          <Text style={{color:'white',fontSize:15,marginRight:20,marginBottom:10}}>Energy</Text>
            <TextInput onChangeText={text => setSelectedGoal(text)}  placeholderTextColor={'lightgrey'} placeholder={'Energy (Kcal)'} style={{paddingLeft:20, width: 200,borderRadius:10,marginTop:10, marginBottom: 15, color: 'black', fontSize: 16, backgroundColor: 'white', borderTopWidth: 0.5, borderBottomWidth: 0.2 }}>{selectedGoal}</TextInput>
            </View>
            <View style={{display:'flex',flexDirection:'row'}}>
            <TouchableOpacity onPress={onPress3} style={[, { display: 'flex', height: 75, width: 150, alignItems: 'center', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5 }]} >
          <MaterialCommunityIcons name="cancel" color={"red"} size={70} />

        </TouchableOpacity>

        <TouchableOpacity onPress={onPress1} style={[, { display: 'flex', height: 75, width: 150, alignItems: 'center', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5 }]} >
          <MaterialCommunityIcons name="check" color={"white"} size={70} />

        </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal2Visible}
        onRequestClose={() => {
          setModalVisible(!modal2Visible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView3}>
            <Text style={{color:'lightgrey',fontSize:30, marginBottom:20,textAlign:'center'}}>Nutriments</Text>

        <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'center', marginBottom:20}}>
          <View style={{display:'flex',width:130}}>
          <Text style={{color:'white',fontSize:15,marginRight:20,marginBottom:10}}>Protein</Text>
            </View>
            <TextInput editable={isSelected} onChangeText={text => setSelectedProtein(text)}  placeholderTextColor={'lightgrey'} placeholder={'Protein (g)'} style={{paddingLeft:20, width: 200,borderRadius:10,marginTop:10, marginBottom: 15, color: 'black', fontSize: 16, backgroundColor: 'white', borderTopWidth: 0.5, borderBottomWidth: 0.2 }}>{goalProtein}</TextInput>
            </View>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'center', marginBottom:20}}>
            <View style={{display:'flex',width:130}}>
          <Text style={{color:'white',fontSize:15,marginRight:20,marginBottom:10}}>Fat</Text>
          </View>
            <TextInput editable={isSelected} onChangeText={text => setSelectedFat(text)}  placeholderTextColor={'lightgrey'} placeholder={'Fat (g)'} style={{paddingLeft:20, width: 200,borderRadius:10,marginTop:10, marginBottom: 15, color: 'black', fontSize: 16, backgroundColor: 'white', borderTopWidth: 0.5, borderBottomWidth: 0.2 }}>{goalFat}</TextInput>
            </View>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'center', marginBottom:20}}>
            <View style={{display:'flex',width:130}}>
          <Text style={{color:'white',fontSize:15,marginRight:20,marginBottom:10}}>Carbohydrates</Text>
          </View>
            <TextInput editable={isSelected} onChangeText={text => setSelectedCarbohydrates(text)}  placeholderTextColor={'lightgrey'} placeholder={'Carbohydrates (g)'} style={{paddingLeft:20, width: 200,borderRadius:10,marginTop:10, marginBottom: 15, color: 'black', fontSize: 16, backgroundColor: 'white', borderTopWidth: 0.5, borderBottomWidth: 0.2 }}>{goalCatrbohydrates}</TextInput>
            </View>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'center', marginBottom:20}}>
            <View style={{display:'flex',width:130}}>
          <Text style={{color:'white',fontSize:15,marginRight:20,marginBottom:10}}>Fiber</Text>
          </View>
            <TextInput editable={isSelected} onChangeText={text => setSelectedFiber(text)}  placeholderTextColor={'lightgrey'} placeholder={'Fiber (g)'} style={{paddingLeft:20, width: 200,borderRadius:10,marginTop:10, marginBottom: 15, color: 'black', fontSize: 16, backgroundColor: 'white', borderTopWidth: 0.5, borderBottomWidth: 0.2 }}>{goalFiber}</TextInput>
            </View>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
            <TouchableOpacity onPress={() => setModal2Visible(!modal2Visible)} style={[, { display: 'flex', height: 75, width: 150, alignItems: 'center', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5 }]} >
          <MaterialCommunityIcons name="cancel" color={"red"} size={70} />

        </TouchableOpacity>

        <TouchableOpacity onPress={onPress2} style={[, { display: 'flex', height: 75, width: 150, alignItems: 'center', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5 }]} >
          <MaterialCommunityIcons name="check" color={"white"} size={70} />

        </TouchableOpacity>
            </View>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

            <CheckBox

          value={isSelected}
          onValueChange={setSelection}
        />
          <Text>
                Set own nutriments
              </Text>
            </View>
          </View>
        </View>
      </Modal>
          <TouchableOpacity  onPress={() => setModalVisible(true)} style={{display:'flex',paddingLeft:20,justifyContent:'center',backgroundColor:'black',width:420,height:60,borderBottomWidth:0.5,borderColor:'white' }}  >
      <Text style={{fontSize:20, color:'lightgrey'}}>Goals</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setModal2Visible(true)} style={{display:'flex',marginTop:1,paddingLeft:20,justifyContent:'center',backgroundColor:'black',width:420,height:60,borderBottomWidth:0.5,borderColor:'white' }}  >
      <Text style={{fontSize:20, color:'lightgrey'}}>Nutriments</Text>
    </TouchableOpacity>
      </View>
    )
  }

function AddActivity({navigation}){
const [name,setName]=useState('')
const [calorie,setCalorie]=useState('')
const diaryyy = useContext(ctx.Diary);
const { t, i18n } = useTranslation();


  const handleTextName = e => {
    let name = e.nativeEvent.text.toString()
    setName(name)
  }
  const handleTextCalorie = e => {
    let calorie = e.nativeEvent.text.toString()
    setCalorie(calorie)
  }
  function onAdd(){
    diaryyy.addActivity(name,calorie);
    navigation.navigate(t('Overview'));
  }
  return(
    <View style={styles.container}>
      <View style={{display:'flex',width:400, marginTop:20,}}>
        <Text style={{color:'lightgrey',fontSize:20}}>{t("Name of activity:")}</Text>
        <TextInput autoFocus={true} onChange={handleTextName} placeholderTextColor={'lightgrey'} placeholder={t('Activity')} style={{paddingLeft:20, width: 400,borderRadius:10,marginTop:10, marginBottom: 15, color: 'black', fontSize: 16, backgroundColor: 'white', borderTopWidth: 0.5, borderBottomWidth: 0.2 }}/>
      </View>
      <View style={{display:'flex',width:400, marginTop:20,}}>
        <Text style={{color:'lightgrey',fontSize:20}}>{t("Calorie (Energy in kcal):")}</Text>
        <TextInput  onChange={handleTextCalorie} keyboardType='numeric'  placeholderTextColor={'lightgrey'} placeholder={t('Calories')} style={{paddingLeft:20, width: 400,borderRadius:10,marginTop:10, marginBottom: 15, color: 'black', fontSize: 16, backgroundColor: 'white', borderTopWidth: 0.5, borderBottomWidth: 0.2 }}/>
      </View>
      <View style={[, { display: 'flex', flexDirection: 'row', justifyContent: 'space-around',marginTop:20 }]}>
        <TouchableOpacity onPress={() => navigation.navigate(t('Overview'))} style={[, { display: 'flex', height: 72, width: 190, alignItems: 'center', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5 }]} >
          <MaterialCommunityIcons name="cancel" color={"red"} size={70} />

        </TouchableOpacity>

        <TouchableOpacity onPress={onAdd} style={[, { display: 'flex', height: 72, width: 190, alignItems: 'center', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5 }]} >
          <MaterialCommunityIcons name="check" color={"white"} size={70} />

        </TouchableOpacity>
      </View>
    </View>
  )
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
    setIsActive(false)
    navigation.navigate('Search', {
      barcode: e.data
    })

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
  const [goalEnergy, setGoalEnergy] = useState(2500);
  const [goalFiber, setGoalFiber] = useState();
  const [goalFat, setGoalFat] = useState();
  const [goalCarbohydrates, setGoalCarbohydrates] = useState();
  const [goalProtein, setGoalProtein] = useState();
  const [isCheckbox, setIsChceckbox] = useState();
  const { t, i18n } = useTranslation();




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
    isCheckbox,
    setIsChceckbox,
    goalFiber,
    setGoalFiber,
    goalFat,
    setGoalFat,
    goalCarbohydrates,
    setGoalCarbohydrates,
    goalProtein,
    setGoalProtein,
    diaryKey,
    entries,
    goalEnergy,
    setDiaryKey,
    setGoalEnergy,
    addFood(name,energy,energykj, protein,catbohydrates,fat, fiber,finalweight) {
      const newDiary = entries.concat({name,energy,energykj, protein,catbohydrates,fat, fiber, finalweight});
      writeDiary(newDiary);
      setEntries(newDiary);
    },
    addActivity(nameofactivity,energyofactivity) {
      const newDiary = entries.concat({nameofactivity,energyofactivity});
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
    updateActivity(nameofactivity, energyofactivity) {
      const target = entries.find(entry => {
        return (nameofactivity === entry.nameofactivity);
      });
      target.energyofactivity = energyofactivity;

      const newEntries = entries.filter(entry => {
        return (nameofactivity !== entry.nameofactivity);
      });
      newEntries.unshift(target);
      writeDiary(newEntries);
      setEntries(newEntries);
    },
    removeFood(name) {
      const newEntries = entries.filter(entry => {
        return (name !== entry.name);
      });
      writeDiary(newEntries);
      setEntries(newEntries);
    },
    removeActivity(nameofactivity) {
      const newEntries = entries.filter(entry => {
        return (nameofactivity !== entry.nameofactivity);
      });
      writeDiary(newEntries);
      setEntries(newEntries);
    },
    weight(weight) {
      let target = entries.find(entry => {
        return (entry.weight);
      });
      if(target==undefined){
        const newDiary = entries.concat({weight});
      writeDiary(newDiary);
      setEntries(newDiary);
      }
      else{
      target.weight = weight;

      const newEntries = entries.filter(entry => {
        return (weight !== entry.weight);
      });
      newEntries.unshift(target);
      writeDiary(newEntries);
      setEntries(newEntries);
    }
    },
  };
  return (
    <ctx.Diary.Provider value={diaryCtx}>
      <SafeAreaProvider>

        <NavigationContainer>
          <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>

            <Drawer.Screen name={t('Calorie Counter')} component={HomeScreen} options={{ headerStyle: { backgroundColor: '#fdca40', }, headerTintColor: 'black', }} />
            <Drawer.Screen name="Notifications" component={NotificationsScreen} />
            <Drawer.Screen options={{ headerStyle: { backgroundColor: '#fdca40', }, headerTintColor: 'black', }} name="Search" component={SearchScreen} />
            <Drawer.Screen name={t("Details food")} component={DetailsScreen} options={{ headerStyle: { backgroundColor: '#fdca40', }, headerTintColor: 'black', }} />
            <Drawer.Screen name={t("Details food ")} component={DetailsScreenBar} options={{ headerStyle: { backgroundColor: '#fdca40', }, headerTintColor: 'black', }} />

            <Drawer.Screen name={t("Update food")} component={UpdateFoodScreen} options={{ headerStyle: { backgroundColor: '#fdca40', }, headerTintColor: 'black', }} />
            <Drawer.Screen name={t("Update activity")} component={UpdateActivityScreen} options={{ headerStyle: { backgroundColor: '#fdca40', }, headerTintColor: 'black', }} />
            <Drawer.Screen name={t("Weight Progress")} component={WeightProgressScreen} options={{ headerStyle: { backgroundColor: '#fdca40', }, headerTintColor: 'black', }} />
            <Drawer.Screen name={t("Preferences")} component={SettingsScreen} options={{ headerStyle: { backgroundColor: '#fdca40', }, headerTintColor: 'black', }} />

            <Stack.Screen name={t("Barcode Scanner")} component={Barcode} options={{ headerStyle: { backgroundColor: '#fdca40', }, headerTintColor: 'black', }} />
            <Stack.Screen name={t("Add Activity")} component={AddActivity} options={{ headerStyle: { backgroundColor: '#fdca40', }, headerTintColor: 'black', }} />





          </Drawer.Navigator>

        </NavigationContainer>
      </SafeAreaProvider>
    </ctx.Diary.Provider>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#141517', },
  container2: {
    flex: 1,
    backgroundColor: 'grey',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  bar: {
    marginTop:5,
    backgroundColor:'#141517',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width:300,
    height:300,
    margin: 20,
    backgroundColor: "#141517",
    borderRadius: 10,
    borderColor:'white',
    borderWidth:0.5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalView2: {
    width:350,
    height:400,
    margin: 20,
    backgroundColor: "#141517",
    borderRadius: 10,
    borderColor:'white',
    borderWidth:0.5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalView3: {
    width:400,
    height:650,
    margin: 20,
    backgroundColor: "#141517",
    borderRadius: 10,
    borderColor:'white',
    borderWidth:0.5,
    padding: 35,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});