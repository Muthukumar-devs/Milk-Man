import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeIn } from 'react-native-reanimated';

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('');

  const handleGuest = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'true');
    router.replace('/(tabs)');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View entering={FadeIn} className="flex-1 bg-cream px-6">
      {/* Logo */}
      <View className="items-center mt-20 mb-16">
        <Image 
          source={require('../assets/images/logo.jpg')} 
          className="w-36 h-36 rounded-full"
          resizeMode="contain"
        />
      </View>

      {/* Mobile Number Input */}
      <View className="mb-8">
        <TextInput
          className="border border-ochre-200 bg-cream rounded-lg px-4 py-4 text-base text-espresso"
          placeholder="Mobile number"
          placeholderTextColor="#D4BE8B"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="phone-pad"
        />
      </View>

      {/* Next Button */}
      <TouchableOpacity 
        className="bg-ochre-200 py-4 rounded-full mb-6"
        onPress={() => {
          if (mobileNumber.trim()) {
            router.push(`/otp-verification?phone=${mobileNumber}`);
          } else {
            Alert.alert('Error', 'Please enter mobile number');
          }
        }}
      >
        <Text className="text-espresso text-center text-base font-bold">NEXT</Text>
      </TouchableOpacity>

      {/* Browse as Guest */}
      <TouchableOpacity 
        className="mb-12"
        onPress={handleGuest}
      >
        <Text className="text-espresso text-center text-base font-semibold">BROWSE AS GUEST</Text>
      </TouchableOpacity>

      {/* Terms and Privacy */}
      <View className="items-center mb-16">
        <Text className="text-ochre-200 text-sm text-center">
          By continuing you agree to our
        </Text>
        <View className="flex-row">
          <TouchableOpacity>
            <Text className="text-espresso text-sm font-bold">Terms of Service</Text>
          </TouchableOpacity>
          <Text className="text-ochre-200 text-sm"> and </Text>
          <TouchableOpacity>
            <Text className="text-espresso text-sm font-bold">Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Powered by */}
      <View className="items-center mt-auto mb-8">
        <Text className="text-ochre-200 text-xs mb-1">POWERED BY</Text>
        <Text className="text-espresso text-lg font-bold">MILK MAN</Text>
      </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
