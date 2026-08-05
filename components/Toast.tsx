import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ToastProps {
  visible: boolean;
  productName: string;
  onGoToCart: () => void;
  onHide: () => void;
  bottomOffset?: number;
}

const Toast: React.FC<ToastProps> = ({ visible, productName, onGoToCart, onHide, bottomOffset = 20 }) => {
  const slideAnim = new Animated.Value(100);

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        hideToast();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.timing(slideAnim, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onHide();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: bottomOffset,
        left: 16,
        right: 16,
        transform: [{ translateY: slideAnim }],
        zIndex: 1000,
      }}
      className="bg-[#3E2723] rounded-xl p-3 flex-row items-center justify-between"
    >
      <View className="flex-row items-center flex-1">
        <Ionicons name="checkmark-circle" size={24} color="#FFFDF6" />
        <Text className="text-cream font-semibold ml-2 flex-1" numberOfLines={1}>
          {productName} added to cart
        </Text>
      </View>
      <TouchableOpacity
        onPress={onGoToCart}
        className="bg-cream px-4 py-2 rounded-lg ml-3"
      >
        <Text className="text-[#3E2723] font-bold text-sm">GO TO CART</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Toast;
