import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const Account = () => {
  const menuSections = [
    {
      title: 'Orders & Delivery',
      items: [
        { icon: 'receipt-outline', title: 'Order History', route: '/orders' },
        { icon: 'calendar-outline', title: 'My Subscriptions', route: '/(tabs)/subscriptions' },
        { icon: 'document-text-outline', title: 'Monthly Statement', route: '/monthly-statement' },
        { icon: 'swap-horizontal-outline', title: 'Wallet Transactions', route: '/wallet-transactions' },
        { icon: 'airplane-outline', title: 'Set Vacation', route: '/vacation' },
        { icon: 'calendar', title: 'Delivery Calendar', route: '/calendar' },
      ],
    },
    {
      title: 'Offers & Rewards',
      items: [
        { icon: 'pricetag-outline', title: 'Offers & Deals', route: '/(tabs)/offer' },
        { icon: 'people-outline', title: 'Refer & Earn', route: '/refers' },
        { icon: 'star-outline', title: 'VIP Membership', route: '/vip-membership' },
      ],
    },
    {
      title: 'Account',
      items: [
        { icon: 'person-outline', title: 'Account & Preferences', route: '/account-preferences' },
        { icon: 'location-outline', title: 'Delivery Address', route: '/address' },
        { icon: 'help-circle-outline', title: 'Help & Support', route: '/help-support', badge: true },
        { icon: 'shield-checkmark-outline', title: 'Legal', route: '/legal' },
      ],
    },
  ];

  return (
    <Animated.View entering={FadeIn} className="flex-1 bg-cream-100">
      {/* Header */}
      <View className="bg-cream px-4 py-4 border-b border-cream-200">
        <Text className="text-xl font-bold text-espresso">Account</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">

        {/* Profile Card */}
        <View className="bg-cream mx-4 mt-4 rounded-2xl p-4 flex-row items-center border border-cream-200">
          <View className="w-14 h-14 bg-cream-200 rounded-full items-center justify-center mr-4">
            <Ionicons name="person" size={28} color="#3E2723" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-bold text-espresso">Mk Dev</Text>
            <Text className="text-sm text-ochre-200">+91 98765 43210</Text>
            <Text className="text-xs text-ochre-200">103, Ashok Pillar, Chennai</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/account-preferences')}>
            <Ionicons name="create-outline" size={22} color="#3E2723" />
          </TouchableOpacity>
        </View>

        {/* VIP Card */}
        <LinearGradient 
          colors={['#DFCDA2', '#C9A86A']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="mx-4 mt-4 p-4 rounded-xl"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="bg-espresso px-2 py-1 rounded">
                <Text className="text-cream text-xs font-bold">VIP</Text>
              </View>
              <View className="ml-3">
                <Text className="text-espresso text-base font-semibold">VIP Membership</Text>
                <Text className="text-espresso-100 text-xs">Discounted dairy prices</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-ochre-200 px-4 py-2 rounded-full" onPress={() => router.push('/vip-membership')}>
              <Text className="text-cream text-xs font-semibold">Know More</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Menu Sections */}
        {menuSections.map((section, si) => (
          <View key={si} className="mx-4 mt-4">
            <Text className="text-xs font-bold text-ochre-200 uppercase mb-2 px-1">{section.title}</Text>
            <View className="bg-cream rounded-2xl overflow-hidden border border-cream-200">
              {section.items.map((item, ii) => (
                <TouchableOpacity
                  key={ii}
                  className={`flex-row items-center px-4 py-4 ${ii < section.items.length - 1 ? 'border-b border-cream-200' : ''}`}
                  onPress={() => router.push(item.route as any)}
                >
                  <View className="w-8 h-8 bg-cream-200 rounded-lg items-center justify-center mr-3">
                    <Ionicons name={item.icon as any} size={18} color="#3E2723" />
                  </View>
                  <Text className="flex-1 text-sm text-espresso-100 font-medium">{item.title}</Text>
                  {(item as any).badge && (
                    <View className="bg-red-500 w-5 h-5 rounded-full items-center justify-center mr-2">
                      <Text className="text-cream text-xs font-bold">1</Text>
                    </View>
                  )}
                  <Ionicons name="chevron-forward" size={16} color="#ccc" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <View className="flex-row justify-between items-center px-4 py-6 mt-4 mb-4">
          <Text className="text-ochre-200 text-xs">v1.0.0 · Milk Man</Text>
          <TouchableOpacity
            onPress={() =>
              Alert.alert('Logout', 'Are you sure you want to logout?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', style: 'destructive', onPress: () => router.replace('/login') },
              ])
            }
          >
            <Text className="text-red-500 text-sm font-semibold">LOG OUT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default Account;
