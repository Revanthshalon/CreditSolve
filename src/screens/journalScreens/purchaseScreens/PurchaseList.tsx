import {
  FlatList,
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
import { StackActions } from "@react-navigation/native";
import realmContext from "../../../data/dbContext";
import Purchase from "../../../models/Purchase";
import { useUser } from "@realm/react";
import Company from "../../../models/Company";

type Props = {};

const PurchaseList = (props: Props) => {
  // Getting Drawer Navigation Actions
  const nav = useNavigation();

  // Realm DB
  const { useRealm, useQuery } = realmContext;
  const realm = useRealm();
  const user = useUser();

  // Purchases List
  const purchaseList = useQuery(Purchase)
    .filtered(`u_id == "${user.id.toString()}"`)
    .sorted("date", true);

  const enrichedPurchase = purchaseList.map((item) => {
    return {
      ...item,
      name: realm.objectForPrimaryKey(
        Company,
        new Realm.BSON.ObjectId(item.c_id)
      ),
    };
  });

  // Search Text Variable
  const [searchText, setSearchText] = useState("");
  // New Form Toggle
  const [formVisibility, setFormVisibility] = useState(false);

  // Add Handler
  const addHandler = () => {
    setFormVisibility(true);
  };

  const filteredPurchase =
    searchText === ""
      ? enrichedPurchase
      : enrichedPurchase.filter((item) => {
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
            <FlatList
              data={filteredPurchase}
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
                        StackActions.push("PurchaseInfo", {
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
          <NewPurchaseForm
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
