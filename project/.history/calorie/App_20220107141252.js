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

import * as ctx from './contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

import { PieChart } from "react-native-gifted-charts";
import BarcodeScanner from 'react-native-scan-barcode';
import { ScrollView } from 'react-native-gesture-handler';
import { yellow100 } from 'react-native-paper/lib/typescript/styles/colors';




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
      name: "Bielkoviny",
      population: protein,
      color: "red",
      legendFontColor: "black",
      legendFontSize: 15
    },
    {
      name: "Tuky",
      population: fat,
      color: "yellow",
      legendFontColor: "black",
      legendFontSize: 15
    },
    {
      name: "Sacharidy",
      population: catbohydrates,
      color: "blue",
      legendFontColor: "black",
      legendFontSize: 15
    },
    {
      name: "Vl??knina",
      population: fiber,
      color: "green",
      legendFontColor: "black",
      legendFontSize: 15
    }
  ];


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
        <Text style={[, { color: 'white', fontSize: 16, margin: 10,color:'black' }]}>Energia</Text>
        <Text style={[, { color: 'white', fontSize: 25,marginBottom:7}]}>{energyx} kcal</Text>


      </View>
      <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={[, { color: 'white', fontSize: 16, margin: 10 , color:'black' }]}>Energia</Text>
        <Text style={[, { color: 'white', fontSize: 25,marginBottom:7}]}>{energykjx} kJ</Text>

      </View>

    </View>
    <View style={[, { display: 'flex', justifyContent: 'space-around', width:400,flexDirection: 'row', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
      <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>

        <Text style={[, { color: 'white', fontSize: 16, margin: 10 , color:'black' }]}>Bielkoviny</Text>
        <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{proteinx} g</Text>
        <Text style={[, { color: 'white', fontSize: 16, margin: 10, color:'black'  }]}>Vl??knina</Text>
        <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{fiberx} g</Text>

      </View>
      <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>

        <Text style={[, { color: 'white', fontSize: 16, margin: 10 , color:'black' }]}>Tuky</Text>
        <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{fatx} g</Text>
        <Text style={[, { color: 'white', fontSize: 16, margin: 10, color:'black'  }]}>Sacharidy</Text>
        <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{catbohydratesx} g</Text>
      </View>

    </View>
    <View style={[, { display: 'flex', borderRadius: 10,width:400, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>


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
      name: "Bielkoviny",
      population: protein,
      color: "red",
      legendFontColor: "black",
      legendFontSize: 15
    },
    {
      name: "Tuky",
      population: fat,
      color: "yellow",
      legendFontColor: "black",
      legendFontSize: 15
    },
    {
      name: "Sacharidy",
      population: catbohydrates,
      color: "blue",
      legendFontColor: "black",
      legendFontSize: 15
    },
    {
      name: "Vl??knina",
      population: fiber,
      color: "green",
      legendFontColor: "black",
      legendFontSize: 15
    }
  ];


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
          <Text style={[, { color: 'white', fontSize: 16, margin: 10,color:'black' }]}>Energia</Text>
          <Text style={[, { color: 'white', fontSize: 25,marginBottom:7}]}>{energyx} kcal</Text>


        </View>
        <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={[, { color: 'white', fontSize: 16, margin: 10 , color:'black' }]}>Energia</Text>
          <Text style={[, { color: 'white', fontSize: 25,marginBottom:7}]}>{energykjx} kJ</Text>

        </View>

      </View>
      <View style={[, { display: 'flex', justifyContent: 'space-around', width:400,flexDirection: 'row', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
        <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>

          <Text style={[, { color: 'white', fontSize: 16, margin: 10 , color:'black' }]}>Bielkoviny</Text>
          <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{proteinx} g</Text>
          <Text style={[, { color: 'white', fontSize: 16, margin: 10, color:'black'  }]}>Vl??knina</Text>
          <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{fiberx} g</Text>

        </View>
        <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>

          <Text style={[, { color: 'white', fontSize: 16, margin: 10 , color:'black' }]}>Tuky</Text>
          <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{fatx} g</Text>
          <Text style={[, { color: 'white', fontSize: 16, margin: 10, color:'black'  }]}>Sacharidy</Text>
          <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{catbohydratesx} g</Text>
        </View>

      </View>
      <View style={[, { display: 'flex', borderRadius: 10,width:400, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>

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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{display:'flex',flexDirection:'row'}}>
        <Pressable style={[, { marginRight: 10 }]} onPress={() => navigation.navigate('barcode')}>
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
      <TextInput textAlign={'center'} autoFocus={true} onChange={handleText} placeholderTextColor={'white'} placeholder={'Search for food'} style={{ width: 300,borderRadius:20, marginTop:20,marginBottom: 15, color: 'black', fontSize: 16, backgroundColor: 'lightgrey', borderTopWidth: 0.5, borderBottomWidth: 0.2 }}>{route.params != undefined ? route.params.barcode : null}</TextInput>
      <Pressable onPress={onSubmit} style={{ display: 'flex', height: 49, width: 100,marginLeft:10,marginTop:20,borderRadius:20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green' }}><Text style={{color:'white'}}>Submit</Text></Pressable>
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
      day = "Ne";
      break;
    case 1:
      day = "Po";
      break;
    case 2:
       day = "Ut";
      break;
    case 3:
      day = "St";
      break;
    case 4:
      day = "??t";
      break;
    case 5:
      day = "Pia";
      break;
    case 6:
      day = "So";
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
          const onFoodItemPress = e => {
            navigation.navigate('Update food', {
              name: item.name,
              finalweight: item.finalweight,
              energy: item.energy,
              energykj: item.energykj,
              protein : item.protein,
              catbohydrates: item.catbohydrates,
              fat : item.fat,
              fiber : item.fiber
            })
          };
          return <FoodItemOver name={item.name} finalweight={item.finalweight} energy={item.energy} onPress={onFoodItemPress} />;
        }}
      />

    </SafeAreaView>
  );
}

function UpdateFoodScreen({ navigation, route }) {

  const [selectedweight, setSelectedweight] = useState(1);
  const [haha, setText] = useState('');
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
      name: "Bielkoviny",
      population: protein,
      color: "red",
      legendFontColor: "black",
      legendFontSize: 15
    },
    {
      name: "Tuky",
      population: fat,
      color: "yellow",
      legendFontColor: "black",
      legendFontSize: 15
    },
    {
      name: "Sacharidy",
      population: catbohydrates,
      color: "blue",
      legendFontColor: "black",
      legendFontSize: 15
    },
    {
      name: "Vl??knina",
      population: fiber,
      color: "green",
      legendFontColor: "black",
      legendFontSize: 15
    }
  ];

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 100, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
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
          <Text style={[, { color: 'white', fontSize: 16, margin: 10,color:'black' }]}>Energia</Text>
          <Text style={[, { color: 'white', fontSize: 25,marginBottom:7}]}>{energyx} kcal</Text>


        </View>
        <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={[, { color: 'white', fontSize: 16, margin: 10 , color:'black' }]}>Energia</Text>
          <Text style={[, { color: 'white', fontSize: 25,marginBottom:7}]}>{energykjx} kJ</Text>

        </View>

      </View>
      <View style={[, { display: 'flex', justifyContent: 'space-around', width:400,flexDirection: 'row', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>
        <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>

          <Text style={[, { color: 'white', fontSize: 16, margin: 10 , color:'black' }]}>Bielkoviny</Text>
          <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{proteinx} g</Text>
          <Text style={[, { color: 'white', fontSize: 16, margin: 10, color:'black'  }]}>Vl??knina</Text>
          <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{fiberx} g</Text>

        </View>
        <View style={[, { justifyContent: 'center', alignItems: 'center' }]}>

          <Text style={[, { color: 'white', fontSize: 16, margin: 10 , color:'black' }]}>Tuky</Text>
          <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{fatx} g</Text>
          <Text style={[, { color: 'white', fontSize: 16, margin: 10, color:'black'  }]}>Sacharidy</Text>
          <Text style={[, { color: 'white', fontSize: 16, marginBottom: 5 }]}>{catbohydratesx} g</Text>
        </View>

      </View>
      <View style={[, { display: 'flex', borderRadius: 10,width:400, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5, padding: 2 }]}>

      <PieChart
  data={data}
  width={400}
  height={200}
  chartConfig={chartConfig}
  accessor={"population"}
  backgroundColor={"transparent"}
  paddingLeft={"1"}
  center={[10, 5]}
  absolute={false}
/>
</View>
</ScrollView>
      <View style={[, { display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }]}>
        <TouchableOpacity onPress={onRemove} style={[, { display: 'flex', height: 72, width: 190, alignItems: 'center', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5 }]} >
          <MaterialCommunityIcons name="cancel" color={"red"} size={70} />

        </TouchableOpacity>

        <TouchableOpacity onPress={onUpdate} style={[, { display: 'flex', height: 72, width: 190, alignItems: 'center', borderRadius: 10, backgroundColor: '#6dbc4e', marginVertical: 10, marginHorizontal: 5 }]} >
          <MaterialCommunityIcons name="check" color={"white"} size={70} />

        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function OverviewTabScreen({ navigation }) {
  const goalEnergy = 2500
  const goalProtein = 105
  const goalFat = 47.5
  const goalFiber = 27.5
  const goalCatrbohydrates = 205


  const diaryyy = useContext(ctx.Diary);
  const diaryKeyDate = new Date(parseInt(diaryyy.diaryKey));
  const [date, setDate] = useState(diaryKeyDate);
  const [show, setShow] = useState(false);
  const totalEnergy = diaryyy.entries.reduce((prevValue, currentValue) => prevValue + parseInt((currentValue.energy/100)*currentValue.finalweight),0,);
  const totalProtein = diaryyy.entries.reduce((prevValue, currentValue) => prevValue + parseInt((currentValue.protein/100)*currentValue.finalweight),0,);
  const totalCarbohydrates = diaryyy.entries.reduce((prevValue, currentValue) => prevValue + parseInt((currentValue.catbohydrates/100)*currentValue.finalweight),0,);
  const totalFat = diaryyy.entries.reduce((prevValue, currentValue) => prevValue + parseInt((currentValue.fat/100)*currentValue.finalweight),0,);
  const totalFiber = diaryyy.entries.reduce((prevValue, currentValue) => prevValue + parseInt((currentValue.fiber/100)*currentValue.finalweight),0,);

  const totalEnergyPercent = (100*(totalEnergy/goalEnergy)).toFixed()
  const totalProteinPercent = (100*(totalProtein/goalProtein)).toFixed()
  const totalFatPercent = (100*(totalFat/goalFat)).toFixed()
  const totalFiberPercent = (100*(totalFiber/goalFiber)).toFixed()
  const totalCarbohydratesPercent = (100*(totalCarbohydrates/goalCatrbohydrates)).toFixed()





  let colorEnergy='orange'
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
    if(totalEnergyPercent>100){
    colorEnergyZvysok='green'
      if(totalEnergyPercent>120){
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
    navigation.navigate('Search');
  };
  let day =''
  switch (diaryKeyDate.getDay()) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
       day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
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
       <View style={styles.bar}>
      <TouchableOpacity style={[styles.btn,{flex: 1,flexDirection:'row',justifyContent:'center',alignItems:'center'}]} onPress={onPress}>

      <MaterialCommunityIcons name="calendar" color={"white"} size={30} />
        <Text style={[styles.text, { marginLeft:7 }]}>
 {day}, {diaryKeyDate.toString().substr(8, 2)}. {(diaryKeyDate.getMonth())+1}.</Text>
        </TouchableOpacity>
      </View>
      <View style={{display: 'flex',marginTop:0,height:90,width:420,justifyContent:'space-evenly',flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
        <View style={{backgroundColor:'black',borderColor:'white',borderWidth:0.5 ,height:90,width:190,margin:5,borderRadius:20, padding:10,display:'flex',justifyContent:'space-between'}}>
       <Text style={{color:'grey',paddingLeft:5,fontSize:15}}>Calories</Text>
       <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><Text style={{paddingLeft:5,fontSize:29,  color:'white'}}>{totalEnergy} kcal</Text><MaterialCommunityIcons style={{}} name="plus-circle" color={"green"} size={20} />
</View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
        <View style={{backgroundColor:'black',borderColor:'white',borderWidth:0.5, height:90,width:190,margin:5,borderRadius:20, padding:10,display:'flex',justifyContent:'space-between'}}>
       <Text style={{color:'grey',paddingLeft:5,fontSize:15}}>Activity</Text>
       <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><Text style={{paddingLeft:5,fontSize:29,  color:'white'}}>-0 kcal</Text><MaterialCommunityIcons style={{}} name="plus-circle" color={"green"} size={20} />
</View>
        </View>
        </TouchableOpacity>
      </View>
      <View style={{display: 'flex',marginTop:15,height:90,width:420,justifyContent:'space-evenly',flexDirection:'row'}}>
      <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
        <View style={{backgroundColor:'black',borderColor:'white',borderWidth:0.5, height:90,width:190,margin:5,borderRadius:20, padding:10,display:'flex',justifyContent:'space-between'}}>
       <Text style={{color:'grey',paddingLeft:5,fontSize:15}}>Weight</Text>
       <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><Text style={{paddingLeft:5,fontSize:29,  color:'white'}}>0 kcal</Text><MaterialCommunityIcons style={{}} name="plus-circle" color={"green"} size={20} />
</View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
        <View style={{backgroundColor:'black',borderColor:'white',borderWidth:0.5, height:90,width:190,margin:5,borderRadius:20, padding:10,display:'flex',justifyContent:'space-between'}}>
       <Text style={{color:'grey',paddingLeft:5,fontSize:15}}>Homtonos??</Text>
       <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><Text style={{paddingLeft:5,fontSize:29,  color:'white'}}>0 kcal</Text><MaterialCommunityIcons style={{}} name="plus-circle" color={"green"} size={20} />
</View>
        </View>
        </TouchableOpacity>
      </View>
      <View style={{display:'flex', flexDirection:'row', justifyContent:'center',width:420,height:200,marginTop:15}}>
       <View style={{display:'flex',justifyContent:'flex-start',marginLeft:0,marginRight:0}}>
       <PieChart
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
            <Text style={{color:'lightgray',fontSize:18}}>Total</Text>
              <Text style={{color:'white',fontSize:30}}>{totalEnergy} kcal</Text>
              <Text style={{color:'lightgray',fontSize:15}}>of {goalEnergy} kcal</Text>

            </View>

    </View>
    <View style={{display:'flex', flexDirection:'row', marginTop:-25,}}>
      <View style={{marginLeft:-35}}>
       <PieChart
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
            <Text style={{color:'lightgray',fontSize:10}}>Protein</Text>
              <Text style={{color:'white',fontSize:18}}>{totalProtein} g</Text>
              <Text style={{color:'lightgray',fontSize:13}}>of {goalProtein} g</Text>

            </View>
            <PieChart
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
            <Text style={{color:'lightgray',fontSize:10}}>Fat</Text>
              <Text style={{color:'white',fontSize:18}}>{totalFat} g</Text>
              <Text style={{color:'lightgray',fontSize:13}}>of {goalFat} g</Text>

            </View>
    </View>
    <View style={{display:'flex', flexDirection:'row', marginTop:-25}}>
      <View style={{marginLeft:-35}}>
       <PieChart
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
            <Text style={{color:'lightgray',fontSize:10}}>Carbohydrates</Text>
              <Text style={{color:'white',fontSize:18}}>{totalCarbohydrates} g</Text>
              <Text style={{color:'lightgray',fontSize:13}}>of {goalCatrbohydrates} g</Text>

            </View>
            <PieChart
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
            <Text style={{color:'lightgray',fontSize:10}}>Fiber</Text>
              <Text style={{color:'white',fontSize:18}}>{totalFiber} g</Text>
              <Text style={{color:'lightgray',fontSize:13}}>of {goalFiber} g</Text>

            </View>
    </View>
    </View>

  );
}


const Tab = createBottomTabNavigator()
function MyTabs() {

  return (
    <Tab.Navigator screenOptions={options = {tabBarItemStyle:{backgroundColor:'gray'}, tabBarActiveBackgroundColor:'#fdca40',tabBarLabelStyle: {color:'white',  fontSize: 13 }, tabBarStyle: { height: 60 }, tabBarShowLabel: true, tabBarLabelPosition: "below-icon" }}>
      <Tab.Screen options={{
        headerShown: false,
        tabBarIcon: () => (
          <MaterialCommunityIcons name="fire" color={"#fdca40"} size={37} />
        ),
      }} name="Overview" component={OverviewTabScreen} />
      <Tab.Screen options={{
        headerShown: false, tabBarIcon: () => (
          <MaterialCommunityIcons name="food" color={"#fdca40"} size={37} />
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
    addFood(name,energy,energykj, protein,catbohydrates,fat, fiber,finalweight) {
      const newDiary = entries.concat({name,energy,energykj, protein,catbohydrates,fat, fiber, finalweight});
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
    removeFood(name) {
      const newEntries = entries.filter(entry => {
        return (name !== entry.name);
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
            <Drawer.Screen name="Details food" component={DetailsScreen} options={{ headerStyle: { backgroundColor: '#fdca40', }, headerTintColor: 'black', }} />
            <Drawer.Screen name="Details food " component={DetailsScreenBar} options={{ headerStyle: { backgroundColor: '#fdca40', }, headerTintColor: 'black', }} />

            <Drawer.Screen name="Update food" component={UpdateFoodScreen} options={{ headerStyle: { backgroundColor: '#fdca40', }, headerTintColor: 'black', }} />
            <Stack.Screen name="barcode" component={Barcode} options={{ headerStyle: { backgroundColor: '#fdca40', }, headerTintColor: 'black', }} />



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
});