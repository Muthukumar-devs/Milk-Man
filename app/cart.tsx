import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const router = useRouter();
  const { items, updateQuantity, getTotal, getItemCount, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const subtotal = getTotal();
  const discount = appliedCoupon ? 60 : 0;
  const total = subtotal - discount;

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      setAppliedCoupon(couponCode);
      setCouponCode('');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon('');
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    clearCart();
    router.replace('/orders');
  };

  return (
    <View className="flex-1 bg-cream-100">
      {/* Header */}
      <View className="bg-cream px-4 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#4E342E" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-espresso ml-4">Cart</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {items.length === 0 ? (
          <View className="flex-1 justify-center items-center py-24">
            <Image
              source={require('../assets/images/empty-cart.png')}
              className="w-64 h-64 mb-6"
              resizeMode="contain"
            />
            <Text className="text-2xl font-bold text-espresso mb-2">Your cart is empty</Text>
            <Text className="text-base text-espresso-100 text-center px-12 mb-8">
              Looks like you haven't added anything to your cart yet.
            </Text>
            <TouchableOpacity
              className="bg-ochre-200 px-8 py-4 rounded-full shadow-sm"
              onPress={() => router.push('/')}
            >
              <Text className="text-cream text-base font-bold">Start Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Items Section */}
            <View className="bg-cream-200 px-4 py-2">
              <Text className="text-base font-medium text-espresso-100">Items</Text>
            </View>

            {/* Cart Items */}
            <View className="bg-cream">
              {items.map((item) => (
                <View key={item.id} className="flex-row items-center px-4 py-1 border-b border-cream-200">
                  <Image
                    source={item.image}
                    className="w-12 h-12 rounded-lg mr-3"
                    resizeMode="cover"
                  />
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-espresso">{item.name}</Text>
                    <Text className="text-sm text-ochre-200">{item.size}</Text>
                    <Text className="text-ochre-200 text-xs">Delivering Tomorrow</Text>
                    <View className="flex-row items-center mt-1">
                      <Text className="text-base font-bold text-espresso">₹{item.price}</Text>
                      <Text className="text-sm text-ochre-200 line-through ml-2">₹{item.originalPrice}</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center">
                    <View className="flex-row rounded-full overflow-hidden bg-cream-200">
                      <View className="w-12 h-8 justify-center items-center">
                        <Text className="text-lg font-bold text-espresso">{item.quantity}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-12 h-8 bg-espresso-100 justify-center items-center"
                      >
                        <Text className="text-cream font-bold">−</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-12 h-8 bg-ochre-200 justify-center items-center"
                      >
                        <Text className="text-cream font-bold">+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Coupon Section */}
            <View className=" mt-4 px-4 py-4">
              <View className="flex-row border border-ochre-100 rounded-full bg-cream ">
                <TextInput
                  className="flex-1  px-4 py-3 text-base"
                  placeholder="Enter Coupon Code"
                  value={couponCode}
                  onChangeText={setCouponCode}
                />
                <TouchableOpacity
                  onPress={handleApplyCoupon}
                  className="bg-ochre-200 px-6 py-1 rounded-full justify-center"
                >
                  <Text className="text-cream font-bold">APPLY</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Coupon Applied View */}
            {appliedCoupon && (
              <View className="flex-row justify-between px-4 py-2 " style={{ backgroundColor: '#0d9488', borderRadius: 25, marginHorizontal: 40, marginBottom: 16 }}>
                <Text className="text-cream font-medium">{appliedCoupon} coupon has applied</Text>
                <TouchableOpacity onPress={removeCoupon}>
                  <Ionicons name="close" size={20} color="#FFFDF6" />
                </TouchableOpacity>
              </View>
            )}

            {/* Bill Summary */}
            <View className="bg-cream px-4 py-4">
              <View className="flex-row justify-between py-2">
                <Text className="text-base text-espresso-100">Subtotal</Text>
                <Text className="text-base font-semibold">₹{subtotal.toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between py-2">
                <Text className="text-base text-espresso-100">Tax</Text>
                <Text className="text-base">₹0.00</Text>
              </View>
              <View className="flex-row justify-between py-2">
                <Text className="text-base text-espresso-100">Discount</Text>
                <Text className="text-base" style={{ color: '#EADCB9' }}>₹{discount}.0</Text>
              </View>
              <View className="flex-row justify-between py-2">
                <Text className="text-base text-espresso-100">Delivery Charge</Text>
                <Text className="text-base font-semibold" style={{ color: '#EADCB9' }}>FREE</Text>
              </View>
              <View className="flex-row justify-between py-2">
                <Text className="text-base text-espresso-100">Packaging</Text>
                <Text className="text-base font-semibold" style={{ color: '#EADCB9' }}>FREE</Text>
              </View>
              <View className="mt-2 pt-2" style={{ borderTopWidth: 1, borderTopColor: '#DFCDA2' }}>
                <View className="flex-row justify-between mt-2">
                  <Text className="text-lg font-bold text-espresso">Total</Text>
                  <Text className="text-lg font-bold">₹{total.toFixed(2)}</Text>
                </View>
              </View>
            </View>

            {/* VIP Membership Banner */}
            <View className="mt-4 bg-ochre-200">
              <View className="px-4 py-6 flex-row items-center">
                <View className="flex-row items-center flex-1">
                  <View className="bg-espresso px-2 py-1 rounded mr-3">
                    <Text className="text-ochre-200 text-xs font-bold">VIP</Text>
                  </View>
                  <View className="flex-1 mr-3">
                    <Text className="text-espresso font-bold">Save <Text className="text-espresso">₹124</Text> more on your order!</Text>
                    <Text className="text-espresso text-sm">Become a VIP member and get 40% off everything</Text>
                  </View>
                </View>
                <TouchableOpacity
                  className="bg-cream px-4 py-2 rounded-full"
                  onPress={() => router.push('/vip-membership')}
                >
                  <Text className="text-espresso text-sm font-bold">Know More</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Bottom Button */}
      {items.length > 0 && (
        <View className="bg-cream px-4 py-4 shadow-lg pb-8 pt-4">
          <TouchableOpacity
            onPress={handleCheckout}
            className="bg-ochre-200 rounded-xl py-4 flex-row items-center justify-between px-6"
          >
            <View>
              <Text className="text-cream text-lg font-bold">₹{total.toFixed(0)}</Text>
              <Text className="text-cream text-sm">{getItemCount()} items</Text>
            </View>
            <Text className="text-cream text-lg font-bold">PLACE ORDER</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Cart;
