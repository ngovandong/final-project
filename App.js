import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { StatusBar as StatusBarAndroid } from "react-native";
import { FirebaseProvider } from "./hooks/useFirebase";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import Navigation from "./Navigation";
import { store } from "./redux/store";
import React from "react";
import ErrorModal from "./modals/ErrorModal";
import SuccessModal from "./modals/SuccessModal";
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2ea9ed",
    accent: "#fad543",
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <FirebaseProvider>
          <ErrorModal />
          <SuccessModal />
          {Platform.OS === "ios" && <StatusBar />}
          {Platform.OS !== "ios" && <StatusBarAndroid />}
          <Navigation />
        </FirebaseProvider>
      </PaperProvider>
    </Provider>
  );
}
