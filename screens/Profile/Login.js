import React, { useState } from "react";
import
{
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useFirebase } from "../../hooks/useFirebase";
import { Appbar } from 'react-native-paper';

const Login = ({ navigation }) =>
{
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useFirebase();
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={{ flex: 0.5 }}>
        <Appbar.Header>
          <Appbar.Content color='white' title="Login" />
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
              login(email, password);
            }}
          >
            <Text style={{ color: "white" }}>Login</Text>
          </Button>
          <Button
            mode="outlined"
            style={{ color: colors.primary, width: 200, borderRadius: 5 }}
            onPress={() =>
            {
              navigation.navigate("Signup");
            }}
          >
            <Text style={{ color: colors.primary }}>Signup</Text>
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
