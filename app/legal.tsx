import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const Legal = () => {
  const legalItems = [
    { title: 'About Us', hasChevron: true },
    { title: 'Term & Condition', hasChevron: true },
    { title: 'Privacy Policy', hasChevron: true },
    { title: 'Certification', hasChevron: true },
  ];

  return (
    <View className="flex-1 bg-cream">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 bg-cream border-b  border-cream-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#4E342E" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-espresso ml-4">Legal</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="px-4 pt-4">
          {legalItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              className="flex-row items-center py-4 border-b border-cream-200"
              onPress={() => {
                if (item.title === 'About Us') {
                  router.push('/about-us');
                } else if (item.title === 'Term & Condition') {
                  router.push('/terms-conditions');
                } else if (item.title === 'Privacy Policy') {
                  router.push('/privacy-policy');
                } else if (item.title === 'Certification') {
                  router.push('/certification');
                }
              }}
            >
              <Text className="flex-1 text-base text-espresso-100">{item.title}</Text>
              {item.hasChevron && (
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Legal;
