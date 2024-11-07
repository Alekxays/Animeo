import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";

const PodcastSection: React.FC = () => {
  // Fonction pour ouvrir Deezer ou un lien
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open link:", err)
    );
  };

  return (
    <View className="px-6 py-4">
      {/* Titre de la section */}
      <Text className="text-2xl font-bold text-center text-[#C34C2B] mt-4">
        Des podcasts sur les animaux ?
      </Text>

      {/* Carte du Podcast avec logo centré en haut */}
      <View className="bg-[#FEE6EB] rounded-xl shadow-lg mt-8">
        {/* Logo AlloPets centré en haut */}
        <View className="flex items-center">
          <Image
            source={require("../assets/images/allo-pets-logo.png")}
            className="w-48 h-48 -mt-10"
            resizeMode="contain"
          />
        </View>

        {/* Contenu principal de la carte */}
        <View className="p-4 -mt-20">
          <View className="flex-row mt-2">
            {/* Image de la couverture du podcast */}
            <Image
              source={require("../assets/images/allo-pets-cover.png")}
              className="w-24 h-24 rounded-lg mr-4 -mt-4"
              resizeMode="cover"
            />

            {/* Texte et options */}
            <View className="flex-1">
              <Text className="text-base text-[#3C3C3C] mb-2">
                Des conseils de pros pour les propriétaires sur AlloPets podcast
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PodcastSection;
