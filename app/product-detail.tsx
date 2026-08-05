import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import { useCart } from '../context/CartContext';
import productsData from '../data/products';

const { width } = Dimensions.get('window');

const ProductDetail = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addItem } = useCart();
  
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [selectedDates, setSelectedDates] = useState<{[key: string]: any}>({});
  const [showTypeFrequency, setShowTypeFrequency] = useState(true);
  const [showSubscriptionTypes, setShowSubscriptionTypes] = useState(false);
  const [selectedSubscriptionType, setSelectedSubscriptionType] = useState('Subscription');

  const allProducts = [
    ...productsData.newLaunches,
    ...productsData.popularProducts,
    ...productsData.discountTrials,
    ...(productsData.categoryProducts.milk || []),
    ...(productsData.categoryProducts.dairy || []),
    ...(productsData.categoryProducts.curd || []),
    ...(productsData.categoryProducts.ghee || []),
  ];

  const foundProduct = allProducts.find(p => p.id === params.id) || {} as any;

  const product = {
    id: params.id as string,
    name: params.name as string || foundProduct.name,
    size: params.size as string || foundProduct.size,
    price: Number(params.price) || foundProduct.price,
    originalPrice: Number(params.originalPrice) || foundProduct.originalPrice,
    vipPrice: foundProduct.vipPrice || Number(params.price) * 0.7,
    vipDiscount: foundProduct.discount || '30% Off',
    image: foundProduct.image || require('../assets/images/product_milk.png'),
    images: foundProduct.images || [
      foundProduct.image || require('../assets/images/product_milk.png'),
      foundProduct.image || require('../assets/images/product_milk.png')
    ],
    category: params.category as string || foundProduct.category || 'Products'
  };

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const updateQuantity = (day: string, change: number) => {
    const newQuantity = Math.max(0, (quantities[day] || 0) + change);
    
    if (newQuantity === 0) {
      setQuantities(prev => {
        const newQuantities = { ...prev };
        delete newQuantities[day];
        return newQuantities;
      });
      
      setSelectedDays(prev => prev.filter(d => d !== day));
      
      setSelectedDates(prev => {
        const newDates = { ...prev };
        Object.keys(newDates).forEach(dateString => {
          const dayOfWeek = new Date(dateString).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
          if (dayOfWeek === day) {
            delete newDates[dateString];
          }
        });
        return newDates;
      });
    } else {
      setQuantities(prev => ({
        ...prev,
        [day]: newQuantity
      }));
    }
  };

  const onDayPress = (day: any) => {
    const dateString: string = day.dateString;
    const dayOfWeek = new Date(day.dateString).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    
    const isDateSelected = selectedDates[dateString];
    
    setSelectedDates(prev => {
      const newDates: {[key: string]: any} = { ...prev };
      if (newDates[dateString]) {
        delete newDates[dateString];
      } else {
        newDates[dateString] = {
          selected: true,
          selectedColor: '#10b981',
          selectedTextColor: '#FFFDF6DF6'
        };
      }
      return newDates;
    });
    
    if (isDateSelected) {
      const newQuantity = Math.max(0, (quantities[dayOfWeek] || 0) - 1);
      if (newQuantity === 0) {
        setQuantities(prev => {
          const newQuantities = { ...prev };
          delete newQuantities[dayOfWeek];
          return newQuantities;
        });
        setSelectedDays(prev => prev.filter(d => d !== dayOfWeek));
      } else {
        setQuantities(prev => ({ ...prev, [dayOfWeek]: newQuantity }));
      }
    } else {
      if (selectedDays.includes(dayOfWeek)) {
        setQuantities(prev => ({
          ...prev,
          [dayOfWeek]: (prev[dayOfWeek] || 0) + 1
        }));
      } else {
        setSelectedDays(prev => [...prev, dayOfWeek]);
        setQuantities(prev => ({ ...prev, [dayOfWeek]: 1 }));
      }
    }
  };

  const handleConfirmSubscription = () => {
    addItem({
      id: Array.isArray(product.id) ? product.id[0] : product.id,
      name: product.name,
      size: product.size,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: 1,
      image: product.image
    });
    router.back();
  };

  return (
    <View className="flex-1 bg-cream-100">
      {/* Header */}
      <View className="bg-cream px-4 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#4E342E" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-espresso ml-4">{product.category}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <View className="bg-cream-100 px-4 py-6">
          <View className="flex-row" style={{ gap: 8 }}>
            <Image
              source={product.images[0]}
              className="flex-1 h-56 rounded-2xl"
              resizeMode="cover"
            />
            <Image
              source={product.images[1]}
              className="flex-1 h-56 rounded-2xl"
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Product Info */}
        <View className="bg-cream px-4 py-4">
          <Text className="text-2xl font-bold text-espresso">{product.name}</Text>
          <Text className="text-ochre-200 text-base mt-1">{product.size}</Text>
          
          <View className="flex-row items-center justify-between mt-4">
            <View className="flex-row items-center">
              <Text className="text-2xl font-bold text-espresso">₹{product.price}</Text>
              <Text className="text-lg text-ochre-200 line-through ml-3">₹{product.originalPrice}</Text>
            </View>
          </View>
        </View>

        {/* VIP Pricing */}
        <View className="bg-yellow-400 p-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="bg-espresso px-2 py-1 rounded">
              <Text className="text-ochre-200 text-xs font-bold">VIP</Text>
            </View>
            <Text className="text-espresso font-bold ml-3">
              VIP Price ₹{product.vipPrice} ({product.vipDiscount})
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/vip-membership')}>
            <Text className="text-espresso font-semibold">Know More</Text>
          </TouchableOpacity>
        </View>

        {/* Custom Frequency */}
        <View className="bg-cream-100 p-4">
          {/* Type and Frequency Section */}
          {showTypeFrequency ? (
            <View className="mb-6">
              {showSubscriptionTypes ? (
                <View>
                  <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-lg font-bold text-espresso">Subscription type</Text>
                    <TouchableOpacity onPress={() => setShowSubscriptionTypes(false)}>
                      <Ionicons name="close" size={24} color="#4E342E" />
                    </TouchableOpacity>
                  </View>
                  <View className="flex-row justify-between mb-6">
                    {['Trial', 'Subscription', 'One time'].map((type) => (
                      <TouchableOpacity
                        key={type}
                        onPress={() => {
                          setSelectedSubscriptionType(type);
                          setShowSubscriptionTypes(false);
                        }}
                        className={`px-6 py-3 rounded-full ${
                          selectedSubscriptionType === type
                            ? 'bg-espresso'
                            : 'bg-cream-200'
                        }`}
                      >
                        <Text className={`text-sm font-semibold ${
                          selectedSubscriptionType === type ? 'text-cream' : 'text-espresso-100'
                        }`}>
                          {type}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ) : (
                <View className="flex-row justify-between mb-4">
                  <View className="flex-1 mr-2">
                    <Text className="text-base font-semibold text-espresso mb-2">Type</Text>
                    <TouchableOpacity 
                      onPress={() => setShowSubscriptionTypes(true)}
                      className="bg-cream-200 px-4 py-3 rounded-lg"
                    >
                      <Text className="text-espresso-100">{selectedSubscriptionType}</Text>
                    </TouchableOpacity>
                  </View>
                  <View className="flex-1 ml-2">
                    <Text className="text-base font-semibold text-espresso mb-2">Frequency</Text>
                    <TouchableOpacity 
                      onPress={() => setShowTypeFrequency(false)}
                      className="bg-cream-200 px-4 py-3 rounded-lg flex-row items-center justify-between"
                    >
                      <Text className="text-espresso-100">Alternate day</Text>
                      <Ionicons name="create-outline" size={16} color="#ff6b6b" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ) : (
            <>
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <TouchableOpacity onPress={() => setShowTypeFrequency(true)}>
                    <Ionicons name="chevron-back" size={20} color="#4E342E" />
                  </TouchableOpacity>
                  <Text className="text-lg font-bold text-espresso ml-2">Custom Frequency</Text>
                </View>
                <TouchableOpacity onPress={() => {
                  setSelectedDays([]);
                  setQuantities({});
                  setSelectedDates({});
                }}>
                  <Ionicons name="close" size={24} color="#4E342E" />
                </TouchableOpacity>
              </View>

              {/* Week Days */}
              <View className="flex-row justify-between mb-6">
                {weekDays.map((day) => (
                  <TouchableOpacity
                    key={day}
                    onPress={() => toggleDay(day)}
                    className={`px-3 py-2 rounded-full ${
                      selectedDays.includes(day) 
                        ? 'bg-espresso' 
                        : 'bg-cream-200'
                    }`}
                  >
                    <Text className={`text-sm font-semibold ${
                      selectedDays.includes(day) ? 'text-cream' : 'text-espresso-100'
                    }`}>
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* Selected Days with Quantities */}
          {selectedDays.map((day) => (
            <View key={day} className="flex-row items-center justify-between py-3">
              <Text className="text-lg font-semibold text-espresso">{day === 'MON' ? 'MONDAY' : day === 'THU' ? 'THURSDAY' : day}</Text>
              <View className="flex-row items-center">
                <View className="flex-row rounded-full overflow-hidden">
                  <View className="w-12 h-10 bg-cream-200 justify-center items-center">
                    <Text className="text-lg font-bold text-espresso">{quantities[day] || 0}</Text>
                  </View>
                  <TouchableOpacity 
                    onPress={() => updateQuantity(day, -1)}
                    className="w-12 h-10 bg-espresso-100 justify-center items-center"
                  >
                    <Text className="text-cream font-bold text-lg">−</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => updateQuantity(day, 1)}
                    className="w-12 h-10 bg-ochre-200 justify-center items-center"
                  >
                    <Text className="text-cream font-bold text-lg">+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Calendar Preview */}
        <View className="bg-cream-100 p-4 mb-6">
          <Text className="text-lg font-bold text-espresso mb-4">Calendar Preview</Text>
          
          <Calendar
            markedDates={selectedDates}
            theme={{
              selectedDayBackgroundColor: '#10b981',
              selectedDayTextColor: '#FFFDF6DF6',
              todayTextColor: '#3E2723',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              arrowColor: '#3E2723',
              monthTextColor: '#2d4150',
              textDayFontWeight: '500',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '600',
            }}
            onDayPress={onDayPress}
            hideExtraDays={true}
            firstDay={0}
          />


        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View className="bg-cream px-4 py-4 pb-4 flex-row items-center justify-between">
        <View className="bg-cream-100 p-2 rounded-lg">
          <Text className="text-base font-semibold text-espresso">Start Date</Text>
          <View className="flex-row items-center mt-1">
            <Text className="text-espresso-100">1 Mar 2024</Text>
            <TouchableOpacity className="ml-2">
              <AntDesign name="edit" size={16} color="#ff6b6b" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity 
          onPress={handleConfirmSubscription}
          className="bg-ochre-200 rounded-xl py-3 px-6"
        >
          <Text className="text-cream text-center text-base font-bold">CONFIRM SUBSCRIPTION</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetail;
