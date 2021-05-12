import React, { useState,useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    BackHandler
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
    const [textEmail,setTextEmail]=useState("");
    const [loading, setLoading] = useState(false);
    const [signUp, setSignUp] = useState("");
  
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

    useEffect(() => {
        const backAction = () => {
            props.navigation.navigate("Login")
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
         return () => backHandler.remove();
    }, []);
    
    
    function onChangeName(text) {
        setValidName(false)
        setUserName(text)
      }

    function onChangeEmail(text) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase()) && re.test(String(email).toUpperCase() )) {
            const foundUser = user.filter(item => {
                return String(text).toLowerCase() == item.email
            });
            if(foundUser.length >0){
                    setValidEmail(true)
                    setTextEmail("Email already found")
            }else{
                    setValidEmail(false)
                    setEmail(text)
           }
        } else {
            setValidEmail(true)
            setTextEmail("Enter a valid email")
        }
        setEmail(text)
    }  

    function onChangePassword(text) {
        setValidPassword(false)
        setPassword(text)
    }

    function onChangeConfirmPassword(text){
        if( text == password){
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
        } else if (!email && !password && username && !confirmPassword) {
            setValidEmail(true)
            setValidName(false)
            setValidPassword(true)
            setValidConfirmPassword(true)
        } else if (!password && email && !userName && !confirmPassword) {
            setValidPassword(true)
            setValidEmail(false)
            setValidName(true)
            setValidConfirmPassword(true)
        }else if (password && !email && !userName && !confirmPassword) {
            setValidPassword(false)
            setValidEmail(true)
            setValidName(true)
            setValidConfirmPassword(true)
        }else if (password && email && !userName && !confirmPassword ) {
            setValidPassword(false)
            setValidEmail(false)
            setValidName(true)
            setValidConfirmPassword(true)
        }else if (password && !email && userName && !confirmPassword) {
            setValidPassword(false)
            setValidEmail(true)
            setValidName(false)
            setValidConfirmPassword(true)
        }else if (!password && email && userName && !confirmPassword) {
            setValidPassword(true)
            setValidEmail(false)
            setValidName(false)
            setValidConfirmPassword(true)
        }else if (password && email && userName && !confirmPassword) {
                setValidPassword(false)
                setValidEmail(false)
                setValidName(false)
                setValidConfirmPassword(true)
        }else if((password.length < 5) && (userName.length <= 3)){
            setValidPassword(true)
            setValidName(true)
        }else if((userName.length <= 3) && (!password.length < 5)){
            setValidName(true)
            setValidPassword(false)
        } else if((!userName.length <= 3) && (password.length < 5)){
            setValidName(false)
            setValidPassword(true)
        }else {
            if(password == confirmPassword && !validEmail && !validConfirmPassword && !validName && !validPassword){
            var dataToSend = {
                username: userName,
                email:email,
                password:password};
            let userList=user;
            userList.push(dataToSend);
            AsyncStorage.setItem('userdata',JSON.stringify(userList));
            AsyncStorage.setItem('accCreate','true')
            console.log(userList)
            setSignUp(true)
            setLoading(true)
            setTimeout(() => {
                setLoading(false);
                props.navigation.navigate("Login")
              }, 3000);
        }
        else{
            setSignUp(false)
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
                    (<Text style={styles. validationText}>Enter a name with atleast 4 characters</Text>) 
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
                    (<Text style={styles. validationText}>{textEmail}</Text>) 
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
                    (<Text style={styles. validationText}>Enter a password with atleast 5 characters</Text>) 
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
                {loading ? (
          <ActivityIndicator
            visible={loading}
            color='#1664b8'
            size='large'
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        ) : null}
                   
                </View>
                <View>
                <TouchableOpacity style={styles.registerButton}
                        onPress={gotologin}>
                        <Text style={styles.registerText}>SIGN UP</Text>
                    </TouchableOpacity>
                    {
                            signUp ?
                                (<Text style={styles.validationSignUp}>Registration Success </Text>)
                                :
                                null
                        }
                </View>
                <View>
                    <TouchableOpacity onPress={gotologinn}>
                        <Text style={styles.forgetButton}>IF ALREADY AN ACCOUNT ?</Text>
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
        marginTop: 40,
        marginBottom:5,
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
        marginTop: 40,
        marginBottom: 10,
        color: '#fff'
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
    validationSignUp: {
        color: "#42c202",
        textAlign: 'center',
        marginBottom:20
    },
})