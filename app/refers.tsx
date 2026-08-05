import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

const refer = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-100">
      {/* Header */}
      <View className="bg-cream px-4 py-4 flex-row items-center border-b border-ochre-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#4E342E" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-espresso ml-4">Refer and Earn</Text>
      </View>

      {/* White Background Section */}
      <View className="bg-cream px-4 py-8">
        {/* Illustration */}
        <View className="items-center mb-8">
          <Image
            source={require('../assets/images/refer.png')}
            className="w-80 h-36 rounded-xl"
            resizeMode="contain"
          />
        </View>

        {/* Referral Code */}
        <View className="items-center mb-8">
          <View className="border-2 border-dashed border-ochre-200 rounded-xl px-8 py-4">
            <Text className="text-2xl font-bold text-green-600">XGSTY23</Text>
          </View>
        </View>

        {/* Share Button */}
        <View className="items-center mb-8">
          <TouchableOpacity className="bg-ochre-200 rounded-full py-4 " style={{ paddingLeft: 60, paddingRight: 60 }}>
            <Text className="text-cream text-center text-lg font-bold">SHARE</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Wave Border */}
      <Svg height="25" width="100%" viewBox="0 0 400 25">
        <Path
          d="M0,0 L400,0 L400,12 Q370,25 360,12 Q340,0 320,12 Q300,25 280,12 Q260,0 240,12 Q220,25 200,12 Q180,0 160,12 Q140,25 120,12 Q100,0 80,12 Q60,25 40,12 Q20,0 0,12 Z"
          fill="white"
        />
      </Svg>

      {/* Bottom Section */}
      <View className="flex-1 px-4 py-8">
        {/* Description */}
        <View className="items-center mb-8">
          <Text className="text-espresso-100 text-center text-base">
            Dynamic description of referral rule will show here
          </Text>
        </View>

        {/* Earnings */}
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-espresso">₹50 earned</Text>
        </View>

        {/* Stats */}
        <View className="bg-cream p-4 rounded-xl flex-row justify-between">
          <View className="items-center flex-1">
            <Text className="text-lg font-semibold text-espresso">Invited</Text>
            <Text className="text-2xl font-bold text-espresso">0</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-lg font-semibold text-espresso">Joined</Text>
            <Text className="text-2xl font-bold text-espresso">0</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-lg font-semibold text-espresso">Successful</Text>
            <Text className="text-2xl font-bold text-espresso">0</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default refer;
