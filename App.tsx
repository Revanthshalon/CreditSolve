import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NativeStack from "./src/routes/NativeStack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { AppProvider, UserProvider } from "@realm/react";
import { appId, baseUrl } from "./atlasConfig.json";
import Login from "./src/screens/authScreen/Login";
import realmContext from "./src/data/dbContext";
import Loading from "./src/screens/loadingScreen/Loading";

export default function App() {
  // Getting Realm Provider
  const { RealmProvider } = realmContext;

  return (
    <NavigationContainer>
      <PaperProvider>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <AppProvider id={appId} baseUrl={baseUrl}>
              <UserProvider fallback={Login}>
                <RealmProvider
                  sync={{
                    flexible: true,
                    onError: (_, error) => {
                      console.log(error);
                    },
                    initialSubscriptions: {
                      update(subs, realm) {
                        subs.add(realm.objects("Company")),
                          subs.add(realm.objects("Purchase")),
                          subs.add(realm.objects("Payment"));
                      },
                    },
                  }}
                  fallback={Loading}
                >
                  <NativeStack />
                </RealmProvider>
              </UserProvider>
            </AppProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}
