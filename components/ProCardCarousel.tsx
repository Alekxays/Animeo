import React, { useRef, useState } from "react";
import { View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ProCard from "./ProCard";

const { width: screenWidth } = Dimensions.get("window");

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

interface ProCardCarouselProps {
  pros: Pro[];
}

const ProCardCarousel: React.FC<ProCardCarouselProps> = ({ pros }) => {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToLeft = () => {
    if (scrollRef.current) {
      const newIndex = Math.max(currentIndex - 1, 0);
      scrollRef.current.scrollTo({
        x: newIndex * (screenWidth * 0.9 + 16),
        animated: true,
      });
      setCurrentIndex(newIndex);
    }
  };

  const scrollToRight = () => {
    if (scrollRef.current) {
      const newIndex = Math.min(currentIndex + 1, pros.length - 1);
      scrollRef.current.scrollTo({
        x: newIndex * (screenWidth * 0.9 + 16),
        animated: true,
      });
      setCurrentIndex(newIndex);
    }
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (screenWidth * 0.9 + 16));
    setCurrentIndex(index);
  };

  return (
    <View className="relative flex-1">
      {currentIndex > 0 && (
        <TouchableOpacity
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2"
          onPress={scrollToLeft}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
      )}

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={screenWidth * 0.9 + 16}
        decelerationRate="fast"
      >
        {pros.map((pro) => (
          <ProCard
            key={pro.id}
            name={pro.name}
            profession={pro.profession}
            location={pro.location}
            animals={pro.animals}
            imageUrl={pro.imageUrl}
            style={{
              width: screenWidth * 0.9,
              marginHorizontal: 8,
            }}
          />
        ))}
      </ScrollView>

      {currentIndex < pros.length - 1 && (
        <TouchableOpacity
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2"
          onPress={scrollToRight}
        >
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProCardCarousel;
