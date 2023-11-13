import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Text } from "react-native-paper";
import {
  NavigationProp,
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamsList } from "../../../routes/NativeStack";

type Props = {};

const PurchaseDetails = (props: Props) => {
  // Get Navigation Methods
  const route = useRoute<RouteProp<RootStackParamsList, "PurchaseInfo">>();
  const nav =
    useNavigation<NavigationProp<RootStackParamsList, "PurchaseInfo">>();

  return (
    <SafeAreaView style={styles.containerWrapper} edges={["bottom"]}>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              nav.dispatch(StackActions.pop(1));
            }}
          />
          <Appbar.Content title="Purchase Details" />
          <Appbar.Action icon="delete" onPress={() => {}} />
        </Appbar.Header>
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => {
              nav.dispatch(
                StackActions.push("CompanyInfo", { id: "Company Id" })
              );
            }}
            style={styles.companyInfo}
          >
            <View>
              <Text variant="bodySmall">Company Name</Text>
              <Text variant="titleMedium">{"XYZ"}</Text>
            </View>
            <View>
              <Ionicons name="chevron-forward" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <View>
            <Text variant="bodySmall">Date</Text>
            <Text variant="titleMedium">{Date()}</Text>
          </View>
          <View>
            <Text variant="bodySmall">Payment Amount</Text>
            <Text variant="titleMedium">{450}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            nav.dispatch(
              StackActions.push("PurchaseForm", { id: "Purchase Id" })
            );
          }}
        >
          <Feather name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PurchaseDetails;

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
