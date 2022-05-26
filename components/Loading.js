import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React from "react";

export default function Loading()
{
    return (
        <View>
            <ActivityIndicator style={styles.indicator} size="large" color="black" />
            <Text style={styles.loadingText}>Loading...</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    indicator: {
        fontSize: 50
    },
    loadingText: {
        marginTop: 10,
        color: "black",
        fontSize: 17
    }
});