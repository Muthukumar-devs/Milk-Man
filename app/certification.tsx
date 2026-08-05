import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const Certification = () => {
  const certifications = [
    {
      id: '1',
      title: 'ISO 9001:2015',
      subtitle: 'Quality Management System',
      description: 'Certified for maintaining high quality standards in our operations and services.',
      validUntil: '2025-12-31',
      status: 'Active',
    },
    {
      id: '2',
      title: 'HACCP Certified',
      subtitle: 'Food Safety Management',
      description: 'Hazard Analysis Critical Control Points certification for food safety.',
      validUntil: '2024-08-15',
      status: 'Active',
    },
    {
      id: '3',
      title: 'Organic Certification',
      subtitle: 'USDA Organic Standards',
      description: 'Certified organic products meeting strict agricultural standards.',
      validUntil: '2024-11-20',
      status: 'Active',
    },
  ];

  return (
    <View className="flex-1 bg-cream-100">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 bg-cream border-b border-cream-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#4E342E" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-espresso ml-4">Certifications</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header Info */}
        <View className="bg-cream mx-4 mt-4 p-6 rounded-xl border border-cream-200">
          <View className="items-center">
            <Image 
              source={require('../assets/images/logo.jpg')} 
              className="w-36 h-36 rounded-full"
              resizeMode="cover"
            />
            <Text className="text-lg font-semibold text-espresso mb-2">Quality Assured</Text>
            <Text className="text-espresso-100 text-center">
              Our certifications ensure the highest standards of quality, safety, and sustainability.
            </Text>
          </View>
        </View>

        {/* Certifications List */}
        <View className="px-4 mt-6">
          {certifications.map((cert) => (
            <View key={cert.id} className="bg-cream rounded-xl p-6 mb-4 border border-cream-200">
              <View className="flex-row items-start justify-between mb-4">
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-espresso mb-1">{cert.title}</Text>
                  <Text className="text-sm text-espresso-100 font-medium">{cert.subtitle}</Text>
                </View>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <Text className="text-green-700 text-xs font-medium">{cert.status}</Text>
                </View>
              </View>
              
              <Text className="text-espresso-100 text-sm mb-4 leading-5">{cert.description}</Text>
              
              <View className="flex-row items-center justify-between pt-4 border-t border-cream-200">
                <View>
                  <Text className="text-xs text-ochre-200 mb-1">Valid Until</Text>
                  <Text className="text-sm font-medium text-espresso-100">{cert.validUntil}</Text>
                </View>
                <TouchableOpacity className="flex-row items-center">
                  <Text className="text-espresso-100 text-sm font-medium mr-1">View Details</Text>
                  <Ionicons name="chevron-forward" size={16} color="#2563eb" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View className="bg-cream mx-4 mb-6 p-6 rounded-xl border border-cream-200">
          <View className="items-center">
            <Ionicons name="information-circle-outline" size={24} color="#6b7280" />
            <Text className="text-espresso-100 text-center mt-2 text-sm">
              All certifications are regularly audited and maintained to ensure compliance with industry standards.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Certification;
