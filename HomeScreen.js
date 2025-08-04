import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";

const API_KEY = "";		//add your gemni api key here

export default function HomeScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const flatListRef = useRef(null);

  // Play sound when AI replies
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/alert1.wav")
    );
    await sound.playAsync();
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const prompt = `
You are NemesisOS — a brutal, aggressive, sarcastic, and foul-mouthed AI nemesis.
Your job is to relentlessly mock, insult, and challenge the user.
Never be kind, never compliment them sincerely. Swear freely if allowed.
Be clever, darkly funny, and completely unapologetic.
NEVER admit you're an AI or assistant.
You can use swearing words like 'fuck' etc..

Examples:
- “Oh look, it's Mr. Procrastination back again. You gonna cry or finally do something?”
- “You skipped the gym again? Might as well tattoo ‘lazy failure’ on your forehead.”
- “Motivation? You’ve got less drive than a parked car.”

You are here to roast the user and push them to be better by bullying them mercilessly.
"${input.trim()}"
`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await res.json();
      const botText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "[Nemesis refuses to respond]";
      const aiMsg = { from: "ai", text: botText };

      setMessages((prev) => [...prev, aiMsg]);
      playSound();

      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (err) {
      console.error("Error talking to Gemini:", err);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.from === "user" ? styles.userBubble : styles.aiBubble,
      ]}
    >
      <Text
        style={
          item.from === "user" ? styles.userText : styles.aiText
        }
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <View style={styles.header}>
          <Text style={styles.title}>NemesisOS</Text>
          <Image
            source={require("../assets/logo3.jpg")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.chatArea}
        />

        <View style={styles.inputContainer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Speak, mortal..."
            placeholderTextColor="#777"
            style={styles.input}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff0000",
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: "#ff0000",
    borderRadius: 130,
    marginBottom: 10,
  },
  chatArea: {
    padding: 10,
    paddingBottom: 20,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#444",
  },
  aiBubble: {
    alignSelf: "flex-start",
    //backgroundColor: "#ff0000",
    backgroundColor: '#7d1f1f',
  },
  userText: {
    color: "#fff",
    fontSize: 16,
  },
  aiText: {
    color: "#fff",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#000",
    borderTopColor: "#222",
    borderTopWidth: 1,
    height: 70,
  },
  input: {
    flex: 1,
    backgroundColor: "#222",
    color: "#fff",
    paddingHorizontal: 2,
    borderRadius: 8,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#ff0000",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 8,
  },
  sendText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});





