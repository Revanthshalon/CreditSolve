import {
  Keyboard,
  Modal,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import realmContext from "../../../data/dbContext";
import { RootStackParamsList } from "../../../routes/NativeStack";
import { useObject, useUser } from "@realm/react";
import Company from "../../../models/Company";

type Props = {};

const EditCompanyForm = (props: Props) => {
  // Navigation
  const nav = useNavigation();
  const route = useRoute<RouteProp<RootStackParamsList, "CompanyForm">>();

  // Realm DB
  const { useRealm, useQuery } = realmContext;
  const realm = useRealm();
  const user = useUser();

  // Get Company Object
  const company = realm.objectForPrimaryKey(Company, route.params.id);

  // Form Input Variable
  const [name, setName] = useState(company?.name);
  const [contact, setContact] = useState(company?.contact);
  const [balance, setBalance] = useState(company?.balance.toString());

  // Form Clear
  const formClear = () => {
    setName("");
    setContact("");
    setBalance("");
  };

  // Action Handler
  const cancelHandler = () => {
    nav.dispatch(StackActions.pop(1));
    formClear();
  };

  // Submit Handler
  const submitHandler = useCallback(
    ({
      name,
      contact,
      balance,
    }: {
      name: string | undefined;
      contact: string | undefined;
      balance: string | undefined;
    }) => {
      if (name && contact && balance && company) {
        realm.write(() => {
          company.name = name;
          company.contact = contact;
          company.balance = parseFloat(balance);
        });
      }
      nav.dispatch(StackActions.pop(1));
    },
    [realm, user]
  );

  return (
    <SafeAreaView style={styles.formContainer}>
      <TouchableWithoutFeedback
        style={styles.formContainer}
        onPress={Keyboard.dismiss}
      >
        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <View style={styles.headerContainer}>
              <Text variant="displaySmall" style={styles.headerLabel}>
                Edit Company Form
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                label="Company Name"
                placeholder="Company Name"
                value={name}
                onChange={(
                  e: NativeSyntheticEvent<TextInputChangeEventData>
                ) => {
                  setName(e.nativeEvent.text);
                }}
              />
              <TextInput
                label="Contact"
                placeholder="Contact"
                value={contact}
                onChange={(
                  e: NativeSyntheticEvent<TextInputChangeEventData>
                ) => {
                  setContact(e.nativeEvent.text);
                }}
              />
              <TextInput
                label="Balance"
                placeholder="Existing Balance"
                value={balance}
                onChange={(
                  e: NativeSyntheticEvent<TextInputChangeEventData>
                ) => {
                  setBalance(e.nativeEvent.text);
                }}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={cancelHandler}>
              <Button mode="outlined">Cancel</Button>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                submitHandler({ name, contact, balance });
              }}
            >
              <Button mode="contained">Submit</Button>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default EditCompanyForm;

const styles = StyleSheet.create({
  formContainer: {
    marginHorizontal: 5,
    justifyContent: "space-between",
    flex: 1,
  },
  headerContainer: {
    marginVertical: 10,
  },
  headerLabel: {},
  inputWrapper: {},
  inputContainer: {
    gap: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 40,
  },
  button: {
    flex: 1,
  },
});
