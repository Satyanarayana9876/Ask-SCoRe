import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from '../navigation/Tabs';
import { useRoute } from '@react-navigation/native';
const TabScreen = ({navigation,Email}) => {
  //const route = useRoute({Email});
  const email = Email;
  return (
    <NavigationContainer independent={true}>
      <Tabs Email={email}/>
    </NavigationContainer>
  );
}

export default TabScreen;
