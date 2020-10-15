import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const OrphanagesMap: React.FC = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -21.235374444444446,
          longitude: -47.409243333333336,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#312e38",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default OrphanagesMap;
