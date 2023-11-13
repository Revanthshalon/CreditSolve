import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerStack from "./DrawerStack";
import Loading from "../screens/loadingScreen/Loading";
import Login from "../screens/authScreen/Login";
import Register from "../screens/authScreen/Register";
import PaymentDetails from "../screens/journalScreens/paymentScreens/PaymentDetails";
import PurchaseDetails from "../screens/journalScreens/purchaseScreens/PurchaseDetails";
import CompanyDetails from "../screens/journalScreens/companyScreens/CompanyDetails";

export type RootStackParamsList = {
  Home: undefined;
  Loading: undefined;
  Login: undefined;
  Register: undefined;
  PaymentInfo: { id: string };
  PurchaseInfo: { id: string };
  CompanyInfo: { id: string };
};

const NativeStack = () => {
  const Stack = createNativeStackNavigator<RootStackParamsList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={DrawerStack} />
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="PaymentInfo" component={PaymentDetails} />
      <Stack.Screen name="PurchaseInfo" component={PurchaseDetails} />
      <Stack.Screen name="CompanyInfo" component={CompanyDetails} />
    </Stack.Navigator>
  );
};

export default NativeStack;
