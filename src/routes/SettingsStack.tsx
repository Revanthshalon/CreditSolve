import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Setting from "../screens/settingsScreen/Setting";

export type SettingsStackParamList = {
  Home: undefined;
};
const SettingsStack = () => {
  const Stack = createNativeStackNavigator<SettingsStackParamList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Setting} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
