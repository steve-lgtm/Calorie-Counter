import React, {useState} from 'react';
import {Alert, Text, View, StyleSheet, Button, Image, Pressable} from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

const styles = StyleSheet.create({
  body: {
   flex:1,
    backgroundColor:'white',
  },
    name: {
        backgroundColor: 'green',
        height:100,
    },
    nametext: {
color: 'white',
fontSize: 35,
marginTop:10,
marginLeft: 15,
    },
    input: {
marginTop:40,
marginBottom:40,
fontSize:40,
textAlign: 'center',
color: 'black',
    },
    container:{

flexDirection:'row',

    },
    containeris:{
     flex:1,
      height:90,
      borderTopWidth:0.5,
    },
    numtext:{
      marginTop:3,
      textAlign:'center',
      fontSize:40,
      color:'black',
    },
    lettertext:{
      marginTop:-3,
      textAlign:'center',
      color:'lightgray',
      fontSize:15,
    },
    containerisko:{
      flex:1,


    },
    wrapperCustom: {
      borderRadius: 50,
      }
});

export default function App() {
   const [text,counter] = useState('');
   const [shouldShow, setShouldShow] = useState(false);
   function write(num){
      if(text.length<15)
        counter(text => text+num);
      if(text.length+1==0)
      setShouldShow(false);
      else
      setShouldShow(true);
    };
    function call(){
      if(text!=0&&text!='#'&&text!='*'&&text!='+')
      RNImmediatePhoneCall.immediatePhoneCall(text);
      counter(text.slice(0,-text.length))
      setShouldShow(false);
    }
    function delet(){
      counter(text.slice(0,-1));
      if(text.length-1==0)
      setShouldShow(false);
      else
      setShouldShow(true);
    };
    function fullDelet(){
      counter(text.slice(0,-text.length));
      setShouldShow(false);
    }
    return (
      <View style={styles.body}>
      <View style={styles.name}>
        <Text style={styles.nametext}>Dialer</Text>
        </View>
        <Text style={styles.input}>{text}</Text>

        <View  style={[styles.container,{}]}>
          <View style={[styles.containeris,{}]}>
        <Pressable onPress={()=>write('1')}>
        <Text style={styles.numtext}>1</Text>
        <Image source={require('./assets/voicemailimage.png')} style={[,{height:30, width:30, resizeMode: "contain",alignSelf:'center', marginTop:-7}]}/>
        </Pressable>
        </View>
        <View style={[styles.containeris,{borderLeftWidth:0.5,borderRightWidth:0.5}]}>
        <Pressable onPress={()=>write('2')}>
        <Text style={styles.numtext} >2</Text>
        <Text style={styles.lettertext}>ABC</Text>
        </Pressable>
        </View>
        <View style={[styles.containeris,]}>
        <Pressable onPress={()=>write('3')}>
        <Text style={styles.numtext}>3</Text>
        <Text style={styles.lettertext}>DEF</Text>
        </Pressable>
        </View>
        </View>

        <View  style={[styles.container,{}]}>
          <View style={[styles.containeris,{}]}>
          <Pressable onPress={()=>write('4')}>
        <Text style={styles.numtext}>4</Text>
        <Text style={styles.lettertext}>GHI</Text>
        </Pressable>
        </View>
        <View style={[styles.containeris,{borderLeftWidth:0.5,borderRightWidth:0.5}]}>
        <Pressable onPress={()=>write('5')}>
        <Text style={styles.numtext} >5</Text>
        <Text style={styles.lettertext}>JKL</Text>
        </Pressable>
        </View>
        <View style={[styles.containeris,]}>
        <Pressable onPress={()=>write('6')}>
        <Text style={styles.numtext}>6</Text>
        <Text style={styles.lettertext}>MNO</Text>
        </Pressable>
        </View>
        </View>

       < View  style={[styles.container,{}]}>
          <View style={[styles.containeris,{}]}>
          <Pressable onPress={()=>write('7')}>
        <Text style={styles.numtext}>7</Text>
        <Text style={styles.lettertext}>PQRS</Text>
        </Pressable>
        </View>
        <View style={[styles.containeris,{borderLeftWidth:0.5,borderRightWidth:0.5}]}>
        <Pressable onPress={()=>write('8')}>
        <Text style={styles.numtext} >8</Text>
        <Text style={styles.lettertext}>TUV</Text>
        </Pressable>
        </View>
        <View style={[styles.containeris,]}>
        <Pressable onPress={()=>write('9')}>
        <Text style={styles.numtext}>9</Text>
        <Text style={styles.lettertext}>WXYZ</Text>
        </Pressable>
        </View>
        </View>
       < View  style={[styles.container,{}]}>
          <View style={[styles.containeris,{borderBottomWidth:0.5,}]}>
          <Pressable onPress={()=>write('*')}>
        <Text style={[styles.numtext,{marginTop:17,}]}>*</Text>
       
        </Pressable>
        </View>
        <View style={[styles.containeris,{borderBottomWidth:0.5,borderLeftWidth:0.5,borderRightWidth:0.5}]}>
        <Pressable onPress={()=>write('0')} onLongPress={()=>write('+')}>
        <Text style={styles.numtext} >0</Text>
        <Text style={[styles.lettertext,{marginTop:-7,fontSize:20,}]}>+</Text>
        </Pressable>
        </View>
        <View style={[styles.containeris,{borderBottomWidth:0.5,}]}>
        <Pressable onPress={()=>write('#')}>
        <Text style={[styles.numtext,{marginTop:12,}]}>#</Text>
        
        </Pressable>
        </View>
        </View>
        < View  style={[styles.container,{}]}>
          <View style={[styles.containerisko,{}]}>
        <Pressable onPress={()=>call()}>
        <Image source={require('./assets/callimage.png')} style={[,{height:80, width:80, resizeMode: "contain",alignSelf:'center',marginTop:30}]}/>
       
        </Pressable>
        </View>
        {shouldShow ? (
          <View style={[styles.containerisko,{}]}>
          <Pressable onPress={()=>delet() } onLongPress={()=>fullDelet()}>
          <Image source={require('./assets/deleteimage.png')}  style={[,{height:70, width:70, resizeMode: "contain",alignSelf:'center',marginTop:37}]}/>
          </Pressable>
          </View>
        ) : null}
        </View>
        </View>
    );
}