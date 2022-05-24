import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

export default function MusicScreen()
{
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={{ marginTop: 100, alignSelf: "center" }}>Music</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
