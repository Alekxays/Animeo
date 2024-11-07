import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { login } from "../../../libs/authService";
import { useRouter } from "expo-router";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      Alert.alert("Connexion réussie", `Bienvenue, ${user.username || email}!`);
      router.push("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Échec de la connexion";
      Alert.alert("Erreur", errorMessage);
    }
  };

  return (
    <View className="flex-1 bg-white justify-center items-center p-6">
      <Image
        source={require("../../../assets/images/logo-animeo.png")}
        className="h-24 w-auto mb-8 mt-10"
        resizeMode="contain"
      />

      <Text className="text-2xl font-bold text-[#2A3FDD] mb-1">
        Je me connecte
      </Text>
      <Text className="text-sm text-gray-600 mb-6">
        On est heureux de vous revoir !
      </Text>

      <View className="flex-row items-center bg-gray-100 rounded-full p-3 mb-4 w-full">
        <Ionicons name="mail-outline" size={20} color="#2A3FDD" />
        <TextInput
          placeholder="Adresse email *"
          placeholderTextColor="#9CA3AF"
          className="ml-2 flex-1 text-sm"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View className="flex-row items-center bg-gray-100 rounded-full p-3 mb-4 w-full">
        <Ionicons name="lock-closed-outline" size={20} color="#2A3FDD" />
        <TextInput
          placeholder="Mot de passe *"
          placeholderTextColor="#9CA3AF"
          className="ml-2 flex-1 text-sm"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Ionicons
            name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#9CA3AF"
          />
        </TouchableOpacity>
      </View>

      <Text className="text-xs text-gray-500 mb-6 underline">
        Mot de passe oublié ?
      </Text>

      <TouchableOpacity
        className="bg-[#C34C2B] rounded-full px-6 py-3 mb-6 flex-row items-center"
        onPress={handleLogin}
      >
        <Text className="text-white font-bold mr-2">Se connecter</Text>
        <Ionicons name="arrow-forward" size={16} color="white" />
      </TouchableOpacity>

      <Text className="text-sm text-[#2A3FDD] mb-6">
        Pas encore de compte ?{" "}
        <Text
          className="underline font-bold"
          onPress={() => router.push("/auth/register")}
        >
          Créer
        </Text>
      </Text>

      <Text className="text-xs text-gray-400 mt-auto underline">
        CGU - Politique de confidentialité
      </Text>
    </View>
  );
};

export default LoginScreen;
