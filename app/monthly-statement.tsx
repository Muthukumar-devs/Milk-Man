import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const statements = [
  {
    month: 'January 2025',
    amount: 4350,
    status: 'unpaid',
    deliveries: 31,
    items: [
      { name: 'A2 Cow Milk 500ml', quantity: '31 days × 2 pcs', price: 4340, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=60&h=60&fit=crop' },
      { name: 'Fresh Paneer 200gm', quantity: '4 times', price: 480, image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=60&h=60&fit=crop' },
    ],
  },
  {
    month: 'December 2024',
    amount: 3720,
    status: 'paid',
    deliveries: 28,
    items: [
      { name: 'A2 Cow Milk 500ml', quantity: '28 days × 2 pcs', price: 3920, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=60&h=60&fit=crop' },
      { name: 'Dahi 400gm', quantity: '6 times', price: 360, image: 'https://images.unsplash.com/photo-1571212515416-fca88c6c4b3c?w=60&h=60&fit=crop' },
    ],
  },
  {
    month: 'November 2024',
    amount: 3200,
    status: 'paid',
    deliveries: 30,
    items: [
      { name: 'Buffalo Milk 500ml', quantity: '30 days × 1 pc', price: 1950, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=60&h=60&fit=crop' },
      { name: 'White Butter 100gm', quantity: '8 times', price: 640, image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=60&h=60&fit=crop' },
      { name: 'Fresh Paneer 200gm', quantity: '3 times', price: 360, image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=60&h=60&fit=crop' },
    ],
  },
];

const MonthlyStatement = () => {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <View className="flex-1 bg-cream-100">
      {/* Header */}
      <View className="bg-cream px-4 py-4 border-b border-cream-200 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="chevron-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-espresso">Monthly Statement</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* VIP Banner */}
        <View className="mt-4 mx-4 p-4 rounded-xl" style={{ backgroundColor: '#E6A85C' }}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="bg-espresso px-2 py-1 rounded">
                <Text className="text-cream text-xs font-bold">VIP</Text>
              </View>
              <View className="ml-3">
                <Text className="text-espresso text-sm font-semibold">Save on monthly bills</Text>
                <Text className="text-espresso-100 text-xs">VIP members save up to 30%</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-ochre-200 px-4 py-2 rounded-full" onPress={() => router.push('/vip-membership')}>
              <Text className="text-cream text-xs font-semibold">Know More</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Statements */}
        {statements.map((s, i) => (
          <View key={i} className="bg-cream mx-4 mt-4 rounded-2xl overflow-hidden border border-cream-200">
            {/* Statement Header */}
            <TouchableOpacity
              className="flex-row items-center justify-between p-4"
              onPress={() => setExpanded(expanded === i ? null : i)}
            >
              <View>
                <Text className="text-base font-bold text-espresso">{s.month}</Text>
                <Text className="text-xs text-ochre-200 mt-1">{s.deliveries} deliveries</Text>
              </View>
              <View className="flex-row items-center" style={{ gap: 10 }}>
                <Text className="text-xl font-bold text-espresso">₹{s.amount}</Text>
                <TouchableOpacity className="p-1">
                  <Ionicons name="download-outline" size={20} color="#4E342E" />
                </TouchableOpacity>
                <TouchableOpacity
                  className={`px-5 py-2 rounded-full ${s.status === 'paid' ? 'bg-ochre-100' : 'bg-ochre-200'}`}
                >
                  <Text className="text-cream text-xs font-bold">{s.status === 'paid' ? 'PAID' : 'PAY NOW'}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            {/* Expanded Items */}
            {expanded === i && (
              <View className="border-t border-cream-200 px-4 pb-4">
                {s.items.map((item, j) => (
                  <View key={j} className="flex-row items-center py-3 border-b border-gray-50">
                    <Image source={item.image} className="w-12 h-12 rounded-xl mr-3" />
                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-espresso">{item.name}</Text>
                      <Text className="text-xs text-ochre-200">{item.quantity}</Text>
                    </View>
                    <Text className="text-sm font-bold text-espresso">₹{item.price}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        <View className="h-8" />
      </ScrollView>
    </View>
  );
};

export default MonthlyStatement;
