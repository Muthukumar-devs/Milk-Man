import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const VipMembership = () => {
  const membershipPlans = [
    {
      id: 1,
      discount: 'Minimum 20%',
      title: 'Discount on MRP',
      maxDiscount: '₹ 4000',
      validity: '30 days',
      cost: '₹ 200'
    },
    {
      id: 2,
      discount: 'Minimum 20%',
      title: 'Discount on MRP',
      maxDiscount: '₹ 4000',
      validity: '60 days',
      cost: '₹ 400'
    },
    {
      id: 3,
      discount: 'Minimum 30%',
      title: 'Discount on MRP',
      maxDiscount: '₹ 4000',
      validity: '30 days',
      cost: '₹ 400'
    },
    {
      id: 4,
      discount: 'Minimum 30%',
      title: 'Discount on MRP',
      maxDiscount: '₹ 8000',
      validity: '60 days',
      cost: '₹ 800'
    },
    {
      id: 5,
      discount: 'Minimum 40%',
      title: 'Discount on MRP',
      maxDiscount: '₹ 8000',
      validity: '30 days',
      cost: '₹ 800'
    }
  ];

  return (
    <View className="flex-1 bg-cream-100">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 bg-cream">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#4E342E" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-espresso ml-4">VIP Membership</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Membership Plans */}
        <View className="px-4 pt-4">
          {membershipPlans.map((plan) => (
            <LinearGradient
              key={plan.id}
              colors={['#FDE68A', '#D4BE8B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ borderRadius: 12, padding: 16, marginBottom: 16 }}
            >
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <View className="bg-espresso px-2 py-1 rounded mr-3">
                    <Text className="text-cream text-xs font-bold">VIP</Text>
                  </View>
                  <View>
                    <Text className="text-base font-semibold text-espresso">{plan.discount}</Text>
                    <Text className="text-sm text-espresso-100">{plan.title}</Text>
                  </View>
                </View>
                <TouchableOpacity className="bg-espresso px-6 py-2 rounded-full">
                  <Text className="text-cream text-sm font-medium">BUY</Text>
                </TouchableOpacity>
              </View>

              <View className="border-t border-[#C4A962] pt-4">
              <View className="flex-row justify-between">
                <View>
                  <Text className="text-xs text-espresso-100 mb-1">Max Discount</Text>
                  <Text className="text-sm font-semibold text-espresso">{plan.maxDiscount}</Text>
                </View>
                <View>
                  <Text className="text-xs text-espresso-100 mb-1">Validity</Text>
                  <Text className="text-sm font-semibold text-espresso">{plan.validity}</Text>
                </View>
                <View>
                  <Text className="text-xs text-espresso-100 mb-1">Cost</Text>
                  <Text className="text-sm font-semibold text-espresso">{plan.cost}</Text>
                </View>
              </View>
              </View>
            </LinearGradient>
          ))}
        </View>

        {/* Footer Links */}
        <View className="flex-row justify-between px-4 py-8">
          <TouchableOpacity>
            <Text className="text-espresso-100 text-base underline">VIP FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-espresso-100 text-base underline">Terms and Conditions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default VipMembership;
