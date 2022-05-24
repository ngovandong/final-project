import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";


export default function TopCategory({ navigation })
{
    return (
        <View>
            <Text>Top Category</Text>
            <Button mode="outlined" onPress={() => navigation.navigate("SongList")}>ahihi</Button>
        </View>
    );
}

const styles = StyleSheet.create({});
