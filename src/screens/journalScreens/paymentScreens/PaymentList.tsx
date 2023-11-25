import {
  FlatList,
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerActions, useNavigation } from "@react-navigation/core";
import { Searchbar } from "react-native-paper";
import ListRow from "../../../components/ListRow";
import { Ionicons } from "@expo/vector-icons";
import NewPaymentForm from "./NewPaymentForm";
import { StackActions } from "@react-navigation/native";
import realmContext from "../../../data/dbContext";
import { useUser } from "@realm/react";
import Payment from "../../../models/Payment";
import Company from "../../../models/Company";

type Props = {};

const PaymentList = (props: Props) => {
  // Realm DB
  const { useRealm, useQuery } = realmContext;
  const realm = useRealm();
  const user = useUser();

  // Getting Payment Details
  const Payments = useQuery(Payment)
    .filtered(`u_id == "${user?.id.toString()}"`)
    .sorted("date", true);

  const Companies = useQuery(Company)
    .filtered(`_uid == "${user?.id.toString()}"`)
    .sorted("_id");

  const enrichedPayments = Payments.map((item) => {
    return {
      ...item,
      name: realm.objectForPrimaryKey(
        Company,
        new Realm.BSON.ObjectId(item.c_id)
      ),
    };
  });

  // Change the Companies list if the user is changed
  useEffect(() => {
    realm.subscriptions.update((mutableSubs) =>
      mutableSubs.add(Payments, { name: "UserSubscriptions" })
    );
  }, [user]);

  // Getting Drawer Navigation Actions and Params
  const nav = useNavigation();

  // Search Text Variable
  const [searchText, setSearchText] = useState("");
  // New Form Toggle
  const [formVisibility, setFormVisibility] = useState(false);

  // Add Handler
  const addHandler = () => {
    setFormVisibility(true);
  };

  const filteredPayments =
    searchText === ""
      ? enrichedPayments
      : enrichedPayments.filter((item) => {
          if (
            item.name?.name.toLowerCase().includes(searchText.toLowerCase())
          ) {
            return item;
          } else {
            return null;
          }
        });

  return (
    <SafeAreaView style={styles.containerWrapper} edges={["top"]}>
      <TouchableWithoutFeedback
        style={styles.containerWrapper}
        onPress={Keyboard.dismiss}
      >
        <View style={styles.container}>
          <Searchbar
            placeholder="Search Payments"
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
            <FlatList
              data={filteredPayments}
              keyExtractor={(item) => item._id.toString()}
              renderItem={({ item }) => {
                const companyInfo = realm.objectForPrimaryKey(
                  Company,
                  new Realm.BSON.ObjectId(item.c_id)
                );
                return (
                  <TouchableOpacity
                    onPress={() => {
                      nav.dispatch(
                        StackActions.push("PaymentInfo", {
                          id: item._id,
                        })
                      );
                    }}
                  >
                    <ListRow
                      date={item.date}
                      name={companyInfo ? companyInfo.name : ""}
                      balance={item.amount}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <NewPaymentForm
            visibility={formVisibility}
            setVisibility={() => {
              setFormVisibility((previousState) => !previousState);
            }}
            prefilled={false}
          />
          <TouchableOpacity style={styles.addButton} onPress={addHandler}>
            <Ionicons name="ios-add" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default PaymentList;

const styles = StyleSheet.create({
  containerWrapper: {
    paddingHorizontal: 5,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
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
