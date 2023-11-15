import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, DataTable } from "react-native-paper";
import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import NewPurchaseForm from "./NewPurchaseForm";
import { RootStackParamsList } from "../../../routes/NativeStack";
import realmContext from "../../../data/dbContext";
import { useUser } from "@realm/react";
import Purchase from "../../../models/Purchase";

type Props = {};

const PurchasesByCompany = (props: Props) => {
  // Navigation
  const nav = useNavigation();
  const route = useRoute<RouteProp<RootStackParamsList, "PurchaseByCompany">>();

  // Realm DB Context
  const { useRealm, useQuery } = realmContext;
  const realm = useRealm();
  const user = useUser();

  // Purchase List
  const purchaseList = useQuery(Purchase)
    .filtered(`c_id == "${route.params.id}"`)
    .sorted("date", false);

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
          <FlatList
            data={purchaseList}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => {
              return (
                <DataTable.Row>
                  <DataTable.Cell>{item.date.toDateString()}</DataTable.Cell>
                  <DataTable.Cell>
                    {item.amount.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </DataTable.Cell>
                </DataTable.Row>
              );
            }}
          />
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
