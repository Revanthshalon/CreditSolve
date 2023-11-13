import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native-paper";

const Loading = () => {
  return (
    <SafeAreaView style={styles.containerWrapper}>
      <View style={styles.container}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    </SafeAreaView>
  );
};

export default Loading;

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
