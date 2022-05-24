import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

export default function ProfileScreen()
{
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={{ marginTop: 100, alignSelf: "center" }}>Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
