import React,{useEffect,useState,useContext} from "react";
import { ImageBackground, StyleSheet, Text, View ,TextInput,ScrollView,TouchableOpacity,FlatList} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import { useRoute } from '@react-navigation/native';

const Answer = ({Email}) => {
  const email = Email;
  const [name,setName] = useState("");
  const [query,setQuery] = useState("");
  const [currentDate, setCurrentDate] = useState('');
  const [data,setData] = useState("");
  const [list,setList] = useState(null);
  const route = useRoute();
  const index = route.params.index;
  const [length,setLength] = useState(null);
  useEffect(() => {
    getDataBase()
  },[])

    useEffect(() => {
      getdatabase()
    },[])
  const getDataBase = async() => {
    try{
      const data = await database().ref(`query/${index}`).on("value",(tempData)=>{
        setData(tempData.val());
        if(tempData.val().answer == undefined){
          setLength(0);
        }
        else{
          setLength(tempData.val().answer.length);
        }
      });
    }
    catch(e){
      console.log(e);
    }
  };
  useEffect(() => {
    getAnswers()
  },[])
const getAnswers = async() => {
  try{
    const data = await database().ref(`query/${index}/answer`).on("value",(tempData)=>{
      setList(tempData.val());
    });
  }
  catch(e){
    console.log(e);
  }
};
console.log(list);
const updateDataBase = async() => {
  try{
     const write = await database().ref(`query/${index}/answer/${length}`).set({
            name: name,
            answers:query
          });
          console.log(write);
    }
  catch(e)
  {
    console.log(e);
  }
}

  const getdatabase = async()=>{
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
      <Icon name="hand-paper-o" style={{color:"white",marginHorizontal:10,top:7,left:1}} size={50} color="#900" />
      <Text style={styles.text}>Answer</Text>
      </View>



      <View style={{padding:40}}></View>
      <View style={{flexDirection:"column"}}>
      <View style={{backgroundColor:"black",borderRadius:10,marginHorizontal:65,right:55}}>
      <Text style={{textAlign:"center",right:30,fontSize:20,color:"white",fontFamily:"Microbrew-Soft-Two-3D"}}>{data.name}</Text>
      </View>
      <View style={{backgroundColor:"pink",borderRadius:10,marginHorizontal:10}}>
      <Text style={{textAlign:"center",fontSize:30,color:"black",fontFamily:"Futura-CondensedLight"}}>{data.message}</Text>
      </View>

      </View>
      <View style={{backgroundColor:"orange",marginVertical:15,borderRadius:15,marginHorizontal:10}}>
      <TextInput style={{textAlign:"center",fontSize:30,color:"black"}}   placeholder='Answer' placeholderTextColor="black" onChangeText={(value) => setQuery(value)}/>
      </View>
      <TouchableOpacity onPress={() => {updateDataBase()}}>
      <View style={{backgroundColor:"white",marginVertical:10,borderRadius:15,marginHorizontal:100}}>
      <Text style={{color:"purple",fontSize:30,textAlign:"center",marginVertical:10,marginHorizontal:10}}>Answer</Text>
      </View>
      </TouchableOpacity>

      <ScrollView style={{}}>
        <FlatList data={list} renderItem={(item) => {
            return(
              <View style={{flexDirection:"column",marginVertical:10}}>
              <View style={{backgroundColor:"black",borderRadius:10,marginHorizontal:65,right:55}}>
              <Text style={{textAlign:"center",right:30,fontSize:20,color:"white"}}>{item.item.name}</Text>
              </View>
              <View style={{backgroundColor:"lightblue",borderRadius:10,marginHorizontal:10}}>
              <Text style={{textAlign:"center",fontSize:30,color:"purple"}}>{item.item.answers}</Text>
              </View>
              </View>
            );
            }}/>
          <View style={{padding:100}}></View>
    </ScrollView>
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
  },
});

export default Answer;