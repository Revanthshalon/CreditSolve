import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Button, DataTable, Divider, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import NewPaymentForm from "../paymentScreens/NewPaymentForm";
import NewPurchaseForm from "../purchaseScreens/NewPurchaseForm";

type Props = {};

const CompanyDetails = (props: Props) => {
  // Navigation
  const nav = useNavigation();

  // Toggle Form Visibility
  const [paymentFormVisibility, setPaymentFormVisibility] = useState(false);
  const [purchaseFormVisibility, setPurchaseFormVisibility] = useState(false);

  // Action Handlers
  const deleteHandler = () => {
    console.log("delete");
  };
  const callHandler = () => {
    console.log("Call");
  };
  const messageHandler = () => {
    console.log("Message");
  };
  const purchaseAddHandler = () => {
    setPurchaseFormVisibility(true);
  };
  const paymentAddHandler = () => {
    setPaymentFormVisibility(true);
  };
  return (
    <SafeAreaView style={styles.containerWrapper} edges={["bottom"]}>
      <View style={styles.containerWrapper}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              nav.dispatch(StackActions.pop(1));
            }}
          />
          <Appbar.Content title="Company Details" />
          <Appbar.Action icon="delete" onPress={deleteHandler} />
        </Appbar.Header>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.companyDetails}>
              <Text variant="titleLarge">Company Name</Text>
              <Text variant="bodyMedium">Contact No.</Text>
            </View>
            <View style={styles.balanceDetails}>
              <Text variant="bodyLarge">Balance</Text>
            </View>
            <View style={styles.actionContainer}>
              <View>
                <Button
                  mode="text"
                  onPress={() => {
                    nav.dispatch(
                      StackActions.push("CompanyForm", { id: "test" })
                    );
                  }}
                >
                  EDIT
                </Button>
              </View>
              <View style={styles.linkingContainer}>
                <TouchableOpacity onPress={callHandler}>
                  <Ionicons name="ios-call" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={messageHandler}>
                  <Ionicons name="ios-chatbox" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Divider />
          <View style={styles.tableTitle}>
            <Text variant="bodyLarge">Related Purchases</Text>
          </View>
          <Divider />
          <View style={styles.tableContainer}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Date</DataTable.Title>
                <DataTable.Title>Purchase Amount</DataTable.Title>
              </DataTable.Header>
            </DataTable>
          </View>
          <View style={styles.tableActions}>
            <Button
              mode="text"
              onPress={() => {
                nav.dispatch(StackActions.push("PurchaseByCompany"));
              }}
            >
              VIEW
            </Button>
            <Button mode="text" onPress={purchaseAddHandler}>
              ADD
            </Button>
          </View>
          <NewPurchaseForm
            visibility={purchaseFormVisibility}
            setVisibility={() => {
              setPurchaseFormVisibility((previousState) => !previousState);
            }}
          />
          <Divider />
          <View style={styles.tableTitle}>
            <Text variant="bodyLarge">Related Payments</Text>
          </View>
          <Divider />
          <View style={styles.tableContainer}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Date</DataTable.Title>
                <DataTable.Title>Payment Amount</DataTable.Title>
              </DataTable.Header>
            </DataTable>
          </View>
          <View style={styles.tableActions}>
            <Button
              mode="text"
              onPress={() => {
                nav.dispatch(StackActions.push("PaymentByCompany"));
              }}
            >
              VIEW
            </Button>
            <Button mode="text" onPress={paymentAddHandler}>
              ADD
            </Button>
          </View>
          <NewPaymentForm
            visibility={paymentFormVisibility}
            setVisibility={() => {
              setPaymentFormVisibility((previousState) => !previousState);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CompanyDetails;

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  card: {
    paddingTop: 10,
    paddingHorizontal: 10,
    height: 200,
  },
  companyDetails: {
    paddingBottom: 50,
  },
  balanceDetails: {
    paddingBottom: 30,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  linkingContainer: {
    flexDirection: "row",
    gap: 20,
    paddingRight: 10,
  },
  tableTitle: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tableContainer: {
    height: 165,
  },
  tableActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
