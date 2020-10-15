import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const { Navigator, Screen } = createStackNavigator();

import OrphanagesMap from "./pages/OrphanagesMap";
import OrphanageDetails from "./pages/OrphanageDetails";

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="OrphanagesMap" component={OrphanagesMap} />
        <Screen name="OrphanegesDetails" component={OrphanageDetails} />
      </Navigator>
    </NavigationContainer>
  );
}
