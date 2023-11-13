import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Appbar,
  Button,
  DataTable,
  Dialog,
  Divider,
  Portal,
  Text,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import NewPaymentForm from "../paymentScreens/NewPaymentForm";
import NewPurchaseForm from "../purchaseScreens/NewPurchaseForm";
import { RootStackParamsList } from "../../../routes/NativeStack";
import realmContext from "../../../data/dbContext";
import { useUser } from "@realm/react";
import Company from "../../../models/Company";

type Props = {};

const CompanyDetails = (props: Props) => {
  // React DB Context
  const { useRealm, useQuery } = realmContext;
  const realm = useRealm();
  const user = useUser();

  // Navigation
  const nav = useNavigation();
  const route = useRoute<RouteProp<RootStackParamsList, "CompanyInfo">>();

  // Get Company Details
  const company = realm.objectForPrimaryKey(Company, route.params.id);

  // Toggle Form Visibility
  const [paymentFormVisibility, setPaymentFormVisibility] = useState(false);
  const [purchaseFormVisibility, setPurchaseFormVisibility] = useState(false);
  const [alertVisibility, setAlertVisibility] = useState(false);

  // Action Handlers
  const confirmDelete = () => {
    setAlertVisibility(true);
  };
  const callHandler = () => {
    Linking.openURL(`tel:${company?.contact}`);
  };
  const messageHandler = () => {
    Linking.openURL(`whatsapp://send?text=Hi&phone=${company?.contact}`);
  };
  const purchaseAddHandler = () => {
    setPurchaseFormVisibility(true);
  };
  const paymentAddHandler = () => {
    setPaymentFormVisibility(true);
  };
  const cancelAlert = () => {
    setAlertVisibility(false);
  };
  const deleteHandler = useCallback(() => {
    const company = realm.objectForPrimaryKey(Company, route.params.id);
    if (company) {
      realm.write(() => {
        realm.delete(company);
      });
    }
    nav.dispatch(StackActions.pop(1));
  }, [realm, company]);

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
          <Appbar.Action icon="delete" onPress={confirmDelete} />
        </Appbar.Header>
        <Portal>
          <Dialog visible={alertVisibility}>
            <Dialog.Title>Delete Company?</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                Are you sure to delete the company details along with its
                purchase/payment history?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button mode="text" onPress={cancelAlert}>
                Cancel
              </Button>
              <Button mode="contained" onPress={deleteHandler}>
                Delete
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.companyDetails}>
              <Text variant="titleLarge">{company?.name}</Text>
              <Text variant="bodyMedium">{company?.contact}</Text>
            </View>
            <View style={styles.balanceDetails}>
              <Text variant="bodyLarge">
                {company?.balance.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </Text>
            </View>
            <View style={styles.actionContainer}>
              <View>
                <Button
                  mode="text"
                  onPress={() => {
                    nav.dispatch(
                      StackActions.push("CompanyForm", { id: route.params.id })
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
