import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import React, { useState } from "react";
import { useFirebase } from "../../hooks/useFirebase";
import { Appbar } from 'react-native-paper';
import { styles } from "./Login";

const Signup = ({ navigation }) =>
{
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup } = useFirebase();
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={{ flex: 0.5 }}>
        <Appbar.Header>
          <Appbar.BackAction color='white' onPress={navigation.goBack} />
          <Appbar.Content color='white' title="Sign Up" />
        </Appbar.Header>
      </View>

      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={{ width: 200, borderRadius: 5, marginBottom: 10 }}
            onPress={() =>
            {
              signup(email, password);
            }}
          >
            <Text style={{ color: "white" }}>Signup</Text>
          </Button>
          <Button
            mode="outlined"
            style={{ color: colors.primary, width: 200, borderRadius: 5 }}
            onPress={() =>
            {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ color: colors.primary }}>Login</Text>
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;
