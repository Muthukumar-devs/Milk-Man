import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import VoucherCard from '../components/VoucherCard';
import walletData from '../data/wallet.json';

const Wallet = () => {
  const [selectedAmount, setSelectedAmount] = useState(300);
  const [voucherCode, setVoucherCode] = useState('');
  const [vouchers, setVouchers] = useState(walletData.vouchers);

  const handleApplyVoucher = (code: string) => {
    setVouchers(prev => prev.map(voucher => 
      voucher.code === code ? { ...voucher, status: 'applied' } : voucher
    ));
  };

  const handleRemoveVoucher = (id: string) => {
    setVouchers(prev => prev.map(voucher => 
      voucher.id === id ? { ...voucher, status: 'available' } : voucher
    ));
  };

  const handleApplyCoupon = () => {
    if (voucherCode.trim()) {
      const voucher = vouchers.find(v => v.code === voucherCode.toUpperCase());
      if (voucher) {
        handleApplyVoucher(voucher.code);
        setVoucherCode('');
      }
    }
  };

  return (
    <View className="flex-1 bg-cream">

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-cream-200">
        <View className="flex-row items-center">
          <TouchableOpacity 
            className="mr-3 p-1"
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-espresso">Wallet</Text>
        </View>
        <TouchableOpacity 
          className="bg-cream-100 px-4 py-2 rounded-full flex-row items-center"
          onPress={() => router.push({ 
            pathname: '/wallet-transactions', 
            params: { balance: 100 } 
          })}
        >
          <MaterialCommunityIcons name="wallet" size={20} color="#374151" />
          <Text className="ml-2 font-semibold text-espresso">₹ 100</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Recharge Card */}
        <View className="mx-4 mt-4 bg-cream border border-ochre-100 rounded-2xl p-[5px]">
          <View className="flex-row justify-between items-center">
            <Text className="text-2xl font-bold text-espresso">₹ {selectedAmount}</Text>
            <View className="bg-green-500 px-4 py-2 rounded-full">
              <Text className="text-cream font-bold">+ 100 Cashback</Text>
            </View>
          </View>
        </View>

        {/* Amount Selection */}
        <View className="flex-row justify-between px-4 gap-3 mt-4">
          {walletData.rechargeAmounts.map((amount) => (
            <TouchableOpacity
              key={amount}
              onPress={() => setSelectedAmount(amount)}
              className={`px-4 py-2 rounded-full border ${
                selectedAmount === amount 
                  ? 'border-ochre-200 bg-cream-200' 
                  : 'border-ochre-100 bg-cream-100'
              }`}
            >
              <Text className={`font-semibold ${
                selectedAmount === amount ? 'text-ochre-200' : 'text-espresso-100'
              }`}>
                ₹ {amount}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Voucher Code Input */}
        <View className="mx-4 mt-6 flex-row">
          <TextInput
            className="flex-1 bg-cream-100 rounded-full px-4 py-3 text-base mr-3"
            placeholder="Enter Voucher Code"
            value={voucherCode}
            onChangeText={setVoucherCode}
            autoCapitalize="characters"
          />
          <TouchableOpacity 
            onPress={handleApplyCoupon}
            className="bg-ochre-200 px-8 py-3 rounded-full justify-center"
          >
            <Text className="text-cream font-bold">APPLY</Text>
          </TouchableOpacity>
        </View>

        {/* Voucher Cards */}
        <View className="mt-6">
          {vouchers.map((voucher) => (
            <VoucherCard
              key={voucher.id}
              voucher={voucher}
              onApply={handleApplyVoucher}
              onRemove={handleRemoveVoucher}
            />
          ))}
        </View>

        {/* Banners */}
        <View className="mt-6 mb-6">
          <FlatList
            data={walletData.banners}
            renderItem={({ item }) => (
              <View className="mr-4 rounded-2xl overflow-hidden">
                <Image 
                  source={item.image}
                  className="w-80 h-64"
                  resizeMode="cover"
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View className="px-4  pb-8" style={{ paddingTop: 8}}>
        <TouchableOpacity className="bg-ochre-200 py-3 rounded-2xl">
          <Text className="text-cream text-center text-lg font-bold">CONFIRM</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Wallet;
