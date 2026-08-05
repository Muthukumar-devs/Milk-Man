import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Product {
  id: string;
  name: string;
  size: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image?: any;
}

interface ProductCardProps {
  products: Product[];
  onQuantityChange?: (id: string, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ products, onQuantityChange }) => {
  const router = useRouter();
  
  const handleQuantityChange = (id: string, change: number) => {
    const product = products.find(p => p.id === id);
    if (product) {
      const newQuantity = Math.max(0, product.quantity + change);
      onQuantityChange?.(id, newQuantity);
    }
  };

  const handleProductPress = (product: Product) => {
    router.push(`/product-detail?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&originalPrice=${product.originalPrice}&size=${encodeURIComponent(product.size)}&image=${encodeURIComponent('https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop')}&category=${encodeURIComponent('Dairy')}`);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      onPress={() => handleProductPress(item)}
      className="bg-cream rounded-2xl p-4 mr-4 w-[280px] border border-cream-200 shadow-sm"
    >
      <View className="flex-row items-center mb-3">
        <Image 
          source={item.image ? (typeof item.image === 'string' ? {uri: item.image} : item.image) : require('../assets/images/milk.jpg')} 
          className="w-16 h-16 rounded-xl mr-3" 
          resizeMode="cover" 
        />
        <View className="flex-1 mr-2">
          <Text className="text-lg font-bold text-espresso mb-1" numberOfLines={1}>{item.name}</Text>
          <Text className="text-sm text-ochre-200">{item.size}</Text>
        </View>
        <View className="bg-cream-200 p-2 rounded-full self-start">
          <Ionicons name="cart-outline" size={20} color="#4E342E" />
        </View>
      </View>
      
      <View className="flex-row justify-between items-end mt-1">
        <View>
          <Text className="text-xl font-bold text-espresso">₹{item.price}</Text>
          <Text className="text-xs text-ochre-200 line-through">₹{item.originalPrice}</Text>
        </View>
        
        {item.quantity > 0 ? (
          <View className="flex-row items-center bg-cream-100 rounded-full border border-cream-200 shadow-sm">
            <TouchableOpacity 
              onPress={(e) => {
                e.stopPropagation();
                handleQuantityChange(item.id, -1);
              }}
              className="w-10 h-9 bg-ochre-200 rounded-l-full justify-center items-center"
            >
              <Text className="text-lg font-bold text-cream">−</Text>
            </TouchableOpacity>
            <View className="w-10 h-9 justify-center items-center">
              <Text className="text-base font-bold text-espresso">{item.quantity}</Text>
            </View>
            <TouchableOpacity 
              onPress={(e) => {
                e.stopPropagation();
                handleQuantityChange(item.id, 1);
              }}
              className="w-10 h-9 bg-ochre-200 rounded-r-full justify-center items-center"
            >
              <Text className="text-lg font-bold text-cream">+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            onPress={(e) => {
              e.stopPropagation();
              handleQuantityChange(item.id, 1);
            }}
            className="bg-ochre-200 py-2 px-6 rounded-full shadow-sm"
          >
            <Text className="text-cream text-sm font-bold tracking-wider">ADD</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      {products.map(item => <React.Fragment key={item.id}>{renderProduct({ item })}</React.Fragment>)}
    </ScrollView>
  );
};

export default ProductCard;
