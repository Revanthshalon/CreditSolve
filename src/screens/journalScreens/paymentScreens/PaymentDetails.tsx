import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Button, Dialog, Portal, Text } from "react-native-paper";
import {
  NavigationProp,
  RouteProp,
  StackActions,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamsList } from "../../../routes/NativeStack";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import realmContext from "../../../data/dbContext";
import { useUser } from "@realm/react";
import Payment from "../../../models/Payment";
import Company from "../../../models/Company";

type Props = {};

const PaymentDetails = (props: Props) => {
  // Refresh Page
  const isFocused = useIsFocused();
  useEffect(() => {}, [isFocused]);

  // Realm Db
  const { useRealm, useQuery } = realmContext;
  const realm = useRealm();
  const user = useUser();

  // Get Navigation Methods
  const route = useRoute<RouteProp<RootStackParamsList, "PaymentInfo">>();
  const nav =
    useNavigation<NavigationProp<RootStackParamsList, "PaymentInfo">>();

  // Payment Details
  const paymentInfo = realm.objectForPrimaryKey(Payment, route.params.id);
  const companyInfo = realm.objectForPrimaryKey(
    Company,
    new Realm.BSON.ObjectId(paymentInfo?.c_id)
  );

  // Toggle Variables
  const [alertVisibility, setAlertVisibility] = useState(false);

  // Action Handlers
  const deleteAlertHandler = () => {
    setAlertVisibility(true);
  };

  const cancelAlert = () => {
    setAlertVisibility(false);
  };

  const deleteHandler = useCallback(() => {
    const payment = realm.objectForPrimaryKey(Payment, route.params.id);
    if (payment) {
      realm.write(() => {
        realm.delete(payment);
      });
      nav.dispatch(StackActions.pop(1));
    }
  }, [realm, paymentInfo]);

  return (
    <SafeAreaView style={styles.containerWrapper} edges={["bottom"]}>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              nav.dispatch(StackActions.pop(1));
            }}
          />
          <Appbar.Content title="Payment Details" />
          <Appbar.Action icon="delete" onPress={deleteAlertHandler} />
        </Appbar.Header>
        <Portal>
          <Dialog visible={alertVisibility}>
            <Dialog.Title>Delete Payment Details?</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                This action will delete payment details. Proceed with Deletion?
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
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => {
              nav.dispatch(
                StackActions.push("CompanyInfo", { id: companyInfo?._id })
              );
            }}
            style={styles.companyInfo}
          >
            <View>
              <Text variant="bodySmall">Company Name</Text>
              <Text variant="titleMedium">{companyInfo?.name}</Text>
            </View>

            <View>
              <Ionicons name="chevron-forward" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <View>
            <Text variant="bodySmall">Date</Text>
            <Text variant="titleMedium">
              {paymentInfo?.date.toDateString()}
            </Text>
          </View>
          <View>
            <Text variant="bodySmall">Payment Amount</Text>
            <Text variant="titleMedium">{paymentInfo?.amount}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            nav.dispatch(
              StackActions.push("PaymentForm", { id: paymentInfo?._id })
            );
          }}
        >
          <Feather name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentDetails;

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  card: {
    gap: 20,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  companyInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    position: "absolute",
    bottom: 20,
    right: 40,
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
  },
});
