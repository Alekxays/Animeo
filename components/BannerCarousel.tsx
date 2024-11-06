import React, { useRef, useState } from "react";
import { ScrollView, View, Dimensions } from "react-native";
import Banner from "./Banner";
import CarouselNavigation from "./CarouselNavigation";

const { width: screenWidth } = Dimensions.get("window");

interface BannerCarouselProps {
  banners: Array<{ id: number; image: any; title: string }>;
  onBannerPress: (id: number) => void;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({
  banners,
  onBannerPress,
}) => {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToLeft = () => {
    if (scrollRef.current) {
      const newIndex = Math.max(currentIndex - 1, 0);
      scrollRef.current.scrollTo({
        x: newIndex * screenWidth,
        animated: true,
      });
      setCurrentIndex(newIndex);
    }
  };

  const scrollToRight = () => {
    if (scrollRef.current) {
      const newIndex = Math.min(currentIndex + 1, banners.length - 1);
      scrollRef.current.scrollTo({
        x: newIndex * screenWidth,
        animated: true,
      });
      setCurrentIndex(newIndex);
    }
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setCurrentIndex(index);
  };

  return (
    <View className="flex-1">
      <CarouselNavigation
        direction="left"
        onPress={scrollToLeft}
        show={currentIndex > 0}
      />
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {banners.map((item) => (
          <Banner
            key={item.id}
            image={item.image}
            title={item.title}
            onPress={() => onBannerPress(item.id)}
          />
        ))}
      </ScrollView>
      <CarouselNavigation
        direction="right"
        onPress={scrollToRight}
        show={currentIndex < banners.length - 1}
      />
    </View>
  );
};

export default BannerCarousel;
