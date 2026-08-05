import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CategoryProductCard from '../components/CategoryProductCard';
import DailyProductCard from '../components/DailyProductCard';
import Toast from '../components/Toast';
import { useCart } from '../context/CartContext';
import productsData from '../data/products';

const allProducts = [
  ...productsData.categoryProducts.milk,
  ...productsData.categoryProducts.dairy,
  ...productsData.categoryProducts.curd,
  ...productsData.categoryProducts.ghee,
];

const Search = () => {
  const router = useRouter();
  const { addItem } = useCart();
  const [searchText, setSearchText] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastProductName, setToastProductName] = useState('');
  const [products, setProducts] = useState(allProducts);

  const handleQuantityChange = (id: string, quantity: number) => {
    const product = products.find(p => p.id === id);
    if (product && quantity > product.quantity) {
      addItem({ ...product, image: product.image });
      setToastProductName(product.name);
      setToastVisible(true);
    }
    setProducts(prev => prev.map(p => p.id === id ? { ...p, quantity } : p));
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchText.toLowerCase()) ||
    p.category.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View className="flex-1 bg-cream">
      {/* Search Bar */}
      <View className="flex-row items-center px-4 py-3 bg-cream border-b border-cream-200">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="chevron-back" size={24} color="#4E342E" />
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center bg-cream-100 rounded-xl px-3 py-2">
          <Ionicons name="search" size={18} color="#4E342E" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Search milk, paneer, ghee..."
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={18} color="#D4BE8B" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Quick Category Chips */}
      {searchText.length === 0 && (
        <View className="px-4 py-3">
          <Text className="text-xs text-ochre-200 font-semibold mb-2 uppercase">Browse by Category</Text>
          <View className="flex-row flex-wrap" style={{ gap: 8 }}>
            {['Milk', 'Paneer', 'Butter', 'Ghee', 'Curd', 'Yogurt', 'Cheese'].map(tag => (
              <TouchableOpacity
                key={tag}
                onPress={() => setSearchText(tag)}
                className="bg-cream-200 border border-ochre-100 px-4 py-2 rounded-full"
              >
                <Text className="text-espresso text-sm font-medium">{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <ScrollView className="flex-1 pb-24">
        {searchText.length > 0 ? (
          filtered.length > 0 ? (
            <View className="mt-2">
              <Text className="px-4 py-2 text-xs text-ochre-200">{filtered.length} results for "{searchText}"</Text>
              {filtered.map(product =>
                product.category === 'Milk' ? (
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
          ) : (
            <View className="items-center mt-24">
              <Ionicons name="search-outline" size={56} color="#ccc" />
              <Text className="text-ochre-200 text-lg mt-4">No dairy products found</Text>
              <Text className="text-ochre-100 text-sm mt-1">Try "milk", "paneer" or "ghee"</Text>
            </View>
          )
        ) : (
          <View className="items-center mt-24">
            <Ionicons name="search" size={56} color="#ddd" />
            <Text className="text-ochre-200 text-base mt-4">Search for dairy products</Text>
          </View>
        )}
      </ScrollView>

      <Toast
        visible={toastVisible}
        productName={toastProductName}
        onGoToCart={() => { setToastVisible(false); router.push('/cart'); }}
        onHide={() => setToastVisible(false)}
      />
    </View>
  );
};

export default Search;
