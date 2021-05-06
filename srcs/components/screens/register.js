import React, { useState,useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet, Image, Button
} from 'react-native';
import { Icon } from 'react-native-elements';
import Users from '../constants/user';

import AsyncStorage from '@react-native-community/async-storage';
const RegisterScreen = (props) => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [validName, setValidName] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [user,setUser]=useState("");
   
  
    useEffect(() => {
        AsyncStorage.getItem('accCreate').then(
            (value) => {
                if (value == 'true') {
                    console.log('asyncccc', value)
                    AsyncStorage.getItem('userdata').then(
                        (value) => {
                            let data = JSON.parse(value)
                            setUser(data)
                            console.log(value)
                        })
                    }
                else {
                    setUser(Users)
                }
            }
        );
    }, []);


    function onChangeName(text) {
        setValidName(false)
        setUserName(text)
      }

    function onChangeEmail(text) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase())) {
            setValidEmail(false)
            setEmail(text)
        } else {
            setValidEmail(true)
        }
        setEmail(text)
    }  

    function onChangePassword(text) {
        setValidPassword(false)
        setPassword(text)
    }

    function onChangeConfirmPassword(text){
          if( text== password){
           setValidConfirmPassword(false)
           setConfirmPassword(text)
           console.log('ok')
          }else {
            setValidConfirmPassword(true)
       }
       setConfirmPassword(text)
      }

     
    const gotologin = () => {
        if (!userName && !email && !password && !confirmPassword) {
            setValidName(true)
            setValidEmail(true)
            setValidPassword(true)
            setValidConfirmPassword(true)
        } else if (!email && !password && username) {
            setValidEmail(true)
            setValidName(false)
            setValidPassword(true)
        } else if (!password && email && !userName) {
            setValidPassword(true)
            setValidEmail(false)
            setValidName(true)
        }else if (password && !email && !userName) {
            setValidPassword(false)
            setValidEmail(true)
            setValidName(true)
        }else if (password && email && !userName) {
            setValidPassword(false)
            setValidEmail(false)
            setValidName(true)
        }else if (password && !email && userName) {
            setValidPassword(false)
            setValidEmail(true)
            setValidName(false)
        }else if (!password && email && userName) {
            setValidPassword(true)
            setValidEmail(false)
            setValidName(false)
        }
        else {
            if(validPassword == validConfirmPassword){
            var dataToSend = {
                username: userName,
                email:email,
                password:password};
            let userList=user;
            userList.push(dataToSend);
            AsyncStorage.setItem('userdata',JSON.stringify(userList));
            AsyncStorage.setItem('accCreate','true')
            console.log(userList)
            props.navigation.navigate("Login")
        }
        }
    }

    const gotologinn = () => {
        props.navigation.navigate("Login")
    }
   
   
    return (
        <View style={styles.mainView}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Create Account</Text>
            </View>
            <View style={styles.footer}>
                <View>
                    <TextInput
                        style={styles.inputView}
                        placeholder="Name"
                        onChangeText={(value) => { onChangeName(value) }}
                    />
                    {
                    validName ? 
                    (<Text style={styles. validationText}>Enter a name</Text>) 
                    : 
                    null
                    }
                </View>
                <View>
                    <TextInput
                        style={styles.inputView}
                        placeholder="Email"
                        onChangeText={(value) => { onChangeEmail(value) }}
                    />
                    {
                    validEmail ? 
                    (<Text style={styles. validationText}>Enter a valid email</Text>) 
                    : 
                    null
                    }
                    
                </View>
                <View style={styles.passwordView}>
                <View  style={{ flex: 1}}> 
                    <TextInput
                        style={styles.passwordTextInput}
                        placeholder=" Enter Password"
                        secureTextEntry={!showPassword}
                        onChangeText={(value) => { onChangePassword(value) }}
                    />
                    {
                    validPassword ? 
                    (<Text style={styles. validationText}>Enter a password</Text>) 
                    : 
                    null
                    }
                </View>
                <TouchableOpacity
                        onPress={() => {
                            setShowPassword(!showPassword);
                        }}>
                        <Icon
                            style={styles.passwordIcon}
                            name='eye'
                            type='font-awesome'
                            color='black'
                            size={22}
                        />
                    </TouchableOpacity>
                    </View>
                <View>
                    <TextInput
                        style={styles.inputView}
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        onChangeText={(value) => { onChangeConfirmPassword(value) }}
                    />
                    {
                    validConfirmPassword ?
                    (<Text style={styles. validationText}>Password doesn't match</Text>)
                    : 
                    null
                    }
                </View>
                <View>
                    <TouchableOpacity style={styles.registerButton}
                        onPress={gotologin}>
                        <Text style={styles.registerText}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={gotologinn}>
                        <Text style={styles.forgetButton}>if already an account?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}





export default RegisterScreen;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: "#121212",
      
    },
    inputView:
    {
        height: 60,
        backgroundColor: "#ada7a6",
        marginTop: 20,
        paddingLeft: 20,
        marginLeft: 30,
        marginRight: 30
    },
    header:
    {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    textHeader: {
        color: '#ed8026',
        fontWeight: 'bold',
        fontSize: 30
    },
    footer: {
        flex: 7
    },
    passwordView:
    {
        flexDirection: 'row'
    },
    passwordTextInput:{
        height: 60,
        backgroundColor: "#ada7a6",
        marginTop: 20,
        paddingLeft: 20,
        marginLeft: 30,
    },
    passwordIcon: {
        paddingHorizontal: 20, height: 60,
        backgroundColor: "#ada7a6",
        marginTop: 20,
        justifyContent: 'center',
        marginRight: 30,
    },
    validationText:{
        color: "#ff121a",
        paddingLeft: 40 
    },
    
    registerButton:
    {
        width: "40%",
        height: 50,
        justifyContent: "center",
        marginTop: 60,
        marginBottom: 20,
        backgroundColor: "#26ab92",
        alignSelf: "center",
        borderRadius: 8
    },
    registerText:
    {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center"
    },
    forgetButton:
    {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 10,
        color: '#fff'
    },
})