import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { isAuthenticated, logout } from "../libs/authService";

// Configuration des pages
const pages = [
  {
    key: "Accueil",
    icon: <Ionicons name="home-outline" size={18} />,
    route: "/",
  },
  {
    key: "Agenda",
    icon: <Ionicons name="calendar-outline" size={18} />,
    route: "/agenda",
    requiresAuth: true,
  },
  {
    key: "Logo",
    icon: (
      <Image
        source={require("../assets/images/animeo-logo_navbar.png")}
        className="w-9 h-9"
      />
    ),
    route: "/",
  },
  {
    key: "Animaux",
    icon: <FontAwesome5 name="paw" size={18} />,
    route: "/report",
    requiresAuth: true,
  },
  {
    key: "Connexion",
    icon: <Ionicons name="person-outline" size={18} />,
    route: "/auth/login",
  },
];

const BottomNavigation: React.FC = () => {
  const [activePage, setActivePage] = useState<string>("Accueil");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname(); // Utilisez le chemin actuel

  useEffect(() => {
    // Vérifie si l'utilisateur est authentifié au montage du composant
    const checkAuthStatus = async () => {
      const authenticated = await isAuthenticated();
      setIsLoggedIn(authenticated);
    };
    checkAuthStatus();
  }, []);

  useEffect(() => {
    // Met à jour `activePage` en fonction de la route active
    const currentPage = pages.find((page) => page.route === pathname)?.key;
    if (currentPage) setActivePage(currentPage);
  }, [pathname]);

  // Fonction de navigation
  const handlePress = async (
    page: string,
    route: string,
    requiresAuth?: boolean
  ) => {
    setActivePage(page);
    if (requiresAuth) {
      const isUserAuthenticated = await isAuthenticated();
      router.push(
        isUserAuthenticated ? (route as any) : ("/auth/login" as any)
      );
    } else {
      router.push(route as any);
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    setActivePage("Accueil");
    router.push("/");
  };

  return (
    <View className="flex-row justify-around items-center bg-white p-4 h-22 shadow-md">
      {pages.map((page) => (
        <TouchableOpacity
          key={page.key}
          className="items-center"
          onPress={() =>
            page.key === "Connexion" && isLoggedIn
              ? handleLogout()
              : handlePress(page.key, page.route, page.requiresAuth)
          }
        >
          {React.cloneElement(
            page.key === "Connexion" && isLoggedIn ? (
              <Ionicons name="log-out-outline" size={18} />
            ) : (
              page.icon
            ),
            {
              color: activePage === page.key ? "#C34C2B" : "black",
            }
          )}
          {page.key !== "Logo" && (
            <Text
              className={`text-xs ${
                activePage === page.key ? "text-[#C34C2B]" : "text-black"
              }`}
            >
              {page.key === "Connexion" && isLoggedIn
                ? "Déconnexion"
                : page.key}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomNavigation;
