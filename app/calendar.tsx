import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from '../components/Toast';

type DayProduct = { id: string; name: string; size: string; price: number; originalPrice: number; quantity: number };

const generateCalendarDays = () => {
  const statuses = ['scheduled', 'scheduled', 'normal', 'suspended', 'vacation', 'no-delivery', 'vacation'];
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      day: d.getDate().toString(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
      label: d.toLocaleDateString('en-US', { weekday: 'long' }),
      status: statuses[i],
    });
  }
  return days;
};

const calendarDays = generateCalendarDays();

const dayWiseProducts: Record<string, DayProduct[]> = {
  [calendarDays[0].day]: [
    { id: '1', name: 'A2 Cow Milk', size: '500 ml', price: 70, originalPrice: 85, quantity: 1 },
    { id: '2', name: 'Fresh Paneer', size: '200 gm', price: 120, originalPrice: 150, quantity: 0 },
  ],
  [calendarDays[1].day]: [
    { id: '3', name: 'A2 Cow Milk', size: '500 ml', price: 70, originalPrice: 85, quantity: 1 },
    { id: '4', name: 'Dahi (Curd)', size: '400 gm', price: 60, originalPrice: 75, quantity: 0 },
    { id: '5', name: 'White Butter', size: '100 gm', price: 80, originalPrice: 100, quantity: 0 },
  ],
  [calendarDays[2].day]: [
    { id: '6', name: 'Buffalo Milk', size: '500 ml', price: 65, originalPrice: 80, quantity: 1 },
    { id: '7', name: 'Fresh Paneer', size: '200 gm', price: 120, originalPrice: 150, quantity: 0 },
  ],
  [calendarDays[3].day]: [
    { id: '8', name: 'A2 Cow Milk', size: '500 ml', price: 70, originalPrice: 85, quantity: 1 },
    { id: '9', name: 'Greek Yogurt', size: '400 gm', price: 120, originalPrice: 150, quantity: 0 },
  ],
  [calendarDays[4].day]: [],
  [calendarDays[5].day]: [],
  [calendarDays[6].day]: [],
};

const filters = ['All', 'Vacation', 'Scheduled', 'Suspended', 'No Delivery'];

const statusColor: Record<string, string> = {
  vacation: '#ef4444',
  scheduled: '#10b981',
  suspended: '#f59e0b',
  'no-delivery': '#D4BE8B',
};

const Calendar = () => {
  const router = useRouter();
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [products, setProducts] = useState<DayProduct[]>(dayWiseProducts[calendarDays[0].day] || []);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastProductName, setToastProductName] = useState('');

  const filteredDays = selectedFilter === 'All'
    ? calendarDays
    : calendarDays.filter(d => {
        const map: Record<string, string> = { Vacation: 'vacation', Scheduled: 'scheduled', Suspended: 'suspended', 'No Delivery': 'no-delivery' };
        return d.status === map[selectedFilter];
      });

  useEffect(() => {
    if (filteredDays.length > 0 && filteredDays[selectedDayIndex]) {
      setProducts(dayWiseProducts[filteredDays[selectedDayIndex].day] || []);
    } else {
      setProducts([]);
    }
  }, [selectedDayIndex, selectedFilter]);

  const handleDayPress = (index: number) => {
    setSelectedDayIndex(index);
  };

  const handleAdd = (id: string) => {
    const p = products.find(x => x.id === id);
    if (p) { setToastProductName(p.name); setToastVisible(true); }
    setProducts(prev => prev.map(x => x.id === id ? { ...x, quantity: 1 } : x));
  };

  const handleQty = (id: string, change: number) => {
    setProducts(prev => prev.map(x =>
      x.id === id ? { ...x, quantity: Math.max(0, x.quantity + change) } : x
    ));
  };

  return (
    <View className="flex-1 bg-cream">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 bg-cream border-b border-cream-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#4E342E" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-espresso">Delivery Calendar</Text>
        <TouchableOpacity onPress={() => router.push('/vacation')}>
          <Ionicons name="airplane-outline" size={22} color="#3E2723" />
        </TouchableOpacity>
      </View>

      {/* Filter Chips */}
      <View className="bg-cream border-b border-cream-200 py-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
          {filters.map(f => (
            <TouchableOpacity
              key={f}
              onPress={() => { setSelectedFilter(f); setSelectedDayIndex(0); }}
              className="flex-row items-center px-4 py-2 mr-2 rounded-full overflow-hidden"
              style={{ backgroundColor: selectedFilter === f ? 'transparent' : '#F5EFDB' }}
            >
              {selectedFilter === f && (
                <LinearGradient
                  colors={['#4E342E', '#3E2723']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
                />
              )}
              {f !== 'All' && (
                <View className="w-2 h-2 rounded-full mr-2 z-10" style={{ backgroundColor: statusColor[{ Vacation: 'vacation', Scheduled: 'scheduled', Suspended: 'suspended', 'No Delivery': 'no-delivery' }[f] || ''] || '#ccc' }} />
              )}
              <Text className="z-10" style={{ fontSize: 12, fontWeight: '600', color: selectedFilter === f ? '#FFFDF6' : '#555' }}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Split View */}
      <View className="flex-1 flex-row">
        {/* Left: Day List */}
        <View className="w-2/5 bg-cream-100 border-r border-cream-200">
          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredDays.map((day, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleDayPress(i)}
                className="px-3 py-4 border-b border-cream-200 overflow-hidden"
                style={{ backgroundColor: i === selectedDayIndex ? 'transparent' : '#f9fafb' }}
              >
                {i === selectedDayIndex && (
                  <LinearGradient
                    colors={['#4E342E', '#3E2723']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
                  />
                )}
                <Text className="text-base font-bold mb-1 z-10" style={{ color: i === selectedDayIndex ? '#FFFDF6' : '#1f2937' }}>
                  {day.day} {day.month}
                </Text>
                <Text className="text-xs mb-2 z-10" style={{ color: i === selectedDayIndex ? '#DFCDA2' : '#6b7280' }}>
                  {day.label}
                </Text>
                <View className="w-3 h-3 rounded-full z-10" style={{ backgroundColor: statusColor[day.status] || '#DFCDA2' }} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Right: Products */}
        <View className="w-3/5 bg-cream">
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 12 }}>
            {products.length > 0 ? (
              <>
                {products.map(p => (
                  <View key={p.id} className="py-3 border-b border-cream-200">
                    <View className="flex-row justify-between items-start mb-2">
                      <View className="flex-1 mr-2">
                        <Text className="text-sm font-bold text-espresso">{p.name}</Text>
                        <Text className="text-xs text-ochre-200">{p.size}</Text>
                      </View>
                      <TouchableOpacity>
                        <MaterialCommunityIcons name="delete-outline" size={20} color="#ccc" />
                      </TouchableOpacity>
                    </View>
                    <View className="flex-row justify-between items-center">
                      <View className="flex-row items-center">
                        <Text className="text-sm font-bold text-espresso mr-1">₹{p.price}</Text>
                        <Text className="text-xs text-ochre-200 line-through">₹{p.originalPrice}</Text>
                      </View>
                      {p.quantity === 0 ? (
                        <TouchableOpacity className="bg-ochre-200 px-4 py-1 rounded-xl" onPress={() => handleAdd(p.id)}>
                          <Text className="text-cream text-xs font-bold">ADD</Text>
                        </TouchableOpacity>
                      ) : (
                        <View className="flex-row items-center rounded-full overflow-hidden bg-cream-100">
                          <Text className="text-sm font-bold text-espresso px-3">{p.quantity}</Text>
                          <TouchableOpacity className="w-8 h-8 bg-espresso-100 items-center justify-center" onPress={() => handleQty(p.id, -1)}>
                            <Text className="text-cream font-bold">−</Text>
                          </TouchableOpacity>
                          <TouchableOpacity className="w-8 h-8 bg-ochre-200 items-center justify-center" onPress={() => handleQty(p.id, 1)}>
                            <Text className="text-cream font-bold">+</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
                <TouchableOpacity
                  className="mt-4 bg-ochre-200 rounded-2xl py-3 items-center"
                  onPress={() => router.push('/(tabs)/products')}
                >
                  <Text className="text-cream text-sm font-bold">+ Add More Products</Text>
                </TouchableOpacity>
                <TouchableOpacity className="mt-3 bg-ochre-200 rounded-2xl py-3 items-center">
                  <Text className="text-cream text-sm font-bold">SAVE</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View className="items-center py-12">
                <Ionicons name="airplane-outline" size={40} color="#ccc" />
                <Text className="text-ochre-200 text-sm text-center mt-3">
                  {filteredDays[selectedDayIndex]?.status === 'vacation' ? 'Vacation – No delivery' : 'No delivery scheduled'}
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>

      <Toast
        visible={toastVisible}
        productName={toastProductName}
        onGoToCart={() => { setToastVisible(false); router.push('/cart'); }}
        onHide={() => setToastVisible(false)}
      />
    </View>
  );
};

export default Calendar;
