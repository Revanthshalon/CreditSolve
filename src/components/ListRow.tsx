import { StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";

type Props = {
  date: Date;
  name: string;
  balance: number;
};

const ListRow = ({ date, name, balance }: Props) => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.headerContainer}>
        <Text variant="bodyLarge" style={styles.headerLabel}>
          {date.toDateString()}
        </Text>
        <Text variant="bodyMedium">{name}</Text>
      </View>
      <View>
        <Text variant="bodyMedium" style={styles.bodyBalanceLabel}>
          {balance.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </Text>
      </View>
    </View>
  );
};

export default ListRow;

const styles = StyleSheet.create({
  rowContainer: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 80,
  },
  headerContainer: {
    justifyContent: "space-between",
  },
  headerLabel: {
    fontWeight: "bold",
  },
  bodyContainer: {
    justifyContent: "space-between",
  },
  bodyBalanceLabel: {
    fontWeight: "bold",
  },
  bodyActionsContainer: {
    flexDirection: "row",
    gap: 15,
  },
});
