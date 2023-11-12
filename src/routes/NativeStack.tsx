import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerStack from "./DrawerStack";

export type RootStackParamsList = {
  Home: undefined;
};

const NativeStack = () => {
  const Stack = createNativeStackNavigator<RootStackParamsList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={DrawerStack} />
    </Stack.Navigator>
  );
};

export default NativeStack;

const styles = StyleSheet.create({});
