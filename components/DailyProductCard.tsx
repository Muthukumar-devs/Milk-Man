import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useCart } from '../context/CartContext';

interface Product {
  id: string;
  name: string;
  size: string;
  price: number;
  originalPrice: number;
  vipPrice: number;
  discount: string;
  image: any;
  images?: any[];
  category?: string;
  isOrganic: boolean;
  nextAvailable: string;
}

interface DailyProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const DailyProductCard: React.FC<DailyProductCardProps> = ({ product, onAddToCart }) => {
  const router = useRouter();
  const { addItem } = useCart();
  
  const handleProductPress = () => {
    router.push(`/product-detail?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&originalPrice=${product.originalPrice}&size=${encodeURIComponent(product.size)}&image=${encodeURIComponent(product.image)}&images=${encodeURIComponent(JSON.stringify(product.images || [product.image, product.image]))}&category=${encodeURIComponent(product.category || 'Products')}`);
  };

  return (
    <TouchableOpacity 
      onPress={handleProductPress}
      className="bg-cream rounded-2xl p-0 mb-4 mx-4 border border-cream-200 overflow-hidden"
    >
      <View className="flex-row">
        {/* Product Image */}
        <View className="relative">
          <Image 
            source={product.image}
            className="w-36 h-40 rounded-tl-xl"
            resizeMode="cover"
          />
          
          {/* Discount Badge */}
          <View className="absolute top-2 left-2 bg-green-500 px-2 py-1 rounded">
            <Text className="text-cream text-xs font-bold">{product.discount}</Text>
          </View>
        </View>
        
        {/* Product Info */}
        <View className="flex-1 relative p-4">
          {product.category && (
            <LinearGradient colors={['#3B82F6', '#2563EB']} className="absolute top-3 px-3 py-1 rounded-full shadow-sm" style={{ right: 16 }}>
              <Text className="text-cream text-[10px] font-bold uppercase tracking-wider">{product.category}</Text>
            </LinearGradient>
          )}
          <View className="flex-row justify-between items-start w-40 mb-2">
            <Text className="text-base text-espresso flex-1 mr-2">{product.name}</Text>
          </View>
          
          <Text className="text-sm text-ochre-200 mb-3">{product.size}</Text>
          
          {/* Price and Action Buttons */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="text-xl font-bold text-espresso mr-2">₹{product.price}</Text>
              <Text className="text-sm text-ochre-200 line-through">₹{product.originalPrice}</Text>
            </View>
            
            <View className="flex-col" style={{ gap: 8 }}>
              <TouchableOpacity 
                onPress={(e) => {
                  e.stopPropagation();
                  addItem({ ...product, quantity: 1, image: product.image });
                  if (onAddToCart) onAddToCart(product as any);
                }}
                className="rounded-full shadow-sm overflow-hidden"
                activeOpacity={0.8}
              >
                <LinearGradient colors={['#4E342E', '#3E2723']} className="py-2.5 px-8 items-center justify-center">
                  <Text className="text-cream text-[11px] font-bold uppercase tracking-wider">TRY ME</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={(e) => {
                  e.stopPropagation();
                  handleProductPress();
                }}
                className="rounded-full shadow-sm overflow-hidden"
                activeOpacity={0.8}
              >
                <LinearGradient 
                  colors={['#DFCDA2', '#C9A86A']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="py-2.5 px-8 items-center justify-center"
                >
                  <Text className="text-espresso text-[11px] font-bold uppercase tracking-wider">ORDER</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      
      {/* VIP Price Banner */}
      <LinearGradient 
        colors={['#DFCDA2', '#C9A86A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="py-1.5 px-4 flex-row justify-between items-center"
      >
        <View className="flex-row items-center">
          <View className="bg-espresso px-2 py-0.5 rounded shadow-sm mr-2">
            <Text className="text-cream text-[10px] font-bold tracking-widest">VIP</Text>
          </View>
          <Text className="text-espresso text-xs font-bold">VIP Price ₹{product.vipPrice} <Text className="text-red-700 font-bold">(30% OFF)</Text></Text>
        </View>
        <Text className="text-espresso/80 text-[10px] font-semibold tracking-wide">Next: {product.nextAvailable}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default DailyProductCard;
