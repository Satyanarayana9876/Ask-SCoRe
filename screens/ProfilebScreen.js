import React,{useEffect,useState,useContext} from "react";
import { ImageBackground, StyleSheet, Text, View,TouchableOpacity ,TextInput} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';

const ProfileScreen = ({Email}) => {
  const email = Email;
  const [name,setName] = useState("");
  const [country,setCountry] = useState("");
  const [phone,setPhone] = useState("");
  const navigation = useNavigation();

  useEffect(()=>{
    getDatabase()
  },[]);

  const getDatabase = async()=>{
    try{

      const data = await firestore().collection('users').doc(email).onSnapshot(doc => {
        setName(doc.data().name);
        setCountry(doc.data().country);
        setPhone(doc.data().Phone);
        
      });

    }
    catch(e)
    {
      console.log(e);
    }
  }

  return(
  <View style={styles.container}>
      <View style={{flexDirection:'row',backgroundColor:"black"}}>
      <Icon name="user" style={{color:"orange",left:15,top:10}} size={50} color="#900" />
      <Text style={styles.text}>  Profile</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Edit")}>
        <Text style={{color:"black",fontSize:30,left:100,top:15,backgroundColor:"orange",borderRadius:10}}> Edit </Text>
      </TouchableOpacity>
      </View>
      <View style={{padding:100}}></View>
      <View>
      <Text style={[styles.userData,{backgroundColor:"black",textAlign:"center",marginHorizontal:7,marginVertical:7,borderRadius:10,height:45}]}>  {email}</Text>
      </View>
      <View >
      <Text style={[styles.userData,{backgroundColor:"black",textAlign:"center",marginHorizontal:7,marginVertical:7,borderRadius:10}]}>  {name}</Text>
      </View>
      <View >
      <Text style={[styles.userData,{backgroundColor:"black",textAlign:"center",marginHorizontal:7,marginVertical:7,borderRadius:10}]}>  {phone}</Text>
      </View>
      <View >
      <Text style={[styles.userData,{backgroundColor:"black",textAlign:"center",marginHorizontal:7,marginVertical:7,borderRadius:10}]}>  {country}</Text>
      </View>


      <TouchableOpacity onPress={async() => {
        await Auth().signOut();
      }}>
      <View style={styles.iconup}>
      <Icon name="sign-out" style={{color:"orange"}} size={30} color="#900" />
      </View>
      </TouchableOpacity>
  </View>
);
}


const styles = StyleSheet.create({
  iconup:{
    position: "absolute",
    bottom: -160,
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
  userData:{
    color:"orange",
    fontSize:30,
  },
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
    left:40,
  }
});

export default ProfileScreen;
