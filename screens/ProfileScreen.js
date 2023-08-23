/*import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,

} from 'react-native';

export default class UserProfileView extends Component {

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={require("../assets/TSN.jpg")}/>

                <Text style={styles.name}>Satyanarayana</Text>
                <Text style={styles.name}> </Text>

                <Text style={styles.userInfo}> Hyderabad </Text>
            </View>
          </View>

          <View style={styles.body}>
            <Text> </Text>
            <Text> </Text>
            <Text> </Text>
        
            <View style={styles.item}>
              <View style={styles.iconContent}>

                <Image style={styles.icon} source={require('../assets/images/user.png')}/>
                </View>

              <View style={styles.infoContent}>
                <TouchableOpacity onPress={() => {}}>
                <Text style={styles.info}>About</Text>
                </TouchableOpacity>
              </View>
            </View>



            <View style={styles.item}>
              <View style={styles.iconContent}>
                <Image style={styles.icon} source={require('../assets/images/notifications.png')}/>
              </View>
              <View style={styles.infoContent}>
                <TouchableOpacity onPress={() => {}}>
                <Text style={styles.info}>Notifications</Text>
                </TouchableOpacity>
              </View>
            </View>




            <View style={styles.item}>
              <View style={styles.iconContent}>
                <Image style={styles.icon} source={require('../assets/images/settings.png')}/>
              </View>
              <View style={styles.infoContent}>
                <TouchableOpacity onPress={() => {}}>
                <Text style={styles.info}>Settings</Text>
                </TouchableOpacity>
              </View>
            </View>


            <View style={styles.item}>
              <View style={styles.iconContent}>
                <Image style={styles.icon} source={require('../assets/images/logout.png')}/>
              </View>
              <View style={styles.infoContent}>
                <TouchableOpacity onPress={() => {}}>
                <Text style={styles.info}>Log Out</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#DCDCDC",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
  },
  userInfo:{
    fontSize:16,
    color:"#778899",
    fontWeight:'600',
  },
  body:{
    backgroundColor: "#778899",
    height:500,
    alignItems:'center',
  },
  item:{
    flexDirection : 'row',
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5
  },
  iconContent:{
    flex:1,
    alignItems:'flex-end',
    paddingRight:5,
  },
  icon:{
    width:30,
    height:30,
    marginTop:20,
  },
  info:{
    fontSize:18,
    marginTop:20,
    color: "#FFFFFF",
  }
});
*/


import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from '../navigation/Tabs';
import { useRoute } from '@react-navigation/native';
const ProfileScreen = ({navigation}) => {
  const route = useRoute();
  const email = route.params.email;
  return (
    <NavigationContainer independent={true}>
      <Tabs Email={email}/>
    </NavigationContainer>
  );
}

export default ProfileScreen;
