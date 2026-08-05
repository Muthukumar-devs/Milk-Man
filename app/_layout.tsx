import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../global.css";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CartProvider } from '../context/CartContext';
import { VacationProvider } from '../context/VacationContext';
import { cssInterop } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';

cssInterop(LinearGradient, {
  className: 'style',
});

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {


  return (
    <CartProvider>
      <VacationProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom',]}>
            <StatusBar  backgroundColor="#FFFDF6" style="dark" />
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="wallet" options={{ headerShown: false }} />
            <Stack.Screen name="calendar" options={{ headerShown: false }} />
            <Stack.Screen name="search" options={{ headerShown: false }} />
            <Stack.Screen name="cart" options={{ headerShown: false }} />
            <Stack.Screen name="orders" options={{ headerShown: false }} />
            <Stack.Screen name="product-detail" options={{ headerShown: false }} />
            <Stack.Screen name="wallet-transactions" options={{ headerShown: false }} />
            <Stack.Screen name="monthly-statement" options={{ headerShown: false }} />
            <Stack.Screen name="vacation" options={{ headerShown: false }} />
            <Stack.Screen name="add-vacation" options={{ headerShown: false }} />
            <Stack.Screen name="help-support" options={{ headerShown: false }} />
            <Stack.Screen name="legal" options={{ headerShown: false }} />
            <Stack.Screen name="account-preferences" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="otp-verification" options={{ headerShown: false }} />
            <Stack.Screen name="address" options={{ headerShown: false }} />
            <Stack.Screen name="map-picker" options={{ headerShown: false }} />
            <Stack.Screen name="vip-membership" options={{ headerShown: false }} />
            <Stack.Screen name="refers" options={{ headerShown: false }} />
            <Stack.Screen name="help-chat" options={{ headerShown: false }} />
            <Stack.Screen name="faq" options={{ headerShown: false }} />
            <Stack.Screen name="complaint" options={{ headerShown: false }} />
            <Stack.Screen name="about-us" options={{ headerShown: false }} />
            <Stack.Screen name="terms-conditions" options={{ headerShown: false }} />
            <Stack.Screen name="privacy-policy" options={{ headerShown: false }} />
            <Stack.Screen name="certification" options={{ headerShown: false }} />
          </Stack>
          </SafeAreaView>
        </SafeAreaProvider>
      </VacationProvider>
    </CartProvider>
  );
}
