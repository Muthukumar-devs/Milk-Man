import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useCart } from '../context/CartContext';

interface CategoryProduct {
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
  quantity: number;
}

interface CategoryProductCardProps {
  product: CategoryProduct;
  onQuantityChange?: (id: string, quantity: number) => void;
  onAddToCart?: (product: CategoryProduct) => void;
}

const CategoryProductCard: React.FC<CategoryProductCardProps> = ({ product, onQuantityChange, onAddToCart }) => {
  const router = useRouter();
  const { addItem } = useCart();
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(0, product.quantity + change);
    if (change > 0 && product.quantity === 0) {
      addItem({ ...product, quantity: 1, image: product.image });
      onAddToCart?.(product);
    }
    onQuantityChange?.(product.id, newQuantity);
  };

  const handleProductPress = () => {
    router.push(`/product-detail?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&originalPrice=${product.originalPrice}&size=${encodeURIComponent(product.size)}&image=${encodeURIComponent(product.image)}&images=${encodeURIComponent(JSON.stringify(product.images || [product.image, product.image]))}&category=${encodeURIComponent(product.category || 'Products')}`);
  };

  return (
    <TouchableOpacity 
      onPress={handleProductPress}
      className="bg-cream rounded-2xl p-0 mb-4 mx-4 shadow-sm overflow-hidden border border-cream-200"
    >
      <View className="flex-row">
        {/* Product Image */}
        <View className="relative">
          <Image 
            source={product.image}
            className="w-36 h-36 rounded-tl-xl"
            resizeMode="cover"
          />
          
          {/* Discount Badge */}
          <View className="absolute top-2 left-2 bg-green-500 px-2 py-1 rounded">
            <Text className="text-cream text-xs font-bold">{product.discount}</Text>
          </View>
        </View>
        
        {/* Product Info */}
        <View className="flex-1 p-4">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-lg font-bold text-espresso flex-1 pr-2 leading-6">{product.name}</Text>
            {product.category && (
              <LinearGradient colors={['#3B82F6', '#2563EB']} className="px-2.5 py-1 rounded-md shadow-sm mt-0.5">
                <Text className="text-cream text-[10px] font-bold uppercase tracking-wider">{product.category}</Text>
              </LinearGradient>
            )}
          </View>
          
          <Text className="text-sm text-ochre-200 mb-3">{product.size}</Text>
          
          {/* Price and Quantity */}
          <View className="flex-row justify-between items-center">
            <View>
              <View className="flex-row items-center">
                <Text className="text-xl font-bold text-espresso mr-2">₹{product.price}</Text>
                <Text className="text-sm text-ochre-200 line-through">₹{product.originalPrice}</Text>
              </View>
            </View>
            
            {/* Quantity Controls or Add to Cart */}
            {product.quantity > 0 ? (
              <View className="flex-row rounded-full overflow-hidden shadow-sm border border-cream-200">
                <View className="w-10 h-8 bg-cream justify-center items-center">
                  <Text className="text-base font-bold text-espresso">{product.quantity}</Text>
                </View>
                <TouchableOpacity 
                  onPress={(e) => {
                    e.stopPropagation();
                    handleQuantityChange(-1);
                  }}
                  activeOpacity={0.8}
                >
                  <LinearGradient colors={['#4E342E', '#3E2723']} className="w-10 h-8 justify-center items-center">
                    <Text className="text-lg font-bold text-cream">−</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={(e) => {
                    e.stopPropagation();
                    handleQuantityChange(1);
                  }}
                  activeOpacity={0.8}
                >
                  <LinearGradient colors={['#4E342E', '#3E2723']} className="w-10 h-8 justify-center items-center border-l border-[#5a3f38]">
                    <Text className="text-lg font-bold text-cream">+</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity 
                onPress={(e) => {
                  e.stopPropagation();
                  handleQuantityChange(1);
                }}
                className="rounded-full shadow-sm overflow-hidden"
                activeOpacity={0.8}
              >
                <LinearGradient 
                  colors={['#DFCDA2', '#C9A86A']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="py-2 px-5 items-center justify-center"
                >
                  <Text className="text-espresso text-[11px] font-bold uppercase tracking-wider">Add to Cart</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
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

export default CategoryProductCard;
