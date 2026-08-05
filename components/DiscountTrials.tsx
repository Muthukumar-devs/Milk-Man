import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export interface DiscountTrial {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
}

interface DiscountTrialsProps {
  trials: DiscountTrial[];
}

const DiscountTrials: React.FC<DiscountTrialsProps> = ({ trials }) => {
  const router = useRouter();

  const renderTrial = (item: DiscountTrial) => (
    <View key={item.id} className="rounded-3xl mr-4 w-[280px] h-32 flex-row overflow-hidden shadow-md bg-espresso border border-[#4E342E]">
      <View className="relative w-32 h-full justify-center items-center bg-[#4E342E]/50 p-2">
        <Image
          source={item.image as any}
          className="w-24 h-24"
          resizeMode="contain"
        />
        <View className="absolute top-2 left-2 bg-ochre-200 px-1 py-0.5 rounded-sm shadow-sm">
          <Text className="text-espresso font-bold text-[5px] uppercase tracking-wider">{item.discount}</Text>
        </View>
      </View>
      <View className="flex-1 p-3 justify-center">
        <Text className="text-base font-bold text-cream mb-0.5" numberOfLines={2}>
          {item.name}
        </Text>
        <Text className="text-ochre-200 text-[10px] mb-2" numberOfLines={2}>
          {item.description}
        </Text>
        <View className="flex-row items-center justify-between mt-auto">
          <View>
            <Text className="text-base font-bold text-cream">
              ₹{item.price}
            </Text>
            <Text className="text-espresso-100 line-through text-[10px] mt-0.5">
              ₹{item.originalPrice}
            </Text>
          </View>
          <TouchableOpacity
            className="bg-ochre-200 rounded-full px-2 py-0.5 shadow-sm"
            onPress={() => router.push(`/product-detail?id=${item.id}&name=${encodeURIComponent(item.name)}&price=${item.price}&originalPrice=${item.originalPrice}&size=${encodeURIComponent('Trial')}&image=${encodeURIComponent(item.image)}&category=${encodeURIComponent('Trials')}`)}
          >
            <Text className="text-espresso font-bold text-[7px]">TRY NOW</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View>
      <View className="flex-row">
        {trials.map(renderTrial)}
      </View>
    </View>
  );
};

export default DiscountTrials;
