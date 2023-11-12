import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native-paper";

type Props = {};

const Loading = (props: Props) => {
  return (
    <SafeAreaView>
      <View>
        <ActivityIndicator animating={true} size="large" />
      </View>
    </SafeAreaView>
  );
};

export default Loading;

const styles = StyleSheet.create({});
