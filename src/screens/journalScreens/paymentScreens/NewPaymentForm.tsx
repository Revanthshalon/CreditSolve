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
import {
  Button,
  MD3Colors,
  MD3LightTheme,
  Text,
  TextInput,
} from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { DatePickerInput } from "react-native-paper-dates";
import { useNavigation } from "@react-navigation/native";
import realmContext from "../../../data/dbContext";
import { useUser } from "@realm/react";
import Company from "../../../models/Company";
import Payment from "../../../models/Payment";

type Props = {
  visibility: boolean;
  setVisibility: () => void;
  prefilled: true | false;
  companyId?: string;
};

const NewPaymentForm = ({
  visibility,
  setVisibility,
  prefilled,
  companyId,
}: Props) => {
  // Nav Prop
  const nav = useNavigation();

  // Realm DB
  const { useRealm, useQuery } = realmContext;
  const realm = useRealm();
  const user = useUser();

  // Get Companies List
  const Companies = useQuery(Company)
    .filtered(`_uid == "${user?.id}"`)
    .sorted("_id");

  const companiesList = Companies.map((item) => {
    return { name: item.name, id: item._id };
  });

  type companyListType = {
    name: string;
    id: Realm.BSON.ObjectId;
  };

  // Form Input Variable
  const [name, setName] = useState<companyListType | undefined>();
  const [date, setDate] = useState<Date | undefined>();
  const [amount, setAmount] = useState("");

  // Form Clear
  const formClear = () => {
    setName(undefined);
    setDate(undefined);
    setAmount("");
  };

  // Action Handler
  const cancelHandler = () => {
    setVisibility();
    formClear();
  };

  // Submit Handler
  const submitHandler = useCallback(
    ({
      name,
      date,
      amount,
    }: {
      name: companyListType | undefined;
      date: Date | undefined;
      amount: string;
    }) => {
      realm.write(() => {
        return new Payment(realm, {
          date: date,
          amount: parseFloat(amount),
          c_id: prefilled ? companyId : name?.id.toString(),
          u_id: user?.id.toString(),
        });
      });
      setVisibility();
      formClear();
    },
    [realm, user]
  );
  return (
    <Modal
      visible={visibility}
      animationType="slide"
      presentationStyle="formSheet"
    >
      <TouchableWithoutFeedback
        style={styles.formContainer}
        onPress={Keyboard.dismiss}
      >
        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <View style={styles.headerContainer}>
              <Text variant="displaySmall" style={styles.headerLabel}>
                New Payment Form
              </Text>
            </View>
            <View style={styles.inputContainer}>
              {!prefilled && (
                <Dropdown
                  style={styles.dropDown}
                  placeholder="Select Company"
                  selectedTextStyle={styles.dropdownSelectedText}
                  placeholderStyle={styles.dropDownPlaceholder}
                  search
                  data={companiesList}
                  value={name}
                  onChange={(item) => {
                    setName(item);
                  }}
                  maxHeight={250}
                  labelField="name"
                  valueField="id"
                  searchPlaceholder="Search Company"
                />
              )}
              <View style={{ marginVertical: 20 }}>
                <DatePickerInput
                  locale="en-IN"
                  label="Payment Date"
                  value={date}
                  onChange={(d) => setDate(d)}
                  inputMode="start"
                />
              </View>
              <TextInput
                label="Payment Amount"
                placeholder="Payment Amount"
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
              onPress={() => submitHandler({ name, date, amount })}
            >
              <Button mode="contained">Submit</Button>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NewPaymentForm;

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
  dropDown: {
    backgroundColor: MD3Colors.neutralVariant90,
    height: 60,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: MD3LightTheme.colors.outlineVariant,
  },
  dropDownPlaceholder: {
    paddingLeft: 20,
  },
  dropdownSelectedText: {
    paddingLeft: 20,
    color: MD3LightTheme.colors.onPrimaryContainer,
  },
});
