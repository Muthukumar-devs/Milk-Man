import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const PrivacyPolicy = () => {
  const privacyData = [
    {
      title: 'Information We Collect',
      content: 'We collect personal information such as name, email, phone number, delivery address, and payment details when you create an account or place orders through our app.'
    },
    {
      title: 'How We Use Your Information',
      content: 'Your information is used to process orders, provide customer support, send notifications about deliveries, and improve our services based on your preferences.'
    },
    {
      title: 'Information Sharing',
      content: 'We do not sell or rent your personal information to third parties. Information may be shared with delivery partners solely for order fulfillment purposes.'
    },
    {
      title: 'Data Security',
      content: 'We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.'
    },
    {
      title: 'Location Data',
      content: 'We collect location data to provide accurate delivery services and estimate delivery times. Location tracking can be disabled in your device settings.'
    },
    {
      title: 'Cookies & Analytics',
      content: 'We use cookies and analytics tools to understand app usage patterns and improve user experience. You can manage cookie preferences in your browser settings.'
    },
    {
      title: 'Your Rights',
      content: 'You have the right to access, update, or delete your personal information. Contact us to exercise these rights or for any privacy-related concerns.'
    },
    {
      title: 'Policy Updates',
      content: 'This Privacy Policy may be updated periodically. We will notify users of significant changes through the app or email notifications.'
    }
  ];

  return (
    <View className="flex-1 bg-cream">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 bg-cream border-b border-cream-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#4E342E" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-espresso ml-4">Privacy Policy</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header Section */}
        <View className="items-center py-6 bg-cream-100">
          <Image 
            source={require('../assets/images/logo.jpg')}
            className="w-36 h-36 rounded-full mb-3"
            resizeMode="cover"
          />
          <Text className="text-lg font-semibold text-espresso">Milk Man Privacy Policy</Text>
          <Text className="text-espresso-100 text-sm mt-1">Last updated: November 2025</Text>
        </View>

        {/* Privacy Content */}
        <View className="px-4 py-4">
          {privacyData.map((policy, index) => (
            <View key={index} className="mb-6">
              <Text className="text-lg font-semibold text-espresso mb-3">
                {index + 1}. {policy.title}
              </Text>
              <Text className="text-espresso-100 leading-6 text-sm">
                {policy.content}
              </Text>
            </View>
          ))}
        </View>

        {/* Contact Section */}
        <View className="bg-green-50 mx-4 mb-6 rounded-xl p-4 border border-green-500">
          <View className="flex-row items-center mb-2">
            <Ionicons name="shield-checkmark" size={18} color="#10b981" />
            <Text className="text-green-800 font-medium ml-2">Privacy Questions?</Text>
          </View>
          <Text className="text-green-600 text-sm">
            For privacy-related inquiries or to exercise your rights, contact us at privacy@milkman.com
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;
