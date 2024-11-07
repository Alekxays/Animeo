import React from "react";
import { View, Text, Image, StyleProp, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Animal {
  id: number;
  name: string;
}

interface ProCardProps {
  name: string;
  profession: string;
  location: string;
  animals: Animal[];
  imageUrl: any;
  style?: StyleProp<ViewStyle>; // Ajout de la propriété style
}

const ProCard: React.FC<ProCardProps> = ({
  name,
  profession,
  location,
  animals,
  imageUrl,
  style,
}) => {
  return (
    <View
      className="bg-white rounded-lg p-4 flex-row items-center shadow-md"
      style={style}
    >
      <Image source={imageUrl} className="w-16 h-16 rounded-full" />
      <View className="ml-4 flex-1">
        <Text className="text-lg font-bold text-[#2A3FDD]">{name}</Text>
        <Text className="text-sm text-[#C34C2B]">{profession}</Text>
        <View className="flex-row items-center mt-2">
          <Ionicons name="location" size={16} color="#C34C2B" />
          <Text className="ml-1 text-sm text-gray-600">{location}</Text>
        </View>
        <View className="flex-row mt-2 space-x-2">
          {animals.map((animal) => (
            <View
              key={animal.id}
              className="bg-gray-200 px-2 py-1 rounded-full"
            >
              <Text>{animal.name}</Text>
            </View>
          ))}
        </View>
      </View>
      <Ionicons name="heart" size={24} color="#C34C2B" />
    </View>
  );
};

export default ProCard;
