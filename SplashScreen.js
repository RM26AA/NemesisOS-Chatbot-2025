import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Animated } from "react-native";

const { width } = Dimensions.get("window");

export default function SplashScreen() {
  const navigation = useNavigation();
  const logoScale = new Animated.Value(0);
  const buttonOpacity = new Animated.Value(0);

  useEffect(() => {
    // Animate logo in
    Animated.spring(logoScale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();

    // Fade in button after a short delay
    setTimeout(() => {
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NemesisOS</Text>

      <Animated.Image
        source={require("../assets/logo3.jpg")}
        style={[
          styles.logo,
          {
            transform: [{ scale: logoScale }],
          },
        ]}
        resizeMode="contain"
      />

      <Animated.View style={{ opacity: buttonOpacity }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Ready to Die?</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 36,
    color: "#ff0000",
    fontWeight: "bold",
    marginBottom: 30,
  },
  logo: {
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: 40,
    borderWidth: 2,
    borderColor: "#ff0000",
    borderRadius: 130, // Slightly rounded corners, not a circle
  },
  button: {
    backgroundColor: "#ff0000",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    //textTransform: "uppercase",
  },
});

