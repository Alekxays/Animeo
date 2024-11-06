import React from "react";
import { ImageBackground, Text, TouchableOpacity } from "react-native";

interface BannerProps {
  image: any;
  title: string;
  onPress: () => void;
}

const Banner: React.FC<BannerProps> = ({ image, title, onPress }) => {
  return (
    <ImageBackground
      source={image}
      className="w-[90vw] h-48 rounded-xl p-4 items-center mx-[5vw] mt-8 shadow-md overflow-hidden"
      resizeMode="cover"
    >
      <Text className="text-xl font-bold font-montserrat mt-4 text-white text-center">
        {title}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        className="bg-[#C34C2B] rounded-full px-6 py-2 mt-12 ml-40"
      >
        <Text className="text-white font-bold text-md">Je m’inscris !</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Banner;
