import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import JournalStack from "./JournalStack";
import SettingsStack from "./SettingsStack";

export type DrawerStackParamList = {
  Journal: undefined;
  Settings: undefined;
};

const DrawerStack = () => {
  const Drawer = createDrawerNavigator<DrawerStackParamList>();
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Journal" component={JournalStack} />
      <Drawer.Screen name="Settings" component={SettingsStack} />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
