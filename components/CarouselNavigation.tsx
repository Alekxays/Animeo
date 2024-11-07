import React from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface CarouselNavigationProps {
  direction: "left" | "right";
  onPress: () => void;
  show: boolean;
}

const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  direction,
  onPress,
  show,
}) => {
  if (!show) return null;

  return (
    <TouchableOpacity
      className={`absolute ${
        direction === "left" ? "left-[-2px]" : "right-[-2px]"
      } top-1/2 -translate-y-1/2 z-10 p-2`}
      onPress={onPress}
    >
      <AntDesign name={direction} size={20} color="black" />
    </TouchableOpacity>
  );
};

export default CarouselNavigation;
