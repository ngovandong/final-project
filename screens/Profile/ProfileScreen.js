import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";

import { useFirebase } from "../../hooks/useFirebase";
import CustomHeader from './CustomHeader';
import Logined from "./Logined";
import Signup from "./Signup";
import Login from "./Login";

const Stack = createNativeStackNavigator();

export default function ProfileScreen()
{
  const { isLogined } = useFirebase();
  return isLogined ? (
    <Logined />
  ) : (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ header: CustomHeader }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
