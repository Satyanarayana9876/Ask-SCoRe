import React,{useRef, useState, useEffect} from "react";
import { AppState,ImageBackground, StyleSheet, Text, View,TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Forum = () => {
  const navigation = useNavigation();

  const appState = useRef(AppState.currentState);
  const [appStateVisible,setAppStateVisible] = useState(appState.current);
  useEffect(() => {
   const subscription = AppState.addEventListener("change", nextAppState => {
     if (
       appState.current.match(/inactive|background/) &&
       nextAppState === "active"
     ) {
       console.log("App has come to the foreground!");
     }

     appState.current = nextAppState;
     setAppStateVisible(appState.current);
     console.log("AppState", appState.current);
   });

   return () => {
     subscription.remove();
   };
 }, []);
  return(
  <View style={styles.container}>
      <View style={{flexDirection:'row',backgroundColor:"black"}}>
        <Icon name="folder" style={{color:"orange",left:15,top:10}} size={50} color="#900" />
      <Text style={styles.text}>  Forums</Text>
      </View>
      <View style={{padding:10}}></View>


    <TouchableOpacity onPress={() => navigation.navigate('Users')}>
        <View style={{marginHorizontal:20,borderRadius:20,backgroundColor:"lightblue",marginVertical:10,height:50}}>
          <Icon name="users" style={{color:"black",left:30,top:10}} size={30} color="#900" />
          <Text style={{justifyContent:"center",bottom:25,marginHorizontal:30,borderRadius:20,color:"black",textAlign:"center",fontSize:30,fontFamily:'Microbrew-Soft-Two-3D'}}>users</Text>
        </View>
    </TouchableOpacity>
  
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  text: {
    color: "orange",
    fontSize: 50,
    lineHeight: 84,
    textAlign: "center",
    bottom:5,
    fontFamily:'Microbrew-Soft-Two-3D'
  }
});

export default Forum;