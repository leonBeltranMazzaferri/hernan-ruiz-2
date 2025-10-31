import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useLanguage } from "./LanguageContext";

export default function LoginScreen({ onLoginSuccess, navigation }) {
  const { t, language, setLanguage } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(t("error_register"), t("complete_fields"));
      return;
    }

    try {
      const res = await fetch("http://192.168.100.2:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        onLoginSuccess();
      } else {
        Alert.alert("Error", t("login_error"));
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", t("error_register"));
    }
  };

  return (
    <View style={styles.container}>
      {/* Selector de idioma fijo arriba a la derecha */}
      <View style={styles.header}>
        {["es", "en", "pt"].map((lang) => (
          <TouchableOpacity
            key={lang}
            onPress={() => setLanguage(lang)}
            style={[
              styles.langButton,
              language === lang && styles.langButtonActive,
            ]}
          >
            <Text style={[styles.langText, language === lang && styles.langTextActive]}>
              {lang.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Título */}
      <Text style={styles.title}>MapaAPP 📍</Text>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder={t("email")}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder={t("password")}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{t("login")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ textAlign: "center", color: "#2B6E6E", fontWeight: "bold" }}>
          {t("no_account")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 30 },
  header: {
    position: "absolute",
    top: 40,
    right: 20,
    flexDirection: "row",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2B6E6E",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: "#2B6E6E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  langButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  langButtonActive: {
    backgroundColor: "#2B6E6E",
    borderColor: "#2B6E6E",
  },
  langText: {
    fontSize: 14,
    color: "#555",
    fontWeight: "bold",
  },
  langTextActive: {
    color: "#fff",
  },
});
