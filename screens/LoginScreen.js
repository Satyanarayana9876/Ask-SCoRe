import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { AuthContext } from "../navigation/AuthProvider";
import auth from '@react-native-firebase/auth';


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user,setUser] = useState();
  const [message, setMessage] = useState("");
  const {login}=useContext(AuthContext);

  const handleLogin = async() => {
    try{
      if(email.length>0 && password.length>0)
      {
        const isLogin  = await auth().signInWithEmailAndPassword(email,password);
        setMessage("");
        navigation.navigate("Tabs",{email:isLogin.user.email});
      }
      else
      {
        Alert.alert("Please enter details")
      }
    }
    catch(e)
    {
      console.log(e);
      setMessage(e.message);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
    <Text style={styles.text}>  Ask Me!</Text>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign In"
        onPress={() => handleLogin(email,password)}
      />

      <View style={{padding:10}}>
        <Text style={{color:"red"}}>{message}</Text>
      </View>

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => {}}>
        <Text style={styles.navButtonText}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      {/* <SocialButton
        buttonTitle='Sign In with Facebook'
        btnType="facebook"
        color='#4867aa'
        backgroundColor='#e6eaf4'
        onPress={() => {}}
        />

        <SocialButton
          buttonTitle='Sign In with Google'
          btnType="google"
          color='#de4d41'
          backgroundColor='#f5e7ea'
          onPress={() => {}}
          /> */}


      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => {navigation.navigate('Signup')}}>
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
});
