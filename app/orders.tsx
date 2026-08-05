import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import ordersData from '../data/orders.json';
import OrderCard from '../components/OrderCard';

const Orders = () => {
  const { orders } = ordersData;
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const completedOrders = orders.filter(order => order.status !== 'pending');
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);

  const toggleOrderExpansion = (orderId: number) => {
    setExpandedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'green';
      case 'canceled': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'canceled': return 'Canceled';
      case 'pending': return 'Pending';
      default: return status;
    }
  };

  return (
    <View className="flex-1 bg-cream">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 bg-cream">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#4E342E" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-espresso ml-4">My Orders</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* VIP Membership Card */}
        <View className="mx-4 mb-4 p-4 rounded-xl" style={{backgroundColor: '#E6A85C'}}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="bg-espresso px-2 py-1 rounded">
                <Text className="text-cream text-xs font-bold">VIP</Text>
              </View>
              <View className="ml-3">
                <Text className="text-espresso text-lg font-semibold">VIP Membership</Text>
                <Text className="text-espresso-100 text-sm">Discounted prices e</Text>
              </View>
            </View>
            <TouchableOpacity 
              className="bg-[#3E2723] px-4 py-2 rounded-full"
              onPress={() => router.push('/vip-membership')}
            >
              <Text className="text-cream text-sm font-medium">Know More</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Calendar Edit Notice */}
        <View className="mx-4 mb-6 p-4 rounded-xl border-2 border-yellow-400 bg-yellow-50">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="bg-yellow-400 w-6 h-6 rounded-full items-center justify-center mr-3">
                <Text className="text-cream text-xs font-bold">!</Text>
              </View>
              <Text className="text-espresso-100 text-sm flex-1">Edit and cancel pending orders from calendar</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#4E342E" />
          </View>
        </View>

        {/* All Orders */}
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            isExpanded={expandedOrders.includes(order.id)}
            onToggle={() => toggleOrderExpansion(order.id)}
            getStatusText={getStatusText}
            getStatusColor={getStatusColor}
          />
        ))}

        {/* Bottom Buttons */}
        <View className="flex-row mx-4 mt-8 mb-6" style={{ gap: 12 }}>
          <TouchableOpacity className="flex-1 bg-[#3E2723] py-4 rounded-full flex-row items-center justify-center">
            <MaterialIcons name="event" size={20} color="white" />
            <Text className="text-cream font-medium ml-2">SET VACATION</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-[#3E2723] py-4 rounded-full flex-row items-center justify-center">
            <MaterialIcons name="calendar-today" size={20} color="white" />
            <Text className="text-cream font-medium ml-2">CALENDAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Orders;
