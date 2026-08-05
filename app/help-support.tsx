import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const HelpSupport = () => {
  const helpCategories = [
    { title: 'FAQ', hasChevron: true },
    { title: 'Complaint', hasChevron: true },
  ];

  const openTickets = [
    {
      title: 'I have issues with my delivery',
      date: '12 Oct 2023',
      hasNotification: true,
    },
    {
      title: 'I have issue with my last order',
      date: '15 Oct 2023',
      hasNotification: false,
    },
  ];

  return (
    <View className="flex-1 bg-cream">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 bg-cream border-b border-cream-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#4E342E" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-espresso ml-4">Help & Support</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/help-chat')}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#4E342E" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Help Categories */}
        <View className="px-4 pt-4">
          {helpCategories.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              className="flex-row items-center py-4 border-b border-cream-200"
              onPress={() => {
                if (item.title === 'FAQ') {
                  router.push('/faq');
                } else if (item.title === 'Complaint') {
                  router.push('/complaint');
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

        {/* My Open Tickets Section */}
        <View className="px-4 mt-8">
          <View className="bg-cream-100 p-4 rounded-t-lg border border-cream-200">
            <Text className="text-lg font-semibold text-espresso">My Open Tickets</Text>
          </View>
          
          <View className="bg-cream border-l border-r border-b border-cream-200 rounded-b-lg">
            {openTickets.map((ticket, index) => (
              <TouchableOpacity 
                key={index} 
                className="flex-row items-center justify-between p-4 border-b border-cream-200 last:border-b-0"
              >
                <View className="flex-1">
                  <Text className="text-base text-espresso mb-1">{ticket.title}</Text>
                  <Text className="text-sm text-ochre-200">{ticket.date}</Text>
                </View>
                {ticket.hasNotification && (
                  <View className="bg-green-500 w-8 h-8 rounded-full items-center justify-center ml-3">
                    <Text className="text-cream text-sm font-bold">1</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="h-8" />
      </ScrollView>
    </View>
  );
};

export default HelpSupport;
