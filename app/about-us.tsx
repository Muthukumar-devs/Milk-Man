import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const AboutUs = () => {
  const appInfo = {
    name: 'Milk Man',
    tagline: 'Fresh Dairy · Delivered Daily',
    mission: 'To deliver pure, farm-fresh milk and dairy products to your doorstep every morning, making healthy dairy consumption easy, affordable and reliable for every household.',
    features: [
      'Pure A2 Cow & Buffalo Milk daily',
      'Fresh Paneer, Butter, Ghee & Curd',
      'VIP membership with up to 30% off',
      'Flexible daily/alternate/custom subscriptions'
    ],
    contact: {
      email: 'support@milkman.com',
      phone: '+91 98765 43210',
      address: 'Chennai, Tamil Nadu, India'
    },
    version: '1.0.0',
    copyright: '© 2025 Milk Man. All rights reserved.'
  };

  return (
    <View className="flex-1 bg-cream">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 bg-cream border-b border-cream-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#4E342E" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-espresso ml-4">About Us</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Logo Section */}
        <View className="items-center py-8 bg-cream-100">
          <Image 
            source={require('../assets/images/logo.jpg')}
            className="w-36 h-36 rounded-full mb-4"
            resizeMode="cover"
          />
          <Text className="text-2xl font-bold text-espresso">Milk Man</Text>
          <Text className="text-espresso-100 mt-1">{appInfo.tagline}</Text>
        </View>

        {/* Mission Section */}
        <View className="px-6 py-6">
          <Text className="text-xl font-semibold text-espresso mb-4">Our Mission</Text>
          <Text className="text-espresso-100 leading-6 mb-6">
            {appInfo.mission}
          </Text>

          <Text className="text-xl font-semibold text-espresso mb-4">What We Offer</Text>
          <View className="space-y-3 mb-6">
            {appInfo.features.map((feature, index) => (
              <View key={index} className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text className="text-espresso-100 ml-3">{feature}</Text>
              </View>
            ))}
          </View>

          <Text className="text-xl font-semibold text-espresso mb-4">Contact Information</Text>
          <View className="bg-cream-100 rounded-xl p-4 ">
            <View className="flex-row items-center mb-2">
              <Ionicons name="mail" size={18} color="#4E342E" />
              <Text className="text-espresso-100 ml-3 ">{appInfo.contact.email}</Text>
            </View>
            <View className="flex-row items-center mb-2">
              <Ionicons name="call" size={18} color="#4E342E" />
              <Text className="text-espresso-100 ml-3 ">{appInfo.contact.phone}</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="location" size={18} color="#4E342E" />
              <Text className="text-espresso-100 ml-3">{appInfo.contact.address}</Text>
            </View>
          </View>
        </View>

        {/* Version Info */}
        <View className="items-center py-6 border-t border-cream-200">
          <Text className="text-ochre-200 text-sm">Version {appInfo.version}</Text>
          <Text className="text-ochre-200 text-sm mt-1">{appInfo.copyright}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutUs;
