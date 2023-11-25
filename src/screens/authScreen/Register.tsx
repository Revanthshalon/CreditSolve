import Realm from "realm";
import {
  Alert,
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, TextInput } from "react-native-paper";
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import { useApp } from "@realm/react";
import { UnAuthStackParamList } from "../../routes/UnAuthStack";

const Register = () => {
  // App Context for Realm
  const app = useApp();

  // Navigation
  const nav = useNavigation<NavigationProp<UnAuthStackParamList, "Register">>();

  // Form input variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Toggle Password Visibility
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(true);

  // Action Handlers
  const formClear = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPasswordVisibility(true);
    setConfirmPasswordVisibility(true);
  };

  const signIn = useCallback(async () => {
    const creds = Realm.Credentials.emailPassword({ email, password });
    await app.logIn(creds);
  }, [app, email, password]);

  const registerHandler = useCallback(async () => {
    if (password === confirmPassword) {
      try {
        await app.emailPasswordAuth.registerUser({ email, password });
        await signIn();
        formClear();
      } catch (error: any) {
        Alert.alert(`Failed to Register: ${error?.message}`);
      }
    } else {
      Alert.alert("Passwords don't match");
    }
  }, [signIn, app, email, password]);
  const loginHandler = () => {
    nav.dispatch(StackActions.pop(1));
    formClear();
  };

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={styles.containerWrapper}
    >
      <SafeAreaView style={styles.containerWrapper}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text variant="displayLarge" style={styles.headerLabel}>
              Register
            </Text>
          </View>
          <View style={styles.formContainer}>
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
            <TextInput
              label="Confirm Password"
              placeholder="Re-Enter Password"
              value={confirmPassword}
              autoCapitalize="none"
              secureTextEntry={confirmPasswordVisibility}
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                setConfirmPassword(e.nativeEvent.text);
              }}
              right={
                <TextInput.Icon
                  icon="eye"
                  onPress={() => {
                    setConfirmPasswordVisibility(
                      (previousState) => !previousState
                    );
                  }}
                />
              }
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={registerHandler}>
              Register
            </Button>
            <Button mode="outlined" onPress={loginHandler}>
              Already have an Account? Login
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Register;

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 80,
  },
  headerLabel: {},
  inputContainer: {
    gap: 20,
  },
  buttonContainer: {},
  button: {},
  formContainer: {
    flex: 1,
    gap: 20,
  },
});
