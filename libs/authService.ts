// src/libs/authService.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.API_URL || "http://10.38.164.26:1337/api";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/local`, {
      identifier: email,
      password,
    });
    const { jwt, user } = response.data;

    if (!jwt || !user) {
      throw new Error("Identifiants incorrects, veuillez réessayer.");
    }

    await AsyncStorage.setItem("token", jwt);
    await AsyncStorage.setItem("user", JSON.stringify(user));

    return user;
  } catch (error) {
    throw new Error(
      "Échec de la connexion. Veuillez vérifier vos identifiants."
    );
  }
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/auth/local/register`, {
      username,
      email,
      password,
    });
    const { jwt, user } = response.data;

    if (!jwt || !user) {
      throw new Error("Inscription échouée. Veuillez réessayer.");
    }

    await AsyncStorage.setItem("token", jwt);
    await AsyncStorage.setItem("user", JSON.stringify(user));

    return user;
  } catch (error) {
    throw new Error(
      "Échec de l'inscription. Veuillez vérifier les informations."
    );
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");
};

export const isAuthenticated = async () => {
  const token = await AsyncStorage.getItem("token");
  return Boolean(token);
};

export const getAuthToken = async () => {
  return await AsyncStorage.getItem("token");
};
