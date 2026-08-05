import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Voucher {
  id: string;
  title: string;
  code: string;
  cashback: number;
  description: string;
  status: string;
  type: string;
}

interface VoucherCardProps {
  voucher: Voucher;
  onApply?: (code: string) => void;
  onRemove?: (id: string) => void;
}

const VoucherCard: React.FC<VoucherCardProps> = ({ voucher, onApply, onRemove }) => {
  return (
    <View className="mx-4 mb-4 relative">
      <View className="border-2 border-dashed border-ochre-200 rounded-lg bg-cream-200 relative">
        {/* Ticket Holes */}
        <View className="absolute -left-3 top-1/2 w-6 h-6 bg-cream rounded-full" style={{ transform: [{ translateY: -12 }] }} />
        <View className="absolute -right-3 top-1/2 w-6 h-6 bg-cream rounded-full" style={{ transform: [{ translateY: -12 }] }} />
        
        {/* Vertical Dashed Line */}
        <View 
          className="absolute top-0 bottom-0 border-l-2 border-dashed border-ochre-200" 
          style={{ right: 120 }}
        />
        
        <View className="flex-row p-4">
          {/* Left Section */}
          <View className="flex-1 pr-4">
            <Text className="text-lg font-bold text-red-600 mb-3">{voucher.title}</Text>
            <Text className="text-xs text-espresso-100 mb-1">Voucher code</Text>
            <Text className="text-base font-bold text-espresso mb-2">{voucher.code}</Text>
            <Text className="text-xs text-espresso-100 leading-4">{voucher.description}</Text>
          </View>
          
          {/* Right Section */}
          <View className="w-28 items-center justify-between">
            <View className="items-center mb-3">
              <Text className="text-xs text-espresso-100 mb-1">Cashback</Text>
              <Text className="text-2xl font-bold text-espresso">₹{voucher.cashback}</Text>
            </View>
            
            <TouchableOpacity 
              onPress={() => voucher.status === 'applied' ? onRemove?.(voucher.id) : onApply?.(voucher.code)}
              className={`px-4 py-2 rounded-full border-2 ${
                voucher.status === 'applied' 
                  ? 'border-red-500 bg-cream' 
                  : 'border-green-500 bg-cream'
              }`}
            >
              <Text className={`font-bold text-xs ${
                voucher.status === 'applied' ? 'text-red-500' : 'text-green-500'
              }`}>
                {voucher.status === 'applied' ? 'REMOVE' : 'APPLY'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VoucherCard;
