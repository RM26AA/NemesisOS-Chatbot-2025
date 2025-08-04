import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 40,
  },
  text: {
    color: colors.background,
    fontSize: 18,
    fontWeight: "bold",
  },
});
