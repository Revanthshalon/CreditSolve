import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/authScreen/Login";
import Register from "../screens/authScreen/Register";
import { PaperProvider } from "react-native-paper";

export type UnAuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

const UnAuthStack = () => {
  const UnAuthStackNav = createNativeStackNavigator<UnAuthStackParamList>();
  return (
    <PaperProvider>
      <NavigationContainer>
        <UnAuthStackNav.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <UnAuthStackNav.Screen name="Login" component={Login} />
          <UnAuthStackNav.Screen name="Register" component={Register} />
        </UnAuthStackNav.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default UnAuthStack;

const styles = StyleSheet.create({});
