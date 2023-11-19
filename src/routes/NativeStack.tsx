import React from "react";
import Realm from "realm";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerStack from "./DrawerStack";
import Loading from "../screens/loadingScreen/Loading";
import PaymentDetails from "../screens/journalScreens/paymentScreens/PaymentDetails";
import PurchaseDetails from "../screens/journalScreens/purchaseScreens/PurchaseDetails";
import CompanyDetails from "../screens/journalScreens/companyScreens/CompanyDetails";
import EditPaymentForm from "../screens/journalScreens/paymentScreens/EditPaymentForm";
import EditPurchaseForm from "../screens/journalScreens/purchaseScreens/EditPurchaseForm";
import EditCompanyForm from "../screens/journalScreens/companyScreens/EditCompanyForm";
import PurchasesByCompany from "../screens/journalScreens/purchaseScreens/PurchasesByCompany";
import PaymentsByCompany from "../screens/journalScreens/paymentScreens/PaymentsByCompany";
import Company from "../models/Company";

export type RootStackParamsList = {
  Home: undefined;
  Loading: undefined;
  PaymentInfo: { id: Realm.BSON.ObjectId };
  PurchaseInfo: { id: Realm.BSON.ObjectId };
  CompanyInfo: { id: Realm.BSON.ObjectId };
  CompanyForm: { id: Realm.BSON.ObjectId };
  PaymentForm: { id: Realm.BSON.ObjectId };
  PurchaseForm: { id: Realm.BSON.ObjectId };
  PurchaseByCompany: { id: Realm.BSON.ObjectId };
  PaymentByCompany: { id: Realm.BSON.ObjectId };
};

const NativeStack = () => {
  const Stack = createNativeStackNavigator<RootStackParamsList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={DrawerStack} />
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="PaymentInfo" component={PaymentDetails} />
      <Stack.Screen name="PurchaseInfo" component={PurchaseDetails} />
      <Stack.Screen name="CompanyInfo" component={CompanyDetails} />
      <Stack.Screen name="PaymentForm" component={EditPaymentForm} />
      <Stack.Screen name="PurchaseForm" component={EditPurchaseForm} />
      <Stack.Screen name="CompanyForm" component={EditCompanyForm} />
      <Stack.Screen name="PurchaseByCompany" component={PurchasesByCompany} />
      <Stack.Screen name="PaymentByCompany" component={PaymentsByCompany} />
    </Stack.Navigator>
  );
};

export default NativeStack;
