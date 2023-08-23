import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screens/HomeScreen'
import TabScreen from '../screens/TabScreen'

const Stack = createStackNavigator();

const AppStack = ({navigation,us}) => {
    const email=us.email;

    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Tabs" children={() => <TabScreen Email={email} />}/>
        </Stack.Navigator>
    );
}



export default AppStack;