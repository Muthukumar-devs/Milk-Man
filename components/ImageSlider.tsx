import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const { width: screenWidth } = Dimensions.get('window');

interface ImageSliderProps {
  images: (string | any)[];
  height?: number;
  videoSource?: any;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, height = 170, videoSource }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const totalItems = (videoSource ? 1 : 0) + images.length;
      const nextIndex = currentIndex + 1;
      if (nextIndex >= totalItems) {
        scrollViewRef.current?.scrollTo({ x: 0, animated: false });
        setCurrentIndex(0);
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({ x: screenWidth, animated: true });
          setCurrentIndex(1);
        }, 6000);
      } else {
        scrollViewRef.current?.scrollTo({ x: nextIndex * screenWidth, animated: true });
        setCurrentIndex(nextIndex);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length, videoSource]);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);
    setCurrentIndex(index);
    setShouldPlayVideo(index === 0);
  };

  return (
    <View style={[styles.container, { height }]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        snapToInterval={screenWidth}
        decelerationRate="fast"
        bounces={false}
        scrollEnabled={true}
      >
        {videoSource && (
          <Video
            source={videoSource}
            style={[styles.image, { width: screenWidth, height }]}
            shouldPlay={shouldPlayVideo}
            isLooping
            isMuted
            resizeMode={"cover" as any}
          />
        )}
        {images.map((image, index) => (
          <Image
            key={index}
            source={typeof image === 'string' ? { uri: image } : image}
            style={[styles.image, { width: screenWidth, height }]}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
      

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    // borderRadius: 10,
  },

});

export default ImageSlider;
