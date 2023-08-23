import React, {useState,useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from '../screens/OnBoardingScreen.js';
import LoginScreen from '../screens/LoginScreen.js';
import SignupScreen from '../screens/SignupScreen.js';
import Home from '../screens/HomeScreen.js';
import TabScreen from '../screens/TabScreen.js';

const Stack = createStackNavigator();

const AuthStack = () => {

    return (

        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );

}

export default AuthStack;
