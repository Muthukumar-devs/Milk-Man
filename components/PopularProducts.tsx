import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export interface Product {
  id: string;
  name: string;
  price: number;
  size: string;
  image: any;
  bgColor: string;
}

interface PopularProductsProps {
  products: Product[];
}

const PopularProducts: React.FC<PopularProductsProps> = ({ products }) => {
  const router = useRouter();

  const renderProduct = (item: Product) => ( 
    <View key={item.id} className="rounded-2xl p-3 mr-4 w-[250px] h-28 flex-row items-center border border-[#C4A962] shadow-sm overflow-hidden">
      <LinearGradient
        colors={['#FDE68A', '#D4BE8B']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
      />
      <Image 
        source={item.image}
        className="w-16 h-20 mr-3 rounded-lg z-10"
        resizeMode="contain"
      />
      <View className="flex-1 justify-center z-10">
        <Text className="text-base font-bold text-espresso mb-0.5" numberOfLines={2}>
          {item.name}
        </Text>
        <Text className="text-espresso-100 text-xs mb-2 font-semibold">₹ {item.price} / {item.size}</Text>
        <TouchableOpacity 
          className="bg-espresso px-4 py-1.5 rounded-full shadow-sm self-start"
          onPress={() => router.push({
            pathname: '/product-detail',
            params: {
              id: item.id,
              name: item.name,
              price: item.price.toString(),
              size: item.size,
              image: item.image,
              bgColor: item.bgColor
            }
          })}
        >
          <Text className="text-cream font-bold text-[10px] text-center">ORDER NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <View className="flex-row">
        {products.map(renderProduct)}
      </View>
    </View>
  );
};

export default PopularProducts;
