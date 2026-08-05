import React, { useState } from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CategoryProductCard from '../../components/CategoryProductCard';
import DailyProductCard from '../../components/DailyProductCard';
import Toast from '../../components/Toast';
import { useCart } from '../../context/CartContext';
import productsData from '../../data/products';

const categories = [
  { key: 'milk', label: 'Milk', icon: 'bottle-soda-outline' },
  { key: 'dairy', label: 'Dairy', icon: 'cheese' },
  { key: 'curd', label: 'Curd & Yogurt', icon: 'bowl-mix-outline' },
  { key: 'ghee', label: 'Ghee', icon: 'pot-steam-outline' },
];

const Products = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(
    (params.category as string) || 'milk'
  );
  const [categoryProducts, setCategoryProducts] = useState(productsData.categoryProducts);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastProductName, setToastProductName] = useState('');

  const handleQuantityChange = (id: string, quantity: number) => {
    const currentList = categoryProducts[selectedCategory as keyof typeof categoryProducts] || [];
    const product = currentList.find(p => p.id === id);
    if (product && quantity > product.quantity) {
      addItem({ ...product, image: product.image });
      setToastProductName(product.name);
      setToastVisible(true);
    }
    setCategoryProducts(prev => ({
      ...prev,
      [selectedCategory]: (prev[selectedCategory as keyof typeof prev] as any[])?.map(p =>
        p.id === id ? { ...p, quantity } : p
      ) || [],
    }));
  };

  const currentProducts = categoryProducts[selectedCategory as keyof typeof categoryProducts] || [];

  return (
    <Animated.View entering={FadeIn} className="flex-1 bg-cream">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-cream border-b border-cream-200">
        <Text className="text-xl font-bold text-espresso">Products</Text>
        <TouchableOpacity onPress={() => router.push('/search')}>
          <Ionicons name="search" size={24} color="#4E342E" />
        </TouchableOpacity>
      </View>

      {/* Category Tabs */}
      <View className="bg-cream border-b border-cream-200">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 10 }}>
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.key;
            return (
              <TouchableOpacity
                key={cat.key}
                onPress={() => setSelectedCategory(cat.key)}
                className="items-center mr-4"
                style={{
                  paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
                  backgroundColor: isSelected ? '#3E2723' : '#F5EFDB',
                  flexDirection: 'row', alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons
                  name={cat.icon as any}
                  size={16}
                  color={isSelected ? '#FFFDF6' : '#555'}
                />
                <Text style={{ marginLeft: 6, fontSize: 13, fontWeight: '600', color: isSelected ? '#FFFDF6' : '#555' }}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Product Count */}
      <View className="px-4 py-2 bg-cream-100">
        <Text className="text-sm text-ochre-200">{currentProducts.length} products found</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="mt-2 pb-24">
          {currentProducts.map(product =>
            selectedCategory === 'milk' ? (
              <DailyProductCard 
                key={product.id} 
                product={product}
                onAddToCart={p => { setToastProductName(p.name); setToastVisible(true); }}
              />
            ) : (
              <CategoryProductCard
                key={product.id}
                product={product}
                onQuantityChange={handleQuantityChange}
                onAddToCart={p => { setToastProductName(p.name); setToastVisible(true); }}
              />
            )
          )}
        </View>
      </ScrollView>

      <Toast
        visible={toastVisible}
        productName={toastProductName}
        onGoToCart={() => { setToastVisible(false); router.push('/cart'); }}
        onHide={() => setToastVisible(false)}
        bottomOffset={100}
      />
    </Animated.View>
  );
};

export default Products;
