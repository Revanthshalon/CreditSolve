import {
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerActions, useNavigation } from "@react-navigation/core";
import { Searchbar } from "react-native-paper";
import ListRow from "../../../components/ListRow";
import { Ionicons } from "@expo/vector-icons";
import NewPurchaseForm from "./NewPurchaseForm";

type Props = {};

const PurchaseList = (props: Props) => {
  // Getting Drawer Navigation Actions
  const nav = useNavigation();
  // Search Text Variable
  const [searchText, setSearchText] = useState("");
  // New Form Toggle
  const [formVisibility, setFormVisibility] = useState(false);

  // Add Handler
  const addHandler = () => {
    setFormVisibility(true);
  };

  return (
    <SafeAreaView style={styles.containerWrapper} edges={["top"]}>
      <TouchableWithoutFeedback
        style={styles.containerWrapper}
        onPress={Keyboard.dismiss}
      >
        <View style={styles.container}>
          <Searchbar
            placeholder="Search Purchases"
            value={searchText}
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
              setSearchText(e.nativeEvent.text);
            }}
            icon="menu"
            onIconPress={() => {
              nav.dispatch(DrawerActions.openDrawer());
            }}
          />
          <View style={styles.listContainer}>
            <ListRow name="Company Name" balance={500} date={new Date()} />
          </View>
          <NewPurchaseForm
            visibility={formVisibility}
            setVisibility={() => {
              setFormVisibility((previousState) => !previousState);
            }}
          />
          <TouchableOpacity style={styles.addButton} onPress={addHandler}>
            <Ionicons name="ios-add" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default PurchaseList;

const styles = StyleSheet.create({
  containerWrapper: {
    paddingHorizontal: 5,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  listContainer: {
    marginTop: 10,
  },
  addButton: {
    position: "absolute",
    bottom: 15,
    right: 15,
    backgroundColor: "pink",
    height: 48,
    width: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
