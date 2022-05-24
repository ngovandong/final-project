import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import TopCategory from "./TopCategory";
import SongList from "./SongList";

const Stack = createNativeStackNavigator();

export default function MusicScreen()
{
  return (
    <Stack.Navigator initialRouteName="TopCategory">
      <Stack.Screen name="TopCategory" component={TopCategory} options={{ headerShown: false }} />
      <Stack.Screen name="SongList" component={SongList} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
