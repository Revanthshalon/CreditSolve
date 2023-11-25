import React, { useCallback, useState } from "react";
import Realm from "realm";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import realmContext from "../data/dbContext";
import { useUser } from "@realm/react";
import Company from "../models/Company";
import { StackActions, useNavigation } from "@react-navigation/native";

type Props = {
  id: Realm.BSON.ObjectId;
  name: string;
  contact: string;
  balance: number;
};

const CompanyListRow = ({ id, name, contact, balance }: Props) => {
  // Navigation
  const nav = useNavigation();

  // Realm DB
  const { useRealm, useQuery } = realmContext;
  const realm = useRealm();
  const user = useUser();

  // Alert Toggle
  const [showAlert, setShowAlert] = useState(false);

  // Actions Handler
  const editHandler = () => {
    nav.dispatch(StackActions.push("CompanyForm", { id: id }));
  };

  const showDeleteAlert = () => {
    setShowAlert(true);
  };

  const deleteHandler = useCallback(() => {
    // Retrieve Company Object
    const company = realm.objectForPrimaryKey(Company, id);
    realm.write(() => {
      realm.delete(company);
    });
    setShowAlert(false);
  }, [realm, user]);

  const callHandler = () => {
    Linking.openURL(`tel:${contact}`);
  };

  const messageHandler = () => {
    Linking.openURL(`whatsapp://send?text=Hi&phone=${contact}`);
  };

  return (
    <View style={styles.rowContainer}>
      <Portal>
        <Dialog visible={showAlert}>
          <Dialog.Title>Delete Company?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure to delete the company details along with its
              purchase/payment history?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode="text"
              onPress={() => {
                setShowAlert(false);
              }}
            >
              Cancel
            </Button>
            <Button mode="contained" onPress={deleteHandler}>
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
          <TouchableOpacity onPress={showDeleteAlert}>
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
    marginBottom: 10,
  },
  headerContainer: {},
  headerLabel: {
    fontWeight: "bold",
  },
  bodyContainer: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  bodyBalanceLabel: {},
  bodyActionsContainer: {
    flexDirection: "row",
    gap: 15,
  },
});
