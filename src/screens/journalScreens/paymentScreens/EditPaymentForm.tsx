import {
  Keyboard,
  Modal,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamsList } from "../../../routes/NativeStack";
import realmContext from "../../../data/dbContext";
import { useUser } from "@realm/react";
import Payment from "../../../models/Payment";
import Company from "../../../models/Company";

type Props = {};

const EditPaymentForm = (props: Props) => {
  // Navigation
  const nav = useNavigation();
  const route = useRoute<RouteProp<RootStackParamsList, "PaymentForm">>();

  // Realm Db
  const { useRealm, useQuery } = realmContext;
  const realm = useRealm();
  const user = useUser();

  // Get Payment Object
  const payment = realm.objectForPrimaryKey(Payment, route.params.id);
  const company = realm.objectForPrimaryKey(
    Company,
    new Realm.BSON.ObjectId(payment?.c_id)
  );

  // Form Input Variable
  const [name, setName] = useState(company?.name);
  const [date, setDate] = useState<Date | undefined>(payment?.date);
  const [amount, setAmount] = useState(payment?.amount.toString());

  // Form Clear
  const formClear = () => {
    setName("");
    setDate(new Date());
    setAmount("");
  };

  // Action Handler
  const cancelHandler = () => {
    formClear();
    nav.dispatch(StackActions.pop(1));
  };

  // Submit Handler
  const submitHandler = useCallback(
    ({
      date,
      amount,
    }: {
      date: Date | undefined;
      amount: string | undefined;
    }) => {
      if (date && amount && payment) {
        realm.write(() => {
          payment.date = date;
          payment.amount = parseFloat(amount);
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
                Edit Payment Form
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
              <View style={{ marginVertical: 20 }}>
                <DatePickerInput
                  locale="en-IN"
                  label="Purchase Date"
                  value={date}
                  onChange={(d) => setDate(d)}
                  inputMode="start"
                />
              </View>
              <TextInput
                label="Balance"
                placeholder="Existing Balance"
                value={amount}
                onChange={(
                  e: NativeSyntheticEvent<TextInputChangeEventData>
                ) => {
                  setAmount(e.nativeEvent.text);
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
                submitHandler({ date, amount });
              }}
            >
              <Button mode="contained">Update</Button>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default EditPaymentForm;

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
