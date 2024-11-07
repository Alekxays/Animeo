import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import BottomNavigation from "../components/BottomNavigation";
import BannerCarousel from "../components/BannerCarousel";
import ProCardCarousel from "../components/ProCardCarousel";
import { getPros } from "../libs/apiConfig";

const banners = [
  {
    id: 1,
    image: require("../assets/images/dog-banner.png"),
    title: "La première application pour suivre la santé de son animal",
  },
  {
    id: 2,
    image: require("../assets/images/dog-banner.png"),
    title: "Suivez le bien-être de vos compagnons",
  },
  {
    id: 3,
    image: require("../assets/images/dog-banner.png"),
    title: "Prenez soin de vos animaux avec notre aide",
  },
];

interface Animal {
  id: number;
  name: string;
}

interface Pro {
  id: number;
  name: string;
  profession: string;
  location: string;
  animals: Animal[];
  imageUrl: any;
}

const HomePage: React.FC = () => {
  const [pros, setPros] = useState<Pro[]>([]);

  useEffect(() => {
    const fetchPros = async () => {
      const prosData = await getPros();
      const formattedPros = prosData.map((pro: any) => ({
        id: pro.id,
        name: pro.name,
        profession: pro.profession,
        location: pro.location,
        animals: pro.animals.map((animal: any) => ({
          id: animal.id,
          name: animal.name,
        })),
        imageUrl: require("../assets/images/pdp-default.png"),
      }));

      setPros(formattedPros);
    };

    fetchPros();
  }, []);

  const handleBannerPress = (id: number) => {
    console.log(`Banner with id ${id} pressed`);
  };

  return (
    <View className="flex-1">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        className="flex-1"
      >
        <ImageBackground source={require("../assets/images/bg-home.png")}>
          <View className="items-center my-6 mt-10">
            <Image
              source={require("../assets/images/logo-animeo.png")}
              className="h-24 w-auto"
              resizeMode="contain"
            />
          </View>

          <View className="flex-row items-center justify-center px-4">
            <View className="flex-row bg-white rounded-full p-4 shadow-md flex-1 mx-4">
              <Ionicons name="search-outline" size={24} color="#2A3FDD" />
              <TextInput
                placeholder="Choisissez un spécialiste..."
                placeholderTextColor="#9CA3AF"
                className="ml-2 text-base flex-1 text-black"
              />
            </View>
          </View>

          <Text className="text-center text-2xl font-bold font-montserrat text-[#C34C2B] mt-6">
            Vous recherchez :
          </Text>

          <View className="flex-row flex-wrap justify-center py-4 mx-2">
            {[
              { icon: "syringe", label: "Vétérinaire" },
              { icon: "hand-holding", label: "Ostéopathe" },
              { icon: "bone", label: "Éducateur" },
              { icon: "paw", label: "Comportement" },
            ].map((item) => (
              <TouchableOpacity className="items-center m-2" key={item.label}>
                <FontAwesome5 name={item.icon} size={24} color="#2A3FDD" />
                <Text className="text-sm text-[#2A3FDD] pt-1 font-montserrat">
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text className="mx-8 font-montserrat text-[#2A3FDD] text-2xl font-bold text-center">
            Faciliter l’accès à la santé et au bien-être de vos compagnons !
          </Text>

          <BannerCarousel banners={banners} onBannerPress={handleBannerPress} />

          <Text className="text-xl font-bold font-montserrat text-[#F14E48] mt-6 text-center">
            Les pets pro proche de chez moi :
          </Text>

          <ProCardCarousel pros={pros} />
        </ImageBackground>
      </ScrollView>

      <View className="absolute bottom-1 left-0 right-0">
        <BottomNavigation />
      </View>
    </View>
  );
};

export default HomePage;
