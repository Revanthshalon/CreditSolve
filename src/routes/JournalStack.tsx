import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CompanyList from "../screens/journalScreens/companyScreens/CompanyList";
import PurchaseList from "../screens/journalScreens/purchaseScreens/PurchaseList";
import PaymentList from "../screens/journalScreens/paymentScreens/PaymentList";
import { Ionicons } from "@expo/vector-icons";

export type JournalStackParamList = {
  Company: undefined;
  Payment: undefined;
  Purchase: undefined;
};

const JournalStack = () => {
  const JournalStack = createBottomTabNavigator<JournalStackParamList>();

  return (
    <JournalStack.Navigator screenOptions={{ headerShown: false }}>
      <JournalStack.Screen
        name="Company"
        component={CompanyList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-business" size={size} color={color} />
          ),
        }}
      />
      <JournalStack.Screen
        name="Purchase"
        component={PurchaseList}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="ios-cart" size={size} color={color} />
          ),
        }}
      />
      <JournalStack.Screen
        name="Payment"
        component={PaymentList}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="ios-card" size={size} color={color} />
          ),
        }}
      />
    </JournalStack.Navigator>
  );
};

export default JournalStack;
