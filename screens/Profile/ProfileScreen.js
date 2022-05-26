import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";

import Login from "./Login";
import { useFirebase } from "../../hooks/useFirebase";
import Logined from "./Logined";
import Signup from "./Signup";

const Stack = createNativeStackNavigator();

export default function ProfileScreen() {
  const { isLogined } = useFirebase();
  return isLogined ? (
    <Logined />
  ) : (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
