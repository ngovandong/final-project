import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";


export default function TopCategory({ navigation })
{
    return (
        <View>
            <Text>Top Category</Text>
            <View style={{ width: "50%", alignItems: "center" }}>
                <Button mode="contained"
                    onPress={() => navigation.navigate("SongList")}>
                    <Text style={{ color: "white" }}>AHIHI</Text>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
