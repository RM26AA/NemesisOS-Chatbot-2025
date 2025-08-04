import React from "react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./pages/SplashScreen";
import HomeScreen from "./pages/HomeScreen";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  fonts: {
    regular: { fontFamily: "System", fontWeight: "normal" },
    medium: { fontFamily: "System", fontWeight: "normal" },
    light: { fontFamily: "System", fontWeight: "normal" },
    thin: { fontFamily: "System", fontWeight: "normal" },
  },
  colors: {
    ...DefaultTheme.colors,
    primary: "#ff0000",
    background: "#000000",
    text: "#ffffff",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#000" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
