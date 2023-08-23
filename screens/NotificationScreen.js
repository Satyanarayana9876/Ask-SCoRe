import React, { useEffect, useState, useContext } from "react";
import { Image, StyleSheet, Text, View, ScrollView,FlatList,TouchableOpacity,Linking} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from "axios";
const Tab = createMaterialTopTabNavigator();


const Github = () => {
  const [list, setList] = useState(null);
  useEffect(() => {
    axios.get("https://api.github.com/users/scorelab/repos")
      .then((res) => { setList(res.data) });
  }, [])
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', backgroundColor: "black" }}>
        <ScrollView>

          <FlatList data={list} renderItem={(item) => {

            if (item.item !== null) {
              return (
                <TouchableOpacity onPress={() => {Linking.openURL(item.item.html_url)}}> 
                <View style={{ flexDirection: "row" }}>
                  <View style={{ right: 30, flexDirection: "column", backgroundColor: "lightblue", marginVertical: 10, flex: 1, height: 150, marginHorizontal: 50, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                    <Text style={{ fontSize: 18, left: 15, position: 'absolute', marginVertical: 10, color: "black" }}>{item.item.name}</Text>
                    <View style={{ borderWidth: 1, marginHorizontal: 10, top: 50 }}></View>
                    <Text numberOfLines={3} style={{ fontSize: 13, color: "black", top: 60, position: 'absolute', left: 15, right: 30 }}>{item.item.description}</Text>
                    <Text style={{ color: "brown", top: 120, position: "absolute", left: 15, top: 120, fontSize: 20 }}>{item.item.language}</Text>
                    <Image style={{ borderTopRightRadius: 30, borderBottomRightRadius: 30, left: 260, bottom: 2, width: 100, height: 150 }} source={{ uri: 'https://avatars.githubusercontent.com/u/5285159?v=4' }} />
                  </View>
                </View>
                </TouchableOpacity>
              );
            }
          }} />
          <View style={{ padding: 100 }}></View>

        </ScrollView>
      </View>
    </View>
  )
};
const Medium = () => {
  const [list,setList] = useState(null);
  useEffect(()=>{
    axios.get("https://api.rss2json.com/v1/api.json?rss_url=https://api.medium.com/feed/tag/scorelab")
    .then((res)=>{setList(res.data.items)});
  },[])
  return(
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', backgroundColor: "black" }}>
      <ScrollView>
        <FlatList data={list} renderItem={(item) => {
          if(item.item !== null)
          {
          return(
            <TouchableOpacity onPress={() => { Linking.openURL(item.item.link)}}>
              <View style={{flexDirection:"row"}}>
                <View style={{right:30,flexDirection:"column",backgroundColor:"lightblue",marginVertical:10,flex:1,height:150,marginHorizontal:50,borderTopLeftRadius:10,borderBottomLeftRadius:10}}>
                  <Text numberOfLines={2} style={{fontSize:15,left:15,position: 'absolute',marginVertical:10,color:"black",right:40}}>{item.item.title}</Text>
                  <View style={{borderWidth:1,marginHorizontal:10,top:50}}></View>
                  <Text numberOfLines={3} style={{fontSize:13,color:"black",top:60,position: 'absolute',left:15,right:30}}>{item.item.author}</Text>
                  <Text style={{color:"brown",top:120,position:"absolute",left:15,top:120,fontSize:20}}>{item.item.pubDate}</Text>
                  <Image style={{borderTopRightRadius:30,borderBottomRightRadius:30,left:260,bottom:2,width: 100,height: 150}} source={{uri: item.item.thumbnail}}/>
                </View>
              </View>
            </TouchableOpacity>
          );
        }
            }}/>
            <View style={{padding:100}}></View>
      </ScrollView>
      </View>
    </View>
  )
};

const Notification = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor: 'orange' }, }}>
      <Tab.Screen name="Github" options={{ tabBarIcon: () => (<Icon name="github" style={{ color: "black" }} size={30} color="#900" />) }} component={Github} />
      <Tab.Screen name="Medium" options={{ tabBarIcon: () => (<Icon name="medium" style={{ color: "black" }} size={30} color="#900" />) }} component={Medium} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  text: {
    color: "orange",
    fontSize: 50,
    lineHeight: 84,
    textAlign: "center",
    bottom: 5,
  }
});

export default Notification;


