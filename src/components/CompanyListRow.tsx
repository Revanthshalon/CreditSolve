import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  name: string;
  contact: string;
  balance: number;
};

const CompanyListRow = ({ name, contact, balance }: Props) => {
  // Actions Handler

  const editHandler = () => {
    console.log("Edit");
  };

  const deleteHandler = () => {
    console.log("Delete");
  };

  const callHandler = () => {
    console.log("Call");
  };

  const messageHandler = () => {
    console.log("Chat");
  };

  return (
    <View style={styles.rowContainer}>
      <View style={styles.headerContainer}>
        <Text variant="bodyLarge" style={styles.headerLabel}>
          {name}
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text variant="bodyMedium" style={styles.bodyBalanceLabel}>
          Balance:
          {balance.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </Text>
        <View style={styles.bodyActionsContainer}>
          <TouchableOpacity onPress={editHandler}>
            <Ionicons name="ios-pencil" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteHandler}>
            <Ionicons name="ios-trash-bin" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={callHandler}>
            <Ionicons name="ios-call" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={messageHandler}>
            <Ionicons name="ios-chatbox" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CompanyListRow;

const styles = StyleSheet.create({
  rowContainer: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 80,
  },
  headerContainer: {},
  headerLabel: {
    fontWeight: "bold",
  },
  bodyContainer: {
    justifyContent: "space-between",
  },
  bodyBalanceLabel: {},
  bodyActionsContainer: {
    flexDirection: "row",
    gap: 15,
  },
});
