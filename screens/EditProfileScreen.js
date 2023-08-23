import React, { useEffect, useState, useContext } from "react";
import { ImageBackground, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

const EditScreen = ({ Email }) => {
    const email = Email;
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        getDatabase()
    }, []);

    const getDatabase = async () => {
        try{
            const data = await firestore().collection('users').doc(email).get();
            setName(data._data.name);
            setCountry(data._data.country);
            setPhone(data._data.Phone);
        }
        catch (e) {
            console.log(e);
        }
    }
    const handleUpdate = async () => {
        try {
            const data = await firestore().collection('users').doc(email).update({ name: name, email: email, Phone: phone, country: country });
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", backgroundColor: "purple", justifyContent: "center" }}>
                <Icon name="pencil" style={{ color: "white", marginHorizontal: 10, top: 7, left: 1 }} size={50} color="#900" />
                <Text style={styles.text}>Edit Profile</Text>
            </View>

            <ScrollView style={{}}>
                <View style={{ padding: 80 }}></View>

                <View style={{ backgroundColor: "orange", marginVertical: 10, borderRadius: 15, marginHorizontal: 10 }}>
                    <TextInput style={{ textAlign: "center", fontSize: 30, color: "black", fontFamily: "Futura-CondensedLight" }} value={email} placeholder="email" placeholderTextColor="white" />
                </View>
                <View style={{ backgroundColor: "orange", marginVertical: 10, borderRadius: 15, marginHorizontal: 10 }}>
                    <TextInput style={{ textAlign: "center", fontSize: 30, color: "black", fontFamily: "Futura-CondensedLight" }} value={name} placeholder="name" placeholderTextColor="white" onChangeText={(value) => setName(value)} />
                </View>
                <View style={{ backgroundColor: "orange", marginVertical: 10, borderRadius: 15, marginHorizontal: 10 }}>
                    <TextInput style={{ textAlign: "center", fontSize: 30, color: "black", fontFamily: "Futura-CondensedLight" }} value={phone} placeholder="phone" placeholderTextColor="white" onChangeText={(value) => setPhone(value)} />
                </View>
                <View style={{ backgroundColor: "orange", marginVertical: 10, borderRadius: 15, marginHorizontal: 10 }}>
                    <TextInput style={{ textAlign: "center", fontSize: 30, color: "black", fontFamily: "Futura-CondensedLight" }} value={country} placeholder="country" placeholderTextColor="white" onChangeText={(value) => setCountry(value)} />
                </View>
            </ScrollView>

            <TouchableOpacity onPress={() => handleUpdate()}>
                <View style={styles.iconup}>
                    <Icon name="pencil" style={{ color: "orange" }} size={30} color="#900" />
                </View>
            </TouchableOpacity>

        </View>
    );

}
const styles = StyleSheet.create({
    iconup: {
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
        marginHorizontal: 10,
        textAlign: "center",
        right: 12,
    }
});

export default EditScreen;
