import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

const Header: React.FC = ({ showCancel = true, title }: HeaderProps) => {
  const navigation = useNavigation();

  function handleGoBackToOrphanagesMap() {
    navigation.navigate("OrphanagesMap");
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      {showCancel ? (
        <BorderlessButton onPress={handleGoBackToOrphanagesMap}>
          <Feather name="x" size={24} color="#FF669D" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f9fafc",
    borderColor: "#dde3f0",
    borderBottomWidth: 1,
    paddingTop: 44,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Nunito_600SemiBold",
    color: "#8fa7b3",
    fontSize: 16,
  },
});

export default Header;
