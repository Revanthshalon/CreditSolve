import React, { useState } from "react";
import {
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar } from "react-native-paper";
import { DrawerActions, useNavigation } from "@react-navigation/core";
import CompanyListRow from "../../../components/CompanyListRow";
import NewCompanyForm from "./NewCompanyForm";
import { Ionicons } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";

const CompanyList = () => {
  // Getting Drawer Navigation Actions
  const nav = useNavigation();
  // Search Text Variable
  const [searchText, setSearchText] = useState("");
  // New Form Toggle
  const [formVisibility, setFormVisibility] = useState(false);

  // Add Button Handler
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
            placeholder="Search Companies"
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
            <TouchableOpacity
              onPress={() => {
                nav.dispatch(
                  StackActions.push("CompanyInfo", { id: "companyid" })
                );
              }}
            >
              <CompanyListRow name="Test" balance={500} contact="123" />
            </TouchableOpacity>
          </View>
          <NewCompanyForm
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

export default CompanyList;

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
