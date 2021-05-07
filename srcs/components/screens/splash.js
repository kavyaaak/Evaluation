import React, { useEffect } from 'react';
import { View,ImageBackground, SafeAreaView, StyleSheet } from 'react-native';

function SplashScreen({ navigation }) {

    useEffect(() => {
        const timer =
            setTimeout(() => {
                navigation.navigate('Login')
            }, 3000);
        return () => clearTimeout(timer);
    }, []);


    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <ImageBackground
                    style={styles.imageStyle}
                    source={{
                        uri: 'https://i.pinimg.com/originals/22/a4/05/22a405ab79ccf009322258ac9bfc42b7.jpg'
                    }} />
            </SafeAreaView>
        </View>
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    imageStyle: {
        flex: 1
    }

})