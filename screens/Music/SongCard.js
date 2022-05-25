import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function SongCard({ song })
{
    return (
        <Text>{song.title}</Text>
    );
}

const styles = StyleSheet.create({});
