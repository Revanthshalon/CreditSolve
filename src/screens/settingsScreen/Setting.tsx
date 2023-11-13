import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useUser } from "@realm/react";

type Props = {};

const Setting = (props: Props) => {
  // Navigation
  const nav = useNavigation();

  // Getting User Context
  const user = useUser();

  // Signout Handler
  const signoutHandler = useCallback(async () => {
    user?.logOut();
  }, [user]);

  return (
    <SafeAreaView edges={["bottom"]} style={styles.containerWrapper}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            nav.dispatch(DrawerActions.openDrawer());
          }}
        />
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={signoutHandler}>
          <Text variant="titleMedium">Logout</Text>
          <Ionicons name="log-out" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  button: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "blacl",
  },
});
