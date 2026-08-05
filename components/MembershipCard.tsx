import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';

const MembershipCard: React.FC = () => {
  return (
    <LinearGradient
      colors={['#FDE68A', '#D4BE8B']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        marginHorizontal: 16,
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 80
      }}
    >
      <View className="flex-row items-center">
        <Image 
          source={require('../assets/images/logo.jpg')}
          style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }}
          resizeMode="cover"
        />
        <View>
          <Text className="text-espresso text-xl font-bold">VIP Membership</Text>
          <Text className="text-espresso-100 text-base opacity-80">Discounted prices</Text>
        </View>
      </View>

      <TouchableOpacity
        className="bg-espresso px-8 py-2 rounded-full"
        onPress={() => router.push('/vip-membership')}
      >
        <Text className="text-cream text-sm font-bold">Know More</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default MembershipCard;
