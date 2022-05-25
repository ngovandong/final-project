import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import React from "react";

export default function SongList()
{
    const { songs } = useSelector(state => state.music);

    return (
        <View>
            {
                songs.length > 0 &&
                songs.map((s, idx) => (<Text key={idx}>{s.title}</Text>))
            }
        </View>
    );
}

const styles = StyleSheet.create({});
