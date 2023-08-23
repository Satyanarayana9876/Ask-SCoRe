import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notification from '../screens/NotificationScreen'
import ProfileScreen from '../screens/ProfilebScreen'
import Home from '../screens/HomeScreen'
import Forum from '../screens/ForumScreen'
import EditScreen from '../screens/EditProfileScreen';
import AnswerScreen from '../screens/AnswerScreen';
import AskScreen from '../screens/AskScreen.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import UserScreen from '../screens/UserScreen';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileStackScreen = ({Email}) => {
  const email = Email;
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Profileb" children={() => <ProfileScreen Email={email} />}/>
      <Stack.Screen  name="Edit" children={() => <EditScreen Email={email} />}/>
    </Stack.Navigator>
  );
}
const HomeStackScreen = ({Email}) => {
  const email = Email;
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" children={() => <Home Email={email} />}/>
      <Stack.Screen  name="Ask" children={() => <AskScreen Email={email} />}/>
      <Stack.Screen  name="Answer" children={() => <AnswerScreen Email={email} />}/>
    </Stack.Navigator>
  );
}
const ForumStackScreen = ({Email}) => {
  const email = Email;
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Forums" children={() => <Forum Email={email} />}/>
      <Stack.Screen name="Users" children={() => <UserScreen Email={email} />}/>

    </Stack.Navigator>
  );
}
const Tabs = ({Email}) => {
  const email=Email;

  return (
    <NavigationContainer  independent={true}>
    <Tab.Navigator  screenOptions={{tabBarActiveTintColor:"brown",tabBarInactiveTintColor:"black",tabBarHideOnKeyboard: true,headerShown: false,tabBarShowLabel:false,tabBarStyle:{position:"absolute",bottom:25,left:20,right:20,elevation:0,borderRadius:15,height:70,backgroundColor:"orange"}}}>
      <Tab.Screen name="Home" children={() => <HomeStackScreen Email={email}/>} options={{tabBarIcon:()=>(<Icon name="home" style={{color:"black"}} size={30} color="#900" />)}}/>
      <Tab.Screen name="Forums" children={() => <ForumStackScreen Email={email}/>} options={{tabBarIcon:()=>(<Icon name="folder" style={{color:"black"}} size={30} color="#900" />)}}/>
      <Tab.Screen name="Notifications" component={Notification} options={{tabBarIcon:()=>(<Icon style={{color:"black"}} name="bell" size={30} color="#900" />)}}/>
      <Tab.Screen name="Profile" children={() => <ProfileStackScreen Email={email} />} options={{tabBarIcon:()=>(<Icon name="user" style={{color:"black"}} size={30} color="#900" />)}}/>
    </Tab.Navigator>
  </NavigationContainer>
  );
}

export default Tabs;

