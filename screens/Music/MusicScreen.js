import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import CustomHeader from './CustomHeader';
import TopCategory from "./TopCategory";
import SongList from "./SongList";

const Stack = createNativeStackNavigator();

export default function MusicScreen()
{
  return (
    <Stack.Navigator initialRouteName="TopCategory" screenOptions={{ header: CustomHeader }}>
      <Stack.Screen name="TopCategory" component={TopCategory} />
      <Stack.Screen name="SongList" component={SongList} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
