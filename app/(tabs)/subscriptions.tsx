import React, { useState } from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Text, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const subscriptionData = [
  {
    id: 1,
    name: 'A2 Cow Milk',
    size: '500 ml',
    image: require('../../assets/images/milk.jpg'),
    nextDelivery: 'Tomorrow, 6:00 AM',
    frequency: 'Daily',
    qty: 1,
    price: 70,
    status: 'active',
  },
  {
    id: 2,
    name: 'Fresh Paneer',
    size: '200 gm',
    image: require('../../assets/images/paneer.jpg'),
    nextDelivery: 'Mon, Wed, Fri',
    frequency: 'Alternate',
    qty: 1,
    price: 120,
    status: 'active',
  },
  {
    id: 3,
    name: 'White Butter',
    size: '100 gm',
    image: require('../../assets/images/butter.jpg'),
    nextDelivery: 'Paused',
    frequency: 'Weekly',
    qty: 1,
    price: 80,
    status: 'paused',
  },
];

const MySubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState(subscriptionData);

  const togglePause = (id: number) => {
    setSubscriptions(prev =>
      prev.map(s =>
        s.id === id ? { ...s, status: s.status === 'active' ? 'paused' : 'active' } : s
      )
    );
  };

  const handleDelete = (id: number) => {
    Alert.alert('Cancel Subscription', 'Are you sure you want to cancel this subscription?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', style: 'destructive', onPress: () => setSubscriptions(prev => prev.filter(s => s.id !== id)) },
    ]);
  };

  const activeCount = subscriptions.filter(s => s.status === 'active').length;
  const monthlyTotal = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + s.price * 30, 0);

  return (
    <Animated.View entering={FadeIn} className="flex-1 bg-cream-100">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 bg-cream border-b border-cream-200">
        <Text className="text-xl font-bold text-espresso">My Subscriptions</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">

        {/* Summary Card */}
        <LinearGradient 
          colors={['#4E342E', '#3E2723']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="mx-4 mt-4 rounded-2xl p-4 shadow-sm"
        >
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-cream text-sm opacity-80">Active Subscriptions</Text>
              <Text className="text-cream text-3xl font-bold">{activeCount}</Text>
            </View>
            <View className="items-end">
              <Text className="text-cream text-sm opacity-80">Est. Monthly</Text>
              <Text className="text-cream text-2xl font-bold">₹{monthlyTotal}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* VIP Banner */}
        <LinearGradient 
          colors={['#DFCDA2', '#C9A86A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="mx-4 mt-4 p-4 rounded-xl shadow-sm"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="bg-espresso px-2 py-1 rounded">
                <Text className="text-cream text-xs font-bold">VIP</Text>
              </View>
              <View className="ml-3">
                <Text className="text-espresso text-base font-semibold">Save more with VIP</Text>
                <Text className="text-espresso-100 text-xs">Up to 30% off on all dairy</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-cream px-4 py-2 rounded-full" onPress={() => router.push('/vip-membership')}>
              <Text className="text-espresso text-xs font-semibold">Know More</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Subscriptions List */}
        <View className="px-4 mt-4">
          <Text className="text-base font-bold text-espresso-100 mb-3">Active & Paused</Text>
          {subscriptions.map(item => (
            <View key={item.id} className="bg-cream rounded-2xl mb-3 overflow-hidden border border-cream-200">
              <View className="flex-row p-4">
                <Image source={item.image} className="w-16 h-16 rounded-xl mr-4" resizeMode="cover" />
                <View className="flex-1">
                  <View className="flex-row justify-between items-start">
                    <View>
                      <Text className="text-base font-bold text-espresso">{item.name}</Text>
                      <Text className="text-xs text-ochre-200">{item.size} · {item.frequency}</Text>
                    </View>
                    <Text className="text-base font-bold text-espresso">₹{item.price}/day</Text>
                  </View>
                  <View className="flex-row items-center mt-2">
                    <Ionicons
                      name={item.status === 'active' ? 'time-outline' : 'pause-circle-outline'}
                      size={14}
                      color={item.status === 'active' ? '#10b981' : '#f59e0b'}
                    />
                    <Text className={`text-xs ml-1 ${item.status === 'active' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {item.status === 'active' ? item.nextDelivery : 'Paused'}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Action Row */}
              <View className="flex-row border-t border-cream-200">
                <TouchableOpacity
                  className="flex-1 py-3 items-center"
                  onPress={() => router.push(`/product-detail?id=${item.id}&name=${item.name}&price=${item.price}&originalPrice=${item.price}&size=${item.size}&image=https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop&category=Milk`)}
                >
                  <Text className="text-espresso text-sm font-semibold">Edit</Text>
                </TouchableOpacity>
                <View className="w-px bg-cream-100" />
                <TouchableOpacity className="flex-1 py-3 items-center" onPress={() => togglePause(item.id)}>
                  <Text className={`text-sm font-semibold ${item.status === 'active' ? 'text-yellow-600' : 'text-green-600'}`}>
                    {item.status === 'active' ? 'Pause' : 'Resume'}
                  </Text>
                </TouchableOpacity>
                <View className="w-px bg-cream-100" />
                <TouchableOpacity className="flex-1 py-3 items-center" onPress={() => handleDelete(item.id)}>
                  <Text className="text-red-500 text-sm font-semibold">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Add New Subscription */}
        <TouchableOpacity
          className="mx-4 mt-2 mb-4 border-2 border-dashed border-[#D4BE8B] rounded-2xl py-4 items-center"
          style={{ backgroundColor: 'rgba(212, 190, 139, 0.1)' }}
          onPress={() => router.push('/(tabs)/products')}
        >
          <Ionicons name="add-circle-outline" size={28} color="#3E2723" />
          <Text className="text-espresso font-semibold mt-1">Add New Product</Text>
        </TouchableOpacity>

        {/* Bottom Buttons */}
        <View className="flex-row px-4 mb-8" style={{ gap: 12 }}>
          <TouchableOpacity
            className="flex-1 overflow-hidden rounded-full shadow-sm"
            onPress={() => router.push('/vacation')}
            activeOpacity={0.8}
          >
            <LinearGradient colors={['#4E342E', '#3E2723']} className="py-4 flex-row items-center justify-center">
              <Ionicons name="airplane-outline" size={18} color="white" />
              <Text className="text-cream text-sm font-semibold ml-2">SET VACATION</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 overflow-hidden rounded-full shadow-sm"
            onPress={() => router.push('/calendar')}
            activeOpacity={0.8}
          >
            <LinearGradient colors={['#DFCDA2', '#C9A86A']} className="py-4 flex-row items-center justify-center">
              <Ionicons name="calendar-outline" size={18} color="#3E2723" />
              <Text className="text-espresso text-sm font-semibold ml-2">CALENDAR</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default MySubscriptions;
