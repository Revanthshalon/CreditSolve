import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, DataTable } from "react-native-paper";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import NewPurchaseForm from "./NewPurchaseForm";

type Props = {};

const PurchasesByCompany = (props: Props) => {
  // Navigation
  const nav = useNavigation();
  // New Form Toggle
  const [formVisibility, setFormVisibility] = useState(false);

  // Add Button Handler
  const addHandler = () => {
    setFormVisibility(true);
  };

  return (
    <SafeAreaView style={styles.containerWrapper} edges={["bottom"]}>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              nav.dispatch(StackActions.pop(1));
            }}
          />
          <Appbar.Content title="Purchases List" />
        </Appbar.Header>
        <DataTable style={styles.dataTable}>
          <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title>Purchase Amount</DataTable.Title>
          </DataTable.Header>
        </DataTable>
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
    </SafeAreaView>
  );
};

export default PurchasesByCompany;

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  dataTable: {
    flex: 1,
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
