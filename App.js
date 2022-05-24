import { Provider } from "react-redux";
import { store } from "./redux/store";
import React from "react";
import Navigation from "./Navigation";
import { StatusBar } from "expo-status-bar";
import { StatusBar as StatusBarAndroid } from "react-native";
import { FirebaseProvider } from "./hooks/useFirebase";
export default function App() {
  return (
    <Provider store={store}>
      <FirebaseProvider>
        {Platform.OS === "ios" && <StatusBar />}
        {Platform.OS !== "ios" && <StatusBarAndroid />}
        <Navigation />
      </FirebaseProvider>
    </Provider>
  );
}
