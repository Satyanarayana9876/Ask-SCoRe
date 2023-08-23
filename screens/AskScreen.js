import React,{useEffect,useState,useContext} from "react";
import { ImageBackground, StyleSheet, Text, View ,TextInput,ScrollView,TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import { useRoute } from '@react-navigation/native';

import moment from 'moment';

const AskScreen = ({Email}) => {
  const email = Email;
  const [name,setName] = useState("");
  const [query,setQuery] = useState("");
  const [currentDate, setCurrentDate] = useState('');
  const route = useRoute();
  const length = route.params.length;
  useEffect(() => {
    getDatabase();
  },[])

  const writeQuery = async() => {
    try{
       const write = await database()
        .ref(`query/${length}`)
        .set({
              name: name,
              message: query,
              curretTime: moment().utcOffset('+05:30').format('MMMM Do YYYY, h:mm:ss a'),
              mail:email,
            });
            console.log(write);
      }
    catch(e)
    {
      console.log(e);
    }
  }

  const getDatabase = async()=>{
    try{

      const data = await firestore().collection('users').doc(email).onSnapshot(doc => {
        setName(doc.data().name);
      });

    }
    catch(e)
    {
      console.log(e);
    }
  }
  return(
  <View style={styles.container}>
      <View style={{flexDirection:"row",backgroundColor: "purple",justifyContent:"center"}}>
      <Icon name="comment-o" style={{color:"white",marginHorizontal:10,top:7,left:1}} size={50} color="#900" />
      <Text style={styles.text}>Ask</Text>
      </View>


      <View style={{padding:80}}></View>


      <View style={{backgroundColor:"orange",marginVertical:10,borderRadius:15,marginHorizontal:10}}>
      <TextInput style={{textAlign:"center",fontSize:30,color:"black",fontFamily:"Futura-CondensedLight"}}   placeholder='Ask Anything' placeholderTextColor="black" onChangeText={(value) => setQuery(value)}/>
      </View>
      <TouchableOpacity onPress={() => {writeQuery()}}>
      <View style={{backgroundColor:"white",marginVertical:10,borderRadius:15,marginHorizontal:100}}>
      <Text style={{color:"purple",fontSize:30,textAlign:"center",fontFamily:"Microbrew-Soft-Two-3D",marginVertical:10,marginHorizontal:10}}>Ask</Text>
      </View>
      </TouchableOpacity>





  </View>
);

}
const styles = StyleSheet.create({
  iconup:{
          position: "absolute",
          bottom: 110,
          right: 20,
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          height: 70,
          backgroundColor: 'black',
          borderRadius: 50,
        },
  container: {
    flex: 1,

  },
  image: {
    flex: 1
  },
  text: {
    color: "white",
    fontSize: 52,
    lineHeight: 74,
    marginHorizontal:10,
    textAlign: "center",
    right:12,
    fontFamily:"Microbrew-Soft-Two-3D"
  },
});

export default AskScreen;