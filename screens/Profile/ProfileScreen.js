import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import LoginScreen from "./LoginScreen";
import { useFirbase } from "../../hooks/useFirebase";
import Logined from "./Logined";

export default function ProfileScreen() {
  const { isLogined } = useFirbase();
  return (
    <View style={{ flex: 1 }}>
      {isLogined && <Logined />}
      {!isLogined && <LoginScreen />}
    </View>
  );
}

const styles = StyleSheet.create({});
