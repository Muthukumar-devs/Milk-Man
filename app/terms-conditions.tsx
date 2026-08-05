import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const TermsConditions = () => {
  const termsData = [
    {
      title: 'Acceptance of Terms',
      content: 'By using the Milk Man app, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.'
    },
    {
      title: 'Service Description',
      content: 'Milk Man provides grocery delivery services including fresh dairy products, fruits, vegetables, and other daily essentials to customers within our service areas.'
    },
    {
      title: 'User Responsibilities',
      content: 'Users must provide accurate information, maintain account security, and use the service in compliance with applicable laws and regulations.'
    },
    {
      title: 'Payment Terms',
      content: 'All payments must be made through approved payment methods. Prices are subject to change without notice. Refunds are processed according to our refund policy.'
    },
    {
      title: 'Delivery Policy',
      content: 'We strive to deliver products within the specified time frame. Delivery times may vary due to weather conditions, traffic, or other unforeseen circumstances.'
    },
    {
      title: 'Privacy & Data',
      content: 'We collect and use personal information in accordance with our Privacy Policy. Your data is protected and will not be shared with third parties without consent.'
    },
    {
      title: 'Limitation of Liability',
      content: 'Milk Man shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.'
    }
  ];

  return (
    <View className="flex-1 bg-cream">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 bg-cream border-b border-cream-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#4E342E" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-espresso ml-4">Terms & Conditions</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header Section */}
        <View className="items-center py-6 bg-cream-100">
          <Image 
            source={require('../assets/images/logo.jpg')}
            className="w-36 h-36 rounded-full mb-3"
            resizeMode="cover"
          />
          <Text className="text-lg font-semibold text-espresso">Milk Man Terms & Conditions</Text>
          <Text className="text-espresso-100 text-sm mt-1">Last updated: November 2025</Text>
        </View>
         
        {/* Terms Content */}
        <View className="px-4 py-4">
          {termsData.map((term, index) => (
            <View key={index} className="mb-6">
              <Text className="text-lg font-semibold text-espresso mb-3">
                {index + 1}. {term.title}
              </Text>
              <Text className="text-espresso-100 leading-6 text-sm">
                {term.content}
              </Text>
            </View>
          ))}
        </View>

        {/* Contact Section */}
        <View className="bg-cream-200 mx-4 mb-6 rounded-xl p-4 border border-ochre-200">
          <View className="flex-row items-center mb-2">
            <Ionicons name="mail" size={18} color="#3b82f6" />
            <Text className="text-espresso font-medium ml-2">Questions?</Text>
          </View>
          <Text className="text-espresso-100 text-sm">
            If you have any questions about these Terms & Conditions, please contact us at legal@milkman.com
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default TermsConditions;
