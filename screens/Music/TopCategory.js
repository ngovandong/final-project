import { StyleSheet, Text, View } from "react-native";
import { formatTop } from "../../helpers/extension";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import React, { useState } from "react";


export default function TopCategory({ navigation })
{
    const { top_category } = useSelector(state => state.music);

    return (
        <View>
            <Text>Top Category</Text>
            <View style={{ width: "50%", alignItems: "center" }}>
                <Button mode="contained"
                    onPress={() => navigation.navigate("SongList")}>
                    <Text style={{ color: "white" }}>AHIHI</Text>
                </Button>
                {
                    top_category.map((tc, idx) => <Text key={idx}>{formatTop(tc.top)}</Text>)
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
