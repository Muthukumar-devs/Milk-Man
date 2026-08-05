import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface NewLaunchProduct {
  id: string;
  name: string;
  size: string;
  price: number;
  originalPrice: number;
  vipPrice: number;
  image: any;
  quantity: number;
}

interface NewLaunchesProps {
  products: NewLaunchProduct[];
  onQuantityChange?: (id: string, quantity: number) => void;
}

const NewLaunches: React.FC<NewLaunchesProps> = ({ products, onQuantityChange }) => {
  const router = useRouter();

  const handleQuantityChange = (id: string, change: number) => {
    const product = products.find(p => p.id === id);
    if (product) {
      const newQuantity = Math.max(0, product.quantity + change);
      onQuantityChange?.(id, newQuantity);
    }
  };

  const renderProduct = ({ item }: { item: NewLaunchProduct }) => (
    <TouchableOpacity 
      className="bg-cream rounded-2xl mr-4 w-[160px] border border-cream-200 shadow-sm flex flex-col overflow-hidden"
      onPress={() => router.push({
        pathname: '/product-detail',
        params: {
          id: item.id,
          name: item.name,
          price: item.price.toString(),
          originalPrice: item.originalPrice.toString(),
          vipPrice: item.vipPrice.toString(),
          size: item.size,
          image: item.image
        }
      })}
    >
      <View className="p-3">
        {/* Product Image */}
        <View className="rounded-xl h-28 justify-center items-center mb-3 bg-white overflow-hidden relative border border-cream-200 shadow-sm">
          <Image 
            source={item.image}
            className="w-full h-full"
            resizeMode="contain"
          />
          <View className="absolute top-2 left-2 bg-red-500 px-2 py-0.5 rounded shadow-sm">
            <Text className="text-white text-[10px] font-bold tracking-wider">NEW</Text>
          </View>
        </View>
        
        {/* Product Info */}
        <Text className="text-base font-bold text-espresso mb-0.5" numberOfLines={1}>{item.name}</Text>
        <Text className="text-xs text-ochre-200 mb-2">{item.size}</Text>
        
        {/* Price */}
        <View className="flex-row items-center mb-3">
          <Text className="text-lg font-extrabold text-espresso mr-2">₹{item.price}</Text>
          <Text className="text-xs text-espresso-100 line-through">₹{item.originalPrice}</Text>
        </View>
        
        {/* Add Button */}
        {item.quantity > 0 ? (
          <View className="flex-row items-center justify-between bg-white rounded-full border border-cream-200 shadow-sm px-1 py-0.5">
            <TouchableOpacity 
              onPress={(e) => { e.stopPropagation(); handleQuantityChange(item.id, -1); }}
              className="w-6 h-6 bg-ochre-200 rounded-full justify-center items-center"
            >
              <Text className="text-sm font-bold text-cream">−</Text>
            </TouchableOpacity>
            <Text className="text-xs font-bold text-espresso">{item.quantity}</Text>
            <TouchableOpacity 
              onPress={(e) => { e.stopPropagation(); handleQuantityChange(item.id, 1); }}
              className="w-6 h-6 bg-ochre-200 rounded-full justify-center items-center"
            >
              <Text className="text-sm font-bold text-cream">+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            onPress={(e) => { e.stopPropagation(); handleQuantityChange(item.id, 1); }}
            className="bg-ochre-200 py-1.5 rounded-full shadow-sm items-center justify-center"
          >
            <Text className="text-cream text-[10px] font-bold tracking-wider">ADD TO CART</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* VIP Price Banner */}
      <View className="py-2 px-2 flex-row items-center justify-center mt-auto overflow-hidden">
        <LinearGradient
          colors={['#FDE68A', '#D4BE8B']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
        />
        <Text className="text-espresso text-[11px] font-bold tracking-wide z-10">VIP PRICE ₹{item.vipPrice}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="mb-6 mt-2">
      <View className="flex-row justify-between items-center px-4 mb-4">
        <Text className="text-2xl font-bold text-espresso">New Launches</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {products.map(item => <React.Fragment key={item.id}>{renderProduct({ item })}</React.Fragment>)}
      </ScrollView>
    </View>
  );
};

export default NewLaunches;
