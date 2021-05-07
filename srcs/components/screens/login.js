
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,BackHandler, Alert, ActivityIndicator
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { connect } from 'react-redux';
import { storeUserData } from '../../redux/action/userAction';
import { Icon } from 'react-native-elements';
import Users from '../constants/user';
import AsyncStorage from '@react-native-community/async-storage';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signIn, setSignIn] = useState(false);
   

    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState("");
    const [loading, setLoading] = useState(false);

    const isFocused = useIsFocused()
    useEffect(() => {
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to exit app?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "Exit", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {

        AsyncStorage.getItem('accCreate').then(
            (value) => {
                if (value == 'true') {
                    console.log('asyncccc', value)
                    AsyncStorage.getItem('userdata').then(
                        (value) => {
                            let data = JSON.parse(value)
                            setUserData(data)
                            console.log(value)
                        })

                }
                else {
                    setUserData(Users)
                }
            }
        );
    }, [isFocused]);


    const gotohome = () => {
        if (!email && !password) {
            setValidEmail(true)
            setValidPassword(true)
        } else if (!email && password) {
            setValidEmail(true)
            setValidPassword(false)
        } else if (email && !password) {
            setValidEmail(false)
            setValidPassword(true)
        } else {
            const foundUser = userData.filter(item => {
                return email == item.email && password == item.password
            });
            // console.log(foundUser)
            if (foundUser.length > 0) {
                const userDetails = foundUser.filter(item => {
                    props.storeUserData(item.username)
                })
                setSignIn(false)
                setLoading(true)
                setTimeout(() => {
                    setLoading(false);
                    props.navigation.navigate("Home")
                }, 3000);
            } else {
                setSignIn(true)
            }
        }
    }

    const gotoregister = () => {
        props.navigation.navigate("register")
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
   
    return (
        <View style={styles.mainView}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Sign in to Continue</Text>
            </View>
            <View style={styles.footer}>
                <View >
                    <TextInput
                        style={styles.inputView}
                        placeholder="Email"
                        value={email}
                        onChangeText={(value) => { onChangeEmail(value) }}
                    />
                    {
                        validEmail ?
                            (<Text style={styles.validationText}>Enter a valid email</Text>)
                            :
                            null
                    }
                </View>

                <View style={styles.passwordView}>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            style={styles.passwordTextInput}
                            placeholder="Password"
                            secureTextEntry={!showPassword}
                            onChangeText={(value) => { onChangePassword(value) }}
                        />
                        {
                            validPassword ?
                                (<Text style={styles.validationText}>Enter a password</Text>)
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
                    <TouchableOpacity>
                        <Text style={styles.forgetButton}>Forget Your Password ?</Text>
                    </TouchableOpacity>
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
                    ) :
                        null
                    }
                    <View>
                        <TouchableOpacity style={styles.loginButton}
                            onPress={gotohome}>
                            <Text style={styles.loginText}>SIGN IN</Text>
                        </TouchableOpacity>
                        {
                            signIn ?
                                (<Text style={styles.validationSignin}>Invalid login </Text>)
                                :
                                null
                        }
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={gotoregister}>
                        <Text style={styles.forgetButton}>IF NEW USER ? CREATE AN ACCOUNT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}



function mapStateToProps(state) {
    return {
        getUserName: state.userStore

    }

}

function mapDispatchToProps(dispatch) {
    return {
        storeUserData: (items) => { dispatch(storeUserData(items)) }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: "#121212",
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
        flex: 4
    },
    validationText: {
        color: "#ff121a",
        paddingLeft: 40
    },
    validationSignin: {
        color: "#ff121a",
        textAlign: 'center'
    },
    inputView:
    {
        height: 60,
        backgroundColor: "#ada7a6",
        marginTop: 40,
        paddingLeft: 20,
        marginLeft: 30,
        marginRight: 30,
    },
    passwordView:
    {
        flexDirection: 'row'
    },
    passwordTextInput:
    {
        height: 60,
        backgroundColor: "#ada7a6",
        marginTop: 40,
        paddingLeft: 20,
        marginLeft: 30,
    },
    passwordIcon: {
        paddingHorizontal: 20, height: 60,
        backgroundColor: "#ada7a6",
        marginTop: 40,
        justifyContent: 'center',
        marginRight: 30,
    },
    forgetButton:
    {
        textAlign: "center",
        marginTop: 60,
        marginBottom: 10,
        color: '#fff'
    },
    loginButton:
    {
        width: "40%",
        height: 50,
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 10,
        backgroundColor: "#26ab92",
        alignSelf: "center",
        borderRadius: 8
    },
    loginText:
    {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center"
    }

})