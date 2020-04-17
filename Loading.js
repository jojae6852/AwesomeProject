import React from "react";
import { Button, Text, View, StyleSheet, Systrace } from "react-native";


export default function Loading(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Getting Test</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'flex-end',
        paddingHorizontal:30,
        paddingVertical:100,
    },
    text:{
        fontSize: 30
    }
});
