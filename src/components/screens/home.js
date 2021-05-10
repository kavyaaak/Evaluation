import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Button,
    Modal,
    BackHandler,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import { storeProductData } from '../../redux/action/productAction';
import { Icon } from 'react-native-elements';
import Products from '../constants/productlist';
import AsyncStorage from '@react-native-community/async-storage';

function HomeScreen(props) {
    const [listData, setListData] = useState("");
    const [showModal, setShowModal] = useState(false);

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


    console.log("propsssDetails", props.getProductDetails)

useEffect(()=>{
    AsyncStorage.getItem('favoriteList1').then(
        (value) => {
            if (value == 'true') {
                console.log('favoritessss', value)
                AsyncStorage.getItem('productdata').then(
                    (value) => {
                        let data = JSON.parse(value)
                        setListData(data)
                    })
                }
            else {
                setListData(Products)
            }
        }
    );
}, []);


    const changeItem = (index) => {
        let list = [...listData];
        list[index].favorite = !list[index].favorite;
        //console.log("dataaaa", list)
        setListData(list);
        AsyncStorage.setItem('productdata',JSON.stringify(list));
        AsyncStorage.setItem('favoriteList1','true')
    }


    const gotoDetails = () => {
        let newList = [];
        let listItem = listData.filter((item) => {
            // console.log("listt", item)
            return item.favorite == true

        })
        newList.push(listItem);
        console.log("%%listitem", listItem)

        if (listItem.length == 0) {
            alert("Please add items");
        }
        else {
            props.storeProductData(listItem);
            setShowModal(!showModal);
        }

    }

    const renderList = (data) => {
        //console.log("**itemmm", data)
        return (
            // <Swipeable
            //     renderRightActions={rightSwipe}
            //     renderLeftActions={leftSwipe}>
                <View style={styles.listMainView}>
                    <View style={{ flex: 0.8, paddingLeft: 20 }}>
                        <Text style={{ color: "#fff" }}>{data.item.name}</Text>
                        <Text style={{ color: '#f0c03e', paddingTop: 2 }}>${data.item.price}</Text>
                    </View>
                    <View style={{ flex: 0.2, alignItems: 'center' }}>
                        {
                            console.log("itemmmmmmm", data.item.favorite)
                        }

                        {
                            !data.item.favorite ?
                                <TouchableOpacity
                                    onPress={() => { changeItem(data.index) }}>
                                    <Icon

                                        style={styles.iconStyle}
                                        name='heart'
                                        type='font-awesome'
                                        color='white'
                                        size={22}
                                    />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={() => { changeItem(data.index) }}>
                                    <Icon

                                        style={styles.iconStyle}
                                        name='heart'
                                        type='font-awesome'
                                        color='red'
                                        size={22}
                                    />
                                </TouchableOpacity>
                        }

                    </View>
                </View>
            // </Swipeable>
        )
    }

    const renderItems = (data) => {
        console.log("**itemmm", data.item)
        return (

            <View>
                <View style={styles.modalItemView}>
                    <Text>{data.item.name}</Text>
                    <Text style={styles.modalText}>${data.item.price}</Text>
                </View>

            </View>
        )
    }

    return (
        <View style={styles.mainView}>
            <View style={styles.header}>
                <Text style={styles.usernameStyle}>{props.getUserName.userData}</Text>
            </View>
            <View style={styles.productTextView}>
                <View style={styles.productView} >
                    <Text style={styles.productText}>Product Lists</Text>
                </View>
                <View style={styles.favoriteView}>
                    <View>
                        <TouchableOpacity style={styles.favoriteButton}
                            onPress={gotoDetails}>
                            <Text style={styles.favoriteText}>Favorites</Text>
                            <Icon
                                style={styles.favoriteIcon}
                                name='heart'
                                type='font-awesome'
                                color='red'
                                size={22}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ flex: 0.9 }}>
                <FlatList style={{ marginTop: 20 }}
                    data={listData}
                    renderItem={renderList}
                    keyExtractor={(item, index) => index.toString()}

                />
            </View>
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    console.log('Modal has been closed.');
                }}>

                <View style={styles.modalView}>

                    <FlatList style={{ marginTop: 10 }}
                        data={props.getProductDetails.productData}
                        renderItem={renderItems}
                        keyExtractor={item => item.id}
                    />
                    <Button
                        color='#071c3d'
                        title="OK"
                        onPress={() => {
                            setShowModal(!showModal);
                            props.navigation.navigate('Home')

                        }}
                    />
                </View>
            </Modal>
        </View>
    );
}


function mapStateToProps(state) {
    return {
        getProductDetails: state.productStore,
        getUserName: state.userStore
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeProductData: (n) => { dispatch(storeProductData(n)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);



const styles = StyleSheet.create({
    listMainView: {
        height: 60,
        flexDirection: 'row',
        borderBottomWidth: 1,
        alignItems: "center"
    },


    modalView: {
        flex: 0.8,
        position: 'absolute',
        bottom: 0,
        backgroundColor: "#fff",
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        width: '100%'
    },
    header: {
        height: 50,
        width: '100%',
        alignSelf: 'center',
        paddingTop: 10,
        backgroundColor: "#acb5c2",
        paddingLeft: 20
    },
    mainView: {
        backgroundColor: '#121212',
        flex: 1
    },
    iconStyle: {
        alignItems: 'flex-end'
    },
    modalItemView: {
        flex: 0.6,
        paddingLeft: 10,
        paddingBottom: 6
    },
    modalText:
    {
        color: '#ab8209',
        paddingTop: 2
    },
    usernameStyle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    productView: {
        flex: 0.8
    },
    productTextView: {
        flexDirection: 'row'
    },
    productText: {
        alignItems: 'flex-start',
        color: '#6b9ded',
        paddingLeft: 20,
        paddingTop: 30,
        fontSize: 25
    },
    favoriteView: {
        flex: 0.3
    },
    favoriteButton: {
        backgroundColor: '#fcba03',
        width: "80%",
        height: 40,
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 20,
        flexDirection: 'row'
    },
    favoriteText: {
        textAlign: 'center',
        color: '#fff',
        alignSelf: 'center'
    },
    favoriteIcon:
    {
        paddingHorizontal: 6,
        marginTop: 5
    },
    leftAction: {
        flex: 1,
        backgroundColor: 'cyan',
        justifyContent: 'center',
    },
    actionText: {
        color: 'black',
        fontSize: 16,
    },
    rectButton: {
        width: '100%',
        height: 80,
        backgroundColor: 'blue',
    }

}
)