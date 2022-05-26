import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";

import { useFirebase } from "../../hooks/useFirebase";
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
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
