import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";

import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";

import mapMarker from "../../images/Icon.png";

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
      >
        <Marker
          icon={mapMarker}
          calloutAnchor={{
            x: 2.7,
            y: 0.8,
          }}
          coordinate={{
            latitude: -21.235374444444446,
            longitude: -47.409243333333336,
          }}
        >
          <Callout tooltip onPress={() => {}}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Nome do orfanato</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>aa</Text>
        <TouchableOpacity
          style={styles.createOrphanageButton}
          onPress={() => {}}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
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
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 16,
    justifyContent: "center",

    elevation: 3,
  },
  calloutText: {
    color: "#0089a5",
    fontSize: 14,
    fontFamily: "Nunito_700Bold",
  },
  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: "#FFF",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 3,
  },
  footerText: {
    color: "#8fa7b3",
    fontFamily: "Nunito_700Bold",
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrphanagesMap;
