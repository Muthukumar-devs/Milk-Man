import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Fresh Milk Every Morning',
    description: 'Get pure A2 cow milk and buffalo milk delivered to your doorstep every morning before 7 AM.',
    image: require('../assets/images/onboard1.jpg'),
  },
  {
    id: 2,
    title: 'Subscribe & Save',
    description: 'Set up a daily, alternate-day or custom milk subscription and never run out of fresh dairy again.',
    image: require('../assets/images/onboard2.jpg'),
  },
  {
    id: 3,
    title: 'VIP Dairy Benefits',
    description: 'Join our VIP plan and save up to 30% on milk, paneer, ghee, curd and all dairy products.',
    image: require('../assets/images/onboard3.jpg'),
  },
];

const Onboarding = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleNext = async () => {
    if (currentIndex < onboardingData.length - 1) {
      const next = currentIndex + 1;
      scrollRef.current?.scrollTo({ x: next * width, animated: true });
      setCurrentIndex(next);
    } else {
      await AsyncStorage.setItem('hasOnboarded', 'true');
      router.replace('/login');
    }
  };

  const skipToLogin = async () => {
    await AsyncStorage.setItem('hasOnboarded', 'true');
    router.replace('/login');
  };

  return (
    <Animated.View entering={FadeIn} className="flex-1 bg-cream">
      {/* Logo */}
      <View className="items-center mt-14 mb-6">
        <Image
          source={require('../assets/images/logo.jpg')}
          className="w-28 h-28 rounded-full"
          resizeMode="cover"
        />
        <Text className="text-xl font-bold text-espresso mt-3">Milk Man</Text>
        <Text className="text-xs text-ochre-200">Fresh Dairy · Delivered Daily</Text>
      </View>

      {/* Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        onMomentumScrollEnd={e => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      >
        {onboardingData.map(item => (
          <View key={item.id} style={{ width }} className="px-6">
            <View className="items-center mb-6">
              <Image
                source={item.image}
                className="w-72 h-64 rounded-3xl"
                resizeMode="cover"
              />
            </View>
            <Text className="text-2xl font-bold text-espresso text-center mb-3">{item.title}</Text>
            <Text className="text-base text-espresso-100 text-center leading-6">{item.description}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Dots */}
      <View className="flex-row justify-center mt-6 mb-8">
        {onboardingData.map((_, i) => (
          <View
            key={i}
            className={`h-2 rounded-full mx-1 ${i === currentIndex ? 'bg-ochre-200 w-6' : 'bg-ochre-100 w-2'}`}
          />
        ))}
      </View>

      {/* Navigation */}
      <View className="flex-row justify-between items-center px-6 pb-10">
        <TouchableOpacity onPress={skipToLogin}>
          <Text className="text-base font-semibold text-ochre-200">SKIP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          className="bg-ochre-200 w-14 h-14 rounded-full items-center justify-center"
        >
          <Ionicons name={currentIndex === onboardingData.length - 1 ? 'checkmark' : 'chevron-forward'} size={26} color="#3E2723" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Onboarding;
