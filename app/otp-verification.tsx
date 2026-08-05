import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';

const OtpVerification = () => {
  const { phone } = useLocalSearchParams();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View entering={FadeIn} className="flex-1 bg-cream px-6">
        {/* Header */}
        <View className="flex-row items-center py-2 mt-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#3E2723" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-espresso ml-4">OTP Verification</Text>
        </View>

        {/* Title */}
        <View className="items-center mt-16 mb-8">
          <Text className="text-3xl font-bold text-espresso text-center mb-4">
            Verify your{'\n'}Phone number
          </Text>
          <Text className="text-espresso-100 text-center">
            Enter OTP code sent on{'\n'}phone number +91 {phone}
          </Text>
        </View>

        {/* OTP Input */}
        <View className="flex-row justify-center mb-12" style={{ gap: 16 }}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { inputRefs.current[index] = ref; }}
              className={`w-14 h-14 border-2 rounded-xl text-center text-xl font-semibold bg-cream ${
                digit ? 'border-ochre-200 text-espresso' : 'border-ochre-100 text-espresso'
              }`}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity 
          className={`py-4 rounded-full mb-8 ${
            otp.join('').length === 4 ? 'bg-ochre-200' : 'bg-ochre-100'
          }`}
          onPress={() => {
            if (otp.join('').length === 4) {
              router.replace('/address');
            }
          }}
        >
          <Text className={`text-center text-base font-bold ${
            otp.join('').length === 4 ? 'text-espresso' : 'text-ochre-200'
          }`}>
            NEXT
          </Text>
        </TouchableOpacity>

        {/* Resend Code */}
        <TouchableOpacity className="items-center">
          <Text className="text-espresso text-base font-semibold">RESEND NEW CODE</Text>
        </TouchableOpacity>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default OtpVerification;
