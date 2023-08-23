import React,{useState,useEffect,useContext,useRef} from "react";
import {AppState, ImageBackground, StyleSheet, Text, View,TouchableOpacity,SafeAreaView, ScrollView,FlatList,ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

const Home = ({Email}) => {
  const mail = Email;
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [users, setUsers] = useState([]);
  var myMap = new Map();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  const subscriber = firestore()
    .collection('users')
    .onSnapshot(querySnapshot => {
      const users = [];

      querySnapshot.forEach(documentSnapshot => {
        users.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      setUsers(users);
      setLoading(false);
    });

  // Unsubscribe from events when no longer in use
  return () => subscriber();
}, []);

users.forEach(value => {
  myMap.set(value.email,value.status);
})
console.log(myMap);
  useEffect(() => {
          AppState.addEventListener('change', handleAppStateChange);
      });

  const handleAppStateChange = async(nextAppState) => {
    if (
      nextAppState === "active"
    ) {
      const chan = await firestore().collection('users').doc(mail).update({status: true,});
    } else {
      const chan = await firestore().collection('users').doc(mail).update({status: false,});
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };
  const navigation = useNavigation();
  const email =  Email;
  const [list,setList] = useState(null);
  const [lst,setLst] = useState(null);
  useEffect(() => {getDataBase()},[])
  const getDataBase = async() => {
    try{
      const data = await database()
      .ref("query")
      .on("value",(tempData)=>{
      setList(tempData.val());
      });


    }
    catch(e)
    {
      console.log(e);
    }
  };

  return(
  <View style={styles.container}>

      <View style={{flexDirection:'row',backgroundColor:"black"}}>
      <Icon name="users" style={{color:"orange",left:15,top:10}} size={50} color="#900" />
      <Text style={styles.text}>  Community</Text>
      </View>

      <ScrollView style={{}}>
        <FlatList data={list} renderItem={(item) => {
            var status = myMap.get(item.item.mail);
              if(item.item !== null && status == false){
              return(
                <View style={{height:80,borderRadius:10,backgroundColor:"lightblue",marginVertical:10,marginHorizontal:7}}>
                <View style={{height:30,borderRadius:8,backgroundColor:"black",flexDirection:"row"}}>
                <Text style={{left:10,color:"white",top:5}}>{item.item.name}</Text>
                <Text style={{left:15,color:"white",top:5}}>🔴️</Text>
                <Text style={{left:10,position: 'absolute', left: 170, top:5,right: 0, bottom: 0,color:"white"}}>{item.item.curretTime}</Text>
                </View>
                <View style>
                <Text style={{left:10,color:"black"}}>{item.item.message}</Text>
                </View>
                  <TouchableOpacity onPress={() => navigation.navigate('Answer',{index:item.index})}>
                <View style={{backgroundColor:item.item.answer ? "purple" : "green",marginHorizontal:130,borderRadius:10,left:120,top:7}}>
                <Text style={{textAlign:"center",color:"white",borderRadius:5}}>{item.item.answer ? "Answered" : "Answer"}</Text>
                </View>
                </TouchableOpacity>
               </View>

              );
            }
            if(item.item !== null && status == true)
            {

            return(
              <View style={{height:80,borderRadius:10,backgroundColor:"lightblue",marginVertical:10,marginHorizontal:7}}>
              <View style={{height:30,borderRadius:8,backgroundColor:"black",flexDirection:"row"}}>
              <Text style={{left:10,color:"white",top:5}}>{item.item.name}</Text>
              <Text style={{left:15,color:"white",top:5}}>🟢</Text>
              <Text style={{left:10,position: 'absolute', left: 170, top:5,right: 0, bottom: 0,color:"white"}}>{item.item.curretTime}</Text>
              </View>
              <View style>
              <Text style={{left:10,color:"black"}}>{item.item.message}</Text>
              </View>
                <TouchableOpacity onPress={() => navigation.navigate('Answer',{index:item.index})}>
              <View style={{backgroundColor:item.item.answer ? "purple" : "green",marginHorizontal:130,borderRadius:10,left:120,top:7}}>
              <Text style={{textAlign:"center",color:"white",borderRadius:5}}>{item.item.answer ? "Answered" : "Answer"}</Text>
              </View>
              </TouchableOpacity>
             </View>
            );
          }
            }}/>
          <View style={{padding:100}}></View>
    </ScrollView>
    <TouchableOpacity onPress={() => navigation.navigate('Ask',{length:list.length})}>
    <View style={styles.iconup}>
    <Icon name="comment" style={{color:"black"}} size={30} color="#900" />
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
    backgroundColor: 'orange',
    borderRadius: 50,
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
    fontFamily:'Microbrew-Soft-Two-3D'
  },
  pcard: {
      color:"white",
      backgroundColor:"black",
      marginVertical:10,
      fontSize:30,
      fontFamily:"Microbrew-Soft-Two-3D",
      textAlign:"center",
      marginHorizontal:20,
      borderRadius:40
    },
});

export default Home;