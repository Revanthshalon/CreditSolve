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
import React, { useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";

type Props = {
  visibility: boolean;
  setVisibility: () => void;
};

const NewPurchaseForm = ({ visibility, setVisibility }: Props) => {
  // Form Input Variable
  const [name, setName] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [amount, setAmount] = useState("");

  // Form Clear
  const formClear = () => {
    setName("");
    setDate(undefined);
    setAmount("");
  };

  // Action Handler
  const cancelHandler = () => {
    setVisibility();
    formClear();
  };

  // Submit Handler
  const submitHandler = () => {
    setVisibility();
  };
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
                New Purchase Form
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
            <TouchableOpacity onPress={submitHandler}>
              <Button mode="contained">Submit</Button>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NewPurchaseForm;

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
