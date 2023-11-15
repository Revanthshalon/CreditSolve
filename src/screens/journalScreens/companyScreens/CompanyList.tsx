import React, { useEffect, useState } from "react";
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
import realmContext from "../../../data/dbContext";
import { useUser } from "@realm/react";
import Company from "../../../models/Company";
import { FlatList } from "react-native-gesture-handler";

const CompanyList = () => {
  // Realm Context
  const { useRealm, useQuery } = realmContext;
  const realm = useRealm();
  const user = useUser();

  // Getting Company List Query
  const Companies = useQuery(Company)
    .filtered(`_uid == "${user.id}"`)
    .sorted("_id");

  // Change the Companies list if the user is changed
  useEffect(() => {
    realm.subscriptions.update((mutableSubs) =>
      mutableSubs.add(Companies, { name: "UserSubscriptions" })
    );
  }, [user]);

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
            <FlatList
              data={Companies}
              keyExtractor={(item) => item._id.toString()}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      nav.dispatch(
                        StackActions.push("CompanyInfo", {
                          id: item._id,
                        })
                      );
                    }}
                  >
                    <CompanyListRow
                      name={item.name}
                      balance={item.balance}
                      contact={item.contact}
                      id={item._id}
                    />
                  </TouchableOpacity>
                );
              }}
            />
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
