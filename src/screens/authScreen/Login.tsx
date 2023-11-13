import Realm from "realm";
import {
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, TextInput } from "react-native-paper";
import { useApp } from "@realm/react";

const Login = () => {
  // Realm App Context
  const app = useApp();

  // Navigation
  const nav = useNavigation();

  // Form input variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Toggle Password Visibility
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  // Action Handlers
  const formClear = () => {
    setEmail("");
    setPassword("");
    setPasswordVisibility(true);
  };
  const registerHandler = () => {
    nav.dispatch(StackActions.replace("Register"));
    formClear();
  };
  const loginHandler = useCallback(async () => {
    const creds = Realm.Credentials.emailPassword({ email, password });
    await app.logIn(creds);
    formClear();
  }, [app, email, password]);

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={styles.containerWrapper}
    >
      <SafeAreaView style={styles.containerWrapper}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text variant="titleLarge" style={styles.headerLabel}>
              Register
            </Text>
          </View>
          <View>
            <TextInput
              label="Email"
              placeholder="Email"
              value={email}
              autoCapitalize="none"
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                setEmail(e.nativeEvent.text);
              }}
            />
            <TextInput
              label="Password"
              placeholder="Password"
              value={password}
              autoCapitalize="none"
              secureTextEntry={passwordVisibility}
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                setPassword(e.nativeEvent.text);
              }}
              right={
                <TextInput.Icon
                  icon="eye"
                  onPress={() => {
                    setPasswordVisibility((previousState) => !previousState);
                  }}
                />
              }
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={loginHandler}>
              Login
            </Button>
            <Button mode="outlined" onPress={registerHandler}>
              Don't have an Account? Register
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {},
  headerLabel: {},
  inputContainer: {
    gap: 20,
  },
  buttonContainer: {},
  button: {},
});
