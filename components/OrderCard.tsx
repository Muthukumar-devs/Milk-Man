import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface OrderItem {
  id: number;
  name: string;
  quantity: string;
  price: number;
  image: string;
}

interface Order {
  id: number;
  status: string;
  deliveryDate: string;
  totalAmount: number;
  items: OrderItem[];
}

interface OrderCardProps {
  order: Order;
  isExpanded: boolean;
  onToggle: () => void;
  getStatusText: (status: string) => string;
  getStatusColor: (status: string) => string;
}

const OrderCard = ({ order, isExpanded, onToggle, getStatusText, getStatusColor }: OrderCardProps) => {
  const isPending = order.status === 'pending';

  return (
    <View className="mx-4 mb-4 bg-cream rounded-xl shadow-sm border border-cream-200">
      <TouchableOpacity onPress={onToggle} className="p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-espresso">
              {order.items[0].name} {order.items.length > 1 ? `+ ${order.items.length - 1} items` : ''}
            </Text>
            <Text className="text-ochre-200 text-sm">
              {isPending ? `Delivering on ${order.deliveryDate}` : `${getStatusText(order.status)} on ${order.deliveryDate}`}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-lg font-semibold text-espresso mr-3">₹{order.totalAmount}</Text>
            <View className={`px-4 py-2 rounded-full mr-2 ${
              isPending 
                ? 'border border-ochre-200' 
                : `border-2 ${getStatusColor(order.status) === 'green' ? 'border-green-500' : 'border-red-500'}`
            }`}>
              <Text className={`text-sm font-medium ${
                isPending 
                  ? 'text-espresso-100' 
                  : getStatusColor(order.status) === 'green' ? 'text-green-600' : 'text-red-600'
              }`}>
                {getStatusText(order.status)}
              </Text>
            </View>
            {/* <Ionicons 
              name={isExpanded ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#4E342E" 
            /> */}
          </View>
        </View>
      </TouchableOpacity>

      {/* Order Items - Collapsible */}
      {isExpanded && (
        <View className="px-4 pb-4">
          {order.items.map((item, index) => (
            <View key={item.id} className={`flex-row items-center py-3 ${
              index < order.items.length - 1 ? 'border-b border-cream-200' : ''
            }`}>
              <Image 
                source={item.image}
                className="w-12 h-12 rounded-lg mr-4"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text className="text-base font-medium text-espresso">{item.name}</Text>
                <Text className="text-sm text-ochre-200">{item.quantity}</Text>
              </View>
              <Text className="text-base font-semibold text-espresso">₹{item.price}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default OrderCard;
