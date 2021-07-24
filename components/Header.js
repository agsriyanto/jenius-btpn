import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import Icon from "./Icon";

export default function Header({ title }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity>
          <Icon name="ios-menu" size={30} focused="transparent" />
        </TouchableOpacity>
      </View>

      {title && <Text style={styles.title}>{title}</Text>}

      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Add")}>
          <Icon name="ios-person-add" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    color: "#747474",
  },
});
